import { get_words } from "./words/words.js";

const guess = document.querySelector(".guess");
const error_message = document.querySelector(".error-message");
const boxes = document.querySelectorAll(".box");
const finished = document.querySelector(".finished");
const newgame = document.querySelector(".newgame");
const body = document.querySelector("body");

guess.maxLength = 5;
error_message.textContent = " ";
finished.textContent = " ";
guess.value = "";

let word = "";
let result = [];
let guess_number = 0;
let wrong_guess_list = [];
let guess_made_boxes;
let word_as_list;
let word_as_list_2;
let current_guess_boxes = [];
let boxid;
let boxes_list = [];
let date = Date.now();

// get words from the dictionary list of 5 letter words in 'words.js'
let words = get_words();

// pick a new 5 letter word from the dictionary
 function pick_word() {
    let num = Math.floor(Math.random() * words.length);
    return(words[num]);
 }

// needed for fade_message
let timeout;

// fade in just the error messages
// not used for any other elements
function fade_message(message) {
    clearTimeout(timeout);
    error_message.style.color = "white";
    error_message.textContent = message;
    $(".error-message").animate({color:"black"}, 500);
    timeout = setTimeout(() => {
        $(".error-message").animate({color:"white"}, 500);
    }, 2000);
}

// check if the guess is a real word, is only letters, and is 5 letters long
function check_valid_guess() {
    console.log(guess.value);
    // entered something other than letters
    if (!/^[a-zA-Z]+$/.test(guess.value)) {
        fade_message("you must enter only letters");
        return(false);

    // entered something with the wrong length
    } else if (!(guess.value.length == 5)) {
        fade_message("you must enter exactly 5 letters");
        return(false);
    
    // did not enter one of the acceptable words
    } else if (!words.includes(guess.value)) {
        fade_message("not an allowed word");
        return(false);
    }
    
    return(true);
};

// check the correctness of the guess and return the results so it can be displayed
function handle_guess() {
    if (check_valid_guess(guess.value)) {

        // everything that needs to be done once a guess is officially made
        guess_number += 1;
        guess_made_boxes = get_relevant_boxes(guess_number-1);
        current_guess_boxes = get_relevant_boxes(guess_number);
        current_guess = [];
        
        let guess_as_list = guess.value.split("");
        word_as_list = word.split("");

        // 0: not in word
        // 1: in word, but in the wrong place
        // 2: in word, and in the right place
        result = [0, 0, 0, 0, 0];

        for (let i = 0; i < 5; i++) {
            // check if there is a letter in the right place
            // if it is, turn it to false in both the word and the guess
            // then I can't accidentally match it again
            if (guess_as_list[i] == word_as_list[i] && guess_as_list[i]) {
                result[i] = 2;
                word_as_list[i]=false;
                guess_as_list[i]=false;
            }
        }

        // same here, check only the letters that aren't false already
        // so I don't match them again
        // and if there is a match, turn them to false in the word and the guess
        for (let i = 0; i < 5; i++) {
            if (word_as_list.includes(guess_as_list[i]) && guess_as_list[i]) {
                result[i] = 1;
                word_as_list[word_as_list.indexOf(guess_as_list[i])]=false;
                guess_as_list[i]=false;
            } 
            else if (!word_as_list.includes(guess_as_list[i]) && guess_as_list[i]) {
                result[i] = 0;
                word_as_list_2 = word.split("");
                if(!word_as_list_2.includes(guess_as_list[i])) {
                    wrong_guess_list.push(guess_as_list[i]);
                }
            }
        }

        // note: I never actually alter word or guess.value
        // so changing letters to false doesn't effect any future guesses

        console.log(guess.value);
        console.log(word);
        console.log(result.join(""));
        console.log(wrong_guess_list);

        put_guess_in_grid()

    } else {
        guess.value = "";
    }
};

