package org.covid19support

import org.jetbrains.exposed.sql.Database

//will add more to this as I run across more
enum class SQLState(val code: String) {
    UNIQUE_CONSTRAINT_VIOLATION("23505"),
    FOREIGN_KEY_VIOLATION("23503")

}

object DbSettings {
    private lateinit var db_url: String
    private lateinit var db_user: String
    private lateinit var db_password: String

    fun init(isTesting: Boolean) {
        if (isTesting) {
            db_url = "jdbc:postgresql://"+ dotenv["TEST_DB_HOST"]+"/"+ dotenv["TEST_DB_NAME"]
            db_user = dotenv["TEST_DB_USER"]!!
            db_password = dotenv["TEST_DB_PASSWORD"]!!
        }
        else {
            db_url = "jdbc:postgresql://"+ dotenv["DB_HOST"]+"/"+ dotenv["DB_NAME"]
            db_user = dotenv["DB_USER"]!!
            db_password = dotenv["DB_PASSWORD"]!!
        }
    }

    val db by lazy {
       Database.connect(db_url, driver = "org.postgresql.Driver",
               user = db_user, password = db_password)
    }
}