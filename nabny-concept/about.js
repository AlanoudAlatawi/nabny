/* =====================================================
   NABNY - ABOUT PAGE ONLY
===================================================== */


/* =========================
   LANGUAGE
========================= */

const languageToggle =
    document.getElementById("aboutLanguageToggle");

const savedLanguage =
    localStorage.getItem("nabny-language") || "ar";

let currentLanguage = savedLanguage;


function updateAboutLanguage(){

    document.documentElement.lang =
        currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";

    document.body.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    document
        .querySelectorAll("[data-ar][data-en]")
        .forEach((element) => {

            element.textContent =
                currentLanguage === "ar"
                    ? element.getAttribute("data-ar")
                    : element.getAttribute("data-en");

        });


    if(languageToggle){

        const label =
            languageToggle.querySelector("span");

        if(label){

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


if(languageToggle){

    languageToggle.addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            updateAboutLanguage();

        }
    );

}


updateAboutLanguage();



/* =========================
   SCROLL REVEAL
========================= */

const aboutRevealElements =
    document.querySelectorAll(
        ".about-reveal"
    );


if(
    "IntersectionObserver" in window
){

    const aboutObserver =
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
                threshold:0.12
            }
        );


    aboutRevealElements.forEach(
        (element) => {

            aboutObserver.observe(element);

        }
    );

}else{

    aboutRevealElements.forEach(
        (element) => {

            element.classList.add(
                "is-visible"
            );

        }
    );

}