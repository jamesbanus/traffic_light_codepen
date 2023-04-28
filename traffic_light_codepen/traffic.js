// FORK THIS PEN

// 1. Wire up the buttons to the lights

// You'll have to select and store the lights as a variable (although it may help you later to have a reference to all of them at once via the 'light' class)

// You'll have to select and store the buttons as separate variables

// then, add an event listener to each of the buttons

// in the 'handler' (the function you give to the listener) you add a class of 'on' to the relevant light

// Also make the lights go on and off on hover (of the light!!)

// 2. (Extra credit): Have a go at making it so that only one light can be on at one time

// 3. (wild&crazy credit) See if you can set up a timer of some sort to do that automatically (You'll have to add new start and stop buttons to the page)

const { log } = console;

document.addEventListener("DOMContentLoaded", () => {
  // store variables for all lights and buttons //

  const stopButton = document.getElementById("stop");
  const stopLight = document.querySelector(".light.stop");
  const cautionButton = document.getElementById("caution");
  const cautionLight = document.querySelector(".light.caution");
  const goButton = document.getElementById("go");
  const goLight = document.querySelector(".light.go");
  const autoGo = document.getElementById("autoGo");
  const autoStop = document.getElementById("autoStop");

  //   variables for various timers we want to stop at some point
  let timer;
  let interval;

  //   function that turns all lights off and then turns on a specified light for 3 seconds before removing. Called again will clear timer

  function button_handler(button, button_light, light2, light3) {
    button.addEventListener("click", (e) => {
      light2.classList.remove("on");
      light3.classList.remove("on");
      button_light.classList.add("on");
      clearTimeout(timer);
      clearInterval(interval);
      timer = setTimeout(() => {
        button_light.classList.remove("on");
      }, 3000);
    });
  }

  //    function called

  button_handler(stopButton, stopLight, cautionLight, goLight);
  button_handler(cautionButton, cautionLight, stopLight, goLight);
  button_handler(goButton, goLight, cautionLight, stopLight);

  //   function that turns on lights when mouse hovers over them and off again when mouse leaves

  function hover_handler(light) {
    light.addEventListener("mouseenter", (e) => {
      light.classList.add("on");
    });
    light.addEventListener("mouseleave", (e) => {
      light.classList.remove("on");
    });
  }

  //    function called

  hover_handler(stopLight);
  hover_handler(cautionLight);
  hover_handler(goLight);

  //   function for traffic light sequence that we will repeat

  function sequence() {
    // turn on red light //
    stopLight.classList.add("on");
    // wait 2 seconds and turn on yellow light //
    timer = setTimeout(() => {
      cautionLight.classList.add("on");
    }, 2000);
    // after 2 seconds turn off red/yellow and turn on green
    timer = setTimeout(() => {
      stopLight.classList.remove("on");
      cautionLight.classList.remove("on");
      goLight.classList.add("on");
    }, 4000);
    // after 2 seconds turn off green and turn on yellow
    timer = setTimeout(() => {
      goLight.classList.remove("on");
      cautionLight.classList.add("on");
    }, 6000);
    // after 2 seconds turn off yellow
    timer = setTimeout(() => {
      cautionLight.classList.remove("on");
    }, 8000);
  }

  // on button click we will call the above sequence and then again every 8 seconds (the length of the sequence)

  autoGo.addEventListener("click", (e) => {
    // remove all lights incase multiple buttons pressed//
    stopLight.classList.remove("on");
    cautionLight.classList.remove("on");
    goLight.classList.remove("on");
    // call sequence
    sequence();
    // run every 8 seconds
    interval = setInterval(sequence, 8000);
  });

  //   on button click clear interval, current loop of auto lights will be the last

  autoStop.addEventListener("click", (e) => {
    clearInterval(interval);
  });
});
