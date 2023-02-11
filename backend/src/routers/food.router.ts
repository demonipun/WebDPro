// we don't wanna use express-app anymore, we want to use express-router and want to use it via main express app
import { Router } from "express";
import { sample_foods, sample_tags } from "../data";

const router = Router();

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