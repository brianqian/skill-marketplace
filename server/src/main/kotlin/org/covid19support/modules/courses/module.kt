package org.covid19support.modules.courses

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.routing.*
import io.ktor.response.*
import org.covid19support.DbSettings
import org.covid19support.SQLState
import org.covid19support.constants.INTERNAL_ERROR
import org.covid19support.constants.INVALID_BODY
import org.covid19support.authentication.authenticate
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.courses_module() {
    routing {
        get("/courses") {
            val courses: MutableList<Course> = mutableListOf<Course>()
            call.respondText("Not Implemented Yet!")
        }

        get("/courses/test") {
            val decodedToken: DecodedJWT? = authenticate(call)
            if (decodedToken != null) {
                call.respond("AUTHENTICATED!")
            }
        }

        post("/courses") {
            val decodedToken: DecodedJWT? = authenticate(call)
            if (decodedToken != null) {
                val course: Course? = call.receive<Course>()
                if (course != null) {
                    try {
                        transaction (DbSettings.db) {
                            Courses.insert {
                                it[name] = course.name
                                it[description] = course.description
                                it[instructor_id] = course.instructor_id
                                it[category] = course.category
                                it[rate] = course.rate
                            }
                        }
                    }
                    catch (ex:ExposedSQLException) {
                        when(ex.sqlState) {
                            SQLState.FOREIGN_KEY_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, ex.localizedMessage)
                            else -> call.respond(HttpStatusCode.InternalServerError, INTERNAL_ERROR)
                        }
                    }
                }
                else {
                    call.respond(HttpStatusCode.BadRequest, INVALID_BODY)
                }
            }
        }
    }
}