const whatsappNumber = "212656475067";

document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.querySelector("form");

    if (!orderForm) {
        console.log("Order form not found.");
        return;
    }

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const getValue = (names) => {
            for (const name of names) {
                const field = orderForm.querySelector(
                    `[name="${name}"], #${name}`
                );

                if (field && field.value.trim() !== "") {
                    return field.value.trim();
                }
            }

            return "Not provided";
        };

        const customerName = getValue([
            "name",
            "customerName",
            "customer-name",
            "fullname",
            "fullName"
        ]);

        const product = getValue([
            "product",
            "productName",
            "product-name",
            "item"
        ]);

        const quantity = getValue([
            "quantity",
            "qty",
            "amount"
        ]);

        const phone = getValue([
            "phone",
            "telephone",
            "customerPhone"
        ]);

        const address = getValue([
            "address",
            "deliveryAddress",
            "delivery-address"
        ]);

        const message =
`🛒 NEW ORDER - THIMMO WEBFORGE

👤 Customer: ${customerName}
📦 Product: ${product}
🔢 Quantity: ${quantity}
📞 Phone: ${phone}
📍 Address: ${address}

Please confirm my order.`;

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
});
