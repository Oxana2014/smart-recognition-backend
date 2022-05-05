const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

const cors = require('cors');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'oxana1972',
      database : 'smartbrain'
    }
  });
const app = express();

// db.select('*').from('users').then(data => console.log(data))
// .catch(e => console.log("eRRRRRRor:", e))

// const database = {
//     users: [
//         {
//             id: "123",
//             name: "John",
//             email: "john@john.com",
//             password: "cookies",
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: "124",
//             name: "Sally",
//             email: "sally@john.com",
//             password: "bananas",
//             entries: 0,
//             joined: new Date()
//         },
//     ],
// }

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("hello")
})
app.post('/signin', signin.handleSignin( db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id',(req, res) => { profile.handleProfileGet(req, res, db)});

app.put("/image", (req, res) => { image.handleImage(req, res, db)})
app.post("/imageurl",  image.handleApiCall)

app.listen(3000, () => {
console.log("app is running on port 3000")
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = updated user
*/