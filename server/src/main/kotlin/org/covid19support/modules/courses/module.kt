package org.covid19support.modules.courses

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.routing.*
import io.ktor.response.*
import org.covid19support.constants.INVALID_BODY
import org.covid19support.modules.authentication.authenticate

fun Application.courses_module() {
    routing {
        get("/courses") {
            val courses: MutableList<Course> = mutableListOf<Course>()
            call.respondText("Not Implemented Yet!")
        }

        get("/courses/test") {
            val decodedToken: DecodedJWT? = authenticate(call)
            if (decodedToken != null) {
                call.respond("AUTHENTICATED!")
            }
        }

        post("/courses") {
            val decodedToken: DecodedJWT? = authenticate(call)
            if (decodedToken != null) {
                val course: Course? = call.receive<Course>()
                if (course != null) {

                }
                else {
                    call.respond(HttpStatusCode.BadRequest, INVALID_BODY)
                }
            }
        }
    }
}