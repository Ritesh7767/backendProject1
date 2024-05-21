const express = require("express")
const Post = require('./models/postSchema')
const User = require("./models/userSchema")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const connectDB = require("./db/connectDB")
const path = require("path")
const jwt = require('jsonwebtoken')

const app = express();
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", 'ejs')

const isLoggedIn = async (req, res, next) => {

    console.log(req.cookies.token)
    next()
    // let {email} = jwt.verify(req.cookies.token || "", "ritesh")
    // let user = await User.findOne({email})
    
    // if(user) return next()
    // res.render('register')
}

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/createAccount', async (req, res) => {
    const {username, email, password} = req.body
    let existingUser = await User.findOne({email})
    console.log(existingUser)
    
    if(existingUser) return res.send("Something went wrong")
    
    const token = jwt.sign({email}, "ritesh")
    res.cookie("token", token)

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createUser = await User.create({username, email, password : hash})
            res.redirect('/post')
        })
    })
})

app.get('/post', isLoggedIn, (req, res) => {
    res.render('post')
})

app.get('/readUser', async (req, res) => {
    const accounts = await User.find()
    res.send(accounts)
})

app.get('/cookies', (req, res) => {
    let email = jwt.verify(req.cookies.token, "ritesh")
    res.send(email)
})


app.listen(3000, () => {
    console.log("Server started")
})