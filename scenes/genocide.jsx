import { addScenes } from "../src/ending.jsx";
import { addFlag } from "web-text-adventure";

addFlag("touch_alive", {
    chicken: true,
    lizard: true,
    human: true,
    unicorn: true,
});

addScenes({
    genocide_main: {
        prompt: () => <div>
            <p>You continue your adventure. You spot multiple different animals such as lizards, spiders, and humans. <strong>What do you do?</strong></p>
        </div>,
        options: [
            { text: "Touch the lizard", to: "genocide_lizard" },
            { text: "Touch the spider", disabledText: "(dead)", to: "touch_spider", if: () => false },
            { text: "Touch the human", to: "genocide_human" },
            { text: "Touch the unicorn", to: "genocide_unicorn" },
            { text: "Touch the chicken", to: "genocide_chicken" },
        ],
        contributor: "Hunter and Colyderp"
    },
    genocide_chicken: {
        prompt: <div>
            You touch the chicken, it seems startled for a second. <strong>What do you do?</strong>
        </div>,
        options: [
            { text: "(try to) Kill it", to: "genocide_chicken_kill" },
            { text: "Keep it", to: "genocide_chicken_keep" },
            { text: "Act like a chicken", to: "genocide_chicken_act" },
            { text: "Distract it", to: "genocide_chicken_distract" },
        ]
    },
    genocide_chicken_distract: {
        prompt: <div>
            You use the spider corpse to distract the chicken.
        </div>,
        options: [
            { text: "Kill it", to: "genocide_chicken_kill" },
            { text: "Act like a chicken", to: "genocide_chicken_act" },
        ]
    }
    
});