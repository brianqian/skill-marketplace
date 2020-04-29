package org.covid19support.modules.users

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.routing.*
import io.ktor.response.*
import io.ktor.sessions.*
import org.covid19support.DbSettings
import org.covid19support.SQLState
import org.covid19support.SessionAuth
import org.covid19support.constants.INTERNAL_ERROR
import org.covid19support.constants.INVALID_BODY
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*
import org.jetbrains.exposed.exceptions.*
import org.mindrot.jbcrypt.BCrypt
import org.covid19support.authentication.Token
import org.covid19support.constants.Message


fun Application.users_module() {
    routing {
        route("/users") {
            get {
                val users: MutableList<User> = mutableListOf<User>()
                transaction(DbSettings.db) {
                    val results:List<ResultRow> = Users.selectAll().toList()
                    results.forEach {
                        users.add(Users.toUser(it))
                    }
                }
                if (users.isEmpty()) {
                    call.respond(HttpStatusCode.NoContent, Message("No users found!"))
                }
                else {
                    call.respond(users)
                }
            }

            post {
                var newUser: User? = call.receive<User>()
                var id:Int = -1
                if (newUser != null) {
                    try {
                        val passhash = BCrypt.hashpw(newUser.password, BCrypt.gensalt())
                        transaction (DbSettings.db) {
                            id = Users.insertAndGetId {
                                it[email] = newUser.email
                                it[password] = passhash
                                it[first_name] = newUser.first_name
                                it[last_name] = newUser.last_name
                                it[description] = newUser.description
                            }.value
                        }
                        newUser.id = id
                        call.sessions.set(SessionAuth(Token.create(id, newUser.email)))
                        call.respond(HttpStatusCode.Created, newUser)
                    }
                    catch (ex:ExposedSQLException) {
                        log.error(ex.message)
                        when (ex.sqlState) {
                            SQLState.UNIQUE_CONSTRAINT_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, "Email already taken!")
                            SQLState.FOREIGN_KEY_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, ex.localizedMessage)
                            else -> call.respond(HttpStatusCode.InternalServerError, Message(INTERNAL_ERROR))
                        }
                    }
                }
                else {
                    call.respond(HttpStatusCode.BadRequest, Message(INVALID_BODY))
                }
            }

            route("/{id}") {
                get {
                    var user: User? = null
                    val id:Int = call.parameters["id"]!!.toInt()
                    transaction(DbSettings.db) {
                        val result:ResultRow? = Users.select{Users.id eq id}.firstOrNull()

                        if (result != null) {
                            user = Users.toUser(result)
                        }

                    }
                    if (user == null) {
                        call.respond(HttpStatusCode.NoContent, Message("User not found!"))
                    }
                    else {
                        call.respond(user!!)
                    }
                }
            }
        }
    }
}