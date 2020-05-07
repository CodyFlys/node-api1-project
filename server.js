const express = require('express'); // imports the express package
const db = require("./database.js");
const server = express(); // creates the server using express
require=('dotenv').config();

const port = process.env.PORT;

server.use(express.json())

let users = [
    { id: 1, name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane" },
    { id: 2, name: "John Apples", bio: "Not apple, just John" },
    { id: 3, name: "Apples", bio: "Not john, only apples" },
]

allIds = users.map(user => {
    return user.id
})
console.log(allIds)


server.get('/', (req, res) => {
    res.status(200).json({MESSAGE: process.env.MOTD})
})

server.get('/api/users', function (req, res) {
    if (users) {
        res.json(users)
    } else {
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.post("/api/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        bio: req.body.bio
    }
    users.push(newUser)

    if (req.body.name.length == 0 || req.body.bio.length == 0) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    } else if(users.includes(newUser)) {
        res.status(200).json(newUser)
    } else {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database" })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    if (!users) {
        res.status(500).json({errorMessage: "The user could not be removed" })
    } else if(allIds.includes(Number(id))) {
        users = users.filter(user => user.id != id)
        res.status(200).json(users)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.put('/api/users/:id', function (req, res) {
    const id = req.params.id
    let updatedUser = users.filter(user => user.id == id)
    if (req.body.name.length == 0 || req.body.bio.length == 0) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    } else if(allIds.includes(Number(id))) {
        users[id - 1].name = req.body.name
        users[id - 1].bio = req.body.bio
        res.status(200).json(users)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    foundUser = users.filter(user => user.id == id)
    allIds = users.map(user => {
        return user.id
    })
    console.log(allIds)

    if (allIds.includes(Number(id))) {
        res.status(200).json(foundUser)
    } else if (!users) {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database" })
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.listen(port, () => 
console.log(`Server listening on http://localhost:${port}`)
)