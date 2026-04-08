# 📝 GitHub Issues Tracker

A responsive GitHub Issues Tracker built using **Vanilla JavaScript** and **Tailwind CSS/DaisyUI**.  
It allows users to view, search, and filter issues dynamically with clear status indicators (Open/Closed) and modal-based detailed views.

🔗 Live Site: https://github-issues-tracker-web-app.netlify.app/home.html
🔗 GitHub Repo: https://github.com/raselranar/B13-A5

---

## 📌 Project Overview

This project simulates a GitHub-like issue tracker where users can:
- Login with default admin credentials
- View all issues in a card-based 4-column layout
- Filter issues by status: All, Open, Closed
- Search issues using keywords
- Open issue details in a modal
- See visual status indicators with top-border colors

The design follows a **Figma template** and is fully responsive for desktop and mobile devices.

---

## 🖼️ Screenshot
![1773074790755](https://github.com/user-attachments/assets/50781a94-cbc7-4f4d-b917-48c51124a517)


---

## ✨ Key Features

- 🔐 Login Page with demo credentials  
- 🏷 Display all issues in card layout  
- 🎨 Top border colors: Green (Open), Purple (Closed)  
- 🔍 Search functionality with real-time filtering  
- 🗂 Tab-based filtering (All / Open / Closed)  
- 🖥 Modal popup for detailed issue information  
- ⏳ Loading spinner while fetching data  
- 📱 Fully responsive design  

---

## ⚙️ Tech Stack

- **HTML5 & CSS3** (Vanilla / Tailwind CSS / DaisyUI)  
- **JavaScript (ES6+)**  
- **API Endpoints**:  
  - All Issues: `https://phi-lab-server.vercel.app/api/v1/lab/issues`  
  - Single Issue: `https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}`  
  - Search Issues: `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}`  

---

## 📦 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/raselranar/B13-A5.git

# 2. Go to project folder
cd github-issues-tracker

# 3. Open index.html in browser
open index.html
