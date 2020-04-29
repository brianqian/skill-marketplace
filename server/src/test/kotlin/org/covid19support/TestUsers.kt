package org.covid19support

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.testing.*
import org.covid19support.modules.users.User
import org.covid19support.modules.users.users_module
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue

class TestUsers {
    private val gson: Gson = Gson()

    @Test
    fun testAddUser() = withTestApplication({
        main(true)
        users_module()
    }) {
        var testUser: User = User(null, "test@test.org", "test123", "Test", "McTesterson", null)
        val insertCall = handleRequest(HttpMethod.Post, "/users") {
            addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            setBody(gson.toJson(testUser))
        }
        assertEquals(HttpStatusCode.Created, insertCall.response.status())
        val responseUser: User? = gson.fromJson(insertCall.response.content, User::class.java)
        assertNotEquals(null, responseUser)
        println(responseUser.toString())
        assertTrue { testUser.is_instructor == responseUser!!.is_instructor }
        assertTrue { testUser.description == responseUser!!.description }
        assertTrue { testUser.first_name == responseUser!!.first_name }
        assertTrue { testUser.last_name == responseUser!!.last_name }
        assertTrue { testUser.email == responseUser!!.email }
        assertTrue { testUser.role == responseUser!!.role }
    }
}