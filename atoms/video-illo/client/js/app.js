

const videoComp = document.querySelector('.video-illo-wrapper');
var vid = document.getElementById("video-comp");
const animClass = "dw-video";

// Grab the prefers reduced media query.
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}

var vidCompObserver = {
  root: document.body,
  rootMargin: "0px"
};

var vidCompObserver = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    videoComp.classList.add(animClass);
    playVid();
  } else if(entries[0].isIntersecting === false){
    videoComp.classList.remove(animClass);
    pauseVid();
  }
}, { threshold: [0.95] });


if (mediaQuery.matches) {
  // Turn video off
  vid.pause();

} else {
  // turn video on
  if ( document.body.classList.contains("ios") || document.body.classList.contains("android" )) {
    playVid();
    vid.setAttribute("autoplay", "");
  } else {
    vidCompObserver.observe(videoComp);
  }
}
