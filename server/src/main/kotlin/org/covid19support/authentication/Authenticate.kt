package org.covid19support.authentication

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.application.ApplicationCall
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.sessions.get
import io.ktor.sessions.sessions
import org.covid19support.SessionAuth
import org.covid19support.constants.SHAME
import org.covid19support.constants.UNAUTHORIZED

//Checks for session token, checks if it's valid, and responds appropriately if it's not
//Returns token if valid, and null if not.
suspend fun authenticate(call: ApplicationCall): DecodedJWT? {
    val token: String? = call.sessions.get<SessionAuth>()?.token
    var decodedToken: DecodedJWT? = null
    if (token != null) {
        decodedToken = Token.verify(token)
        if (decodedToken == null) {
            call.respond(HttpStatusCode.Unauthorized, SHAME)
        }
    }
    else {
        call.respond(HttpStatusCode.Unauthorized, UNAUTHORIZED)
    }
    return decodedToken
}