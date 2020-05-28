
var source   = $("#entry-template").html();

var template = Handlebars.compile(source);

var posterBase = "https://image.tmdb.org/t/p/w185"

$(document).on('keypress',function(e) {
    if(e.which == 13 && $("input").is(":focus")) {
        find();
    }
});

$("#search-button").click(inputShow)

$("main, .header-left").click(inputHide)

$(".logo").click(cleanMain)

function find() {

    var value = $("input").val();

    cleanMain()

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

                context(filmList[i], "film")

                vote (filmList[i].vote_average, i, "film")

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

            console.log(tvList);

            for (var i = 0; i < tvList.length; i++) {

                context(tvList[i], "tv")

                vote (tvList[i].vote_average, i, "tv")

            };
        },

        "error" : console.log("errore")
    })

};

function inputShow() {

    $(".fa-search").hide()

    $("input").show()

    $(".search").show()

}

function inputHide() {

    $(".fa-search").show()

    $("input").hide()

    $(".search").hide()

}

function cleanMain() {

    $(".element").remove()

}

function vote(filmVote, a, type) {

    var star = Math.ceil(filmVote / 2)

    for (var x = 0; x < star; x++) {

        if (type == "film") {

            $(".vote-film").eq(a).append("<i class='fas fa-star'></i>")

        } else {

            $(".vote-tv").eq(a).append("<i class='fas fa-star'></i>")

        }

    };

    for (var x = 0; x < 5-star; x++) {

        if (type == "film") {

            $(".vote-film").eq(a).append("<i class='far fa-star'></i>")

        } else {

            $(".vote-tv").eq(a).append("<i class='far fa-star'></i>")

        }

    };

}

function context(data, type) {

    var context = {

        "title" : function() {

            if (type == "film") {

                return data.title

            } else {

                return data.name

            }

        },

        "titleOriginal" : function () {

            if (type == "film") {

                return data.original_title

            } else {

                return data.original_name

            }
        },

        "type" : function () {

            if (type == "film") {

                return "film"

            } else {

                return "tv"

            }
        },

        "language" : function() {

            var languages = ["it" , "fr", "en", "de"]

            if (languages.includes(data.original_language)) {

                return "<img src='flags/" + data.original_language + ".png'>"

                console.log("Ok");

            } else {

                return "<span>" + data.original_language + "</span>"

                console.log("No");

            }

        },

        "poster" :

        function() {

        if (data.poster_path == null) {

            return "img/boolean.png"

        } else {

            return posterBase + data.poster_path
        }

        }
    };

    var html = template(context);

    $("main").append(html);

}
