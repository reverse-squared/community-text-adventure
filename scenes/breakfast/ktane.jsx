import React from "react";
import { addFlag, setScene, getScene, getSceneInfo } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import SceneLink from "@templates/SceneLink";

// Bomb Manual
// http://www.bombmanual.com/manual/1/html/index.html

//#region Non KTANE Utility Functions
function randomOf(list) {
    return list[Math.floor((Math.random() * list.length))];
}

const MissingItem = Symbol("MissingItem");
function randomListOf(list, items = 1, requiredValues = []) {
    let requiredValuesPositions = requiredValues.map(() => -1);
    let values = Array(items).fill(MissingItem);
    requiredValues.forEach((item, i) => {
        let position;
        do {
            position = Math.floor(Math.random() * items);
        } while (requiredValuesPositions.includes(position));

        requiredValuesPositions[i] = position;
    });
    requiredValuesPositions.forEach((position, i) => {
        values[position] = requiredValues[i];
    });
    return values.map(item => {
        if(item === MissingItem) return randomOf(list);
        return item;
    });
}

/**
 * Returns true or false if a string contains a vowel. 
 * @param {string} string The a string to check.
 * @returns {boolean} A true or false value whether or not the string contains a vowel.
 */
function hasVowels(string) {
    var arraySplit = serial.split(string.toLowerCase);

    return arraySplit.includes("a") || arraySplit.includes("a") || arraySplit.includes("i") || arraySplit.includes("o") || arraySplit.includes("u");
}

/**
 * Returns true or false if the serial number ends in a odd number.
 * @param {string} serial The a serial number to check.
 * @returns {boolean} Returns true if the serial number ends with an odd number/
 */
function endsInOdd(serial) {
    var arraySplit = serial.split(serial.toLowerCase);

    return (arraySplit[arraySplit.length - 1] % 2) === 0;
}

//#endregion

addFlag("wires", false);
addFlag("buttom", false);
addFlag("symbols", false);
addFlag("symbolsProgress", 1);
addFlag("complexWires", false);
addFlag("morse", false);

addFlag("prevScene", "");
addFlag("ktmaintext", "There are five modules... which do you defuse first?");
addFlag("defusedOptions", []);

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J,", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

/**
 * A function to generate a serial number for a KTanE bombs.
 * @returns {string} A six character string including numbers and letters in uppercase in the format of NUMBER LETTER NUMBER LETTER LETTER NUMBER.
 */
function generateSerial() {
    serial = "";
    serial += randomOf(numbers);
    serial += randomOf(letters);
    serial += randomOf(numbers);
    serial += randomOf(letters);
    serial += randomOf(letters);
    serial += randomOf(numbers);
}

/**
 * Sets the value of parallelPort.
 */
function generatePort() {
    var number = Math.floor(Math.random() * 2);

    // Bad Code
    if(number === 1) {
        parallelPort = "true";
    }else {
        parallelPort = "false";
    }
}

/**
 * Sets the value of hasFRK.
 */
function generateFRK() {
    var number = Math.floor(Math.random() * 2);

    // Bad Code
    if(number === 1) {
        hasFRK = "true";
    }else {
        hasFRK = "false";
    }
}

/** Adds some extra things to a scene to make it handler the Bomb Timer and strikes and some other thing */
function BombScene(scene) {
    let action = scene.action;
    scene.action = () => {
        if(action) action();
        if(!scene.isInfoPage) prevScene = getScene();
    };
    return scene;
}
/** Adds some extra things to an option to make it cause a strike */
let t1, t2, t3;
function IncorrectOption(option) {
    let action = option.action;
    option.to = "ktane_main";
    option.action = () => {
        if (action) action();
        ktmaintext = "You got that module wrong, try again.";
        // BG
        if(t1) clearTimeout(t1);
        if(t2) clearTimeout(t2);
        if(t3) clearTimeout(t3);

        document.body.style.transition = "";
        document.body.style.background = "red";
        t1 = setTimeout(() => {
            t1 = undefined;
            t2 = setTimeout(() => {
                t2 = undefined;
                document.body.style.transition = "background 1.5s linear";
                document.body.style.background = "";
                t3 = setTimeout(() => {
                    t3 = undefined;
                    document.body.style.transition = "";
                }, 1500);
            }, 100);
            document.body.style.background = "red";
        }, 100);
        
    };
    return option;
}
/** Adds some extra things to an option to make it cause a strike */
function CorrectOption(option) {
    let action = option.action;    
    option.to = "ktane_correct";
    option.action = () => {
        if (action) action();

        const scene = getSceneInfo(getScene());
        let options = scene.options;
        if(options.apply) options = options();
        defusedOptions = options.map((opt) => ({ text: opt.text, to: null, if: () => false, disabledText: true }));
    };
    return option;
}

