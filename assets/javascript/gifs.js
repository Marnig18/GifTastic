//variables
var topics = ["panda", "hamster", "hedgehog", "cat", "elephant", "dog", "giraffe", "bear", "monkey", "otter", "goat", "penquin", "gorilla", "chimpanzee"];
var selected;
var images = []


///function to create a button for each topic in topics array 
function createButtons() {
	for (var j = 0; j < topics.length; j++) {
		var button = $("<button>")
		button.html(topics[j])
		button.attr("data-name", topics[j])
		button.addClass("btn")
		$("#buttons").append(button);
		console.log(button.attr("data-name"))
	};
}

//calling the function 
createButtons();


function onClick() {
	$(document).on("click", ".btn", getValues);
}

onClick();


//function to get button value...
function getValues() {
	selected = ($(this).attr("data-name"));
	var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q=" + selected

	reset();

	///and run it through the api
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		console.log(response);

		///loop through api results to display all in individual divs
		for (var i = 0; i < response.data.length; i++) {
			var gifs = $("<img>");

			///adding attributes of links and state to each gif	with responses from data
			gifs.attr({
				"src": response.data[i].images.fixed_width_still.url,
				"data-still": response.data[i].images.fixed_width_still.url,
				"data-animate": response.data[i].images.fixed_width.url,
				"data-state": "still",
			});

			///adding class to the gifs
			gifs.addClass("gifs")
				///appending gifs to the html
			$("#gifs").append(gifs);
			///pushing gifs to an images array to ...
			images.push(gifs);
			///loop through them to display their ratings
			for (var k = 0; k < images.length; k++); {
				var rating = $("<p>")
				rating.html(response.data[i].rating);
				$("#gifs").append(rating);
			}
		}
		///calling animation function to animate the the gifs on click
		animation();
	});
};


/// On click function for submit button for user input
$("#button").on("click", function(event) {
	event.preventDefault();
	///getting value of user input and use it for the api query
	selected = $("#userInput").val().trim();
	var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q=" + selected

	reset();
////Api call
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		console.log(response);

		///looping through the response to display images to the screen
		for (var i = 0; i < response.data.length; i++) {
			var gifs = $("<img>");
			///add ing link and state attributes to each gif 
			gifs.attr({
				"src": response.data[i].images.fixed_width_still.url,
				"data-still": response.data[i].images.fixed_width_still.url,
				"data-animate": response.data[i].images.fixed_width.url,
				"data-state": "still",
			});
			///adding class to the gifs
			gifs.addClass("gifs")
			///appending gifs to html
			$("#gifs").append(gifs);
			///pushing gifs to image array...
			images.push(gifs);
		///to loop through and display the rating for each
			for (var k = 0; k < images.length; k++); {
				var rating = $("<p>")
				rating.html(response.data[i].rating);
				$("#gifs").append(rating);
			}
		}
		//calling animation function to animate each gif on click
		animation();
	});
});


///Function the animate gifs on click
function animation() {

	$(".gifs").on("click", function() {
		///grabbing state value for gif clicked
		var state = $(this).attr("data-state")
		///if state is still...
		if (state === "still") {
			 ///switch gif src to its animated link ...
			 $(this).attr("src", $(this).attr("data-animate"));
			 ///and set state varaible to animate
			$(this).attr("data-state", "animate")
		///if state variable is set to animate
		} else {
			/// set gif src to it still link
			$(this).attr("src", $(this).attr("data-still"));
			///set data-state to still
			$(this).attr("data-state", "still");
		}
	});
};


//// reset function to clear gifs on the page after each click and to clear user input field
function reset() {
	$("#gifs").html("")

	$("#userInput").val(" ");

}



// user input