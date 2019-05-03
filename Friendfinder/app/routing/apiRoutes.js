var friendsData = require('../data/friends.js');

module.exports = function (app) {

    var newUserScoreInt = [];

    app.get('/api/friends', function (req, res) {
        res.json(friendsData)
    });

    app.post('/api/friends', function (req, res) {
        newUserScoreInt = [];
        friendsData.push(req.body);
        var newUser = friendsData.pop();
        var newUserScore = newUser.scores;
        for (var i = 0; i < newUserScore.length; i++) {
            var newNumber = parseInt(newUserScore[i]);
            newUserScoreInt.push(newNumber);
        }
        var friendsScoresArray = []

        for (var i = 0; i < friendsData.length; i++) {
            // console.log(friendsData[i].scores)
            friendsScoresArray.push(friendsData[i].scores)
        }

        console.log(friendsScoresArray)

        var totalDifference = []
        for (var i = 0; i < friendsScoresArray.length; i++) {
            var difference = []
            
            var myDifferernce;
            for (var j = 0; j < friendsScoresArray[i].length; j++) {

                difference.push(Math.abs(friendsScoresArray[i][j] - newUserScoreInt[j]))




            }
            console.log("_______________________________________________________")


            var sum = difference.reduce(function(a, b) {
                return a + b;
            }, 0)

         
            totalDifference.push(sum);

        }
      
        console.log(totalDifference)
        var bestMatchNumber;
        var bestMatchindex;
        for (var i = 0; i < totalDifference.length; i++) {
            if (totalDifference[i] <= totalDifference[i+1]) {
                bestMatchNumber = totalDifference[i];
                bestMatchindex = [i];
                console.log(bestMatchNumber)
                console.log(bestMatchindex)
            }
            
        }
        console.log("final index " + bestMatchindex)
        console.log("new User " + newUserScoreInt);

    });


    
}