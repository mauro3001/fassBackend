/**
 * This file have the endpoints to get the users from Notion
 */
require('dotenv').config()
const express = require('express')
const { getUsers } = require('./notion')
const { getNotionData } = require('./information')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/fass', async (req, res) => {
    try {
        const nameFilter = req.query.nameFilter;

        // Call function getUsers with filter (if exist)
        const users = await getUsers({ nameFilter: nameFilter });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
})

app.listen(process.env.PORT)

/**
 * import in json the results with fs, whit that you know the format of the data with notion and you can map it
 */
//getNotionData()