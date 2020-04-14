package org.covid19support

import org.jetbrains.exposed.sql.Database

object DbSettings {
   val db by lazy {
       Database.connect("jdbc:postgresql://"+ dotenv["DB_HOST"]+"/"+ dotenv["DB_NAME"], driver = "org.postgresql.Driver",
               user = dotenv["DB_USER"]!!, password = dotenv["DB_PASSWORD"]!!)
   }
}