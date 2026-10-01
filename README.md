# Deeka Muhudiin Hassan - Personal Portfolio Website

A modern, responsive, and professional personal portfolio website designed for **Deeka Muhudiin Hassan**, a Computer Science student and Full-Stack Developer based in Somalia.

---

## 🌟 Features

- **Modern Developer UI:** Bespoke dark and light mode designs with professional blue/purple accents (`#3b82f6` & `#8b5cf6`).
- **Fully Responsive:** Seamless layout experience across desktop monitors, laptops, tablets, and smartphones.
- **Interactive Navigation:**
  - Sticky glassmorphic navbar with blur effect.
  - Active scrollspy tracking current sections automatically.
  - Mobile slide-out drawer menu with touch-friendly navigation.
- **Dynamic Projects Showcase:**
  - Interactive project cards for **Amal Bank**, **Asal Supermarket**, **Nafis & Caafimaad**, and **Career Consultant**.
  - Retina-sharp CSS/SVG preview mockups (100% offline-ready without broken image links).
  - Modal dialog overlays with in-depth technical breakdowns and feature lists.
- **Skills Matrix:**
  - Filterable by category (*Frontend*, *Backend*, *Programming Languages*, *Tools*).
  - Animated proficiency indicators that trigger smoothly as the user scrolls.
- **Education Timeline:**
  - Clean academic roadmap featuring degree status and relevant CS coursework.
- **Interactive Contact Form:**
  - Live character counter.
  - Real-time client-side validation.
  - Simulated async submit state with loading indicators and success feedback.
  - One-click "Copy Email" button with instant visual feedback.
- **SEO & Social Optimization:**
  - Full Open Graph (OG) meta tags, Twitter card tags, search engine meta descriptions, and accessible semantic HTML5 tags.

---

## 📁 Project Structure

```text
portfolio/
├── index.html        # Complete semantic HTML5 structure & content
├── style.css         # Modern responsive CSS3 with CSS variables & themes
├── script.js         # Vanilla JavaScript (Theme switch, filters, modals, form)
└── README.md         # Documentation & deployment guide
```

---

## 🚀 How to Run the Project Locally

You do not need any backend server to view the website. You can run it locally using any of the following methods:

### Method 1: Direct Browser Launch (Simplest)
1. Navigate to the project folder:
   `c:\Users\Hp\Desktop\portfolio`
2. Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.

### Method 2: VS Code "Live Server" Extension
1. Open the `portfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl + Shift + X`).
3. Right-click `index.html` in the file explorer and select **"Open with Live Server"**.
4. The site will automatically launch at `http://127.0.0.1:5500/index.html` with automatic hot-reloading when you make changes.

### Method 3: Using Python Built-in Server
If you have Python installed, open PowerShell or Terminal in the `portfolio` directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 How to Publish on GitHub Pages

Publishing your portfolio on GitHub Pages is completely free and takes only a few minutes.

### Step 1: Initialize a Git Repository
Open PowerShell or your terminal inside `c:\Users\Hp\Desktop\portfolio`:

```bash
git init
git add .
git commit -m "Initial commit: Deeka Muhudiin Hassan Portfolio"
```

### Step 2: Create a New GitHub Repository
1. Log in to [GitHub](https://github.com/).
2. Click the **+** icon in the top right corner and choose **New repository**.
3. Name your repository:
   - For a user site: `deekamuhudiin.github.io` (Recommended - will be live at `https://deekamuhudiin.github.io`)
   - Or as a project repo: `portfolio` (will be live at `https://<your-username>.github.io/portfolio`)
4. Leave it **Public** and do NOT initialize with a README (you already have one).
5. Click **Create repository**.

### Step 3: Push Your Code to GitHub
Copy the commands shown by GitHub, or run:

```bash
# Rename branch to main
git branch -M main

# Link to your remote repository (replace with your actual GitHub username)
git remote add origin https://github.com/<your-username>/<repo-name>.git

# Push your files
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (gear icon at the top).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and folder `/ (root)`.
6. Click **Save**.
7. Wait 1 to 2 minutes. GitHub will provide you with a live URL (e.g., `https://<your-username>.github.io`).

---

## 🛠️ How to Customize

- **Personal Information:** Edit the name, role, email address, or bio in `index.html`.
- **Social Links:** Search for `https://github.com` and `https://linkedin.com` in `index.html` and replace them with your actual profile links.
- **Projects:** Update the project descriptions or add your actual repository links in the `href="https://github.com/..."` attributes of the project cards.
- **Theme Accents:** In `style.css`, modify the `--primary` and `--secondary` CSS variables in the `:root` block to adjust the accent colors.

---

## 📄 License & Rights

&copy; 2026 Deeka Muhudiin Hassan. All Rights Reserved.
