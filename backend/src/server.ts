import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

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

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})