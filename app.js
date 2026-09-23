const backdrop = document.querySelector("#modal-backdrop");
const amountInput = document.querySelector("#deposit-amount");
const modalTitle = document.querySelector("#modal-title");
let activeDepositButton = null;
const actionBackdrop = document.querySelector("#action-backdrop");
const actionTitle = document.querySelector("#action-title");
const actionCopy = document.querySelector("#action-copy");
const actionLabel = document.querySelector("#action-label");
const actionInput = document.querySelector("#action-input");
const settingsBackdrop = document.querySelector("#settings-backdrop");
const privacySettingsLink = document.querySelector("#privacy-settings-link");
const conversationVisibilitySelect = document.querySelector("#conversation-visibility");
const conversationVisibilityPill = document.querySelector("#conversation-visibility-pill");
const visibilityStorageKey = "shiftly_conversation_visibility";

function openDeposit(vaultName) {
  modalTitle.textContent = `Add to ${vaultName}`;
  amountInput.value = "";
  backdrop.classList.add("visible");
  backdrop.setAttribute("aria-hidden", "false");
  amountInput.focus();
}

function closeModal() {
  backdrop.classList.remove("visible");
  backdrop.setAttribute("aria-hidden", "true");
}

function closeAction() {
  actionBackdrop.classList.remove("visible");
  actionBackdrop.setAttribute("aria-hidden", "true");
}

function closeSettings() {
  settingsBackdrop.classList.remove("visible");
  settingsBackdrop.setAttribute("aria-hidden", "true");
}

function applyVisibility(visibility) {
  const safeVisibility = visibility === "private" ? "private" : "public";
  conversationVisibilityPill.textContent = `Conversation: ${safeVisibility === "private" ? "Private" : "Public"}`;
  conversationVisibilitySelect.value = safeVisibility;
}

function getStoredVisibility() {
  return localStorage.getItem(visibilityStorageKey) || "public";
}

document.querySelectorAll(".deposit-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeDepositButton = button;
    openDeposit(button.dataset.vault);
  });
});

document.querySelector("#new-vault-button").addEventListener("click", () => {
  activeDepositButton = null;
  openDeposit("a new vault");
});

document.querySelector("#add-vault-card .outline-button").addEventListener("click", () => {
  activeDepositButton = null;
  openDeposit("a new vault");
});

document.querySelector(".close-modal").addEventListener("click", closeModal);

backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) closeModal();
});

document.querySelectorAll(".quick-amounts button").forEach((button) => {
  button.addEventListener("click", () => {
    amountInput.value = button.textContent.replace("$", "");
  });
});

document.querySelector("#confirm-deposit").addEventListener("click", () => {
  const amount = Number(amountInput.value);
  if (!amount || amount <= 0) {
    amountInput.focus();
    amountInput.setCustomValidity("Enter a deposit amount");
    amountInput.reportValidity();
    amountInput.setCustomValidity("");
    return;
  }
  closeModal();
  if (activeDepositButton) {
    const originalText = activeDepositButton.textContent;
    activeDepositButton.textContent = "Deposited ✓";
    setTimeout(() => {
      activeDepositButton.textContent = originalText;
    }, 2200);
  } else {
    document.querySelector("#new-vault-button").textContent = "Vault started ✓";
    setTimeout(() => {
      document.querySelector("#new-vault-button").innerHTML = "<span>+</span> New vault";
    }, 2200);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (backdrop.classList.contains("visible")) closeModal();
    if (actionBackdrop.classList.contains("visible")) closeAction();
    if (settingsBackdrop.classList.contains("visible")) closeSettings();
  }
});

document.querySelectorAll(".feature-link").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Coming next ✓";
    setTimeout(() => {
      button.innerHTML = `${button.dataset.feature === "shift-to-save" ? "Set a rule" : button.dataset.feature === "safe-to-spend" ? "View your plan" : button.dataset.feature === "portable" ? "Connect a workplace" : "See how it works"} <span>→</span>`;
    }, 1800);
  });
});

document.querySelectorAll(".billing-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".billing-option").forEach((option) => option.classList.remove("active"));
    button.classList.add("active");
    const price = document.querySelector(".plus-price");
    price.innerHTML = button.dataset.billing === "annual" ? "$5.59<span>/ month</span>" : "$6.99<span>/ month</span>";
  });
});

function openAction(title, copy, label, placeholder) {
  actionTitle.textContent = title;
  actionCopy.textContent = copy;
  actionLabel.textContent = label;
  actionInput.placeholder = placeholder;
  actionInput.value = "";
  actionBackdrop.classList.add("visible");
  actionBackdrop.setAttribute("aria-hidden", "false");
  actionInput.focus();
}

document.querySelector("#connect-workplace-button").addEventListener("click", () => openAction("Connect your workplace", "Enter your restaurant name and we’ll help you find the right workplace code.", "Restaurant name", "e.g. Sunny Side Café"));
document.querySelector("#partner-demo-button").addEventListener("click", () => openAction("Book a partner demo", "Leave your details and a member of our restaurant partnerships team will reach out.", "Restaurant or group name", "e.g. Northstar Hospitality"));
document.querySelector("#upgrade-button").addEventListener("click", () => openAction("Start Shiftly Plus", "Plus is $6.99 monthly, or $5.59 per month when billed annually. This demo does not process a payment.", "Email address", "you@example.com"));

document.querySelector(".close-action").addEventListener("click", closeAction);

actionBackdrop.addEventListener("click", (event) => {
  if (event.target === actionBackdrop) closeAction();
});

document.querySelector("#confirm-action").addEventListener("click", () => {
  if (!actionInput.value.trim()) {
    actionInput.focus();
    return;
  }
  document.querySelector("#confirm-action").innerHTML = "You’re on the list ✓";
  setTimeout(() => {
    closeAction();
    document.querySelector("#confirm-action").innerHTML = "Continue <span>→</span>";
  }, 1500);
});

privacySettingsLink.addEventListener("click", (event) => {
  event.preventDefault();
  applyVisibility(getStoredVisibility());
  settingsBackdrop.classList.add("visible");
  settingsBackdrop.setAttribute("aria-hidden", "false");
  conversationVisibilitySelect.focus();
});

document.querySelector(".close-settings").addEventListener("click", closeSettings);

settingsBackdrop.addEventListener("click", (event) => {
  if (event.target === settingsBackdrop) closeSettings();
});

document.querySelector("#save-privacy-setting").addEventListener("click", () => {
  const selectedVisibility = conversationVisibilitySelect.value === "private" ? "private" : "public";
  localStorage.setItem(visibilityStorageKey, selectedVisibility);
  applyVisibility(selectedVisibility);
  closeSettings();
});

applyVisibility(getStoredVisibility());

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: "smooth" }));
});
