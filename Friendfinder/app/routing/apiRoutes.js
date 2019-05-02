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
            console.log(friendsData[i].scores)
              friendsScoresArray.push(friendsData[i].scores)  
            }
           
           
         for (var i = 0; i < friendsScoresArray.length; i++)   {
            var difference = []
            var totalDifference = []
            var myDifferernce;
                for(var j = 0; j < friendsScoresArray[i].length; j++){
                    
                    difference.push(Math.abs(friendsScoresArray[i][j] - newUserScoreInt[j]))
             
                    
               
                   
                }
                console.log("_______________________________________________________")

                
                
                var total = function () {
                     myDifferernce   =  difference.reduce(function (curr, prev) { 
                   
                       return curr + prev; });

                  
          
                  
                    
                }

                total();
                totalDifference.push(myDifferernce);
                console.log(totalDifference)
             
               
            
               
         } 
            
        //  total(difference);
       
       
        console.log("new User " + newUserScoreInt);
        
    });

    
    // for (var i = 0; i < friendsData.length; i++) {
    //     console.log(friendsData[i].scores)
    // }
}