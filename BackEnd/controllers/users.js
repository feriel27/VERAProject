//  console.log("file uploaded to Cloudinary");
// remove file from server.js
var moment = require('moment');

var groupArray = require('group-array');

const express = require("express");
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateaddGOALInput = require("../validation/addGOAL");
const validatepasswordALInput = require("../validation/changePassword");
const validateupdateInput = require("../validation/updateUser");

// Load User model
const User = require("../models/User");
const Game = require("../models/GameSchema");
const Level = require("../models/LevelSchema");
var Goal = require('../models/GoalSchema');


exports.UserLogin = (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    User.findOne({email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    imageProfile: user.imageProfile

                };
// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user: payload
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            }
        });
    }).catch();
};
//create user
exports.createUser = (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email}).then(user => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            poids: req.body.poids,
            birthday: req.body.birthday,
            imageProfile: req.body.imageProfile
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                // newUser.oldPhoto.push(req.file.path);
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });

    });

};
exports.getAllProfiles = (req, res, next) => {
    User.find()
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
exports.getProfileConnectedUser = (req, res, nex) => {
    res.send(req.userData.userId);
    User.findOne({_id: req.userData.userId})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "user not found"
                });
            }
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profile failed!"
            });
        });
};
exports.getInfoUserByEmail = (req, res, next) => {
    console.log("get name user by email");
    const email = req.params.email;
    // Find user by email
    User.findOne({email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        res.json(user);
    });

};
//get user infos
exports.getUserInfo = (req, res, next) => {

    // User.findById({_id: req.userData.userId})
    User.findOne({_id: req.userData.userId})
        .then((user) => {

            console.log(user);
            res.json({"success": true, "message": "Todos fetched successfully", user});
        })
        .catch({
            if(err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};


exports.calculHeartRate = (req, res, next) => {

    let games=[];
    // User.findById({_id: req.userData.userId})
    Game.find({user: req.userData.userId})
        .then((game) => {
            let heartRate = 0;
            let date_sort_desc = function (date1, date2) {
                // This is a comparison function that will result in dates being sorted in
                // DESCENDING order.
                if (date1 > date2) return -1;
                if (date1 < date2) return 1;
                return 0;
            };
            let date_sort_asc = function (date1, date2) {
                // This is a comparison function that will result in dates being sorted in
                // ASCENDING order. As you can see, JavaScript's native comparison operators
                // can be used to compare dates. This was news to me.
                if (date1 > date2) return 1;
                if (date1 < date2) return -1;
                return 0;
            };


            console.log(game);
            game.sort(date_sort_desc);
console.log('el heart rate', game[0].heartBeat)
            heartRate = 207 - (0.7 * game[0].heartBeat);
            res.json({"success": true, "message": "Todos fetched successfully", game, heartRate});
        })
        .catch({
            if(err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};
//update user with image and name
exports.updateUser = (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateupdateInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log("update USer");
    console.log(req.userData.userId);
    User.findByIdAndUpdate(
        // the id of the item to find
        {_id: req.userData.userId},

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
};

exports.updatePassword = (req, res, next) => {
// Form validation
    const {errors, isValid} = validatepasswordALInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({_id: req.userData.userId}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({usernotfound: "user not found"});
        }

        console.log("db pass", user.password)
        console.log("old pass", req.body.oldpassword)
        // const isMatch = bcrypt.compare(req.body.oldPassword, user.password);
        // that's not working for me
        const isMatch = bcrypt.compare(req.body.oldpassword, user.password, function (err, isMatch) {
            console.log(isMatch)
            if (err) {
                throw err
            } else if (!isMatch) {
                return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            } else {
                console.log("Password matches!");
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        // newUser.oldPhoto.push(req.file.path);
                        user.save()
                            .then(user => res.json({user, msg: "mot de passe change avec success"}))
                            .catch(err => console.log(err));
                    });
                });
            }
            // res.json(isMatch);
        });
    })
        .catch((err) => {
            console.log(err.message);
            // res.status(500).send("server error");
        })


}
//methode update seif
exports.updateUserMobile = (req, res, next) => {

    console.log("update user mobile");
    console.log(req.params.idUser);
    User.findByIdAndUpdate(
        // the id of the item to find
        {_id: req.params.idUser},

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.status(201).send("success");
        }
    )
};

