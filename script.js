const tabButtonsEle = document.getElementById("tab-buttons");

// perform action when tab button clicked
tabButtonsEle.addEventListener("click", (e) => {
  const tabButton = e.target.closest("button");
  if (!tabButton) return;
  //   tab switch ui
  tabSwitchUI(tabButton);
});

function tabSwitchUI(button) {
  // make all buttons inactive
  [...button.parentElement.children].forEach((item) =>
    item.classList.remove("btn-primary", "text-white"),
  );
  // make clicked button active
  button.classList.add("btn-primary", "text-white");
}
