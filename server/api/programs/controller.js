'use strict';
let muscleGroups = require('./../models/muscleGroups.model');


module.exports = {
    generateProgram(req, res) {
        if (req.query) {
            let query = muscleGroups.find({}).select({ name: 1, _id: 1 });
            let muscleGroupsArray = [];
            let trainingDays = (req.query && req.query.days) ? JSON.parse(req.query.days).length : 2;
            let startDate = (req.query && req.query.startDate) ? req.query.startDate : new Date().toISOString();
            let endDate = (req.query && req.query.endDate) ? req.query.endDate : new Date().toISOString();
            let weight = req.query.weight || 80;
            let height = req.query.height || 180;
            let days = (req.query && req.query.days) ? JSON.parse(req.query.days) : [0, 2];
            let fitnessLevel = req.query.fitLevel || 0;
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

            query.exec().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    muscleGroupsArray.push(data[i]._doc.name);
                }
                let muscles = muscleGroupsArray.length;
                let ceiledTrainings = Math.ceil(data.length / trainingDays);
                let roundTrainings = Math.round(data.length / trainingDays);
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
                    return arr.join(" ");
                }
                for (let i = 0; i < days.length; i++) {
                    resObj[days[i]] = returnDayProgram(Math.ceil(muscleGroupsArray.length / trainingDays), muscleGroupsArray);
                    trainingDays--;
                }
                res.json(resObj);

            });

        }
    }
}