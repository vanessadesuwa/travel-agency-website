document.addEventListener("DOMContentLoaded", () => {
  // Counter animation for the Experience section
  const stats = document.querySelectorAll(".stat__number");

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.5, // trigger when 50% of the element is visible
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNumber = parseInt(target.getAttribute("data-target"));
        let currentNumber = 0;

        const updateCounter = () => {
          const increment = Math.ceil(targetNumber / 100);
          currentNumber += increment;

          if (currentNumber < targetNumber) {
            target.innerText = `${currentNumber}+`;
            requestAnimationFrame(updateCounter);
          } else {
            target.innerText = `${targetNumber}+`;
          }
        };

        updateCounter();
        observer.unobserve(target); // Stop observing once animated
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    counterObserver.observe(stat);
  });
});

const header = document.querySelector(".header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  // Add background to header when scrolling down
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Hide header on scroll down, show on scroll up
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    header.classList.add("header--hidden");
  } else {
    // Scrolling up
    header.classList.remove("header--hidden");
  }

  lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY; // For Mobile or negative scrolling
});
