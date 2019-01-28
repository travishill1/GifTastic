
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
                let img_url = result.images.fixed_width.url;
                let img_element = $("<img>").attr("src", img_url);
                $("#gif-area").append(img_element);
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
