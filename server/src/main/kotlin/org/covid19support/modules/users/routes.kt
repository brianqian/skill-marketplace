package org.covid19support.modules.users

import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.routing.*
import io.ktor.response.*
import org.covid19support.DbSettings
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.mindrot.jbcrypt.BCrypt

fun Application.users() {
    routing {
        get("/users") {
            val users: MutableList<User> = mutableListOf<User>()
            transaction(DbSettings.db) {
                val results:List<ResultRow> = Users.selectAll().toList()
                results.forEach {
                    users.add(Users.toUser(it))
                }
            }
            call.respond(users)
        }
        get("/users/{id}") {
            var user: User? = null
            val id:Int = call.parameters["id"]!!.toInt()
            transaction(DbSettings.db) {
                val result:ResultRow? = Users.select{Users.id eq id}.firstOrNull()

                if (result != null) {
                    user = Users.toUser(result)
                }

            }
            if (user == null) {
                call.respondText("User not found!", status = HttpStatusCode.BadRequest)
            }
            else {
                call.respond(user as User)
            }
        }
        post("/users") {
            val newUser: User = call.receive<User>()
            transaction (DbSettings.db) {
                Users.insert {
                    it[email] = newUser.email
                    it[password] = BCrypt.hashpw(newUser.password, BCrypt.gensalt())
                    it[first_name] = newUser.first_name
                    it[last_name] = newUser.last_name
                    it[description] = newUser.description
                    it[is_instructor] = newUser.is_instructor
                }
            }
        }
    }
}