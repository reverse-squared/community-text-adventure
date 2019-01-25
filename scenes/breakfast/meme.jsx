import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending.jsx";

addScenes({
    hash_stop_novape: {
        prompt: () => <div>
            <p><b>HIT OR MISS, I NEVER HIT THAT VAPE! HUH?</b> You have become a <span className="gradient-green">Level 100 Master</span>. Now this is epic. That's how <s>the mafia</s> school works.</p>
        </div>,
        options: [
            { text: "Attention, all Fortnite gamers...", to: "" },
            { text: "I wanna be tracer...", to: "" },
            { text: "1 2 7 3...", to: "" },
            { text: "I'm going to say the N-Word...", to: "" },
            { text: "This is so sad... Alexa play...", to: "" },
            { text: "Wait. That's illegal...", to: "" },
            { text: "What even is this?", to: "" },
            { text: "Kris, is that a weed...", to: "" },
            { text: "I smell pennies...", to: "" },
            { text: "Mary, is that a police...", to: "" },
            { text: "It's time for a crusade...", to: "" },
            { text: "Yeetus yeetus..", to: "" },
            { text: "You're gonna have a bad time...", to: "" },
            { text: "NANI?!?!", to: "" },
            { text: "That's what she said...", to: "" },
            { text: "I play Pokemon Go...", to: "" },
            { text: "TURN IT UP TO 11...", to: "" },
            { text: "Wake me up inside...", to: "" }
        ],
        contributor: "Hunter, Helvetica, and Dave"
    },
});
