const tabButtonsEle = document.getElementById("tab-buttons");
const totalIssuesEle = document.getElementById("total-issues-show");
const cardContainerEle = document.getElementById("card-container");
const cardLoadingEle = document.getElementById("card-loading");
const cardModalEle = document.getElementById("card-info-modal");
const searchInputEle = document.getElementById("search-input");
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

// label bagels
function labelBadges(data) {
  // label badges
  const badges = data
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
  return badges;
}

//  render card
function renderCards(data = []) {
  cardContainerEle.innerHTML = "";
  const fragment = document.createDocumentFragment();

  if (data.length === 0) {
    cardContainerEle.innerHTML = `
    <div
          class="h-[50vh] col-span-full flex justify-center items-center"
        >
        <p class="text-3xl font-bold text-gray-400">No Issue Found</p>
        </div>
    `;
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.dataset.id = item.id;
    card.className = `card bg-base-100 border border-gray-300/80 shadow-sm border-t-4 ${item.status.toLowerCase() === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}`;
    const status =
      item.status.toLowerCase() === "open" ? "Open-Status" : "Closed-Status";
    const priorityColor = colors[item.priority.toLowerCase()] || colors.low;
    const date = new Date(item.createdAt);

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
                ${labelBadges(item.labels)}
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
    cardLoading();

    totalIssuesEle.textContent = filtered.length;

    return;
  }
  if (id === "closed") {
    const filtered = data.filter(
      (item) => item.status.toLowerCase() === "closed",
    );
    renderCards(filtered);
    cardLoading();

    totalIssuesEle.textContent = filtered.length;

    return;
  }
  renderCards(data);
  cardLoading();

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

// show modal
cardContainerEle.addEventListener("click", async (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;
  if (!id) return;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const { data } = await res.json();
  const date = new Date(data.createdAt);
  const priorityColor = colors[data.priority.toLowerCase()] || colors.low;

  cardModalEle.innerHTML = `
 <div class="modal-box">
        <h3 class="text-2xl font-bold mb-2">${data.title}</h3>
        <div class="flex gap-2 items-center">
        <div class="badge text-white ${data.status.toLowerCase() === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"}  rounded-full badge-sm">${data.status.toLowerCase() === "open" ? "Opened" : "Closed"}</div> 
        <p class="text-gray-400 text-xs">
       • Opened by ${data.author} • ${date.toLocaleDateString()}
        </p>
        </div>
        <div class="my-3">${labelBadges(data.labels)}</div>
        <p class="text-gray-500">
          ${data.description}
        </p>
        <div class="flex justify-between">
          <div class="">
            <p class="text-gray-400">Assignee:</p>
            <p class="font-semibold text-[#1F2937]">${data.assignee}</p>
          </div>
          <div class="">
            <p class="text-gray-400">Priority:</p>
            <div
                class="badge ${priorityColor.bg} rounded-full uppercase ${priorityColor.text} font-medium"
              >
                ${data.priority}
              </div>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
`;
  cardModalEle.showModal();
});

document.getElementById("search-btn").addEventListener("click", async (e) => {
  const searchText = searchInputEle.value;
  cardLoading(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  );
  const { data } = await res.json();
  renderCards(data);
  cardLoading();

  totalIssuesEle.textContent = data.length;
});
