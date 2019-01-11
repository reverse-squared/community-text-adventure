import React from "react";
import { addScenes } from "../src/js/ending.jsx";
import { addFlag, setScene } from "web-text-adventure";

import { HospitalExitActions } from "./main.jsx";

function randomOf(...list) {
    return list[Math.floor((Math.random() * list.length))];
}
function generateDirectionList() {
    // generate exits
    const exits = [];
    while (exits.length < 4) {
        let num;
        do {
            num = ~~(Math.random() * 99 + 1);
        } while (exits.includes(num));
        exits.push(num);
    }
    const correctExit = randomOf(...exits);
    
    // set the exit template
    options.exit = exits.map(x => "exit" + x);

    // build map
    return [
        randomOf("left", "right", "left", "left-ws"),
        randomOf("left", "right", "left-ws"),
        randomOf("left", "right-ws", "right-ws", "left-ws"),
        randomOf("left", "right", "left-ws", "straight", "left"),
        randomOf("left", "right", "left-ws", "straight", "left", "right-ws"),
        randomOf("left", "left-ws", "straight", "left", "left-ws", "left", "left-ws"),
        randomOf("left", "right", "straight", "left", "right", "right-ws", "left-ws"),
        randomOf("straight", "straight", "left-ws", "right-ws", "left", "right"),
        randomOf("straight", "left-ws", "right-ws", "left", "right", "left", "left", "right"),
        randomOf("straight", "left", "right", "left", "left", "right"),
        randomOf("straight", "left", "left-ws", "right"),
        randomOf("left", "left", "right"),
        "exit" + correctExit,
        randomOf("right", "straight", "right", "right-ws"),
        randomOf("right", "left", "right", "right-ws"),
        randomOf("roundabout left", "roundabout right"),
        randomOf("right", "left", "right"),
        randomOf("right-ws", "left-ws", "right"),
        randomOf("destination left", "destination right")
    ];
}

// route information
// const directions = [
//     "left",
//     "right",
//     "right-ws",
//     "left",
//     "right",
//     "left-ws",
//     "straight", //
//     "left",
//     "right",
//     "left",
//     "exit52",
//     "left",
//     "right",
//     "roundabout left",
//     "right",
//     "destination right",
// ];
addFlag("directions", null);

const mapDirectionKeyToName = {
    "left": "Turn left",
    "right": "Turn right",
    "right-ws": "Turn left",
    "left-ws": "Turn right",
    "straight": "Go straight",
    "roundabout left": "Turn left at the roundabout",
    "roundabout right": "Turn right at the roundabout",
    "destination right": "The destination is on your right",
    "destination left": "The destination is on your left",
    ...[...new Array(99)].map((x, i) => i + 1).reduce((obj, i) => {obj["exit"+i] = "Take Exit " + i;return obj;},{})
};

const options = {
    normal: ["left", "right"],
    normal_withstraight: ["left-ws", "right-ws", "straight"],
    roundabout: ["roundabout left", "roundabout right"],
    exit: ["exit12", "exit34", "exit52", "exit93"],
    destination: ["destination right", "destination left"],
};

addFlag("hospital_car_step", 0);

addScenes({
    touch_lizard_treat: {
        prompt: () => <div>
            <p>
                You want to get this lizard bite treated, so you open
                trusty <span style={{ color: "cornflowerblue" }}>Google Maps</span> so
                you can find they way. It says the directions once:
            </p>
            <ul style={{userSelect: "none"}}>
                {(() => {
                    // generate directions if not made yet
                    if (!directions)
                        directions = generateDirectionList();
                })()}

                {
                    directions.map((dir, i) => {
                        return <li key={i}>
                            {mapDirectionKeyToName[dir]}
                        </li>;
                    })
                }
            </ul>
        </div>,
        options: [
            { text: "Begin", to: "hospital_car_start"}
        ],
        contributor: "Alchemyking (idea) and Dave (implementation)"
    },
    hospital_car_start: {
        prompt: <div>
            <p>
                Where do you go.
            </p>
        </div>,
        options: () => {
            if(directions === null) return [];
            if (hospital_car_step >= directions.length) return [];
            const correct_answer = directions[hospital_car_step];
            // find option type
            const type = Object.keys(options).find(t => options[t].includes(correct_answer));
            // give options
            return options[type].map(id => ({
                text: mapDirectionKeyToName[id],
                to: null,
                action: () => {
                    if(id === correct_answer) {
                        hospital_car_step++;
                        if(hospital_car_step >= directions.length) {
                            setScene("hospital_car_success");
                        }
                    } else {
                        setScene("hospital_car_fail");
                    }
                }
            }));
        },
        contributor: "Alchemyking (idea) and Dave (implementation)"
    },
    hospital_car_fail: {
        prompt: () => <div>
            <p>You somehow failed the navigate to the hospital, even though Google Maps told you <b>EXACTLY</b> how to get there.</p>
            <p>You also died. Just to let you know.</p>
        </div>,
        ending: {
            id: "failed-google-maps",
            name: "Incompetent at Following \"Simple\" Instructions",
            description: "You were told the EXACT instuctions and still failed."
        },
        contributor: "Hunter",
    },
    hospital_car_success: {
        prompt: () => <div>
            <p>
                You navigated to the hospital successfully and got your bite treated quickly. They don't charge you anything because it was a simple action. You 
                leave the hospital. What do you decide to do?
            </p>
        </div>,
        options: HospitalExitActions,
        contributor: "Hunter",
    }
});
