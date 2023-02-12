import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'; // async handler
import { UserModel } from "../models/user.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => { // we want to have an async function 0 -> the connection between Db and our code is asynchronous
        // instead of async we can use then that but it makes the code little messy so prefer this

        // to ensure that Db is not seeded => 
        // count the number of items and if it is more than one that means that it is already seeded
        const usersCount = await UserModel.countDocuments();
        if(usersCount>0) {
            res.send("Seed is done already!");
            return;
        }
        
        await UserModel.create(sample_users);
        res.send("🤩Seed Is Done!");
    })
)

// login api - send username and password for authenticating the user
router.post("/login", asyncHandler(
    async (req, res) => {
        // express does not support json by default we need to enable it
        // const body = req.body;

        // find user with email and password inside the Db <--> without database, we will first add some users in backend>data.ts && then remove it when we connect to Db
        // const user = sample_users.find(person => person.email === body.email && person.password === body.password);

        // Alternative way
        const {email, password} = req.body; // destructuring assignment
        // const user = sample_users.find(person => person.email === email && person.password === password);
        const user = await UserModel.findOne({email, password}); // query for user from Db

        if(user) { // check if user is not null or is not undefined
            res.send(generateTokenResponse(user));
        }
        else {
            res.status(400).send("Invalid User!");
        }
    })
)

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