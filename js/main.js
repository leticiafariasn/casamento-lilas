document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Hamburger menu toggle
  const hamburgerIcon = document.getElementById("hamburger-icon")
  const navMenu = document.getElementById("nav-menu")

  hamburgerIcon.addEventListener("click", function () {
    this.classList.toggle("open")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll("nav ul li a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerIcon.classList.remove("open")
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // RSVP form handling
  const rsvpForm = document.getElementById("rsvp-form")
  const thankYouMessage = document.getElementById("thank-you-message")

  // Form submission
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Fade out the form
      rsvpForm.style.opacity = "0"
      rsvpForm.style.transform = "translateY(20px)"

      setTimeout(() => {
        // Hide form and show thank you message
        rsvpForm.style.display = "none"
        thankYouMessage.style.display = "block"

        // Trigger reflow to ensure transition works
        void thankYouMessage.offsetWidth

        // Fade in thank you message
        thankYouMessage.style.opacity = "1"
      }, 500)

      // Here you would normally send the form data to a server
      // For this example, we're just showing the thank you message
    })
  }

  // Adjust info card height to match form height
  function adjustInfoCardHeight() {
    const form = document.querySelector(".rsvp-form")
    const thankYouMessage = document.querySelector(".thank-you-message")
    const infoCard = document.querySelector(".info-card")

    if (window.innerWidth >= 992 && form && infoCard) {
      // If form is visible, match its height
      if (form.style.display !== "none") {
        const formHeight = form.offsetHeight
        infoCard.style.height = `${formHeight}px`
      }
      // If thank you message is visible, match its height
      else if (thankYouMessage.style.display === "block") {
        const messageHeight = thankYouMessage.offsetHeight
        infoCard.style.height = `${messageHeight}px`
      }
    } else if (infoCard) {
      infoCard.style.height = "auto"
    }
  }

  // Run on load and resize
  window.addEventListener("load", adjustInfoCardHeight)
  window.addEventListener("resize", adjustInfoCardHeight)

  // Reveal animations on scroll
  const sections = document.querySelectorAll("section")

  function checkReveal() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top

      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add("visible")
      }
    })
  }

  // Check on load
  checkReveal()

  // Check on scroll
  window.addEventListener("scroll", checkReveal)

  // Add placeholder image for hero background if needed
  const hero = document.querySelector(".hero")
  if (hero) {
    const img = new Image()
    img.onload = () => {
      // Image loaded successfully
    }
    img.onerror = () => {
      // If image fails to load, use a fallback color
      hero.style.backgroundImage = "none"
      hero.style.backgroundColor = "#e8b4b8"
    }
    img.src = getComputedStyle(hero).backgroundImage.replace(/url$$['"]?(.*?)['"]?$$/gi, "$1")
  }
})
