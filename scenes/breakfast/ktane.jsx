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

addFlag("morseOptions", [
    "... .... . . -..",
    ".... .- .-.. .-.. ...",
    "... .-.. .. -.-. -.-",
    "- .-. .. -.-. -.-",
    "-... --- -..- . ...",
    ".-.. . .- -.- ...",
    "... - .-. --- -... ."
]);

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
            <p>
                There are five modules... which do you defuse first?
            </p>
        </div>,
        options: [
            { text: "Wires", to: "ktane_wires", disabledText: "Wires (defused)", if: () =>  !wires},
            { text: "The Button", to: "ktane_wires", disabledText: "The Button (defused)", if: () =>  !buttom},
            { text: "Symbols", to: "ktane_wires", disabledText: "Symbols (defused)", if: () =>  !symbols},
            { text: "Complex Wires", to: "ktane_wires", disabledText: "Complex Wires (defused)", if: () =>  !complexWires},
            { text: "Morse", to: "ktane_wires", disabledText: "Morse (defused)", if: () =>  !morse}
        ],
        contributor: "Hunter"
    },
    // #endregion
});
