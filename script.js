fetch("data.json")
  .then(res => res.json())
  .then(data => {
    document.title = data.name;
    //document.getElementById("name").textContent = data.name;    (remove this line and add below one for typewriter effect)
    const nameEl = document.getElementById("name");
    typeWriter(nameEl, data.name, 90);

    document.getElementById("title").textContent = data.title;
    document.getElementById("tagline").textContent = data.tagline;
    document.getElementById("about-text").textContent = data.about;

    document.getElementById("github").href = data.links.github;
    document.getElementById("resume").href = data.links.resume;

    document.getElementById("education-text").textContent = data.education;

 
    /* ---------- SKILLS---------- */
    const skillsContainer = document.getElementById("skills-container");
    if (skillsContainer && data.skills) {
      for (const category in data.skills) {
        const skills = data.skills[category];
        if (!Array.isArray(skills)) continue;
        const card = document.createElement("div");
        card.className =
          "bg-gray-800 border-[3px] border-blue-900 rounded-xl p-6 " +
          "shadow-sm shadow-black/30 " +
          "transition-all duration-300 " +
          "hover:shadow-lg hover:shadow-blue-500/40 " +
          "hover:border-blue-500 hover:-translate-y-1";
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
          </div>`;
        skillsContainer.appendChild(card);
      }
    }
    /* ---------- COMPETITIVE PROGRAMMING ---------- */
    const cp = data.competitiveProgramming;
    if (cp) {
      document.getElementById("cp-summary").textContent = cp.summary;
      // Top stats
      document.getElementById("cp-problems").textContent = cp.totalProblemsSolved;
      document.getElementById("cp-contests").textContent = cp.totalContests;
      // Platform bars
      const platformContainer = document.getElementById("cp-platforms");
      cp.platforms.forEach(p => {
        const card = document.createElement("div");
        card.className =
          "bg-gray-800 border-[3px] border-blue-900 rounded-xl p-6 " +
          "shadow-sm shadow-black/30 " +
          "transition-all duration-300 " +
          "hover:shadow-lg hover:shadow-blue-500/40 " +
          "hover:border-blue-500 hover:-translate-y-1";
        card.innerHTML = `
          <div class="flex items-center gap-4 mb-3">
            <div class="w-10 h-10 rounded-md bg-white flex items-center justify-center">
              <img src="assets/${getPlatformLogo(p.name)}" alt="${p.name} logo" class="w-full h-full object-contain">
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">${p.name}</h3>
          </div>
          <p class="text-gray-400 mb-3">
            Max Rating:
            <span class="text-blue-400 font-bold">${p.maxRating}</span>
          </p>
          <a href="${p.link}" target="_blank"
            class="text-blue-400 hover:underline">
            View Profile →
          </a>`;
        platformContainer.appendChild(card);
      });
    } 

    /* ---------- Projects ---------- */
    const projectContainer = document.getElementById("projects-container");
    data.projects.forEach(p => {
      const card = document.createElement("div");
      card.className =
        "bg-gray-800 border-[3px] border-blue-900 rounded-xl p-6 mx-2" + // ← space added
        "shadow-sm shadow-black/30 " +
        "transition-all duration-300 " +
        "hover:shadow-lg hover:shadow-blue-500/40 " +
        "hover:border-blue-500 hover:-translate-y-1";
      card.innerHTML = `
        <h3 class="text-xl font-semibold text-white">${p.title}</h3>
        <p class="text-gray-400 mt-2">${p.description}</p>
        <p class="text-sm text-gray-500 mt-2">Tech: ${p.tech.join(", ")}</p>
        <a href="${p.link}" class="text-blue-400 mt-3 inline-block">GitHub →</a>
        `;
      projectContainer.appendChild(card);
    });

    /* ---------- EDUCATION ---------- */
    const educationEl = document.getElementById("education-text");
    if (educationEl && data.education) {
      educationEl.innerHTML = `
        <strong>${data.education.degree}</strong><br />
        ${data.education.college}<br />
        <span class="text-gray-400">${data.education.duration}</span>
        `;
    }
    /* ---------- EMAIL ---------- */
    const emailEl = document.getElementById("email");
    if (emailEl && data.links?.email) {
      const email = data.links.email;
      emailEl.textContent = email;
      emailEl.href = `mailto:${email}`;
    }
});


///copy and call logic for phone
const phoneEl = document.getElementById("phone");
const phoneCopied = document.getElementById("phone-copied");
if (phoneEl) {
  const phoneNumber = phoneEl.textContent.trim();
  phoneEl.addEventListener("click", () => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      phoneCopied.classList.remove("hidden");
      setTimeout(() => {
        phoneCopied.classList.add("hidden");
      }, 1500);
    });
  });
}


///Type writer logic:
function typeWriter(element, text, speed = 80) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

///Active Scrroll Logic
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("text-blue-400");
    link.classList.add("text-gray-400");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("text-gray-400");
      link.classList.add("text-blue-400");
    }
  });
});

///get skill icons
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

//logo matching
function getPlatformLogo(name) {
  const map = {
    "LeetCode": "leetcode logo.png",
    "Codeforces": "codeforces-Logo.png",
    "CodeChef": "codechef logo.jpeg"
  };
  return map[name] || "";
}

