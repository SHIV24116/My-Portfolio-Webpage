let data = null;

// Initialize app when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  setupMobileMenu();
  setupSmoothScrolling();
  setupPhoneCopy();
});

function initApp() {
  // Try loading from localStorage first (to support Admin CMS live preview)
  const localData = localStorage.getItem("portfolio_data");
  if (localData) {
    try {
      data = JSON.parse(localData);
      renderPortfolio(data);
      return;
    } catch (err) {
      console.warn("Error parsing local portfolio data, falling back to data.json:", err);
    }
  }

  // Fallback to data.json
  fetch("data.json")
    .then(res => res.json())
    .then(json => {
      data = json;
      renderPortfolio(data);
    })
    .catch(err => console.error("Error loading data.json:", err));
}

function renderPortfolio(data) {
  if (!data) return;

  // Typewriter effect for name
  typeWriterSequence([
    data.name || "Hi! I am Shivendra Singh 👋"
  ], "name");

  // Basic Info
  document.getElementById("title").textContent = data.title || "";
  document.getElementById("tagline").textContent = data.tagline || "";
  document.getElementById("about-text").textContent = data.about || "";

  // Profile Photo
  const profileImg = document.getElementById("profile-img");
  if (profileImg && data.profilePhoto) {
    profileImg.src = data.profilePhoto;
  }

  // Social Links & Resume
  if (data.links) {
    setHref("github", data.links.github);
    setHref("resume", data.links.resume);
    setHref("linkedin", data.links.linkedin);
    setHref("email", `mailto:${data.links.email}`);
    document.getElementById("email").textContent = data.links.email || "";

    if (data.links.phone) {
      document.getElementById("phone").textContent = data.links.phone;
    }
    if (data.links.linkedin) {
      setHref("linkedin-contact", data.links.linkedin);
    }
    if (data.links.instagram) {
      setHref("instagram-contact", data.links.instagram);
    }
  }

  // Skills
  renderSkills(data.skills);

  // CP Stats
  if (data.competitiveProgramming) {
    document.getElementById("cp-summary").textContent = data.competitiveProgramming.summary || "";
    document.getElementById("cp-problems").textContent = data.competitiveProgramming.totalProblemsSolved || "";
    document.getElementById("cp-contests").textContent = data.competitiveProgramming.totalContests || "";
    renderCpPlatforms(data.competitiveProgramming.platforms);
  }

  // Projects
  renderProjects(data.projects);

  // Achievements (Conditionally rendered)
  renderAchievements(data.achievements);

  // Education
  if (data.education) {
    document.getElementById("education-text").textContent =
      `${data.education.degree} — ${data.education.college} (${data.education.duration})`;
  }
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el && url && url.trim() !== "") {
    el.href = url;
  }
}

// Skills Renderer
function renderSkills(skillsObj) {
  const container = document.getElementById("skills-container");
  if (!container || !skillsObj) return;
  container.innerHTML = "";

  for (const catKey in skillsObj) {
    const categoryTitle = catKey.replace(/_/g, " ").toUpperCase();
    const skillsList = skillsObj[catKey];

    const card = document.createElement("div");
    card.className = "bg-gray-900/60 border border-gray-800 rounded-xl p-6 shadow-sm";

    let tagsHtml = skillsList.map(skill => {
      const iconClass = getSkillIcon(skill);
      return `
        <span class="px-3 py-1.5 bg-gray-800/80 border border-gray-700/80 rounded-lg text-sm text-gray-200 flex items-center gap-2">
          ${iconClass ? `<i class="${iconClass} text-base text-blue-400"></i>` : ""}
          ${skill}
        </span>
      `;
    }).join("");

    card.innerHTML = `
      <h3 class="text-sm font-semibold text-blue-400 tracking-wider mb-4 font-mono">${categoryTitle}</h3>
      <div class="flex flex-wrap gap-2.5">${tagsHtml}</div>
    `;

    container.appendChild(card);
  }
}

