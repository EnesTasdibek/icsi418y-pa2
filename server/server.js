require("dotenv").config();

const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const User = require('./userSchema')

app.use(express.json());
app.use(cors());

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}
connectDatabase();

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

app.listen(9000, ()=> {
    console.log(`Server Started at 9000`);
})

//The backend must check whether the username already exists.
//If the username already exists, the user must not be created.
//Otherwise, a new user must be stored in MongoDB.
//The frontend must display an appropriate success or failure message.
app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    
    //The backend must verifies that all required information was provided
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        return res.status(400).json({ message: "One or more fields missing" });
    }

    const un = req.body.username
    try {
        //The backend checks if username already exists in database
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                //create new user in mongo DB if the user does not exist yet
                const user = new User({
                    f_name: req.body.firstName,
                    l_name: req.body.lastName,
                    username: req.body.username,
                    password: req.body.password
                });
                user.save()
                console.log(`User created! ${user}`)
                
                res.status(201).json({ message: "User created successfully" })
            }
            else {
                //If the username already exists, the user must not be created
                console.log("Username already exists")
                
                res.status(409).json({ message: "Username already exists" })
            }
        })
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    
    console.log(username)
    console.log(password)
    try {//The supplied password is compared with the stored password
        //Check required fields
        if (!username || !password) {
            return res.status(400).send("Username and password are required")
        }
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send("Username and password are required")
    }
})

