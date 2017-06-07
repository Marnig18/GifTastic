// /variables

var topics = ["panda", "hamster", "hedgehog", "cat", "elephant", "dog", "giraffe", "bear", "monkey", "otter", "goat", "penquin", "gorilla", "chimpanzee"];
var selected ;
var images=[]
var selected;
var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q=" ;

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

onClick();





function getValues(){
	console.log(this);
	selected = ($(this).attr("data-name"));
	console.log(selected);
	

	reset();

		$.ajax({
			url: queryURL,
			method: "GET",
		}).done(function(response) {
			console.log( response);
		///loop to display all results


		for (var i = 0; i<response.data.length; i++){
			var gifs = $("<img>");	
			
			gifs.attr({
				"src": response.data[i].images.fixed_width_still.url,
				"data-still": response.data[i].images.fixed_width_still.url,
				"data-animate": response.data[i].images.fixed_width.url,
				"data-state": "still",
			});

			gifs.addClass("gifs")
			$("#gifs").append(gifs);
			images.push(gifs);
			console.log(images);
		for(var k=0; k<images.length; k++);{
			var rating = $("<p>")
			rating.html(response.data[i].rating);
			$("#gifs").append(rating);
				}
					
			}


animation();
		});


		

	};

	 


//create buttons loop



$("#button").on("click", function(event){
				event.preventDefault();
			 	
			 	selected = $("#userInput").val().trim();
				console.log(selected)
				queryURL = queryURL + selected 

	// reset();

	
				
			$.ajax({
			url: queryURL,
			method: "GET",
		}).done(function(response) {
			console.log( response);

		for (var i = 0; i<response.data.length; i++){
			var gifs = $("<img>");	
			gifs.attr({
				"src": response.data[i].images.fixed_width_still.url,
				"data-still": response.data[i].images.fixed_width_still.url,
				"data-animate": response.data[i].images.fixed_width.url,
				"data-state": "still",
			});
			gifs.addClass("gifs")

			$("#gifs").append(gifs);
			images.push(gifs);
			console.log(images);
		for(var k=0; k<images.length; k++);{
			var rating = $("<p>")
			rating.html(response.data[i].rating);
			$("#gifs").append(rating);
				}
			}

				animation();
			
		

		});
	});



function animation(){

 $(".gifs").on("click", function() {

 	var state = $(this).attr("data-state")
		if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        }
        else{
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
});

};




function reset(){
	$("#gifs").html("")

		$("#userInput").val(" ");

}





