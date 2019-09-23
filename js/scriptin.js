// redirect for project links
const redirectLinks = {
    calc: "https://ez-calc.herokuapp.com",
    pixxel: "https://pixxel-art.herokuapp.com",
    wellnest: "https://wellnest.co",
    wavy: "https://wavy-rps.herokuapp.com",
    github: "https://github.com/noahtalerman",
    dribbble: "https://dribbble.com/noahtal"
}

function getBrowser() {
    let browser  = navigator.userAgent;
    if (browser.indexOf('Firefox') > -1) {
        browser = 'Firefox';
    } else if (browser.indexOf('Chrome') > -1) {
        browser = 'Chrome';
    }
    return browser;
}

function revealPreview(project) {
    let preview = document.querySelector('.preview-container');
    let browser = getBrowser();
    if (browser !== 'Firefox') {
        preview.style.filter = 'blur(100px)'
    }
    let prevTimer = window.setTimeout(function() {
        preview.style.opacity = '1';
        if (browser !== 'Firefox') {
            preview.style.filter = 'none';
        }
        if (project.textContent === 'ez-calculator') {
            preview.innerHTML = '<video muted loop autoplay src="images/trim-2-720p.mov"></video>'
        } else if (project.textContent === 'pixxel-art') {
            preview.innerHTML = '<video muted loop autoplay src="images/trim-pixxel-720p.mov"></video>'
        } else if (project.textContent === 'wellnest.co') {
            preview.innerHTML = '<video muted loop autoplay src="images/wellnest-demo720.mov"></video>'
        }
    }, 1000);
    return prevTimer;
}

function revealTech(project) {
    console.log(project.childNodes[3])
    let tech = project.childNodes[3];
    tech.style.setProperty('opacity', '1');
    tech.style.setProperty('transform', 'translate(0, 0)');
}

function hideTech(project) {
    let tech = project.childNodes[1].childNodes[3];
    tech.style.setProperty('opacity', '0');
    tech.style.setProperty('transform', 'translate(-20px, 0)');
}

function dimText(text) {
    setTimeout(function() {
        if(text.classList[1] !== 'active') {
            text.style.color = '#b9e0fe';
            text.style.textShadow = '0 0 10px #59baff, 0.5px 0 0 #59baff, -0.5px 0 0 #59baff';
        }
    }, 500)
}

function hidePreview() {
    let preview = document.querySelector('.preview-container');
    preview.style.opacity = '0';
    let browser = getBrowser();
    if (browser !== 'Firefox') {
        preview.style.filter = 'blur(100px)'
    }
}

function desktopMouseLeave(timer) {
    let projectItems = document.querySelectorAll('.project-item');
    let projectTitles = document.querySelectorAll('.project-title');
    let projectDescriptions = document.querySelectorAll('.project-description');
    projectItems.forEach(item => item.addEventListener('mouseleave', function() {
        item.childNodes[1].childNodes[1].classList.remove('active');
        for (let i = 0; i < projectItems.length; ++i) {
            if (item === projectItems[i]) {
                hidePreview();
                hideTech(item);
                window.clearTimeout(timer);
                projectDescriptions[i].style.height = '0';
                projectDescriptions[i].style.paddingTop = '0';
                projectTitles[i].style.color = '#59baff';
                projectTitles[i].style.textShadow = '0 0 0 #59baff';
                dimText(item.childNodes[1].childNodes[1]);
            }
        }
    }));
}

function desktopHover() {
    let projectTitles = document.querySelectorAll('.project-title');
    let projectDescriptions = document.querySelectorAll('.project-description');
    let timer = undefined;
    projectTitles.forEach(title => title.style.cursor = 'pointer');
    projectDescriptions.forEach(descr => descr.style.cursor = 'pointer');
    projectTitles.forEach(title => title.addEventListener('mouseenter', function() {
        title.classList.add('active');
        title.style.color = '#feffbf';
        title.style.textShadow = '0 0 10px #feffbf, 0 0 30px #feffbf, 0.5px 0 0px #feffbf, -0.5px 0 0px #feffbf';
        for (let i = 0; i < projectTitles.length; ++i) {
            if (title === projectTitles[i]) {
                revealTech(title.parentNode);
                timer = revealPreview(projectTitles[i]);
                let descriptHeight = projectDescriptions[i].childNodes[1].offsetHeight;
                projectDescriptions[i].style.height = `${descriptHeight}px`;
                projectDescriptions[i].style.paddingTop = '5px';
            }
        }
        desktopMouseLeave(timer);
    }))
}

