import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import bookRoute from './route/bookRoute.js'
import userRoute from './route/userRoute.js'
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.static('public'));

dotenv.config();
const PORT = process.env.PORT
const URL = process.env.MongoDBURL
// Connect to mongoDB
try {
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error",error);
}

//Defining routes
app.use('/api/book',bookRoute); 
app.use('/api/user',userRoute);
app.use('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
})


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})