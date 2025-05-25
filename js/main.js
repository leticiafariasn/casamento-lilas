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
      downloadButton.addEventListener("click", async () => {
        try {
          // Verificar se as bibliotecas estão carregadas
          if (typeof html2canvas === "undefined" || typeof window.jsPDF === "undefined") {
            alert("Erro: Bibliotecas de PDF não carregadas. Recarregue a página e tente novamente.")
            return
          }

          // Mostrar loading no botão
          const originalText = downloadButton.textContent
          downloadButton.textContent = "Gerando PDF..."
          downloadButton.disabled = true

          // Criar conteúdo HTML para o PDF
          const pdfContent = document.getElementById("pdf-content")
          pdfContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #e8b4b8, #f2c1c7); border-radius: 10px;">
              <h1 style="color: #4a3b3c; font-family: 'Playfair Display', serif; font-size: 36px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Lívia & Mateus</h1>
              <p style="color: #8a7275; font-style: italic; font-size: 18px; margin: 10px 0 0 0;">30 de Outubro de 2025</p>
            </div>
            
            <div style="border: 3px solid #e8b4b8; border-radius: 15px; padding: 30px; margin-bottom: 30px; background: #faf6f7;">
              <h2 style="color: #c28285; text-align: center; margin-bottom: 25px; font-family: 'Playfair Display', serif; font-size: 24px;">✨ Confirmação de Presença ✨</h2>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                  <p style="margin: 10px 0; font-size: 14px;"><strong style="color: #c28285;">Nome:</strong><br>${formDataObj.nome}</p>
                  <p style="margin: 10px 0; font-size: 14px;"><strong style="color: #c28285;">Email:</strong><br>${formDataObj.email}</p>
                </div>
                <div>
                  <p style="margin: 10px 0; font-size: 14px;"><strong style="color: #c28285;">Telefone:</strong><br>${formDataObj.telefone}</p>
                  <p style="margin: 10px 0; font-size: 14px;"><strong style="color: #c28285;">Acompanhantes:</strong><br>${formDataObj.acompanhantes === "0" ? "Apenas eu" : formDataObj.acompanhantes}</p>
                </div>
              </div>
              
              ${
                formDataObj.mensagem
                  ? `
              <div style="margin-top: 20px; padding: 15px; background: #f5d6d9; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px;"><strong style="color: #c28285;">Mensagem:</strong><br>${formDataObj.mensagem}</p>
              </div>
              `
                  : ""
              }
            </div>
            
            <div style="background: linear-gradient(135deg, #f5d6d9, #e8b4b8); padding: 25px; border-radius: 15px; margin-bottom: 30px;">
              <h3 style="color: #4a3b3c; margin-bottom: 20px; text-align: center; font-family: 'Playfair Display', serif; font-size: 20px;">🌸 Informações do Evento 🌸</h3>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                  <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #4a3b3c;">Data:</strong><br>30 de Outubro de 2025</p>
                  <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #4a3b3c;">Horário:</strong><br>16:00</p>
                </div>
                <div>
                  <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #4a3b3c;">Local:</strong><br>Espaço Jardim das Flores</p>
                  <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #4a3b3c;">Endereço:</strong><br>Rua das Flores, 123<br>Jardim Primavera</p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; color: #8a7275; font-style: italic; padding: 20px; border-top: 2px solid #e8b4b8;">
              <p style="margin: 5px 0; font-size: 14px;">💕 Agradecemos por confirmar sua presença! 💕</p>
              <p style="margin: 5px 0; font-size: 14px;">Estamos ansiosos para celebrar este momento especial com você.</p>
            </div>
          `

          // Aguardar um pouco para o conteúdo renderizar
          await new Promise((resolve) => setTimeout(resolve, 100))

          // Capturar o elemento como imagem
          const canvas = await html2canvas(pdfContent, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
            allowTaint: true,
            width: 800,
            height: pdfContent.scrollHeight,
          })

          // Criar PDF
          const { jsPDF } = window.jsPDF
          const pdf = new jsPDF("p", "mm", "a4")

          const imgData = canvas.toDataURL("image/png")
          const imgWidth = 210 // A4 width in mm
          const pageHeight = 295 // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          let heightLeft = imgHeight

          let position = 0

          // Adicionar primeira página
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight

          // Adicionar páginas extras se necessário
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
          }

          // Salvar o PDF
          const fileName = `confirmacao-presenca-${formDataObj.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`
          pdf.save(fileName)

          // Restaurar botão
          downloadButton.textContent = originalText
          downloadButton.disabled = false
        } catch (error) {
          console.error("Erro ao gerar PDF:", error)
          alert("Erro ao gerar o PDF. Tente novamente.")

          // Restaurar botão
          downloadButton.textContent = "Baixar Confirmação em PDF"
          downloadButton.disabled = false
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
