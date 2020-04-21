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
import org.covid19support.constants.Message
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.courses_module() {
    routing {
        get("/courses") {
            val courses: MutableList<Course> = mutableListOf<Course>()
            transaction(DbSettings.db) {
                val results:List<ResultRow> = Courses.selectAll().toList()
                results.forEach {
                    courses.add(Courses.toCourse(it))
                }
            }
            if (courses.isEmpty()) {
                call.respond(HttpStatusCode.NoContent, Message("No courses found!"))
            }
            else {
                call.respond(HttpStatusCode.OK, courses)
            }
        }

        get("/courses/{id}") {
            var course: Course? = null
            val id:Int = call.parameters["id"]!!.toInt()
            transaction(DbSettings.db) {
                val result:ResultRow? = Courses.select{ Courses.id eq id}.firstOrNull()

                if (result != null) {
                    course = Courses.toCourse(result)
                }

            }
            if (course == null) {
                call.respond(HttpStatusCode.NoContent,Message("Course not found!"))
            }
            else {
                call.respond(course as Course)
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
                                it[instructor_id] = decodedToken.claims["id"]!!.asInt()
                                it[category] = course.category
                                it[rate] = course.rate
                            }
                        }
                        call.respond(HttpStatusCode.Created, Message("Successfully created course!"))
                    }
                    catch (ex:ExposedSQLException) {
                        log.error(ex.message)
                        when(ex.sqlState) {
                            SQLState.FOREIGN_KEY_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, Message(ex.localizedMessage))
                            else -> call.respond(HttpStatusCode.InternalServerError, Message(INTERNAL_ERROR))
                        }
                    }
                }
                else {
                    call.respond(HttpStatusCode.BadRequest, Message(INVALID_BODY))
                }
            }
        }
    }
}