package org.covid19support.modules.categories

import io.ktor.application.*
import io.ktor.routing.*
import io.ktor.response.*
import org.covid19support.DbSettings
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.categories_module() {
    routing {
        get("/categories") {
            val categories: MutableList<Category> = mutableListOf<Category>()
            transaction(DbSettings.db) {
                val results:List<ResultRow> = Categories.selectAll().toList()
                results.forEach {
                    categories.add(Categories.toCategory(it))
                }
            }

            call.respond(categories)
        }
    }
}