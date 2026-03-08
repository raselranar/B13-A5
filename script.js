const tabButtonsEle = document.getElementById("tab-buttons");
const totalIssuesEle = document.getElementById("total-issues-show");
const cardContainerEle = document.getElementById("card-container");
const cardLoadingEle = document.getElementById("card-loading");
const colors = {
  high: {
    bg: "bg-red-400/25",
    text: "text-red-500",
  },
  medium: {
    bg: "bg-yellow-400/25",
    text: "text-yellow-500",
  },
  low: {
    bg: "bg-gray-400/25",
    text: "text-gray-500",
  },

  green: {
    bg: "bg-green-400/25",
    text: "text-green-500",
  },
};
let activeTab = "all";

// perform action when tab button clicked
tabButtonsEle.addEventListener("click", (e) => {
  const tabButton = e.target.closest("button");
  const id = tabButton.dataset.id;
  if (!tabButton) return;
  if (activeTab === id) return;
  //   tab switch ui
  tabSwitchUI(tabButton);
  fetchIssues(id);
  activeTab = id;
});

//   tab switch ui
function tabSwitchUI(button) {
  // make all buttons inactive
  [...button.parentElement.children].forEach((item) =>
    item.classList.remove("btn-primary", "text-white"),
  );
  // make clicked button active
  button.classList.add("btn-primary", "text-white");
}
//  render card
function renderCards(data) {
  cardContainerEle.innerHTML = "";
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = `card bg-base-100 shadow-sm border-t-4 ${item.status.toLowerCase() === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}`;
    const status =
      item.status.toLowerCase() === "open" ? "Open-Status" : "Closed-Status";
    const priorityColor = colors[item.priority.toLowerCase()] || colors.low;
    const date = new Date(item.createdAt);

    // label badges
    const labelBadges = item.labels
      .map((item) => {
        const labelName = item.toLowerCase();
        const labelColor =
          labelName === "bug"
            ? colors.high
            : labelName === "enhancement"
              ? colors.green
              : colors.medium;
        return `<div
                  class="badge ${labelName === "bug" ? "badge-error" : labelName === "enhancement" ? "badge-success" : "badge-warning"} rounded-full ${labelColor.bg} ${labelColor.text} font-medium uppercase"
                >
                  ${item}
                </div>`;
      })
      .join(" ");

    // insert html on card
    card.innerHTML = `
    
    <div class="p-4 border-b border-b-gray-300">
            <div class="flex justify-between">
            
              <img src="./assets/${status}.png" alt="${status}" />
              <div
                class="badge ${priorityColor.bg} border-none rounded-full badge-error uppercase ${priorityColor.text} font-medium px-6.25 py-2"
              >
                ${item.priority}
              </div>
            </div>
              <h2 class="card-title mb-2 mt-3 text-[#1F2937]">
                ${item.title}
              </h2>
              <div>
              <p class="text-gray-500 mb-3 line-clamp-2">
                ${item.description}
              </p>
              </div>
              <div class="card-actions">
                ${labelBadges}
              </div>
              </div>
              <!-- Author -->
              <div class="text-gray-500 space-y-2 p-4">
                <h3 class="">#1 by ${item.author}</h3>
                <p class="">${date.toLocaleDateString()}</p>
              </div>
          `;
    fragment.appendChild(card);
  });
  cardContainerEle.appendChild(fragment);
  cardLoading();
}

// fetch All issues
async function fetchIssues(id) {
  cardLoading(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const { data } = await res.json();
  if (id === "open") {
    const filtered = data.filter(
      (item) => item.status.toLowerCase() === "open",
    );
    renderCards(filtered);
    totalIssuesEle.textContent = filtered.length;

    return;
  }
  if (id === "closed") {
    const filtered = data.filter(
      (item) => item.status.toLowerCase() === "closed",
    );
    renderCards(filtered);
    totalIssuesEle.textContent = filtered.length;

    return;
  }
  renderCards(data);
  totalIssuesEle.textContent = data.length;
}
fetchIssues();

// loading spinner
function cardLoading(status) {
  if (status) {
    cardContainerEle.classList.add("hidden");
    cardLoadingEle.classList.remove("hidden");
    return;
  }

  cardContainerEle.classList.remove("hidden");
  cardLoadingEle.classList.add("hidden");
}
