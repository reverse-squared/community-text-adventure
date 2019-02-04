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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

//#endregion

addFlag("wires", false);
addFlag("wireCut", []);
addFlag("buttom", false);
addFlag("symbols", false);
addFlag("symbolsProgress", 1);
addFlag("complexWires", false);
addFlag("morse", false);

addFlag("prevScene", "");
addFlag("ktmaintext", "There are five modules... which do you defuse first?");
addFlag("defusedOptions", []);

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
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
    let indicators = 0;
    hasTRN = false;
    hasFRK = false;
    hasCAR = false;

    if (Math.random() > 0.7) {
        hasFRK = true;
        indicators++;
    }
    if (Math.random() > 0.7) {
        hasCAR = true;
        indicators++;
    }
    if (indicators < 1 && Math.random() > 0.3) {
        hasTRN = true;
        indicators++;
    }
    if (indicators < 2 && Math.random() > 0.2) {
        hasFRA = true;
        indicators++;
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
    option.to = null;
    option.action = () => {
        if (action) action();
        // BG
        if(t1) clearTimeout(t1);
        if(t2) clearTimeout(t2);
        if(t3) clearTimeout(t3);

        strikes++;

        document.body.style.transition = "";

        if (strikes >= 3) {
            document.body.style.background = "black";
            document.body.style.opacity = "0";
            setScene("ktane_fail");
        } else {
            document.body.style.background = "red";
        }

        t1 = setTimeout(() => {
            t1 = undefined;
            t2 = setTimeout(() => {
                t2 = undefined;
                document.body.style.transition = "background 1.5s linear, opacity 1s linear 0.5s";
                document.body.style.background = "";
                document.body.style.opacity = "1";
                t3 = setTimeout(() => {
                    t3 = undefined;
                    document.body.style.transition = "";
                }, 1500);
            }, 100);
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

        ktmaintext = "Now what module do you want to solve.";

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
addFlag("hasCAR", null);
addFlag("hasTRN", null);
addFlag("hasFRA", null);
addFlag("strikes", 0);
addFlag("timeLeft", 10 * 60);

class BombHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            timeLeft--;
            if(timeLeft <= 0) {
                setScene("ktane_fail");
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return <div>
            <p>
                <b>
                    Defuse the Bomb... You have {(timeLeft - (timeLeft % 60)) / 60}:{(timeLeft % 60).toString().padStart(2, "0")} left and have {strikes} strikes.{" "}
                </b>
                {
                    !this.props.hideLink &&
                    <SceneLink to="ktane_info">View Bomb Information</SceneLink>
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
const allWireColors = ["yellow", "blue", "white", "black", "red"];
function generateWires() {
    const correct = true;
    const wireCount = randomOf([3, /*4, 5, 6*/]);
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
const allButtonColors = ["red", "blue", "yellow", "white"];
const allButtonStripColors = ["red", "blue", "yellow", "white"];
const allButtonText = ["press", "hold","abort","detonate"];
addFlag("buttonColor", null);
addFlag("buttonStrip", null);
addFlag("buttonText", null);
addFlag("buttonSolution", null);
addFlag("stripSolution", null);
function generateButton() {
    buttonColor = randomOf(allButtonColors);
    buttonStrip = randomOf(allButtonStripColors);
    buttonText = randomOf(allButtonText);

    buttonSolution = "";
    stripSolution = "";

    // If the button is blue and the button says "Abort", hold the button and refer to "Releasing a Held Button".
    if(buttonColor === "blue" && buttonText === "abort") {
        buttonSolution = "hold";
    }
    // If there is more than 1 battery on the bomb and the button says "Detonate", press and immediately release the button.
    else if(batteries > 1 && buttonText === "detonate") {
        buttonSolution = "press";
    }
    // If the button is white and there is a lit indicator with label CAR, hold the button and refer to "Releasing a Held Button".
    else if(buttonColor === "white" && hasCAR) {
        buttonSolution = "hold";
    }
    // If there are more than 2 batteries on the bomb and there is a lit indicator with label FRK, press and immediately release the button.
    else if(batteries > 2 && hasFRK) {
        buttonSolution = "press";
    }
    // If the button is yellow, hold the button and refer to "Releasing a Held Button".
    else if(buttonColor === "yellow") {
        buttonSolution = "hold";
    }
    // If the button is red and the button says "Hold", press and immediately release the button.
    else if(buttonColor === "red" && buttonText === "hold") {
        buttonSolution = "press";
    }
    // If none of the above apply, hold the button and refer to "Releasing a Held Button".
    else {
        buttonSolution = "hold";
    }

    stripSolution = "1";
    
    // Blue strip: release when the countdown timer has a 4 in any position.
    if(buttonStrip === "blue") stripSolution = "4";
    // Yellow strip: release when the countdown timer has a 5 in any position.
    if(buttonStrip === "blue") stripSolution = "5";
    // Any other color strip: release when the countdown timer has a 1 in any position.
}

class TheButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isholdingdown: false,
            shineStrip: false,
        };
        let t1;
        this.handleDown = () => {
            this.setState({ isholdingdown: true });
            t1 = setTimeout(() => {
                t1 = null;
                this.setState({ shineStrip: true });
            }, 300);
        };
        this.handleUp = () => {
            if (!this.state.isholdingdown) return;
            this.setState({ isholdingdown: false });
            if(t1) {
                clearTimeout(t1);
            }
            if(this.state.shineStrip) {
                this.setState({ shineStrip: false });
                if(buttonSolution === "hold") {
                    if ((timeLeft % 10).toString() === stripSolution) {
                        buttom = true;
                        CorrectOption({isButton:true}).action();
                        setScene(CorrectOption({isButton:true}).to);
                    } else {
                        IncorrectOption({}).action();
                    }
                } else {
                    IncorrectOption({}).action();
                }
            } else {
                if (buttonSolution === "press") {
                    buttom = true;
                    CorrectOption({isButton:true}).action();
                    setScene(CorrectOption({isButton:true}).to);
                } else {
                    IncorrectOption({}).action();
                }
            }
        };
        this.componentWillUnmount = () => {
            this.handleUp();
        };
    }
    render() {
        const active = true;
        return <div>
            <style>{`
                .thebutton {
                    width: 150px;
                    height: 150px;
                    background: white;
                    color: black;
                    border: none;
                    font-weight: bold;
                    font-size: 25px;
                    border-radius: 70px;
                    position: relative;
                }
                .strip {
                    margin-left: 25px;
                    height: 150px;
                    background: black;
                    width: 35px;
                    box-shadow: none!important;
                }
                .thebutton:active {
                    box-shadow: none;
                    top: 10px;
                }
                .thebutton:focus, .thebutton:hover {
                    outline: none;
                    background: #FAFAFA;
                }
                .btncontainer {
                    display: flex;
                    justify-content: center;
                }
                [data-color="yellow"] {
                    background: yellow;
                    box-shadow: 0 10px 0 gold;
                }
                :not(.strip)[data-color="yellow"]:hover,:not(.strip)[data-color="yellow"]:focus {
                    background: #FAFA00;
                }
                [data-color="white"] {
                    background: white;
                    box-shadow: 0 10px 0 #ddd;
                }
                [data-color="red"] {
                    background: red;
                    box-shadow: 0 10px 0 maroon;
                }
                :not(.strip)[data-color="red"]:hover,:not(.strip)[data-color="red"]:focus {
                    background: #FA0000;
                }
                [data-color="blue"] {
                    background: blue;
                    box-shadow: 0 10px 0 #00A;
                    color: white;
                }
                :not(.strip)[data-color="blue"]:hover,:not(.strip)[data-color="blue"]:focus {
                    background: #0000FA;
                }
            `}
            </style>
            <div className="btncontainer">
                <button
                    className="thebutton"
                    data-color={buttonColor}
                    onMouseDown={this.handleDown}
                    onMouseLeave={this.handleUp}
                    onMouseUp={this.handleUp}
                >
                    {buttonText.toUpperCase()}
                </button>
                <div className="strip"
                    data-color={this.state.shineStrip && buttonStrip}/>
            </div>
        </div>;
    }
}

addFlag("complexWireData", []);
addFlag("complexWiresCut", [false, false, false, false, false, false,]);
function generateComplexWires() {
    complexWireData = [0,0,0,0,0,0].map(() => {
        const wire = {};
        wire.colors = randomListOf(["white", "blue", "red"],2).sort();
        wire.led = Math.random() >= 0.5;
        wire.star = Math.random() >= 0.5;

        wire.blue = wire.colors.includes("blue");
        wire.red = wire.colors.includes("red");
        
        let letter = "C";
        if(wire.red) letter = "S";
        if(wire.blue) letter = "S";
        if(wire.led) letter = "D";
        if(wire.star) letter = "C";
        if(wire.star && wire.blue) letter = "P";
        if(wire.star && wire.red) letter = "C";
        if(wire.blue && wire.red) letter = "S";
        if(wire.star && wire.led) letter = "B";
        if(wire.star && wire.blue) letter = "D";
        if(wire.led && wire.red) letter = "D";
        if(wire.led && wire.red && wire.blue) letter = "S";
        if(wire.star && wire.red && wire.blue) letter = "P";
        if(wire.star && wire.led && wire.blue) letter = "P";
        if(wire.star && wire.led && wire.red) letter = "B";
        if(wire.star && wire.led && wire.red && wire.blue) letter = "D";

        wire.needsClick = false;
        if(letter === "C") wire.needsClick = true;
        if(letter === "D") wire.needsClick = false;
        if(letter === "S" && (!endsInOdd(serial))) wire.needsClick = true;
        if(letter === "P" && parallelPort) wire.needsClick = true;
        if(letter === "B" && batteries >= 2) wire.needsClick = true;

        return wire;
    });
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
            generateComplexWires();

            var morse = randomOf(morseOptions);
            theMorse = morse.code;
            theMorseAnswer = morse.answer;

            setScene("ktane_main");
        },
        noContributor: true,
        excludeEmptyOptionsCheck: true,
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
            { text: "Complicated Wires", to: "ktane_complex_wires", disabledText: "Complex Wires (defused)", if: () =>  !complexWires},
            { text: "Morse", to: "ktane_morse", disabledText: "Morse (defused)", if: () =>  !morse}
        ],
        action: () => {
            if(wires && buttom && symbols && complexWires && morse) {
                setScene("bombdefuse");
            }
        },
        contributor: "Hunter"
    }),
    ktane_info: BombScene({
        isInfoPage: true,
        excludeEmptyOptionsCheck: true,
        prompt: () => <div>
            <BombHeader hideLink />
            <SceneLink to={prevScene}>Go Back</SceneLink>            
            <p>
                <b>Bomb Information:</b>
            </p>

            <ul>
                <li>It has {batteries} batter{batteries === 1 ? "y" : "ies"}</li>
                <li>It's serial number is <span style={{fontFamily:"monospace", color:"orange"}}>{serial}</span></li>
                {
                    parallelPort && <li>It has a Parallel Port</li>
                }
                {
                    hasFRA &&
                        <li>There's a lit indicator with the letters <span style={{ fontFamily: "monospace", color: "orange" }}>FRA</span></li>
                }
                {
                    hasTRN &&
                        <li>There's a lit indicator with the letters <span style={{ fontFamily: "monospace", color: "orange" }}>TRN</span></li>
                }
                {
                    hasFRK &&
                        <li>There's a lit indicator with the letters <span style={{ fontFamily: "monospace", color: "orange" }}>FRK</span></li>
                }
                {
                    hasCAR &&
                        <li>There's a lit indicator with the letters <span style={{ fontFamily: "monospace", color: "orange" }}>CAR</span></li>
                }
            </ul>
        </div>,
        options: () => []
    }),
    ktane_correct: BombScene({
        prompt: () => <div>
            <BombHeader hideLink />
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
            <p>
                You defused this module!
            </p>
        </div>,
        excludeEmptyOptionsCheck: true,
        contributor: "Dave",
        options: () => defusedOptions
    }),
    //#endregion

    //#region Morse Code
    ktane_morse: BombScene({
        prompt: () => <div>
            <BombHeader />
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
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
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
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
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
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
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
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
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
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

    // #region Wires
    ktane_wires: BombScene({
        prompt: () => <div>
            <BombHeader />
            <SceneLink to='ktane_main'>Go Back</SceneLink>            
            <p>
                You look at the wires modules, you need to cut exactly one wire, which one do you cut.
            </p>
        </div>,
        options: () => (wiresData && wiresData.map((wire, i) => {
            if (wire.correct) {
                return CorrectOption({ text: capitalizeFirstLetter(wire.color) + " wire", action: () => { wires = true; } });
            } else {
                return IncorrectOption({ text: capitalizeFirstLetter(wire.color) + " wire", if: () => !wireCut[i], action: () => wireCut[i] = true, disabledText: true });
            }
        })) || [],
        excludeEmptyOptionsCheck: true,
        contributor: "Dave",
    }),
    // #endregion

    // #region The Button
    ktane_button: BombScene({
        prompt: () => <div>
            <BombHeader />
            <SceneLink to='ktane_main'>Go Back</SceneLink>   
            <p>
                You look at the button.
            </p>
            <TheButton />
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true
    }),
    // #endregion
    
    // #region complex wires
    ktane_complex_wires: BombScene({
        prompt: () => <div>
            <BombHeader />
            <SceneLink to='ktane_main'>Go Back</SceneLink>
            <p>
                You approach the complecated wires, which do you cut.
            </p>
        </div>,
        options: () => (complexWireData && complexWireData.map((wire, i) => {
            const star = "★";
            const circle = () => <span style={{display:"inline-block", width: "12px", height: "12px", background: "white", borderRadius: "6px"}}></span>;
            const circle_empty = () => <span style={{display:"inline-block", width: "12px", height: "12px", border: "1px solid white", borderRadius: "6px"}}></span>;
            const text = () => <span>
                <span style={{color: wire.star ? "white" : "transparent"}} aria-hidden={!wire.star}>{star}</span>
                {" "}
                <span>{wire.led ? circle() : circle_empty()}</span>
                {" "}
                {
                    wire.colors[0] === wire.colors[1]
                        ? capitalizeFirstLetter(wire.colors[0])
                        : wire.colors.map(capitalizeFirstLetter).join(" and ")
                }
                {" "}
                wire
            </span>;

            if (wire.needsClick) {
                if(complexWireData.filter(item => item.needsClick).length === 1) {
                    return CorrectOption({ text, if: () => !complexWiresCut[i], action: () => {complexWires = true;} });
                } else {
                    return ({ text, to: null, if: () => !complexWiresCut[i], action: () => { complexWiresCut[i] = true, complexWireData[i].needsClick = false; __rerender = true;}, disabledText: true });
                }
            } else {
                return IncorrectOption({ text, if: () => !complexWiresCut[i], action: () => { complexWiresCut[i] = true; __rerender = true;}, disabledText: true });
            }
        })) || [],
        excludeEmptyOptionsCheck: true,
        contributor: "Dave"
    }),
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
            description: "You failed at defusing a simple bomb...",
        },
        contributor: "Hunter"
    },
    bombdefuse: {
        prompt: () => <div>
            <p>
                You defused the bomb! With {((600 - timeLeft) - ((600 - timeLeft) % 60)) / 60}:{((600 - timeLeft) % 60).toString().padStart(2, "0")} and {strikes}. Good Job.
            </p>
        </div>,
        ending: {
            id: "god-bomb-defused",
            name: "Defuse the Bomb",
            description: "Boom its done and defused and shit.",
        },
        contributor: "Dave"
    }
    // #endregion
});
