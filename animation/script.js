```javascript
/* =====================================================
   script.js - PART 1
   Theme + Language + Typing Effect
===================================================== */

const body = document.body;

const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");

let currentLang = localStorage.getItem("lang") || "vi";

/* ===========================
   Theme
=========================== */

function setTheme(theme){

    if(theme === "light"){

        body.classList.add("light");
        themeBtn.textContent = "☀️";

    }else{

        body.classList.remove("light");
        themeBtn.textContent = "🌙";

    }

    localStorage.setItem("theme",theme);

}

setTheme(localStorage.getItem("theme") || "dark");

themeBtn.addEventListener("click",()=>{

    const next =
        body.classList.contains("light")
        ? "dark"
        : "light";

    setTheme(next);

});

/* ===========================
   Language
=========================== */

function setLanguage(lang){

    currentLang = lang;

    localStorage.setItem("lang",lang);

    langBtn.textContent =
        lang.toUpperCase();

    document.querySelectorAll(".lang")
    .forEach(item=>{

        const text =
            item.dataset[lang];

        if(text){

            item.innerHTML = text;

        }

    });

}

setLanguage(currentLang);

langBtn.onclick=()=>{

    if(currentLang==="vi"){

        setLanguage("en");

    }else{

        setLanguage("vi");

    }

};

/* ===========================
   Typing Effect
=========================== */

const typing =
document.getElementById("typing");

const textVI=[

"Front-End Developer",

"HTML CSS JavaScript",

"UI / UX Designer",

"Open Source Lover"

];

const textEN=[

"Front-End Developer",

"HTML CSS JavaScript",

"UI / UX Designer",

"Open Source Lover"

];

let wordIndex=0;

let charIndex=0;

let deleting=false;

function typingEffect(){

    const list =
    currentLang==="vi"
    ? textVI
    : textEN;

    const word =
    list[wordIndex];

    if(!deleting){

        typing.textContent =
        word.substring(0,charIndex++);

        if(charIndex>
        word.length){

            deleting=true;

            setTimeout(
                typingEffect,
                1300
            );

            return;

        }

    }else{

        typing.textContent =
        word.substring(0,charIndex--);

        if(charIndex<0){

            deleting=false;

            wordIndex++;

            if(wordIndex>=list.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(
        typingEffect,
        deleting?40:90
    );

}

typingEffect();
```javascript
/* =====================================================
   script.js - PART 2
   Scroll Animation + Active Menu + Back To Top
===================================================== */

/* ===========================
   Fade Animation
=========================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
    ".glass-card,.project,.section-title,.hero"
).forEach(el=>{

    el.classList.add("fade-up");

    observer.observe(el);

});

/* ===========================
   Active Navigation
=========================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top =
        section.offsetTop-120;

        const height =
        section.offsetHeight;

        if(scrollY>=top){

            current=section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            ==="#"+current
        ){

            link.classList.add("active");

        }

    });

});

/* ===========================
   Header Effect
=========================== */

const header =
document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.style.backdropFilter="blur(25px)";
        header.style.boxShadow=
        "0 0 25px rgba(79,140,255,.25)";

    }else{

        header.style.boxShadow="none";

    }

});

/* ===========================
   Back To Top Button
=========================== */

const topBtn =
document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.right="25px";
topBtn.style.bottom="25px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.border="none";
topBtn.style.borderRadius="15px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.fontSize="20px";
topBtn.style.background="var(--main)";
topBtn.style.color="#fff";
topBtn.style.zIndex="999";
topBtn.style.transition=".3s";

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ===========================
   Smooth Anchor
=========================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",e=>{

        e.preventDefault();

        const target=
        document.querySelector(
            anchor.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
```javascript id="wq8fz2"
/* =====================================================
   script.js - PART 3
   Particles + Cursor Glow + Loader
===================================================== */

/* ===========================
   Particles.js
=========================== */

if (window.particlesJS) {

    particlesJS("particles", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },

            color: {
                value: "#4f8cff"
            },

            shape: {
                type: "circle"
            },

            opacity: {
                value: 0.4
            },

            size: {
                value: 3,
                random: true
            },

            line_linked: {
                enable: true,
                distance: 150,
                color: "#4f8cff",
                opacity: 0.3,
                width: 1
            },

            move: {
                enable: true,
                speed: 2,
                direction: "none",
                out_mode: "out"
            }
        },

        interactivity: {
            detect_on: "canvas",

            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },

                onclick: {
                    enable: true,
                    mode: "push"
                },

                resize: true
            },

            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.7
                    }
                },

                push: {
                    particles_nb: 4
                }
            }
        },

        retina_detect: true
    });

}

/* ===========================
   Cursor Glow
=========================== */

const glow = document.createElement("div");
glow.className = "cursor-glow";

Object.assign(glow.style, {
    position: "fixed",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "rgba(79,140,255,.35)",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    filter: "blur(10px)",
    zIndex: "9999",
    transition: "transform .08s linear"
});

document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/* ===========================
   Page Loader
=========================== */

const loader = document.createElement("div");

loader.innerHTML = `
<div class="loader"></div>
`;

Object.assign(loader.style, {
    position: "fixed",
    inset: "0",
    background: "var(--bg)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999",
    transition: ".6s"
});

document.body.appendChild(loader);

window.addEventListener("load", () => {

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.remove();

    }, 600);

});

/* ===========================
   Current Year
=========================== */

const footerYear = document.getElementById("year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

/* ===========================
   Console Message
=========================== */

console.clear();

console.log("%cWelcome 👋", "font-size:22px;color:#4f8cff;font-weight:bold;");
console.log("%cWebsite by Your Name", "color:#ffffff;");
console.log("%cHave a great day!", "color:#7aa2ff;");
