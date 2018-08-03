var request = require('request');
var apiUrl = '//api-2445582011268.apicast.io/games/?';

module.exports = {
    searchByTitle
};

function searchByTitle(title) {
    var url = `${apiUrl}search=${title}&fields=*&user-key=${process.env.IGDB_TOKEN}`;
    return new Promise(function(resolve, reject) {
        request(url, function(err, response, body) {
            console.log(response);
            resolve(JSON.parse(body));
        });
    });
};