function getSkillIcon(skillName) {
  const name = skillName.toLowerCase();
  if (name.includes("c++")) return "devicon-cplusplus-plain";
  if (name.includes("python")) return "devicon-python-plain";
  if (name.includes("javascript")) return "devicon-javascript-plain";
  if (name.includes("react")) return "devicon-react-original";
  if (name.includes("next")) return "devicon-nextjs-plain";
  if (name.includes("node")) return "devicon-nodejs-plain";
  if (name.includes("express")) return "devicon-express-original";
  if (name.includes("fastapi")) return "devicon-fastapi-plain";
  if (name.includes("flask")) return "devicon-flask-original";
  if (name.includes("html")) return "devicon-html5-plain";
  if (name.includes("css")) return "devicon-css3-plain";
  if (name.includes("tailwind")) return "devicon-tailwindcss-plain";
  if (name.includes("mongo")) return "devicon-mongodb-plain";
  if (name.includes("sql")) return "devicon-sqlite-plain";
  if (name.includes("git")) return "devicon-git-plain";
  if (name.includes("github")) return "devicon-github-original";
  if (name.includes("docker")) return "devicon-docker-plain";
  if (name.includes("vscode")) return "devicon-vscode-plain";
  return "";
}

// CP Platforms Renderer
function renderCpPlatforms(platforms) {
  const container = document.getElementById("cp-platforms");
  if (!container || !platforms) return;
  container.innerHTML = "";

  platforms.forEach(plat => {
    const card = document.createElement("div");
    card.className = "bg-gray-800/60 border border-gray-700/60 rounded-xl p-5 text-center flex flex-col justify-between hover:border-blue-500/50 transition";
    card.innerHTML = `
      <div>
        <h4 class="font-bold text-white text-lg mb-1">${plat.name}</h4>
        <p class="text-sm text-gray-400">Max Rating</p>
        <p class="text-2xl font-bold text-blue-400 mt-1 font-mono">${plat.maxRating}</p>
      </div>
      <a href="${plat.link}" target="_blank" class="mt-4 inline-block text-xs text-gray-300 hover:text-white underline">
        View Profile →
      </a>
    `;
    container.appendChild(card);
  });
}

// Projects Renderer
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container || !projects) return;
  container.innerHTML = "";

  projects.forEach((proj, idx) => {
    const card = document.createElement("div");
    card.className = "bg-gray-900 border border-gray-700/80 rounded-2xl p-6 sm:p-8 shadow-md shadow-black/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/80 hover:-translate-y-1 relative overflow-hidden group";

    const techBadges = Array.isArray(proj.tech)
      ? proj.tech.map(t => `<span class="px-3 py-1 bg-blue-950/60 border border-blue-800/60 rounded-md text-xs font-mono text-blue-300">${t}</span>`).join("")
      : `<span class="px-3 py-1 bg-blue-950/60 border border-blue-800/60 rounded-md text-xs font-mono text-blue-300">${proj.tech}</span>`;

    card.innerHTML = `
      ${proj.featured ? '<div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">Featured</div>' : ''}
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-3 pr-16 group-hover:text-blue-400 transition-colors">${proj.title}</h3>
      <p class="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">${proj.description}</p>
      <div class="flex flex-wrap gap-2 mb-6">${techBadges}</div>
      <div class="pt-4 border-t border-gray-800 flex items-center justify-between">
        <a href="${proj.link}" target="_blank" class="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition">
          <span>Explore Repository</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
        <span class="text-xs text-gray-500 font-mono">#0${idx + 1}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// Achievements Renderer (Hide section if array is empty)
function renderAchievements(achievements) {
  const section = document.getElementById("achievements");
  const container = document.getElementById("achievements-container");

  if (!achievements || !Array.isArray(achievements) || achievements.length === 0) {
    if (section) section.classList.add("hidden");
    return;
  }

  if (section) section.classList.remove("hidden");
  if (!container) return;
  container.innerHTML = "";

  achievements.forEach(ach => {
    const card = document.createElement("div");
    card.className = "bg-gray-900/80 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/60 hover:-translate-y-1";
    card.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-2xl shrink-0">
          ${ach.icon || "🏆"}
        </div>
        <div>
          <span class="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">${ach.year}</span>
          <h4 class="font-bold text-white text-base mt-2 mb-1">${ach.title}</h4>
          <p class="text-xs text-gray-400 leading-relaxed">${ach.description}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Typewriter Utility
function typeWriterSequence(phrases, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
      speed = 2500; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// UI Setup Helpers
function setupMobileMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function setupPhoneCopy() {
  const phoneSpan = document.getElementById("phone");
  const copiedSpan = document.getElementById("phone-copied");
  if (!phoneSpan || !copiedSpan) return;

  phoneSpan.addEventListener("click", () => {
    const text = phoneSpan.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      copiedSpan.classList.remove("hidden");
      setTimeout(() => {
        copiedSpan.classList.add("hidden");
      }, 2000);
    });
  });
}
