const submit_button = document.querySelector(".submit-button");
const guess = document.querySelector(".submittion");
const error_message = document.querySelector(".error-message");
const consolewonsle = document.querySelector(".console");


function aaa(message){
    consolewonsle.textContent = message;
}

error_message.textContent = "";
guess.value = "";
let word = "";
let result = [];
let guess_number = 0;

// this is a list of the 5 letter words. Terribile solution because I don't know how to use a server yet :(
// can't just read a text file in javascript like you can in other languages...
// security measure apparently.
// i'm a little sad about it
let words = ["about", "other", "which", "their", "there", "first", "would", "these", "click", "price", "state", "email", "world", "music", "after", "video", "where", "books", "links", "years", "order", "items", "group", "under", "games", "could", "great", "hotel", "store", "terms", "right", "local", "those", "using", "phone", "forum", "based", "black", "check", "index", "being", "women", "today", "south", "pages", "found", "house", "photo", "power", "while", "three", "total", "place", "think", "north", "posts", "media", "water", "since", "guide", "board", "white", "small", "times", "sites", "level", "hours", "image", "title", "shall", "class", "still", "money", "every", "visit", "tools", "reply", "value", "press", "learn", "print", "stock", "point", "sales", "large", "table", "start", "model", "human", "movie", "march", "yahoo", "going", "study", "staff", "again", "april", "never", "users", "topic", "below", "party", "login", "legal", "above", "quote", "story", "rates", "young", "field", "paper", "girls", "night", "texas", "poker", "issue", "range", "court", "audio", "light", "write", "offer", "given", "files", "event", "china", "needs", "might", "month", "major", "areas", "space", "cards", "child", "enter", "share", "added", "radio", "until", "color", "track", "least", "trade", "david", "green", "close", "drive", "short", "means", "daily", "beach", "costs", "style", "front", "parts", "early", "miles", "sound", "works", "rules", "final", "adult", "thing", "cheap", "third", "gifts", "cover", "often", "watch", "deals", "words", "linux", "james", "heart", "error", "clear", "makes", "india", "taken", "known", "cases", "quick", "whole", "later", "basic", "shows", "along", "among", "death", "speed", "brand", "stuff", "japan", "doing", "loans", "shoes", "entry", "notes", "force", "river", "album", "views", "plans", "build", "types", "lines", "apply", "asked", "cross", "weeks", "lower", "union", "names", "leave", "teens", "woman", "cable", "score", "shown", "flash", "ideas", "allow", "homes", "super", "asian", "cause", "focus", "rooms", "voice", "comes", "brown", "forms", "glass", "happy", "smith", "thank", "prior", "sport", "ready", "round", "built", "blood", "earth", "nokia", "italy", "basis", "award", "peter", "extra", "rated", "quite", "horse", "stars", "lists", "owner", "takes", "bring", "input", "agent", "valid", "grand", "trial", "units", "wrote", "ships", "metal", "funds", "guest", "seems", "trust", "multi", "grade", "panel", "floor", "match", "plant", "sense", "stage", "goods", "maybe", "spain", "youth", "break", "dance", "apple", "enjoy", "block", "civil", "steel", "songs", "fixed", "wrong", "hands", "paris", "fully", "worth", "peace", "coast", "grant", "agree", "blogs", "scale", "stand", "frame", "chief", "gives", "heard", "begin", "royal", "clean", "bible", "suite", "vegas", "chris", "piece", "sheet", "seven", "older", "cells", "looks", "calls", "whose", "naked", "lives", "stone", "tests", "buyer", "steve", "label", "scott", "canon", "waste", "chair", "phase", "motor", "shirt", "crime", "count", "claim", "patch", "santa", "alone", "jones", "saint", "drugs", "joint", "fresh", "dates", "upper", "prime", "limit", "began", "louis", "steps", "shops", "creek", "urban", "tours", "labor", "admin", "heavy", "solid", "theme", "touch", "goals", "serve", "magic", "mount", "smart", "latin", "avoid", "birth", "virus", "abuse", "facts", "faith", "chain", "moved", "reach", "sorry", "gamma", "truth", "films", "owned", "draft", "chart", "jesus", "clubs", "equal", "codes", "kinds", "teams", "funny", "tried", "named", "laser", "harry", "taxes", "mouse", "brain", "dream", "false", "falls", "stats", "carry", "hello", "clips", "brief", "ended", "eight", "wants", "alert", "queen", "sweet", "diego", "truck", "votes", "ocean", "signs", "depth", "train", "feeds", "route", "frank", "anime", "speak", "query", "rural", "judge", "bytes", "fight", "filed", "korea", "banks", "kelly", "leads", "brian", "miami", "wales", "minor", "noted", "spent", "davis", "helps", "cycle", "sleep", "scene", "drink", "intel", "rings", "henry", "guess", "ahead", "devel", "delta", "cisco", "alpha", "bonus", "adobe", "trees", "dress", "refer", "babes", "layer", "spend", "clock", "ratio", "proof", "empty", "maine", "ideal", "specs", "parks", "cream", "boxes", "hills", "aware", "shape", "irish", "firms", "usage", "mixed", "exist", "wheel", "angel", "width", "noise", "array", "greek", "sharp", "occur", "knows", "coach", "kevin", "plate", "logic", "sizes", "plain", "costa", "trail", "buddy", "setup", "blues", "scope", "crazy", "bears", "mouth", "meter", "fruit", "mysql", "lewis", "sugar", "stick", "allen", "genre", "slide", "exact", "bound", "storm", "micro", "dolls", "paint", "delay", "pilot", "czech", "novel", "ultra", "idaho", "plays", "truly", "lodge", "broad", "swiss", "sarah", "clark", "foods", "guard", "newly", "raise", "drama", "bands", "lunch", "audit", "polls", "tower", "yours", "jason", "shell", "solar", "catch", "doubt", "tasks", "const", "doors", "forth", "bruce", "split", "twice", "egypt", "shift", "simon", "marks", "loved", "birds", "saved", "shots", "moore", "treat", "piano", "risks", "ports", "teach", "rapid", "hairy", "dutch", "boots", "holds", "pulse", "metro", "strip", "pearl", "heads", "logos", "honda", "bills", "opera", "asset", "blank", "humor", "lived", "tight", "meant", "plane", "meets", "tampa", "grace", "susan", "adams", "villa", "inner", "roman", "taste", "trips", "sides", "turns", "cache", "lease", "proud", "giant", "seats", "alarm", "usual", "angle", "vinyl", "worst", "honor", "eagle", "pants", "nurse", "quiet", "comic", "crown", "maker", "crack", "picks", "smoke", "craft", "apart", "blind", "coins", "gross", "epson", "actor", "finds", "fifth", "prize", "dirty", "wayne", "alive", "prove", "wings", "ridge", "modem", "larry", "skill", "moves", "throw", "trend", "rhode", "worse", "boats", "tells", "fiber", "graph", "talks", "bonds", "fraud", "roger", "crash", "inter", "grove", "spray", "roads", "faces", "mayor", "yield", "hence", "radar", "lakes", "diary", "kings", "flags", "baker", "shock", "walls", "ebony", "drawn", "beast", "dodge", "pizza", "yards", "woods", "jokes", "twiki", "globe", "dicke", "kerry", "ghost", "pride", "keith", "linda", "chile", "maria", "brass", "plaza", "quest", "trans", "booty", "acres", "venue", "vital", "excel", "modes", "enemy", "wells", "opens", "lucky", "thick", "iraqi", "vista", "chips", "terry", "flood", "arena", "grown", "jerry", "smile", "lands", "armed", "laura", "tokyo", "nikon", "candy", "pills", "tiger", "folks", "boost", "icons", "moral", "keeps", "pound", "roses", "bread", "tough", "gonna", "chest", "billy", "craig", "solve", "nancy", "tones", "sight", "towns", "worry", "reads", "roles", "glory", "saudi", "fault", "karen", "jimmy", "rugby", "fluid", "barry", "devil", "grass", "marie", "kenya", "sized", "manga", "theft", "swing", "dated", "shoot", "elite", "poems", "robot", "winds", "gnome", "roots", "noble", "shore", "loves", "loose", "slots", "rocks", "genes", "hosts", "atlas", "feels", "ralph", "corps", "liver", "decor", "texts", "evans", "fails", "aging", "alice", "intro", "clerk", "mills", "jeans", "fonts", "favor", "sigma", "xhtml", "aside", "essay", "camps", "aaron", "trace", "packs", "spoke", "arrow", "rough", "weird", "holes", "blade", "meals", "robin", "strap", "crowd", "cloud", "valve", "knife", "shelf", "liked", "adopt", "fotos", "outer", "tales", "islam", "nodes", "seeds", "cited", "skype", "tired", "steam", "acute", "stood", "carol", "stack", "curve", "amber", "trunk", "waves", "camel", "lamps", "juice", "chase", "sauce", "beads", "flows", "fewer", "proxy", "lanka", "voted", "bikes", "gates", "slave", "lycos", "zdnet", "combo", "haven", "charm", "basin", "ranch", "drunk", "toner", "latex", "delhi", "alien", "broke", "nepal", "nylon", "discs", "rocky", "fleet", "bunch", "cents", "omega", "civic", "saver", "grill", "grain", "wanna", "seeks", "gains", "spots", "salon", "turbo", "thats", "aimed", "reset", "brush", "spare", "kodak", "skirt", "honey", "gauge", "faced", "sixth", "farms", "cheat", "sandy", "macro", "laugh", "pitch", "autos", "perry", "dozen", "teeth", "cloth", "stamp", "lotus", "cargo", "salem", "likes", "tapes", "zones", "races", "maple", "depot", "blend", "julie", "janet", "phpbb", "probe", "helen", "lopez", "debug", "chuck", "ebook", "bingo", "minds", "xanax", "sunny", "leeds", "cedar", "blair", "hopes", "mason", "burns", "pumps", "mario", "utils", "pairs", "chose", "blast", "tommy", "brake", "congo", "olive", "cyber", "clone", "relay", "tears", "oasis", "angry", "lover", "rolls", "malta", "daddy", "ferry", "omaha", "loads", "motel", "rally", "dying", "stuck", "stops", "vocal", "organ", "lemon", "toxic", "bench", "rider", "butts", "bobby", "sheep", "wines", "salad", "paste", "katie", "relax", "sword", "sells", "coral", "pixel", "float", "colin", "paths", "acids", "dairy", "admit", "fancy", "samoa", "squad", "wages", "males", "chaos", "wheat", "bases", "unity", "bride", "begun", "socks", "essex", "fever", "drums", "rover", "flame", "tanks", "spell", "emily", "annex", "sudan", "hints", "wired", "elvis", "argue", "arise", "jamie", "chess", "oscar", "menus", "canal", "amino", "herbs", "lying", "drill", "bryan", "hobby", "tries", "trick", "myers", "drops", "wider", "screw", "blame", "fifty", "uncle", "jacob", "randy", "brick", "naval", "donna", "cabin", "eddie", "fired", "perth", "syria", "klein", "tires", "retro", "anger", "suits", "glenn", "handy", "crops", "guild", "tribe", "batch", "alter", "ghana", "edges", "twins", "amend", "chick", "thong", "medal", "walks", "booth", "indie", "bones", "breed", "polar", "msgid", "carey", "danny", "patio", "lloyd", "beans", "ellis", "snake", "julia", "berry", "ought", "fixes", "sends", "mazda", "timer", "tyler", "verse", "highs", "ellen", "racks", "nasty", "tumor", "watts", "forty", "tubes", "floyd", "queue", "skins", "exams", "welsh", "belly", "haiti", "elder", "sonic", "thumb", "twist", "ranks", "debut", "volvo", "penny", "ivory", "remix", "alias", "newer", "spice", "ascii", "donor", "trash", "manor", "diane", "disco", "endif", "minus", "milan", "shade", "digit", "lions", "pools", "lyric", "grave", "howto", "devon", "saves", "lobby", "punch", "gotta", "karma", "betty", "lucas", "mardi", "shake", "holly", "silly", "mercy", "fence", "diana", "shame", "fatal", "flesh", "jesse", "qatar", "sheer", "witch", "cohen", "puppy", "kathy", "smell", "satin", "promo", "tunes", "lucia", "nerve", "renew", "locks", "euros", "rebel", "hired", "hindu", "kills", "slope", "nails", "whats", "rides", "rehab", "merit", "disks", "condo", "fairy", "shaft", "casio", "kitty", "drain", "monte", "fires", "panic", "leone", "onion", "beats", "merry", "scuba", "verde", "dried", "derby", "annie", "derek", "steal", "fears", "tuner", "alike", "sagem", "scout", "dealt", "bucks", "badge", "wrist", "heath", "lexus", "realm", "jenny", "yemen", "buses", "rouge", "yeast", "kenny", "yukon", "singh", "brook", "wives", "xerox", "sorts", "vsnet", "papua", "armor", "viral", "pipes", "laden", "aruba", "merge", "edgar", "dubai", "allan", "sperm", "filme", "craps", "frost", "sally", "yacht", "tracy", "whale", "shark", "grows", "cliff", "tract", "shine", "wendy", "diffs", "ozone", "pasta", "serum", "swift", "inbox", "focal", "samba", "wound", "belle", "cindy", "lined", "boxed", "cubic", "spies", "elect", "bunny", "chevy", "tions", "flyer", "baths", "emacs", "climb", "sparc", "dover", "token", "kinda", "dylan", "belts", "burke", "clara", "flush", "hayes", "moses", "johns", "jewel", "teddy", "dryer", "ruled", "funky", "joins", "scary", "mpegs", "cakes", "mixer", "sbjct", "tooth", "stays", "drove", "upset", "mines", "logan", "lance", "colon", "lanes", "purse", "align", "bless", "crest", "alloy", "plots", "tulsa", "casey", "draws", "bloom", "loops", "surge", "tahoe", "souls", "spank", "vault", "wires", "mails", "blake", "orbit", "niger", "bacon", "paxil", "spine", "trout", "apnic", "fatty", "joyce", "marco", "isaac", "oxide", "badly", "scoop", "sanyo", "blink", "carlo", "tiles", "tamil", "fuzzy", "grams", "forge", "dense", "brave", "awful", "meyer", "wagon", "knock", "peers", "quilt", "notre", "mambo", "flour", "choir", "blond", "burst", "wiley", "fibre", "daisy", "crude", "bored", "allah", "fares", "hoped", "safer", "marsh", "ricky", "theta", "stake", "arbor"];

