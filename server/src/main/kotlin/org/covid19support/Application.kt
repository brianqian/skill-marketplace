package org.covid19support

import io.ktor.application.*
import io.ktor.features.DefaultHeaders
import io.ktor.response.*
import io.ktor.routing.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.main() {
    install(DefaultHeaders)
    routing {
        get ("/cheese") {
            org.covid19support.DbSettings
            call.respondText("GOUDA!")
        }
    }
}

fun Application.test2(testing: Boolean = false) {
    routing {
        get("/tiger") {
            call.respondText("White")
        }
    }
}