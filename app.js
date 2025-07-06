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
app.use(cookieParser());

// middleware

const isloggedIn = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not authenticated");

    jwt.verify(token, 'theSecreteCode', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token");
        req.user = decoded;
        next();
    });

}

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/login', (req, res) => {
    res.render("login")

})


app.get('/dashbord',isloggedIn, (req, res) => {
    res.send("dashboard")

})


app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect("/login")
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
                email: email, userid: userCreate._id
            }, 'theSecreteCode');
            res.cookie('token', token);
            res.send("registered succesfully!")
        })
    })
})


app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let find = await userModel.findOne({ email });
    if (!find) return res.status(500).send("Something went wrong please try again!!");

    bcrypt.compare(password, find.password, (err, result) => {
        if (result) {
            let token = jwt.sign({
                email: email, userid: userCreate._id
            }, 'theSecreteCode');
            res.cookie('token', token);
            res.status(200).send("login succesfully!!")
        } else res.redirect('/');
    })
})




app.listen(3000, (req, res) => {
    console.log("the is running at http://localhost:3000/")
})

