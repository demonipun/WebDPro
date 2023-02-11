// config file for connecting the Mongoose to the MongoDb Atlas
import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    // this connect returns a Promise
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(
        () => console.log("Connected successfully"), // the success part
        (error) => console.log(error)                // the error part
    )
}