addFlag("batteries", null);
addFlag("serial", "");
addFlag("parallelPort", null);
addFlag("hasFRK", null);
addFlag("timeLeft", 10 * 60);

class BombHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            timeLeft--;
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return <div>
            <p>
                <b>
                    Defuse the Bomb... You have {(timeLeft - (timeLeft % 60)) / 60}:{(timeLeft % 60).toString().padStart(2, "0")} left and have 0 strikes.{" "}
                </b>
                {
                    !this.props.hideLink &&
                    <SceneLink to="bombinfo">View Bomb Information</SceneLink>
                }
            </p>
        </div>;
    }
}

// Morse
const morseOptions = [
    {code: "... .... . -..", mhz: "3.505"},
    {code: ".... .- .-.. .-.. ...", mhz: "3.515"},
    {code: "... .-.. .. -.-. -.-", mhz: "3.522"},
    {code: "- .-. .. -.-. -.-", mhz: "3.532"},
    {code: "-... --- -..- . ...", mhz: "3.535"},
    {code: ".-.. . .- -.- ...", mhz: "3.542"},
    {code: "... - .-. --- -... .", mhz: "3.545"},
    {code: "-... .. ... - .-. ---", mhz: "3.552"},
    {code: "..-. .-.. .. -.-. -.-", mhz: "3.555"},
    {code: "-... --- -- -... ...", mhz: "3.565"},
    {code: "-... .-. . .- -.-", mhz: "3.572"},
    {code: "-... .-. .. -.-. -.-", mhz: "3.575"},
    {code: "... - . .- -.-", mhz: "3.582"},
    {code: "... - .. -. --.", mhz: "3.592"},
    {code: "...- . -.-. - --- .-.", mhz: "3.595"},
    {code: "-... . .- - ...", mhz: "3.600"}
];
addFlag("theMorse", "");
addFlag("theMorseAnswer", "");

addFlag("wiresData", null);
const allWireColors = ["yellow", "blue", "white", "black"];
function generateWires() {
    const correct = true;
    const wireCount = randomOf([3, 4, 5, 6]);
    if (wireCount === 3) {
        // 3 Wires
        switch (randomOf([1,2,3,4])) {
        case 1: { // If there are no red wires, cut the second wire.
            const colorsNotRed = allWireColors.filter(x => x !== "red");
            wiresData = [
                { color: randomOf(colorsNotRed) },
                { color: randomOf(colorsNotRed), correct },
                { color: randomOf(colorsNotRed) },
            ];
            break;
        }
        case 2: { // Otherwise, if the last wire is white, cut the last wire.
            wiresData = [
                ...randomListOf(allWireColors, 2, ["red"]).map(color => ({ color })),
                { color: "white", correct }
            ];
            break;
        }
        case 3: { // Otherwise, if there is more than one blue wire, cut the last blue wire.
            wiresData = randomListOf([], 3, ["blue", "blue", "red"]).map((color, i, array) => ({ color, correct: array[0] === "red" ? i == 2 : color === "blue" && i !== 0 }));
            break;
        }
        case 4: { // Otherwise, cut the last wire.
            const colorsNotBlue = allWireColors.filter(x => x !== "blue");
            wiresData = [
                ...randomListOf([], 2, ["blue", "red"]).map(color => ({ color })),
                { color: randomOf(colorsNotBlue), correct },
            ];
            break;
        }
        }
    } else if (wireCount === 4) {
        //
    } else if (wireCount === 5) {
        //
    } else if (wireCount === 6) {
        //
    }
}
function generateButton() {
    // If the button is blue and the button says "Abort", hold the button and refer to "Releasing a Held Button".
    // If there is more than 1 battery on the bomb and the button says "Detonate", press and immediately release the button.
    // If the button is white and there is a lit indicator with label CAR, hold the button and refer to "Releasing a Held Button".
    // If there are more than 2 batteries on the bomb and there is a lit indicator with label FRK, press and immediately release the button.
    // If the button is yellow, hold the button and refer to "Releasing a Held Button".
    // If the button is red and the button says "Hold", press and immediately release the button.
    // If none of the above apply, hold the button and refer to "Releasing a Held Button".
}

