package org.covid19support

import com.google.gson.Gson
import com.google.gson.JsonArray
import io.ktor.http.*
import io.ktor.server.testing.*
import org.covid19support.modules.categories.Category
import org.covid19support.modules.categories.categories_module
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
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
            lateinit var categories: Array<Category>
            assertEquals(HttpStatusCode.OK, response.status())
            assertDoesNotThrow { categories = gson.fromJson(response.content, Array<Category>::class.java) }
            assertTrue { categories.isNotEmpty() }
        }
    }
}

