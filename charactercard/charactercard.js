"use strict";

// Character object with required properties and methods
const character = {
  name: "Swamp Beast Diplomat",
  class: "Diplomat",
  level: 1,
  health: 100,
  image: "images/swamp-beast-diplomat.webp",

  attacked() {
    if (this.health <= 0) return;

    this.health = Math.max(0, this.health - 20);

    if (this.health === 0) {
      setMessage(`${this.name} has died.`, true);
      disableActionButtons(true);
    } else {
      setMessage(`${this.name} was attacked. Health is now ${this.health}.`, false);
    }

    renderCharacter();
  },

  levelUp() {
    if (this.health <= 0) {
      setMessage(`You cannot level up. ${this.name} is dead.`, true);
      return;
    }

    this.level += 1;
    setMessage(`${this.name} leveled up to ${this.level}!`, false);
    renderCharacter();
  }
};

// DOM elements
const elName = document.querySelector("#charName");
const elClass = document.querySelector("#charClass");
const elLevel = document.querySelector("#charLevel");
const elHealth = document.querySelector("#charHealth");
const elImage = document.querySelector("#charImage");
const elMsg = document.querySelector("#message");

const attackBtn = document.querySelector("#attackBtn");
const levelUpBtn = document.querySelector("#levelUpBtn");
const resetBtn = document.querySelector("#resetBtn");

// Initial values to reset to
const initialState = {
  level: character.level,
  health: character.health
};

function renderCharacter() {
  elName.textContent = character.name;
  elClass.textContent = character.class;
  elLevel.textContent = String(character.level);
  elHealth.textContent = String(character.health);

  elImage.src = character.image;
  elImage.alt = character.name;
}

function setMessage(text, isDanger) {
  elMsg.textContent = text;
  elMsg.classList.toggle("danger", Boolean(isDanger));
}

function disableActionButtons(disabled) {
  attackBtn.disabled = disabled;
  levelUpBtn.disabled = disabled;
}

function resetCharacter() {
  character.level = initialState.level;
  character.health = initialState.health;

  disableActionButtons(false);
  setMessage("Character reset.", false);
  renderCharacter();
}

// Events
attackBtn.addEventListener("click", () => character.attacked());
levelUpBtn.addEventListener("click", () => character.levelUp());
resetBtn.addEventListener("click", resetCharacter);

// First render
renderCharacter();
setMessage("Ready. Try Attacked or Level Up.", false);