const express = require("express");
const { default: mongoose } = require("mongoose");

const teacherList = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
})

const Teacher = new mongoose.model("Teacher",teacherList)

module.exports = Teacher;