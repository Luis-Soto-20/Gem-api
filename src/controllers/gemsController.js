const GemModel = require('../models/gem')
const Random = require('meteor-random')
const { id } = require('meteor-random')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : "instituto-tecnol-gico-de-chihuahua-ii-itch-ii",
    api_key : "674856319198139",
    api_secret : "tkpwRZB12KQdPO8ShVkfc09VzJ0"
})

module.exports = {
    createGem,
    getAllGems,
    getGem,
    getGemPost,
    updateGem,
    deleteGem,
    addReview,
    addImage
}

async function createGem(req, res) {
    console.log("User entry", req.body)
    const {
        name,
        description,
        long_description,
        price,
        size,
        specs,
        reviews
    } = req.body
    const newGem = new GemModel({
        name,
        description,
        long_description,
        price,
        size,
        specs,
        reviews
    })
    newGem._id = Random.id()
    console.log(newGem._id)
    await newGem.save()
    res.status(201).send({
        _id: newGem._id,
        success_msg: 'New gem created succesful'
    })
}

async function getAllGems(req, res) {
    let gems = await GemModel.find({})
    let total = gems.length
    res.status(200).send({
        gems: gems,
        total: total
    })
}

async function getGem(req, res) {
    let gem = await GemModel.findOne({
        _id: req.params._id
    })
    res.status(200).send({
        gem: gem
    })
}

async function getGemPost(req, res) {
    let gem = await GemModel.findOne({
        _id: req.body._id
    })
    res.status(200).send({
        gem: gem
    })
}

async function updateGem(req, res) {
    const _id = req.body._id
    let update = req.body.gem
    await GemModel.update({_id : _id}, {$set : update})    
    res.status(202).send({'success_msg' : 'Gem Updated Successfully'})
}

async function deleteGem(req, res) {
    await GemModel.findByIdAndDelete(req.params._id)
    res.status(202).send({'success_msg': 'Gem Removed Succesfully'})
}

async function addReview(req, res){
    let _id = req.body._id
    let update = req.body.review
    await GemModel.findByIdAndUpdate(_id, 
        {"$push" : {"reviews" : update}},
        {"new":false, "upsert":false})
    res.status(202).send({'success_msg' : `Review inserted succesffully`})
}

async function addImage(req, res){
    let _id = req.body._id
    let file = req.files.file
    let key = new Date().toISOString()

    cloudinary.uploader.upload(file.path,
        {public_id : `gems/${key}`, tag : `gems`},
        function(err, image){
            if(err) return res.send(err)
            console.log("File uploaded to Cloudinary")
            fs.unlinkSync(file.path)
            updateImages(_id, image.url)
            res.json(image)
        })
}

async function updateImages(id, url){
    let conceptId = id
    let update = url
    let conceptUpdated = await GemModel.findByIdAndUpdate(conceptId,
        {"$push" : {"images" : update}},
        {"new":false, "upsert":false})
    res.status(202).send({message : conceptUpdated})
}