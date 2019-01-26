import React from "react";
import { addFlag } from "web-text-adventure";
import { addScenes } from "@src/ending.jsx";
import { GreenGradient } from "@templates/FontStyles";

addFlag("collect200", false);

addScenes({
    hash_stop_novape: {
        prompt: () => <div>
            <p><b>HIT OR MISS, I NEVER HIT THAT VAPE! HUH?</b> You have become a <GreenGradient string="Level 100 Master"/>. Now this is epic. That's how <s>the mafia</s> school works.</p>
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
            { text: "Yeetus yeetus..,", to: "" },
            { text: "You're gonna have a bad time...", to: "" },
            { text: "NANI?!?!", to: "" },
            { text: "That's what she said...", to: "" },
            { text: "I play Pokemon Go...", to: "" },
            { text: "TURN IT UP TO 11...", to: "meme_turn11" },
            { text: "Wake me up inside...", to: "" }
        ],
        contributor: "Hunter, Helvetica, and Dave"
    },
    meme_turn11: {
        prompt: () => <div>
            <p>Nice try... but that ending is in a diffrent castle. Now go back to the start <strong>Do Not Collect $200</strong>... and also, you don't get an ending this time.</p>
            <img src="https://media1.tenor.com/images/9bb8f1a9272c2d29f77f442b90a5b111/tenor.gif" />
        </div>,
        options: [
            { text: "Return to Start", to: "wakeup_no_reset", action: () => collect200 = true }
        ],
        contributor: "Hunter"
    }
});
