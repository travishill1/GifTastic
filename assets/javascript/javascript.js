
class QueryButton {
    constructor(name){
        this.name = name;
        this.button = $("<btn>").attr("id", this.name).addClass("btn");
        this.button.html(this.name);
    }

    addButton(){
        $("#button-area").append(this.button);
        this.button.on("click", this.makeQuery);

    }

    makeQuery(){

        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=n8G1JkRUFzm22W5jzz6Ghr1ji2DMwVTh&q=${this.id}&limit=10offset=0&rating=PG-13&lang=en`;
  
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            $("#gif-area").empty();
            const results = response.data;
            

            results.forEach(function(result){
                let animateURL = result.images.fixed_height.url;
                let stillURL = result.images.fixed_height_still.url;
                let rating = result.rating;
                // let img_element = $("<img>").attr("src", img_url);
                // $("#gif-area").append(img_element);
                new GifMake(stillURL, animateURL, rating)
            })
            
          
          // Saving the image_original_url property
            // var imageUrl = response.data.image_original_url;
  
            // // Creating and storing an image tag
            // var catImage = $("<img>");
  
            // // Setting the catImage src attribute to imageUrl
            // catImage.attr("src", imageUrl);
            // catImage.attr("alt", "cat image");
  
            // // Prepending the catImage to the images div
            // $("#gif-area").prepend(catImage);
          });
      };
}

class GifMake {
    constructor(stillURL, animateURL, rating){
        
        this.stillURL = stillURL;
        this.animateURL = animateURL;
        // this.rating = rating;
        this.figure = $("<figure>")
        this.img_element = $("<img>").attr("src", this.stillURL);
        this.rating = $("<figcaption>").html("Rating: " + rating);
        this.figure.append(this.img_element, this.rating);
        
        this.img_element.addClass("gif");
        this.img_element.attr("data-state", "still");
        this.img_element.attr("data-still", this.stillURL);
        this.img_element.attr("data-animate", this.animateURL);
        $("#gif-area").append(this.figure);
        // $("#gif-area").append("Rating: " + rating);
        this.img_element.on("click", this.toggleAnim);
    }

toggleAnim(){
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
}




// SEARCH BAR ON SUBMIT click
$("#add-user").on("click", function(event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();
var searchName = $("#name-input").val().trim();
let newButton = new QueryButton(searchName);
        newButton.addButton();
});

app = {

topics : [
    "zebra",
    "gorilla",
    "elephant",
    "tiger",
    "giraffe",
    "owl",
    "dog"
],

// take the topics in array and create buttons in your HTML using a loop that appends a button for each string in the array.

// makeButton : function(){

// },

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

initiateButtons : function(){
    for(var i = 0; i < app.topics.length; i++){
        var topic = app.topics[i];
        // var topicButton = $("<btn>");
        // topicButton.html(topic);
        // $("#button-area").append(topicButton);
        // topicButton.on("click", function(){
        // console.log(topics[i]);
        let newButton = new QueryButton(topic);
        newButton.addButton();
        }
        
    }

}

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.


app.initiateButtons()
