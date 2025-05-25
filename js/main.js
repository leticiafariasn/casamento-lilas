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

  // Configurar o botão de download PDF
  const setupPdfDownload = (formDataObj) => {
    const downloadButton = document.getElementById("download-pdf")
    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        // Criar um elemento temporário para o PDF com melhor estrutura
        const pdfContent = document.createElement("div")
        pdfContent.style.cssText = `
          padding: 40px;
          background-color: white;
          font-family: 'Poppins', sans-serif;
          color: #4a3b3c;
          max-width: 600px;
          margin: 0 auto;
        `

        pdfContent.innerHTML = `
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c28285; font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 10px;">Lívia & Mateus</h1>
            <p style="color: #8a7275; font-style: italic; font-size: 1.1rem;">30 de Outubro de 2025</p>
          </div>
          
          <div style="border: 2px solid #e8b4b8; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #c28285; text-align: center; margin-bottom: 20px; font-family: 'Playfair Display', serif;">Confirmação de Presença</h2>
            
            <div style="margin-bottom: 15px;">
              <strong>Nome:</strong> ${formDataObj.nome}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>Email:</strong> ${formDataObj.email}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>Telefone:</strong> ${formDataObj.telefone}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>Número de acompanhantes:</strong> ${formDataObj.acompanhantes}
            </div>
            
            ${
              formDataObj.mensagem
                ? `
            <div style="margin-bottom: 15px;">
              <strong>Mensagem:</strong> ${formDataObj.mensagem}
            </div>
            `
                : ""
            }
          </div>
          
          <div style="background-color: #f5d6d9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #c28285; margin-bottom: 15px; text-align: center;">Informações do Evento</h3>
            
            <div style="margin-bottom: 10px;">
              <strong>Data:</strong> 30 de Outubro de 2025
            </div>
            
            <div style="margin-bottom: 10px;">
              <strong>Horário:</strong> 16:00
            </div>
            
            <div style="margin-bottom: 10px;">
              <strong>Local:</strong> Espaço Jardim das Flores
            </div>
            
            <div>
              <strong>Endereço:</strong> Rua das Flores, 123 - Jardim Primavera
            </div>
          </div>
          
          <div style="text-align: center; color: #8a7275; font-style: italic;">
            <p>Agradecemos por confirmar sua presença!</p>
            <p>Estamos ansiosos para celebrar este momento especial com você.</p>
          </div>
        `

        // Adicionar o elemento temporário ao body (invisível)
        pdfContent.style.position = "absolute"
        pdfContent.style.left = "-9999px"
        pdfContent.style.top = "0"
        document.body.appendChild(pdfContent)

        // Configurações do PDF
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: `confirmacao-presenca-${formDataObj.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`,
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            width: 600,
            height: 800,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
          },
        }

        // Gerar o PDF
        if (typeof html2pdf !== "undefined") {
          html2pdf()
            .set(opt)
            .from(pdfContent)
            .save()
            .then(() => {
              // Remover o elemento temporário
              document.body.removeChild(pdfContent)
            })
            .catch((error) => {
              console.error("Erro ao gerar PDF:", error)
              document.body.removeChild(pdfContent)
              alert("Erro ao gerar o PDF. Tente novamente.")
            })
        } else {
          console.error("html2pdf não está carregado")
          document.body.removeChild(pdfContent)
          alert("Erro: Biblioteca de PDF não carregada.")
        }
      })
    }
  }

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
            /*
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
            */

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

            // Chamar a função de configuração do PDF passando os dados do formulário
            setupPdfDownload(formDataObj)

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
})

window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  header.classList.toggle("scrolled-blur", window.scrollY > 10)
})
