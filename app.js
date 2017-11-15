console.log($);
$(() => {
  //start window onload
  let thisgame = "nogame";
  let $container = $(".container");
  let $sky = $("<div>"+"Press One of The Buttons To Continue"+"</div>").addClass("sky");
  $container.append($sky);
  let $grass = $("<img>").addClass("grass").attr("src","images/grass.jpg");
  $container.append($grass);
  let $body = $("body");
  let players=[];
  let money=[];

  class Player {
    constructor() {
      this.src1 = "images/tophat/tophat_fall_gold.png";

      this.src3 = "images/tophat/tophat_fall.png";
      this.won = false;
      this.ai=false;
      this.parachute=false;
      this.jumping = false;
      this.falling = false;
      this.offgrass = false;
      this.offgrassleft = false;
      this.offgrassright = false;
      this.wpress=false;
      this.apress=false;
      this.dpress=false;
      this.choice=2;
      this.x=0;
      this.y=0;
      this.$player = $("<img>").addClass("player");
      this.$player.attr("src",this.src3);
      //begin game interval
      // game interval determines what moves a player/ai takes
      this.game =setInterval(() => {
        //determine whether or not player is parachuting
        if (this.$player.height()>=596) {
          this.won=true;
          if (this.parachute) {

          }
          else {
            this.$player.attr("src",this.src1);
            this.parachute=true;
          }

        }
        //end parachute
        //ai section, only active if this.ai=true
        if (this.ai) {
          //ai self preservation, ai still may fall due to .stop()
          //feature, not a bug
          if (this.offgrassleft) {
            this.wpress=true;
            this.apress=false;
            this.dpress=true;
          }
          if (this.offgrassright) {
            this.wpress=true;
            this.apress=true;
            this.dpress=false;
          }
          //end ai self preservation
          this.y++;
          //ai self determination
          if (this.y>50) {
            this.$player.stop();
            this.choices=["right","left","jump"];
            this.choice = Math.floor(Math.random()*3);
            // console.log(this.choices[this.choice]);
            //ai jump
            if (this.choices[this.choice]=="jump") {
              if (this.wpress) {
                this.wpress=false;
              }
              else {
                this.wpress=true;
              }
            }
            //end ai jump
            //ai move right
            if (this.choices[this.choice]=="right") {
              if (this.offgrassright) {

              }
              else {
                this.dpress=true;
                this.apress=false;
              }

            }
            //end ai move right
            //ai move left
            if (this.choices[this.choice]=="left") {
              if (this.offgrassleft) {
              }
              else {
                this.apress=true;
                this.dpress=false;
              }
            }
            //end ai move left
            this.y=0;
          }
          //end ai self determination

        }
        //end ai
        //wpress
        if (this.wpress) {
          if (this.falling||this.parachute) {
          }
          else {
            this.jumping = true;

          }
        }
        //end wpress
        //grass gravity player falls if they jump off the grass
        //fall left
        // console.log($grass.position().left);

        if ($grass.position().left-this.$player.width()>this.$player.position().left) {
          this.playerdown();
          this.offgrassleft=true;
        }
        //fall right
        if ($grass.position().left+897<this.$player.position().left) {
          this.playerdown();

          this.offgrassright=true;
        }
        else if ($grass.position().left-this.$player.width()<this.$player.position().left) {
          this.offgrass=false;//makes player only able to jump once off the grass
          this.offgrassleft=false;
          this.offgrassright=false;
        }
        //grass gravity end
        //jump gravity
        if (this.$player.position().top+this.$player.height()!=$grass.position().top) {
          if (this.jumping) {
          }
          else {
            this.playerdown();
          }
        }
        if (this.jumping) {
          this.playerup();
          this.x++
          if (this.x>50) {
            this.falling=true;
            this.jumping=false;
            this.x=0;
          }
        }
        if (this.$player.position().top+this.$player.height()==$grass.position().top) {
          if (this.offgrass) {
          }
          else {
            this.falling=false;
          }
        }

        //jump gravity end
        //if player falls out of bounds
        if (this.$player.position().top>660)
        {
          this.killplayer();
        }
        //end out of bounds
        //left and right
        if (this.apress) {
          this.playerleft();
        }
        if (this.dpress) {
          this.playerright();
        }
        //end left and right

      }, .5);
      //end of game interval
    }
    //end of constructor for player
    playerup(){
      $(this.$player).animate({
        'top' : "-=5px" //movesup
      },0);
    };
    playerdown(){
      this.$player.animate({
        'top' : "+=1px" //movesdown
      },0);
    };
    playerleft(){
      this.$player.animate({
        'left' : "-=3px" //movesleft
      },0);

    };
    playerright() {
      this.$player.animate({
        'left' : "+=3px" //movesright
      },0);
    }
    killplayer(){
      this.wasai = this.ai;
      this.$player.remove();
      clearInterval(this.game);
      thisgame.endgame(this.wasai,this.won);
    }

  };
  // end player class
  //ai class
  class AI extends Player {
    constructor() {
      super();
      this.src1 = "images/cowboyhat/cowboyhat_fall_gold.png";

      this.src3 = "images/cowboyhat/cowboyhat_fall.png";
      this.$player.attr("src",this.src3);
      this.ai=true;//make the ai a player that is an ai
    }
  }
  //end ai class
  class TheState extends Player{
    constructor(){
      super();
      this.src1 = "images/cowboyhat/cowboyhat_fall_gold_com.png";
      this.src3 = "images/cowboyhat/cowboyhat_jump_com.png";
      this.$player.attr("src",this.src3);
    }
  }

  class Money{
    constructor() {
      this.src3="images/money.png";
      this.$money = $("<img>").addClass("player");
      this.$money.attr("src",this.src3);
      //start money over container, within bounds of grass
      this.px =Math.floor(Math.random()*897)+3;
      this.py = -110;
      this.$money.css( { left: this.px, top: this.py } ) ;
      this.$money.width(80);
      this.$money.height(40);
      this.fall=setInterval(() => {
        if (this.$money.position().top+this.$money.height()==$grass.position().top) {
          //if money is on the grass do nothing
        }
        else {
          //else have the money fall down
          this.moneydown();
        }
      },0)
    }
    moneydown()
    {
      this.$money.animate({
        'top' : "+=1px" //movesdown
      },0);
    }
  };

  //add the grass to the container

//the game, Capitalism by default
  class Game {
    constructor(growrate) {
        //add players in this for loop
        this.playername="The Player";
        this.ainame="AI";
        this.growrate=growrate;
        for (let i = 0; i < players.length; i++) {
          $container.append(players[i].$player);
        }
        //end add players for loop
      this.gameover=false;
      this.rainmoney = setInterval(() => {
        if (money.length<6) {
          this.makedollar();
        }

      },1000);
      //collect, check if any player is overlapping money
      this.collect = setInterval(() => {
        // for money array
        for (let i = 0; i < money.length; i++) {
          this.mleft = money[i].$money.position().left;
          this.mright = money[i].$money.position().left+money[i].$money.width();
          this.mtop = money[i].$money.position().top;
          this.mbottom = money[i].$money.position().top+money[i].$money.height();
          //for players array
          for (let j = 0; j < players.length; j++) {
            this.pleft = players[j].$player.position().left;
            this.pright = players[j].$player.position().left+players[j].$player.width();
            this.ptop = players[j].$player.position().top;
            this.pbottom = players[j].$player.position().top+players[j].$player.height();
            this.overlap = !(this.mright < this.pleft ||
                this.mleft > this.pright ||
                this.mbottom < this.ptop ||
                this.mtop > this.pbottom);
            if (this.overlap) {
              //
              this.grow(j);
              //
              //if overlapping remove money
              clearInterval(money[i].fall);
              money[i].$money.remove();
              money.splice(i, 1);
              // i+=1;

              //end remove money

              //give player a boosts if they collect
              if (players[j].length>596) {
                players[j].won=true;
              }
              else {
                for (let u = 0; u < 10; u++) {
                  players[j].playerup();
                }
              }
              //end boost

            }
            //overlap if
          }
          //end for players array
        }
        //end for money array
      },0)
      //end collect
    }
    makedollar(){
        money.push(new Money());
        $container.prepend(money[money.length-1].$money);
        //this function adds money to the game
    }
    grow(j){
      //if player collected money have them grow and score
      players[j].$player.width( players[j].$player.width()*this.growrate);
      players[j].$player.width(Math.floor( players[j].$player.width()));
      players[j].$player.height( players[j].$player.height()*this.growrate);
      players[j].$player.height(Math.floor( players[j].$player.height()));
      //end grow player
    }
    endgame(wasai,won)
    {
      clearInterval(this.collect);
      clearInterval(this.rainmoney);

      for (let i = 0; i < players.length; i++) {
        clearInterval(players[i].game);
        players[i].$player.remove();
      }
      players.length=0;

      for (let i = 0; i < money.length; i++) {
        clearInterval(money[i].fall);
        money[i].$money.remove();
      }
      money.length=0;

      if (this.gameover) {
        $sky.text("game already over");
        console.log("game already over");
      }
      else {
        if (wasai) {
          $sky.text(this.playername+" Lost!");
          console.log("player lost!");
        }
        else if (won) {
          $sky.text(this.playername+" Wins!");
          console.log("player wins");
        }
        else {
          $sky.text(this.playername+" Lost because you fell!");
          console.log("player lost by falling");
        }
      }
      thisgame="nogame";
    }
    //end endgame
  };
  //Communism
  class Communism extends Game {
    constructor() {
      super(1.0);
      this.playername="The State";
      players[3].$player.animate({
        'left' : "+=450px" //movesright
      },0);
      for (let i = 0; i < players.length; i++) {
        $container.append(players[i].$player);
      }
    }
    grow(j){
      super.grow(j);
        players[players.length-1].$player.width( players[players.length-1].$player.width()*1.1);
        players[players.length-1].$player.width(Math.floor( players[players.length-1].$player.width()));
        players[players.length-1].$player.height( players[players.length-1].$player.height()*1.1);
        players[players.length-1].$player.height(Math.floor( players[players.length-1].$player.height()));
        for (let u = 0; u < 10; u++) {
          players[players.length-1].playerup();
        };
      }


  }
  //end Communism

  //Socialism
  class Socialism extends Game {
    constructor() {
      //add a human player and two ai to players array
        super(1.1);
        this.playername="Everyone (but you)";
        for (let i = 0; i < players.length; i++) {
          players[i].ai=false;
        }
        //add players in this for loop
        for (let i = 0; i < players.length; i++) {
          $container.append(players[i].$player);
        }
        players[2].$player.animate({
          'left' : "+=850px" //movesright
        },0);
        //end add players for loop
    }
    grow(j){
      super.grow(j);
      for (let i = 1; i < players.length; i++) {
        players[i].$player.width( players[i].$player.width()*1.1);
        players[i].$player.width(Math.floor( players[i].$player.width()));
        players[i].$player.height( players[i].$player.height()*1.1);
        players[i].$player.height(Math.floor( players[i].$player.height()));

        for (let u = 0; u < 10; u++) {
          players[i].playerup();
        };
      }

    }
  }
  //end Socialism
//button handlers for new games
$clearbutton= $(".clear");
$clearbutton.click(() => {
  if (thisgame!="nogame") {
    thisgame.endgame();
  }

  $sky.text("The Game");
})
$capbutton= $(".game1");
$capbutton.click(() => {
  if (thisgame!="nogame") {
    thisgame.endgame();
  }
    players=[new Player(),new AI(),new AI()];
    thisgame=new Game(1.1);
    $sky.text("Capitalism The Game");
})
$combutton= $(".game2");
$combutton.click(() => {
  if (thisgame!="nogame") {
    thisgame.endgame();
  }
    players=[new Player(),new AI(),new AI(),new TheState()];
    thisgame=new Communism();
    $sky.text("Communism The Game");


})
$socbutton= $(".game3");
$socbutton.click(() => {
  if (thisgame!="nogame") {
    thisgame.endgame();
  }
    players=[new Player(),new AI(),new AI()];
    thisgame=new Socialism();
    $sky.text("Socialism The Game");

})

//event handlers for human player movement

  $body.keypress(() => {
    if (thisgame!="nogame") {
      players[0].$player.stop();

      if (event.key=="w") {
        players[0].wpress=true;
      }
      if (event.key=="a") {
        players[0].apress=true;
      }
      if (event.key=="d") {
        players[0].dpress=true;
      }
    }

  });

  $body.keyup(() => {
    if (thisgame!="nogame") {

    }
    players[0].$player.stop();

    if (event.key=="w") {
      players[0].wpress=false;
    }
    if (event.key=="a") {
      players[0].apress=false;
    }
    if (event.key=="d") {
      players[0].dpress=false;
    }
  });

  //end window onload
});
