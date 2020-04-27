package org.covid19support.modules.contact_info

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.covid19support.DbSettings
import org.covid19support.SQLState
import org.covid19support.authentication.authenticate
import org.covid19support.constants.INTERNAL_ERROR
import org.covid19support.constants.INVALID_BODY
import org.covid19support.constants.Message
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.contactInfo_module() {
    routing {
        route("/contact_info") {
            get {
                val contactInfo: MutableList<ContactInfo> = mutableListOf<ContactInfo>()
                transaction(DbSettings.db) {
                    val results:List<ResultRow> = ContactInfoTable.selectAll().toList()
                    results.forEach {
                        contactInfo.add(ContactInfoTable.toContactInfo(it))
                    }
                }
                if (contactInfo.isEmpty()) {
                    call.respond(HttpStatusCode.NoContent, Message("No contact information found!"))
                }
                else {
                    call.respond(contactInfo)
                }
            }
            post {
                val decodedToken: DecodedJWT? = authenticate(call)
                if (decodedToken != null) {
                    val newContactInfo: ContactInfo? = call.receive<ContactInfo>()
                    var id:Int = -1
                    if (newContactInfo != null) {
                        try {
                            transaction(DbSettings.db) {
                                ContactInfoTable.insert {
                                    it[user_id] = decodedToken.claims["id"]!!.asInt()
                                    it[contact_method] = newContactInfo.contact_method
                                    it[contact_info] = newContactInfo.contact_info
                                }
                            }
                            call.respond(HttpStatusCode.Created)
                        }
                        catch (ex:ExposedSQLException) {
                            log.error(ex.message)
                            when (ex.sqlState) {
                                SQLState.FOREIGN_KEY_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, ex.localizedMessage)
                                else -> call.respond(HttpStatusCode.InternalServerError, Message(INTERNAL_ERROR))
                            }
                        }
                    }
                    else {
                        call.respond(HttpStatusCode.BadRequest, Message(INVALID_BODY))
                    }
                }
            }

            route("/{id}") {
                get {
                    var contactInfo: ContactInfo? = null
                    val id:Int = call.parameters["id"]!!.toInt()
                    transaction(DbSettings.db) {
                        val result:ResultRow? = ContactInfoTable.select{ ContactInfoTable.id eq id}.firstOrNull()

                        if (result != null) {
                            contactInfo = ContactInfoTable.toContactInfo(result)
                        }

                    }
                    if (contactInfo == null) {
                        call.respond(HttpStatusCode.NoContent,Message("Course not found!"))
                    }
                    else {
                        call.respond(contactInfo as ContactInfo)
                    }
                }
            }
        }
    }
}