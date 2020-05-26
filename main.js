
var source   = $("#entry-template").html();

var template = Handlebars.compile(source);

var posterBase = "https://image.tmdb.org/t/p/w185"

$("button").click(find);


function find() {

    $("main > div").remove();

    var value = $("input").val();

    $.ajax({
        "url" : "https://api.themoviedb.org/3/search/movie",

        "method" : "get",

        "data" : {

            "api_key" : "6ccedbd7f57e862715c5eac090a719e7",

            "query" : value,

            "language" : "it"

        },

        "success" : function(answer) {

            var filmList = answer.results;

            for (var i = 0; i < filmList.length; i++) {

                var star = Math.ceil(filmList[i].vote_average / 2)

                var context = {

                    "title" : filmList[i].title,

                    "titleOriginal" : filmList[i].original_title,

                    "vote" : "voteFilm",

                    "language" : function() {

                        var languages = ["it" , "fr", "en", "de"]

                        if (languages.includes(filmList[i].original_language)) {

                            return "<img src='flags/" + filmList[i].original_language + ".png'>"

                            console.log("Ok");

                        } else {

                            return "<span>" + filmList[i].original_language + "</span>"

                            console.log("No");

                        }

                    },

                    "poster" :

                    function() {

                    if (filmList[i].poster_path == null) {

                        return "img/boolean.png"

                    } else {

                        return posterBase + filmList[i].poster_path
                    }

                    }
                };

                var html = template(context);

                $("main").append(html);

                for (var x = 0; x < star; x++) {

                    $(".voteFilm").eq(i).append("<i class='fas fa-star'></i>")

                };

                for (var x = 0; x < 5-star; x++) {

                $(".voteFilm").eq(i).append("<i class='far fa-star'></i>")

                };

            };
        },

        "error" : console.log("errore")

    });

    $.ajax({

        "url" : "https://api.themoviedb.org/3/search/tv",

        "method" : "get",

        "data" : {

            "api_key" : "6ccedbd7f57e862715c5eac090a719e7",

            "query" : value,

            "language" : "it"

        },

        "success" : function(answer) {

            var tvList = answer.results;

            for (var i = 0; i < tvList.length; i++) {

                var star = Math.ceil(tvList[i].vote_average / 2)

                var context = {

                    "title" : tvList[i].name,

                    "titleOriginal" : tvList[i].original_name,

                    "vote" : "voteTv",

                    "language" : function() {

                        var languages = ["it" , "fr", "en", "de"]

                        if (languages.includes(tvList[i].original_language)) {

                            return "<img src='flags/" + tvList[i].original_language + ".png'>"

                            console.log("Ok");

                        } else {

                            return "<span>" + tvList[i].original_language + "</span>"

                            console.log("No");

                        }

                    },

                    "poster" :

                    function() {

                    if (tvList[i].poster_path == null) {

                        return "img/boolean.png"

                    } else {

                      return posterBase + tvList[i].poster_path

                    }
                    }
                }

                var html = template(context);

                $("main").append(html);

                for (var x = 0; x < star; x++) {

                    $(".voteTv").eq(i).append("<i class='fas fa-star'></i>")

                };

                for (var x = 0; x < 5-star; x++) {

                    $(".voteTv").eq(i).append("<i class='far fa-star'></i>")

                };

            };
        },

        "error" : console.log("errore")
    })

};
