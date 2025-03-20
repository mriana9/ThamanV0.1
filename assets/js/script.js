let htmlContent = document.querySelector("html");
let darkBtn = document.querySelector(".dark-btn");
let lightBtn = document.querySelector(".light-btn");

let loginModalOverlay = document.querySelector(".login-modal-overlay");
let loginModal = document.querySelector(".login-modal");
let closeBtn = document.querySelector(".close-btn");
let loginBtn = document.querySelectorAll(".login-btn");

let searchBtn = document.querySelector(".sm-search-btn");
let searchModalOverlay = document.querySelector(".search-modal-overlay");

let menuBarBtn = document.querySelector(".menu-bar");
let menuBarOffcanvasOverlay = document.querySelector(
  ".menu-bar-offcanvas-overlay"
);
let closeMenuBarBtn = document.querySelector(".offcanvas-close-btn");
let menuList = document.querySelector(".menu-bar-offcanvas-list");

let settingOffcanvas = document.querySelector(".setting-offcanvas");
let settingBtn = document.querySelector(".setting-btn");
let closeSetting = document.querySelector(".close-setting-btn");

let allCategoryCards = document.querySelector(".all-category-cards");
let bestProductsContainer = document.querySelector(".product-container");
let trendingProductsContainer = document.querySelector(
  ".trending-product-container"
);

let featureProductsContainer = document.querySelector(
  ".featured-product-container"
);

let sliderProductsContainer = document.querySelector(
  ".products-slider-container"
);

import {
  menuBarData,
  categoryCards,
  products,
  featuredProducts,
} from "./data.js";

// header count down
const startCountdown = (targetDate) => {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString();
  //console.log("days",days) ;
  document.getElementById("hours").innerText = hours.toString();
  document.getElementById("minutes").innerText = minutes.toString();
  document.getElementById("seconds").innerText = seconds.toString();
};

//header counter down
export const updateCounter = () => {
  const countdownDate = new Date(2025, 3, 1, 0, 0, 0).getTime(); //  (YYYY, MM-1, DD, HH, MM, SS
  setInterval(() => startCountdown(countdownDate), 1000);
};

//show login modal
export const showLoginModal = () => {
  loginBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      settingOffcanvas.classList.remove("show");
      searchModalOverlay.classList.remove("show");
      menuBarOffcanvasOverlay.classList.remove("show");
      loginModalOverlay.classList.toggle("show");
      htmlContent.classList.toggle("hide-scroll");
      loginModal.classList.toggle("zoom");
    });
  });
};

//close login modal
export const hideLoginModal = () => {
  closeBtn.addEventListener("click", function () {
    loginModalOverlay.classList.remove("show");
    htmlContent.classList.toggle("hide-scroll");
    loginModal.classList.toggle("zoom");
  });
};

//show search modal
export const showSearchModal = () => {
  searchBtn.addEventListener("click", function () {
    //console.log("search modal");
    searchModalOverlay.classList.toggle("show");
    settingOffcanvas.classList.remove("show");
    htmlContent.classList.toggle("hide-scroll");
    loginModalOverlay.classList.remove("show");
    //menuBarOffcanvasOverlay.classList.remove("show");
  });
};

//close search modal
export const hideSearchModal = () => {
  searchModalOverlay.addEventListener("click", function (event) {
    //console.log("search modal");
    // Only close the modal if the user clicks directly on the overlay
    if (event.target === searchModalOverlay) {
      searchModalOverlay.classList.remove("show");
    }
  });
};

//show menu bar offcanvas
export const showMenuBarOffcanvas = () => {
  menuBarBtn.addEventListener("click", function () {
    loginModalOverlay.classList.remove("show");
    searchModalOverlay.classList.remove("show");
    settingOffcanvas.classList.remove("show");
    menuBarOffcanvasOverlay.classList.toggle("show");
    htmlContent.classList.toggle("hide-scroll");
  });
};

//close menu bar offcanvas
export const hideMenuBarOffcanvas = () => {
  closeMenuBarBtn.addEventListener("click", function () {
    menuBarOffcanvasOverlay.classList.remove("show");
    htmlContent.classList.toggle("hide-scroll");
  });
};

