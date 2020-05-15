package org.covid19support

import com.google.gson.JsonObject
import io.ktor.http.*
import io.ktor.server.testing.*
import io.ktor.sessions.*
import org.covid19support.modules.courses.Course
import org.covid19support.modules.courses.Courses
import org.covid19support.modules.ratings.Rating
import org.covid19support.modules.ratings.RatingComponent
import org.covid19support.modules.ratings.Ratings
import org.covid19support.modules.ratings.ratings_module
import org.covid19support.modules.users.User
import org.covid19support.modules.users.Users
import org.covid19support.modules.users.users_module
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import kotlin.test.*

fun test(hmmmm: () -> Unit) : Int {
    hmmmm.invoke()
    return 5
}

class TestRatings : BaseTest() {

    //TODO Add Ratings Failure (Text Too Long) - Not Implemented Yet
    //TODO Add Ratings Failure (Invalid Data) - Not Implemented
    //TODO Edit Ratings Success
    //TODO Edit Ratings Failure (Rating or Course Does Not Exist)
    //TODO Edit Ratings Failure (Unauthenticated)
    //TODO Edit Ratings Failure (Unauthorized)
    //TODO Delete Ratings Success
    //TODO Delete Ratings Failure (Rating does not Exist)
    //TODO Delete Ratings Failure (Unauthenticated)
    //TODO Delete Ratings Failure (Unauthorized)

    @Test
    fun addRatings() = withTestApplication ({
        main(true)
        users_module()
        ratings_module()
    }) {
        val instructor = User(null, "test@test.org", "test123", "Test1", "McTesterson", "The head of the McTesterson House, Mr. McTesterson rules with an iron fist!")
        val instructor2 = User(null, "cheese@cheese.ca", "goulda", "Cheese", "Master", null)
        lateinit var testCourse: Course
        lateinit var testCourse2: Course
        val users = arrayOf(
                User(null, "decentreviewer@protonmail.com", "password", "Decent", "User", null),
                User(null, "crappyreviewer@protonmail.com", "password", "Crap", "User", null),
                User(null, "naivereviewer@protonmail.com", "password", "Excited", "Reviewer", null)
        )
        cookiesSession {
            with(handleRequest(HttpMethod.Post, Routes.USERS){
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(instructor))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                assertNotNull(sessions.get<SessionAuth>())
                val userWithId = gson.fromJson(response.content, User::class.java)
                instructor.id = userWithId.id
            }
            testCourse = Course(null, "Unit Testing 101", "Introduction to unit testing", instructor.id!!, "Coding", 5f)
            transaction(DbSettings.db) {
                testCourse.id = Courses.insertAndGetId {
                    it[name] = testCourse.name
                    it[description] = testCourse.description
                    it[instructor_id] = testCourse.instructorId
                    it[category] = testCourse.category
                    it[rate] = testCourse.rate
                }.value
            }

        }

        cookiesSession {
            with(handleRequest(HttpMethod.Post, Routes.USERS){
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(instructor2))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                assertNotNull(sessions.get<SessionAuth>())
                val userWithId = gson.fromJson(response.content, User::class.java)
                instructor2.id = userWithId.id
            }
            testCourse2 = Course(null, "How to Make a Cheesey Game", "You won't believe how goulda this course is!", instructor2.id!!, "Coding", 5f)
            transaction(DbSettings.db) {
                testCourse2.id = Courses.insertAndGetId {
                    it[name] = testCourse2.name
                    it[description] = testCourse2.description
                    it[instructor_id] = testCourse2.instructorId
                    it[category] = testCourse2.category
                    it[rate] = testCourse2.rate
                }.value
            }

        }
        val ratings = HashMap<Int, Array<Rating>>()
        ratings[0] = arrayOf(
                Rating(-1, testCourse.id!!, 3, "This course was alright, but it makes assumptions of the person taking the course that a 101 course shouldn't."),
                Rating(-1, testCourse2.id!!, 5, "Very accurate description, very cheesey...")
                )
        ratings[1] = arrayOf(Rating(-1, testCourse.id!!, 0, "OMG THIS COURSE SUCKED, NO REDEEMING QUALITIES! AND NO I WON'T ELABORATE FURTHER!"))
        ratings[2] = arrayOf(Rating(-1, testCourse.id!!, 5, "Best course ever, it's not physically possible for someone to write a better course!"))

        for (i in 0 until 3) {
            cookiesSession {
                with(handleRequest(HttpMethod.Post, Routes.USERS){
                    addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                    setBody(gson.toJson(users[i]))
                }) {
                    assertEquals(HttpStatusCode.Created, response.status())
                    assertNotNull(sessions.get<SessionAuth>())
                    val userWithId = gson.fromJson(response.content, User::class.java)
                    users[i].id = userWithId.id
                }
                for (rating in ratings[i]!!) {
                    with(handleRequest(HttpMethod.Post, Routes.RATINGS){
                        addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                        setBody(gson.toJson(rating))
                    }) {
                        assertEquals(HttpStatusCode.Created, response.status())
                    }
                }
            }
        }

        with(handleRequest(HttpMethod.Get, "${Routes.COURSE_RATINGS}/${testCourse.id}")) {
            assertEquals(HttpStatusCode.OK, response.status())
            assertDoesNotThrow {gson.fromJson(response.content, Array<Rating>::class.java)}
            val fetchedRatings = gson.fromJson(response.content, Array<Rating>::class.java)
            assertEquals(3, fetchedRatings.size)
        }

        with(handleRequest(HttpMethod.Get, "${Routes.COURSE_RATINGS}/${testCourse2.id}")) {
            assertEquals(HttpStatusCode.OK, response.status())
            assertDoesNotThrow {gson.fromJson(response.content, Array<Rating>::class.java)}
            val fetchedRatings = gson.fromJson(response.content, Array<Rating>::class.java)
            assertEquals(1, fetchedRatings.size)
        }
    }

