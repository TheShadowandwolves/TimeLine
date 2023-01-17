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

function showWarning(){
  // Check if the screen width is less than 600 pixels
  if (window.innerWidth < 600) {
    // Get the message element by its id
    const messageElement = document.getElementById("text-message");
    // Show the message
    messageElement.style.display = "block";
    // Write the message
    messageElement.innerHTML = "This site is not optimized for mobile devices. Please use a desktop or laptop computer for the best experience.";
  }
  else {
    // Get the message element by its id
    const messageElement = document.getElementById("message");
    // Hide the message
    messageElement.style.display = "none";
  }
}
// Call the function when the page loads
window.addEventListener("load", showWarning);

function hide(){
  const messageElement = document.getElementById("message");
  messageElement.style.display = "none";
}

