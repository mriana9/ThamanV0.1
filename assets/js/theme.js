//change to larger screen
import {
  updateCounter,
  showLoginModal,
  hideLoginModal,
  showSearchModal,
  hideSearchModal,
  showMenuBarOffcanvas,
  hideMenuBarOffcanvas,
  menuBarOffcanvasDisplayData,
  navbarLgListDisplayData,
  showSettingsOffcanvas,
  hideSettingsOffcanvas,
  darkTheme,
  lightTheme,
  changePrimaryColor,
  DisplayCategoryCards,
  displayBestProductsData,
  displayTrendingProductsData,
  displayFeaturedProduct,
  displaySliderProductsData,
} from "./script.js";

//theme
darkTheme();
lightTheme();
changePrimaryColor();
//header counter down
updateCounter();

//login modal
showLoginModal();
hideLoginModal();

//search modal
showSearchModal();
hideSearchModal();

//menu offcanvas
showMenuBarOffcanvas();
hideMenuBarOffcanvas();
menuBarOffcanvasDisplayData();

//navbar lg list
navbarLgListDisplayData();

//settings offcanvas
showSettingsOffcanvas();
hideSettingsOffcanvas();

//category cards
DisplayCategoryCards();

//best products
displayBestProductsData();

//trending products
displayTrendingProductsData();

//features products
displayFeaturedProduct();

//slider products
displaySliderProductsData();

//hero section swiper
var heroSwiper = new Swiper(".mySwiper.hero-swiper", {
  loop: true,
  effect: "fade",
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  on: {
    slideChangeTransitionStart: function () {
      document.querySelectorAll(".hero-section .swiper-slide [data-aos]").forEach((el) => {
        el.classList.remove("aos-animate"); // Remove animation
      });
    },
    slideChangeTransitionEnd: function () {
      AOS.refresh(); // Refresh AOS
      document
        .querySelectorAll(".hero-section .swiper-slide-active [data-aos]")
        .forEach((el) => {
          el.classList.add("aos-animate"); // Re-add animation to active slide
        });
    },
  },
});

//AOS Animations
AOS.init();

//features slider
var productsSwiper = new Swiper(".mySwiper.products-slider", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    340: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3.5,
    },
    1024: {
      slidesPerView: 4.5,
    },
  },
});

var sliderBannerSwiper = new Swiper(".mySwiper.banner-slide", {
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  on: {
    slideChangeTransitionStart: function () {
      document.querySelectorAll(".slider-banner .swiper-slide [data-aos]").forEach((el) => {
        el.classList.remove("aos-animate"); // Remove animation
      });
    },
    slideChangeTransitionEnd: function () {
      AOS.refresh(); // Refresh AOS
      document
        .querySelectorAll(".slider-banner .swiper-slide-active [data-aos]")
        .forEach((el) => {
          el.classList.add("aos-animate"); // Re-add animation to active slide
        });
    },
  },
});