// function to fade an element in with a given text value
// increase the opacity by 0.1 every 30ms until the opacity is 1
function fade_in(target, message, color) {
    let op = 0;
    
    target.textContent = message;

    if(color == "black") {
        // black
        // not a good solution to have separate blocks for the separate colors
        // want the letters to fade in without fading in the background...
        target.style.color = `rgba(0,0,0,${op}`;
        // execute the code inside every 30ms. Change the 30 to change the speed of the fade
        let timer = setInterval(() => {
            op += 0.1
            target.style.color = `rgba(0,0,0,${op}`;
            if (op >= 1) {
                clearInterval(timer);
            }
        }, 30); // <-- change this to change fade speed
    } else if (color == "white") {
        target.style.color = `rgba(255,255,255,${op}`;
        // execute the code inside every 30ms. Change the 30 to change the speed of the fade
        let timer = setInterval(() => {
            op += 0.1
            target.style.color = `rgba(255,255,255,${op}`;
            if (op >= 1) {
                clearInterval(timer);
            }
        }, 30); // <-- change this to change fade speed
    }
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
function fade(target, message, color) {
    fade_in(error_message, message, color);
    setTimeout( () => {
        fade_out(error_message);
    }, 3000);
}

 function pick_word() {
    let num = Math.floor(Math.random() * words.length);
    return(words[num]);
 }

function check_valid_guess() {
    // entered something other than letters
    if (!/^[a-zA-Z]+$/.test(guess.value)) {
        // fade(error_message, "you must enter only letters", "black");
        error_message.textContent = "you must enter only letters"
        return(false);

    // entered something with the wrong length
    } else if (!(guess.value.length == 5)) {
        // fade(error_message, "you must enter exactly 5 letters", "black");
        error_message.textContent = "you must enter exactly 5 letters"
        return(false);
    
    // did not enter one of the acceptable words
    } else if (!words.includes(guess.value)) {
        // fade(error_message, "not an allowed word", "black");
        error_message.textContent = "not an allowed word"
        return(false);
    }
    
    return(true);
};

function handle_guess() {
    if (check_valid_guess(guess.value)) {
        guess_value = guess.value;
        guess.value = "";
        guess_number += 1;
        
        let guess_as_list = guess_value.split("");
        word = word.split("");

        // 0: not in word
        // 1: in word, but in the wrong place
        // 2: in word, and in the right place
        result = [0, 0, 0, 0, 0];

        for (let i = 0; i < 5; i++) {
            if (guess_as_list[i] == word[i]) {
                result[i] = 2;
            } else if (word.includes(guess_as_list[i])) {
                result[i] = 1;
            } else {
                result[i] = 0;
            }
        }
        word = word.join("");

        console.log(guess_value);
        console.log(word);
        console.log(result);

        put_guess_in_grid()
    } else {
        guess.value = "";
    }
};

const boxes = document.querySelectorAll(".box");


function put_guess_in_grid() {
    // row number is equal to guess number
    boxes_list = []
    boxes.forEach((box) => {
        
        if(box.id[1] == guess_number) {
            boxes_list.push(box);
        }
    });


    // this will cycle through the columns
    for (let i = 0; i < 5; i++) {
        // fade_in(boxes_list[i], guess_value[i], "white");
        boxes_list[i].textContent = guess_value[i];
        if(result[i] == 0) {
            boxes_list[i].style["background-color"] = "rgb(194, 190, 190)";
        } else if (result[i] == 1) {
            boxes_list[i].style["background-color"] = "rgb(228, 189, 111)";
        } else {
            boxes_list[i].style["background-color"] = "rgb(102, 174, 102)";
        }
    }

    if(guess_value == word) {
        alert("yey!");
        // clear any grey rows underneath
        // 
        // add a button to play again
        // which picks a new word
    }
}
// const box = document.querySelector(".column2 .row2");
// box.style["background-color"] = "rgb(194, 190, 0)";


// should reset everything so a new game can start
function new_game() {
    word = pick_word();
    guess_number = 0
    boxes.forEach((box) => {
        box.style['background-color'] = "rgb(194, 190, 190)";
        box.textContent = "";
    })

}

submit_button.addEventListener('click', () => {
    handle_guess();
});

guess.addEventListener('keypress', (e) => {
    if (e.key =="Enter") {
        handle_guess();
    }
});


new_game();