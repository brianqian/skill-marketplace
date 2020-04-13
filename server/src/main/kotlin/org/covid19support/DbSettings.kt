package org.covid19support

import org.jetbrains.exposed.sql.Database

object DbSettings {
   val db by lazy {
       Database.connect("jdbc:postgresql://localhost/skill_marketplace", driver = "org.postgresql.Driver",
               user = "gaurdianaq", password = "password")
   }
}