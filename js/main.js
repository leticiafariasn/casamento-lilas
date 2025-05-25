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

  // Configurar o botão de download PDF usando jsPDF
  const setupPdfDownload = (formDataObj) => {
    const downloadButton = document.getElementById("download-pdf")
    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        try {
          // Verificar se jsPDF está disponível
          if (typeof window.jsPDF === "undefined") {
            alert("Erro: Biblioteca de PDF não carregada.")
            return
          }

          // Criar nova instância do jsPDF
          const { jsPDF } = window.jsPDF
          const doc = new jsPDF()

          // Configurar cores
          const primaryColor = [196, 130, 133] // #c28285
          const textColor = [74, 59, 60] // #4a3b3c
          const lightColor = [138, 114, 117] // #8a7275

          // Título principal
          doc.setFontSize(24)
          doc.setTextColor(...primaryColor)
          doc.setFont("helvetica", "bold")
          doc.text("Lívia & Mateus", 105, 30, { align: "center" })

          // Data do casamento
          doc.setFontSize(14)
          doc.setTextColor(...lightColor)
          doc.setFont("helvetica", "italic")
          doc.text("30 de Outubro de 2025", 105, 45, { align: "center" })

          // Linha decorativa
          doc.setDrawColor(...primaryColor)
          doc.setLineWidth(0.5)
          doc.line(50, 55, 160, 55)

          // Título da seção
          doc.setFontSize(18)
          doc.setTextColor(...primaryColor)
          doc.setFont("helvetica", "bold")
          doc.text("Confirmação de Presença", 105, 75, { align: "center" })

          // Caixa de informações
          doc.setDrawColor(...primaryColor)
          doc.setLineWidth(1)
          doc.rect(20, 85, 170, 80)

          // Informações do convidado
          doc.setFontSize(12)
          doc.setTextColor(...textColor)
          doc.setFont("helvetica", "normal")

          let yPosition = 100
          const lineHeight = 12

          // Nome
          doc.setFont("helvetica", "bold")
          doc.text("Nome:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text(formDataObj.nome, 55, yPosition)

          yPosition += lineHeight

          // Email
          doc.setFont("helvetica", "bold")
          doc.text("Email:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text(formDataObj.email, 55, yPosition)

          yPosition += lineHeight

          // Telefone
          doc.setFont("helvetica", "bold")
          doc.text("Telefone:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text(formDataObj.telefone, 65, yPosition)

          yPosition += lineHeight

          // Acompanhantes
          doc.setFont("helvetica", "bold")
          doc.text("Acompanhantes:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text(formDataObj.acompanhantes, 85, yPosition)

          yPosition += lineHeight

          // Mensagem (se houver)
          if (formDataObj.mensagem && formDataObj.mensagem.trim() !== "") {
            yPosition += 5
            doc.setFont("helvetica", "bold")
            doc.text("Mensagem:", 30, yPosition)
            yPosition += lineHeight
            doc.setFont("helvetica", "normal")

            // Quebrar texto longo em múltiplas linhas
            const splitMessage = doc.splitTextToSize(formDataObj.mensagem, 150)
            doc.text(splitMessage, 30, yPosition)
          }

          // Informações do evento
          yPosition = 185
          doc.setFillColor(245, 214, 217) // #f5d6d9
          doc.rect(20, yPosition, 170, 60, "F")

          yPosition += 15
          doc.setFontSize(14)
          doc.setTextColor(...primaryColor)
          doc.setFont("helvetica", "bold")
          doc.text("Informações do Evento", 105, yPosition, { align: "center" })

          yPosition += 15
          doc.setFontSize(11)
          doc.setTextColor(...textColor)
          doc.setFont("helvetica", "normal")

          // Data
          doc.setFont("helvetica", "bold")
          doc.text("Data:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text("30 de Outubro de 2025", 55, yPosition)

          yPosition += 10

          // Horário
          doc.setFont("helvetica", "bold")
          doc.text("Horário:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text("16:00", 60, yPosition)

          yPosition += 10

          // Local
          doc.setFont("helvetica", "bold")
          doc.text("Local:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text("Espaço Jardim das Flores", 55, yPosition)

          yPosition += 10

          // Endereço
          doc.setFont("helvetica", "bold")
          doc.text("Endereço:", 30, yPosition)
          doc.setFont("helvetica", "normal")
          doc.text("Rua das Flores, 123 - Jardim Primavera", 70, yPosition)

          // Mensagem final
          yPosition += 25
          doc.setFontSize(10)
          doc.setTextColor(...lightColor)
          doc.setFont("helvetica", "italic")
          doc.text("Agradecemos por confirmar sua presença!", 105, yPosition, { align: "center" })
          doc.text("Estamos ansiosos para celebrar este momento especial com você.", 105, yPosition + 8, {
            align: "center",
          })

          // Salvar o PDF
          const fileName = `confirmacao-presenca-${formDataObj.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`
          doc.save(fileName)
        } catch (error) {
          console.error("Erro ao gerar PDF:", error)
          alert("Erro ao gerar o PDF. Tente novamente.")
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
