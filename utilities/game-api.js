var request = require('request');
var apiUrl = 'https://api-endpoint.igdb.com/games/?';

module.exports = {
    searchByTitle
};

function searchByTitle(title) {
    var url = `${apiUrl}search=${title}&fields=*`;
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