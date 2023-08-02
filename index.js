// This is were are create my app
const express = require('express')
const path = require('path')
const app = express()
const port = parseInt(process.env.PORT) 
const bodyparser = require("body-parser")
const db = require('./config')
const bodyParser = require('body-parser')

// These are the files we want our api to serve us

app.use(express.urlencoded({extented: false}));

app.get("/", (req, res) =>{
    res.status(200).sendFile(
        path.resolve(__dirname,'./static/html/index.html')
    )
});

// We want to target all the db objects usings methods (GET, POST, PATCH)

app.get('./users', (req, res) => {
    const query = `
    SELECT userID, firstName, lastName
    FROM Users;

    `
    db.query(query, (err, data) => {
          if(err) throw err
          res.json({
            status: res.statusCode,
            results: data
          })
    })
});

// We now want to apply the POST method to allow the user to register

app.post('/register', bodyParser.json(), (req, res) => {
    
    const regisquery = `
    
    INSERT INTO Users
    SET ?;
    `

    db.query(regisquery, [req.body, req.params.id], (err) => {
        if(err) throw err;
        res.join({
            status: res.statusCode,
            msg: "You have registered a new user"
        })
    })
});

// We want to now retrieve a single-user

app.get('/user/:id', (req, res) => {
    const query = `
    
    SELECT userID,  firstName, lastName
    FROM Users;
    
    `

    db.query(query, (err, data) => {
        if(err) throw err
        res.json({
            status: res.statusCode,
            results: data
        })
    })
})

// We want to know update a certain field

app.put('/user/:id',bodyParser.json() ,( req, res) => {
    const query = `
    
        UPDATE Users 
        SET ?
        WHERE userID = ?;
    `
    db.query(query, [req.body, req.params.id], (err) => {
        if(err) throw err
        res.json({
            status: res.statusCode,
            msg: 'Updated user record'
        })
    })
})


app.delete('/user/:id', (res, req) => {
    const userquery = `
    
    DELETE 
    FROM Users
    WHERE userID = ${req.params.id};
    `

    db.query(userquery, (err) => {
        if(err) throw err;
        res.join({
            status: res.statusCode,
            msg: 'Deleted user record'
        })
    })
})

app.listen(port, () => {
    console.log(`Running port ${port}`);
})