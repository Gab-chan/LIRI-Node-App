require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require("node-spotify-api");

var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var gettingArtistSpotify = function(artist) {
    return artist.name;
  };

var spotifySearch = function(musicName) {
    if (musicName === undefined) {
      musicName = "Rolling in the deep";
    }
    
    spotify.search(
      {
        type: "track",
        query: musicName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var music = data.tracks.items;

        for (var i = 0; i < music.length; i++) {
          console.log(i);
          console.log("artist(s): " + music[i].artists.map(gettingArtistSpotify));
          console.log("song name: " + music[i].name);
          console.log("preview song: " + music[i].preview_url);
          console.log("album: " + music[i].album.name);
          break
        }
      }
    );
  };


  var movieSearch = function(movieName) {
    if (movieName === undefined) {
      movieName = "The lion king";
    }
  
    var urlHit =
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    axios.get(urlHit).then(
      function(response) {
        var movieData = response.data;
  
        console.log("Title: " + movieData.Title);
        console.log("Year: " + movieData.Year);
        console.log("Rated: " + movieData.Rated);
        console.log("IMDB Rating: " + movieData.imdbRating);
        console.log("Country: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
        console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
      }
    );
  };

  var myBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    axios.get(queryURL).then(
      function(response) {
        var bandsData = response.data;
  
        if (!bandsData.length) {
          console.log("Couldn't found result for " + artist);
          return;
        }
  
        console.log("The upcoming concert for " + artist + ":");
  
        for (var i = 0; i < bandsData.length; i++) {
          var show = bandsData[i];
  
         
          console.log(
            show.venue.city +
              "," +
              (show.venue.region || show.venue.country) +
              " at " +
              show.venue.name +
              " " +
              moment(show.datetime).format("MM/DD/YYYY")
          );
        }
      }
    );
  };


var pick = function(finalData, functionData) {
    switch (finalData) {
    case "concert-this":
      myBands(functionData);
      break;
    case "spotify-this-song":
      spotifySearch(functionData);
      break;
    case "movie-this":
      movieSearch(functionData);
      break;
    default:
      console.log("LIRI doesn't get it!");
    }
  };
  
  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  runThis(process.argv[2], process.argv.slice(3).join(" "));
