package org.covid19support

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.testing.*
import org.covid19support.modules.users.User
import org.covid19support.modules.users.users_module
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Test
import kotlin.test.*

class TestUsers {

    //TODO Add User Unique Violation
    //TODO Add User Missing Required Info
    //TODO Get User Does Not Exist
    //TODO Invalid Email & Password (once validation is added)
    //TODO Edit User
    //TODO Edit User Unauthenticated
    //TODO Edit User Unauthorized
    //TODO Delete User
    //TODO Delete User Unauthenticated
    //TODO Delete User Unauthorized

    private val gson: Gson = Gson()

    @Test
    fun addUsers() = withTestApplication({
        main(true)
        users_module()
    }) {
        val testUsers: Array<User> = arrayOf(
            User(null, "test@test.org", "test123", "Test1", "McTesterson", "The head of the McTesterson House, Mr. McTesterson rules with an iron fist!"),
            User(null, "test2@test.org", "test123", "Test2", "McTesterson", null),
            User(null, "test3@test.org", "test321", "Test3", "Not McTesterson", "The head of the Not McTesterson House, Mr. McTesterson rules with an iron fist!"),
            User(null, "test4@test.org", "test321", "Test4", "Not McTesterson", "The foot of the Not McTesterson House, Mr. McTesterson rules with an iron fist!"),
            User(null, "test5@test.org", "test1234", "Test5", "McTesterson", null)
        )
        for (user in testUsers) {
            with (handleRequest(HttpMethod.Post, "/users") {
                addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
                setBody(gson.toJson(user))
            }) {
                assertEquals(HttpStatusCode.Created, response.status())
                user.id = gson.fromJson(response.content, User::class.java).id
            }
        }

        with(handleRequest(HttpMethod.Get, "/users")) {
            assertEquals(HttpStatusCode.OK, response.status())
            lateinit var users: Array<User>
            assertDoesNotThrow { users = gson.fromJson(response.content, Array<User>::class.java) }
            assertTrue { users.size == 5 }
        }

        for (user in testUsers) {
            with (handleRequest(HttpMethod.Get, "/users/${user.id}")) {
                assertDoesNotThrow { gson.fromJson(response.content, User::class.java) }
                val responseUser: User = gson.fromJson(response.content, User::class.java)
                assertEquals(user.description, responseUser.description)
                assertEquals(user.email, responseUser.email)
                assertEquals(user.firstName, responseUser.firstName)
                assertEquals(user.lastName, responseUser.lastName)
                assertEquals(user.isInstructor, responseUser.isInstructor)
                assertEquals(user.role, responseUser.role)
                assertNull(responseUser.password)
            }
        }

    }
}