const images = [
    "images/aya1.jpg",
    "images/aya2.jpg",
    "images/aya3.jpg",
    "images/aya4.jpg",
    "images/aya5.jpg"
  ];
  
  const slots = document.querySelectorAll(".slot");
  const result = document.getElementById("result");
  const startBtn = document.getElementById("start-btn");
  
  document.getElementById("start-btn").addEventListener("click", () => {
    result.textContent = "";
    startBtn.disabled = true;
  
    let spinningIntervals = [];
    let results = [];
  
    slots.forEach((slot, i) => {
      const img = slot.querySelector("img");
      slot.classList.add("spinning");
  
      const interval = setInterval(() => {
        const randImage = images[Math.floor(Math.random() * images.length)];
        img.src = randImage;
      }, 100);
      spinningIntervals.push(interval);
    });
  
    slots.forEach((slot, i) => {
      setTimeout(() => {
        clearInterval(spinningIntervals[i]);
        const img = slot.querySelector("img");
        const finalImage = images[Math.floor(Math.random() * images.length)];
        img.src = finalImage;
        slot.classList.remove("spinning");
        results[i] = finalImage;
  
        if (i === slots.length - 1) {
          setTimeout(() => {
            const allSame = results.every((v) => v === results[0]);
            result.textContent = allSame ? "🎉 大当たり！ 🎉" : "🙈 はずれ〜";
            startBtn.disabled = false;
          }, 300);
        }
      }, 1000 + i * 500);
    });
  });
  