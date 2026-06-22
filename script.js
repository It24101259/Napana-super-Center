// LOADER

window.onload = function(){

const loader = document.getElementById("loader");

if(loader){
setTimeout(function(){
loader.style.display = "none";
},1500);
}

};

// CUSTOMER SAVE

function saveCustomer(){

const name = document.getElementById("customerName").value;
const phone = document.getElementById("customerPhone").value;
const address = document.getElementById("customerAddress").value;

if(name === "" || phone === ""){
alert("Please enter Name and Phone Number");
return;
}

localStorage.setItem("customerName", name);
localStorage.setItem("customerPhone", phone);
localStorage.setItem("customerAddress", address);

alert("Welcome " + name);

}

// CART

let cart = [];

// DROPDOWNS

const category = document.getElementById("category");
const brand = document.getElementById("brand");
const type = document.getElementById("type");
const weight = document.getElementById("weight");

if(category){

const categories =
[...new Set(products.map(p => p.category))];

categories.forEach(cat => {
category.innerHTML += `<option value="${cat}">${cat}</option>`;
});

category.addEventListener("change", function(){

brand.innerHTML =
'<option value="">Select Brand</option>';

type.innerHTML =
'<option value="">Select Type</option>';

weight.innerHTML =
'<option value="">Select Weight</option>';

const brands =
[...new Set(
products
.filter(p => p.category === category.value)
.map(p => p.brand)
)];

brands.forEach(b => {
brand.innerHTML += `<option value="${b}">${b}</option>`;
});

});

brand.addEventListener("change", function(){

type.innerHTML =
'<option value="">Select Type</option>';

weight.innerHTML =
'<option value="">Select Weight</option>';

const types =
[...new Set(
products
.filter(
p =>
p.category === category.value &&
p.brand === brand.value
)
.map(p => p.type)
)];

types.forEach(t => {
type.innerHTML += `<option value="${t}">${t}</option>`;
});

});

type.addEventListener("change", function(){

weight.innerHTML =
'<option value="">Select Weight</option>';

const item = products.find(
p =>
p.category === category.value &&
p.brand === brand.value &&
p.type === type.value
);

if(item){

item.weights.forEach(w => {
weight.innerHTML += `<option value="${w}">${w}</option>`;
});

}

});

}

// ADD TO CART

function addSelectedProduct(){

if(!brand.value || !type.value || !weight.value){
alert("Please select product");
return;
localStorage.setItem(
"cart",
JSON.stringify(cart)
);
}

const qty =
parseInt(document.getElementById("qty").value);

const selectedProduct = products.find(
p =>
p.category === category.value &&
p.brand === brand.value &&
p.type === type.value
);

const selectedPrice =
selectedProduct.prices[weight.value];
if(selectedProduct.stock < qty){

alert("Not enough stock");
return;

}

selectedProduct.stock -= qty;
cart.push({
name: brand.value,
type: type.value,
weight: weight.value,
qty: qty,
price: selectedPrice
});

updateCart();

}

// UPDATE CART

function updateCart(){

const cartDiv =
document.getElementById("cartItems");

if(cart.length === 0){
cartDiv.innerHTML = "No Items Added";
return;
localStorage.setItem(
"cart",
JSON.stringify(cart)
);
}

let html = "";
let totalItems = 0;
let grandTotal = 0;

cart.forEach((item,index)=>{

const itemTotal =
item.price * item.qty;

totalItems += item.qty;
grandTotal += itemTotal;

html += `
<div class="cart-item">

<p>
${item.name} -
${item.type} -
${item.weight}
x${item.qty}

<br>
Stock Left :
${products.find(
p => p.brand === item.name
).stock}
<br>
Rs.${itemTotal}
</p>

<button onclick="removeItem(${index})">
❌
</button>

</div>
`;

});

html += `
<h3>Total Items : ${totalItems}</h3>
<h3>Total Bill : Rs.${grandTotal}</h3>
`;

cartDiv.innerHTML = html;

}

// REMOVE ITEM

function removeItem(index){

cart.splice(index,1);
updateCart();

}

// WHATSAPP ORDER

document.getElementById("orderBtn").addEventListener("click", function(){

if(cart.length === 0){
alert("Cart is empty");
return;
}

const customerName =
localStorage.getItem("customerName") || "Not Entered";

const customerPhone =
localStorage.getItem("customerPhone") || "Not Entered";

const customerAddress =
localStorage.getItem("customerAddress") || "Not Entered";

const deliveryType =
document.getElementById("deliveryType").value;

let totalItems = 0;
let grandTotal = 0;

let message =
"🛒 NAPANA SUPER PRE ORDER\n\n" +
"👤 Customer : " + customerName + "\n" +
"📞 Phone : " + customerPhone + "\n" +
"🏠 Address : " + customerAddress + "\n\n" +
"🚚 Order Type : " + deliveryType + "\n\n" +
"📦 Items\n\n";

cart.forEach(item => {

const itemTotal =
item.price * item.qty;

totalItems += item.qty;
grandTotal += itemTotal;

message +=
"• " +
item.name + " - " +
item.type + " - " +
item.weight +
" x" + item.qty +
" = Rs." + itemTotal +
"\n";

});

message +=
"\n🧮 Total Items : " + totalItems +
"\n💰 Total Bill : Rs." + grandTotal +
"\n\n🏪 Napana Super" +
"\nEST. 2019" +
"\n📍 7/B Napana, Gunnapana" +
"\n📞 0707103215";

window.location.href =
"https://wa.me/94707103215?text=" +
encodeURIComponent(message);

});
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function(){

const value =
searchBox.value.toLowerCase();

const filtered =
products.filter(product =>

product.brand.toLowerCase().includes(value) ||

product.type.toLowerCase().includes(value) ||

product.category.toLowerCase().includes(value)

);

console.log(filtered);

});
function showBill(){

let html = "";

let total = 0;

cart.forEach(item=>{

const itemTotal =
item.price * item.qty;

total += itemTotal;

html += `
<p>

${item.name}
-
${item.weight}

x${item.qty}

= Rs.${itemTotal}

</p>
`;

});

html += `
<hr>
<h3>Total Bill : Rs.${total}</h3>
`;

document.getElementById(
"billContent"
).innerHTML = html;

document.getElementById(
"billPopup"
).style.display = "block";

}

function closeBill(){

document.getElementById(
"billPopup"
).style.display = "none";

}