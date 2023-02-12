// we don't wanna use express-app anymore, we want to use express-router and want to use it via main express app
import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from 'express-async-handler'; // async handler
import { FoodModel } from "../models/food.model";

const router = Router();

// now that we have the Food and User Model -> we need to seed them inside Db
// we need to get values from data.ts and put it inside Db -> need to add 2 APIs inside Food and User Routers
// with the help of '/seed'
router.get("/seed", asyncHandler(
    async (req, res) => { // we want to have an async function 0 -> the connection between Db and our code is asynchronous
        // instead of async we can use then that but it makes the code little messy so prefer this

        // to ensure that Db is not seeded => 
        // count the number of items and if it is more than one that means that it is already seeded
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount>0) {
            res.send("Seed is done already!");
            return;
        }
        
        // otherwise we wnt to create all the sample foods inside the Db
        await FoodModel.create(sample_foods);
        res.send("🤩Seed Is Done!");
    })
)

// The rest of the flowis similar to what we had done <>

// we need to implement all the methods available in food.service.ts

router.get("/", (req, res) => {
    res.send(sample_foods);
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

router.get("/tags", (req, res) => {
    res.send(sample_tags);
})

router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

router.get("/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const foods = sample_foods.find(food => food.id==foodId);
    res.send(foods);
})

export default router;