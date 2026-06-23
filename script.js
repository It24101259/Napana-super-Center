// LOADER
window.onload = function () {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }
};

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ELEMENTS
const category = document.getElementById("category");
const brand = document.getElementById("brand");
const type = document.getElementById("type");
const weight = document.getElementById("weight");

// CUSTOMER SAVE
function saveCustomer() {

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const address =
        document.getElementById("customerAddress").value;

    if (!name || !phone) {

        alert("Please enter Name and Phone Number");
        return;

    }

    localStorage.setItem("customerName", name);
    localStorage.setItem("customerPhone", phone);
    localStorage.setItem("customerAddress", address);

    alert("Welcome " + name);
}

// LOAD CATEGORIES
if (category) {

    const categories =
        [...new Set(products.map(p => p.category))];

    categories.forEach(cat => {

        category.innerHTML +=
            `<option value="${cat}">${cat}</option>`;

    });

}

// CATEGORY CHANGE
if (category) {

    category.addEventListener("change", function () {

        brand.innerHTML =
            '<option value="">Select Brand</option>';

        type.innerHTML =
            '<option value="">Select Type</option>';

        weight.innerHTML =
            '<option value="">Select Weight</option>';

        const brands =
            [...new Set(

                products
                    .filter(
                        p => p.category === category.value
                    )
                    .map(
                        p => p.brand
                    )

            )];

        brands.forEach(b => {

            brand.innerHTML +=
                `<option value="${b}">
                ${b}
                </option>`;

        });

    });

}

// BRAND CHANGE
if (brand) {

    brand.addEventListener("change", function () {

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

                    .map(
                        p => p.type
                    )

            )];

        types.forEach(t => {

            type.innerHTML +=
                `<option value="${t}">
                ${t}
                </option>`;

        });

    });

}

// TYPE CHANGE
if (type) {

    type.addEventListener("change", function () {

        weight.innerHTML =
            '<option value="">Select Weight</option>';

        const item =
            products.find(

                p =>

                    p.category === category.value &&
                    p.brand === brand.value &&
                    p.type === type.value

            );

        if (item) {

            item.weights.forEach(w => {

                weight.innerHTML +=
                    `<option value="${w}">
                    ${w}
                    </option>`;

            });

            document.getElementById(
                "previewImage"
            ).src = item.image;

            document.getElementById(
                "previewName"
            ).innerHTML =
                item.brand + " - " + item.type;

            document.getElementById(
                "previewStock"
            ).innerHTML =
                "Stock : " + item.stock;

        }

    });

}

// WEIGHT CHANGE
if (weight) {

    weight.addEventListener("change", function () {

        const item =
            products.find(

                p =>

                    p.category === category.value &&
                    p.brand === brand.value &&
                    p.type === type.value

            );

        if (item) {

            document.getElementById(
                "previewPrice"
            ).innerHTML =
                "Price : Rs." +
                item.prices[weight.value];

        }

    });

}

// ADD TO CART
function addSelectedProduct() {

    if (
        !category.value ||
        !brand.value ||
        !type.value ||
        !weight.value
    ) {

        alert("Please Select Product");
        return;

    }

    const item =
        products.find(

            p =>

                p.category === category.value &&
                p.brand === brand.value &&
                p.type === type.value

        );

    const qty =
        parseInt(
            document.getElementById("qty").value
        );

    cart.push({

        name: item.brand,
        type: item.type,
        weight: weight.value,
        qty: qty,
        price: item.prices[weight.value]

    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added To Cart");

}