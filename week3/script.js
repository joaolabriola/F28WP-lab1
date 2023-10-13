// SLIDE SHOW 

// variable keep track of which slide is currently being presented 
let slideIndex = 1;

// on page load show the first slide 
displaySlide(slideIndex);

// prev and next handler function, take an integer that indicates prev (-1) or next (1)
function slideAction(n) {
    displaySlide(slideIndex += n);
}

function displaySlide(n) {
    // store slides in js array
    let slides = document.getElementsByClassName("mySlides");

    // reset slideIndex in case it has gone to the end (last slide)
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // set all slides' display to none
    for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }

    // display slide
    slides[slideIndex - 1].style.display = "block";

}



// FORM VALIDATION 

function validateForm(){
    let username = document.forms["form"]["username"].value;
    let email = document.forms["form"]["email"].value;
    let pwd = document.forms["form"]["pwd"].value;
    let cPwd = document.forms["form"]["confirm"].value;

    // resetting error messages
    let errMessages = document.getElementsByClassName("error");
    for(let i=0; i<errMessages.length; i++){
        errMessages[i].innerHTML = "";
    }

    // checking form values to validate against criteria and adding visual queue is criteria met

    if(username == ""){
        document.getElementById("unErr").innerHTML = "Please enter username";
        return false;
    }else if(!validateEmail(email)){
        document.getElementById("emailErr").innerHTML = "Please enter valid e-mail (user@example.com)";
        return false;
    }else if(!validatePwd(pwd)){
        document.getElementById("pwdErr").innerHTML = "Please enter a valid password of at least 8 characters";
        return false;
    }else if(cPwd == "" || cPwd != pwd){
        document.getElementById("username").parentNode.classList.add("success");
        document.getElementById("pwd").parentNode.classList.add("success");
        document.getElementById("conErr").innerHTML = "Passwords do not match";
        return false;
    }
    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)){
        document.getElementById("email").parentNode.classList.add("success");
        return true;
    }

    return false;
}

function validatePwd(pwd){
    if(pwd == "" || pwd.length < 8){
        return false
    }
    return true;
}