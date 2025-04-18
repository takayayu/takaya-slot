const slotElements = document.querySelectorAll(".slot");
const result = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const themeSelect = document.getElementById("theme");

let currentImages = [];

const themes = {
  pokemon: [
    "images/pokemon/pikachu.png",
    "images/pokemon/gengar.png",
    "images/pokemon/myu.png",
    "images/pokemon/ru-jura.png",
    "images/pokemon/kekking.png"
  ],
  disney: [
    "images/disney/mickey.png",
    "images/disney/miney.png",
    "images/disney/donald.png",
    "images/disney/goofy.png",
    "images/disney/chip-dale.png"
  ],
  aya: [
    "images/aya/aya1.jpg",
    "images/aya/aya2.jpg",
    "images/aya/aya3.jpg",
    "images/aya/aya4.jpg",
    "images/aya/aya5.jpg",
  ]
};

// テーマが変更されたら画像セットを更新
themeSelect.addEventListener("change", () => {
  currentImages = themes[themeSelect.value];
  slotElements.forEach(slot => {
    const img = slot.querySelector("img");
    img.src = currentImages[0];
  });
});

// 初期テーマを設定
currentImages = themes[themeSelect.value];

startBtn.addEventListener("click", () => {
  result.textContent = "";
  startBtn.disabled = true;

  let intervals = [];
  let results = [];

  slotElements.forEach((slot, i) => {
    const img = slot.querySelector("img");
    slot.classList.add("spinning");

    const interval = setInterval(() => {
      const randImage = currentImages[Math.floor(Math.random() * currentImages.length)];
      img.src = randImage;
    }, 100);
    intervals.push(interval);
  });

  slotElements.forEach((slot, i) => {
    setTimeout(() => {
      clearInterval(intervals[i]);
      const img = slot.querySelector("img");
      const finalImage = currentImages[Math.floor(Math.random() * currentImages.length)];
      img.src = finalImage;
      slot.classList.remove("spinning");
      results[i] = finalImage;

      if (i === slotElements.length - 1) {
        setTimeout(() => {
          const allSame = results.every(v => v === results[0]);
          result.textContent = allSame ? "🎉 大当たり！ 🎉" : "🙈 はずれ〜";
          startBtn.disabled = false;
        }, 300);
      }
    }, 1000 + i * 500);
  });
});
