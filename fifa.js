#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var chalk = require('chalk');

var url = "http://worldcup.sfg.io/matches/today";
var matchInfo;

request({
    method: 'GET',
    url: url,
    callback: program_check
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        matchInfo = JSON.parse(body);
        program_check();
    } else if (error) {
        console.log(chalk.red('Error: ' + error));
        process.exit(1);
    }
});

program
    .version('1.0.0')
    .option('-t, --today', "Return today's match scores and timings")
    .parse(process.argv);

function program_check() {
    if (program.today) {
        for(var i = 0; i < matchInfo.length; i++) {
            var matchObj = matchInfo[i];
            var home_team = matchObj["home_team"];
            var away_team = matchObj["away_team"];
            console.log( home_team["country"] + "  " + home_team["goals"] + "-" + away_team["goals"] + "  " + away_team["country"] + "  " + matchObj["status"]);
        }
    } else {
        program.help();
    }
}



