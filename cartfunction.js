// cart-script.js

document.addEventListener("DOMContentLoaded", function () {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    var cartItemsBody = document.getElementById("cart-items-body");
    var totalItemsSpan = document.getElementById("total-items");
    var totalPriceSpan = document.getElementById("total-price");
    var checkoutBtn = document.getElementById("checkout-btn");
    var paymentForm = document.getElementById("payment-form");

    var cartItems = [
        {
          name: "Product 1",
          size: "Large",
          quantity: 2,
          price: 10.99,
          image: "image/Products/f2.jpg",
        },
        {
          name: "Product 2",
          size: "Medium",
          quantity: 1,
          price: 19.99,
          image: "image/Products/f2.jpg",
        },
        // ... more items
      ];

    function displayCartItems() {
        cartItemsBody.innerHTML = ""; // Clear existing content

        var totalItems = 0;
        var totalPrice = 0;

        cartItems.forEach(function (item, index) {
            var cartItemRow = document.createElement("tr");
           
            var imageItem = document.createElement("td");
            var image = document.createElement("img");
              image.src = item.image; // Assuming you have an 'image' property in your item object
              image.alt = item.name; // Add alt text for accessibility
              imageItem.appendChild(image);
            var productName = document.createElement("td");
            productName.textContent = item.name;

            var productSize = document.createElement("td");
            productSize.textContent = item.size;

            var productQuantity = document.createElement("td");
            productQuantity.textContent = item.quantity;

            var productUnitPrice = document.createElement("td");
            productUnitPrice.textContent = "$" + item.price.toFixed(2);

            var productTotalPrice = document.createElement("td");
            productTotalPrice.textContent = "$" + (item.price * item.quantity).toFixed(2);

            var removeButton = document.createElement("td");
            var removeIcon = document.createElement("i");
            removeIcon.classList.add("fas", "fa-trash-alt");
            removeIcon.setAttribute("data-index", index);
            removeIcon.addEventListener("click", removeCartItem);
            removeButton.appendChild(removeIcon);

            cartItemRow.appendChild(productName);
            cartItemRow.appendChild(productSize);
            cartItemRow.appendChild(productQuantity);
            cartItemRow.appendChild(productUnitPrice);
            cartItemRow.appendChild(productTotalPrice);
            cartItemRow.appendChild(removeButton);

            cartItemsBody.appendChild(cartItemRow);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalItemsSpan.textContent = totalItems;
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }

    function removeCartItem(event) {
        var indexToRemove = event.target.getAttribute("data-index");
        cartItems.splice(indexToRemove, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems();
    }

    function proceedToCheckout() {
        // Display the payment form
        paymentForm.style.display = "block";
    }

    function completePayment() {
        // Simulate a payment processing logic
        alert("Payment Successful!");
        // Clear the cart after successful payment
        localStorage.removeItem("cart");
        displayCartItems();
        // Hide the payment form
        paymentForm.style.display = "none";
    }

    displayCartItems(); // Display cart items on page load

    checkoutBtn.addEventListener("click", proceedToCheckout);
    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        completePayment();
    });
});
