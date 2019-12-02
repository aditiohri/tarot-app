const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
keywords: String,
mood: String,
events: String,
interpretation: String
}, {
    timestamps: true
})

const readingSchema = new Schema({
question: String,
name: String,
description: String,
meaning: String,
diary: [commentSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Reading', readingSchema);