//menu bar offcanvas display data
export const menuBarOffcanvasDisplayData = () => {
  let menuBarItem = ``;
  menuList.innerHTML = "";

  menuBarData.forEach((item, index) => {
    if (item.options) {
      menuBarItem = `
      <li class="d-flex justify-content-between align-items-center">
        <a href="#" class="menu-list-item" rel="noopener noreferrer"    
        title="${item.title}">${item.title}</a>
        <button class="toggle-btn" data-index="${index}">
          <i class="bi bi-chevron-left"></i>
        </button>
      </li>
      <ul id="options-${index}" class="options-list d-none">
        ${item.options
          .map(
            (option) =>
              `<li><a href="#" class="menu-list-item" rel="noopener noreferrer" title="${option.title}">${option.title}</a></li>`
          )
          .join("")}
      </ul>
      `;
    } else {
      menuBarItem = `
      <li>
        <a href="#"  class="${
          item.status ? "active" : "menu-list-item"
        }"  rel="noopener noreferrer"  title="${item.title}">${item.title}</a>
      </li>
      `;
    }

    menuList.innerHTML += menuBarItem;
  });

  // Attach event listeners after rendering the menu items
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      toggleOptions(index, this);
    });
  });
};

// Function to toggle options list visibility
// window to make toggleOptions function globally available
window.toggleOptions = (index, btn) => {
  const optionsList = document.getElementById(`options-${index}`);
  if (optionsList) {
    optionsList.classList.toggle("d-none");

    const icon = btn.querySelector("i");
    if (optionsList.classList.contains("d-none")) {
      icon.classList.replace("bi-chevron-down", "bi-chevron-left");
    } else {
      icon.classList.replace("bi-chevron-left", "bi-chevron-down");
    }
  }
};

//navbar lg list display data
export const navbarLgListDisplayData = () => {
  const navbarList = document.querySelector(".lg-navbar-item");
  navbarList.innerHTML = "";

  menuBarData.forEach((item) => {
    let menuItem = "";

    if (item.options) {
      menuItem = `
        <li class="lg-navbar-item dropdown">
          <a href="#" class="dropdown-toggle">
            ${item.title}
            <i class="bi bi-chevron-down"></i>
          </a>
          <ul class="dropdown-menu">
            ${item.options
              .map((option) => `<li><a href="#">${option.title}</a></li>`)
              .join("")}
          </ul>
        </li>
      `;
    } else {
      menuItem = `
        <li class="lg-navbar-item">
          <a href="#" class="${item.status ? "active" : "menu-item"}">
            ${item.title}
          </a>
        </li>
      `;
    }

    navbarList.innerHTML += menuItem;
  });

  // Hover event for dropdown toggle
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");
    const icon = toggle.querySelector("i");

    dropdown.addEventListener("mouseenter", () => {
      menu.classList.toggle("show");
      icon.classList.replace("bi-chevron-down", "bi-chevron-up");
    });

    dropdown.addEventListener("mouseleave", () => {
      menu.classList.remove("show");
      icon.classList.replace("bi-chevron-up", "bi-chevron-down");
    });
  });
};

//show settings offcanvas
export const showSettingsOffcanvas = () => {
  settingBtn.addEventListener("click", function () {
    loginModalOverlay.classList.remove("show");
    menuBarOffcanvasOverlay.classList.remove("show");
    searchModalOverlay.classList.remove("show");
    settingOffcanvas.classList.toggle("show");
    htmlContent.classList.toggle("hide-scroll");
  });
};

//close settings offcanvas
export const hideSettingsOffcanvas = () => {
  closeSetting.addEventListener("click", function () {
    settingOffcanvas.classList.remove("show");
    htmlContent.classList.toggle("hide-scroll");
  });
};

let body = document.querySelector("body");
let nav = document.querySelector("nav");
let lgNavbarList = document.querySelector(".lg-navbar-list");
let smNavbar = document.querySelector(".sm-navbar");
let categoryGallery = document.querySelector(".category-gallery");
let ourServices = document.querySelector(".our-services");
let productBanner = document.querySelector(".product-banner");
let productsTabs = document.querySelector(".products-tabs");
let questions = document.querySelector(".questions");

