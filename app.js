console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $sky = $("<div>").addClass("sky");
  $container.append($sky);
  let $grass = $("<div>").addClass("grass");
  let $body = $("body");
  let url1 = "http://www.clker.com/cliparts/h/D/5/O/s/2/stick-figure-black.svg";

  class Player {
    constructor() {
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
      this.$player = $("<div>").addClass("player");
      this.$player.css("url",url1);
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
              if (this.offgrassright) {
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
        if ($grass.position().left-450>this.$player.position().left+25) {
          this.playerdown();
          this.offgrassleft=true;
        }
        //fall right
        if ($grass.position().left+450<this.$player.position().left-25) {
          this.playerdown();

          this.offgrassright=true;
        }
        else if ($grass.position().left-450<this.$player.position().left+25) {
          this.offgrass=false;//makes player only able to jump once off the grass
          this.offgrassleft=false;
          this.offgrassright=false;
        }
        //grass gravity end
        //jump gravity
        if (this.$player.position().top+100!=$grass.position().top) {
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
        if (this.$player.position().top+100==$grass.position().top) {
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
      this.ai=true;//make the ai a player that is an ai
    }
  }
  //end ai class
  let human = new Player();
  let ai = new AI();


  $container.append(human.$player);
  $container.append(ai.$player);
  $container.append($grass);

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
