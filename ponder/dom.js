const selectElem = document.getElementById("webdevlist");
const topicTitle = document.getElementById("topicTitle");
const topicText = document.getElementById("topicText");
const message = document.getElementById("message");

selectElem.addEventListener("change", function () {
  const codeValue = selectElem.value;
  console.log(codeValue);

  if (codeValue === "html") {
    topicTitle.textContent = "HTML";
    topicText.textContent =
      "HTML gives the page structure. It is the content and elements you see on the page.";
    message.textContent = "You selected HTML.";
  } else if (codeValue === "css") {
    topicTitle.textContent = "CSS";
    topicText.textContent =
      "CSS styles the page. It controls color, layout, spacing, fonts, and responsiveness.";
    message.textContent = "You selected CSS.";
  } else if (codeValue === "js") {
    topicTitle.textContent = "JavaScript";
    topicText.textContent =
      "JavaScript makes the page interactive. It can update content and styles after the page loads.";
    message.textContent = "You selected JavaScript.";
  } else {
    topicTitle.textContent = "Nothing selected yet";
    topicText.textContent = "Pick HTML, CSS, or JavaScript.";
    message.textContent = "Choose one from the dropdown to see DOM manipulation.";
  }
});


