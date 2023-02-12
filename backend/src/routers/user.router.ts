import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'; // async handler
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs'

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
            res.status(HTTP_BAD_REQUEST).send("Invalid User!");
        }
    })
)

// Register API
router.post('/register', asyncHandler(
    async (req, res) => {
      const {name, email, password, address} = req.body; // Destructuring Assignment
      const user = await UserModel.findOne({email}); // if already a user with this email is already registered
      if(user){
        res.status(HTTP_BAD_REQUEST)
        .send('User is already Registered!');
        return;
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10); // not saving the password directly inside the Db but hashing it!

      // creating user object
      const newUser:User = {
        id:'', // will be generated automatically by Db (for by-passing the error)
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
      }

      // saving user object inside the Db
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenResponse(dbUser)); // generate Token and logging in the user
    }
  ))

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