
const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

const openedGifts = new Set();

function startMusic() {
  if (!music) return;

  music.play()
    .then(() => {
      if (musicButton) musicButton.textContent = "♫ Music on";
    })
    .catch(() => {
      if (musicButton) musicButton.textContent = "♫ Play music";
    });
}

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    startMusic();
  } else {
    music.pause();
    if (musicButton) musicButton.textContent = "♫ Play music";
  }
}

function goToPage(pageNumber) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const nextPage = document.getElementById("page" + pageNumber);

  if (nextPage) {
    nextPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (music && music.paused) {
    startMusic();
  }
}

function verifyAge(event) {
  event.preventDefault();

  const ageInput = document.getElementById("ageInput");
  const feedback = document.getElementById("ageFeedback");
  const continueButton = document.getElementById("ageContinueButton");

  if (!ageInput || !feedback || !continueButton) return;

  const age = Number(ageInput.value);
  continueButton.hidden = true;

  if (!ageInput.value.trim() || !Number.isFinite(age) || age <= 0) {
    feedback.textContent = "Please enter a valid age.";
    return;
  }

  if (age > 20) {
    feedback.textContent = "You are old enough for this surprise!! 🎀💗";
    continueButton.hidden = false;
  } else {
    feedback.textContent = "Enter your correct age!!! 🎀";
  }
}


function startGiftEmojiRain() {
  const emojis = ["💗", "💕", "💖", "🎀", "✨", "🌸", "🦋", "💝", "🎉"];

  // Remove any previous falling emojis.
  document.querySelectorAll(".gift-fall-emoji").forEach((emoji) => {
    emoji.remove();
  });

  // Create a fresh shower of emojis every time a gift opens.
  for (let i = 0; i < 35; i++) {
    const emoji = document.createElement("span");

    emoji.className = "gift-fall-emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = (18 + Math.random() * 20) + "px";
    emoji.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";
    emoji.style.animationDelay = (Math.random() * 1.5) + "s";

    document.body.appendChild(emoji);

    emoji.addEventListener("animationend", () => {
      emoji.remove();
    });
  }
}


let wishCountdownTimer = null;

function startWishSequence() {
  // Cancel any previous countdown.
  if (wishCountdownTimer) {
    clearInterval(wishCountdownTimer);
    wishCountdownTimer = null;
  }

  const flames = document.getElementById("candleFlames");
  const countdown = document.getElementById("wishCountdown");
  const blowMessage = document.getElementById("blowMessage");
  const wishMessage = document.getElementById("wishMessage");

  if (!flames || !countdown || !blowMessage || !wishMessage) return;

  // Reset the candles and countdown whenever the cake gift opens.
  flames.style.opacity = "1";
  flames.style.transform = "scale(1)";
  flames.style.display = "block";

  countdown.textContent = "3";
  countdown.classList.remove("finished");
  blowMessage.textContent = "Blow in! 💨";
  wishMessage.textContent = "Close your eyes, make a wish! 💗✨";

  let number = 3;

  wishCountdownTimer = setInterval(() => {
    number--;

    if (number > 0) {
      countdown.textContent = number;
    } else {
      clearInterval(wishCountdownTimer);
      wishCountdownTimer = null;

      // Blow out the candles!
      flames.style.opacity = "0";
      flames.style.transform = "scale(0.2) translateY(-15px)";

      setTimeout(() => {
        flames.style.display = "none";
        countdown.textContent = "WISH GRANTED! 💖";
        countdown.classList.add("finished");
        blowMessage.textContent = "HAPPY BIRTHDAY!! 🎉";
        wishMessage.textContent =
          "👏🥳🎊";

        startClapEmojiRain();
      }, 550);
    }
  }, 1000);
}

function startClapEmojiRain() {
  const emojis = ["👏", "🎉", "🥳", "🎊", "✨", "💖"];

  for (let i = 0; i < 45; i++) {
    const emoji = document.createElement("span");

    emoji.className = "clap-rain-emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = (20 + Math.random() * 22) + "px";
    emoji.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";
    emoji.style.animationDelay = (Math.random() * 1.2) + "s";

    document.body.appendChild(emoji);

    emoji.addEventListener("animationend", () => emoji.remove());
  }
}

