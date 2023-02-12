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

// using the ASYNC function directly results in INCONSISTENT BEHAVIOUR so we use "asyncHandler" instead
router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find(); // gets all the values from the Db
        res.send(foods);
    })
)

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        // After seeding the Db with data.ts we have all the values in Db and now we want the values from Db instead of data.ts
        // we want to create a search case insensitive using Regular Expression
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({name: {$regex:searchRegex}}); // creating an object

        // const searchTerm = req.params.searchTerm;
        // const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
        res.send(foods);
    })
)

router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                // 2 foods 3 tags -> unwind tags => 6 foods tags ==> 
                // converts tags which is an array into a normal field with only 1 value
                // This way we can make a group and find similar ones and count them
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: {$sum: 1} // for each tag we have sum with the value 1 -> add a new item to the count
                    // count = number of tags
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1}); // -1 => descending
        // after doing aggregation we want to sort it sort it according to descending(-1)

        const all = {
            name : 'All',
            count : await FoodModel.countDocuments()
        }

        // now we want to add 'All' at the beginning of the tags
        tags.unshift(all)// unshift(add to the beginning) is exactly the opposite of push(add to the end)
        res.send(tags);
    })
)

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find({tags: req.params.tagName})
      
        // const tagName = req.params.tagName;
        // const foods = sample_foods.filter(food => food.tags?.includes(tagName));
        res.send(foods);
    })
)

router.get("/:foodId",  asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId);

        // const foodId = req.params.foodId;
        // const food = sample_foods.find(food => food.id==foodId);
        res.send(food);
    })
)

export default router;