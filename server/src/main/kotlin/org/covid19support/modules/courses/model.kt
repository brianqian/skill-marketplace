package org.covid19support.modules.courses

import org.covid19support.modules.categories.Categories
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

data class Course(val id: Int?,
                  val name: String,
                  val description: String,
                  val instructor_id: Int,
                  val category: String,
                  val rate: Float)

object Courses : IntIdTable("courses") {
    val name: Column<String> = varchar("name", 64)
    val description: Column<String> = varchar("description", 1024)
    val instructor_id: Column<Int> = integer("instructor_id").references(Users.id)
    val category: Column<String> = varchar("category", 128).references(Categories.name)
    val rate: Column<Float> = float("rate")

    fun toCourse(resultRow: ResultRow): Course {
        return Course(resultRow[id].value, resultRow[name], resultRow[description], resultRow[instructor_id], resultRow[category], resultRow[rate])
    }
}