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
        //total diff aray
        var totalDifference = []
        for (var i = 0; i < friendsScoresArray.length; i++) {
            //temp diff array stor
            var difference = []
            //temp diff var storage
           
            for (var j = 0; j < friendsScoresArray[i].length; j++) {

                difference.push(Math.abs(friendsScoresArray[i][j] - newUserScoreInt[j]));

            }
           
            var sum = difference.reduce(function(a, b)
            {
                return a + b;
            }, 0)

         
            totalDifference.push(sum);

        }
      
        console.log("total diff "+ totalDifference)
        // assume the first value is the lowest going into loop
        var bestMatchNumber = totalDifference[0];
        var bestMatchindex;
       
        for (var i = 0; i < totalDifference.length - 1; i++) {
          
            if (totalDifference[i + 1] <= bestMatchNumber ) {
                bestMatchNumber = totalDifference[i + 1];
                bestMatchindex = i + 1;
                
            }
            
        }
        var bestMatch = {
            name: friendsData[bestMatchindex].name,
            photo: friendsData[bestMatchindex].photo
        }
        console.log("final index " + bestMatchindex)
        console.log("new User " + newUserScoreInt);

        console.log(friendsData[bestMatchindex].name)
        console.log(friendsData[bestMatchindex].photo)
        res.json(bestMatch)

    });


    
}