//fetch game par date by email for seif
exports.fetchGameByDateByEmail = (req, res, next) => {
    let liste_dist = [];
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log("nombre game", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email})
                .then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({emailnotfound: "Email not found"});
                    }
                    console.log(user._id);
                    let iduser = user._id;
                    for (let i = 0; i < gameFetched.length; i++) {
                        console.log(gameFetched[i].user);
                        if (gameFetched[i].user._id.equals(iduser)) {
                            liste_dist.push(gameFetched[i]);

                            let date_sort_desc = function (date1, date2) {
                                // This is a comparison function that will result in dates being sorted in
                                // DESCENDING order.
                                if (date1 > date2) return -1;
                                if (date1 < date2) return 1;
                                return 0;
                            };
                            let date_sort_asc = function (date1, date2) {
                                // This is a comparison function that will result in dates being sorted in
                                // ASCENDING order. As you can see, JavaScript's native comparison operators
                                // can be used to compare dates. This was news to me.
                                if (date1 > date2) return 1;
                                if (date1 < date2) return -1;
                                return 0;
                            };

                            liste_dist.sort(date_sort_desc);

                        }


                    }
                    ;

                    res.json({liste_dist});

                }).catch(err => {
                if (err) {
                    res.send({"success": false, "message": "Some Error"});
                }
            });
        });


};
//calcul total temps parcouru by email
exports.calculTotalTempsByEmail = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let temps = [];
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;

                console.log("before fetch", gameFetched.length);
                for (let i = 0; i < gameFetched.length; i++) {
                    console.log("westtttttttttttttttttttttt");
                    if (gameFetched[i].user._id.equals(iduser)) {
                        console.log("condition");

                        temps.push(gameFetched[i].temps);
                    }
                }
                console.log("liste temps", temps);
                console.log("****************liste de temps*************");
                console.log(temps);
                var listeH = [];
                var listeM = [];
                var listeS = [];
                var totalS = 0;
                var totalM = 0;
                var totalH = 0;

                for (let i = 0; i < temps.length; i++) {
                    let t = temps[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    let secondes = t.substring(6, 8);
                    listeH.push(heures);
                    listeM.push(minutes);
                    listeS.push(secondes);

                }
                //calculer total secondes
                for (let i = 0; i < listeS.length; i++) {
                    console.log(parseInt(listeS[i]));
                    totalS += parseInt(listeS[i]);
                    if (totalS > 59) {
                        totalM += 1;
                        totalS = 0;
                    }
                }
                //calculer total minutes
                for (let i = 0; i < listeM.length; i++) {
                    console.log(parseInt(listeM[i]));
                    totalM += parseInt(listeM[i]);
                    if (totalM > 59) {
                        totalH += 1;
                        totalM = 0;
                    }
                }

                //calculer total heures
                for (let i = 0; i < listeH.length; i++) {
                    console.log(parseInt(listeH[i]));
                    totalH += parseInt(listeH[i]);
                    if (totalH > 23) {
                        totalH = 0;

                    }
                }

                totalM = "" + totalM;
                totalS = "" + totalS;
                totalH = "" + totalH;
                //test sur le total pour ajouter le 0 a gauche
                console.log("*********");
                console.log(totalS.toString().length);

                if (totalS.toString().length === 1) {
                    console.log("west el cond");
                    totalS = totalS.toString().padStart(2, "0");
                    console.log(totalS);
                }

                console.log("**** total minutes");
                console.log(totalM);
                if (totalM.toString().length === 1) {
                    console.log("west el cond");
                    totalM = totalM.toString().padStart(2, "0");
                    console.log(totalM);

                }

                if (totalH.toString().length === 1) {
                    console.log("west el cond");
                    totalH = totalH.toString().padStart(2, "0");
                    console.log(totalH);

                }
                res.json({listeH, listeM, listeS, totalS, totalM, totalH});


            });


        })
        .catch(err => {
            if (err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};
//calcul total distance by email
exports.CalculTotalDistancesByEmail = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_dist = [];
            let totalD = 0;
            console.log("before fetch", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                for (let i = 0; i < gameFetched.length; i++) {


                    if (gameFetched[i].user._id.equals(iduser)) {
                        list_dist.push(gameFetched[i].distance);
                    }

                }
                console.log(list_dist);
                for (let j = 0; j < list_dist.length; j++) {
                    totalD = totalD + parseInt(list_dist[j]);

                }

                if (totalD === 0)
                    res.json({"success": false, totalD});

                res.json({"success": true, totalD});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalCaloriesByEmail = (req, res, next) => {
    console.log("total calories");
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_Cal = [];
            let totalCalories = 0;
            console.log("before fetch", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                for (let i = 0; i < gameFetched.length; i++) {


                    if (gameFetched[i].user._id.equals(iduser)) {
                        list_Cal.push(gameFetched[i].calorie);
                    }

                }
                console.log(list_Cal);
                for (let j = 0; j < list_Cal.length; j++) {
                    totalCalories = totalCalories + parseInt(list_Cal[j]);

                }

                if (totalCalories === 0)
                    res.json({"success": false, totalCalories});

                res.json({"success": true, totalCalories});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};

//get all for that day
exports.CalculTotalTodayByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                const listVitesseByDate = [];
                let totalVitesseByDate = 0;
                let totalDistanceByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;


                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("MM-DD-YYYY");

                        console.log("first_date", first_date);
                        console.log("dateActuelle", moment().format("MM-DD-YYYY"));

                        if (moment().format("MM-DD-YYYY") === moment(gameFetched[i].Date).format("MM-DD-YYYY")) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                            listTempsByDate.push(gameFetched[i].temps);
                            listVitesseByDate.push(gameFetched[i].vitesse);
                        } else {
                            console.log("mouch kif kif")
                        }


                    }

                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate += parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate += parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate += parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score
                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate += parseInt(listScoreByDate[j]);
                }

                //calcul total vitesse
                for (let j = 0; j < listVitesseByDate.length; j++) {
                    totalVitesseByDate += parseInt(listVitesseByDate[j]);
                }

                //calcul total temps
                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }

                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

                }

                res.json(
                    {
                        listDistanceByDate, totalDistanceByDate,
                        listCaloriesByDate, totalCaloriesByDate,
                        listHeartBeatByDate, totalHeartBeatByDate,
                        listScoreByDate, totalScoreByDate,
                        listVitesseByDate, totalVitesseByDate,
                        listTempsByDate, listeTempsEnMinutes, totalTemps
                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalthisMonthByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;
                const listVitesseByDate = [];
                let totalVitesseByDate = 0;

                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                        console.log("first_date", first_date);
                        console.log("dateActuelle", moment().format("MM-YYYY"));

                        if (moment().format("MM-YYYY") === first_date) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                            listTempsByDate.push(gameFetched[i].temps);
                            listVitesseByDate.push(gameFetched[i].vitesse);
                        } else {
                            console.log("mouch kif kif")
                        }

                    }
                    console.log("length", listDistanceByDate.length);

                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate += parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate += parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate += parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score
                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate += parseInt(listScoreByDate[j]);
                }

                //calcul total vitesse
                for (let j = 0; j < listVitesseByDate.length; j++) {
                    totalVitesseByDate += parseInt(listVitesseByDate[j]);
                }
                //calcul total temps
                //recuperer le temps et le tranformer en minutes seulement

                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }
                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);
                }
                res.json(
                    {
                        listDistanceByDate, totalDistanceByDate,
                        listCaloriesByDate, totalCaloriesByDate,
                        listHeartBeatByDate, totalHeartBeatByDate,
                        listScoreByDate, totalScoreByDate,
                        listVitesseByDate, totalVitesseByDate,
                        listTempsByDate, listeTempsEnMinutes, totalTemps
                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalthisWeekByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;
                const listVitesseByDate = [];
                let totalVitesseByDate = 0;

                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let date_list = moment(gameFetched[i].Date).format("DD-MM-YYYY");
                        let dateToday = new Date();
                        console.log("first_date", date_list);
                        // console.log("dateToday", dateToday);
                        let dateLastWeek = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() - 7);
                        console.log("last weeek", moment(dateLastWeek).format("DD-MM-YYYY"));

                        if ((date_list >= moment(dateLastWeek).format("DD-MM-YYYY")) &&
                            (date_list <= moment(dateToday).format("DD-MM-YYYY"))) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                            listTempsByDate.push(gameFetched[i].temps);
                            listVitesseByDate.push(gameFetched[i].vitesse);
                        } else {
                            console.log("mouch kif kif")
                        }
                    }
                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate += parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate += parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate += parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score
                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate += parseInt(listScoreByDate[j]);
                }

                //calcul total vitesse
                for (let j = 0; j < listVitesseByDate.length; j++) {
                    totalVitesseByDate += parseInt(listVitesseByDate[j]);
                }
                //calcul total temps
                //recuperer le temps et le tranformer en minutes seulement

                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }
                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);
                }
                res.json(
                    {
                        listDistanceByDate, totalDistanceByDate,
                        listCaloriesByDate, totalCaloriesByDate,
                        listHeartBeatByDate, totalHeartBeatByDate,
                        listScoreByDate, totalScoreByDate,
                        listVitesseByDate, totalVitesseByDate,
                        listTempsByDate, listeTempsEnMinutes, totalTemps
                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};

//get all for a week ,month,today by id user
exports.CalculTotalthisWeekByIduser = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "user not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;

                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let date_list = moment(gameFetched[i].Date).format("DD-MM-YYYY");
                        let dateToday = new Date();
                        console.log("first_date", date_list);
                        // console.log("dateToday", dateToday);
                        let dateLastWeek = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() - 7);
                        console.log("last weeek", moment(dateLastWeek).format("DD-MM-YYYY"));

                        if ((date_list >= moment(dateLastWeek).format("DD-MM-YYYY")) &&
                            (date_list <= moment(dateToday).format("DD-MM-YYYY"))) {
                            console.log("kif kif");
                            listDistanceByDate.push({
                                "distance": gameFetched[i].distance,
                                "date": moment(gameFetched[i].Date).format("DD/MM")
                            });
                            listCaloriesByDate.push({
                                "calorie": gameFetched[i].calorie,
                                "date": moment(gameFetched[i].Date).format("DD/MM")
                            });
                            listHeartBeatByDate.push({
                                "heartBeat": gameFetched[i].heartBeat,
                                "date": moment(gameFetched[i].Date).format("DD/MM")
                            });
                            listScoreByDate.push({
                                "score": gameFetched[i].score,
                                "date": moment(gameFetched[i].Date).format("DD/MM")
                            });
                            listTempsByDate.push(gameFetched[i].temps);
                        } else {
                            console.log("mouch kif kif")
                        }
                    }
                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate += parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate += parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate += parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score
                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate += parseInt(listScoreByDate[j]);
                }
                //calcul total temps
                //recuperer le temps et le tranformer en minutes seulement

                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }
                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);
                }
                res.json(
                    {
                        listDistanceByDate, totalDistanceByDate,
                        listCaloriesByDate, totalCaloriesByDate,
                        listHeartBeatByDate, totalHeartBeatByDate,
                        listScoreByDate, totalScoreByDate,
                        listTempsByDate, listeTempsEnMinutes, totalTemps
                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};

exports.ChartWEEK = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "user not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listCaloriesByDate = [];
                const listVitesseByDate = [];
                const listHeartBeatByDate = [];
                let today = new Date();
                let dateLastWeek;
                if (today.getDay() === 1) {
                    dateLastWeek = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 6);
                } else
                    dateLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

                console.log("last weeek", moment(dateLastWeek).format("DD-MM-YYYY"));
                console.log("today", moment(today).format("DD-MM-YYYY"));

                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let date_list = gameFetched[i].Date;
                        console.log("date liste fetched", date_list);
                        console.log("intervale min", moment(dateLastWeek).format("DD-MM-YYYY") + " ila", moment(today).format("DD-MM-YYYY"));

                        if ((date_list) >= dateLastWeek &&
                            ((date_list) <= today)) {
                            console.log("kiiiiiiiiiiiiiiiiiiiiiiiiiiiiiif")
                            listDistanceByDate.push({
                                "distance": gameFetched[i].distance,
                                "date": gameFetched[i].Date
                            });
                            listCaloriesByDate.push({
                                "calorie": gameFetched[i].calorie,
                                "date": gameFetched[i].Date
                            });
                            listHeartBeatByDate.push({
                                "heartBeat": gameFetched[i].heartBeat,
                                "date": gameFetched[i].Date
                            });
                            listVitesseByDate.push({
                                "vitesse": gameFetched[i].vitesse,
                                "date": gameFetched[i].Date
                            });
                        } else {
                            console.log("mouch kif kif")
                        }
                    }
                }
                const ListDate = [];
                const listTotalCal = [];
                const listTotalVitesse = [];
                const listTotalDistance = [];
                const listTotalHeart = [];
                console.log("date lyoum", new Date());

                console.log("lyoum -1", new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0));
                // ListDate.push(new Date());
                let date_sort_asc = function (date1, date2) {
                    // This is a comparison function that will result in dates being sorted in
                    // ASCENDING order. As you can see, JavaScript's native comparison operators
                    // can be used to compare dates. This was news to me.
                    if (date1 > date2) return 1;
                    if (date1 < date2) return -1;
                    return 0;
                };
                for (let i = 0; i < 6; i++) {

                    ListDate.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
                }

                console.log("listeDate", ListDate.sort(date_sort_asc));
                for (let i = 0; i < ListDate.length; i++) {
                    let calculCal = 0;
                    let calculVitesse = 0;
                    let calculDistance = 0;
                    let calculHeart = 0;
                    let compteurLengthCal = 0;
                    let compteurLengthDist = 0;
                    let compteurLengthVit = 0;
                    let compteurLengthHeart = 0;

                    //Calorie
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log("date el lista", listCaloriesByDate[j].date);
                        console.log("date lista", ListDate[i]);
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculCal += parseInt(listCaloriesByDate[j].calorie);
                            compteurLengthCal += 1;
                        }
                        console.log(calculCal)
                    }
                    console.log("compteur", compteurLengthCal);
                    console.log("calcul", calculCal);
                    console.log("Moyenne", calculCal / compteurLengthCal);
                    if (compteurLengthCal === 0) {
                        listTotalCal.push(calculCal);
                    } else {
                        listTotalCal.push(calculCal / compteurLengthCal);
                    }

                    // distance
                    for (let j = 0; j < listDistanceByDate.length; j++) {
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculDistance += parseInt(listDistanceByDate[j].distance);
                            compteurLengthDist += 1;
                        }
                        console.log(calculDistance)
                    }
                    console.log("compteur", compteurLengthDist);
                    console.log("calcul", calculDistance);
                    console.log("Moyenne", calculDistance / compteurLengthDist);
                    if (compteurLengthDist === 0) {
                        listTotalDistance.push(calculDistance);
                    } else {
                        listTotalDistance.push(calculDistance / compteurLengthDist);
                    }


                    //heart
                    for (let j = 0; j < listHeartBeatByDate.length; j++) {
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculHeart += parseInt(listHeartBeatByDate[j].heartBeat);
                            compteurLengthHeart += 1;
                        }
                        console.log(calculHeart)
                    }
                    console.log("compteur", compteurLengthHeart);
                    console.log("calculHeart", calculHeart);
                    console.log("Moyenne", calculHeart / compteurLengthHeart);
                    if (compteurLengthHeart === 0) {
                        listTotalHeart.push(calculHeart);
                    } else {
                        listTotalHeart.push(calculHeart / compteurLengthHeart);
                    }


                    //vitesse
                    for (let j = 0; j < listVitesseByDate.length; j++) {
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculVitesse += parseInt(listVitesseByDate[j].vitesse);
                            compteurLengthVit += 1;
                        }
                        console.log(calculVitesse)
                    }

                    console.log("compteur", compteurLengthVit);
                    console.log("calculVitesse", calculVitesse);
                    console.log("Moyenne", calculVitesse / compteurLengthVit);
                    if (compteurLengthVit === 0) {
                        listTotalVitesse.push(calculVitesse);
                    } else {
                        listTotalVitesse.push(calculVitesse / compteurLengthVit);
                    }


                }
                let listVITESSE = [];
                for (let j = 0; j < ListDate.length; j++) {
                    listVITESSE.push({
                            date: ListDate[j],
                            speed: listTotalVitesse[j]
                        }
                    );
                }


                res.json(
                    {
                        listDistanceByDate,
                        listCaloriesByDate,
                        listHeartBeatByDate,
                        //  listVITESSE,
                        listVitesseByDate,
                        ListDate,
                        listTotalDistance,
                        listTotalCal,
                        listTotalHeart,
                        listTotalVitesse

                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};

//charts foooooooooooor seiiiiiif
exports.ChartWEEKByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "user not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listCaloriesByDate = [];
                const listVitesseByDate = [];
                const listHeartBeatByDate = [];
                let today = new Date();
                let dateLastWeek;
                if (today.getDay() === 1) {
                    dateLastWeek = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 6);
                } else
                    dateLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

                console.log("last weeek", moment(dateLastWeek).format("DD-MM-YYYY"));
                console.log("today", moment(today).format("DD-MM-YYYY"));

                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let date_list = gameFetched[i].Date;
                        console.log("date liste fetched", date_list);
                        console.log("intervale min", moment(dateLastWeek).format("DD-MM-YYYY") + " ila", moment(today).format("DD-MM-YYYY"));

                        if ((date_list) >= dateLastWeek &&
                            ((date_list) <= today)) {
                            console.log("kiiiiiiiiiiiiiiiiiiiiiiiiiiiiiif")
                            listDistanceByDate.push({
                                "distance": gameFetched[i].distance,
                                "date": gameFetched[i].Date
                            });
                            listCaloriesByDate.push({
                                "calorie": gameFetched[i].calorie,
                                "date": gameFetched[i].Date
                            });
                            listHeartBeatByDate.push({
                                "heartBeat": gameFetched[i].heartBeat,
                                "date": gameFetched[i].Date
                            });
                            listVitesseByDate.push({
                                "vitesse": gameFetched[i].vitesse,
                                "date": gameFetched[i].Date
                            });
                        } else {
                            console.log("mouch kif kif")
                        }
                    }
                }
                const ListDate = [];
                const listTotalCal = [];
                const listTotalVitesse = [];
                const listTotalDistance = [];
                const listTotalHeart = [];
                console.log("date lyoum", new Date());

                console.log("lyoum -1", new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0));
                // ListDate.push(new Date());
                let date_sort_asc = function (date1, date2) {
                    // This is a comparison function that will result in dates being sorted in
                    // ASCENDING order. As you can see, JavaScript's native comparison operators
                    // can be used to compare dates. This was news to me.
                    if (date1 > date2) return 1;
                    if (date1 < date2) return -1;
                    return 0;
                };
                for (let i = 0; i < 6; i++) {

                    ListDate.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
                }

                console.log("listeDate", ListDate.sort(date_sort_asc));
                for (let i = 0; i < ListDate.length; i++) {
                    let calculCal = 0;
                    let calculVitesse = 0;
                    let calculDistance = 0;
                    let calculHeart = 0;
                    let compteurLengthCal = 0;
                    let compteurLengthDist = 0;
                    let compteurLengthVit = 0;
                    let compteurLengthHeart = 0;

                    //Calorie
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log("date el lista", listCaloriesByDate[j].date);
                        console.log("date lista", ListDate[i]);
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculCal += parseInt(listCaloriesByDate[j].calorie);
                            compteurLengthCal += 1;
                        }
                        console.log(calculCal)
                    }
                    console.log("compteur", compteurLengthCal);
                    console.log("calcul", calculCal);
                    console.log("Moyenne", calculCal / compteurLengthCal);
                    if (compteurLengthCal === 0) {
                        listTotalCal.push(calculCal);
                    } else {
                        listTotalCal.push(calculCal / compteurLengthCal);
                    }

                    // distance
                    for (let j = 0; j < listDistanceByDate.length; j++) {
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculDistance += parseInt(listDistanceByDate[j].distance);
                            compteurLengthDist += 1;
                        }
                        console.log(calculDistance)
                    }
                    console.log("compteur", compteurLengthDist);
                    console.log("calcul", calculDistance);
                    console.log("Moyenne", calculDistance / compteurLengthDist);
                    if (compteurLengthDist === 0) {
                        listTotalDistance.push(calculDistance);
                    } else {
                        listTotalDistance.push(calculDistance / compteurLengthDist);
                    }


                    //heart
                    for (let j = 0; j < listHeartBeatByDate.length; j++) {
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculHeart += parseInt(listHeartBeatByDate[j].heartBeat);
                            compteurLengthHeart += 1;
                        }
                        console.log(calculHeart)
                    }
                    console.log("compteur", compteurLengthHeart);
                    console.log("calculHeart", calculHeart);
                    console.log("Moyenne", calculHeart / compteurLengthHeart);
                    if (compteurLengthHeart === 0) {
                        listTotalHeart.push(calculHeart);
                    } else {
                        listTotalHeart.push(calculHeart / compteurLengthHeart);
                    }


                    //vitesse
                    for (let j = 0; j < listVitesseByDate.length; j++) {
                        if ((moment(ListDate[i]).format("DD/MM/YYYY")) === moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) {
                            console.log("nafs date");
                            calculVitesse += parseInt(listVitesseByDate[j].vitesse);
                            compteurLengthVit += 1;
                        }
                        console.log(calculVitesse)
                    }

                    console.log("compteur", compteurLengthVit);
                    console.log("calculVitesse", calculVitesse);
                    console.log("Moyenne", calculVitesse / compteurLengthVit);
                    if (compteurLengthVit === 0) {
                        listTotalVitesse.push(calculVitesse);
                    } else {
                        listTotalVitesse.push(calculVitesse / compteurLengthVit);
                    }


                }
                let listVITESSE = [];
                for (let j = 0; j < ListDate.length; j++) {
                    listVITESSE.push({
                            date: ListDate[j],
                            speed: listTotalVitesse[j]
                        }
                    );
                }


                res.json(
                    {
                        listDistanceByDate,
                        listCaloriesByDate,
                        listHeartBeatByDate,
                        //  listVITESSE,
                        listVitesseByDate,
                        ListDate,
                        listTotalDistance,
                        listTotalCal,
                        listTotalHeart,
                        listTotalVitesse

                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.ChartMONTHCalorieByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            // Find user by email
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "calorie": gameFetched[i].calorie,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK1", parseInt(listCaloriesByDate[j].calorie));
                            listeCol1.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek1 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek2 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek3 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek4 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.ChartMONTHDistanceByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "distance": gameFetched[i].distance,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK1", parseInt(listCaloriesByDate[j].distance));
                            listeCol1.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek1 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek2 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek3 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek4 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });

};
exports.ChartMONTHVitesseByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "vitesse": gameFetched[i].vitesse,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            listeCol1.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek1 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek2 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek3 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek4 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.ChartMONTHHeartByEmail = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "heartBeat": gameFetched[i].heartBeat,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            listeCol1.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek1 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek2 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek3 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek4 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
///////////

