var express = require("express"),
    router  = express.Router(),
    pollModel = require("../models/poll.js"),
    test = require("../helpers/middlewares.js")

var t = {
                        type: 'pie',
                        data: {
                            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            datasets: [{
                                label: '# of Votes',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 206, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(153, 102, 255)',
                                    'rgb(255, 159, 64)'
                                ],
                                borderWidth: 1,
                            }]
                        },
                        options: {
                            legend: {
                                position: "right"
                            },  
                            cutoutPercentage : 50
                        }                
                    }

router.get("/:pollId", function(req, res){
    pollModel.findOne({_id : req.params.pollId}, function(err,pollRetrieved) {
        if (err) {
           console.log(err);
           res.redirect("/");
        } else {
            var graphParameters = new test.GraphCreator(pollRetrieved);
            console.log(graphParameters);
            res.render("poll", {poll:pollRetrieved, graphParameters : graphParameters}); // UPDATE FOR GRAPH
        }
    });
});

router.post("/:pollId", function(req, res){
    res.send("You voted for " + req.query.answer)
});

router.use(function(req, res) {
    res.redirect("/");
});

module.exports = router;