import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { addScenes } from "./../src/ending.jsx";

addFlag("skydiveTurns", 11);

const SkydiveHeader = () => <div>
    <p className={"loan-header " + (skydiveTurns < 3 ? "loan-header-low" : "")}>
        You have <strong>{skydiveTurns}</strong> turns save yourself.
    </p>
</div>;

const decreaseSkydiveTurn = () => {
    skydiveTurns--;

    if(skydiveTurns <= 0) {
        setScene("skydive_die");
    }
};

addScenes({
    skydive_start: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>Skydiving is nice you thought. Right out of the hospital. You board the plane and climb to 12,500 feet. The guy opens the door and tells you to jump.
                You jump and he tells you to open your parachute when you think it right.
            </p>
            <p>Okay, so your parachute just failed.</p>
            <h6>CALM DOWN</h6>
            <h3>CALM DOWN</h3>
            <h1>CALM DOWN</h1>
            <p>What do you do.</p>
        </div>,
        options: [
            { text: "Try the paracute again.", to: "skydive_parachute_try_again" },
        ],
        action: () => {
            decreaseSkydiveTurn();
        },
        contributor: "Hunter"
    },

    skydive_parachute_try_again: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>Hmmmm. That didnt work. What now?</p>
        </div>,
        options: [
            { text: "Try the paracute again.", to: "skydive_parachute_try_again" },
        ],
        action: () => {
            decreaseSkydiveTurn();
        },
        contributor: "Hunter"
    },

    skydive_die: {
        prompt: () => <div>
            <p>Even with all your attempts to save yourself from death, and all the safety features on your parachute, you still somehow died.</p>
        </div>,
        ending: {
            id: "skydiving-death",
            name: "Skydiving Disaster",
            description: "Die in the sky.",
        },
        contributor: "Hunter"
    }
}); 