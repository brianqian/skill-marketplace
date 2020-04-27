package org.covid19support

import io.github.cdimascio.dotenv.Dotenv
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.gson
import io.ktor.sessions.*
import org.covid19support.modules.courses.CourseComponent
import org.covid19support.modules.courses.CourseComponentSerializer
import org.covid19support.modules.users.User
import org.covid19support.modules.users.UserSerializer



fun main(args: Array<String>) {
    dotenv = Dotenv.load()
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.main() {
    install(DefaultHeaders)
    install(ContentNegotiation) {
        gson {
            registerTypeAdapter(User::class.java, UserSerializer())
            registerTypeAdapter(CourseComponent::class.java, CourseComponentSerializer())
        }
    }
    install(Sessions) {
        cookie<SessionAuth>("TOKEN") {
            cookie.httpOnly = true
        }
    }
}