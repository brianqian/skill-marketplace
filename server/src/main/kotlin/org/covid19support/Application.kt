package org.covid19support

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.gson
import io.ktor.http.ContentType

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.main() {
    install(DefaultHeaders)
    install(ContentNegotiation) {
        gson {

        }
    }

}