const sidebarToggle = document.getElementById('sidebar-toggle');
const linksToHide = [
    document.querySelector('.active'),   
    document.getElementById('showabout'),
    document.getElementById('showeducation'),
    document.getElementById('showcv'),
    document.getElementById('showhobbies'),
    document.getElementById('showadvanture'),
    document.getElementById('showcontact')
];

const sections = {
    aboutMe: document.getElementById('about-me'),
    education: document.getElementById('education'),
    cv: document.getElementById('cv'),
    contact: document.getElementById('contact'),
    adventure: document.getElementById('adventure'),
    inter: document.getElementById('inter'),
    home: document.getElementById('home'),
};

function saveVisibilityState() {
    const visibility = linksToHide.map(link => link.style.display);
    localStorage.setItem('sidebar-link-visibility', JSON.stringify(visibility));
}

function loadVisibilityState() {
    const visibility = JSON.parse(localStorage.getItem('sidebar-link-visibility'));
    if (visibility) {
        linksToHide.forEach((link, index) => {
            link.style.display = visibility[index] || 'inline'; 
            link.style.opacity = link.style.display === 'inline' ? '1' : '0'; 
        });
    }
    adjustSectionMargin(); 
}

function showLinks(link) {
    link.style.opacity = 0; 
    link.style.display = 'inline'; 
    let opacity = 0;

    const interval = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.05; 
            link.style.opacity = opacity;
        } else {
            clearInterval(interval);
            saveVisibilityState(); 
            adjustSectionMargin(); 
        }
    }, 16); 
}

function hideLinks(link) {
    let opacity = 1;
    
    const interval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.05; 
            link.style.opacity = opacity;
        } else {
            link.style.display = 'none'; 
            clearInterval(interval); 
            saveVisibilityState(); 
            adjustSectionMargin(); 
        }
    }, 16); 
}

function adjustSectionMargin() {
    const atLeastOneVisible = linksToHide.some(link => link.style.display !== 'none');
    if (window.innerWidth <= 1270) {
        for (const key in sections) {
            if (sections[key]) {
                sections[key].style.marginTop = atLeastOneVisible ? '260px' : '0px';
            }
        }
    } else {
        for (const key in sections) {
            if (sections[key]) {
                sections[key].style.marginTop = '0px'; 
            }
        }
    }
}

loadVisibilityState();

sidebarToggle.addEventListener('click', function(event) {
    linksToHide.forEach(link => {
        if (link.style.display === 'none' || link.style.opacity === '0' || link.style.opacity === '') {
            showLinks(link); 
        } else {
            hideLinks(link); 
        }
    });
});

window.addEventListener('resize', adjustSectionMargin); 

const logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', function(event) {
    event.preventDefault(); 
    event.stopPropagation(); 
});

document.addEventListener("DOMContentLoaded", () => {
    const socialIcons = document.querySelector(".social-icons");
    const hideButton = document.querySelector(".btn.hide");
    const showButton = document.querySelector(".btn.show");
    const isHidden = localStorage.getItem("socialIconsHidden") === "true";

    if (isHidden) {
        socialIcons.style.display = "none";
    } else {
        socialIcons.style.display = "flex";
    }
    hideButton.addEventListener("click", () => {
        socialIcons.style.display = "none";
        localStorage.setItem("socialIconsHidden", "true");
    });
    showButton.addEventListener("click", () => {
        socialIcons.style.display = "flex";
        localStorage.setItem("socialIconsHidden", "false");
    });
});
