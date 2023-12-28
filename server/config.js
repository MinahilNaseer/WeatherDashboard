const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const connect = mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.aiv9lxi.mongodb.net/?retryWrites=true&w=majority`);

connect.then(()=>{
    console.log('MongoDB Connected');
}).catch(()=>{
    console.log('Failed to connect MongoDB');
})
//registration Schema
const registrationSchema = new mongoose.Schema({
    email: String,
    password: String
});

//model of registration schema
const Registration = mongoose.model("Registration",registrationSchema);

module.exports = Registration;