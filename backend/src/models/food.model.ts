import { Schema, model } from 'mongoose'

// for creating the Mongoose model in '.ts' -> we need to create an Interface for that model (for autocompletion feature)
// Secondly we need to create a Schema and then we need to create the model

// Interface
export interface Food{ // the structure is similar to Food model we created in frontend>src>shared>models>food.ts
    id:string;
    name:string;
    price:number;
    tags: string[];
    favorite:boolean;
    stars: number;
    imageUrl: string;
    origins: string[];
    cookTime:string;
}

// Schema
export const FoodSchema = new Schema<Food>(
    // id("_id") is a default member of the Schema 
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]}, // not required
        favorite: {type: Boolean, default: false},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        origins: {type: [String], required: true},
        cookTime: {type: String, required: true},
    }, {
        // virtuals are values that will not be saved inside the Db, they will be generated based on values inside Db
        // If virtuals: true => _id -> id
        toJSON: { // when send values from API to client with call to JSON
            virtuals: true,
        },
        toObject: { // when get values from Db and want to work with it inside the code
            virtuals: true,
        },
        timestamps: true // to keep track of 'created_at' and 'updated_at'
    }
)

// Model
export const FoodModel = model<Food>('food', FoodSchema);
// we have our model and we can do CRUD operations on it.