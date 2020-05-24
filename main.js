$("button").click(

    function() {

        var value = $("input").val()

        $.ajax({
            "url" : "https://api.themoviedb.org/3/search/movie",

            "method" : "get",

            "data" : {

                "api_key" : "6ccedbd7f57e862715c5eac090a719e7",

                "query" : value

            },

            "success" : function(answer) {

                var filmList = answer.results;

                for (var i = 0; i < filmList.length; i++) {

                    var title = filmList[i].title;

                    var titleOriginal = filmList[i].original_title;

                    var language = filmList[i].original_language;

                    var vote = filmList[i].vote_average;

                    $('main').append('<ul><li>' + title + '<li>' + titleOriginal + '<li>' + language + '<li>' + vote);

                }
            },

            "error" : console.log("errore")
        })

    }

)
