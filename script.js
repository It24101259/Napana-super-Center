let cart = JSON.parse(localStorage.getItem("cart")) || [];

const category = document.getElementById("category");
const brand = document.getElementById("brand");
const type = document.getElementById("type");
const weight = document.getElementById("weight");

// Load Categories
const categories = [...new Set(products.map(p => p.category))];

categories.forEach(cat => {
    category.innerHTML += `<option value="${cat}">${cat}</option>`;
});

// Category Change
category.addEventListener("change", () => {

    brand.innerHTML =
    '<option value="">Select Brand</option>';

    type.innerHTML =
    '<option value="">Select Type</option>';

    weight.innerHTML =
    '<option value="">Select Weight</option>';

    const brands = [...new Set(
        products
        .filter(p => p.category === category.value)
        .map(p => p.brand)
    )];

    brands.forEach(b => {
        brand.innerHTML +=
        `<option value="${b}">${b}</option>`;
    });

});

// Brand Change
brand.addEventListener("change", () => {

    type.innerHTML =
    '<option value="">Select Type</option>';

    const types = [...new Set(
        products
        .filter(
            p =>
            p.category === category.value &&
            p.brand === brand.value
        )
        .map(p => p.type)
    )];

    types.forEach(t => {
        type.innerHTML +=
        `<option value="${t}">${t}</option>`;
    });

});

// Type Change
type.addEventListener("change", () => {

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

            weight.innerHTML +=
            `<option value="${w}">${w}</option>`;

        });

        document.getElementById("previewImage").src =
        item.image || "logo.png";

        document.getElementById("previewName").innerHTML =
        item.brand + " - " + item.type;

        document.getElementById("previewStock").innerHTML =
        "Stock : " + (item.stock || 0);

    }

});

// Weight Change
weight.addEventListener("change", () => {

    const item = products.find(
        p =>
        p.category === category.value &&
        p.brand === brand.value &&
        p.type === type.value
    );

    if(item){

        const price =
        item.prices[weight.value];

        document.getElementById("previewPrice").innerHTML =
        "Price : Rs." + price;

    }

});

// Add To Cart
function addSelectedProduct(){

    if(
        !category.value ||
        !brand.value ||
        !type.value ||
        !weight.value
    ){
        alert("Select Product");
        return;
    }

    const item = products.find(
        p =>
        p.category === category.value &&
        p.brand === brand.value &&
        p.type === type.value
    );

    const qty =
    parseInt(document.getElementById("qty").value);

    cart.push({

        name:item.brand,
        type:item.type,
        weight:weight.value,
        qty:qty,
        price:item.prices[weight.value]

    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added To Cart");

}