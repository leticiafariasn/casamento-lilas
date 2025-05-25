
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
  const submitButton = document.querySelector(".btn-primary")

  if (rsvpForm && thankYouMessage) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (submitButton) {
        submitButton.innerHTML = '<img src="./images/loading.webp" class="loading" alt="Carregando...">'
        submitButton.disabled = true
      }

      const formData = new FormData(rsvpForm)
      const formDataObj = Object.fromEntries(formData.entries())

      const sendData = () => {
        return fetch("https://api.sheetmonkey.io/form/ri6NRsJ9mYsHBm1YZvXR5y", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObj),
        })
      }

      sendData()
        .then(() => {
          if (submitButton) {
            submitButton.innerHTML = "Confirmar Presença"
            submitButton.disabled = false
          }

          thankYouMessage.innerHTML = `
            <h3>Obrigado por confirmar sua presença, ${formDataObj.nome.toUpperCase()}!</h3>
            <p><strong>Email:</strong> ${formDataObj.email}</p>
            <p><strong>Telefone:</strong> ${formDataObj.telefone}</p>
            <p><strong>Acompanhantes:</strong> ${formDataObj.acompanhantes}</p>
            ${formDataObj.mensagem ? `<p><strong>Mensagem:</strong> ${formDataObj.mensagem}</p>` : ""}
            <button id="download-pdf" class="btn-primary" style="margin-top: 20px;">
              Baixar Confirmação em PDF
            </button>
          `;

          rsvpForm.style.opacity = "0"
          rsvpForm.style.transform = "translateY(20px)"

          setTimeout(() => {
            rsvpForm.style.display = "none"
            thankYouMessage.style.display = "block"
            void thankYouMessage.offsetWidth
            thankYouMessage.style.opacity = "1"
          }, 500)

          setTimeout(() => {
            const btn = document.getElementById("download-pdf");
            if (btn) {
              btn.addEventListener("click", () => {
                const element = document.getElementById("thank-you-message");
                element.style.transition = "none";
                element.style.display = "block";
                element.style.opacity = "1";
                element.style.transform = "none";

                const opt = {
                  margin: 0.5,
                  filename: `confirmacao-${formDataObj.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`,
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(element).save();
              });
            }
          }, 300)
        })
        .catch((error) => {
          console.error("Erro ao enviar o formulário:", error)
          if (submitButton) {
            submitButton.innerHTML = "Confirmar Presença"
            submitButton.disabled = false
          }
          alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.")
        })
    })
  }

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

  checkReveal()
  window.addEventListener("scroll", checkReveal)

  const hero = document.querySelector(".hero")
  if (hero) {
    const img = new Image()
    img.onload = () => {}
    img.onerror = () => {
      hero.style.backgroundImage = "none"
      hero.style.backgroundColor = "#e8b4b8"
    }
    img.src = getComputedStyle(hero).backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/gi, "$1")
  }
})

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled-blur", window.scrollY > 10);
});
