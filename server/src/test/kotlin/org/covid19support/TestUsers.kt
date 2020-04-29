package org.covid19support

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.testing.*
import org.covid19support.modules.users.User
import org.covid19support.modules.users.users_module
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class TestUsers {
    private val gson: Gson = Gson()

    @Test
    fun testAddUser() = withTestApplication({
        main(true)
        users_module()
    }) {
        val testUser: User = User(null, "test@test.org", "test123", "Test", "McTesterson", null)
        val call = handleRequest(HttpMethod.Post, "/users") {
            addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
            setBody(gson.toJson(testUser))
        }
        assertEquals(HttpStatusCode.Created, call.response.status())
    }
}