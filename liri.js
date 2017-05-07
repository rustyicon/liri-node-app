var keys = require("./keys.js");

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require("request");


//console.log(keys)

//grab input index [2-3]
var userArgs = process.argv;

var input = ""; 

for (var i = 2; i < userArgs.length; i++) {

  
  input = input + " " + nodeArgs[i];
}
 

switch (action){
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

/*
### What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

===========*/

function myTweets(){

var call = new Twitter(keys);

var params = {screen_name: 'relicrust'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
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
function spotifySong (){


 
spotify.search({ type: 'track', query: input }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	
   	for (var i = 0; i < data.tracks.items.length; i++) {
   		//console.log(data.tracks.items[i])
   		if(data.tracks.items[i].album.album_type === "album"){
   			index = i; 
   			console.log("Artists: " + data.tracks.items[index].album.artists[0].name);
            console.log("Song's track: " + data.tracks.items[index].name);
            console.log("Preview link: " + data.tracks.items[index].preview_url);
            console.log("Album title: " + data.tracks.items[index].album.name);
            return;	
        }
}

});
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

function movieThis(){

if (input === null || input === ""){
	input === "Mr.Nobody";
}
  request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json", function(error, response, body) {
 
         
         if (!error && response.statusCode === 200) {
          
             console.log("Title: " + JSON.parse(body).Title);
             console.log("Released Date: " + JSON.parse(body).Released);
             console.log("Rating: " + JSON.parse(body).imdbRating);
             console.log("Country produced in: " + JSON.parse(body).Country);
             console.log("Language: " + JSON.parse(body).Language);
             console.log("Short Summary: " + JSON.parse(body).Plot);
             console.log("Actors: " + JSON.parse(body).Actors);
             console.log("URL: http://www.imdb.com/title/" + JSON.parse(body).imdbID);
         }
    });

}

/*=========
4. `node liri.js do-what-it-says`
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     * Feel free to change the text in that document to test out the feature for other commands.

     */
function doThis(){

var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data){
	var dataArr = data.spit(",");
	input = dataArr[0];
	submit = dataArr.slice(1).join(" ");


})

}
