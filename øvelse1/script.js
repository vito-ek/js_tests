const underviser = ["anders", "alan", "stine", "lau"];
console.log(underviser[3]);

const section = document.querySelector("section");

underviser.forEach(visNavne);

function visNavne(elm) {
  section.innerHTML += `<p>${elm} er sød</p>`;
}
