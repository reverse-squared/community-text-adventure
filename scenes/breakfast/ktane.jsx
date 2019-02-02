import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("wires", false);
addFlag("buttom", false);
addFlag("symbols", false);
addFlag("complexWires", false);
addFlag("morse", false);

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
            { text: "The Button", to: "ktane_button", disabledText: "The Button (defused)", if: () =>  !buttom},
            { text: "Symbols", to: "ktane_symbols", disabledText: "Symbols (defused)", if: () =>  !symbols},
            { text: "Complex Wires", to: "ktane_complex_wires", disabledText: "Complex Wires (defused)", if: () =>  !complexWires},
            { text: "Morse", to: "ktane_morse", disabledText: "Morse (defused)", if: () =>  !morse}
        ],
        contributor: "Hunter"
    },
    ktane_select: {
        prompt: () => <div>
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
