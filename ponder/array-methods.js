
"use strict";

function convert(grade) {
  let points;

  switch (grade) {
    case "A":
      points = 4;
      break;
    case "B":
      points = 3;
      break;
    case "C":
      points = 2;
      break;
    case "D":
      points = 1;
      break;
    case "F":
      points = 0;
      break;
    default:
      alert("not a valid grade");
      points = null;
  }

  return points;
}

const words = ["watermelon", "peach", "apple", "tomato", "grape"];

const students = [
  { last: "Andrus", first: "Aaron" },
  { last: "Masa", first: "Manny" },
  { last: "Tanda", first: "Tamanda" }
];

// -------------------------
// forEach (Console Output)
// -------------------------
console.log("✅ forEach: log each word in uppercase");
words.forEach((word) => {
  console.log(word.toUpperCase());
});

// -------------------------
// map (Creates new arrays)
// -------------------------
const wordLengths = words.map((word) => word.length);

const grades = ["A", "B", "C", "F", "B"];
const gradePoints = grades.map(convert);

const studentFullNames = students.map((s) => `${s.first} ${s.last}`);

// -------------------------
// filter (Keeps items that pass a test)
// -------------------------
const longWords = words.filter((word) => word.length > 5);

const lastNameStartsWithM = students.filter((s) => s.last.startsWith("M"));

// -------------------------
// reduce (Combines into ONE value)
// -------------------------
const totalPoints = gradePoints.reduce((total, pts) => total + pts, 0);
const averagePoints = totalPoints / gradePoints.length;

const longestWord = words.reduce((best, current) => {
  return current.length > best.length ? current : best;
}, "");

// -------------------------
// indexOf (Find position)
// -------------------------
const appleIndex = words.indexOf("apple"); // should be 2

// Extra console checks
console.log("✅ map wordLengths:", wordLengths);
console.log("✅ map gradePoints:", gradePoints);
console.log("✅ filter longWords:", longWords);
console.log("✅ reduce totalPoints:", totalPoints);
console.log("✅ reduce averagePoints:", averagePoints);
console.log("✅ reduce longestWord:", longestWord);
console.log('✅ indexOf "apple":', appleIndex);

// -------------------------
// Template Literal (Page Output)
// -------------------------
const outputDiv = document.getElementById("output");

const pageHTML = `
  <h2>Page Output</h2>

  <h3>Words</h3>
  <p><strong>Original:</strong> ${words.join(", ")}</p>
  <p><strong>Word lengths (map):</strong> ${wordLengths.join(", ")}</p>
  <p><strong>Long words (filter):</strong> ${longWords.join(", ")}</p>
  <p><strong>Longest word (reduce):</strong> ${longestWord}</p>
  <p><strong>Index of "apple" (indexOf):</strong> ${appleIndex}</p>

  <h3>Students (Objects)</h3>
  <p><strong>Full names (map):</strong> ${studentFullNames.join(", ")}</p>
  <p><strong>Last name starts with M (filter):</strong>
    ${lastNameStartsWithM.map((s) => `${s.first} ${s.last}`).join(", ")}
  </p>

  <h3>Grades</h3>
  <p><strong>Grades:</strong> ${grades.join(", ")}</p>
  <p><strong>Points (map + convert):</strong> ${gradePoints.join(", ")}</p>
  <p><strong>Total points (reduce):</strong> ${totalPoints}</p>
  <p><strong>Average points:</strong> ${averagePoints.toFixed(2)}</p>

  <h3>Generated Lists (map + template literal)</h3>
  <p><strong>Words as a list:</strong></p>
  <ul>
    ${words.map((w) => `<li>${w}</li>`).join("")}
  </ul>

  <p><strong>Students as a list:</strong></p>
  <ul>
    ${students.map((s) => `<li>${s.last}, ${s.first}</li>`).join("")}
  </ul>
`;

outputDiv.innerHTML = pageHTML;
