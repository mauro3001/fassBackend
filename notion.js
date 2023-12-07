/**
 * This file contains the functions to get the users from Notion, and have logic to filter by name
 */
const { Client } = require('@notionhq/client')
const fs = require('fs')

const notion = new Client ({ auth: process.env.NOTION_TOKEN })

const getUsers = async ({nameFilter} = {}) => {
    const query = {
        database_id: process.env.NOTION_DATABASE_ID,
    }

    if (nameFilter){
        query.filter = {
            property: 'User',
            rich_text: {
                equals: nameFilter
            }
        }
    }

    const { results } = await notion.databases.query(query)

    return results.map(page => {
        const { properties } = page
        const { Name, Tags, User, Password, ImageUrl, DateTime } = properties

        let name = Name.title.length > 0 ? Name.title[0].plain_text : 'Nombre no disponible';
        let user = User.rich_text.length > 0 ? User.rich_text[0].plain_text : 'Usuario no disponible';
        let password = Password.rich_text.length > 0 ? Password.rich_text[0].plain_text : 'Contraseña no disponible';
        let imageUrl = ImageUrl.files.length > 0 ? ImageUrl.files[0].file.url : 'No disponemos de imagen';

        return {
            name,
            tags: Tags.multi_select.map(tag => tag.name),
            user,
            password,
            date: DateTime.last_edited_time,
            imageUrl,
        }
    });
}

//export module
module.exports = { getUsers };