const selectElem = document.getElementById("webdevlist");

const htmlSection = document.getElementById("htmlSection");
const cssSection = document.getElementById("cssSection");
const jsSection = document.getElementById("jsSection");

const logoHtml = document.getElementById("logoHtml");
const logoCss = document.getElementById("logoCss");
const logoJs = document.getElementById("logoJs");

function clearActive() {
  htmlSection.classList.remove("active");
  cssSection.classList.remove("active");
  jsSection.classList.remove("active");

  logoHtml.classList.remove("active");
  logoCss.classList.remove("active");
  logoJs.classList.remove("active");
}

function showAll() {
  htmlSection.style.display = "block";
  cssSection.style.display = "block";
  jsSection.style.display = "block";
  clearActive();
}

function showOnly(which) {
  htmlSection.style.display = "none";
  cssSection.style.display = "none";
  jsSection.style.display = "none";

  clearActive();

  if (which === "html") {
    htmlSection.style.display = "block";
    htmlSection.classList.add("active");
    logoHtml.classList.add("active");
  }

  if (which === "css") {
    cssSection.style.display = "block";
    cssSection.classList.add("active");
    logoCss.classList.add("active");
  }

  if (which === "js") {
    jsSection.style.display = "block";
    jsSection.classList.add("active");
    logoJs.classList.add("active");
  }
}

showAll();

selectElem.addEventListener("change", function () {
  const codeValue = selectElem.value;
  console.log(codeValue);

  if (codeValue === "all") {
    showAll();
  } else {
    showOnly(codeValue);
  }
});

