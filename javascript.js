const submit_button = document.querySelector(".submit-button");
const submittion = document.querySelector(".submittion");
const error_message = document.querySelector(".error-message");

error_message
submittion.value = "";
let submittion_value = "";

// function to fade an element in with a given text value
// increase the opacity by 0.1 every 30ms until the opacity is 1
function fade_in(target, message) {
    let op = 0;
    target.style.opacity = op;
    target.textContent = message;

    // execute the code inside every 30ms. Change the 30 to change the speed of the fade
    let timer = setInterval(() => {
        op += 0.1
        target.style.opacity = op;
        if (op >= 1) {
            clearInterval(timer);
        }
    }, 30); // <-- change this to change fade speed
}

// function to fade out an element
// decrease the opacity by 0.1 every 30ms until the opacity is 0
function fade_out(target) {
    let op = 1;
    target.style.opacity = op;

    let timer = setInterval(() => {
        op -= 0.1;
        target.style.opacity = op;
        if (op <= 0) {
            clearInterval(timer);
            target.textContent = "";
        }
    }, 30) // <-- change this to change fade speed
}

// fade the message in slowly, keep it there for 3 seconds, then fade it out slowly
function fade(target, message) {
    fade_in(error_message, message);
    setTimeout( () => {
        fade_out(error_message);
    }, 3000);
}

submit_button.addEventListener('click', () => {
    // entered something other than letters
    if (!/^[a-zA-Z]+$/.test(submittion.value)) {
        fade(error_message, "you must enter only letters");
    
    // entered something with the wrong length
    } else if (!(submittion.value.length == 5)) {
        fade(error_message, "you must enter exactly 5 letters");
    }
});


// check if the user-entered word is a word in the dictionary
function check_dictionary(word) {

}
