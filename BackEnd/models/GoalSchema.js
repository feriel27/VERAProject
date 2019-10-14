var mongoose = require('mongoose');

var GoalSchema = new  mongoose.Schema({
    calorieGOAL: {
        type: Number},
    distanceGOAL: {
        type: Number},
    dateDebutGOAL:{
        type:Date,
        default:Date.now()
    },
    dateGOAL:{
        type:Date
    },
    status: {
       type: String},

});
module.exports = GoalSchema;