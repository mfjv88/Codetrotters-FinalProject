/*This is a Text based RPG Game*/

// A $( document ).ready() block.
$( document ).ready(function() {
    $('#attack').hide();
    $('#flee').hide();
    $('#battle').hide();
    $(".attacking").on('click', "#attack", battle);
});

/*The area and each number is being defined as a component within the area of the game*/
var area = [
  [0, 0, 0, 3, 0, 0],
  [0, 2, 1, 1, 1, 0],
  [0, 1, 0, 0, 2, 0],
  [0, 1, 0, 0, 1, 1],
  [4, 1, 1, 1, 1, 1],
];

currentMonster = null;
turn = null;
goblin = {
  rep: 2,
  hp: 5,
  attack: 2,
  defense: 0,
  currentPosition: [{x: 1, y: 1, id: 1}, {x: 4, y: 2, id:2}]
};

orc = {
  rep: 3,
  hp: 10,
  attack: 4,
  defense: 2
};

hero = {
  rep: 4,
  hp: 20,
  attack: 4,
  defense: 1,
  currentPosition: {x: 0, y: 4}
};

var wall = {
  rep: 0
};

var walk = {
  rep: 1
};


/*All the functions within the game are being defined in this section*/

// var heroDamage = this.hp -= (hero.attack - this.defense);

// var monsterDamage = hero.hp -= (this.attack - hero.defense);

