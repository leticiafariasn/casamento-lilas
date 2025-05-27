const weddingDate = new Date("July 20, 2025 19:00:00").getTime();
const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = days.toString().padStart(2, "0");
  if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, "0");
  if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, "0");
  if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, "0");

  if (distance < 0) {
    clearInterval(countdownInterval);
    const countdownTimerElement = document.getElementById("countdown-timer");
    if (countdownTimerElement) {
      countdownTimerElement.innerHTML = "<h3>Nosso grande dia chegou!</h3>";
    }
  }
}, 1000);

// Main JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled-blur", window.scrollY > 10);
    });
  }

  const hamburgerIcon = document.getElementById("hamburger-icon");
  const navMenu = document.getElementById("nav-menu");
  if (hamburgerIcon && navMenu) {
    hamburgerIcon.addEventListener("click", function () {
      this.classList.toggle("open");
      navMenu.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburgerIcon && navMenu) {
        hamburgerIcon.classList.remove("open");
        navMenu.classList.remove("active");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      try {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerEl = document.querySelector("header");
          const headerHeight = headerEl ? headerEl.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      } catch (error) {
        console.warn("Elemento para scroll suave não encontrado:", targetId, error);
      }
    });
  });

  function loadJsPDF() {
    return new Promise((resolve, reject) => {
      if (window.jspdf && window.jspdf.jsPDF) { resolve(window.jspdf); return; }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.async = true;
      script.onload = () => {
        setTimeout(() => {
          if (window.jspdf && window.jspdf.jsPDF) { resolve(window.jspdf); }
          else { console.warn('jsPDF CDN principal falhou. Tentando fallback.'); loadFallbackJsPDF(resolve, reject); }
        }, 100);
      };
      script.onerror = () => { console.error('Falha CDN principal. Tentando fallback.'); loadFallbackJsPDF(resolve, reject); };
      document.head.appendChild(script);
    });
  }

  function loadFallbackJsPDF(resolve, reject) {
    const script2 = document.createElement('script');
    script2.src = 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js';
    script2.async = true;
    script2.onload = () => {
      setTimeout(() => {
        if (window.jspdf && window.jspdf.jsPDF) { resolve(window.jspdf); }
        else { reject(new Error('jsPDF fallback CDN falhou.')); }
      }, 100);
    };
    script2.onerror = () => { reject(new Error('Falha ambas CDNs jsPDF.')); };
    document.head.appendChild(script2);
  }

  // FUNÇÃO generatePDF COM VISUAL LIMPO E COLUNAS LADO A LADO
  async function generatePDF(formDataObj) {
    try {
      const jsPDFNamespace = await loadJsPDF();
      const { jsPDF } = jsPDFNamespace;
      const doc = new jsPDF();

      // Cores
      const backgroundBeige = [245, 240, 235];
      const rosePastel = [250, 225, 228];
      const roseDark = [194, 130, 133];
      const textColor = [74, 59, 60];
      const textLight = [138, 114, 117];

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const rem = 16;
      const margin = rem * 2; // 2rem = 32pt
      const centerX = pageWidth / 2;

      // Fundo
      doc.setFillColor(...backgroundBeige);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      let currentY = 20;

      // Cabeçalho (agora justificado à esquerda)
      doc.setFontSize(7);
      doc.setTextColor(...textLight);
      doc.setFont("helvetica", "normal");
      doc.text("CONFIRMAÇÃO DE PRESENÇA RECEBIDA", centerX, currentY, { align: "center" }); doc.text("CONFIRMAÇÃO DE PRESENÇA RECEBIDA", centerX, currentY, { align: "center" });

      currentY += 12;
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text("Obrigado por confirmar sua presença em nosso grande dia", centerX, currentY, { align: "center" });

      currentY += 30;

      // Nomes dos noivos lado a lado com espaçamento menor
      doc.setFontSize(24);
      doc.setFont("times", "normal");
      doc.setTextColor(...textColor);
      doc.text("Julia", centerX - 12, currentY, { align: "right" });

      doc.setFont("times", "italic");
      doc.setTextColor(...roseDark);
      doc.text("&", centerX, currentY, { align: "center" });

      doc.setFont("times", "normal");
      doc.setTextColor(...textColor);
      doc.text("Pedro", centerX + 12, currentY, { align: "left" });

      currentY += 15;

      // Linha decorativa
      doc.setDrawColor(...rosePastel);
      doc.setLineWidth(0.8);
      doc.line(centerX - 30, currentY, centerX + 30, currentY);

      currentY += 20;

      // POSICIONAMENTO DAS COLUNAS COM BASE NA MARGEM DE 2rem
      const leftX = margin;
      const rightX = pageWidth - margin - ((pageWidth - 2 * margin) / 2); // colunas mais próximas ao centro
      let infoY = currentY;

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...textColor);
      doc.text("DADOS DO CONVIDADO", leftX, infoY);
      doc.text("DETALHES DO EVENTO", rightX, infoY);

      infoY += 10;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");

      function writeField(x, y, label, value) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...textColor);
        doc.text(label, x, y);
        const labelWidth = doc.getTextWidth(label);
        doc.setFont("helvetica", "normal");
        doc.text(String(value), x + labelWidth + 2, y);
      }

      writeField(leftX, infoY, "Nome:", formDataObj.nome || "N/A");
      writeField(rightX, infoY, "Data:", "20/07/2025");
      infoY += 10;

      writeField(leftX, infoY, "Email:", formDataObj.email || "N/A");
      writeField(rightX, infoY, "Horário:", "19h");
      infoY += 10;

      writeField(leftX, infoY, "Telefone:", formDataObj.telefone || "N/A");
      writeField(rightX, infoY, "Local:", "Inoa - Chácara de Inoa");
      infoY += 10;

      const acompText = formDataObj.acompanhantes === "0" ? "Apenas eu" : `${formDataObj.acompanhantes || '0'} pessoa(s)`;
      writeField(leftX, infoY, "Acompanhantes:", acompText);
      writeField(rightX, infoY, "Endereço:", "Avenida Carlos Marighella - Chácaras de Inoã");

      infoY += 15;

      // Mensagem (se houver)
      if (formDataObj.mensagem && formDataObj.mensagem.trim() !== "") {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...roseDark);
        doc.text("Mensagem:", leftX, infoY);

        infoY += 6;
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        const msgLines = doc.splitTextToSize(String(formDataObj.mensagem), pageWidth - margin * 2);
        doc.text(msgLines, leftX + 10, infoY);
      }

      // Rodapé
      const footerY = pageHeight - 20;
      doc.setDrawColor(...rosePastel);
      doc.setLineWidth(0.8);
      doc.line(margin + 40, footerY - 6, pageWidth - margin - 40, footerY - 6);

      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      doc.setFont("times", "italic");
      doc.text("Julia & Pedro", centerX, footerY, { align: "center" });

      doc.setFontSize(7);
      doc.setTextColor(...textLight);
      doc.setFont("helvetica", "normal");
      doc.text("20 de Julho de 2025", centerX, footerY + 6, { align: "center" });

      const safeGuestName = String(formDataObj.nome || "Convidado").replace(/[^\w\sÀ-ú]/gi, '').replace(/\s+/g, "_");
      const fileName = `Confirmação_Casamento_Julia_Pedro_${safeGuestName}.pdf`;
      doc.save(fileName);

      return true;
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.");
      throw error;
    }
  }


  const rsvpForm = document.getElementById("rsvp-form");
  const thankYouMessageContainer = document.getElementById("thank-you-message");
  const submitButton = document.getElementById("submit-button");

  if (rsvpForm && thankYouMessageContainer && submitButton) {
    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const originalText = submitButton.textContent;
      submitButton.innerHTML = '<span class="loading-spinner"></span>Enviando...';
      submitButton.disabled = true;
      const formData = new FormData(rsvpForm);
      const formDataObj = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("https://api.sheetmonkey.io/form/ri6NRsJ9mYsHBm1YZvXR5y", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(formDataObj),
        });
        if (!response.ok) {
          let errorData = { message: 'Erro ao enviar dados para a planilha.' };
          try { errorData = await response.json(); } catch (jsonError) { /* Usar msg padrão */ }
          throw new Error(errorData.message || 'Erro ao enviar dados. Status: ' + response.status);
        }

        rsvpForm.style.opacity = "0";
        rsvpForm.style.transform = "translateY(20px)";
        setTimeout(() => {
          rsvpForm.style.display = "none";
          thankYouMessageContainer.innerHTML = `
                            <h3>Obrigado por confirmar sua presença, ${formDataObj.nome}!</h3>
                            <p><strong>Email:</strong> ${formDataObj.email}</p>
                            <p><strong>Telefone:</strong> ${formDataObj.telefone}</p>
                            <p><strong>Acompanhantes:</strong> ${formDataObj.acompanhantes === "0" ? "Apenas você" : formDataObj.acompanhantes + " pessoa(s)"}</p>
                            ${formDataObj.mensagem ? `<p><strong>Mensagem:</strong> ${formDataObj.mensagem}</p>` : ""}
                            <button id="download-pdf" class="btn-primary" style="margin-top: 20px;">📄 Baixar Confirmação em PDF</button>`;
          thankYouMessageContainer.style.display = "block";
          void thankYouMessageContainer.offsetWidth;
          thankYouMessageContainer.style.opacity = "1";

          const downloadButton = document.getElementById("download-pdf");
          if (downloadButton) {
            downloadButton.addEventListener("click", async () => {
              const originalDownloadText = downloadButton.textContent;
              downloadButton.innerHTML = '<span class="loading-spinner"></span>Gerando PDF...';
              downloadButton.disabled = true;
              try {
                await generatePDF(formDataObj);
              } catch (error) {
                console.error("Erro no download do PDF:", error);
              }
              finally {
                downloadButton.textContent = originalDownloadText;
                downloadButton.disabled = false;
              }
            });
          }
        }, 500);
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        alert(`Ocorreu um erro ao enviar o formulário: ${error.message}. Por favor, tente novamente.`);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  const sections = document.querySelectorAll("section");
  const revealPoint = 150;
  function checkReveal() {
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add("visible");
      }
    });
  }
  if (sections.length > 0) { checkReveal(); window.addEventListener("scroll", checkReveal); }
});