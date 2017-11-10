console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $sky = $("<div>").addClass("sky");
  $container.append($sky);
  let $grass = $("<div>").addClass("grass");
  let $body = $("body");
  let jumping = false;
  let falling = false;
  let offgrass = false;
  let wpress=false;
  let apress=false;
  let spress=false;
  let dpress=false;
  let x =0;


  let $player = $("<div>").addClass("player");

  $container.append($player);
  $container.append($grass);

  const playerup =() => {
    $player.animate({
      'top' : "-=5px" //movesup
    },0);
  }

  const playerdown =() => {
    $player.animate({
      'top' : "+=1px" //movesdown
    },0);
  }

  const playerleft =() => {
    $player.animate({
      'left' : "-=3px" //movesleft
    },0);

  }

  const playerright =() => {
    $player.animate({
      'left' : "+=3px" //movesright
    },0);
  }



  $body.keypress(() => {
    $player.stop();

    if (event.key=="w") {
      wpress=true;
    }
    if (event.key=="a") {
      apress=true;
    }
    if (event.key=="s") {
      spress=true;
    }
    if (event.key=="d") {
      dpress=true;
    }
  });

  $body.keyup(() => {
    $player.stop();

    if (event.key=="w") {
      wpress=false;
    }
    if (event.key=="a") {
      apress=false;
    }
    if (event.key=="s") {
      spress=false;
    }
    if (event.key=="d") {
      dpress=false;
    }
  });

  let game =setInterval(() => {
    if (wpress) {
      if (falling) {

      }
      else {
        jumping = true;
      }

    }
    //grass gravity
    if ($grass.position().left-450>$player.position().left+25) {
      playerdown();
      offgrass=true;
    }
    if ($grass.position().left+450<$player.position().left-25) {
      playerdown();

      offgrass=true;
    }
    else if ($grass.position().left-450<$player.position().left+25) {
      offgrass=false;//makes player only able to jump once off the grass
    }
    //grass gravity end
    //jump gravity
    console.log("grass: "+$grass.position().top);
    console.log("playe: "+$player.position().top);
    if ($player.position().top+100!=$grass.position().top) {
      if (jumping) {
      }
      else {
        playerdown();
      }
    }
    if (jumping) {
      playerup();
      x++
      if (x>50) {
        falling=true;
        jumping=false;
        x=0;
      }
    }
    if ($player.position().top+100==$grass.position().top) {
      if (offgrass) {

      }
      else {
        falling=false;
      }

    }

    //jump gravity end
    if (apress) {
      playerleft();
    }
    if (dpress) {
      playerright();
    }

  }, .5);






  //





  //end window onload
})
