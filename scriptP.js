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

const switchTheme = (evt) => {
  const switchBtn = evt.target;
  if (switchBtn.textContent.toLowerCase() === "light") {
    switchBtn.textContent = "dark";
    // localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    switchBtn.textContent = "light";
    // localStorage.setItem("theme", "light"); //add this
    document.documentElement.setAttribute("data-theme", "light");
  }
};

const switchModeBtn = document.querySelector(".switch-btn");
switchModeBtn.addEventListener("click", switchTheme, false);

let currentTheme = "dark";
// currentTheme = localStorage.getItem("theme")
//  ? localStorage.getItem("theme")
//  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  switchModeBtn.textContent = currentTheme;
}

function sendEmail() {
  // Get the user-defined text
  const emailText = document.getElementById("inputed-question").value;

  // Construct the email message
  const subject = "Question about the website";
  const body = encodeURIComponent(emailText);
  const mailtoLink = `mailto:leonard.blam613@gmail.com?subject=${subject}&body=${body}`;
  // const mailtoLink = `mailto:leonard.blam613@gmail.com`;
  // Open the email client with the pre-defined message
  window.open(mailtoLink);
}
