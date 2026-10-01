const cat = new URLSearchParams(window.location.search).get("cat");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

const produktliste = document.querySelector(".produktliste");

function visData(data) {
  visantal.textContent = data.length;
  let markup = "";
  produktliste.innerHTML = "";
  /*  console.log(json); */

  data.forEach((element) => {
    const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
    markup += `
      <a class="link ${element.soldout ? "udsolgt" : ""}" href=productdetails.html?id=${element.id}>
      <article class="card">
      ${element.soldout ? '<span class="soldout-label">UDSOLGT</span>' : ""}
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="produktbillede">
      <h2>${element.productdisplayname}</h2>
      <h3>${element.articletype}</h3>
      ${
        element.discount
          ? `<p class='tilbudlabel'>-${element.discount}%</p>
        <p>Før Kr. ${element.price},- Nu ${tilbudspris},-</p>`
          : `<p>Kr. ${element.price},-</p>`
      }
    
      <p>${element.category}</p>
    </article>
    </a>
    `;
  });
  produktliste.innerHTML = markup;
}

const visantal = document.querySelector("#filter span");

document.querySelectorAll("#filter button").forEach((knap) => {
  knap.addEventListener("click", filter);
});

let allData;
let udsnit;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = data;
      udsnit = allData;
      visData(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;

  if (valgt == "All") {
    udsnit = allData;
  } else {
    udsnit = allData.filter((element) => element.gender == valgt);
  }

  visData(udsnit);
}

getData();

document.querySelectorAll("#sortering button").forEach((button) => button.addEventListener("click", sorter));

function sorter(e) {
  const valgt = e.target.textContent;
  if (valgt == "Pris lav-høj") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (valgt == "Pris høj-lav") {
    udsnit.sort((a, b) => b.price - a.price);
  } else if (valgt == "A-Z") {
    udsnit.sort((a, b) => a.productdisplayname.localeCompare(b.productdisplayname));
  } else if (valgt == "Z-A") {
    udsnit.sort((a, b) => b.productdisplayname.localeCompare(a.productdisplayname));
  }
  visData(udsnit);
}
