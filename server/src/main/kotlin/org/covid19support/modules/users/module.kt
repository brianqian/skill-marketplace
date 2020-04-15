package org.covid19support.modules.users

import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.routing.*
import io.ktor.response.*
import io.ktor.sessions.sessions
import io.ktor.sessions.set
import org.covid19support.DbSettings
import org.covid19support.SQLState
import org.covid19support.SessionAuth
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*
import org.jetbrains.exposed.exceptions.*
import org.mindrot.jbcrypt.BCrypt
import org.covid19support.modules.authentication.Token


fun Application.users_module() {
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
            var id:Int = -1
            try {
                transaction (DbSettings.db) {
                    id = Users.insertAndGetId {
                        it[email] = newUser.email
                        it[password] = BCrypt.hashpw(newUser.password, BCrypt.gensalt())
                        it[first_name] = newUser.first_name
                        it[last_name] = newUser.last_name
                        it[description] = newUser.description
                        it[is_instructor] = newUser.is_instructor
                    }.value
                }
                call.sessions.set(SessionAuth(Token.create(id, newUser.email)))
                call.respond(HttpStatusCode.Created, "Successfully registered " + newUser.email)
            }
            catch (ex:ExposedSQLException)
            {
                when (ex.sqlState) {
                    SQLState.UNIQUE_CONSTRAINT_VIOLATION.code -> call.respond(HttpStatusCode.BadRequest, "Email already taken!")
                    else -> call.respond(HttpStatusCode.InternalServerError, "Oh No... Something went wrong!")
                }
            }
        }

        post( "/session/login") {
            val loginInfo: Login = call.receive<Login>()
            var result:ResultRow? = null
            var success:Boolean = false
            transaction(DbSettings.db) {
                result = Users.select{Users.email eq loginInfo.email}.firstOrNull()
            }
            if (result != null) {
                val passhash:String = result!![Users.email]
                if (BCrypt.checkpw(loginInfo.password, passhash)) {
                    success = true
                }
            }
            if (success) {
                call.sessions.set(SessionAuth(Token.create(result!![Users.id].value, loginInfo.email)))
                call.respond(HttpStatusCode.OK, "Successfully logged in!")
            }
            else {
                call.respond(HttpStatusCode.BadRequest, "Invalid email or password")
            }

        }
    }
}