exports.ChartMONTHCalorie = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "calorie": gameFetched[i].calorie,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK1", parseInt(listCaloriesByDate[j].calorie));
                            listeCol1.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek1 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek2 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek3 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].calorie));
                            calculWeek4 += parseInt(listCaloriesByDate[j].calorie);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.ChartMONTHDistance = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "distance": gameFetched[i].distance,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK1", parseInt(listCaloriesByDate[j].distance));
                            listeCol1.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek1 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek2 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek3 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].distance));
                            calculWeek4 += parseInt(listCaloriesByDate[j].distance);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });

};
exports.ChartMONTHVitesse = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "vitesse": gameFetched[i].vitesse,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            listeCol1.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek1 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek2 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek3 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].vitesse));
                            calculWeek4 += parseInt(listCaloriesByDate[j].vitesse);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.ChartMONTHHeart = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                    // Check if user exists
                    if (!user) {
                        return res.status(404).json({usernotfound: "user not found"});
                    }
                    let iduser = user._id;
                    const listCaloriesByDate = [];


                    for (let i = 0; i < gameFetched.length; i++) {
                        if (gameFetched[i].user._id.equals(iduser)) {
                            let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                            console.log("first_date", first_date);
                            console.log("dateActuelle", moment().format("MM-YYYY"));

                            if (moment().format("MM-YYYY") === first_date) {
                                console.log("kif kif");

                                listCaloriesByDate.push({
                                    "heartBeat": gameFetched[i].heartBeat,
                                    "date": gameFetched[i].Date
                                });

                            } else {
                                console.log("mouch kif kif")
                            }
                        }
                    }
                    const ListDate = [];
                    const listTotalWeek1 = [];
                    const listTotalWeek2 = [];
                    const listTotalWeek3 = [];
                    const listTotalWeek4 = [];

                    let dateFirst = new Date();
                    let dateSecond = new Date();
                    let dateThird = new Date();
                    let dateFourth = new Date();
                    let dateFifth = new Date();

                    dateFirst.setDate(1);
                    //console.log("dateFirst", dateFirst);
                    dateSecond.setDate(7);
                    // console.log("dateSecond", dateSecond);
                    dateThird.setDate(15);
                    // console.log("dateThird", dateThird);
                    dateFourth.setDate(23);
                    // console.log("dateFourth", dateFourth);
                    dateFifth.setDate(31);
                    // console.log("dateFifth", dateFifth);

                    let calculWeek1 = 0;
                    let calculWeek2 = 0;
                    let calculWeek3 = 0;
                    let calculWeek4 = 0;

                    let listeCol1 = [];
                    let listeCol2 = [];
                    let listeCol3 = [];
                    let listeCol4 = [];
                    let compterCalorieW1 = 0;
                    let compterCalorieW2 = 0;
                    let compterCalorieW3 = 0;
                    let compterCalorieW4 = 0;
                    //calculWeek1
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        console.log(moment(dateFirst).format("DD/MM/YYYY"));
                        console.log(moment(listCaloriesByDate[j].date).format("DD/MM/YYYY"));
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) >= (moment(dateFirst).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateSecond).format("DD/MM/YYYY")))
                        ) {
                            listeCol1.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek1 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW1 += 1;

                        }
                        console.log(calculWeek1)

                    }

                    console.log("compteur", compterCalorieW1);
                    console.log("calculWeek1", calculWeek1);
                    console.log("calculWeek1/compteur", calculWeek1 / compterCalorieW1);
                    if (compterCalorieW1 === 0) {
                        listTotalWeek1.push(calculWeek1);
                    } else {
                        listTotalWeek1.push(calculWeek1 / compterCalorieW1);
                    }

                    //calculWeek2
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateSecond).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateThird).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK2");
                            listeCol2.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek2 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW2 += 1;
                        }
                    }

                    console.log("compteurW2", compterCalorieW2);
                    console.log("calculWeek1", calculWeek2);
                    console.log("calculWeek2/compterCalorieW2", calculWeek2 / compterCalorieW2);
                    if (compterCalorieW2 === 0) {
                        listTotalWeek1.push(calculWeek2);
                    } else {
                        listTotalWeek1.push(calculWeek2 / compterCalorieW2);
                    }

                    //calculWeek3
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) > (moment(dateThird).format("DD/MM/YYYY")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM/YYYY")) <= (moment(dateFourth).format("DD/MM/YYYY")))
                        ) {
                            console.log("in WEEK3");
                            listeCol3.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek3 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW3 += 1;
                        }
                        console.log(calculWeek3)
                    }

                    console.log("compteurW3", compterCalorieW3);
                    console.log("calculWeek3", calculWeek3);
                    console.log("calculWeek3/compterCalorieW2", calculWeek3 / compterCalorieW3);
                    if (compterCalorieW3 === 0) {
                        listTotalWeek1.push(calculWeek3);
                    } else {
                        listTotalWeek1.push(calculWeek3 / compterCalorieW3);
                    }

                    //calculWeek4
                    for (let j = 0; j < listCaloriesByDate.length; j++) {
                        if (
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) > (moment(dateFourth).format("DD/MM")))
                            &&
                            ((moment(listCaloriesByDate[j].date).format("DD/MM")) <= (moment(dateFifth).format("DD/MM")))
                        ) {
                            console.log("in WEEK4");
                            listeCol4.push(parseInt(listCaloriesByDate[j].heartBeat));
                            calculWeek4 += parseInt(listCaloriesByDate[j].heartBeat);
                            compterCalorieW4 += 1;
                        }
                        console.log(calculWeek4)
                    }
                    console.log("compteurW3", compterCalorieW4);
                    console.log("calculWeek4", calculWeek4);
                    console.log("calculWeek4/compterCalorieW2", calculWeek4 / compterCalorieW4);
                    if (compterCalorieW4 === 0) {
                        listTotalWeek1.push(calculWeek4);
                    } else {
                        listTotalWeek1.push(calculWeek4 / compterCalorieW4);
                    }


                    console.log("listTotalWeek1", listTotalWeek1);
                    ListDate.push("WEEK 1");
                    ListDate.push("WEEK 2");
                    ListDate.push("WEEK 3");
                    ListDate.push("WEEK 4");
                    res.json(
                        {
                            listTotalWeek1,
                            listTotalWeek2,
                            listTotalWeek3,
                            listTotalWeek4,
                            ListDate,
                            listeCol1, listeCol2, listeCol3, listeCol4

                        });
                }
            );
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalTodayByIduser = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            User.findOne({_id: req.userData.userId}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "user not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;

                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("MM-DD-YYYY");

                        console.log("first_date", first_date);
                        console.log("dateActuelle", moment().format("MM-DD-YYYY"));

                        if (moment().format("MM-DD-YYYY") === moment(gameFetched[i].Date).format("MM-DD-YYYY")) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                            listTempsByDate.push(gameFetched[i].temps);
                        } else {
                            console.log("mouch kif kif")
                        }


                    }

                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate += parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate += parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate += parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score

                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate += parseInt(listScoreByDate[j]);
                }
                //calcul total temps
                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }

                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

                }

                res.json(
                    {
                        listDistanceByDate, totalDistanceByDate,
                        listCaloriesByDate, totalCaloriesByDate,
                        listHeartBeatByDate, totalHeartBeatByDate,
                        listScoreByDate, totalScoreByDate,
                        listTempsByDate, listeTempsEnMinutes, totalTemps
                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalthisMonthByIduser = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            User.findOne({_id: req.userData.userId}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "user not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listVitesseByDate = [];
                const listHeartBeatByDate = [];


                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("MM-YYYY");
                        // console.log("first_date", first_date);
                        // console.log("dateActuelle", moment().format("MM-YYYY"));
                        if (moment().format("MM-YYYY") === first_date) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listVitesseByDate.push(gameFetched[i].vitesse);
                            listTempsByDate.push(gameFetched[i].temps);
                        } else {
                            console.log("mouch kif kif")
                        }
                    }
                    console.log("length", listDistanceByDate.length);

                }


                res.json(
                    {
                        listDistanceByDate,
                        listCaloriesByDate,
                        listHeartBeatByDate,
                        listVitesseByDate,
                        listTempsByDate,
                    });
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.FindLevelByIdUser = (req, res, next) => {
    updateStatusGoal(req, res);

    Game.find().populate({path: 'level'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let listLevel = [];
            //name levels
            for (var i = 0; i < gameFetched.length; i++) {
                if (gameFetched[i].user._id.equals(req.userData.userId)) {
                    listLevel.push(gameFetched[i].level.nameLevel)
                }
            }
            let liste = [];
            //get alll
            for (var i = 0; i < gameFetched.length; i++) {
                if (gameFetched[i].user._id.equals(req.userData.userId)) {
                    liste.push(gameFetched[i])
                }
            }
            console.log(listLevel);

            //recuperer le temps et le tranformer en minutes seulement
            let listeTempsMin = [];
            console.log("****************liste de temps*************");
            for (var i = 0; i < gameFetched.length; i++) {
                if (gameFetched[i].user._id.equals(req.userData.userId)) {
                    listeTempsMin.push(gameFetched[i].temps)
                }
            }
            console.log(listeTempsMin);
            let listeTempsEnMinutes = [];
            let totalTemsp = 0;
            let HeuresEnMinutes = 0;

            for (let i = 0; i < listeTempsMin.length; i++) {
                let t = listeTempsMin[i];
                //le temps est de format 00:00:00
                let heures = t.substring(0, 2);
                let minutes = t.substring(3, 5);
                console.log("*******heures*");
                console.log(heures);
                console.log("*******minutes*");
                console.log(minutes);
                HeuresEnMinutes = parseInt(heures) * 60;
                console.log(HeuresEnMinutes);
                totalTemsp = HeuresEnMinutes + parseInt(minutes);
                console.log(totalTemsp);
                listeTempsEnMinutes.push(totalTemsp);
            }

            let totalTemps = 0;
            console.log(listeTempsEnMinutes);
            for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

            }
            res.json(
                {
                    listLevel, liste, listeTempsEnMinutes
                });

        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//fetch distance by date for user connected
exports.fetchGameByDate = (req, res, next) => {
    const iduser = req.userData.userId;
    let liste_dist = [];
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log("nombre game", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {

                const idlevel = req.params.id;

                if (gameFetched[i].user == iduser) {
                    liste_dist.push(gameFetched[i]);

                    let date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        if (date1 > date2) return -1;
                        if (date1 < date2) return 1;
                        return 0;
                    };
                    let date_sort_asc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // ASCENDING order. As you can see, JavaScript's native comparison operators
                        // can be used to compare dates. This was news to me.
                        if (date1 > date2) return 1;
                        if (date1 < date2) return -1;
                        return 0;
                    };

                    liste_dist.sort(date_sort_asc);

                }
            }

            res.json({"success": true, "message": "Todos fetched successfully", liste_dist});

        }).catch(err => {
        if (err) {
            res.send({"success": false, "message": "Some Error"});
        }
    });


};
//calcul total temps parcourus for user connected
exports.calculTotalTemps = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let temps = [];

            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;

                if (gameFetched[i].user.equals(iduser)) {
                    temps.push(gameFetched[i].temps);
                }

            }

            console.log("****************liste de temps*************");
            console.log(temps);
            var listeH = [];
            var listeM = [];
            var listeS = [];
            var totalS = 0;
            var totalM = 0;
            var totalH = 0;

            for (let i = 0; i < temps.length; i++) {
                let t = temps[i];
                //le temps est de format 00:00:00
                let heures = t.substring(0, 2);
                let minutes = t.substring(3, 5);
                let secondes = t.substring(6, 8);
                listeH.push(heures);
                listeM.push(minutes);
                listeS.push(secondes);

            }
            //calculer total secondes
            for (let i = 0; i < listeS.length; i++) {
                console.log(parseInt(listeS[i]));
                totalS += parseInt(listeS[i]);
                if (totalS > 59) {
                    totalM += 1;
                    totalS = 0;
                }
            }
            //calculer total minutes
            for (let i = 0; i < listeM.length; i++) {
                console.log(parseInt(listeM[i]));
                totalM += parseInt(listeM[i]);
                if (totalM > 59) {
                    totalH += 1;
                    totalM = 0;
                }
            }

            //calculer total heures
            for (let i = 0; i < listeH.length; i++) {
                console.log(parseInt(listeH[i]));
                totalH += parseInt(listeH[i]);
                if (totalH > 23) {
                    totalH = 0;

                }
            }

            totalM = "" + totalM;
            totalS = "" + totalS;
            totalH = "" + totalH;
            //test sur le total pour ajouter le 0 a gauche
            console.log("*********");
            console.log(totalS.toString().length);

            if (totalS.toString().length === 1) {
                console.log("west el cond");
                totalS = totalS.toString().padStart(2, "0");
                console.log(totalS);
            }

            console.log("**** total minutes");
            console.log(totalM);
            if (totalM.toString().length === 1) {
                console.log("west el cond");
                totalM = totalM.toString().padStart(2, "0");
                console.log(totalM);

            }

            if (totalH.toString().length === 1) {
                console.log("west el cond");
                totalH = totalH.toString().padStart(2, "0");
                console.log(totalH);

            }

            res.json({listeH, listeM, listeS, totalS, totalM, totalH});


        })
        .catch(err => {
            if (err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};
//calcul total distance for user connected
exports.CalculTotalDistances = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_dist = [];
            let totalD = 0;
            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user.equals(iduser)) {
                    list_dist.push(gameFetched[i].distance);
                }

            }
            console.log(list_dist);
            for (let j = 0; j < list_dist.length; j++) {
                totalD = totalD + parseInt(list_dist[j]);

            }

            if (totalD === 0)
                res.json({"success": false, totalD});

            res.json({"success": true, totalD});
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//get all temps et distances for user connected
exports.getAllDistancesTemps = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let listedistances = [];
            let list_temps = [];
            let valueT = null;
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user.equals(iduser)) {

                    listedistances.push(gameFetched[i].distance);
                    list_temps.push(gameFetched[i].temps);
                }
            }
            console.log("****************liste distance*************");
            console.log(listedistances);


            res.json({listedistances, list_temps,});


        }).catch(err => console.log(err));
};
//get all temps en minutes
exports.getAllTempsEnMinutes = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_temps = [];
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;

                if (gameFetched[i].user.equals(iduser)) {


                    list_temps.push(gameFetched[i].temps);
                }
            }

            //recuperer le temps et le tranformer en minutes seulement

            console.log("****************liste de temps*************");
            console.log(list_temps);
            let listeTempsEnMinutes = [];
            let totalTemsp = 0;
            let HeuresEnMinutes = 0;

            for (let i = 0; i < list_temps.length; i++) {
                let t = list_temps[i];
                //le temps est de format 00:00:00
                let heures = t.substring(0, 2);
                let minutes = t.substring(3, 5);
                console.log("*******heures*");
                console.log(heures);
                console.log("*******minutes*");
                console.log(minutes);
                HeuresEnMinutes = parseInt(heures) * 60;
                console.log(HeuresEnMinutes);
                totalTemsp = HeuresEnMinutes + parseInt(minutes);
                console.log(totalTemsp);
                listeTempsEnMinutes.push(totalTemsp);
            }

            let totalTemps = 0;
            console.log(listeTempsEnMinutes);
            for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

            }

            res.json({totalTemps, listeTempsEnMinutes});


        }).catch(err => console.log(err));
};
//calcul total calories for user connected
exports.CalculTotalCalories = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_calories = [];
            let totalC = 0;
            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user == iduser) {
                    list_calories.push(gameFetched[i].calorie);
                }

            }
            console.log(list_calories);
            for (let j = 0; j < list_calories.length; j++) {
                totalC = totalC + parseInt(list_calories[j]);

            }

            if (totalC === 0)
                res.json({"success": false, totalC});

            res.json({"success": true, totalC});
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalVitesse = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_calories = [];
            let total = 0;
            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user == iduser) {
                    list_calories.push(gameFetched[i].vitesse);
                }

            }
            console.log(list_calories);
            for (let j = 0; j < list_calories.length; j++) {
                total = total + parseInt(list_calories[j]);

            }

            if (total === 0)
                res.json({"success": false, total});

            res.json({"success": true, total});
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//add heart beat for user
exports.addHeartBeat = (req, res, next) => {

    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            ;
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let heart = req.body.heartBeat;

                    gameFetched[i].heartBeat = heart;
                    gameFetched[i].save();
                    res.json("heartbeat successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//add temps for user
exports.addTemps = (req, res, next) => {

    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let temps = req.body.temps;

                    gameFetched[i].temps = temps;
                    gameFetched[i].save();
                    res.json("successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//Add calories for user
exports.addCalories = (req, res, next) => {


    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }

            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let calorie = req.body.calorie;
                    gameFetched[i].calorie = calorie;
                    gameFetched[i].save();
                    res.json("successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//add distance for user
exports.addDistance = (req, res, next) => {
    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            ;
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {

                    let dist = req.body.distance;
                    gameFetched[i].distance = dist;
                    gameFetched[i].save();
                    res.json(" distance successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//add score for user
exports.addScore = (req, res, next) => {
    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let score = req.body.score;

                    gameFetched[i].score = score;
                    gameFetched[i].save();
                    res.json("score successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
exports.addVitesse = (req, res, next) => {
    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let vitesse = req.body.vitesse;

                    gameFetched[i].vitesse = vitesse;
                    gameFetched[i].save();
                    res.json("vitesse successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//ajouter niveau
exports.addLevel = (req, res, next) => {

    const level1 = new Level({
        nameLevel: req.body.nameLevel
    });
    level1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send("level Created successfully");
    });
};
//ajouter game
exports.addGame = (req, res, next) => {

    const game1 = new Game({
        status: req.body.status
    });
    game1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send("Game Created successfully");
    });
};
//ajouter game avec id level and id user
exports.addUserLevelToGame = (req, res, next) => {

    //fetch level by id
    Level.findById(req.params.id)
        .then(level => {
            if (!level) {
                return res.status(400).json({
                    message: "level not found"
                });
            }
            console.log("level id", level._id);

            User.findById({_id: req.userData.userId})
                .then((user) => {
                    if (!user) {
                        return res.json({
                            message: "undefined user"
                        });
                    }
                    console.log("user id ", user._id);
                    //creating the game
                    const game1 = new Game({
                        user: user._id,
                        level: level._id,
                        status: "done"
                    });

                    game1.save(function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.send("Game affected successfully");
                    });

                });
            // .catch(err => {
            //   res.status(200).json({
            //     message: "error user "
            //   });
            // });

        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching levels failed!"
            });
        });

};
//get best score for user by email
exports.SortedUserByEmail = (req, res, next) => {

    Game.find().populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_dist = [];
            let totalD = 0;
            console.log("before fetch", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                let listeScore = [];
                let listeDistance = [];
                let listeCalories = [];
                let listeHeartBeat = [];

                for (let i = 0; i < gameFetched.length; i++) {


                    if (gameFetched[i].user._id.equals(iduser)) {
                        listeScore.push({
                            "score": gameFetched[i].score,
                            "name": gameFetched[i].user.name
                        });
                        listeDistance.push({
                            "distance": gameFetched[i].distance,
                            "name": gameFetched[i].user.name
                        });
                        listeCalories.push({
                            "calorie": gameFetched[i].calorie,
                            "name": gameFetched[i].user.name
                        });
                        listeHeartBeat.push({
                            "heartBeat": gameFetched[i].heartBeat,
                            "name": gameFetched[i].user.name
                        });
                    }


                }

                listeScore.sort(function (a, b) {
                    return b.score - a.score;
                });
                listeDistance.sort(function (a, b) {
                    return b.distance - a.distance;
                });
                listeCalories.sort(function (a, b) {
                    return b.calorie - a.calorie;
                });
                listeHeartBeat.sort(function (a, b) {
                    return b.heartBeat - a.heartBeat;
                });
                // console.log("max",Math.min.apply(Math, listeScore)  );
                res.json({listeScore, listeDistance, listeCalories, listeHeartBeat});
            }).catch(err => {
                console.log(err);
                return res.status(401).json({
                    message: " failed!"
                });
            });
        });
};
//get best score for user by id user
exports.SortedUserByIdUser = (req, res, next) => {
    Game.find().populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log("before fetch", gameFetched.length);
            // Find user by email
            User.findOne({_id: req.userData.userId}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({usernotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                let listeScore = [];
                let listeDistance = [];
                let listeCalories = [];
                let listeHeartBeat = [];

                for (let i = 0; i < gameFetched.length; i++) {


                    if (gameFetched[i].user._id.equals(iduser)) {
                        listeScore.push({
                            "score": gameFetched[i].score,
                            "name": gameFetched[i].user.name
                        });
                        listeDistance.push({
                            "distance": gameFetched[i].distance,
                            "name": gameFetched[i].user.name
                        });
                        listeCalories.push({
                            "calorie": gameFetched[i].calorie,
                            "name": gameFetched[i].user.name
                        });
                        listeHeartBeat.push({
                            "heartBeat": gameFetched[i].heartBeat,
                            "name": gameFetched[i].user.name
                        });
                    }


                }

                listeScore.sort(function (a, b) {
                    return b.score - a.score;
                });
                listeDistance.sort(function (a, b) {
                    return b.distance - a.distance;
                });
                listeCalories.sort(function (a, b) {
                    return b.calorie - a.calorie;
                });
                listeHeartBeat.sort(function (a, b) {
                    return b.heartBeat - a.heartBeat;
                });
                // console.log("max",Math.min.apply(Math, listeScore)  );
                res.json({listeScore, listeDistance, listeCalories, listeHeartBeat});
            }).catch(err => {
                console.log(err);
                return res.status(401).json({
                    message: " failed!"
                });
            });
        });
};

//best score for all users
exports.BestScoreVitesse = (req, res, next) => {

    Game.find()
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }

            let listeGroupedBy = [];

            gameFetched.sort(function (a, b) {
                return parseInt(b.vitesse) - parseInt(a.vitesse);
            });
            listeGroupedBy = groupArray(gameFetched, 'user.id');


            res.json(listeGroupedBy);
        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });
};

