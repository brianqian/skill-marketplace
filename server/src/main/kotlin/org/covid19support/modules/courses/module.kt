package org.covid19support.modules.courses

import io.ktor.application.*
import io.ktor.routing.*
import io.ktor.response.*
import org.covid19support.DbSettings
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.courses_module() {
    routing {
        get("/courses") {
            val courses: MutableList<Course> = mutableListOf<Course>()
        }
    }
}