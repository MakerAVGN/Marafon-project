document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".article-card:not(.article-card--featured)"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  const searchBtn = document.getElementById("searchBtn");
  const searchPanel = document.getElementById("searchPanel");

  searchBtn.addEventListener("click", function () {
    searchPanel.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".search-panel") &&
      !event.target.closest(".header__search-btn")
    ) {
      searchPanel.classList.remove("active");
    }
  });

  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("focus", function () {
    const results = this.nextElementSibling;
    results.style.opacity = "1";
    results.style.visibility = "visible";
    results.style.transform = "translateY(0)";
  });

  searchInput.addEventListener("blur", function (e) {
    setTimeout(() => {
      const results = this.nextElementSibling;
      results.style.opacity = "0";
      results.style.visibility = "hidden";
      results.style.transform = "translateY(-1rem)";
    }, 200);
  });

  const burgerMenu = document.getElementById("burgerMenu");
  const headerMenu = document.getElementById("headerMenu");
  const header = document.querySelector(".header");

  burgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    headerMenu.classList.toggle("active");
    header.classList.toggle("menu-open");
    document.body.style.overflow = headerMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".header__menu") &&
      !event.target.closest(".burger-menu") &&
      headerMenu.classList.contains("active")
    ) {
      burgerMenu.classList.remove("active");
      headerMenu.classList.remove("active");
      header.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
  });

  const paginationLinks = document.querySelectorAll(".pagination__link");
  const firstPageBlocks = document.querySelectorAll(
    ".article-cards-container:nth-child(2), .article-cards-row:nth-child(3)"
  );
  const secondPageBlocks = document.querySelectorAll(
    ".article-cards-container:nth-child(5), .article-cards-row:nth-child(6)"
  );

  secondPageBlocks.forEach((block) => {
    block.style.display = "none";
  });

  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  function updateMediaQuery(showBlocks) {
    const mediaQuery = `
      @media (max-width: 1024px) {
        .articles__list .article-cards-container:nth-of-type(3),
        .articles__list .article-cards-row:nth-of-type(4) {
          display: ${showBlocks ? "flex" : "none"};
        }
      }
    `;
    styleSheet.textContent = mediaQuery;
  }

  updateMediaQuery(false);

  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (window.innerWidth <= 700) {
        if (this.classList.contains("pagination__link--next")) {
          document.querySelector(".articles__list").classList.add("show-more");

          secondPageBlocks.forEach((block) => {
            block.style.opacity = "0";
            block.style.transform = "translateY(20px)";

            setTimeout(() => {
              block.style.opacity = "1";
              block.style.transform = "translateY(0)";
              block.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            }, 0);
          });
          this.parentElement.style.display = "none";
        }
      } else {
        paginationLinks.forEach((l) =>
          l.classList.remove("pagination__link--active")
        );
        this.classList.add("pagination__link--active");

        if (this.textContent === "1") {
          document
            .querySelector(".articles__list")
            .classList.remove("show-more");
          firstPageBlocks.forEach((block) => {
            block.style.display = "flex";
            block.style.opacity = "1";
          });
          secondPageBlocks.forEach((block) => {
            block.style.display = "none";
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (this.textContent === "2") {
          document.querySelector(".articles__list").classList.add("show-more");
          firstPageBlocks.forEach((block) => {
            block.style.display = "none";
          });
          secondPageBlocks.forEach((block) => {
            block.style.display = "flex";
            block.style.opacity = "0";
            block.style.transform = "translateY(20px)";

            setTimeout(() => {
              block.style.opacity = "1";
              block.style.transform = "translateY(0)";
              block.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            }, 0);
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    });
  });

  const nextButton = document.querySelector(".pagination__link--next");

  function updateButtonText() {
    if (window.innerWidth <= 700) {
      nextButton.textContent = "Показать еще 6";
    } else {
      nextButton.textContent = "Следующая";
    }
  }

  updateButtonText();

  window.addEventListener("resize", updateButtonText);
});
