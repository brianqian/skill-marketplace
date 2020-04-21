package org.covid19support.modules.ratings

import org.covid19support.modules.courses.Courses
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.sql.*

data class Rating(val id: Int?,
                  val user_id: Int,
                  val course_id: Int,
                  val rating_value: Short,
                  val comment: String)

object Ratings : Table("ratings") {
    val id: Column<Int> = integer("id").autoIncrement()
    val user_id: Column<Int> = integer("user_id").references(Users.id)
    val course_id: Column<Int> = integer("course_id").references(Courses.id)
    val rating_value: Column<Short> = short("rating")
    val comment: Column<String> = varchar("comment", 512)
    override val primaryKey = PrimaryKey(id, name = "PK_Ratings_Id")

    fun toRating(resultRow: ResultRow): Rating {
        return Rating(resultRow[id], resultRow[user_id], resultRow[course_id], resultRow[rating_value], resultRow[comment])
    }
}