addScenes({
    //#region Main KTANE
    ktane_start: {
        prompt: () => <div>
        </div>,
        options: [],
        action: () => {
            // Generate bomb information.
            batteries = Math.floor(Math.random() * Math.floor(7));

            generateSerial();
            generatePort();
            generateFRK();
            generateButton();
            generateWires();

            var morse = randomOf(morseOptions);
            theMorse = morse.code;
            theMorseAnswer = morse.answer;

            setScene("ktane_main");
        },
        noContributor: true,
    },
    ktane_main: BombScene({
        prompt: () => <div>
            <BombHeader />
            <p>
                {ktmaintext}
            </p>
        </div>,
        options: () => [
            { text: "Wires", to: "ktane_wires", disabledText: "Wires (defused)", if: () =>  !wires},
            { text: "The Button", to: "ktane_button", disabledText: "The Button (defused)", if: () =>  !buttom},
            { text: "Symbols", to: "ktane_symbols" + symbolsProgress, disabledText: "Symbols (defused)", if: () =>  !symbols},
            { text: "Complex Wires", to: "ktane_complex_wires", disabledText: "Complex Wires (defused)", if: () =>  !complexWires},
            { text: "Morse", to: "ktane_morse", disabledText: "Morse (defused)", if: () =>  !morse}
        ],
        contributor: "Hunter"
    }),
    ktane_info: BombScene({
        prompt: () => <div>
            <BombHeader hideLink />
            <SceneLink to={prevScene}>Go Back</SceneLink>            
            <p>
                <b>Bomb Information:</b>
                <ul>
                    <li>Strikes: 0</li>
                    <li>Batteries: {batteries}</li>
                    <li>Serial Number: {serial}</li>
                    <li>Parallel Port: {parallelPort}</li>
                    <li>Has a LIT Indicator of FRK: {hasFRK}</li>
                </ul>
            </p>
        </div>,
        options: () => [
            { text: "Back", to: prevScene },
        ]
    }),
    ktane_correct: BombScene({
        prompt: () => <div>
            <BombHeader hideLink />
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
            <p>
                You defused this module!
            </p>
        </div>,
        options: () => defusedOptions
    }),
    //#endregion

    //#region Morse Code
    ktane_morse: BombScene({
        prompt: () => <div>
            <BombHeader />
            <p>
                The light flashes <code>{theMorse}</code> at you. Which MHz do you enter?
            </p>
        </div>,
        options: () => morseOptions.map((item) => {
            if (theMorse === item.code) {
                return CorrectOption({ text: item.mhz, action: () => morse = true });
            } else {
                return IncorrectOption({ text: item.mhz });
            }
        }),
        contributor: "Hunter"
    }),
    // #endregion

    // #region Symbols
    ktane_symbols1: {
        prompt: () => <div>
            <BombHeader />
            <p>
                There are four keypads with symbols on them. Press them in the right order.
            </p>
        </div>,
        options: [
            { text: "Copyright", to: "ktane_symbols2" },
            IncorrectOption({ text: "Hallow Star" }),
            IncorrectOption({ text: "Curly Thing" }),
            IncorrectOption({ text: "A Weird Looking Broken Three Thing", to: "ktane_fail" }),
        ],
        action: () => symbolsProgress = 1,
        contributor: "Hunter"
    },
    ktane_symbols2: {
        prompt: () => <div>
            <BombHeader />
            <p>
                There are four keypads with symbols on them. Press them in the right order.
            </p>
        </div>,
        options: [
            { text: "Copyright", disabledText: "Pressed", if: () => false, to: "ktane_symbols2" },
            IncorrectOption({ text: "Hallow Star" }),
            { text: "Curly Thing", to: "ktane_symbols3" },
            IncorrectOption({ text: "A Weird Looking Broken Three Thing" })
        ],
        action: () => symbolsProgress = 2,
        contributor: "Hunter"
    },
    ktane_symbols3: {
        prompt: () => <div>
            <BombHeader />
            <p>
                There are four keypads with symbols on them. Press them in the right order.
            </p>
        </div>,
        options: [
            { text: "Copyright", disabledText: "Pressed", if: () => false, to: "ktane_symbols2" },
            IncorrectOption({ text: "Hallow Star", to: "ktane_fail" }),
            { text: "Curly Thing", disabledText: "Pressed", if: () => false, to: "ktane_symbols3" },
            { text: "A Weird Looking Broken Three Thing", to: "ktane_symbols4" }
        ],
        action: () => symbolsProgress = 3,
        contributor: "Hunter"
    },
    ktane_symbols4: {
        prompt: () => <div>
            <BombHeader />
            <p>
                There are four keypads with symbols on them. Press them in the right order.
            </p>
        </div>,
        options: [
            { text: "Copyright", disabledText: "Pressed", if: () => false, to: "ktane_symbols2" },
            CorrectOption({ text: "Hallow Star", action: () => symbols = true }),
            { text: "Curly Thing", disabledText: "Pressed", if: () => false, to: "ktane_symbols3" },
            { text: "A Weird Looking Broken Three Thing", disabledText: "Pressed", if: () => false, to: "ktane_symbols4" }
        ],
        action: () => symbolsProgress = 4,
        contributor: "Hunter"
    },
    // #endregion

    // #region Endings
    ktane_fail: {
        prompt: () => <div>
            <p>
                The bomb went BOOM!
            </p>
        </div>,
        ending: {
            id: "bad-bomb-defused",
            name: "Bad Bomb Defuser",
            description: "You failed at defusing a simple bomb...-",
        },
        contributor: "Hunter"
    }
    // #endregion
});
