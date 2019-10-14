const express = require("express");

const UserController = require("../controllers/users");
const authCheck = require("../middleware/check-auth");

const router = express.Router();
router.post("/login", UserController.UserLogin);
router.post("/register", UserController.createUser);
//create level
router.post("/addLevel", UserController.addLevel);
router.post('/addGame',authCheck, UserController.addGame);
router.post("/addUserLevelToGame/:id",authCheck, UserController.addUserLevelToGame);


router.get('/getProfileForConnectedUser',authCheck , UserController.getProfileConnectedUser);
router.get('/calculHeartRate',authCheck,UserController.calculHeartRate);

router.get('/getAllProfiles',UserController.getAllProfiles);

router.get('/getInfoUserByEmail/:email', UserController.getInfoUserByEmail);
router.get('/getUserInfo',authCheck ,UserController.getUserInfo);
router.get('/SortedUserByIdUser',authCheck,UserController.SortedUserByIdUser);
router.get('/CalculTotalthisMonthByIduser',authCheck,UserController.CalculTotalthisMonthByIduser);
router.get('/CalculTotalthisWeekByEmail',authCheck,UserController.CalculTotalthisWeekByEmail);
router.get('/CalculTotalTodayByIduser',authCheck,UserController.CalculTotalTodayByIduser);
router.get('/CalculTotalthisWeekByIduser',authCheck,UserController.CalculTotalthisWeekByIduser);
router.get('/ChartWEEK',authCheck,UserController.ChartWEEK);

router.get('/ChartMONTHCalorie',authCheck,UserController.ChartMONTHCalorie);
router.get('/ChartMONTHDistance',authCheck,UserController.ChartMONTHDistance);
router.get('/ChartMONTHHeart',authCheck,UserController.ChartMONTHHeart);
router.get('/ChartMONTHVitesse',authCheck,UserController.ChartMONTHVitesse);
router.get('/FindLevelByIdUser',authCheck,UserController.FindLevelByIdUser);

///hethi el update
router.post('/updateUser',authCheck,UserController.updateUser);
router.post('/updatePassword',authCheck,UserController.updatePassword);

/////////////////////////////
router.post('/updateUserMobile/:idUser',UserController.updateUserMobile);



  //Add distane , calorie,heartbeat,temps for user
router.post('/addDistance/:id',authCheck, UserController.addDistance);
router.post('/addTemps/:id',authCheck, UserController.addTemps);
router.post('/addScore/:id',authCheck, UserController.addScore);
router.post('/addCalorie/:id',authCheck, UserController.addCalories);
router.post('/addHeartBeat/:id',authCheck, UserController.addHeartBeat);
router.post('/addVitesse/:id',authCheck, UserController.addVitesse);

//filtrer game by date and get what ever you want
router.get('/fetchGameByDate',authCheck, UserController.fetchGameByDate);
//getBestScore
router.get('/SortedUserByEmail/:email',UserController.SortedUserByEmail);
router.get('/fetchGameByDateByEmail/:email',UserController.fetchGameByDateByEmail);
router.get('/calculTotalTempsByEmail/:email',UserController.calculTotalTempsByEmail);
router.get('/CalculTotalDistancesByEmail/:email',UserController.CalculTotalDistancesByEmail);
router.get('/CalculTotalCaloriesByEmail/:email',UserController.CalculTotalCaloriesByEmail);
//calcul total today
router.get('/CalculTotalTodayByEmail/:email',UserController.CalculTotalTodayByEmail);
//calcul total for this month
router.get('/CalculTotalthisMonthByEmail/:email',UserController.CalculTotalthisMonthByEmail);
//calcul total for this week
router.get('/CalculTotalthisWeekByEmail/:email',UserController.CalculTotalthisWeekByEmail);

//get all temps en minutes by date
router.get('/getAllTempsEnMinutes',authCheck,UserController.getAllTempsEnMinutes);
router.get('/calculTotalTemps',authCheck, UserController.calculTotalTemps);
router.get('/CalculTotalDistances',authCheck,UserController.CalculTotalDistances);
router.get('/CalculTotalCalories',authCheck,UserController.CalculTotalCalories);
router.get('/CalculTotalVitesse',authCheck,UserController.CalculTotalVitesse);

router.get('/getAllDistancesTemps',authCheck,UserController.getAllDistancesTemps);
//hethouma el best score
router.get('/BestScoreDistance',UserController.BestScoreDistance );
router.get('/BestScoreVitesse',UserController.BestScoreVitesse );
router.get('/BestScoreDistanceMobile',UserController.BestScoreDistanceMobile );
router.get('/BestScoreVitesseMobile',UserController.BestScoreVitesseMobile );
router.get('/BestScoreSpeedByIdUser',authCheck,UserController.BestScoreSpeedByIdUser );

///////////////


router.post('/addGOAL',authCheck,UserController.addGOAL);
// router.post('/updateStatusGOAL',authCheck,UserController.updateStatusGOAL);
router.get('/getAllGOAL',authCheck,UserController.getAllGOAL);
router.get('/getProgress',authCheck,UserController.getProgress);
router.get('/getGoalsAchieved',authCheck,UserController.getGoalsAchieved);
router.get('/getPourcentageAllGoals',authCheck,UserController.getPourcentageAllGoals);

router.post('/addGOAL',authCheck,UserController.addGOAL);


//seiiiiiiiiiiiiiiiiiiiiiiiif el chartouet jdod
router.get('/ChartWEEKByEmail/:email',UserController.ChartWEEKByEmail);
router.get('/ChartMONTHCalorieByEmail/:email',UserController.ChartMONTHCalorieByEmail);
router.get('/ChartMONTHDistanceByEmail/:email',UserController.ChartMONTHDistanceByEmail);
router.get('/ChartMONTHVitesseByEmail/:email',UserController.ChartMONTHVitesseByEmail);
////////////////////////////////////

module.exports = router;
