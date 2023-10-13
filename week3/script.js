// variable keep track of which slide is currently being presented 
let slideIndex = 1;

// on page load show the first slide 
displaySlide(slideIndex);

// prev and next handler function, take an integer that indicates prev (-1) or next (1)
function slideAction(n) {
    displaySlide(slideIndex += n);
}

function displaySlide(n){
    // store slides in js array
    let slides = document.getElementsByClassName("mySlides");

    // reset slideIndex in case it has gone to the end (last slide)
    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}

    // set all slides' display to none
    for(let i=0; i< slides.length; i++) {slides[i].style.display = "none";}

    // display slide
    slides[slideIndex-1].style.display = "block";
    
}