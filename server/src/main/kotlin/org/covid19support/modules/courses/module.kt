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
import org.covid19support.modules.ratings.Rating
import org.covid19support.modules.ratings.Ratings
import org.covid19support.modules.users.*
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.courses_module() {
    routing {
        get("/courses") {
            val instructor_id: Int? = call.parameters["instructor_id"]?.toIntOrNull()
            val categories: List<String>? = call.parameters["categories"]?.split(',')
            val courses: HashMap<Int, MutableList<Course>> = HashMap()
            val instructors: HashMap<Int, User> = HashMap()
            val ratings: HashMap<Int, MutableList<Rating>> = HashMap()
            val courseComponents: MutableList<CourseComponent> = mutableListOf()
            lateinit var coursesQuery: Query
            if (categories == null && instructor_id == null) {
                coursesQuery = Courses.selectAll()
            }
            else if (categories != null && instructor_id == null) {
                coursesQuery = Courses.select { Courses.category inList categories }
            }
            else if (categories == null && instructor_id != null) {
                coursesQuery = Courses.select { Courses.instructor_id eq instructor_id }
            }
            else if (categories != null && instructor_id != null) {
                coursesQuery = Courses.select { (Courses.instructor_id eq instructor_id) and (Courses.category inList categories)}
            }

            transaction(DbSettings.db) {
                coursesQuery.forEach {
                    val courseId: Int = it[Courses.id]
                    val instructorId: Int = it[Courses.instructor_id]
                    if (courses[instructorId] == null) {
                        courses[instructorId] = mutableListOf()
                        courses[instructorId]?.add(Courses.toCourse(it))
                    }
                    else {
                        courses[instructorId]?.add(Courses.toCourse(it))
                    }
                    Ratings.select { Ratings.course_id eq courseId }.forEach {
                        if (ratings[courseId] == null) {
                            ratings[courseId] = mutableListOf()
                            ratings[courseId]?.add(Ratings.toRating(it))
                        }
                        else {
                            ratings[courseId]?.add(Ratings.toRating(it))
                        }
                    }
                    if (instructors[instructorId] == null) {
                        instructors[instructorId] = Users.toUser(Users.select { Users.id eq instructorId }.first())
                    }
                }
                Users.selectAll().forEach {
                    instructors[it[Users.id].value] = Users.toUser(it)
                }
            }
            if (courses.isEmpty()) {
                call.respond(HttpStatusCode.NoContent, Message("No courses found!"))
            }
            else {
                courses.forEach { (instructor_id, instructor_courses) ->
                        instructor_courses.forEach {
                            var rating: Short? = null
                            if (ratings[it.id] != null) {
                                rating = 0
                                ratings[it.id]?.forEach {
                                    rating = (rating!! + it.rating_value).toShort()
                                }
                                rating = (rating!! / ratings[it.id]?.size!!).toShort()
                            }
                            courseComponents.add(CourseComponent(instructor_id,
                                    instructors[instructor_id]?.first_name + ' ' + instructors[instructor_id]?.last_name,
                                    it.id!!,
                                    it.name,
                                    rating,
                                    it.category,
                                    it.rate
                            ))
                        }
                }
                call.respond(HttpStatusCode.OK, courseComponents)
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
                call.respond(course!!)
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