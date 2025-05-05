document.addEventListener("DOMContentLoaded", function () {
  // Toggle service card details
  const toggleButtons = document.querySelectorAll(".btn-toggle");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetID = btn.getAttribute("data-target");
      const targetElement = document.getElementById(targetID);
      targetElement.style.display = (targetElement.style.display === "block") ? "none" : "block";
    });
  });

  // Testimonial Slider (Automatic)
  let currentSlide = 0;
  const testimonials = document.querySelectorAll(".testimonial");
  function showSlide(index) {
    testimonials.forEach((slide, i) => {
      slide.style.opacity = (i === index) ? "1" : "0";
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }
  showSlide(currentSlide);
  setInterval(nextSlide, 5000); // Change slide every 5 seconds

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Contact form validation and submission (demo)
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
    } else {
      alert("Thank you for contacting us, " + name + "!");
      contactForm.reset();
    }
  });
});