exports.BestScoreSpeedByIdUser = (req, res, next) => {

    Game.find({user: req.userData.userId})
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }

            let listeGroupedBy = [];

            gameFetched.sort(function (a, b) {
                return parseInt(b.vitesse) - parseInt(a.vitesse);
            });
            let best_speed = 0;
            best_speed = (gameFetched[0].vitesse);
            // }

            res.json({gameFetched, best_speed});
        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });
};

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
        // console.log(item)
        const key = keyGetter(item);
        //  console.log(key)
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    let r = [];
    map.forEach((v, k) => r.push({id: k, game: v}));
    console.log(r);
    return r;
}

exports.BestScoreDistance = (req, res, next) => {

    Game.find()
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }

            let listeGroupedBy = [];

            gameFetched.sort(function (a, b) {
                return parseInt(b.distance) - parseInt(a.distance);
            });
            listeGroupedBy = groupArray(gameFetched, 'user.id');


            res.json(listeGroupedBy);
        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });
};

///Seiiiiiiiiiiiiiiiiiiiiiiiif
exports.BestScoreDistanceMobile = (req, res, next) => {

    Game.find()
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }


            gameFetched.sort(function (a, b) {
                return parseInt(b.distance) - parseInt(a.distance);
            });
            let resp = [];
            resp = groupBy(gameFetched, g => g.user.id);
            let listeFinale = [];
            for (let i = 0; i < resp.length; i++) {
                listeFinale.push({
                    "nomuser": resp[i].game[0].user.name,
                    "distance": resp[i].game[0].distance,
                    "imageProfile": resp[i].game[0].user.imageProfile
                })
            }


            res.json({"bestScoreDistance": listeFinale});
        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });
};
exports.BestScoreVitesseMobile = (req, res, next) => {

    Game.find()
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }


            gameFetched.sort(function (a, b) {
                return parseInt(b.distance) - parseInt(a.distance);
            });
            let resp = [];
            resp = groupBy(gameFetched, g => g.user.id);
            let listeFinale = [];
            for (let i = 0; i < resp.length; i++) {
                listeFinale.push({
                    "nomuser": resp[i].game[0].user.name,
                    "vitesse": resp[i].game[0].vitesse,
                    "imageProfile": resp[i].game[0].user.imageProfile
                })
            }


            res.json({"bestScoreVitesse": listeFinale});
        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });
};


