function showSidebar(){
  const sideBar = document.getElementById('sidebar');
  sideBar.style.display = 'flex'
}
function hideSidebar(){
  const sideBar = document.getElementById('sidebar');
  sideBar.style.display = 'none'
}

const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
        navbar.classList.add('-translate-y-full');
    } else {
        navbar.classList.remove('-translate-y-full');
    }

    if (currentScrollY > 80) {
        navbar.classList.add('navbar-scrolled', 'shadow-md');
    } else {
        navbar.classList.remove('navbar-scrolled', 'shadow-md');
    }

    lastScrollY = currentScrollY;
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1000;
  const frameRate = 1000/60;
  const totalFrames = Math.round(duration/frameRate);
  let currentFrame = 0;

  const interval = setInterval(() => {
    currentFrame++;
    const progress = currentFrame/totalFrames;
    const currentCount = Math.floor(progress*target);
    el.textContent = currentCount;

    if (currentFrame >= totalFrames) {
        el.textContent = target
      clearInterval(interval);
    }
  }, frameRate);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stats').forEach(section => {
  statsObserver.observe(section);
});

const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i)=>{
        if(entry.isIntersecting){
            setTimeout(() => {
                entry.target.classList.add("in-view");
            },i*100)
            whyObserver.unobserve(entry.target)
        }
    });
}, {threshold: 0.2});

document.querySelectorAll(".reason").forEach(el => {
    whyObserver.observe(el);
})

const track = document.querySelector('.courses');
const originalCards = Array.from(track.children);
track.style.scrollBehavior = 'auto';

while (track.scrollWidth < window.innerWidth * 3) {
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });
}

const firstClone = track.children[originalCards.length];
const loopWidth = firstClone.offsetLeft - track.children[0].offsetLeft;

let isPaused = false;
const speed = 1;

function autoScroll() {
  if (!isPaused) {
    track.scrollLeft += speed;
    if (track.scrollLeft >= loopWidth) {
      track.scrollLeft -= loopWidth;
    }
  }
  requestAnimationFrame(autoScroll);
}

track.addEventListener('mouseenter', () => isPaused = true);
track.addEventListener('mouseleave', () => isPaused = false);

autoScroll();

const trackTestmnls = document.querySelector('.testimonials');
const slides = document.querySelectorAll('.testimonial');
let current = 0;
let intervalId;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  current = index;
}

function nextSlide() {
  const next = (current + 1) % slides.length;
  showSlide(next);
}

function startSlideShow() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 4000);
}

function stopSlideShow() {
  clearInterval(intervalId);
}

// 🛠️ FIX: Force card 0 to show immediately on load so it doesn't disappear!
showSlide(0); 
startSlideShow();

trackTestmnls.addEventListener('mouseenter', stopSlideShow);
trackTestmnls.addEventListener('mouseleave', startSlideShow);