// put the letters into the grid and colour the box depending on correctness of the guess
function put_guess_in_grid() {
    
    // end of game scenarios
    if(guess.value == word) {
        // 0 just starts bouncing the first letter
        // need it to be able to bounce them one after the other instead of all at once
        
        end_game_graphic();

        finished.style.color = "white";
        finished.textContent = "Nicely done!";
        $(".finished").animate({color:"black"}, 1500);
        $(".newgame").animate({opacity:"1"}, 1500);

    } else {
        // this will cycle through the columns
        for (let i = 0; i < 5; i++) {
            // this is to let me use jquery animate
            // get the id in a string format
            let boxid = '#'+String(guess_made_boxes[i].id);

            // put the letters into the boxes
            guess_made_boxes[i].textContent = guess.value[i];
            $(boxid).animate({color:"white"}, 500);


            // colour the boxes themselves
            if(result[i] == 0) {
                $(boxid).animate({"background-color":"rgb(194, 190, 190)"}, 500);
            } else if (result[i] == 1) {
                $(boxid).animate({"background-color":"rgb(228, 189, 111)"}, 500);
            } else {
                $(boxid).animate({"background-color":"rgb(102, 174, 102)"}, 500);
            }
            
        }
    }

    if (guess_number == 5) {
        finished.style.color = "white";
        finished.textContent = `oh no :( the word was ${word}`;
        $(".finished").animate({color:"black"}, 1500);
        $(".newgame").animate({opacity:"1"}, 1500);
    }

    guess.value="";
}

function id(i) {
   return('#'+String(guess_made_boxes[i].id));
}

function end_game_graphic() {
    for (let i = 0; i<5; i++) {
        boxid = '#'+String(guess_made_boxes[i].id);
        guess_made_boxes[i].textContent = word[i];
        $(boxid).animate({"background-color":"rgb(102, 174, 102)"}, 500);
    }

    // wait for the boxes to finish changing colors before starting the shake animation
    // this assumes it will take 520ms
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            let delay = i*50;
            $(id(i)).delay(delay).effect('shake', {direction:"up", distance:7, times:1});
        }
    }, 520);
}

// reset everything so a new game can start
function new_game() {
    word = pick_word();
    date = Date.now();
    guess.value = "";
    finished.style.color = "white";
    newgame.style.opacity = "0";
    boxes.forEach((box) => {
        box.textContent = "";
        box.style["background-color"] = "rgb(194, 190, 190)";
    })

    guess_number = 0;
    current_guess_boxes = get_relevant_boxes(guess_number);
    wrong_guess_list = [];
}

// return the boxes of whichever row as a list
function get_relevant_boxes(row) {
    row++;
    boxes_list = [];
    // row number is equal to guess number
    boxes.forEach((box) => {
        // make a list out of all of the boxes in the relevant row
        if(box.id[1] == row) {
            boxes_list.push(box);
        }
    });
    return(boxes_list);
}

// what the user has typed into the input so far
let current_guess = [];

// add letters to the current guess
// fade them in nicely, but make them red if the user already guessed that letter incorrectly
body.addEventListener('keypress', (e) => {
    if(current_guess.length < 5 && e.key.length == 1) {
        current_guess.push(e.key);

        current_guess_boxes[current_guess.length-1].style.color = 'rgb(194, 190, 190)';
        current_guess_boxes[current_guess.length-1].textContent = e.key;
        boxid = "#"+String(current_guess_boxes[current_guess.length-1].id)
        if (wrong_guess_list.includes(e.key)) {
            $(boxid).animate({backgroundColor:"rgb(210, 126, 126)"}, 200);
        }
        $(boxid).animate({color:"white"}, 200);
    }
});

// delete a letter from the current guess
body.addEventListener('keydown', (e) => {
    if(e.keyCode == 8) {
        if (current_guess.length > 0) {
            boxid = "#"+String(current_guess_boxes[current_guess.length-1].id)
            $(boxid).animate({color:'rgb(194, 190, 190)'}, 200);
            current_guess_boxes[current_guess.length-1].textContent = "";
            $(boxid).animate({backgroundColor:"rgb(194, 190, 190)"}, 200);
            current_guess.splice(-1, 1);
        }
    }
});

// as soon as they hit enter, all of the input clears up
body.addEventListener('keypress', (e) => {
    if (e.key =="Enter") {
        guess.value = current_guess.join("");
        current_guess = [];
        for(let box of current_guess_boxes) {
            box.textContent = "";
            box.style.backgroundColor = "rgb(194, 190, 190)";
        }
        handle_guess();
    }
});

// start a new game when they hit the button
newgame.addEventListener('click', () => {
    new_game();
})

new_game();