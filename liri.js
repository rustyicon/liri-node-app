var keys = require("./keys.js");
//console.log(keys)

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require("request");

/*
 console.log('myArg', myArg);

 myArg.forEach(function(val, index, array) {
 console.log(index + " , " + val);
 });
 */

var userArg = process.argv.slice(3).join(" ");

//console.log(userArg);

var action = process.argv[2];

switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doThis();
        break;
}
/*==========
 ### What Each Command Should Do

 1. `node liri.js my-tweets`

 * This will show your last 20 tweets and when they were created at in your terminal/bash window.

 ===========*/

function myTweets() {
    var call = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'relicrust'};
    call.get('statuses/user_timeline', params, function (error, tweets) {
        if (!error) {
            console.log(tweets);
        }
    });
}
/*==========
 2. `node liri.js spotify-this-song '<song name here>'`

 * This will show the following information about the song in your terminal/bash window
 * Artist(s)
 * The song's name
 * A preview link of the song from Spotify
 * The album that the song is from

 * if no song is provided then your program will default to
 * "The Sign" by Ace of Base

 =======*/


function spotifySong() {

    if (userArg === "" || userArg === null) {
        userArg = "The Sign";
    } else {
        spotify.search({type: 'track', query: userArg}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                //console.log(data.tracks.items[i])
                if (data.tracks.items[i].album.album_type === "album") {
                    var index = i;
                    console.log("Artists: " + data.tracks.items[index].album.artists[0].name);
                    console.log("Song's track: " + data.tracks.items[index].name);
                    console.log("Preview link: " + data.tracks.items[index].preview_url);
                    console.log("Album title: " + data.tracks.items[index].album.name);
                    return;
                }
            }

        });
    }
}

/*=====
 3. `node liri.js movie-this '<movie name here>'`

 * This will output the following information to your terminal/bash window:

 ```
 * Title of the movie.
 * Year the movie came out.
 * IMDB Rating of the movie.
 * Country where the movie was produced.
 * Language of the movie.
 * Plot of the movie.
 * Actors in the movie.
 * Rotten Tomatoes URL.
 ```

 * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
 * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
 * It's on Netflix!
 =========*/

function movieThis() {
    if (userArg === null || userArg === "") {
        userArg = "Mr.Nobody";
    } else {
        console.log(userArg);
        request("http://www.omdbapi.com/?t=" + userArg + "&y=&plot=short&r=json", function (error, response, body) {


            if (!error && response.statusCode === 200 && response.body !== undefined) {
                var json = JSON.parse(body);
                console.log(json);
                //Filtering specific callback data into variables
                var title = 'Title: ' + json.Title;
                var year = 'Year: ' + json.Year;
                var rating = 'IMDB Rating: ' + json.imdbRating;
                var country = 'Country: ' + json.Country;
                var language = 'Language: ' + json.Language;
                var plot = 'Plot: ' + json.Plot;
                var actors = 'Actors: ' + json.Actors;


                console.log(title, year, rating, country, language, plot, actors);
            } else {
                console.log("Sorry, movie not found!");
            }
        });
    }
}

/*=========
 4. `node liri.js do-what-it-says`
 * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
 * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
 * Feel free to change the text in that document to test out the feature for other commands.

 ===========*/


function doThis() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(" , ");
        var input = dataArr[0];
        var submit = dataArr.slice(1).join(" ");
    });
} //close doThis function
