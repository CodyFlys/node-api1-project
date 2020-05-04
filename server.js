const express = require('express'); // imports the express package
const db = require("./database.js");
const server = express(); // creates the server using express

server.use(express.json())

let users = [
    { id: "1", name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane" },
    { id: "2", name: "John Apples", bio: "Not apple, just John" },
    { id: "3", name: "Apples", bio: "Not john, only apples" },
]


server.get('/', (req, res) => {
    res.send('Main Root End Point!')
})

server.get('/api/users', function (req, res) {
    // const users = db.getUsers()

    if (users) {
        res.json(users)
    } else {
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.post('/api/users', function (req, res) {
    const newUser = req.body;
    users.push(newUser)

    if (users.includes(newUser)) {
        res.status(200).json(newUser)
    } else {
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.delete('/api/users/:id', function (req, res) {
    const id = req.params.id

    users.forEach((user) => {
        if(user.id == id){
            users = users.filter(user => user.id != id)
            res.status(200).json(users)
        } else if (user.id != id) {
            res.status(404).json({errorMessage: "DELETE User with the specified ID does not exist."})
        } else {
            res.status(500).json({errorMessage: "DELETE User cannot not be removed"})
        }
    })
})

server.put('/api/users/:id', function (req, res) {
    const id = req.params.id

    users.forEach((user) => {
        if(user.id == id){
            user.name = req.body.name || user.name
            user.bio = req.body.bio || user.bio,
            res.status(200).json(users)
        } else if (user.id != id) {
            res.status(404).json({errorMessage: "User with the specified ID does not exist."})
        } else {
            res.status(500).json({errorMessage: "User cannot not be removed"})
        }
    })

})

server.get('/api/users/:id', function (req, res) {
    const id = req.params.id

    users.forEach((user) => {
        if(user.id == id){
            res.status(200).json(user)
        } else if (user.id != id) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else {
            res.status(500).json({errorMessage: "The user information could not be retrieved."})
        }
    })
})

server.listen(5000, () => 
console.log('Server listening on http://localhost:5000')
)