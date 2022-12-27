import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();

// development time : localhost:4200
// backend on a different address : localhost:5000 
// it is unacceptable to have a request from an address to a different address --> why we need cors
// we cors only for development time
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

// we need to implement all the methods available in food.service.ts

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
})

app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const foods = sample_foods.find(food => food.id==foodId);
    res.send(foods);
})

app.use(express.json()); // now we can get requests with json body inside apis

// login api - send username and password for authenticating the user
app.post("/api/users/login", (req, res) => {
    // express does not support json by default we need to enable it
    // const body = req.body;

    // find user with email and password inside the Db <--> without database, we will first add some users in backend>data.ts && then remove it when we connect to Db
    // const user = sample_users.find(person => person.email === body.email && person.password === body.password);

    // Alternative way
    const {email, password} = req.body; // destructuring assignment
    const user = sample_users.find(person => person.email === email && person.password === password);

    if(user) { // check if user is not null or is not undefined
        res.send(generateTokenResponse(user));
    }
    else {
        res.status(400).send("Invalid User!");
    }
})

// jwt(jason web token) for generating response token
const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin:user.isAdmin
    }, 
    "nipun", // secret key (env)
    {
        expiresIn: "12h"
    });

    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})