console.log($);
$(() => {
  //start window onload
  let $container = $(".container");
  let $platform = $("<div>").addClass("platform");
  let $fallleft =$("<div>").addClass("fall");
  let $grass =$("<div>").addClass("grass");
  let $fallright =$("<div>").addClass("fall");
  let $body = $("body");
  $platform.append($fallleft,$grass,$fallright);
  //
  let $player = $("<div>").addClass("player");
  $container.append($player);

  const playerup =() => {
    $player.animate({
        'marginTop' : "-=30px" //movesup
      },0);
  }
  const playerdown =() => {
    $player.animate({
        'marginTop' : "+=30px" //movesdown
      },0);
  }

  const playerleft =() => {
      $player.animate({
          'marginLeft' : "-=30px" //movesleft
        },0);

  }

  const playerright =() => {
    $player.animate({
        'marginLeft' : "+=30px" //movesright
      },0);
  }

$container.append($platform);


  $body.keypress(() => {
    $player.stop();
    console.log(event.key);
    if (event.key=="w") {
      playerup();
    }
    if (event.key=="a") {
      playerleft();
    }
    if (event.key=="s") {
      playerdown();
    }
    if (event.key=="d") {
      playerright();
    }
  });







  //





  //end window onload
})
