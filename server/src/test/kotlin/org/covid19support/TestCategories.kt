package org.covid19support

import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.google.gson.reflect.TypeToken
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.receive
import io.ktor.server.testing.*
import org.covid19support.modules.categories.Category
import org.covid19support.modules.categories.categories_module
import org.junit.jupiter.api.Test
import java.lang.reflect.Type
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class TestCategories {
    val gson: Gson = Gson()

    @Test
    fun validStatus() = withTestApplication({
        main(true)
        categories_module()
    }) {
        with(handleRequest(HttpMethod.Get, "/categories")) {
            assertEquals(HttpStatusCode.OK, response.status())
        }
    }

    @Test
    fun hasContent() = withTestApplication({
        main(true)
        categories_module()
    }) {
        with(handleRequest(HttpMethod.Get, "/categories")) {
            val categories: JsonArray = gson.fromJson(response.content, JsonArray::class.java)
            assertTrue { categories.size() > 0 }
        }
    }
}

