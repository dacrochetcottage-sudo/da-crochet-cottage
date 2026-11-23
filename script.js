
document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript connected successfully!");

    const enquiryButtons =
        document.querySelectorAll(".enquire-btn");

    const enquiryMessage =
        document.querySelector("#enquiry-message");

    const enquiryBox =
        document.querySelector("#enquiry-box");

    const whatsappButton =
        document.querySelector("#whatsapp-order");

    let selectedProduct = "";
    let selectedPrice = "";

    enquiryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedProduct = button.dataset.product;
            selectedPrice = button.dataset.price;

            enquiryMessage.textContent =
                "You selected: " + selectedProduct +
                " | Price: Rs. " + selectedPrice;

            enquiryBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    });

    whatsappButton.addEventListener("click", function () {

        if (!selectedProduct) {
            alert("Please select a product first!");
            return;
        }

        const phoneNumber = "923XXXXXXXXX";

        const message =
            "Hello! I am interested in ordering " +
            selectedProduct +
            " priced at Rs. " +
            selectedPrice +
            ". Please share more details.";

        const whatsappURL =
            "https://wa.me/" + phoneNumber +
            "?text=" + encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });

});
