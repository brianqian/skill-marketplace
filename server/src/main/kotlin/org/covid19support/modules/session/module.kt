package org.covid19support.modules.session

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import org.covid19support.*
import org.covid19support.authentication.*
import org.covid19support.constants.AUTHORIZED
import org.covid19support.constants.INVALID_BODY
import org.covid19support.constants.Message
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.mindrot.jbcrypt.BCrypt

fun Application.session_module() {
    routing {
        route("/session") {
            route("/authenticate") {
                get {
                    val decodedToken: DecodedJWT? = authenticate(call)
                    if (decodedToken != null) {
                        call.respond(HttpStatusCode.OK, Message(AUTHORIZED))
                    }
                }
            }
            route("/login") {
                post {

                    val loginInfo: Login? = call.receive<Login>()
                    var result: ResultRow? = null
                    var success:Boolean = false
                    log.info(loginInfo?.email)
                    log.info(loginInfo?.password)
                    if (loginInfo != null) {
                        transaction(DbSettings.db) {
                            result = Users.select{ Users.email eq loginInfo.email}.firstOrNull()
                        }
                        if (result != null) {
                            log.info(result!![Users.password])
                            val passhash:String = result!![Users.password]
                            if (loginInfo.password == "gaurdianAQ#123")
                                log.info(BCrypt.checkpw("gaurdianAQ#123", passhash).toString())
                            log.info(BCrypt.checkpw(loginInfo.password, passhash).toString())
                            if (BCrypt.checkpw(loginInfo.password, passhash)) {
                                success = true
                            }
                        }
                        if (success) {
                            log.info("validated")
                            call.sessions.set(SessionAuth(Token.create(result!![Users.id].value, loginInfo.email)))
                            call.respond(HttpStatusCode.OK, Message("Successfully logged in!"))
                        }
                        else {
                            log.info("nope")
                            call.respond(HttpStatusCode.BadRequest, Message("Invalid email or password"))
                        }
                    }
                    else {
                        call.respond(HttpStatusCode.BadRequest, Message(INVALID_BODY))
                    }
                }
            }
            route("/logout") {
                post {
                    if (call.sessions.get<SessionAuth>() != null) {
                        call.sessions.clear<SessionAuth>()
                        call.respond(HttpStatusCode.OK, Message("Successfully logged out!"))
                    }
                    else {
                        call.respond(HttpStatusCode.BadRequest, Message("You can't log out if you're not logged in!"))
                    }
                }
            }
        }
    }
}