import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

function randomOf(...list) {
    return list[Math.floor((Math.random() * list.length))];
}

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
function generateWires() {

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