//add dark theme
export const darkTheme = () => {
  darkBtn.onclick = () => {
    body.classList.add("dark");
    nav.classList.add("dark");
    lgNavbarList.classList.add("dark");
    loginModal.classList.add("dark");
    settingOffcanvas.classList.add("dark");
    searchModalOverlay.classList.add("dark");
    menuBarOffcanvasOverlay.classList.add("dark");
    smNavbar.classList.add("dark");
    categoryGallery.classList.add("dark");
    allCategoryCards.classList.add("dark");
    bestProductsContainer.classList.add("dark");
    trendingProductsContainer.classList.add("dark");
    sliderProductsContainer.classList.add("dark");
    ourServices.classList.add("dark");
    featureProductsContainer.classList.add("dark");
    productBanner.classList.add("dark");
    productsTabs.classList.add("dark");
    questions.classList.add("dark");
  };
};

//add light theme
export const lightTheme = () => {
  lightBtn.onclick = () => {
    body.classList.remove("dark");
    nav.classList.remove("dark");
    lgNavbarList.classList.remove("dark");
    loginModal.classList.remove("dark");
    settingOffcanvas.classList.remove("dark");
    searchModalOverlay.classList.remove("dark");
    menuBarOffcanvasOverlay.classList.remove("dark");
    smNavbar.classList.remove("dark");
    categoryGallery.classList.remove("dark");
    allCategoryCards.classList.remove("dark");
    bestProductsContainer.classList.remove("dark");
    trendingProductsContainer.classList.remove("dark");
    sliderProductsContainer.classList.remove("dark");
    ourServices.classList.remove("dark");
    featureProductsContainer.classList.remove("dark");
    productBanner.classList.remove("dark");
    productsTabs.classList.remove("dark");
    questions.classList.remove("dark");
  };
};

//change primary color
export const changePrimaryColor = () => {
  document.querySelectorAll(".colors li").forEach((item) => {
    item.addEventListener("click", function () {
      const selectedColor = this.getAttribute("data-color");
      document.documentElement.style.setProperty(
        "--primary-color",
        selectedColor
      );
    });
  });
};

//display category cards data
export const DisplayCategoryCards = () => {
  categoryCards.forEach((card) => {
    const cardHTML = `
        <div class="col-lg-3 col-sm-6">
            <div class="card-box">
                <div class="image-box">
                    <img src="${card.imgUrl}" loading="lazy" alt="card-img">
                </div>
                <div class="info">
                    <h3>${card.title}</h3>
                    <p>${card.capacity} منتج متوفر</p>
                </div>
            </div>
        </div>
    `;
    allCategoryCards.innerHTML += cardHTML;
  });
};

//display best products data
export const displayBestProductsData = () => {
  products.slice(0, 11).forEach((product) => {
    const productHTML = `
      <div class="col-lg-2 col-md-4 col-sm-6">
        <div ${
          product.soldOut
            ? 'class="best-products-card-box product-sold-out"'
            : 'class="best-products-card-box"'
        }>
          <div class="image">
          <img src="${product.image}" alt="${product.image}" loading="lazy" />
            <div class="add-wishlist d-flex justify-content-center align-items-center">
              <i class="bi bi-suit-heart mt-2 text-secondary"></i>
            </div>
            <div ${product.soldOut ? 'class="sold-out"' : ""}>${
      product.soldOut ? "نفدت الكمية" : ""
    } </div>
          </div>
          <div class="body">
            ${
              product.discount
                ? `<div class="discount">${product.discount}</div>`
                : ""
            }
            <h3 class="title">
              <a href="././product-details.html">${product.name}</a>
            </h3>
            <div class="price d-flex gap-2 align-items-center justify-content-start">
              <div class="new-price">${product.price}$</div>
              ${
                product.oldPrice
                  ? `<div class="old-price">${product.oldPrice}$</div>`
                  : ""
              }
            </div>
            <div class="all-rating d-flex justify-content-start gap-2">
              <ul class="rating d-flex p-0 m-0">
                ${generateStars(product.rating)}
              </ul>
              <p>(${product.reviews} تقييمات)</p>
            </div>
            <div class="add-cart d-flex justify-content-center align-items-center">
            <button ${product.soldOut ? 'disabled class="disabled"' : ""}>${
      product.soldOut ? "نفدت الكمية" : "إضافة للسلة"
    }</button>
            </div>
          </div>
        </div>
      </div>
    `;
    bestProductsContainer.innerHTML += productHTML;
  });
};

