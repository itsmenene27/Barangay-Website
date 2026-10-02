document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("barangayWelcomeShown")) {
    const welcomeDialog = document.createElement("dialog");
    welcomeDialog.className = "welcome-dialog";
    welcomeDialog.setAttribute("aria-labelledby", "welcomeTitle");
    welcomeDialog.innerHTML = `
      <div class="welcome-dialog-content">
        <p class="welcome-eyebrow">Barangay Pugay</p>
        <h2 id="welcomeTitle">Welcome to WS1 – Web Systems and Technologies.</h2>
        <p>This course covers various web design concepts and techniques that will allow students to design, build and create effective, interactive, and dynamic web applications programs.</p>
        <button class="button welcome-close" type="button">Continue</button>
      </div>
    `;
    document.body.append(welcomeDialog);
    welcomeDialog.showModal();
    welcomeDialog.querySelector(".welcome-close").addEventListener("click", () => welcomeDialog.close());
    sessionStorage.setItem("barangayWelcomeShown", "true");
  }

  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Highlight the current page in the navigation.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Registration form: client-side validation, then show the thank-you page.
  const form = document.querySelector("#registrationForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name = document.querySelector("#fullName")?.value.trim() || "visitor";
      sessionStorage.setItem("barangayVisitorName", name);

      window.location.href = "thankyou.html";
    });
  }

  const visitorName = sessionStorage.getItem("barangayVisitorName");
  const thankMessage = document.querySelector("#thankMessage");
  if (visitorName && thankMessage) {
    thankMessage.innerHTML = `<strong>Thank you, ${visitorName}!</strong>`;
  }
});