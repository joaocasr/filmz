var mongoose = require('mongoose')

const MovieModelSchema = new mongoose.Schema({
    _id: Number,
    favourite: Boolean,
    watchlist: Boolean
});

module.exports = mongoose.model("moviemodels",MovieModelSchema);