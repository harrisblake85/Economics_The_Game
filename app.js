console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $sky = $("<div>").addClass("sky");

  let $grass = $("<img>").addClass("grass").attr("src","images/grass.jpg");
  let $body = $("body");
  let players=[];



  class Player {
    constructor() {
      this.src1 = "images/tophat/tophat.png";
      this.src2 = "images/tophat/tophat_jump.png";
      this.src3 = "images/tophat/tophat_fall.png";

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

        //grow

        //end grow

        // if (offgrass==false){
        //   this.$player.attr("src",this.src1);
        // }
        // if (jumping){
        //   this.$player.attr("src",this.src2);
        // }
        // if (falling) {
        //   this.$player.attr("src",this.src3);
        // }
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
        if ($grass.position().left-450>this.$player.position().left+this.$player.width()/2) {
          this.playerdown();
          this.offgrassleft=true;
        }
        //fall right
        if ($grass.position().left+450<this.$player.position().left-this.$player.width()/2) {
          this.playerdown();

          this.offgrassright=true;
        }
        else if ($grass.position().left-450<this.$player.position().left+this.$player.width()/2) {
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
  let x = 90;
  let y = 120;
  class Money extends AI{
    constructor() {
      super();
      // this.$player=$("<img>").addClass("money");
      this.src3="https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg";
      this.$player.attr("src",this.src3);
      this.px= Math.floor(Math.random()*900);
      this.py= Math.floor(Math.random()*500);

      this.$player.css( { left: x, top: y } ) ;
      this.$player.width(80);
      this.$player.height(40);
    }
    playerup()
    {

    }
  }
  const makedollars = () => {
    let tempdollar = new Money();
    // tempdollar.$player.attr("position","absolute");
    // tempdollar.$player.css("margin","0");
    tempdollar.left="400px";
    $container.append(tempdollar.$player);

  }

  makedollars();
  $container.append($sky);
  let human = new Player();
  let ai = new AI();
  let ai2 = new AI();

  $container.append(human.$player);
  $container.append(ai.$player);
  $container.append(ai2.$player);
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
