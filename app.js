console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $sky = $("<div>").addClass("sky");
  $container.append($sky);
  let $grass = $("<img>").addClass("grass").attr("src","images/grass.jpg");
  let $body = $("body");
  let players=[];
  let money=[];



  class Player {
    constructor() {
      this.src1 = "images/tophat/tophat.png";
      this.src2 = "images/tophat/tophat_jump.png";
      this.src3 = "images/tophat/tophat_fall.png";
      this.score = 0;
      this.ai=false;
      this.jumping = false;
      this.falling = false;
      this.offgrass = false;
      this.offgrassleft = false;
      this.offgrassright = false;
      this.wpress=false;
      this.apress=false;
      this.spress=false;
      this.dpress=false;
      this.choice=2;
      this.x=0;
      this.y=0;
      this.$player = $("<img>").addClass("player");
      this.$player.attr("src",this.src3);
      //begin game interval
      // game interval determines what moves a player/ai takes
      this.game =setInterval(() => {
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
            console.log(this.choices[this.choice]);
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
          if (this.falling) {
          }
          else {
            this.jumping = true;

          }
        }
        //end wpress
        //grass gravity player falls if they jump off the grass
        //fall left
        console.log($grass.position().left);

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

  }
  // end player class
  //ai class
  class AI extends Player {
    constructor() {
      super();
      this.src1 = "images/cowboyhat/cowboyhat.png";
      this.src2 = "images/cowboyhat/cowboyhat_jump.png";
      this.src3 = "images/cowboyhat/cowboyhat_fall.png";
      this.$player.attr("src",this.src3);
      this.ai=true;//make the ai a player that is an ai
    }
  }
  //end ai class

  class Money extends AI{
    constructor() {
      super();
      this.src3="images/money.png";
      this.$player.attr("src",this.src3);
      //start money over container, within bounds of grass
      this.px =Math.floor(Math.random()*901);
      this.py = -110;
      this.$player.css( { left: this.px, top: this.py } ) ;
      this.$player.width(80);
      this.$player.height(40);

    }
    // playerup()
    // {
    //   //money doesnt jump up
    // }
  }
  const makedollar = () => {
      let tempdollar = new Money();
      $container.prepend(tempdollar.$player);
      money.push(tempdollar);

      // tempdollar.$player.css({position:"absolute"});
  }

  class Game {
    constructor() {
      this.rainmoney = setInterval(() => {
        makedollar();
      },4000);
      this.collect = setInterval(() => {

        for (let i = 0; i < money.length; i++) {
          this.mleft = money[i].$player.position().left;
          this.mright = money[i].$player.position().left+this.$player.width();
          this.mtop = money[i].$player.position().top;
          this.mbottom = money[i].$player.position().top+this.$player.height();
          for (let i = 0; i < money.length; i++) {
            this.pleft = player[i].$player.position().left;
            this.pright = player[i].$player.position().left+this.$player.width();
            this.ptop = player[i].$player.position().top;
            this.pbottom = player[i].$player.position().top+this.$player.height();
            if (true) {

            }
          }
        }
        if (false) {
          console.log("not yet");
        }
      },20)
    }
  }

  thisgame = new Game();
  human = new Player();
  ai = new AI();
  ai2 = new AI();
  players = [human,ai,ai2];
  for (let i = 0; i < players.length; i++) {
    $container.append(players[i].$player);
  }
  $container.append($grass);



  human.$player.on("click",() => {
    console.log(human.$player.height());
    human.$player.width( human.$player.width()*1.02);
    human.$player.width(Math.floor( human.$player.width()));
    human.$player.height( human.$player.height()*1.01);
    human.$player.height(Math.floor( human.$player.height()));
  })

  $body.keypress(() => {
    human.$player.stop();

    if (event.key=="w") {
      human.wpress=true;
    }
    if (event.key=="a") {
      human.apress=true;
    }
    if (event.key=="s") {
      human.spress=true;
    }
    if (event.key=="d") {
      human.dpress=true;
    }
  });

  $body.keyup(() => {
    human.$player.stop();

    if (event.key=="w") {
      human.wpress=false;
    }
    if (event.key=="a") {
      human.apress=false;
    }
    if (event.key=="s") {
      human.spress=false;
    }
    if (event.key=="d") {
      human.dpress=false;
    }
  });








  //





  //end window onload
})
