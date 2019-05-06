// variable that holds the friend.js objects array
var friendsData = require('../data/friends.js');


module.exports = function (app) {
    // creates url path for api/friends gets content from the friendsData variable from friends.js
    app.get('/api/friends', function (req, res) {
        res.json(friendsData)
    });

    // adds data from survey to the server and is where logic for picking friend happends
    app.post('/api/friends', function (req, res) {
        // adds new survey info to friendsData
        friendsData.push(req.body);
        // array that will hold New users scores converted to integers
        var newUserScoreInt = [];
        // isolates new users data from possible friends data
        var newUser = friendsData.pop();
        // array that will hold possible friends scores to compare to
        var friendsScoresArray = []
        // stores newUsers scores to comapre with friendsScores
        var newUserScore = newUser.scores;
        //will store total difference arary
        var totalDifference = []

        // loop that makes newUserScores into Integers
        for (var i = 0; i < newUserScore.length; i++) {
            var newNumber = parseInt(newUserScore[i]);
            newUserScoreInt.push(newNumber);
        }

        // loop that creates an array of friends Scores
        for (var i = 0; i < friendsData.length; i++) {
            friendsScoresArray.push(friendsData[i].scores)
        }


        // loops through friendsSocres 
        for (var i = 0; i < friendsScoresArray.length; i++) {
            //var to store an array of score diffrence
            var difference = []
            // nested loop to compare new users scores to each other possible friends scores 
            for (var j = 0; j < friendsScoresArray[i].length; j++) {
                // sores the absolute diffrences in scores to difference array
                difference.push(Math.abs(friendsScoresArray[i][j] - newUserScoreInt[j]));
            }

            // reduce method to sum up the difference array of each user
            var sum = difference.reduce(function (a, b) {
                return a + b;
            }, 0)

            // stores the sums of each users diffenences in the array totalDifference
            totalDifference.push(sum);
        }


        // assume the first value is the lowest going into loop
        var bestMatchNumber = totalDifference[0];
        var bestMatchindex = 0;

        // loops through totalDiffence to find lowest difference number 
        // and stores the index number in bestMatchIndex
        for (var i = 0; i < totalDifference.length - 1; i++) {
            if (totalDifference[i + 1] <= bestMatchNumber) {
                bestMatchNumber = totalDifference[i + 1];
                bestMatchindex = i + 1;
            }

        }

        // makes an object of the person who has the closest match's name and photo
        var bestMatch = {
            name: friendsData[bestMatchindex].name,
            photo: friendsData[bestMatchindex].photo
        }
       
        // sends the best match object to use in survey.html
        res.json(bestMatch)

    });



}