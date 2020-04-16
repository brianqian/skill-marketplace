package org.covid19support.modules.contact_info

import org.covid19support.modules.contact_methods.ContactMethods
import org.covid19support.modules.users.Users
import org.jetbrains.exposed.sql.*

data class ContactInfo(val id: Int?,
                       val user_id: Int,
                       val contact_method: String,
                       val contact_info: String)

object ContactInfoTable : Table("contact_info") {
    val id: Column<Int> = integer("id").autoIncrement()
    val user_id: Column<Int> = integer("user_id").references(Users.id)
    val contact_method: Column<String> = varchar("contact_method", 128).references(ContactMethods.name)
    val contact_info: Column<String> = varchar("contact_info", 256)
    override val primaryKey = PrimaryKey(id, name = "PK_Contact_Info_Id")

    fun toContactInfo(resultRow: ResultRow): ContactInfo {
        return ContactInfo(resultRow[id], resultRow[user_id], resultRow[contact_method], resultRow[contact_info])
    }
}