//add GOAL
exports.addGOAL = (req, res, next) => {

    // Form validation
    const {errors, isValid} = validateaddGOALInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var GoalS = mongoose.model('Goal', Goal);


    User.findOne({_id: req.userData.userId}).exec(function (err, user) {
        if (err)
            res.status(400).send(err);
        if (!user)
            res.status(404).send();
        else {
            let goal1 = new GoalS({
                calorieGOAL: req.body.calorieGOAL,
                distanceGOAL: req.body.distanceGOAL,
                dateGOAL: req.body.dateGOAL,
                status: 'in progress'
            });
            user.goals.push(goal1);
            User.findByIdAndUpdate(req.userData.userId, user, {new: true},
                // the callback function
                (err, todo) => {
                    // Handle any possible database errors
                    if (err) return res.status(500).send(err);
                    return res.send(todo);
                });


        }

    });

};

function updateStatusGoal(req, res) {

    User.findOne({_id: req.userData.userId}).exec(function (err, user) {
        if (err)
            res.status(400).send(err);
        if (!user)
            res.status(404).send();
        else {
            const date = new Date();
            let goal1 = [];
            for (let i = 0; i < user.goals.length; i++) {
                console.log("user.goals[i].dateGOAL", user.goals[i].dateGOAL);
                console.log(date);
                goal1 = user.goals;
            }
            for (let i = 0; i < goal1.length; i++) {
                console.log(goal1[i].status);
                //tester la date du goal if it is expired
                if ((goal1[i].dateGOAL) < date) {
                    console.log("in update");

                    goal1[i].status = 'achieved';

                } else {
                    console.log("not in");
                }
            }
            console.log(goal1);
            user.goals = goal1;
            User.findByIdAndUpdate(req.userData.userId, user, {new: true},
                // the callback function
                (err, todo) => {
                    // Handle any possible database errors
                    if (err) return res.status(500).send(err);
                    // res.json(user.goals)
                });
        }
    });


};
//get All goals
exports.getAllGOAL = (req, res, next) => {

    User.findById(req.userData.userId)
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log(gameFetched.goals.length);
            let Liste = [];
            for (var i = 0; i < gameFetched.goals.length; i++) {
                Liste.push(gameFetched.goals[i])
            }
            Liste.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.dateGOAL) - new Date(a.dateGOAL);
            });
            console.log(Liste);

            // goals
            const dateG = Liste[0].dateGOAL;
            //difference entre deux dates
            var dateactuelle = new Date();
            var dategoal = new Date(dateG);

            let topFive = [];
            for (var i = 0; i < 5; i++) {
                topFive.push(Liste[i])
            }

            const diffTime = Math.abs(dategoal.getTime() - dateactuelle.getTime());
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (dateG < dateactuelle) {
                diffDays = 0;
            }
            console.log("date actuelle", dateactuelle);
            console.log("date goal ", dategoal);
            console.log(diffDays);
            let first = [];
            first.push({
                "dateGOAL": Liste[0].dateGOAL,
                "distanceGOAL": Liste[0].distanceGOAL,
                "calorieGOAL": Liste[0].calorieGOAL,
                "dateDebutGOAL": Liste[0].dateDebutGOAL

            })

            let last_one = [];
            last_one.push({
                "dateGOAL": gameFetched.goals[gameFetched.goals.length - 1].dateGOAL,
                "distanceGOAL": gameFetched.goals[gameFetched.goals.length - 1].distanceGOAL,
                "calorieGOAL": gameFetched.goals[gameFetched.goals.length - 1].calorieGOAL,
                "dateDebutGOAL": gameFetched.goals[gameFetched.goals.length - 1].dateDebutGOAL

            })

            res.json(
                {
                    first,
                    diffDays
                    , Liste,
                    topFive,
                    last_one

                });

        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });


};

