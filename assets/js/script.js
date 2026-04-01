/* =================== CUSTOM CURSOR =================== */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower
function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effects
const hoverTargets = document.querySelectorAll('a, button, .btn, .tool-chip, .project-card, .info-card, .tag, .nav-link');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        cursorFollower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        cursorFollower.classList.remove('hovering');
    });
});

/* =================== NAVBAR =================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveLink();
});

const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

/* =================== MOBILE MENU =================== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

/* =================== SMOOTH SCROLL =================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* =================== SCROLL REVEAL =================== */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, idx) => {
                if (sib === entry.target) delay = idx * 80;
            });
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* =================== TOOL CHIP STAGGER =================== */
const toolChips = document.querySelectorAll('.tool-chip');
const toolObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        toolChips.forEach((chip, i) => {
            setTimeout(() => {
                chip.style.opacity = '1';
                chip.style.transform = 'translateY(0)';
            }, i * 50);
        });
        toolObserver.disconnect();
    }
}, { threshold: 0.2 });

toolChips.forEach(chip => {
    chip.style.opacity = '0';
    chip.style.transform = 'translateY(16px)';
    chip.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const toolSection = document.querySelector('.tools');
if (toolSection) toolObserver.observe(toolSection);

/* =================== CONTACT FORM =================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const params = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        emailjs.send('service_7g66p6m', 'template_0pcv0jo', params)
            .then(() => {
                contactForm.reset();
                submitBtn.innerHTML = 'Sent! ✓';
                submitBtn.style.background = '#4ade80';
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(() => {
                submitBtn.textContent = 'Failed — try again';
                submitBtn.style.background = '#f87171';
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

/* =================== CREATIVITY CAROUSEL =================== */
const carouselTrack = document.getElementById('carouselTrack');
const carouselWrapper = document.getElementById('creativityCarousel');

if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => {
        carouselTrack.classList.add('paused');
    });
    carouselWrapper.addEventListener('mouseleave', () => {
        carouselTrack.classList.remove('paused');
    });
}

/* =================== VIEW ALL EXPAND =================== */
const viewAllBtn = document.getElementById('viewAllBtn');
const viewAllLabel = document.getElementById('viewAllLabel');
const creativityExpand = document.getElementById('creativityExpand');
const creativitySection = document.getElementById('creativitySection');
let isExpanded = false;

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        viewAllBtn.setAttribute('aria-expanded', isExpanded);
        creativityExpand.setAttribute('aria-hidden', !isExpanded);

        if (isExpanded) {
            creativityExpand.classList.add('open');
            viewAllLabel.textContent = 'Collapse';
            setTimeout(() => {
                document.querySelectorAll('.cfgrid-item:not(.hidden)').forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 60);
                });
            }, 50);
        } else {
            creativityExpand.classList.remove('open');
            viewAllLabel.textContent = 'View All Work';
            setTimeout(() => {
                creativitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    });
}

/* =================== CREATIVITY FILTERS =================== */
const filterBtns = document.querySelectorAll('.cf-btn');
const gridItems = document.querySelectorAll('.cfgrid-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        gridItems.forEach((item, i) => {
            const match = filter === 'all' || item.dataset.cat === filter;
            if (match) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(16px) scale(0.96)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s, scale 0.4s';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, i * 40);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

/* =================== HERO PARALLAX =================== */
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
    if (heroBgText) {
        const scrolled = window.scrollY;
        heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
        heroBgText.style.opacity = 1 - (scrolled / 500);
    }
});

/* =================== IMPROVED LIGHTBOX / MODAL =================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxTag = document.getElementById('lightboxTag');
const lightboxClose = document.getElementById('lightboxClose');

// Create the Flip Button dynamically (Check if it exists first)
let flipBtn = document.getElementById('lightboxFlipBtn');
if (!flipBtn) {
    flipBtn = document.createElement('button');
    flipBtn.id = 'lightboxFlipBtn';
    flipBtn.className = 'lightbox-flip-btn';
    flipBtn.innerHTML = 'View Back Part <span>→</span>';
    const imgWrap = document.querySelector('.lightbox-img-wrap');
    if (imgWrap) imgWrap.appendChild(flipBtn);
}

let currentFrontSrc = "";
let currentBackSrc = "";
let isShowingBack = false;

function openLightbox(element) {
    currentFrontSrc = element.getAttribute('data-img');
    currentBackSrc = element.getAttribute('data-back'); 
    const title = element.getAttribute('data-title');
    const tag = element.getAttribute('data-tag');

    isShowingBack = false;
    lightboxImg.src = currentFrontSrc;
    lightboxTitle.textContent = title;
    lightboxTag.textContent = tag;

    if (currentBackSrc) {
        flipBtn.style.display = 'flex';
        flipBtn.innerHTML = 'View Back Part <span>→</span>';
    } else {
        flipBtn.style.display = 'none';
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

flipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isShowingBack) {
        lightboxImg.src = currentBackSrc;
        flipBtn.innerHTML = '<span>←</span> View Front Part';
    } else {
        lightboxImg.src = currentFrontSrc;
        flipBtn.innerHTML = 'View Back Part <span>→</span>';
    }
    isShowingBack = !isShowingBack;
});

const closeLB = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
};

if (lightboxClose) lightboxClose.addEventListener('click', closeLB);

lightbox.addEventListener('click', (e) => {
    const panel = document.getElementById('lightboxPanel');
    if (panel && !panel.contains(e.target)) {
        closeLB();
    }
});

document.querySelectorAll('.cfgrid-item, .carousel-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
});