console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $sky = $("<div>").addClass("sky");
  $container.append($sky);
  let $grass = $("<div>").addClass("grass");
  let $body = $("body");
  let notjumping = true;
  let offgrass = false;
  let wpress=false;
  let apress=false;
  let spress=false;
  let dpress=false;

  let $player = $("<div>").addClass("player");

  $container.append($player);
  $container.append($grass);

  const playerup =() => {
    let x =0;
    if (notjumping) {
      notjumping=false;
      for (let i = 0; i < 10; i++) {
        $player.animate({
          'top' : "-=20px" //movesup
        },0);

        $player.animate({
          'top' : "-=20px" //movesup
        },0).delay(10);
      }
    }
  }

  const playerdown =() => {
    $player.animate({
      'top' : "+=2px" //movesdown
    },0);
  }

  const playerleft =() => {
    $player.animate({
      'left' : "-=1px" //movesleft
    },0);

  }

  const playerright =() => {
    $player.animate({
      'left' : "+=1px" //movesright
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
      playerup();
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
      playerdown();

    }
    if ($player.position().top+100==$grass.position().top) {
      if (offgrass) {

      }
      else {
        notjumping=true;
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
