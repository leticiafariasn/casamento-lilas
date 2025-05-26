// Countdown Timer
const weddingDate = new Date("July 20, 2025 16:00:00").getTime();
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