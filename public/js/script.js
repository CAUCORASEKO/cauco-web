const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function glitchText(element) {
  let isAnimating = false;

  element.addEventListener("mouseover", () => {
    if (isAnimating) return;
    isAnimating = true;

    let iteration = 0;
    const original = element.innerText;

    const interval = setInterval(() => {
      element.innerText = original
        .split("")
        .map((letter, index) => {
          if (index < iteration) return original[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= original.length) {
        clearInterval(interval);
        isAnimating = false;
      }

      iteration += 1 / 3;
    }, 30);
  });
}

// Aplica glitch solo al título por ahora
const title = document.getElementById("glitch-title");
glitchText(title);

// Puedes usar esto para otros elementos en el futuro:
// document.querySelectorAll(".glitch").forEach(glitchText);