/*Work in progress*/
var battle = function() {
  console.log(currentRep, currentMonster);
  if (currentRep === 2) {
    currentMonster = goblin;
  } else {
    currentMonster = orc;
  }
  while((currentRep === 2 || currentRep === 3) && (currentMonster.hp > 0 || hero.hp > 0)) {
    hero.hp -= (currentMonster.attack - hero.defense);
    $("#prompt").append("You hit the monster and did " + hero.attack + " damage!" + "<br>");
    currentMonster.hp -= (hero.attack - currentMonster.defense);
    $("#prompt").append("The monster did " + currentMonster.attack + " damage!" + "<br>");
    if(currentMonster.hp < 1) {
      $("#prompt").append("You killed the monster" + "<br>");
      area[currentMonster.currentPosition.y][currentMonster.currentPosition.x] = 1;
      $('#tile'+currentMonster.currentPosition.y+currentMonster.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
      flee();
      break;
    } else if(hero.hp < 1) {
      $("#prompt").append("You died" + "<br>");
      area[hero.currentPosition.y][hero.currentPosition.x] = 1;
      $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
      break;
    }
    break;
  }
};



/*
  while (battle === true) {
    switch (battle_options) {
      case "attack":
        heroDamage;
        $("#prompt").append("You hit the monster and did " + heroDamage + " damage!" + "<br>");
        if (this.hp === 0) {
          $("#prompt").append("You defeated the monster!" + "<br>")
        } else {
          monsterDamage;
          if (hero.hp >= 0) {
            battle();
          } else {
            $("#prompt").append("The monster defeated you!" + "<br>");
            battle === false;
          }
        };
        break;
      case "run":
        flee();
        break;
      default:
        $("#prompt").append("This is not a command! Try again!" + "<br>");
    };
  };
};*/

var checkArea = function(x, y) {

  currentRep = area[y][x];
  if (currentRep === 1) {
    return true;
  } else if (currentRep === 0) {
    $("#prompt").append("There is a wall here!" + "<br>")
    return false;
  } else if (currentRep === 2 || currentRep === 3) {
    $("#prompt").append("There is a monster here." + "<br>");
    $('#flee').show();
    $('#battle').show();
    $('#up').hide();
    $('#left').hide();
    $('#down').hide();
    $('#right').hide();
    currentMonster = { x: x, y: y};
    return false;
    // if (confirm("Do you want to battle?" === true)) {
      // battle();
    // } else {
       // console.log("Choose your next action");
    //   action();
    // }
  } else {
    // console.log("This command doesn't exist. Try again!")
    $("#prompt").append("Can't go there fool!" + "<br>");
    return false;
  };
};

flee = function() {
  $('#attack').hide();
  $('#flee').hide();
  $('#battle').hide();

  $('#up').show();
  $('#left').show();
  $('#down').show();
  $('#right').show();
}

var fight = function() {
  $('#attack').show();
  $('#flee').hide();
  $('#battle').hide();
}

move = function(move) {
  var temp = null;
  switch (move) {
    case "up":
      if (hero.currentPosition.y-1 > 4 || hero.currentPosition.y-1 < 0) {
        $("#prompt").append("Can't go there fool!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x,   hero.currentPosition.y-1);
      console.log(hero);
      if (canMove) {
        area[hero.currentPosition.y][hero.currentPosition.x] = 1;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
        hero.currentPosition.y -= 1;
        area[hero.currentPosition.y][hero.currentPosition.x] = 4;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
        console.log(area[hero.currentPosition.y][hero.currentPosition.x], area[hero.currentPosition.y][hero.currentPosition.x]);
      } else {
        // $("#prompt").append("Can't do that fool" + "<br>");
        //$('#propt').append('')
      }
      break;
    case "down":
      if (hero.currentPosition.y+1 > 4 || hero.currentPosition.y+1 < 0) {
        $("#prompt").append("Can't go there fool!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x,   hero.currentPosition.y+1);
      console.log(hero);
      if (canMove) {
        area[hero.currentPosition.y][hero.currentPosition.x] = 1;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
        hero.currentPosition.y += 1;
        area[hero.currentPosition.y][hero.currentPosition.x] = 4;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
        console.log(area[hero.currentPosition.y][hero.currentPosition.x], area[hero.currentPosition.y][hero.currentPosition.x]);
      } else {
        //$("#prompt").append("Can't do that fool!"  + "<br>");
        //$('#propt').append('')
      }
      break;
    case "left":
      if (hero.currentPosition.x-1 > 5 || hero.currentPosition.x-1 < 0) {
        $("#prompt").append("Can't go there fool!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x-1,   hero.currentPosition.y);
      console.log(hero);
      if (canMove) {
        area[hero.currentPosition.y][hero.currentPosition.x] = 1;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
        hero.currentPosition.x -= 1;
        area[hero.currentPosition.y][hero.currentPosition.x] = 4;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
        console.log(area[hero.currentPosition.y][hero.currentPosition.x], area[hero.currentPosition.y][hero.currentPosition.x]);
      } else {
        // $("#prompt").append('cant do that fool' + "<br>");
        //$('#propt').append('')
      }
      break;
    case "right":
      if (hero.currentPosition.x+1 > 5 || hero.currentPosition.x+1 < 0) {
        $("#prompt").append("Can't go there fool!" + "<br>");
        return false;
      }
      var canMove = checkArea(hero.currentPosition.x+1,   hero.currentPosition.y);
      console.log(hero);
      if (canMove) {
        area[hero.currentPosition.y][hero.currentPosition.x] = 1;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\floor.png' alt='tile' width='40px'/>");
        hero.currentPosition.x += 1;
        area[hero.currentPosition.y][hero.currentPosition.x] = 4;
        $('#tile'+hero.currentPosition.y+hero.currentPosition.x).html("<img src='assets\\images\\link.gif' alt='hero' width='40px'/>");
        console.log(area[hero.currentPosition.y][hero.currentPosition.x], area[hero.currentPosition.y][hero.currentPosition.x]);
      } else {
        //$("#promp").append('cant do that fool' + "<br>");
        //$('#propt').append('')
      }
      break;
    default:
      $("#prompt").append("This command doesn't exist. Please try again." + "<br>");
  };
};


/*commands:
  move: forward | left | back | right
  equip: <item>
  inventory: <items>
  run
  fight
  loot
  help

items:
  type: permanent | consumables
  name: <string>
  power: <number>
  defense: <number>

npc:
  type: goblin | orc
  hit_points: <number>
  power: <number>
  defense: <number>
  special: <number>
  name: <string>
  items: <array of items>

hero:
  hit_points: <number>
  power: <number>
  defense: <number>
  special: <number>
  name: <string>
  action: attack | use | look

location:
  area: <array of numbers>*/
