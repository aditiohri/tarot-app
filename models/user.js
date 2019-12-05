const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    avatar: String,
    readings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reading'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);