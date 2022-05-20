//const mongoose = require('mongoose');
import mongoose from 'mongoose'
const formSchema = new mongoose.Schema({
    Name:
    {
        type: String,
        required: true,
    },
    Age:
    {
        type: Number,
        required:true,
    },
    Gender:
    {
        type:String,
        required:true,
    },
    Weight:
    {
        type:Number,
        required:true,
    },
    Email:
    {
        type:String,
        required:true,
        lowercase:true
    }
    
});

export default mongoose.model('Models', formSchema);
