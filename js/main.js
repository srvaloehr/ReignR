document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(item => revealObserver.observe(item));

    const counters = document.querySelectorAll(".count");

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 60));

            const updateCounter = () => {
                current += increment;

                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
            observer.unobserve(counter);
        });
    }, {
        threshold: 0.6
    });

    counters.forEach(counter => counterObserver.observe(counter));

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            formMessage.textContent = "Thank you. Your request has been received.";
            contactForm.reset();
        });
    }

    const quickContactForm = document.getElementById("quick-contact-form");
    const quickFormMessage = document.getElementById("quick-form-message");

    if (quickContactForm && quickFormMessage) {
        quickContactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            quickFormMessage.textContent = "Thank you. Your request has been received.";
            quickContactForm.reset();
        });
    }
});