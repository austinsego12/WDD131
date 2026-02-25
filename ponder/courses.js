const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  logo: "images/js-logo.png",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
  ],
  enrollStudent: function (sectionNum) {
    const num = Number(sectionNum);

    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum === num
    );

    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
    } else {
      console.log(`Section ${num} not found`);
    }
  }
};

function sectionTemplate(section) {
  return `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td>
  </tr>`;
}

function renderSections(sections) {
  document.querySelector("#sections").innerHTML =
    sections.map(sectionTemplate).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSections(aCourse.sections);

  document.querySelector("#enrollStudent").addEventListener("click", () => {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
  });
});