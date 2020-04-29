package org.covid19support

import com.google.gson.Gson
import com.google.gson.JsonArray
import io.ktor.http.*
import io.ktor.server.testing.*
import org.covid19support.modules.categories.categories_module
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class TestCategories {
    private val gson: Gson = Gson()

    @Test
    fun testCategories() = withTestApplication({
        main(true)
        categories_module()
    }) {
        with(handleRequest(HttpMethod.Get, "/categories")) {
            val categories: JsonArray = gson.fromJson(response.content, JsonArray::class.java)
            assertEquals(HttpStatusCode.OK, response.status())
            assertTrue { categories.size() > 0 }
            for (category in categories) {
                assertTrue { category.isJsonObject }
                assertTrue { category.asJsonObject.has("name") }
                assertTrue { category.asJsonObject.get("name").isJsonPrimitive }
                assertTrue { category.asJsonObject.get("name").asJsonPrimitive.isString }
            }
        }
    }
}