//display trending products data
export const displayTrendingProductsData = () => {
  products.slice(0, 12).forEach((product) => {
    const productHTML = `
      <div class="col-lg-2 col-md-4 col-sm-6">
        <div ${
          product.soldOut
            ? 'class="best-products-card-box product-sold-out"'
            : 'class="best-products-card-box"'
        }>
          <div class="image">
          <img src="${product.image}" alt="${product.image}" loading="lazy" />
            <div class="add-wishlist d-flex justify-content-center align-items-center">
              <i class="bi bi-suit-heart mt-2 text-secondary"></i>
            </div>
            <div ${product.soldOut ? 'class="sold-out"' : ""}>${
      product.soldOut ? "نفدت الكمية" : ""
    } </div>
          </div>
          <div class="body">
            ${
              product.discount
                ? `<div class="discount">${product.discount}</div>`
                : ""
            }
            <h3 class="title">
              <a href="././product-details.html">${product.name}</a>
            </h3>
            <div class="price d-flex gap-2 align-items-center justify-content-start">
              <div class="new-price">${product.price}$</div>
              ${
                product.oldPrice
                  ? `<div class="old-price">${product.oldPrice}$</div>`
                  : ""
              }
            </div>
            <div class="all-rating d-flex justify-content-start gap-2">
              <ul class="rating d-flex p-0 m-0">
                ${generateStars(product.rating)}
              </ul>
              <p>(${product.reviews} تقييمات)</p>
            </div>
            <div class="add-cart d-flex justify-content-center align-items-center">
            <button ${product.soldOut ? 'disabled class="disabled"' : ""}>${
      product.soldOut ? "نفدت الكمية" : "إضافة للسلة"
    }</button>
            </div>
          </div>
        </div>
      </div>
    `;
    trendingProductsContainer.innerHTML += productHTML;
  });
};

function generateStars(rating) {
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      starsHTML += `<li><i class="bi bi-star-fill"></i></li>`;
    } else {
      starsHTML += `<li><i class="bi bi-star"></i></li>`;
    }
  }
  return starsHTML;
}

//display featured products
export const displayFeaturedProduct = () => {
  featuredProducts.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="featured-card">
          <img src="${product.image}">
          <div class="info d-flex justify-content-between align-items-center">
            <div>
                <h3>${product.name}</h3>
                <p>${product.stock} منتج متوفر</p>
            </div>

            <div class="icon d-flex justify-content-center align-items-center"><i class="bi bi-arrow-up-left pt-2"></i></div>
            </div>
        </div>
      </div>
    `;
    featureProductsContainer.innerHTML += productHTML;
  });
};

//display slider products
export const displaySliderProductsData = () => {
  products.forEach((product) => {
    const productHTML = `
      <div class="swiper-slide">
        <div ${
          product.soldOut
            ? 'class="best-products-card-box product-sold-out"'
            : 'class="best-products-card-box"'
        }>
          <div class="image">
          <img src="${product.image}" alt="${product.image}" loading="lazy" />
            <div class="add-wishlist d-flex justify-content-center align-items-center">
              <i class="bi bi-suit-heart mt-2 text-secondary"></i>
            </div>
            <div ${product.soldOut ? 'class="sold-out"' : ""}>${
      product.soldOut ? "نفدت الكمية" : ""
    } </div>
          </div>
          <div class="body">
            ${
              product.discount
                ? `<div class="discount">${product.discount}</div>`
                : ""
            }
            <h3 class="title">
              <a href="././product-details.html">${product.name}</a>
            </h3>
            <div class="price d-flex gap-2 align-items-center justify-content-start">
              <div class="new-price">${product.price}$</div>
              ${
                product.oldPrice
                  ? `<div class="old-price">${product.oldPrice}$</div>`
                  : ""
              }
            </div>
            <div class="all-rating d-flex justify-content-start gap-2">
              <ul class="rating d-flex p-0 m-0">
                ${generateStars(product.rating)}
              </ul>
              <p>(${product.reviews} تقييمات)</p>
            </div>
            <div class="add-cart d-flex justify-content-center align-items-center">
            <button ${product.soldOut ? 'disabled class="disabled"' : ""}>${
      product.soldOut ? "نفدت الكمية" : "إضافة للسلة"
    }</button>
            </div>
          </div>
        </div>
      </div>
    `;
    sliderProductsContainer.innerHTML += productHTML;
  });
};
