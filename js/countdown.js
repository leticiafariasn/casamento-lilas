const weddingDate = new Date("July 20, 2025 16:00:00").getTime()
// Update the countdown every second
const countdown = setInterval(() => {
  // Get today's date and time
  const now = new Date().getTime()

  if (distance < 0) {
    clearInterval(countdownInterval);
    const countdownTimerElement = document.getElementById("countdown-timer");
    if (countdownTimerElement) {
      countdownTimerElement.innerHTML = "<h3>Nosso grande dia chegou!</h3>";
    }
  }
}, 1000);