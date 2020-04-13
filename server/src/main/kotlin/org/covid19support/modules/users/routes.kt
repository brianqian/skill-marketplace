package org.covid19support.modules.users

import io.ktor.application.*
import io.ktor.routing.*
import io.ktor.response.*
import org.covid19support.DbSettings
import org.jetbrains.exposed.sql.Query
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.users() {
    routing {
        get("/users") {
            var message:String = "";
            transaction(DbSettings.db) {
                val allUsers:Query = Users.selectAll()
                allUsers.forEach {
                    message += it[Users.email]
                }
            }
            call.respondText(message)
        }
    }
}