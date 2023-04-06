type color = `#${string}`;
type type = "parfait" | "bien" | "moyen" | "nul";

const typeColor: {
  [key in type]: color;
} = {
  parfait: "#00B40C",
  bien: "#75F500",
  moyen: "#D8EB00",
  nul: "#DC1E00",
};

const popupContainer = document.querySelector("#popup-container") as HTMLElement;

const animationDuration = 3010;

export function createPopup(type: type) {
  const color = typeColor[type];
  const popup = document.createElement("label");

  popupContainer.textContent = "";

  popup.id = "popup";
  popup.textContent = type;
  popup.style.setProperty("--color", color);

  popupContainer.append(popup);
  setTimeout(() => popup.remove(), animationDuration);
}
