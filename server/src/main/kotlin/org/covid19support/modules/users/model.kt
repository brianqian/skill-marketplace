package org.covid19support.modules.users

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonSerializationContext
import com.google.gson.JsonSerializer
import org.covid19support.modules.roles.Roles
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import java.lang.reflect.Type

data class User(
        val id: Int?,
        val email: String,
        val password: String,
        val first_name: String,
        val last_name: String,
        val description: String?,
        val is_instructor: Boolean = false,
        val role: String = "Normal"
)

class UserSerializer : JsonSerializer<User> {
    override fun serialize(src: User?, srcType: Type?, context: JsonSerializationContext?): JsonElement {
        val output: JsonObject = JsonObject()
        output.addProperty("email", src?.email)
        output.addProperty("first_name", src?.first_name)
        output.addProperty("last_name", src?.last_name)
        output.addProperty("description", src?.description)
        output.addProperty("is_instructor", src?.is_instructor)
        output.addProperty("role", src?.role)
        return output
    }

}

data class Login(
        val email: String,
        val password: String
)

object Users : IntIdTable("users") {
    val email: Column<String> = varchar("email", 256).uniqueIndex()
    val password: Column<String> = varchar("password", 64)
    val first_name: Column<String> = varchar("first_name", 32)
    val last_name: Column<String> = varchar("last_name", 32)
    val description: Column<String?> = varchar("description", 1024).nullable()
    val is_instructor: Column<Boolean> = bool("is_instructor").default(false)
    val role: Column<String> = varchar("role", 128).references(Roles.name).default("Normal")

    fun toUser(resultRow: ResultRow): User {
        return User(resultRow[id].value, resultRow[email], resultRow[password], resultRow[first_name], resultRow[last_name], resultRow[description], resultRow[is_instructor], resultRow[role])
    }
}

