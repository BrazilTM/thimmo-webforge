const whatsappNumber = "212656475067";

const products = [
  {
    id: 1,
    name: "Business Starter",
    category: "business",
    price: 1500,
    description: "A professional website for small businesses and services."
  },
  {
    id: 2,
    name: "Restaurant Pro",
    category: "restaurant",
    price: 1800,
    description: "A modern restaurant website with menu and contact sections."
  },
  {
    id: 3,
    name: "Online Store",
    category: "store",
    price: 2500,
    description: "A clean online store layout for products and businesses."
  },
  {
    id: 4,
    name: "Creator Portfolio",
    category: "portfolio",
    price: 1500,
    description: "A stylish portfolio website for creators and professionals."
  }
];

document.addEventListener("DOMContentLoaded", function () {

  const productsContainer = document.getElementById("products");
  const filterButtons = document.querySelectorAll("[data-filter]");

  const modal = document.getElementById("orderModal");
  const closeButton = document.getElementById("close");
  const orderForm = document.getElementById("orderForm");

  const orderTitle = document.getElementById("orderTitle");
  const orderDesc = document.getElementById("orderDesc");
  const orderPrice = document.getElementById("orderPrice");

  let selectedProduct = null;

  function renderProducts(filter = "all") {

    productsContainer.innerHTML = "";

    const filteredProducts =
      filter === "all"
        ? products
        : products.filter(product => product.category === filter);

    filteredProducts.forEach(product => {

      const card = document.createElement("article");
      card.className = "product-card";

      card.innerHTML = `
        <div class="product-image">
          <span>${product.category.toUpperCase()}</span>
        </div>

        <div class="product-info">
          <small>${product.category}</small>

          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <div class="product-bottom">
            <strong>${product.price.toLocaleString()} DH</strong>

            <button class="btn primary order-btn">
              Order →
            </button>
          </div>
        </div>
      `;

      const button = card.querySelector(".order-btn");

      button.addEventListener("click", function () {
        openOrder(product);
      });

      productsContainer.appendChild(card);
    });
  }

  function openOrder(product) {

    selectedProduct = product;

    orderTitle.textContent = product.name;
    orderDesc.textContent = product.description;
    orderPrice.textContent =
      product.price.toLocaleString() + " DH";

    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  filterButtons.forEach(button => {

    button.addEventListener("click", function () {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      renderProducts(button.dataset.filter);
    });

  });

  if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!selectedProduct) {
        return;
      }

      const formData = new FormData(orderForm);

      const name =
        formData.get("name") || "Not provided";

      const email =
        formData.get("email") || "Not provided";

      const business =
        formData.get("business") || "Not provided";

      const notes =
        formData.get("notes") || "No additional details";

      const message =
`🛒 NEW WEBSITE ORDER

🌐 THIMMO WEBFORGE

📦 Website:
${selectedProduct.name}

💰 Price:
${selectedProduct.price.toLocaleString()} DH

👤 Customer:
${name}

📧 Email:
${email}

🏢 Business / Brand:
${business}

📝 Customization:
${notes}

Please contact me to confirm the order.`;

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank");

    });

  }

  renderProducts();

});
