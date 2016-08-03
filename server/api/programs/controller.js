'use strict';
let muscleGroups = require('./../models/muscleGroups.model');
let when = require('when');
let _ = require('lodash');


module.exports = {
    generateProgram(req, res) {
        let exercise = require('./../models/exercise.model');
        if (req.query) {
            let query = muscleGroups.find({}).select({ name: 1, _id: 1 });
            let exercises = exercise.find({}).select({ name: 1, _id: 1,mainMuscleGroup: 1 });
            
            let muscleGroupsArray = [];
            let trainingDays = (req.query && req.query.days) ? JSON.parse(req.query.days).length : 2;
            let startDate = (req.query && req.query.startDate) ? req.query.startDate : new Date().toISOString();
            let endDate = (req.query && req.query.endDate) ? req.query.endDate : new Date().toISOString();
            let weight = req.query.weight || 80;
            let height = req.query.height || 180;
            let days = (req.query && req.query.days) ? JSON.parse(req.query.days) : [0, 2];
            let fitnessLevel = req.query.fitLevel || 0;
            let maxScore = ( fitnessLevel == 0 ) ? 45 : ( fitnessLevel == 1 ) ? 50 : 55;
            let mainSeries = ( fitnessLevel == 0 ) ? 3 : ( fitnessLevel == 1 ) ? 4 : 5;
            let secondarySeries = 3;
            //types 0: cut, 1:bulk, 2: general
            let type = req.query.type || 0;
            let cardio = req.query.cardio || false;
            if (JSON.parse(cardio)) {
                if (type == 0) {
                    cardio = (trainingDays >= 4) ? trainingDays - 1 : trainingDays;
                } else if (type == 1) {
                    cardio = (trainingDays >= 4) ? trainingDays - 3 : 2;
                } else {
                    cardio = Math.round(trainingDays / 2);
                }
            } else {
                cardio = 0;
            }
            when.all([query,exercises]).then(function(data){
                debugger
                let musclesData = data[0];
                let exercisesData = data[1];
                
                for (let i = 0; i < musclesData.length; i++) {
                    muscleGroupsArray.push(musclesData[i]._doc.name);
                    
                }
                let muscles = muscleGroupsArray.length;
                let ceiledTrainings = Math.ceil(musclesData.length / trainingDays);
                let roundTrainings = Math.round(musclesData.length / trainingDays);
                let resObj = {
                    0: "",
                    1: "",
                    2: "",
                    3: "",
                    4: "",
                    5: "",
                    6: ""
                };
                function returnDayProgram(count, groups) {
                    let arr = [];
                    for (let i = 0; i < count; i++) {
                        let randomIdx = Math.floor(Math.random() * muscleGroupsArray.length);
                        arr.push(muscleGroupsArray[randomIdx]);

                        muscleGroupsArray.splice(randomIdx, 1);
                    }
                    (cardio > 0) ? arr.push("Cardio") : "";
                    cardio--;
                    return arr;
                }
                for (let i = 0; i < days.length; i++) {
                    resObj[days[i]] = returnDayProgram(Math.ceil(muscleGroupsArray.length / trainingDays), muscleGroupsArray);
                    trainingDays--;
                }
 //               res.json(resObj);
                let exerci = []
                for (let key in resObj) {
                    let day = resObj[key];
                    if(day instanceof Array){
                        for(let j=0;j<day.length;j++){
                            debugger
                            exerci.push(_.find(exercisesData, exercise => { 
                                return exercise._doc.mainMuscleGroup === day[j]}));
                        }
                        debugger
                    }
                    trainingDays--;
                }


           
            });

        }
    }
}