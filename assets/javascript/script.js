//javascript was started using working-movie-app-solved.html and then modified 
var topics = ["Awkward", "Bored", "Confused", "Drunk", "Excited", "Frustrated", "Hungry", "Mind Blown", "Tired"];

// Generic function for capturing the emotion name from the data-attribute
function displayEmotions() {
    var emotionName = $(this).attr("data-name");

    var apiKey = "&apikey=y44Dnu8qwxr5TX82P3bCPbm2IAMZDKdc"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotionName.replace(' ', '+') + apiKey
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
        //Append gifs and ratings 
        //Need to figure out a way to store the moving gif 
        //in addition to the still gif to be able to swap out later
        $("#emotions").empty();
        for (var i = 0; i < response.data.length; i++){
            console.log("original_stil: " + response.data[i].images.original_still.url)
            var image = $("<img>").attr("src", response.data[i].images.original_still.url);

            //add class to use in the on click event later
            image.addClass("still")

            //add attribut to store the moving gif
            image.attr("gifURL", response.data[i].images.original.url)
            // Appending the image
            $("#emotions").append(image);
        }
        
    });
  }

  function runGif() {
       console.log("runGif")
       var gifURL = $(this).attr("gifURL");

       $(this).attr("src", gifURL)
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

    // Adding the topic from the textbox to our array
    topics.push(emotion);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();

  });

  // Function for displaying the gifs
  // We're adding a click event listener to all elements with the class "emotion"
  // We're adding the event listener to the parent div because it will work for dynamically generated elements
  $("#emotion-buttons").on("click", ".emotion", displayEmotions);

  $("#emotions").on("click", ".still", runGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();