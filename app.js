const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const user = require('./models/user');
const multerconfig = require('./config/multerconfig');
const upload = require('./config/multerconfig');

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))

// middleware

const isloggedIn = (req, res, next) => {
    // console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
        console.log("Not authenticated");
        return res.status(401).redirect('/');
    }

    jwt.verify(token, 'theSecreteCode', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token");
        req.user = decoded;
        next();
    });

}

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/profile/update', isloggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    res.render("updateProfile", { user });
});


app.get('/dashboard', isloggedIn, async (req, res) => {
    let user1 = await userModel.findOne({ email: req.user.email });
    let posts = await postModel.find().populate("user");
    res.render("dashboard", { user1, posts });
});


app.post('/update', upload.single("image"), isloggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.profileImage = req.file.filename;
    await user.save();
    console.log(req.file)
    res.redirect('/profile');
})

app.get('/login', (req, res) => {
    res.render("login")

})

app.get('/profile', isloggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    // console.log(user)
    res.render("profile", { user })

})

app.get('/like/:postid', isloggedIn, async (req, res) => {
    const redirectTo = req.query.redirect || '/dashboard';
    let post = await postModel.findOne({ _id: req.params.postid }).populate("user");
    if (post.likes.indexOf(req.user.userid) === -1) {

        post.likes.push(req.user.userid);
    } else {

        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    // post 
    // console.log("it's user id:",req.user.userid)
    await post.save();
    res.redirect(redirectTo);

})

app.get('/edit/:postid', isloggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.postid }).populate("user");

    res.render("edit", { post })

})

app.post('/update/:postid', isloggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.postid }, {
        content: req.body.content,
        title: req.body.title
    });


    res.redirect('/profile')

})

app.post('/post', isloggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { title, content } = req.body;
    let post = await postModel.create({
        user: user._id,
        title,
        content,

    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')

    // console.log(user)
    // res.render("profile",{user})

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
        // console.log('salt is:', salt);
        bcrypt.hash(password, salt, async (err, hash) => {
            // console.log("hash is ", hash);
            var userCreate = await userModel.create({
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
            console.log("registered succesfully!");
            res.redirect('/profile');
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
                email: email, userid: find._id
            }, 'theSecreteCode');
            res.cookie('token', token);
            res.status(200).redirect("/profile");
            console.log("login succesfull");
        } else {
            res.redirect('/');
            console.log("try again later")
        }
    })
})




app.listen(port, (req, res) => {
    console.log(`the is running at http://localhost:${port}`)
})

