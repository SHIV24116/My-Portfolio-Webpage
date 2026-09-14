# 🚀 Shivendra Singh – Portfolio Website & Admin CMS

A modern, responsive, and interactive **Software Engineer & AI Engineer personal portfolio website** with a client-side **Admin CMS (Content Management System)** built to showcase skills, GitHub projects, achievements, and competitive programming milestones.

🔗 **Live Website:**  
👉 https://shiv24116.github.io/My-Portfolio-Webpage/

---

## 📌 About the Project

This portfolio is designed as a **single-page, scrollable web application** with a clean dark UI, subtle animations, and dynamic data-driven content.

### ⚙️ Built-In Admin CMS (`admin.html`)
The website features an **Admin CMS Panel** that allows you to easily edit and update all contents displayed on the website — including About Me, Profile Photo (with file upload or URL), Projects (Add/Edit/Delete/Reorder), Skills, Achievements, Ratings, and Education — without touching any source code!

---

## ✨ Key Features

- ⚡ **Modern Dark UI**: Radial dot grid background, glowing hover borders, smooth animations, and tailored color palette.
- ⚙️ **Password-Protected Admin CMS (`admin.html`)**: Simple client-side password matching system (default: `admin123`, fully customizable in Admin settings).
- 👤 **Dynamic Profile Photo Upload**: Upload image files directly or paste image URLs in the Admin panel.
- 🚀 **GitHub Projects Showcase**: Full CRUD interface for projects. Includes tech badges, descriptions, and direct GitHub links.
- 🏆 **Achievements & Highlights Section**: Showcases hackathon recognitions, problem-solving milestones, and technical awards.
- ⚡ **Competitive Programming Tracker**: Problem count, contest count, and platform ratings (LeetCode, Codeforces, CodeChef).
- 💾 **Instant Live Persistence**: Edits save to browser `localStorage` for immediate live preview.
- 📥 **1-Click Export `data.json`**: Download updated JSON files to commit directly to your GitHub repository for permanent GitHub Pages deployment.
- 🌐 **GitHub Pages Deployed**: Fully static host compatible.

---

## 🧠 File Structure & Architecture

- `index.html` → Main portfolio page layout and sections
- `admin.html` → Password-protected Admin Content Management System (CMS)
- `script.js` → Dynamic renderer, animations, local storage persistence, and scroll handling
- `data.json` → Master JSON file storing all portfolio content (projects, skills, links, education, achievements)
- `assets/` → Images, logos, profile photo, and resume PDF

---

## 🔑 Admin CMS Guide

1. Open `admin.html` in your browser (or click the **⚙️ Admin CMS** link in the navbar/footer).
2. Enter the Admin Password (Default: `admin123`).
3. Use the tabs to edit:
   - **👤 Basic & Contact Info**: Edit name, title, tagline, about text, profile photo, social links.
   - **🚀 Projects CRUD**: Add new projects, edit existing ones, delete, or reorder.
   - **🛠️ Skills Manager**: Add/remove skill tags or create new skill categories.
   - **🏆 Achievements & CP Ratings**: Manage achievements and update contest stats.
   - **🎓 Education**: Update degree details.
   - **🔑 Admin Password**: Change password for access control.
4. Click **💾 Save Changes** to update the site immediately on your browser.
5. Click **📥 Export data.json** to download the updated JSON file.
6. Overwrite `Portfolio/data.json` with the downloaded file and push to GitHub to publish changes globally on GitHub Pages!

---

## 🚀 Deployment to GitHub Pages

1. Push your updated code and `data.json` to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio content & add Admin CMS"
   git push origin main
   ```
2. GitHub Pages will automatically build and host the updated portfolio at `https://shiv24116.github.io/My-Portfolio-Webpage/`.

---

## 📬 Contact

**Shivendra Singh**  
📧 Email: singhshivendra1945@gmail.com  
💼 LinkedIn: https://www.linkedin.com/in/shivendra-singh-93631b324  
📸 Instagram: https://www.instagram.com/shivendrasingh731  
💻 GitHub: https://github.com/SHIV24116  

---

⭐ If you like this project, feel free to **star the repository**!
