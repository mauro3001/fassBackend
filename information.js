/**
 * @fileoverview Information about the database
 * This file can get all information about format of the database, and you can map it with a json file
 */
const { Client } = require('@notionhq/client')
const fs = require('fs')

//to get information from the database and connect
async function getNotionData() {

    const notion = new Client ({ auth: process.env.NOTION_TOKEN })

    const response = await 
    notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID })

    //import in json the results with fs, whit that you know the format of the data with notion and you can map it
    fs.writeFileSync('./data.json', JSON.stringify(response, null, 2));
}

//export module
module.exports = { getNotionData };