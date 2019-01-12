import React from "react";
import { addScenes } from "@src/ending";
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
            { text: "Touch the lizard", disabledText: "(dead)", if: () => touch_alive.lizard, to: "genocide_lizard" },
            { text: "Touch the spider", disabledText: "(dead)", to: "touch_spider", if: () => false },
            { text: "Touch the human", disabledText: "(dead)", if: () => touch_alive.human, to: "genocide_human" },
            { text: "Touch the unicorn", disabledText: "(dead)", if: () => touch_alive.unicorn, to: "genocide_unicorn" },
            { text: "Touch the chicken", disabledText: "(dead)", if: () => touch_alive.chicken, to: "genocide_chicken" },
        ],
        contributor: "Hunter and Colyderp"
    },
    genocide_chicken: {
        prompt: () => <div>
            You touch the chicken, it seems startled for a second. <strong>What do you do?</strong>
        </div>,
        options: [
            { text: "(try to) Kill it", to: "genocide_chicken_kill_fail" },
            { text: "Keep it", to: "genocide_chicken_keep" },
            { text: "Act like a chicken", to: "genocide_chicken_act" },
            { text: "Distract it", to: "genocide_chicken_distract" },
        ]
    },
    genocide_chicken_distract: {
        prompt: () => <div>
            You use the spider corpse to distract the chicken.
        </div>,
        options: [
            { text: "Kill it", to: "genocide_chicken_kill", action: () => touch_alive.chicken = false },
            { text: "Act like a chicken", to: "genocide_chicken_act" },
        ]
    },
    genocide_chicken_kill_fail: {
        prompt: () => <div>
            A angry swarm of chickens fly at you, turns out, this wasn't a ordinary chicken, it was a cucco, better watch out next time.
        </div>,
        ending: {
            id: "genocide-chicken-fail",
            name: "Chicken Swarm Ending",
            description: "Die from a swarm of chicken."
        }
    },
    genocide_chicken_kill: {
        prompt: () => <div>
            <p>You easily killed the chicken while it was distracted.</p>
            <p className="inventory-update">
                + Added Chicken Corpse to Inventory.
            </p>
            <p>What do you do with it?</p>
        </div>,
        options: [
            { text: "Throw it in the furnace.", to: "" },
            { text: "Eat it.", to: "" },
            { text: "Give it to the dogs.", to: "" },
            { text: "Keep it.", to: "genocide_main" },
        ],
        contributor: "Hunter"
    },
    genocide_chicken_act: {
        prompt: () => <div>
            <p>You start to act like a chicken. It seems very confused. What now?</p>
        </div>,
        options: [
            { text: "(try to) Kill it", to: "genocide_chicken_kill_fail" },
            { text: "Keep it", to: "genocide_chicken_keep" },
            { text: "Act like a chicken", to: "genocide_chicken_act", if: () => false },
            { text: "Distract it", to: "genocide_chicken_distract" },
        ],
        contributor: "Hunter"
    },
    genocide_chicken_keep: {
        prompt: () => <div>
            <p></p>
        </div>,
        options: [
        ],
        contributor: "Hunter"
    }
});
