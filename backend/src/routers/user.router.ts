import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";

const router = Router();

// login api - send username and password for authenticating the user
router.post("/login", (req, res) => {
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

export default router;