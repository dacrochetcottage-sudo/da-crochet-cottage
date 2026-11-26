
document.addEventListener("DOMContentLoaded", function () {

    console.log("Shopping cart connected!");

    let cart = JSON.parse(localStorage.getItem("crochetCart")) || [];

    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");

    // Add products to cart
    document.querySelectorAll(".add-to-cart").forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            saveCart();
            renderCart();

            alert(name + " added to your cart!");
        });

    });

    // Save cart in browser
    function saveCart() {
        localStorage.setItem("crochetCart", JSON.stringify(cart));
    }

    // Display cart
    function renderCart() {

        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is currently empty.</p>";
        }

        let total = 0;

        cart.forEach(function (item, index) {

            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <p>Rs. ${item.price} each</p>
                </div>

                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">−</button>

                    <span>${item.quantity}</span>

                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                </div>

                <strong>Rs. ${itemTotal}</strong>

                <button class="remove-item" data-index="${index}">
                    Remove
                </button>
            `;

            cartItems.appendChild(cartItem);

        });

        cartTotal.textContent = total;
        saveCart();
    }

    // Handle quantity and remove buttons
    cartItems.addEventListener("click", function (event) {

        const button = event.target;

        if (!button.dataset.index) return;

        const index = Number(button.dataset.index);

        if (button.dataset.action === "increase") {
            cart[index].quantity++;
        }

        if (button.dataset.action === "decrease") {
            cart[index].quantity--;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
        }

        if (button.classList.contains("remove-item")) {
            cart.splice(index, 1);
        }

        renderCart();

    });

    // Show saved cart when website opens
    renderCart();

});
