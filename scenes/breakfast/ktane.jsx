import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

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

// Bomb Manual
// http://www.bombmanual.com/manual/1/html/index.html

addFlag("wires", false);
addFlag("buttom", false);
addFlag("symbols", false);
addFlag("complexWires", false);
addFlag("morse", false);

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J,", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

/**
 * A function to generate a serial number for a KTanE bombs.
 * @returns {string} A six character string including numbers and letters in uppercase in the format of NUMBER LETTER NUMBER LETTER LETTER NUMBER.
 */
function generateSerial() {
    serial = "";
    serial += numbers[Math.floor(Math.random() * numbers.length)];
    serial += letters[Math.floor(Math.random() * letters.length)];
    serial += numbers[Math.floor(Math.random() * numbers.length)];
    serial += letters[Math.floor(Math.random() * letters.length)];
    serial += letters[Math.floor(Math.random() * letters.length)];
    serial += numbers[Math.floor(Math.random() * numbers.length)];
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

addFlag("batteries", null);
addFlag("serial", "");
addFlag("parallelPort", null);
addFlag("hasFRK", null);
const BombHeader = () => <div>
    <b>Bomb Information:</b>
    <ul>
        <li>Strikes: 0</li>
        <li>Batteries: {batteries}</li>
        <li>Serial Number: {serial}</li>
        <li>Parallel Port: {parallelPort}</li>
        <li>Has a LIT Indicator of FRK: {hasFRK}</li>
    </ul>
</div>;

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

addFlag("wires", null);
const allWireColors = ["yellow", "blue", "white", "black"];
function generateWires() {
    const correct = true;
    const wireCount = randomOf([3, 4, 5, 6]);
    if (wireCount === 3) {
        // 3 Wires
        switch (randomOf([1,2,3,4])) {
        case 1: { // If there are no red wires, cut the second wire.
            const colorsNotRed = allWireColors.filter(x => x !== "red");
            wires = [
                { color: randomOf(colorsNotRed) },
                { color: randomOf(colorsNotRed), correct },
                { color: randomOf(colorsNotRed) },
            ];
            break;
        }
        case 2: { // Otherwise, if the last wire is white, cut the last wire.
            wires = [
                ...randomListOf(allWireColors, 2, ["red"]).map(color => ({ color })),
                { color: "white", correct }
            ];
            break;
        }
        case 3: {// Otherwise, if there is more than one blue wire, cut the last blue wire.
            wires = randomListOf([], 3, ["blue", "blue", "red"]).map((color, i, array) => ({ color, correct: array[0] === "red" ? i == 2 : color === "blue" && i !== 0 }));
            break;
        }
        case 4: {// Otherwise, cut the last wire.
            const colorsNotBlue = allWireColors.filter(x => x !== "blue");
            wires = [
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
    return wires;
}

addScenes({
    // #region KTANE
    ktane_start: {
        prompt: () => <div>
            <BombHeader />
            <p>
                There are five modules... which do you defuse first?
            </p>
        </div>,
        options: [
            { text: "Wires", to: "ktane_wires", disabledText: "Wires (defused)", if: () =>  !wires},
            { text: "The Button", to: "ktane_button", disabledText: "The Button (defused)", if: () =>  !buttom},
            { text: "Symbols", to: "ktane_symbols", disabledText: "Symbols (defused)", if: () =>  !symbols},
            { text: "Complex Wires", to: "ktane_complex_wires", disabledText: "Complex Wires (defused)", if: () =>  !complexWires},
            { text: "Morse", to: "ktane_morse", disabledText: "Morse (defused)", if: () =>  !morse}
        ],
        action: () => {
            // Generate bomb information.
            batteries = Math.floor(Math.random() * Math.floor(7));

            generateSerial();
            generatePort();
            generateFRK();
        },
        contributor: "Hunter"
    },
    ktane_select: {
        prompt: () => <div>
            <BombHeader />
            <p>
                Which next?
            </p>
        </div>,
        options: [
            { text: "Wires", to: "ktane_wires", disabledText: "Wires (defused)", if: () =>  !wires},
            { text: "The Button", to: "ktane_button", disabledText: "The Button (defused)", if: () =>  !buttom},
            { text: "Symbols", to: "ktane_symbols", disabledText: "Symbols (defused)", if: () =>  !symbols},
            { text: "Complex Wires", to: "ktane_complex_wires", disabledText: "Complex Wires (defused)", if: () =>  !complexWires},
            { text: "Morse", to: "ktane_morse", disabledText: "Morse (defused)", if: () =>  !morse}
        ],
        contributor: "Hunter"
    },
    ktane_morse: {
        prompt: () => <div>
            <BombHeader />
            <p>
                The light flashes <code>{theMorse}</code> at you. Which MHz do you enter?
            </p>
        </div>,
        options: () => morseOptions.map((item) => {
            if(theMorse === item.code)  {
                return ({ text: item.mhz, to: "ktane_select", action: () => morse = true });
            }else {
                return ({ text: item.mhz, to: "ktane_fail" });
            }
        }),
        action: () => {
            var index = Math.floor(Math.random() * morseOptions.length);
            theMorse = morseOptions[index].code;
            theMorseAnswer = morseOptions[index].answer;
        },
        contributor: "Hunter"
    },
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
        }
    }
    // #endregion
});
