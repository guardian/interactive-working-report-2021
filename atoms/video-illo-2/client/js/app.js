

const videoComp2 = document.querySelector('.video-illo-wrapper-2');
var vid2 = document.getElementById("video-comp-2");
const animClass2 = "dw-video";

// Grab the prefers reduced media query.
const mediaQuery2 = window.matchMedia("(prefers-reduced-motion: reduce)");

function playVid() {
    vid2.play();
}

function pauseVid() {
    vid2.pause();
}

var vidCompObserver2 = {
  root: document.body,
  rootMargin: "0px"
};

var vidCompObserver2 = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
    videoComp2.classList.add(animClass2);
    playVid();
  } else if(entries[0].isIntersecting === false){
    videoComp2.classList.remove(animClass2);
    pauseVid();
  }
}, { threshold: [0.95] });


if (mediaQuery2.matches) {
  // Turn video off
  vid2.pause();

} else {
  // turn video on
  vidCompObserver2.observe(videoComp2);

}
