package org.covid19support

import io.ktor.http.*
import io.ktor.server.testing.*
import io.ktor.sessions.*
import org.covid19support.modules.courses.Course
import org.covid19support.modules.courses.courses_module
import org.covid19support.modules.ratings.Rating
import org.covid19support.modules.ratings.ratings_module
import org.covid19support.modules.users.User
import org.covid19support.modules.users.users_module
import org.junit.jupiter.api.Test
import kotlin.test.*

class TestRatings : BaseTest() {
    //TODO Add Ratings Success
    //TODO Add Ratings Failure (Foreign Key Violation)
    //TODO Add Ratings Failure (Text Too Long)
    //TODO Add Ratings Failure (Missing Data)
    //TODO Add Ratings Failure (Invalid Data) - Not Implemented
    //TODO Add Ratings Failure (Unauthenticated)
    //TODO Get Ratings for Course Success
    //TODO Get Ratings for Course Failure (Foreign Key Violation)
    //TODO Get Ratings for Course Failure (Course Does Not Exist)
    //TODO Get Ratings Failure (Rating or Course Does Not Exist)
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
        courses_module()
        ratings_module()
    }) {
        cookiesSession {
            val testUser = User(null, "test@test.org", "test123", "Test1", "McTesterson", "The head of the McTesterson House, Mr. McTesterson rules with an iron fist!")
            with(handleRequest(HttpMethod.Post, Routes.USERS){
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(testUser))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                assertNotNull(sessions.get<SessionAuth>())
                val userWithId = gson.fromJson(response.)
            }

            val testCourse = Course(null, "Unit Testing 101", "Introduction to unit testing", -1, "Coding", 5f)
            with(handleRequest(HttpMethod.Post, Routes.COURSES){
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(testCourse))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
            }

            val ratings = arrayOf(
                    Rating()
            )
        }


    }
}