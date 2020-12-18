const mongoose = require('mongoose')
const Schema = mongoose.Schema

let SpecsSchema = new Schema({
    faces: {type : Number, required : true},
    color: {type : String, required : true},
    rarity: {type : Number, required : true},
    shine: {type : Number, required : true}
}, {
    _id : false
})

let ReviewsSchema = new Schema({
    stars: {type : Number, required : true},
    body: {type : String, required : true},
    author: {type : String, required : true},
},{
    _id : false,
    timestamps : true,
    versionKey : false
})

let GemSchema = new Schema({
    _id: {type : String, required : false},
    name: {type : String, required : true},
    description: {type : String, required : true},
    long_description: {type : String, required : true},
    price: {type : Number, required : true},
    canPurchase: {type : Boolean, required : true, default : true},
    favorite: {type : Boolean, required : true, default : false},
    size: {type : String, required : true, allowedValues : ["larg","medium","small"]},
    specs: {type : SpecsSchema, required : true},
    images: {type : [String], required : true},
    reviews: {type : [ReviewsSchema], required : false}
}, {
    timestamps : true,
    versionKey : false
})

module.exports = mongoose.model('Gem', GemSchema)