// LOADER
window.onload = function () {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }
};

let cart = [];

// CUSTOMER SAVE
function saveCustomer() {
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  if (!name || !phone) {
    alert("Please enter Name and Phone");
    return;
  }

  localStorage.setItem("customerName", name);
  localStorage.setItem("customerPhone", phone);
  localStorage.setItem("customerAddress", address);

  alert("Welcome " + name);
}

// CATEGORY LOAD
const category = document.getElementById("category");

if (category && typeof products !== "undefined") {

  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    category.innerHTML += `<option value="${cat}">${cat}</option>`;
  });

}