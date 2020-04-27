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
import org.covid19support.modules.users.User
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.ratings_module() {
    routing {
        route("/ratings") {
            post {
                val decodedToken: DecodedJWT? = authenticate(call)
                if (decodedToken != null) {
                    val rating: Rating? = call.receive<Rating>()
                    if (rating != null) {
                        try {
                            transaction(DbSettings.db) {
                                Ratings.insert {
                                    it[user_id] = decodedToken.claims["id"]!!.asInt()
                                    it[course_id] = rating.course_id
                                    it[rating_value] = rating.rating_value
                                    it[comment] = rating.comment
                                }
                            }
                            call.respond(HttpStatusCode.Created, Message("Rating successfully submitted!"))
                        } catch (ex: ExposedSQLException) {
                            log.error(ex.message)
                            when (ex.sqlState) {
                                SQLState.FOREIGN_KEY_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, Message(ex.localizedMessage))
                                else -> call.respond(HttpStatusCode.InternalServerError, Message(INTERNAL_ERROR))
                            }
                        }
                    } else {
                        call.respond(HttpStatusCode.BadRequest, Message(INVALID_BODY))
                    }
                }
            }
            route("/course/{course_id}") {
                get {
                    val id: Int = call.parameters["course_id"]!!.toInt()
                    val ratings: MutableList<Rating> = mutableListOf()
                    val users: MutableList<User> = mutableListOf()
                    val ratingsComponents: MutableList<RatingComponent> = mutableListOf()
                    transaction {
                        val results: List<ResultRow> = Ratings.select { Ratings.course_id eq id }.toList()
                        results.forEach {
                            ratings.add(Ratings.toRating(it))
                            users.add(Users.toUser(Users.select { Users.id eq ratings.last().user_id }.first()))
                        }
                    }
                    for (i in 0 until ratings.size) {
                        ratingsComponents.add(RatingComponent(ratings[i].user_id, ratings[i].course_id, ratings[i].rating_value,
                                                              ratings[i].comment, users[i].first_name, users[i].last_name))
                    }
                    if (ratingsComponents.isEmpty()) {
                        call.respond(HttpStatusCode.NoContent, Message("No ratings found!"))
                    } else {
                        call.respond(ratingsComponents)
                    }
                }
            }
            route("/{course_id}/{user_id}") {
                get {
                    var rating: Rating? = null
                    val course_id: Int = call.parameters["course_id"]!!.toInt()
                    val user_id: Int = call.parameters["user_id"]!!.toInt()
                    transaction(DbSettings.db) {
                        val result: ResultRow? = Ratings.select { (Ratings.user_id eq user_id) and (Ratings.course_id eq course_id) }.firstOrNull()
                        if (result != null) {
                            rating = Ratings.toRating(result)
                        }
                    }

                    if (rating == null) {
                        call.respond(HttpStatusCode.NoContent, Message("Rating not found!"))
                    } else {
                        call.respond(rating as Rating)
                    }
                }
            }
        }
    }
}