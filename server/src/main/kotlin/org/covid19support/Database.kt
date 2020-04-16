package org.covid19support

import org.jetbrains.exposed.sql.Database

//will add more to this as I run across more
enum class SQLState(val code: String) {
    UNIQUE_CONSTRAINT_VIOLATION("23505"),

}

object DbSettings {
   val db by lazy {
       Database.connect("jdbc:postgresql://"+ dotenv["DB_HOST"]+"/"+ dotenv["DB_NAME"], driver = "org.postgresql.Driver",
               user = dotenv["DB_USER"]!!, password = dotenv["DB_PASSWORD"]!!)
   }
}