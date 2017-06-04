//variables

var topics = ["panda", "hamster", "hedgehog", "cat", "elephant", "dog", "giraffe", "bear", "monkey", "otter", "goat", "penquin"];
var selected ;


function getValues(){
	console.log(this);
	selected = ($(this).attr("data-name"));
	console.log(selected);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selected + "&limit=10&api_key=dc6zaTOxFJmzC"

	reset();

		$.ajax({
			url: queryURL,
			method: "GET",
		}).done(function(response) {
			console.log( response);
		///loop to deisplay all results

		for (var i = 0; i<response.data.length; i++){
			var gifs = $("<img>");
			gifs.attr("src",response.data[i].images.original_still.url);
			$("#gifs").append(gifs)
		};

		});

	 }


//create buttons loop

function createButtons(){
	for (var j=0; j<topics.length; j++){
		var button = $("<button>")
		button.html(topics[j])
		button.attr("data-name", topics[j])
		button.addClass("btn")
		$("#buttons").append(button);
		console.log(button.attr("data-name"))

 };

}	

createButtons();


function onClick(){

	$(document).on("click", ".btn", getValues); 



}



// query call



onClick();




function reset(){
	$("#gifs").html("")
}







