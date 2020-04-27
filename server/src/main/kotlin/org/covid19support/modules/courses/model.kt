package org.covid19support.modules.courses

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonSerializationContext
import com.google.gson.JsonSerializer
import org.covid19support.modules.categories.Categories
import org.covid19support.modules.users.User
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.sql.*
import java.lang.reflect.Type

data class Course(val id: Int?,
                  val name: String,
                  val description: String,
                  val instructor_id: Int,
                  val category: String,
                  val rate: Float)

data class CourseComponent(
        val instructor_id: Int,
        val instructor_name: String,
        val course_id: Int,
        val course_name: String,
        val course_rating: Short?,
        val course_category: String,
        val course_rate: Float
)

class CourseComponentSerializer : JsonSerializer<CourseComponent> {
    override fun serialize(src: CourseComponent?, srcType: Type?, context: JsonSerializationContext?): JsonElement {
        val output = JsonObject()
        val instructor = JsonObject()
        val course = JsonObject()
        instructor.addProperty("id", src?.instructor_id)
        instructor.addProperty("name", src?.instructor_name)
        course.addProperty("id", src?.course_id)
        course.addProperty("name", src?.course_name)
        if (src?.course_rating != null) {
            course.addProperty("rating", src.course_rating)
        }
        course.addProperty("category", src?.course_category)
        course.addProperty("rate", src?.course_rate)
        output.add("instructor", instructor)
        output.add("course", course)
        return output
    }
}

object Courses : Table("courses") {
    val id: Column<Int> = integer("id").autoIncrement()
    val name: Column<String> = varchar("name", 64)
    val description: Column<String> = varchar("description", 1024)
    val instructor_id: Column<Int> = integer("instructor_id").references(Users.id)
    val category: Column<String> = varchar("category", 128).references(Categories.name)
    val rate: Column<Float> = float("rate")
    override val primaryKey = PrimaryKey(id, name = "PK_Courses_Id")

    fun toCourse(resultRow: ResultRow): Course {
        return Course(resultRow[id], resultRow[name], resultRow[description], resultRow[instructor_id], resultRow[category], resultRow[rate])
    }
}