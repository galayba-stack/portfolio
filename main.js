// 🔘 Навігація по секціях через IntersectionObserver
const sections = document.querySelectorAll("main section");
const dots = document.querySelectorAll(".dot-navigation .dot");

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6 // 60% секції має бути видно
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");

            dots.forEach(dot => {
                dot.classList.remove("active");
                if (dot.getAttribute("href") === "#" + currentId) {
                    dot.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// 🧭 Клік по крапці з кастомним плавним скролом
function smoothScrollTo(targetElement, duration = 800) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute("href").replace("#", "");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            smoothScrollTo(targetSection, 800);
        }
    });
});

const texts = document.querySelectorAll(".dropping-texts div");
let index = 0;

function showNextText() {
    texts.forEach((text, i) => {
        text.classList.remove("active");
        if (i === index) {
            text.classList.add("active");
        }
    });

    index = (index + 1) % texts.length;
}

setInterval(showNextText, 2000); // змінюється кожні 2 секунди
showNextText(); // показати перший одразу

const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    // Зміна фото
    themeIcon.src = isDark ? "img/day.png" : "img/night.png";
    themeIcon.alt = isDark ? "Light theme" : "Dark theme";

    // Збереження вибору
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// При завантаженні — перевірити збережену тему
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.body.classList.add("dark-theme");
    }

    themeIcon.src = isDark ? "img/day.png" : "img/night.png";
    themeIcon.alt = isDark ? "Light theme" : "Dark theme";
});
