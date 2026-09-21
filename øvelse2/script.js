const biler = [
  {
    pris: 2300,
    model: "Turbo",
    brand: "Lada",
    farve: "beige",
    udstyr: ["rat", "sæder", "vinduer"],
  },
  {
    pris: 2300000,
    model: "Super",
    brand: "BMW",
    farve: "Sort",
    udstyr: ["rat", "sæder", "vinduer", "fart"],
  },
];

console.log(biler);
/* console.log(bil2); */

const produktliste = document.querySelector(".produktliste");

biler.forEach(visBiler);

function visBiler(bil) {
  produktliste.innerHTML += `
  <article class="card">
      <h2>${bil.brand}</h2>
      <h3>${bil.model}</h3>
      <p>${bil.pris}</p>
      <p>${bil.udstyr}</p>
    </article>
    `;
}
