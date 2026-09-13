/* =========================
   LANGUAGE SWITCH
========================= */

const languageToggle = document.getElementById("languageToggle");

const savedLanguage =
    localStorage.getItem("nabny-language") || "ar";

let currentLanguage = savedLanguage;


function updateLanguage() {

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    document.body.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";


    document
        .querySelectorAll("[data-ar][data-en]")
        .forEach((element) => {

            element.textContent =
                currentLanguage === "ar"
                    ? element.getAttribute("data-ar")
                    : element.getAttribute("data-en");

        });


    if (languageToggle) {

        const label =
            languageToggle.querySelector("span");

        if (label) {

            label.textContent =
                currentLanguage === "ar"
                    ? "EN"
                    : "AR";

        }


        languageToggle.setAttribute(
            "aria-label",
            currentLanguage === "ar"
                ? "Switch to English"
                : "التبديل إلى العربية"
        );

    }


    localStorage.setItem(
        "nabny-language",
        currentLanguage
    );
}


if (languageToggle) {

    languageToggle.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "ar"
                ? "en"
                : "ar";

        updateLanguage();

    });

}


updateLanguage();



/* =========================
   PROJECT GALLERY
========================= */

const track =
    document.getElementById("galleryTrack");

const slides =
    track
        ? Array.from(track.children)
        : [];

const nextButton =
    document.getElementById("galleryNext");

const prevButton =
    document.getElementById("galleryPrev");

let galleryIndex = 0;


function moveGallery(index) {

    if (!track || slides.length === 0) {
        return;
    }


    galleryIndex =
        (index + slides.length) %
        slides.length;


    track.style.transform =
        `translateX(-${galleryIndex * 100}%)`;

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {
            moveGallery(galleryIndex + 1);
        }
    );

}


if (prevButton) {

    prevButton.addEventListener(
        "click",
        () => {
            moveGallery(galleryIndex - 1);
        }
    );

}



/* =========================
   MOBILE SWIPE
========================= */

let startX = 0;
let endX = 0;


if (track) {

    track.addEventListener(
        "touchstart",
        (event) => {

            startX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    track.addEventListener(
        "touchend",
        (event) => {

            endX =
                event.changedTouches[0].screenX;

            const distance =
                endX - startX;


            if (Math.abs(distance) > 45) {

                if (distance < 0) {

                    moveGallery(
                        galleryIndex + 1
                    );

                } else {

                    moveGallery(
                        galleryIndex - 1
                    );

                }

            }

        },
        {
            passive: true
        }
    );

}



/* =========================
   STATISTICS COUNTERS
========================= */

const counters =
    document.querySelectorAll(
        ".metric-card strong"
    );

const metricSection =
    document.querySelector(
        ".metrics-section"
    );

let counted = false;


function animateCounters() {

    if (
        counted ||
        !metricSection
    ) {
        return;
    }


    counted = true;


    counters.forEach((counter) => {

        const target =
            Number(
                counter.dataset.target || 0
            );

        const suffix =
            counter.dataset.suffix || "";


        const duration = 900;

        const startTime =
            performance.now();


        function step(now) {

            const progress =
                Math.min(
                    (now - startTime) /
                    duration,
                    1
                );


            const value =
                Math.floor(
                    progress * target
                );


            counter.innerHTML = `
                <span class="metric-number-value">
                    ${value}
                </span>
                <span class="metric-number-plus">
                    ${suffix}
                </span>
            `;


            if (progress < 1) {

                requestAnimationFrame(step);

            } else {

                counter.innerHTML = `
                    <span class="metric-number-value">
                        ${target}
                    </span>
                    <span class="metric-number-plus">
                        ${suffix}
                    </span>
                `;

            }

        }


        requestAnimationFrame(step);

    });

}


if (
    metricSection &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                if (
                    entries[0].isIntersecting
                ) {

                    animateCounters();

                    observer.disconnect();

                }

            },
            {
                threshold: 0.35
            }
        );


    observer.observe(metricSection);

} else {

    animateCounters();

}



/* =========================
   SCROLL REVEAL
   يظهر مع النزول
   ويختفي مع الرجوع للأعلى
========================= */

const revealElements =
    document.querySelectorAll(
        ".about-home, .project-gallery-section, .metrics-section, .clients-section, .home-closing"
    );


revealElements.forEach((element) => {

    element.classList.add(
        "scroll-reveal"
    );

});


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    entry.target.classList.toggle(
                        "is-visible",
                        entry.isIntersecting
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "is-visible"
        );

    });

}