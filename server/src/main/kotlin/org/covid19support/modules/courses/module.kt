package org.covid19support.modules.courses

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.*
import io.ktor.routing.*
import io.ktor.response.*
import io.ktor.sessions.*
import org.covid19support.DbSettings
import org.covid19support.SessionAuth
import org.covid19support.modules.authentication.Token
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.courses_module() {
    routing {
        get("/courses") {
            val courses: MutableList<Course> = mutableListOf<Course>()
            call.respondText("Not Implemented Yet!")
        }

        get("/courses/test") {
            val token: String? = call.sessions.get<SessionAuth>()?.token
            if (token != null)
            {
                val decodedToken: DecodedJWT? = Token.verify(token)
                if (decodedToken != null) {
                    call.respond("authenticated!")
                }
                else {
                    call.respond("SHAME, sending a fake token!")
                }
            }
            else {
                call.respond("Please login!")
            }
        }

        post("/courses") {
           val token: String? = call.sessions.get<SessionAuth>()?.token
            if (token != null)
            {
                val decodedToken: DecodedJWT? = Token.verify(token)
                if (decodedToken != null) {
                    //decodedToken.
                }
                else {

                }
            }
        }
    }
}