var request = require('request');
var requestPromise = require('request-promise-native');
var apiUrl = 'https://api-endpoint.igdb.com/games/';
var platformUrl = 'https://api-endpoint.igdb.com/platforms/';

module.exports = {
    searchByTitle,
    searchOneGame
};

function searchByTitle(title) {
    // var url = `${apiUrl}?search=${title}&fields=*&expand=platforms`;
    if (!title) {
        var url = `${apiUrl}?fields=*&order=popularity:desc&expand=platforms`;
        return new Promise(function(resolve, reject) {
            request({
                url: url,
                headers: {
                    'user-key': process.env.IGDB_TOKEN,
                    Accept: 'application/json'
                }
             }, function(err, response, body) {
                var gameData = JSON.parse(body);
                resolve(gameData);
            });
        });
    } else {
        var url = `${apiUrl}?search=${title}&fields=*&order=popularity:desc&expand=platforms`;
        return new Promise(function(resolve, reject) {
            request({
                url: url,
                headers: {
                    'user-key': process.env.IGDB_TOKEN,
                    Accept: 'application/json'
                }
            }, function(err, response, body) {
                var gameData = JSON.parse(body);
                resolve(gameData);
            });
        });
    }
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
             if (gameData.platforms) {
                var promises = [];
                gameData.platforms.forEach(function(platform) {
                    promises.push(requestPromise({
                        url: `${platformUrl}${platform}?fields=name`,
                        headers: {
                            'user-key': process.env.IGDB_TOKEN,
                            Accept: 'application/json'
                        }
                    }));
                });
                Promise.all(promises).then(function(platforms) {
                    gameData.platforms = platforms.map(platform => JSON.parse(platform)[0].name);
                    resolve(gameData);
                });
            } else {
                resolve(gameData);               
            }
        });
    });
};