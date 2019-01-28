import React from "react";
import { addScenes } from "@src/ending";
import { addFlag } from "web-text-adventure/src/adventure";

addScenes({
    sting_start: {
        prompt: () => <div>
            <p>You have now become a Coyote. Specifically Coyote Peterson. Now... <strong>IT'S TIME TO ENTER THE STING ZONE WITH THE...</strong></p>
        </div>,
        options: [
            { text: "Executioner Wasp on the Arm", to: "sting_exec" },
            { text: "2 x 4 LEGO Brick (Part #: 3001) on the Foot", to: "sting_lego" },
            { text: "Razor Scooter on the Ankle", to: "sting_scooter" }
        ],
        contributor: "Hunter"
    },
    sting_exec: {
        prompt: () => <div>
            <p>You got stung by the <span style={{color: "golden"}}>Executioner Wasp</span>, and died.</p>
            <p>I guess it lives up to it's name...</p>
        </div>,
        ending: {
            id: "video-gone-wrong",
            name: "Mark: Are You Okay?",
            description: "DoES iT LooK LikE IT?"
        },
        contributor: "Hunter"
    },
    sting_lego: {
        prompt: () => <div>
            <p>You step on the LEGO, and you start to almost die. The pain is so bad you could die. You got brought into a hospital
                where they needed to do surgery on <s>a grape</s> your foot to extract it. You died during sugery.
            </p>
        </div>,
        ending: {
            id: "lego-step",
            name: "Stepping on LEGO",
            description: "Ow."
        },
        contributor: "Hunter"
    },
    sting_scooter: {
        prompt: () => <div>
            <p>You <em>lightly</em> tap youra ankle with the scooter and it feels like someone took a blowtorch and made it catch fire. That must hurt.</p>
        </div>,
        ending: {
            id: "razor-scooter",
            name: "It Was Just a Tap",
            description: "Never trust those things."
        }
    }
});