function desktopLinkHover() {
    let links = document.querySelectorAll('.links-item');
    links.forEach(link => link.addEventListener('mouseenter', function() {
        link.childNodes[1].classList.add('active');
        link.childNodes[1].style.color = '#feffbf';
        link.childNodes[1].style.textShadow = '0 0 10px #feffbf, 0 0 30px #feffbf, 0.5px 0 0 #feffbf, -0.5px 0 0 #feffbf';
    }))
    links.forEach(link => link.addEventListener('mouseleave', function() {
        link.childNodes[1].classList.remove('active');
        link.childNodes[1].style.textShadow = '0 0 0 #59baff';
        link.childNodes[1].style.color = '#59baff';
        dimText(link.childNodes[1])
    }))
    links.forEach(link => link.style.cursor = 'pointer');
}

function desktopClick() {
    // redirect for projects
    let projectItems = document.querySelectorAll('.project-item');
    let links = document.querySelectorAll('.links-item');
    projectItems.forEach(item => item.addEventListener('mouseup', function() {
        let classes = item.classList;
        for (let i = 0; i < classes.length; ++i) {
            for (key in redirectLinks) {
                if (classes[i] === key) {
                    window.open(redirectLinks[key]);
                }
            }
        }
    }));
    // redirect for social links
    links.forEach(link => link.addEventListener('mouseup', function() {
        let classes = link.classList;
        for (let i = 0; i < classes.length; ++i) {
            for (key in redirectLinks) {
                if (classes[i] === key) {
                    window.open(redirectLinks[key]);
                }
            }
        }
    }))
};

function desktopControl() {
    desktopHover();
    desktopClick();
    desktopLinkHover();
}

// add height to menu container so description reveal does not bump up links on right side
function fixHeight() {
    let menuContHeight = document.querySelector('.menu-container').offsetHeight;
    document.querySelector('.menu-container').style.setProperty('height', `${menuContHeight}px`)
}

// second tap on mobile for project links if description is already open
function openProject(project) {
    let activeItem = document.querySelector('.active');
    if (activeItem === project.parentNode.parentNode) {
        let classes = activeItem.classList;
        window.location.href = redirectLinks[classes[1]]
    }
}

// first tap on mobile for project links
function tapMobile() {
    let projectTitles = document.querySelectorAll('.project-title');
    let projectItems = document.querySelectorAll('.project-item');
    let projectDescriptions = document.querySelectorAll('.project-description');
    let links = document.querySelectorAll('.links-item');
    projectTitles.forEach(title => title.addEventListener('touchend', function() {
        openProject(title);
        revealTech(title.parentNode);
        title.style.color = '#feffbf';
        title.style.textShadow = '0 0 10px #feffbf, 0.5px 0 0 #feffbf, -0.5px 0 0 #feffbf';
        for (let i = 0; i < projectTitles.length; ++i) {
            projectItems[i].classList.remove('active');
            if (projectTitles[i] !== title) {
                projectTitles[i].style.color = '#b9e0fe';
                projectTitles[i].style.textShadow = '0 0 10px #59baff';
            }
            projectDescriptions[i].style.paddingTop = '0';
            projectDescriptions[i].style.height = '0';
            if (title === projectTitles[i]) {
                let descriptHeight = projectDescriptions[i].childNodes[1].offsetHeight;
                projectDescriptions[i].style.height = `${descriptHeight}px`;
                projectDescriptions[i].style.paddingTop = '5px';
                title.parentNode.parentNode.classList.add('active');
            }
        }
    }));
    links.forEach(link => link.addEventListener('touchend', function() {
        let classes = link.classList;
        for (let i = 0; i < classes.length; ++i) {
            for (key in redirectLinks) {
                if (classes[i] === key) {
                    window.location.href = redirectLinks[key];
                }
            }
        }
    }));
}

function closeDescriptMobile() {
    let projectTitles = document.querySelectorAll('.project-title');
    let projectItems = document.querySelectorAll('.project-item');
    let projectDescriptions = document.querySelectorAll('.project-description');
    document.addEventListener('touchend', function(e) {
        let classes = e.target.classList;
        let close = false;
        if (!classes[0].includes('project')) {
            close = true;
        }  else {
            close = false;
        }
        if (close) {
            for (let i = 0; i < projectDescriptions.length; ++i) {
                projectItems[i].classList.remove('active');
                projectDescriptions[i].style.height = '0';
                projectTitles[i].style.color = '#b9e0fe';
                projectTitles[i].style.textShadow = '0 0 10px #59baff';
                projectDescriptions[i].style.paddingTop = '0';
            }
        }
    });
}

if (/Mobi|Android/i.test(navigator.userAgent)) {
    // mobile
    tapMobile();
    fixHeight();
    closeDescriptMobile();
} else {
    // desktop
    desktopControl();
    fixHeight();
    // touch screen desktop
    tapMobile();
    closeDescriptMobile();
}