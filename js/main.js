$(document).ready(function() {

     // This prepares the data for the initial load of the heroArray objects onto the html.
     for (var i = 0; i < heroArray.length; i++) {
          myHTML += "<div class='outer-img-container text-center' id=" + i + "><p>" + heroArray[i].name + "</p><div class='inner-img-container'><img class='hero-images' src=" + heroArray[i].img + "></div><p class='health'</p>" + "health: " + heroArray[i].healthPoints + "</div>";
     }

     // This loads the data above onto the html.
     heroArray[0].healthPoints = 800;
     $(".first-container").html(myHTML);

     // When the player's selection is clicked.
     $("body").on("click", ".outer-img-container", function(event){
          // If the click counter is zero, that means the player has not selcted a hero yet.
          if (clickCounter === 0) {
          $(".instructions").css("display", "none");
          $(".show-and-hide").css("visibility", "visible");
          playerId = $(this).attr("id");
          // Give the player's selection a class of "good"
          $(this).addClass("good");
          // Give all the other heroes a class of "evil," because they are villains now
          $(this).siblings('div').addClass("evil");
          // Store the evil ex-heroes into the opponents variable
          var opponents = $(this).siblings('div').detach();
          // Store the player's hero in the player variable
          var player = $(this).detach();
          // Append the player's hero to the div with a class of "your-character"
          $(".your-character").append(player);
          //append the opponents into the div with a class of "enemies"
          $(".enemies").append(opponents);
          // add one to the click counter, this prevents the player from being able to select a hero more than once per game.
          clickCounter++;
          }
     });

     $("body").on("click", "div.evil", function(){
          // If a defender has not yet been selected.
          if (defenderOccupancyCounter === 0) {
               // hold the if of the defender is the defenderID variable, for later use
               defenderId = $(this).attr("id");
               $(this).addClass("currentDefender");
               // Detach the selected opponent and store it in the currentEvil variable
               var currentEvil = $(this).detach();
               // append the selected opponent to the div with a class of "defender"
               $(".defender").append(currentEvil);
               // Add one to the DefenderOccupanceCounter variable, which keeps track of whether a defender occupies the defender spot or not.
               defenderOccupancyCounter++;
          }
     });

     $("body").on("click", ".attack-button", function(){
               // The condition below checks if the defender spot is occupied, if it is not, there is no one to attack, so attack-button will not trigger an action.
               if (defenderOccupancyCounter === 1) {
               // When the attack button is clicked, the hero's health is damaged by the amount of the defender's counterattack and the defender's health is damaged by the amount of the hero's attack, which increases by 6 after every attack.
               heroArray[playerId].healthPoints = heroArray[playerId].healthPoints - heroArray[defenderId].counterAttackPower;
               heroArray[defenderId].healthPoints = heroArray[defenderId].healthPoints - heroArray[playerId].attackPower;
               // The selector selects the div with a class of good that has a child paragraph with a class of health, and the html for that paragraph is then updated
               if ( heroArray[playerId].healthPoints > -1) {
                    $("div.good > p.health").html("health: " + heroArray[playerId].healthPoints);
               } else {
                    heroArray[playerId].healthPoints = 0;
                    $("div.good > p.health").html("health: " + heroArray[playerId].healthPoints);
               }
               // The selector selects the div with a class of currentDefender that has a child paragraph with a class of health, and the html for that paragraph is then updated
               if( heroArray[defenderId].healthPoints > -1) {
                    $("div.currentDefender > p.health").html("health: " + heroArray[defenderId].healthPoints);
               } else {
                    heroArray[defenderId].healthPoints = 0;
                    $("div.currentDefender > p.health").html("health: " + heroArray[defenderId].healthPoints);
               }
               $(".hero-status").html("Hero Status: You attacked " + heroArray[defenderId].name + " for " + heroArray[playerId].attackPower + " damage!");
               $(".defender-status").html("Villain Status: " + heroArray[defenderId].name + " attacked you for " + heroArray[defenderId].counterAttackPower + " damage!");
               // We need to check if the player lost, if so, the game is reset
               checkIfPlayerLost();
               // If the defender lost, the defender is removed from the game
               removeDefeatedDefender();
               // The hero's attackpower increases by 6 after every attack
               heroArray[playerId].attackPower = heroArray[playerId].attackPower + heroArray[playerId].attackPowerInc;
          }
     });

     $("body").on("click", ".restart-button", function() {
          defenderOccupancyCounter = 0;
          // I made the "select your character" instructions go away after the character is selected (they come back on reset)
          $(".instructions").css("display", "initial");
          $(".your-character").empty();
          $(".your-character").append("<h3 class='show-and-hide'>Your Hero</h3>");
          $(".enemies").empty();
          $(".enemies").append("<h3 class='show-and-hide'>Villains Available To Attack</h3>");
          $(".defender").empty();
          $(".defender-status").html("Villain Status: ");
          $(".hero-status").html("Hero Status: ");
          myHTML = [];
          for (var j = 0; j < heroArray.length; j++) {
               heroArray[j].healthPoints = healthPointsArray[j];
               heroArray[j].attackPower = originalAttackPowerArray[j];
          }
          for (var i = 0; i < heroArray.length; i++) {
               myHTML += "<div class='outer-img-container text-center' id=" + i + "><p>" + heroArray[i].name + "</p><div class='inner-img-container'><img class='hero-images' src=" + heroArray[i].img + "></div><p class='health'</p>" + "health: " + heroArray[i].healthPoints + "</div>";
          }
          clickCounter = 0;
          $(".first-container").html(myHTML);
     });

});  //Close jQuery wrapper

