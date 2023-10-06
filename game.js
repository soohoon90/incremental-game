$(function () {
    // ------------------------------------------
    // -- Render
    // ------------------------------------------
    function render() {
      var str = JSON.stringify(gameData, null, 2);
      $("#app").html("");
      $("#data").html(str);
  
      if (gameData.boxes) {
        for (var i = 0; i < gameData.boxes.length; i++) {
          var box = gameData.boxes[i];
          $("#app").append(
            "<div>" + "box " + i + ": " + box.energy + "/" + box.max + "</div>"
          );
        }
      }
    }
  
    // ------------------------------------------
    // -- Update
    // ------------------------------------------
    function update(progress) {
      gameData.counter += progress/1000;
      gameData.energy += progress/5000;

      if (gameData.energy > gameData.maxEnergy) gameData.energy = gameData.maxEnergy;

      if (gameData.boxes) {
        for (var i = 0; i < gameData.boxes.length; i++) {
            if (gameData.boxes[i].energy < gameData.boxes[i].max) {
              gameData.boxes[i].energy += progress/1000;
            } else {
              gameData.boxes[i].energy = gameData.boxes[i].max;
            }
        }
      }
    }
  
    function loadGame() {
      var savegame = JSON.parse(localStorage.getItem("coolsave"));
      if (savegame !== null) {
        gameData = savegame;
        //Function to update all of screen
      } else {
        gameData = { counter: 0, energy: 0, maxEnergy:100};
      }
    }
  
    function saveIfNeeded(progress) {
      saveCounter -= progress;
      if (saveCounter < 0) {
        saveCounter = 5000;
        localStorage.setItem("coolsave", JSON.stringify(gameData));
        debugOutput("saved.");
      }
    }

    function debugOutput(text){
        $("#debug").prepend(text+"\n");
    }
  
    function loop(timestamp) {
      var progress = timestamp - lastRender;
  
      update(progress);
      saveIfNeeded(progress);
      render();
  
      $("#app").append("<p>" + progress + "</p>");
  
      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    }
  
    // ------------------------------------------
    // -- initialize
    // ------------------------------------------
  
    var gameData = {};
    loadGame();
    var lastRender = 0;
    var saveCounter = 5000;
  
    window.requestAnimationFrame(loop);
  
    // ------------------------------------------
    // -- Interactive
    // ------------------------------------------
    function makebox() {
      if (gameData.boxes == null) gameData.boxes = [];
      gameData.boxes.push({ level: 1, energy: 0, max: 500 });
      render();
    }
  
    $("<button>make a box</button>").click(makebox).appendTo($("#controls"));
  });
  