//Methode calcul progress
exports.getProgress = (req, res, next) => {
    Game.find({user: req.userData.userId})
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let totalD = 0;
            let totalC = 0;
            let perD = 0;
            let perC = 0;
            let progress = 0;
            let calorie = 0;
            let distance = 0;
            let liste = [];
            let goal1 = [];
            for (let j = 0; j < gameFetched.length; j++) {
                liste.push(gameFetched[j]);
            }
            console.log(liste[0].user.goals.length - 1);
            goal1.push(liste[0].user.goals[liste[0].user.goals.length - 1]);
            console.log(goal1);

            //liste des games mte user bel id
            for (let j = 0; j < gameFetched.length; j++) {
                liste.push(gameFetched[j]);
            }
            //khte goals mte user khater kif kif
            let liste_goals = liste[0].user.goals;
            //  console.log(liste_goals);
            //ekher goal
            console.log(liste[0].user.goals.length - 1);
            goal1.push(liste[0].user.goals[liste[0].user.goals.length - 1]);
            console.log(goal1);

            for (let i = 0; i < liste.length; i++) {

                const dategame = (liste[0].Date);
                const dateDebutG = (goal1[0].dateDebutGOAL);
                const dateFinG = (goal1[0].dateGOAL);
                calorie = goal1[0].calorieGOAL;
                distance = goal1[0].distanceGOAL;
                console.log("dateDebutG", dateDebutG);
                console.log("dateFinG", dateFinG);
                console.log("dategame", dategame);

                if (((dategame)) >= (((dateDebutG)))
                    && (((dategame)) <= ((dateFinG)))) {
                    console.log("in date");

                    console.log("dategame", dategame);
                    console.log("dateDebutG", dateDebutG);
                    console.log("dateFinG", dateFinG);
                    totalC = totalC + parseInt(liste[i].calorie);
                    totalD = totalD + parseInt(liste[i].distance);
                    console.log("totalD", totalD);
                    console.log("totalC", totalC);
                } else {
                    console.log("not date")
                }
            }


            if ((totalD > goal1[0].distanceGOAL) && (totalC > goal1[0].calorieGOAL)) {
                console.log("enti fel total distance w total calorie akber mel goal")
                progress = 100;
            } else if (totalC > goal1[0].calorieGOAL) {

                perC = (totalC / goal1[0].calorieGOAL) * 100;
                progress = perC;
                console.log("enti fel total calorie akber mel goal")

            } else if (totalD > goal1[0].distanceGOAL) {
                console.log("enti fel total distance  akber mel goal")

                perD = (totalD / goal1[0].distanceGOAL) * 100;
                progress = perD;
            } else {
                console.log("enti fel sinon")
                perD = (totalD / goal1[0].distanceGOAL) * 100;
                perC = (totalC / goal1[0].calorieGOAL) * 100;
                progress = (perC + perD) / 2;
            }


            res.json({totalC, totalD, calorie, distance, perD, perC, progress, liste, goal1});
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: " failed!"
            });
        });
};

