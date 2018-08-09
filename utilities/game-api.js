var request = require('request');
var apiUrl = 'https://api-endpoint.igdb.com/games/';
var platformUrl = 'https://api-endpoint.igdb.com/platforms/';

module.exports = {
    searchByTitle,
    searchOneGame
};

function searchByTitle(title) {
    var url = `${apiUrl}?search=${title}&fields=*`;
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            headers: {
                'user-key': process.env.IGDB_TOKEN,
                Accept: 'application/json'
            }
         }, function(err, response, body) {
            var gameData = JSON.parse(body);
            // console.log(gameData);
            resolve(gameData);
        });
    });
};

function searchOneGame(id) {
    var url = `${apiUrl}${id}`;
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            headers: {
                'user-key': process.env.IGDB_TOKEN,
                Accept: 'application/json'
            }
         }, function(err, response, body) {
             var gameData = JSON.parse(body)[0];
             console.log(gameData);
            resolve(gameData);
        });
    });
};