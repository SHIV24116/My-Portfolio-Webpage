document.addEventListener("DOMContentLoaded", () => {
  /* ================= FETCH DATA ================= */
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      document.title = data.name;
      // Name (typewriter)
      const nameEl = document.getElementById("name");
      if (nameEl) {
        typeWriterSequence(
          nameEl,
          [
          data.name,                 // from JSON
          "Welcome to my Portfolio"  // second line
          ]
        );
      }
      // Hero content
      const titleEl = document.getElementById("title");
      const taglineEl = document.getElementById("tagline");
      const aboutEl = document.getElementById("about-text");
      if (titleEl) titleEl.textContent = data.title;
      if (taglineEl) taglineEl.textContent = data.tagline;
      if (aboutEl) aboutEl.textContent = data.about;
      // Links
      if (data.links) {
        const github = document.getElementById("github");
        const resume = document.getElementById("resume");
        const linkedin = document.getElementById("linkedin");
        if (github) github.href = data.links.github;
        if (resume) resume.href = data.links.resume;
        if (linkedin) linkedin.href = data.links.linkedin;
      }
      /* ================= SKILLS ================= */
      const skillsContainer = document.getElementById("skills-container");
      if (skillsContainer && data.skills) {
        for (const category in data.skills) {
          const skills = data.skills[category];
          if (!Array.isArray(skills)) continue;
          const card = document.createElement("div");
          card.className =
            "bg-gray-800 border-[3px] border-blue-900 rounded-xl p-6 " +
            "shadow-sm shadow-black/30 transition-all duration-300 " +
            "hover:shadow-lg hover:shadow-blue-500/40 hover:border-blue-500 hover:-translate-y-1";
          card.innerHTML = `
            <h3 class="text-xl font-semibold text-blue-400 mb-4">
              ${category.replace("_", " ").toUpperCase()}
            </h3>
            <div class="flex flex-wrap gap-3">
              ${skills.map(skill => `
                <div class="flex items-center gap-2 px-3 py-2
                            bg-gray-900 border border-gray-700
                            rounded-lg text-sm text-gray-200
                            hover:border-blue-400 transition">
                  <i class="${getSkillIcon(skill)} text-lg"></i>
                  <span>${skill}</span>
                </div>
              `).join("")}
            </div>
          `;
          skillsContainer.appendChild(card);
        }
      }
      /* ================= COMPETITIVE PROGRAMMING ================= */
      const cp = data.competitiveProgramming;
      if (cp) {
        const cpSummary = document.getElementById("cp-summary");
        const cpProblems = document.getElementById("cp-problems");
        const cpContests = document.getElementById("cp-contests");
        if (cpSummary) cpSummary.textContent = cp.summary;
        if (cpProblems) cpProblems.textContent = cp.totalProblemsSolved;
        if (cpContests) cpContests.textContent = cp.totalContests;
        const platformContainer = document.getElementById("cp-platforms");
        if (platformContainer) {
          cp.platforms.forEach(p => {
            const card = document.createElement("div");
            card.className =
              "bg-gray-800 border-[3px] border-blue-900 rounded-xl p-6 " +
              "shadow-sm shadow-black/30 transition-all duration-300 " +
              "hover:shadow-lg hover:shadow-blue-500/40 hover:border-blue-500 hover:-translate-y-1";
            card.innerHTML = `
              <div class="flex items-center gap-4 mb-3">
                <div class="w-10 h-10 rounded-md bg-white flex items-center justify-center">
                  <img src="assets/${getPlatformLogo(p.name)}"
                       alt="${p.name} logo"
                       class="w-full h-full object-contain">
                </div>
                <h3 class="text-xl font-semibold text-white">${p.name}</h3>
              </div>
              <p class="text-gray-400 mb-3">
                Max Rating:
                <span class="text-blue-400 font-bold">${p.maxRating}</span>
              </p>
              <a href="${p.link}" target="_blank"
                 class="text-blue-400 hover:underline">
                View Profile →
              </a>
            `;
            platformContainer.appendChild(card);
          });
        }
      }
      /* ================= PROJECTS ================= */
      const projectContainer = document.getElementById("projects-container");
      if (projectContainer && data.projects) {
        data.projects.forEach(p => {
          const card = document.createElement("div");
          card.className =
            "bg-gray-800 border-[3px] border-blue-900 rounded-xl p-6 mx-2 " +
            "shadow-sm shadow-black/30 transition-all duration-300 " +
            "hover:shadow-lg hover:shadow-blue-500/40 hover:border-blue-500 hover:-translate-y-1";
          card.innerHTML = `
            <h3 class="text-xl font-semibold text-white">${p.title}</h3>
            <p class="text-gray-400 mt-2">${p.description}</p>
            <p class="text-sm text-gray-500 mt-2">Tech: ${p.tech.join(", ")}</p>
            <a href="${p.link}" class="text-blue-400 mt-3 inline-block">
              GitHub →
            </a>
          `;
          projectContainer.appendChild(card);
        });
      }
      /* ================= EDUCATION ================= */
      const educationEl = document.getElementById("education-text");
      if (educationEl && data.education) {
        educationEl.innerHTML = `
          <strong>${data.education.degree}</strong><br />
          ${data.education.college}<br />
          <span class="text-gray-400">${data.education.duration}</span>
        `;
      }
      /* ================= EMAIL ================= */
      const emailEl = document.getElementById("email");
      if (emailEl && data.links?.email) {
        emailEl.textContent = data.links.email;
        emailEl.href = `mailto:${data.links.email}`;
      }
    });
  /* ================= PHONE COPY ================= */
  const phoneEl = document.getElementById("phone");
  const phoneCopied = document.getElementById("phone-copied");
  if (phoneEl && phoneCopied) {
    phoneEl.addEventListener("click", () => {
      navigator.clipboard.writeText(phoneEl.textContent.trim()).then(() => {
        phoneCopied.classList.remove("hidden");
        setTimeout(() => phoneCopied.classList.add("hidden"), 1500);
      });
    });
  }
  /* ================= MOBILE NAVBAR TOGGLE ================= */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    // Close menu when link clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
  /* ================= ACTIVE SCROLL ================= */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop &&
          pageYOffset < sectionTop + section.offsetHeight) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        "text-blue-400",
        link.getAttribute("href") === `#${current}`
      );
      link.classList.toggle(
        "text-gray-400",
        link.getAttribute("href") !== `#${current}`
      );
    });
  });
});
/* ================= UTILITIES ================= */
function typeWriterSequence(
  element,
  texts,
  typingSpeed = 80,
  erasingSpeed = 50,
  pauseAfterType = 1000,
  pauseAfterErase = 500
) {
  let textIndex = 0;
  let charIndex = 0;
  let isTyping = true;
  element.textContent = "";
  function animate() {
    const currentText = texts[textIndex];
    if (isTyping) {
      if (charIndex < currentText.length) {
        element.textContent += currentText.charAt(charIndex++);
        setTimeout(animate, typingSpeed);
      } else {
        setTimeout(() => {
          isTyping = false;
          animate();
        }, pauseAfterType);
      }
    } else {
      if (charIndex > 0) {
        element.textContent = currentText.substring(0, --charIndex);
        setTimeout(animate, erasingSpeed);
      } else {
        textIndex = (textIndex + 1) % texts.length;
        isTyping = true;
        setTimeout(animate, pauseAfterErase);
      }
    }
  }
  animate();
}


function getSkillIcon(skill) {
  const map = {
    "C++": "devicon-cplusplus-plain colored",
    "Python": "devicon-python-plain colored",
    "JavaScript": "devicon-javascript-plain colored",
    "HTML": "devicon-html5-plain colored",
    "CSS": "devicon-css3-plain colored",
    "Tailwind CSS": "devicon-tailwindcss-plain colored",
    "Git": "devicon-git-plain colored",
    "GitHub": "devicon-github-original",
    "OpenCV": "devicon-opencv-plain colored",
    "NumPy": "devicon-numpy-plain colored",
    "Pandas": "devicon-pandas-plain colored",
    "Matplotlib": "devicon-matplotlib-plain colored",
    "MATLAB": "devicon-matlab-plain colored",
    "Arduino": "devicon-arduino-plain colored"
  };
  return map[skill] || "devicon-code-plain";
}
function getPlatformLogo(name) {
  const map = {
    "LeetCode": "leetcode logo.png",
    "Codeforces": "codeforces-Logo.png",
    "CodeChef": "codechef logo.jpeg"
  };
  return map[name] || "";
}
