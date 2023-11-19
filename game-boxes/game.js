$(function () {
    // ------------------------------------------
    // -- Render
    // ------------------------------------------
    function render() {
      // debug data
      var str = JSON.stringify(gameData, null, 2);
      $("#data").html(str);
  
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
        $("#debug").prepend(new Date()+text+"\n");
    }
  
    function loop(timestamp) {
      var progress = timestamp - lastRender;
  
      update(progress);
      saveIfNeeded(progress);
      render();
  
      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    }
  
    // ------------------------------------------
    // -- Interactive
    // ------------------------------------------
    function makebox() {
      if (gameData.boxes == null) gameData.boxes = [];
      gameData.boxes.push({ level: 1, energy: 0, max: 500 });
      render();
    }
  
    // ------------------------------------------
    // -- initialize
    // ------------------------------------------
  
    var gameData = {};
    loadGame();
    var lastRender = 0;
    var saveCounter = 5000;
  
    $('<div id="controls"></div>').appendTo("body");
    $('<div id="app"></div>').appendTo("body");
    $('<textarea id="data" cols="50" rows="10"></textarea>').appendTo("body");
    $('<textarea id="debug" cols="50" rows="10"></textarea>').appendTo("body");
    $("<button>make a box</button>").click(makebox).appendTo($("#controls"));

    window.requestAnimationFrame(loop);

  });
  