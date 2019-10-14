const Validator = require("validator");
const isEmpty = require("is-empty");
const moment = require('moment');

module.exports = function validateupdateInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.poids = !isEmpty(data.poids) ? data.poids : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.birthday = !isEmpty(data.birthday) ? data.birthday : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";


    // dateGOAL checks
    console.log("date saisie",data.birthday);
    var actualDate = moment();
    console.log("date actuelle",actualDate);
    if(data.birthday >= actualDate ){
        errors.birthday = "Datebirth should be correct";
    }

    // DistanceGOAL checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "name field is required";
    }
    // poids checks
    if (Validator.isEmpty(data.poids)) {
        errors.poids = "poids field is required";
    }
    // CalorieGOAL checks
    if (Validator.isEmpty(data.poids)) {
        errors.poids = "poids field is required";
    }else if(Math.sign(data.poids)=== -1){
        errors.poids = "poids should be positive";
    }









    return {
        errors,
        isValid: isEmpty(errors)
    };
};