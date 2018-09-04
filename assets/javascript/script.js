//javascript was started using working-movie-app-solved.html and then modified 
var topics = ["Awkward", "Bored", "Confused", "Drunk", "Excited", "Frustrated", "Hungry", "Mind Blown", "Tired"];
var apiKey = "&apikey=y44Dnu8qwxr5TX82P3bCPbm2IAMZDKdc"
var offset = 0;
var emotionName = "";
var append = false;

// Generic function for capturing the emotion name from the data-attribute
function displayEmotions() {
    //get the name of the emotion that was clicked
    emotionName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotionName.replace(' ', '+') + apiKey + "&offset=" + offset;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
        //Append gifs and ratings 
        //Need to figure out a way to store the moving gif 
        //in addition to the still gif to be able to swap out later

        var results = response.data

        $("#emotions").empty();
        //for (var i = 0; i < response.data.length; i++){
        for (var i = 0; i < 10; i++){  //HW instructions said 10 
            //create image and set the source to be the still
            var figure = $("<figure>")
            //BONUS: List additional metadata
            var caption = $("<figcaption>").html("<strong>Title: </strong>" + results[i].title + "<br><strong>Rating: </strong>" + response.data[i].rating)

            //create image tag
            var image = $("<img>").attr("src", results[i].images.fixed_height_still.url);

            //add class to use in the on click event later
            image.addClass("gif")

            //add attribut to store the still and moving gif for later
            image.attr("gifURL", results[i].images.fixed_height.url)
            image.attr("stillURL", results[i].images.fixed_height_still.url)

            // Appending the image to the figure 
            figure.append(caption);
            figure.append(image);

            $("#emotions").append(figure)
        }
        
    });
  }

  function runGif() {
        //get the current source
        var newURL = "";
        var source = $(this).attr("src");
        var gifURL = $(this).attr("gifURL"); 
        var stillURL = $(this).attr("stillURL");

        if (source === stillURL){  
            //if currently the still then swap with the gif 
            $(this).attr("src", gifURL)
        } else {
            //if currently the gif, swap out with the still
            $(this).attr("src", stillURL)
        }
        
  }

  // Function for displaying gif buttons
  function renderButtons() {

    $("#emotion-buttons").empty();

    // Looping through the array of topics
   for (var i = 0; i < topics.length; i++) {   

      // Then dynamicaly generating buttons for each topic in the array
      var button = $("<button>");
      // Adding a class of topic to our button that will be used later in the click event
      button.addClass("emotion");
      // Adding a data-attribute which will be used later in displayEmotions()
      button.attr("data-name", topics[i]);
      // Providing the initial button text
      button.text(topics[i]);
      // Adding the button to the HTML
      $("#emotion-buttons").append(button);
    }
  }

  // This function handles events where the add button is clicked
  $("#add-emotion").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    // This line grabs the input from the textbox
    var emotion = $("#emotion-input").val().trim();

    if (emotion != ""){
        // Adding the topic from the textbox to the array
        topics.push(emotion);

        // Calling renderButtons which handles the processing of the topic array
        renderButtons();
    }
  });

  // Function for displaying the gifs
  // Click event listener to all elements with the class "emotion"
  // Adding the event listener to the parent div because it will work for dynamically generated elements
  $("#emotion-buttons").on("click", ".emotion", displayEmotions);

  // Function for running the gifs
  // Click event listener to all elements with the class "gif"
  // Adding the event listener to the parent div because it will work for dynamically generated elements
  $("#emotions").on("click", ".gif", runGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();