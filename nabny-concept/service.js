/* =====================================================
   NABNY - SERVICES PAGE
===================================================== */


/* =========================
   LANGUAGE
========================= */

const languageToggle = document.getElementById(
    "servicesLanguageToggle"
);

let currentLanguage =
    localStorage.getItem("nabny-language") || "ar";


function updateServicesLanguage() {

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";


    document.body.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";


    document
        .querySelectorAll("[data-ar][data-en]")
        .forEach((element) => {

            const arabicText =
                element.getAttribute("data-ar");

            const englishText =
                element.getAttribute("data-en");

            element.textContent =
                currentLanguage === "ar"
                    ? arabicText
                    : englishText;

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

    languageToggle.addEventListener(
        "click",
        function () {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            updateServicesLanguage();

        }
    );

}


/* تشغيل اللغة */

updateServicesLanguage();



/* =========================
   SCROLL REVEAL
========================= */

const serviceCards =
    document.querySelectorAll(".service-card");


if ("IntersectionObserver" in window) {

    const servicesObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                    }

                });

            },
            {
                threshold:0.12
            }
        );


    serviceCards.forEach(function (card) {

        servicesObserver.observe(card);

    });

}