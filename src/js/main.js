/*==================== IMPORTS ====================*/
import html2pdf from 'html2pdf.js';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

/*==================== SHOW MENU ====================*/
function showMenu(toggleId, navId) {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
        })
    }
}
showMenu('nav-toggle', 'nav-menu');


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
function scrollActive() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(' a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector(' a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}
//window.addEventListener('scroll', scrollActive);


/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a 
    //tag with the scroll-top class
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener("load", () => {
    addEventListener('scroll', scrollTop);
});


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';
// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';
// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}
// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})


/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv');
}


/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScale() {
    document.body.classList.remove('scale-cv');
}


/*==================== GENERATE PDF ====================*/
// PDF generated area
let areaCv = document.getElementById('area-cv');
const resumeButton = document.getElementById('resume-button');
// Html2pdf options
const opt = {
    margin: 0
    , filename: 'Shahreaz Bin Alam.pdf'
    , image: {
        type: 'jpeg'
        , quality: 0.98
    }
    , html2canvas: {
        scale: 4
    }
    , jsPDF: {
        format: 'a4'
        , orientation: 'portrait'
    }
    , pagebreak: {
        after: '.html2pdf'
    }
};
// Function to call areaCv and Html2Pdf options 
function generateResume() {
    html2pdf(areaCv, opt);
}
// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
    // 1. The class .scale-cv is added to the body
    scaleCv();
    // 2. The PDF is generated
    generateResume();
    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScale, 5000);
});


/*==================== COPY TO CLIPBOARD ====================*/

tippy(".tooltip", {
    content: "Copy to clipboard",
});
    
tippy('.tooltip', {
    content: 'Copied!', 
    trigger: 'click', 
    hideOnClick: false, // if you want
    onShow(instance) {
        setTimeout(() => {
            instance.hide();
        }, 1000);
  }
});

function copyFunc(id) {
    const r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function addEventCopy(id) {
    const button = document.querySelector(`#${id}`);
    button.addEventListener('click', () => copyFunc(id));
}

// address copy
addEventCopy("tooltip-address");
// email copy
addEventCopy("tooltip-email");
// phone copy
addEventCopy("tooltip-phone");
