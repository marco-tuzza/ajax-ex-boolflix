var source   = $("#entry-template").html();

var template = Handlebars.compile(source);

$("button").click(find);


function find() {

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

            $("main > div").remove();

            var filmList = answer.results;

            for (var i = 0; i < filmList.length; i++) {

                var star = Math.ceil(filmList[i].vote_average / 2)

                console.log(star);

                var context = {
                    "title" : filmList[i].title,
                    "titleOriginal" : filmList[i].original_title,
                    "language" : filmList[i].original_language,
                };

                var html = template(context);

                $("main").append(html);

                for (var x = 0; x < star; x++) {

                    $(".vote").eq(i).append("<i class='fas fa-star'></i>")

                };
            };
        },

        "error" : console.log("errore")
    })

};
