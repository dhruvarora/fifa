#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var chalk = require('chalk');
var cliff = require('cliff');
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
        var rows = [];
        rows.push(["Home   ".bold, "Score   ".bold, "Away   ".bold, "Status".bold]);
        for(var i = 0; i < matchInfo.length; i++) {
            var matchObj = matchInfo[i];
            var home_team = matchObj["home_team"];
            var away_team = matchObj["away_team"];
            var score = home_team["goals"] + " - " + away_team["goals"];
            rows.push([home_team["country"].toString() + "   ", score.toString() + "   ", away_team["country"].toString() + "   ", matchObj["status"]]);
        }
        console.log(cliff.stringifyRows(rows));
    } else {
        program.help();
    }
}