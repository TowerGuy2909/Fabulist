$(document).ready(function() {

  //  See 15-Post-Game-Joins for examples of html handling code
  // Getting jQuery references to the post game name, number of players, and form
  var gameName = $("#game-name");
  var totalPlayers = $("#numberOfPlayers");
  
  // Adding an event listener for when the form is submitted
  $(document).on("submit", "game-form", startingFormSubmit);

  // Getting the intiial list of Games
  getGames();

  // A function to handle what happens when the form is submitted to create a new Game
  function startingFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!gameName.val().trim() || !totalPlayers.val().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertGame ({
      name: gameName
        .val()
        .trim(),
      players: playersPlayers
        .val()
        .trim(),
      };
    }

  // A function for creating a Game. Calls getGames upon completion
  function upsertGame(GameData) {
    $.post("/api/Games", GameData)
      .then(getGames);
  }

  // Function for retrieving Games and getting them ready to be rendered to the page
  function getGames() {
    $.get("/api/Games", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createGameRow(data[i]));
      }
      renderGameList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of Games to the page
  function renderGameList(rows) {
    GameList.children().not(":last").remove();
    GameContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      GameList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no Games
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a Game before you can add a Player.");
    GameContainer.append(alertDiv);
  }

});

 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("playBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal 
 btn.onclick = function () {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }
  
