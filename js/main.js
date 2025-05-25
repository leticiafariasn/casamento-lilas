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
          // Mostrar loading no botão
          const originalText = downloadButton.textContent
          downloadButton.textContent = "Gerando PDF..."
          downloadButton.disabled = true

          // Carregar jsPDF dinamicamente
          await window.loadJsPDF()

          const { jsPDF } = window.jsPDF
          const doc = new jsPDF()

          // Configurar cores do tema
          const primaryColor = [196, 130, 133] // #c28285
          const primaryDark = [212, 145, 154] // #d4919a
          const textColor = [74, 59, 60] // #4a3b3c
          const lightColor = [138, 114, 117] // #8a7275
          const bgColor = [245, 214, 217] // #f5d6d9

          // Configurar página
          const pageWidth = doc.internal.pageSize.getWidth()
          const pageHeight = doc.internal.pageSize.getHeight()

          // Background suave
          doc.setFillColor(...bgColor)
          doc.rect(0, 0, pageWidth, pageHeight, "F")

          // Header decorativo
          doc.setFillColor(...primaryColor)
          doc.rect(0, 0, pageWidth, 25, "F")

          // Título principal
          doc.setFontSize(28)
          doc.setTextColor(255, 255, 255)
          doc.setFont("helvetica", "bold")
          doc.text("Lívia & Mateus", pageWidth / 2, 18, { align: "center" })

          // Data do casamento
          doc.setFontSize(16)
          doc.setTextColor(...textColor)
          doc.setFont("helvetica", "italic")
          doc.text("30 de Outubro de 2025", pageWidth / 2, 40, { align: "center" })

          // Ornamento decorativo
          doc.setDrawColor(...primaryColor)
          doc.setLineWidth(1)
          doc.line(50, 50, pageWidth - 50, 50)

          // Pequenos círculos decorativos
          doc.setFillColor(...primaryColor)
          doc.circle(pageWidth / 2 - 20, 50, 2, "F")
          doc.circle(pageWidth / 2, 50, 3, "F")
          doc.circle(pageWidth / 2 + 20, 50, 2, "F")

          // Título da seção
          doc.setFontSize(22)
          doc.setTextColor(...primaryDark)
          doc.setFont("helvetica", "bold")
          doc.text("Confirmação de Presença", pageWidth / 2, 70, { align: "center" })

          // Caixa principal de informações
          doc.setFillColor(255, 255, 255)
          doc.setDrawColor(...primaryColor)
          doc.setLineWidth(2)
          doc.roundedRect(20, 85, pageWidth - 40, 90, 5, 5, "FD")

          // Informações do convidado
          doc.setFontSize(14)
          doc.setTextColor(...textColor)
          doc.setFont("helvetica", "normal")

          let yPosition = 105
          const lineHeight = 15
          const leftMargin = 30

          // Nome
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Nome:", leftMargin, yPosition)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          doc.text(formDataObj.nome, leftMargin + 25, yPosition)

          yPosition += lineHeight

          // Email
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Email:", leftMargin, yPosition)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          doc.text(formDataObj.email, leftMargin + 25, yPosition)

          yPosition += lineHeight

          // Telefone
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Telefone:", leftMargin, yPosition)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          doc.text(formDataObj.telefone, leftMargin + 35, yPosition)

          yPosition += lineHeight

          // Acompanhantes
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Acompanhantes:", leftMargin, yPosition)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          const acompanhantesText = formDataObj.acompanhantes === "0" ? "Apenas eu" : formDataObj.acompanhantes
          doc.text(acompanhantesText, leftMargin + 55, yPosition)

          // Mensagem (se houver)
          if (formDataObj.mensagem && formDataObj.mensagem.trim() !== "") {
            yPosition += lineHeight + 5
            doc.setFont("helvetica", "bold")
            doc.setTextColor(...primaryDark)
            doc.text("Mensagem:", leftMargin, yPosition)
            yPosition += 10
            doc.setFont("helvetica", "normal")
            doc.setTextColor(...textColor)
            doc.setFontSize(12)

            // Quebrar texto longo em múltiplas linhas
            const splitMessage = doc.splitTextToSize(formDataObj.mensagem, pageWidth - 60)
            doc.text(splitMessage, leftMargin, yPosition)
          }

          // Seção de informações do evento
          yPosition = 195
          doc.setFillColor(...bgColor)
          doc.setDrawColor(...primaryColor)
          doc.setLineWidth(1)
          doc.roundedRect(20, yPosition, pageWidth - 40, 70, 5, 5, "FD")

          yPosition += 20
          doc.setFontSize(18)
          doc.setTextColor(...primaryDark)
          doc.setFont("helvetica", "bold")
          doc.text("Informações do Evento", pageWidth / 2, yPosition, { align: "center" })

          yPosition += 20
          doc.setFontSize(12)
          doc.setTextColor(...textColor)
          doc.setFont("helvetica", "normal")

          // Informações do evento em duas colunas
          const col1X = 30
          const col2X = pageWidth / 2 + 10

          // Coluna 1
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Data:", col1X, yPosition)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          doc.text("30 de Outubro de 2025", col1X, yPosition + 10)

          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Horário:", col1X, yPosition + 25)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          doc.text("16:00", col1X, yPosition + 35)

          // Coluna 2
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Local:", col2X, yPosition)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          doc.text("Espaço Jardim das Flores", col2X, yPosition + 10)

          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryDark)
          doc.text("Endereço:", col2X, yPosition + 25)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(...textColor)
          const endereco = doc.splitTextToSize("Rua das Flores, 123 - Jardim Primavera", 80)
          doc.text(endereco, col2X, yPosition + 35)

          // Mensagem final
          yPosition = pageHeight - 40
          doc.setFontSize(12)
          doc.setTextColor(...lightColor)
          doc.setFont("helvetica", "italic")
          doc.text("Agradecemos por confirmar sua presença!", pageWidth / 2, yPosition, { align: "center" })
          doc.text("Estamos ansiosos para celebrar este momento especial com você.", pageWidth / 2, yPosition + 10, {
            align: "center",
          })

          // Rodapé decorativo
          doc.setDrawColor(...primaryColor)
          doc.setLineWidth(0.5)
          doc.line(50, pageHeight - 15, pageWidth - 50, pageHeight - 15)

          // Salvar o PDF
          const fileName = `confirmacao-presenca-${formDataObj.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`
          doc.save(fileName)

          // Restaurar botão
          downloadButton.textContent = originalText
          downloadButton.disabled = false
        } catch (error) {
          console.error("Erro ao gerar PDF:", error)
          alert("Erro ao gerar o PDF. Verifique sua conexão com a internet e tente novamente.")

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