function checkIfPlayerLost() {
     if(heroArray[playerId].healthPoints < 1) {
          defenderOccupancyCounter = 0;
          victoryCounter = 0;
          alert("You've been vanquished!");
          $(".defender-status").html("Villain Status: ");
          $(".hero-status").html("Hero Status: ");
          $(".instructions").css("display", "initial");
          $(".your-character").empty();
          $(".your-character").append("<h3 class='show-and-hide'>Your Hero</h3>");
          $(".enemies").empty();
          $(".enemies").append("<h3 class='show-and-hide'>Villains Available To Attack</h3>");
          $(".defender").empty();
          myHTML = [];
          for (var j = 0; j < heroArray.length; j++) {
               heroArray[j].healthPoints = healthPointsArray[j];
               heroArray[j].attackPower = originalAttackPowerArray[j];
          }
          for (var i = 0; i < heroArray.length; i++) {
               myHTML += "<div class='outer-img-container text-center' id=" + i + "><p>" + heroArray[i].name + "</p><div class='inner-img-container'><img class='hero-images' src=" + heroArray[i].img + "></div><p class='health'</p>" + "health: " + heroArray[i].healthPoints + "</div>";
          }
          clickCounter = 0;
          $(".first-container").html(myHTML);
     }
}

function removeDefeatedDefender() {
     if(heroArray[defenderId].healthPoints < 1) {
          alert("The villain has been vanquished!");
          $(".defender-status").html("Villain Status: ");
          $(".hero-status").html("Hero Status: ");
          $(".currentDefender").remove();
          defenderOccupancyCounter = 0;
          victoryCounter++;
          if (victoryCounter === 3) {
               alert("You are the Ultimate X-Man!");
          }
     }
}

var myHTML = [];
var clickCounter = 0;
var healthPointsArray = [150, 156, 159, 190];
var playerId;
var defenderId;
var originalAttackPowerArray = [7, 9, 8, 3];
var defenderOccupancyCounter = 0;
var victoryCounter = 0;

// Hero Objects
var heroArray = [
     {
     name: "Bishop",
     img: "img/bishop200x150.jpg",
     healthPoints: 150,
     attackPower: 7,
     attackPowerInc: 7,
     counterAttackPower: 10
},
     {
     name: "Archangel",
     img: "img/archangel200x150.jpg",
     healthPoints: 156,
     attackPower: 9,
     attackPowerInc: 9,
     counterAttackPower: 9
},
{
     name: "Gambit",
     img: "img/gambit200x150.jpg",
     healthPoints: 159,
     attackPower: 8,
     attackPowerInc: 8,
     counterAttackPower: 12
},
{
     name: "Colossus",
     img: "img/colossus200x150.jpg",
     healthPoints: 190,
     attackPower: 3,
     attackPowerInc: 3,
     counterAttackPower: 16
}
];
