package org.covid19support.modules.ratings

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

fun Application.ratings_module() {
    routing {
        get("/ratings") {
            val ratings: MutableList<Rating> = mutableListOf<Rating>()
            transaction(DbSettings.db) {
                val results:List<ResultRow> = Ratings.selectAll().toList()
                results.forEach {
                    ratings.add(Ratings.toRating(it))
                }
            }
            if (ratings.isEmpty()) {
                call.respond(HttpStatusCode.NoContent, Message("No ratings found!"))
            }
            else {
                call.respond(ratings)
            }
        }

        get("/ratings/{id}") {
            var rating: Rating? = null
            val id:Int = call.parameters["id"]!!.toInt()
            transaction(DbSettings.db) {
                val result:ResultRow? = Ratings.select{ Ratings.id eq id }.firstOrNull()
                if (result != null) {
                    rating = Ratings.toRating(result)
                }
            }

            if (rating == null) {
                call.respond(HttpStatusCode.NoContent, Message("Rating not found!"))
            }
            else {
                call.respond(rating as Rating)
            }
        }

        post("/ratings") {
            val decodedToken: DecodedJWT? = authenticate(call)
            if (decodedToken != null) {
                val rating: Rating? = call.receive<Rating>()
                if (rating != null) {
                    try {
                        transaction(DbSettings.db) {
                            Ratings.insert {
                                it[user_id] = rating.user_id
                                it[course_id] = rating.course_id
                                it[rating_value] = rating.rating_value
                                it[comment] = rating.comment
                            }
                        }
                        call.respond(HttpStatusCode.Created, Message("Rating successfully submitted!"))
                    }
                    catch(ex:ExposedSQLException) {
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