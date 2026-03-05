import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import projects from "./projects.json";

const placeholderImage =
  "https://hips.hearstapps.com/hmg-prod/images/ginger-maine-coon-kitten-running-on-lawn-in-royalty-free-image-1719608142.jpg";
const projectsList = document.querySelector(".projects-list");

const lenis = new Lenis({
  autoRaf: true
});

lenis.on('scroll', (e) => {
  console.log(e.targetScroll);
});

projects.projects.forEach((project) => {
  let markup = `<li class="projects-item animate">
              <img src="${project.thumbnail == true ? project.thumbnail : placeholderImage}" alt="Project thumbnail" class="projects-thumbnail">
              <p class="projects-name">${project.name}</p>
              <p class="projects-time">${new Date(
                project.lastUpdated,
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "numeric",
                year: "numeric",
              })}</p>
              <ul class="projects-links">
                <li class="projects-link"><a href="${project.activePage}" target="_blank">Website</a></li>
                <li class="projects-link"><a href="${project.sourceCode}" target="_blank">Source code</a></li>
              </ul>
            </li>`;
  projectsList.insertAdjacentHTML("beforeend", markup);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));