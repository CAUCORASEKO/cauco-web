const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const title = document.getElementById("glitch-title");

title.addEventListener("mouseover", () => {
  let iteration = 0;
  const original = title.innerText;

  const interval = setInterval(() => {
    title.innerText = original
      .split("")
      .map((letter, index) => {
        if (index < iteration) return original[index];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= original.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
});
