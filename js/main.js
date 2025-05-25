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
  const submitButton = document.getElementById("submit-button")

  // Form submission
  if (rsvpForm && thankYouMessage) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Mostrar indicador de carregamento se o botão existir
      if (submitButton) {
        submitButton.innerHTML = '<img src="./images/loading.webp" class="loading" alt="Carregando...">'
        submitButton.disabled = true
      }

      // Coletar dados do formulário
      const formData = new FormData(rsvpForm)
      const formDataObj = Object.fromEntries(formData.entries())

      // Enviar dados para a API (se necessário)
      // Exemplo: enviar para SheetMonkey ou outro serviço
      const sendData = () => {
        return new Promise((resolve, reject) => {
          // Simulando envio de dados (substitua por sua implementação real)
          setTimeout(() => {
            // Descomente e adapte o código abaixo para envio real
            fetch("https://api.sheetmonkey.io/form/ri6NRsJ9mYsHBm1YZvXR5y", {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formDataObj),
            })
              .then(resolve)
              .catch(reject)

            // Para teste, apenas resolve após 1 segundo
            resolve()
          }, 1000)
        })
      }

      // Processar envio
      sendData()
        .then(() => {
          // Restaurar botão se necessário
          if (submitButton) {
            submitButton.innerHTML = "Confirmar Presença"
            submitButton.disabled = false
          }

          // Fade out the form
          rsvpForm.style.opacity = "0"
          rsvpForm.style.transform = "translateY(20px)"

          setTimeout(() => {
            // Hide form and show thank you message
            rsvpForm.style.display = "none"
            thankYouMessage.innerHTML = `
            <h3>Obrigado por confirmar sua presença, ${formDataObj.nome}!</h3>
            <p><strong>Email:</strong> ${formDataObj.email}</p>
            <p><strong>Telefone:</strong> ${formDataObj.telefone}</p>
            <p><strong>Acompanhantes:</strong> ${formDataObj.acompanhantes}</p>
            ${formDataObj.mensagem ? `<p><strong>Mensagem:</strong> ${formDataObj.mensagem}</p>` : ""}
            <button id="download-pdf" class="btn-primary" style="margin-top: 20px;">
              Baixar Confirmação em PDF
            </button>
            `

            thankYouMessage.style.display = "block"

            // Configurar o botão de download PDF
            const setupPdfDownload = () => {
              const downloadButton = document.getElementById("download-pdf")
              if (downloadButton) {
                downloadButton.addEventListener("click", () => {
                  const element = document.getElementById("thank-you-message")

                  // Garantir que o elemento esteja completamente visível
                  const originalTransition = element.style.transition
                  const originalOpacity = element.style.opacity
                  const originalDisplay = element.style.display

                  // Forçar visibilidade total
                  element.style.transition = "none"
                  element.style.opacity = "1"
                  element.style.display = "block"

                  // Aguardar um frame para garantir que o DOM foi atualizado
                  requestAnimationFrame(() => {
                    const opt = {
                      margin: [0.5, 0.5, 0.5, 0.5],
                      filename: "confirmacao-presenca-livia-mateus.pdf",
                      image: {
                        type: "jpeg",
                        quality: 0.98,
                      },
                      html2canvas: {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: "#ffffff",
                      },
                      jsPDF: {
                        unit: "in",
                        format: "a4",
                        orientation: "portrait",
                      },
                    }

                    // Check if html2pdf is defined before using it
                    if (typeof html2pdf !== "undefined") {
                      html2pdf()
                        .set(opt)
                        .from(element)
                        .save()
                        .then(() => {
                          // Restaurar estilos originais após a geração
                          element.style.transition = originalTransition
                          element.style.opacity = originalOpacity
                          element.style.display = originalDisplay
                        })
                    } else {
                      console.error("html2pdf is not defined. Make sure the library is included.")
                    }
                  })
                })
              }
            }

            // Chamar a função após criar o botão
            setupPdfDownload()

            // Trigger reflow to ensure transition works
            void thankYouMessage.offsetWidth

            // Fade in thank you message
            thankYouMessage.style.opacity = "1"
          }, 500)
        })
        .catch((error) => {
          console.error("Erro ao enviar o formulário:", error)

          // Restaurar botão
          if (submitButton) {
            submitButton.innerHTML = "Confirmar Presença"
            submitButton.disabled = false
          }

          // Mostrar mensagem de erro
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

window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  header.classList.toggle("scrolled-blur", window.scrollY > 10)
})