exports.getGoalsAchieved = (req, res, next) => {

    Game.find({user: req.userData.userId})
        .populate({path: 'user'})
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let listeGroupedByIdUser = [];
            let liste_goals = [];
            listeGroupedByIdUser = groupBy(gameFetched, g => g.user.id);
            let listeFinale = [];
            for (let i = 0; i < listeGroupedByIdUser.length; i++) {
                liste_goals.push(listeGroupedByIdUser[i].game[0].user.goals)
            }
            let totalD = 0;
            let totalC = 0;
            for (let j = 0; j < liste_goals.length; j++) {
                for (let i = 0; i < listeGroupedByIdUser[0].game.length; i++) {
                    if (listeGroupedByIdUser[0].game[i].Date > liste_goals[j].dateDebutGOAL &&
                        listeGroupedByIdUser[0].game[i].Date < liste_goals[j].dateGOAL) {
                        console.log("west el if")
                        totalC = totalC + parseInt(listeGroupedByIdUser[0].game[i].calorie);
                        totalD = totalD + parseInt(listeGroupedByIdUser[0].game[i].distance);

                    } else
                        console.log("not if")

                }
            }


            res.json({listeGroupedByIdUser, liste_goals, totalC, totalD});
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: " failed!"
            });
        });


}

exports.getPourcentageAllGoals = (req, res, next) => {
    User.findOne({_id: req.userData.userId})
        .then((user) => {
            if (!user) {
                return res.json({
                    message: "undefined game"
                });
            }

            const date = new Date();
            let goal1 = [];
            for (let i = 0; i < user.goals.length; i++) {
                console.log("user.goals[i].dateGOAL", user.goals[i].dateGOAL);
                console.log(date);
                goal1 = user.goals;
            }
            Game.find({user: req.userData.userId})
                .then((game) => {
                    console.log('west el game');

                    if (!user)
                        res.status(404).send();

                    let totalC = 0;
                    let totalD = 0;
                    console.log('user found');
                    //   console.log('liste games', game);
                    let listeTotal = [];
                    for (let i = 0; i < goal1.length; i++) {
                        for (let g = 0; g < game.length; g++) {
                            console.log(game.length)
                            const dateGame = game[g].Date;
                            const dateDebutG = goal1[i].dateDebutGOAL;
                            const dateFinG = goal1[i].dateGOAL;
                            console.log("dateGame", moment(dateGame).format('DD-MM-YYYY'));
                            console.log("dateDebutG", dateDebutG);
                            console.log("dateFinG", dateFinG);


                            if (dateGame >= dateDebutG && dateGame < dateFinG) {
                                console.log('in', g)
                                totalC = totalC + parseInt(game[g].calorie);
                                totalD = totalD + parseInt(game[g].distance);
                                console.log("totalD", totalD);
                                console.log("totalC", totalC);
                            }
                            console.log('not in')

                        }
                        listeTotal.push({
                            "totalD": totalD, "totalC": totalC
                        })
                        totalC = 0;
                        totalD = 0;
                    }
                    let pourcentage = 0;
                    let listp = [];
                    for (let i = 0; i < goal1.length; i++) {
                        console.log('goal1.calorieGOAL', goal1[i].calorieGOAL, 'listeTotal.totalC', listeTotal[i].totalC);
                        console.log('goal1.distanceGOAL', goal1[i].distanceGOAL, 'listeTotal.totalD', listeTotal[i].totalD);

                        if (parseInt(goal1[i].calorieGOAL) > parseInt(listeTotal[i].totalC) &&
                            parseInt(goal1[i].distanceGOAL) > parseInt(listeTotal[i].totalD)) {
                            console.log('goal not achieved');
                            pourcentage = 0;
                        } else if (parseInt(goal1[i].calorieGOAL) < parseInt(listeTotal[i].totalC) &&
                            parseInt(goal1[i].distanceGOAL) < parseInt(listeTotal[i].totalD)) {
                            console.log('goal  achieved  ');
                            pourcentage = 100;
                        } else if (parseInt(goal1[i].calorieGOAL) < parseInt(listeTotal[i].totalC) ||
                            parseInt(goal1[i].distanceGOAL) < parseInt(listeTotal[i].totalD)) {
                            console.log('goal  achieved nos ');
                            pourcentage = 50;
                        }

                        listp.push(pourcentage)

                    }

                    console.log("listeTotal", listeTotal);
                    console.log("goal1", goal1);
                    console.log("listp", listp);
                    let pourcentageALL = 0;
                    let sommep = 0;

                    for (let i = 0; i < listp.length; i++) {
                        sommep = (sommep + parseInt(listp[i]));
                    }
                    pourcentageALL = sommep / listp.length;
                    console.log("pourcentageALL", pourcentageALL);


                    res.json({pourcentageALL});

                });


        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: " failed!"
            });
        });
    ;

}