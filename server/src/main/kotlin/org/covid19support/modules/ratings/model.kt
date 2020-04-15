package org.covid19support.modules.ratings

import org.covid19support.modules.courses.Courses
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

data class Rating(val id: Int?,
                  val user_id: Int,
                  val course_id: Int,
                  val rating: Short,
                  val comment: String)

object Ratings : IntIdTable("ratings") {
    val user_id: Column<Int> = integer("user_id").references(Users.id)
    val course_id: Column<Int> = integer("course_id").references(Courses.id)
    val rating: Column<Short> = short("rating")
    val comment: Column<String> = varchar("comment", 512)

    fun toRating(resultRow: ResultRow): Rating {
        return Rating(resultRow[id].value, resultRow[user_id], resultRow[course_id], resultRow[rating], resultRow[comment])
    }
}