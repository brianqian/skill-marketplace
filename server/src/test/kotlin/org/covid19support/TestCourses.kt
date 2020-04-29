package org.covid19support

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.testing.*
import org.covid19support.modules.courses.Course
import org.covid19support.modules.courses.courses_module
import org.covid19support.modules.session.Login
import org.covid19support.modules.session.session_module
import org.covid19support.modules.users.User
import org.covid19support.modules.users.users_module
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.*
import kotlin.test.assertEquals

class TestCourses {
    //TODO Add Courses
    //TODO Add Courses Missing Data
    //TODO Add Courses Foreign Key Violation
    //TODO Add Courses Unauthenticated
    //TODO Add Courses Missing Required Info
    //TODO Add Courses Invalid Data
    //TODO Get Courses
    //TODO Get Courses By Category
    //TODO Get Courses By Instructor
    //TODO Get Courses by Category & Instructor
    //TODO Get Courses does Not Exist
    //TODO Edit Course
    //TODO Edit Course Unauthenticated
    //TODO Edit Course Unauthorized
    //TODO Delete Courses
    //TODO Delete Courses
    //TODO Delete Courses Unauthenticated
    //TODO Delete Courses Unauthorized
    //TODO Delete Course when Users have Booked

    private val gson: Gson = Gson()

    @Test
    fun addCourses() = withTestApplication({
        main(true)
        users_module()
        session_module()
        courses_module()
    }) {
        val testUsers: Array<User> = arrayOf(
                User(null, "cheeseguy@cheesey.com", "gouldalover#123", "Brie", "Camenbert", "The cheesiest of cheesey people.", true),
                User(null, "test@test.org", "test", "Test", "McTesterson", "The head of the McTesterson Household", true),
                User(null, "anonymous@cantfindme.ca", "secretphrase" , "Mr.", "E", null, true)
        )
        for (user in testUsers) {
            with(handleRequest(HttpMethod.Post, Routes.USERS) {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(user))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                user.id = gson.fromJson(response.content, User::class.java).id
            }
        }
        cookiesSession {
            val login: Login = Login(testUsers[0].email, testUsers[0].password)
            with(handleRequest(HttpMethod.Post, Routes.LOGIN) {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(login))
            }) {
                assertEquals(HttpStatusCode.OK, response.status())
            }

            val testCourses: Array<Course> = arrayOf(
                    Course(null, "Cheese Appreciation", "The art of cheese appreciation is a fine one, but often misunderstood!", -1, "Cooking", 14.3f),
                    Course(null, "Cheese Making", "You'll learn how to make delicious cheese!", -1, "Cooking", 15.0f),
                    Course(null, "Cheese Photography", "You will learn how to truly capture the essence of cheese in your photography!", -1,"Photography/Film", 11f)
            )

            for (course in testCourses) {
                with(handleRequest(HttpMethod.Post, Routes.COURSES) {
                    addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                    setBody(gson.toJson(course))
                }) {
                    assertEquals(HttpStatusCode.Created, response.status())
                }
            }
        }
    }
}