function openGift(giftName) {
    
  const giftSelection = document.getElementById("giftSelection");
  const giftChoices = document.getElementById("giftChoices");
  const selectedGift = document.getElementById("gift-" + giftName);
  const continueButton = document.getElementById("continueAfterGifts");

  if (!selectedGift) return;

  openedGifts.add(giftName);
  
  // Keep the falling emoji effect when opening gifts.
  if (typeof startGiftEmojiRain === "function") {
    startGiftEmojiRain();
  }

  // Start the countdown only for the cake gift.
  if (giftName === "cake") {
    startWishSequence();
  }

  // Hide the ENTIRE selection screen, including its heading and Shinchan.
  if (giftSelection) {
    giftSelection.hidden = true;
    giftSelection.style.setProperty("display", "none", "important");
  }
  console.log("Gift selection hidden:", giftSelection?.style.display);

  // Also hide the gift boxes directly as a fallback.
  if (giftChoices) {
    giftChoices.hidden = true;
    giftChoices.style.setProperty("display", "none", "important");
  }

  if (continueButton) {
    continueButton.hidden = true;
    continueButton.style.setProperty("display", "none", "important");
  }

  // Close all gifts first.
  document.querySelectorAll(".gift-content").forEach((gift) => {
    gift.classList.remove("visible");
    gift.style.setProperty("display", "none", "important");
  });

  // Show only the selected gift.
  selectedGift.classList.add("visible");
  selectedGift.style.setProperty("display", "block", "important");

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (music && music.paused) {
    startMusic();
  }
}

function returnToGifts() {
  // Hide every opened gift.
  document.querySelectorAll(".gift-content").forEach((gift) => {
    gift.classList.remove("visible");
    gift.style.setProperty("display", "none", "important");
  });

  const giftSelection = document.getElementById("giftSelection");
  const giftChoices = document.getElementById("giftChoices");
  const continueButton = document.getElementById("continueAfterGifts");

  // Restore the full gift-selection screen.
  if (giftSelection) {
    giftSelection.hidden = false;
    giftSelection.style.removeProperty("display");
  }

  if (giftChoices) {
    giftChoices.hidden = false;
    giftChoices.style.removeProperty("display");
  }

  // Mark gifts that have already been opened.
  const giftNames = ["birthday", "cake", "memories"];

  document.querySelectorAll(".gift-card").forEach((card, index) => {
    const emoji = card.querySelector(".gift-emoji");

    if (openedGifts.has(giftNames[index])) {
      card.classList.add("gift-opened");
      if (emoji) emoji.textContent = "💝";
      card.setAttribute("aria-label", "Reopen gift already opened");
    } else {
      card.classList.remove("gift-opened");
      if (emoji) emoji.textContent = "🎁";
      card.setAttribute("aria-label", "Open gift");
    }
  });

  // Continue only after opening all three gifts.
  if (continueButton) {
    if (openedGifts.size === 3) {
      continueButton.hidden = false;
      continueButton.style.removeProperty("display");
    } else {
      continueButton.hidden = true;
      continueButton.style.setProperty("display", "none", "important");
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restartWebsite() {
  openedGifts.clear();

  // Hide all gift contents and clear their inline display overrides.
  document.querySelectorAll(".gift-content").forEach((gift) => {
    gift.classList.remove("visible");
    gift.style.removeProperty("display");
  });

  // Reset gift-box appearances.
  document.querySelectorAll(".gift-card").forEach((card) => {
    card.classList.remove("gift-opened");

    const emoji = card.querySelector(".gift-emoji");
    if (emoji) emoji.textContent = "🎁";

    card.setAttribute("aria-label", "Open gift");
  });

  // Restore the selection screen.
  const giftSelection = document.getElementById("giftSelection");
  const giftChoices = document.getElementById("giftChoices");

  if (giftSelection) {
    giftSelection.hidden = false;
    giftSelection.style.removeProperty("display");
  }

  if (giftChoices) {
    giftChoices.hidden = false;
    giftChoices.style.removeProperty("display");
  }

  const continueButton = document.getElementById("continueAfterGifts");

  if (continueButton) {
    continueButton.hidden = true;
    continueButton.style.setProperty("display", "none", "important");
  }

  // Reset age verification.
  const ageInput = document.getElementById("ageInput");
  const ageFeedback = document.getElementById("ageFeedback");
  const ageContinueButton = document.getElementById("ageContinueButton");

  if (ageInput) ageInput.value = "";
  if (ageFeedback) ageFeedback.textContent = "";
  if (ageContinueButton) ageContinueButton.hidden = true;

  goToPage(1);
}

// Keep the music button updated.
if (music) {
  music.addEventListener("play", () => {
    if (musicButton) musicButton.textContent = "♫ Music on";
  });

  music.addEventListener("pause", () => {
    if (musicButton) musicButton.textContent = "♫ Play music";
  });
}
