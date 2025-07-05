const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/register', async (req, res) => {
    let { name, username, email, age, password } = req.body;
    let find = await userModel.findOne({ email });
    if (find) return res.status(500).send("user already registered please sign up");

    bcrypt.genSalt(10, (err, salt) => {
        console.log('salt is:', salt);
        bcrypt.hash(password, salt, async (err, hash) => {
            console.log("hash is ", hash);
            let userCreate = await userModel.create({
                name,
                username,
                email,
                age,
                password: hash,
            });
            let token = jwt.sign({
                email: email, userid: usser._id
            }, 'theSecreteCode');
            res.cookie('token', token);
            res.send("registered succesfully!")
        })
    })
})

app.listen(3000, (req, res) => {
    console.log("the is running at http://localhost:3000/")
})

