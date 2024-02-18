const submit_button = document.querySelector(".submit-button");
const submittion = document.querySelector(".submittion");
const error_message = document.querySelector(".error-message");

error_message
submittion.value = "";
let submittion_value = "";


function fade_in(target, message) {
    let op = 0;
    target.style.opacity = op;
    target.textContent = message;

    let timer = setInterval(() => {
        op += 0.1
        target.style.opacity = op;
        if (op >= 1) {
            clearInterval(timer);
        }
    }, 30);
}

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
    }, 30)
}

submit_button.addEventListener('click', () => {
    // entered something other than letters
    if (!/^[a-zA-Z]+$/.test(submittion.value)) {
        fade_in(error_message, "you must enter all letters");
        setTimeout( () => {
            fade_out(error_message);
        }, 3000);
    }
});

