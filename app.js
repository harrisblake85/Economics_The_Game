console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $sky = $("<div>").addClass("sky");
  $container.append($sky);
  let $grass = $("<div>").addClass("grass");
  let $body = $("body");
  class Player {
    constructor() {
      this.ai=false;
      this.jumping = false;
      this.falling = false;
      this.offgrass = false;
      this.wpress=false;
      this.apress=false;
      this.spress=false;
      this.dpress=false;
      this.x =0;
      this.$player = $("<div>").addClass("player");
      //begin game interval

      this.game =setInterval(() => {
        //if player is an ai
        if (this.ai) {
          console.log("Im An AI");
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
        if ($grass.position().left-450>this.$player.position().left+25) {
          this.playerdown();
          this.offgrass=true;
        }
        if ($grass.position().left+450<this.$player.position().left-25) {
          this.playerdown();

          this.offgrass=true;
        }
        else if ($grass.position().left-450<this.$player.position().left+25) {
          this.offgrass=false;//makes player only able to jump once off the grass
        }
        //grass gravity end
        //jump gravity
        console.log("grass: "+$grass.position().top);
        console.log("playe: "+this.$player.position().top);
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
      this.ai=true;
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
