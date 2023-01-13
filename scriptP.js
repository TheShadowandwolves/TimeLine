function switchDiv(id) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    if (id === "div1") {
      div1.style.display = "block";
      div2.style.display = "none";
    } else {
      div1.style.display = "none";
      div2.style.display = "block";
    }
  }
switchDiv("div1");

// function checkViewport() {
//     const elementct = document.getElementById("ct");
//     const subelement = document.getElementById("subct");
//     const min_margin_sub = 0;
//     const minSize = 0.2;
//     const minSizesub = 0.2;
//     const maxSize = 2;
//     const maxSizesub = 1.5;
//     const viewportWidth = window.innerWidth;
//     let fontSize = 0;
//     let fontSizesub = 0;
 
//     if (viewportWidth < 600) {
//         fontSize = minSize;
//         fontSizesub = minSizesub;
//         subelement.style.paddingLeft = min_margin_sub + "px";
//     } else if (viewportWidth > 1200) {
//         fontSize = maxSize;
//         fontSizesub = maxSizesub;
//     } else {
//         fontSize = (viewportWidth - 600) / 600 * (maxSize - minSize) + minSize;
//         fontSizesub = (viewportWidth - 600) / 600 * (maxSizesub - minSizesub) + minSizesub;
//     }
 
//     elementct.style.fontSize = fontSize + "rem";
//     subelement.style.fontSize = fontSizesub + "rem";
//  }
 
//  // Call the function when the page loads
//  window.addEventListener("load", checkViewport);
 
//  // Call the function when the window is resized
//  window.addEventListener("resize", checkViewport);
 