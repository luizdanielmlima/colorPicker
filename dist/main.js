console.log("main.js running");

window.onload = function() {
  function setColor(event) {
    console.log("clicou");
  }

  //sets an event listener for all the color swatchers
  function setSwatchListeners() {
    for (i = 20; i <= 100; i++) {
      if (i % 10 == 0) {
        let swatchLighten = "lighten-yellow-" + i;
        let swatchDarken = "lighten-yellow-" + i;
        console.log(swatchLighten);
        document
          .getElementsByClassName(swatchLighten)
          .addEventListener("click", setColor, false);
        // document
        //   .getElementsByClassName(swatchDarken)
        //   .addEventListener("click", setColor, false);
      }
    }
  }

  setSwatchListeners();
};
