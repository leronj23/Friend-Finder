var friendsData = require("../data/friends");
var scoreArray = [];

module.exports = function (app) {

    // Show Json of all friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // Post submitted data as a Json object
    app.post("/api/friends", function (req, res) {

        if (friendsData.length > 0) {

            //console.log("friendsData", friendsData)

            var scoreArray = [];

            for (var i = 0; i < (friendsData.length); i++) {

                var totalDifference = 0;

                for (var j = 0; j < friendsData[i].scores.length; j++) {

                    if (req.body.scores[j] != friendsData[i].scores[j]) {

                        var difference = req.body.scores[j] - friendsData[i].scores[j];
                        //console.log(difference)

                        totalDifference += difference > 0 ? difference : -difference;
                        //console.log(totalDifference)
                    }
                }

                scoreArray.push(totalDifference);
                // console.log(scoreArray);
                //console.log("indexOf", scoreArray.indexOf(Math.min(...scoreArray)));
                //res.json(friendsData[index]);
            }

            console.log(scoreArray);

            var index = scoreArray.indexOf(Math.min(...scoreArray));
            console.log("indexOf", scoreArray.indexOf(Math.min(...scoreArray)));

            friendsData.push(req.body);
            console.log("friendsData ", friendsData[index])

            res.json(friendsData[index]);
        }
        else {

            friendsData.push(req.body)
            console.log("req.body", req.body)
        }   
    });
}