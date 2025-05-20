const weddingDate = new Date("October 30, 2025 16:00:00").getTime()

// Update the countdown every second
const countdown = setInterval(() => {
  // Get today's date and time
  const now = new Date().getTime()

  // Find the distance between now and the wedding date
  const distance = weddingDate - now

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  // Display the result
  document.getElementById("days").textContent = days.toString().padStart(2, "0")
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdown)
    document.getElementById("countdown").innerHTML = "<h3>Nosso grande dia chegou!</h3>"
  }
}, 1000)