    @Test
    fun addRatingsForeignKeyViolation() = withTestApplication({
        main(true)
        users_module()
        ratings_module()
    }) {
        val testUser = User(null, "decentreviewer@protonmail.com", "password", "Decent", "User", null)
        val invalidReview = Rating(-1, 5, 1, "For a course that doesn't exist... it's pretty terrible!")
        cookiesSession {
            with(handleRequest(HttpMethod.Post, Routes.USERS){
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(testUser))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                assertNotNull(sessions.get<SessionAuth>())
            }

            with(handleRequest(HttpMethod.Post, Routes.RATINGS) {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(invalidReview))
            }) {
                assertEquals(HttpStatusCode.BadRequest, response.status())
            }
        }
    }

    @Test
    fun addRatingsInvalidDataFormat() = withTestApplication({
        main(true)
        users_module()
        ratings_module()
    }) {
        val testUser = User(null, "decentreviewer@protonmail.com", "password", "Decent", "User", null)
        cookiesSession {
            with(handleRequest(HttpMethod.Post, Routes.USERS){
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(testUser))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                assertNotNull(sessions.get<SessionAuth>())
            }
            val badData: JsonObject = JsonObject()
            badData.addProperty("lame", "data")
            with(handleRequest(HttpMethod.Post, Routes.RATINGS) {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(badData))
            }) {
                assertEquals(HttpStatusCode.BadRequest, response.status())
            }
        }
    }

    @Test
    fun addRatingsUnauthenticated() = withTestApplication ({
        main(true)
        ratings_module()
    }) {
        val invalidReview = Rating(-1, 5, 1, "For a course that doesn't exist... it's pretty terrible!")
        with(handleRequest(HttpMethod.Post, Routes.RATINGS) {
            addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            setBody(gson.toJson(invalidReview))
        }) {
            assertEquals(HttpStatusCode.Unauthorized, response.status())
        }
    }

    @Test
    fun getSingleRating() = withTestApplication({
        main(true)
        users_module()
        ratings_module()
    }) {
        val instructor = User(null, "test@test.org", "test", "Test", "McTesterson", "The head of the McTesterson family!", true)
        val testUsers = arrayOf(User(null, "cheeseman@goulda.org", "test", "Cheese", "Master", "You will feel the cheese...", false),
                User(null, "no@no.no", "oraoraora", "Jotaro", "Kujo", "Yare Yare Daze...", false)
                )
        transaction(DbSettings.db) {
            instructor.id = Users.insertAndGetId {
                it[email] = instructor.email
                it[password] = instructor.password
                it[first_name] = instructor.firstName
                it[last_name] = instructor.lastName
                it[description] = instructor.description
                it[is_instructor] = instructor.isInstructor
                it[role] = instructor.role
            }.value
        }
        val courses = arrayOf(Course(null, "Meh", "Meh", instructor.id!!, "Coding", 5f),
                Course(null, "Hmmm", "hmmmm", instructor.id!!, "Cooking", 5f)
        )
        transaction(DbSettings.db) {
            for (i in 0 until 2) {
                testUsers[i].id = Users.insertAndGetId {
                    it[email] = testUsers[i].email
                    it[password] = testUsers[i].password
                    it[first_name] = testUsers[i].firstName
                    it[last_name] = testUsers[i].lastName
                    it[description] = testUsers[i].description
                    it[is_instructor] = testUsers[i].isInstructor
                    it[role] = instructor.role
                }.value
                courses[i].id = Courses.insertAndGetId {
                    it[name] = courses[i].name
                    it[description] = courses[i].description
                    it[instructor_id] = courses[i].instructorId
                    it[category] = courses[i].category
                    it[rate] = courses[i].rate
                }.value
            }
        }
        val ratings = arrayOf(Rating(testUsers[0].id!!, courses[0].id!!, 5, "blah"),
                Rating(testUsers[0].id!!, courses[1].id!!, 1, "BLAH"),
                Rating(testUsers[1].id!!, courses[0].id!!, 3, "ORA!!!")
        )
        transaction(DbSettings.db) {
            for (rating in ratings) {
                Ratings.insert {
                    it[user_id] = rating.userId
                    it[course_id] = rating.courseId
                    it[rating_value] = rating.ratingValue
                    it[comment] = rating.comment
                }
            }
        }
        for (rating in ratings) {
            with(handleRequest(HttpMethod.Get, "${Routes.RATINGS}/${rating.courseId}/${rating.userId}")) {
                assertEquals(HttpStatusCode.OK, response.status())
                assertDoesNotThrow { gson.fromJson(response.content, RatingComponent::class.java) }
                val ratingComponent = gson.fromJson(response.content, RatingComponent::class.java)
                assertEquals(rating.userId, ratingComponent.userId)
                assertEquals(rating.courseId, ratingComponent.courseId)
                assertEquals(rating.ratingValue, ratingComponent.ratingValue)
                assertEquals(rating.comment, ratingComponent.comment)
                assertNotNull(ratingComponent.firstName) //Will probably change this to actually check against the proper user later, but right now don't feel like changing the code
                assertNotNull(ratingComponent.lastName)
            }
        }
    }

    @Test
    fun getRatingForeignKeyViolation() = withTestApplication({
        main(true)
        ratings_module()
    }) {
        with(handleRequest(HttpMethod.Get, "${Routes.RATINGS}/5/2")) {
            assertEquals(HttpStatusCode.NoContent, response.status())
        }
    }
}