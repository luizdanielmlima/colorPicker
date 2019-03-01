window.onload = function() {
  //getting the elements from the DOM
  let sampleSwatch = document.getElementById("swatch-sample");
  let textEl = document.getElementById("colorValueTxt");
  let okMsg = document.getElementById("ok-msg");
  let errorMsg = document.getElementById("error-msg");

  function setColorsListeners() {
    colors = ["yellow", "red", "blue", "green", "orange", "purple"];
    for (let color of colors) {
      //sets a listener to the "base color"...
      document
        .getElementById(color)
        .addEventListener("click", showColor, false);

      //... and then to all the variates
      setSwatchListeners(color);
    }
  }

  //sets an event listener for each color swatcher
  function setSwatchListeners(colorName) {
    for (i = 20; i <= 100; i++) {
      if (i % 10 == 0) {
        let swatchLighten = "lighten-" + colorName + "-" + i;
        document
          .getElementById(swatchLighten)
          .addEventListener("click", showColor, false);
        let swatchDarken = "darken-" + colorName + "-" + i;
        document
          .getElementById(swatchDarken)
          .addEventListener("click", showColor, false);
      }
    }
  }

  function showColor(e) {
    //gets the color of the clicked swatch
    let bgColorRGB = window
      .getComputedStyle(e.target, null)
      .getPropertyValue("background-color");

    //converts the rgb to separate r,g,b values
    var colorString = bgColorRGB,
      colorsOnly = colorString
        .substring(colorString.indexOf("(") + 1, colorString.lastIndexOf(")"))
        .split(/,\s*/),
      components = {};
    components.red = colorsOnly[0];
    components.green = colorsOnly[1];
    components.blue = colorsOnly[2];

    //gets the hex value of the color
    let hexColor =
      "#" + fullColorHex(components.red, components.green, components.blue);

    //shows the hex color in the UI
    animateCSS(textEl, "flipInX");
    textEl.innerHTML = hexColor;
    sampleSwatch.style.backgroundColor = hexColor;
  }

  function animateCSS(element, animationName) {
    const node = element;
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
      node.classList.remove("animated", animationName);
    }

    node.addEventListener("animationend", handleAnimationEnd);
  }

  var fullColorHex = function(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
  };

  var rgbToHex = function(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  setColorsListeners();

  var clipboard = new ClipboardJS(".copyBtn");
  clipboard.on("success", function(e) {
    // console.log(e);
    okMsg.style.opacity = "0.7";
    this.setTimeout(() => {
      okMsg.style.opacity = "0";
    }, 2000);
  });
  clipboard.on("error", function(e) {
    errorMsg.style.opacity = "0.7";
    this.setTimeout(() => {
      errorMsg.style.opacity = "0";
    }, 2000);
  });
};
