import React from "react";
import { addFlag, resetFlags, setScene } from "web-text-adventure";
import { addScenes } from "../../src/js/ending.jsx";

addFlag("sleepTime", 0);

addScenes({
    // Start. Level 1.
    wakeup: {
        prompt: () => <div>
            <p>You wake up in a room. <strong>What do you do?</strong></p>
        </div>,
        
        options: [
            { text: "Go outstide", to: "wakeup_outside" },
            { text: "Make some breakfast.", to: "wakeup_breakfast" },
            { text: "Check the time", to: "wakeup_check_time" }
        ],

        action: () => {
            resetFlags();
        },

        contributor: "Dave"
    },

    // Go outside. Level 2.
    wakeup_outside: {
        prompt: () => <div>
            <p>You walk outside from sleeping. You spot multiple different animals such as lizards, spiders, and humans. <strong>What do you do?</strong></p>
        </div>,
        options: [
            { text: "Touch the lizard", to: "touch_lizard" },
            { text: "Touch the spider", to: "touch_spider" },
            { text: "Touch the human", to: "touch_human" },
        ],
        contributor: "Hunter"
    },

    touch_spider: {
        prompt: () => <div>
            You touch the spider, it's surprisingly soft, <strong>what do you do?</strong>
        </div>,
        options: [
            { text: "Pocket it", to: "pocket_spider" },
            { text: "Stroke it's back", to: "" },
            { text: "Smash it", to: "smash_spider" }
        ],
        contributor: "Adr"
    },

    pocket_spider: {
        prompt: () => <div>
            <p>You pocketed the spider, it seems to like being in the pocket.</p>
            <p className="inventory-update">
                + Added Spider to Inventory.
            </p>
        </div>,
        options: [
            { text: "Go touch more things.", to: "touch_main" }
        ],
        contributor: "Adr"
    },

    smash_spider: {
        prompt: () => <div>
            <p>
                You smashed the Spider, you monster.
            </p>
            <p className="inventory-update">
                + Added Spider Corpse to Inventory.
            </p>
            <br/>
        </div>,
        options: [
            { text: "Go back and touch more things", to: "genocide_main"}
        ]
    },

    touch_human: {
        prompt: () => <div>
            <p>
                You touch the human. You ask them...
            </p>
        </div>,
        options: [
            { text: "What's the time", to: "" },
            { text: "Why is there a critical production bug", to: "work_pre" },
            { text: "▖┗▛▄▖▜▚┣", to: "" },
        ],
        contributor: "Hunter"
    },
    
    touch_lizard: {
        prompt: () => <div>
            <p>
                You reach for the lizard but it bites you right in the arm. You need to...
            </p>
        </div>,
        options: [
            { text: "Get it treated", to: "touch_lizard_treat"},
            { text: "Punch that lizard", to: ""},
            { text: "Not care, and don't do anything", to: ""},
        ],
        contributor: "Alchemyking"
    },
    

    // Eat breakfast. Level 2.
    wakeup_breakfast: {
        prompt: () => <div>
            <p>You walk downstairs to make some breakfast.What do you make?</p>
        </div>,
        options: [
            { text: "Pancakes.", to: "make_pancakes" },
            { text: "Waffles.", to: "make_waffles" },
            { text: "Hashbrowns.", to: "make_hashbrowns" },
            { text: "Omelette.", to: "make_omelette" },
        ],
        contributor: "Colyderp"
    },

    // Check time. Level 2.
    wakeup_check_time: {
        prompt: () => <div>
            <p>You look at your clock to check the time and realize...</p>
        </div>,
        options: [
            { text: "...you are still sleepy and need more rest.", to: "sleep" },
            { text: "...you're hungry and want to eat something.", to: "wakeup_breakfast" },
            { text: "...you have plans to go outside and go on an adventure.", to: "adventure_start" }
        ],
        contributor: "Toshiyuki"
    },

    // Sleep. Level 3.
    sleep: {
        prompt: () => <div>
            <p>You go to bed and get more rest.</p>
        </div>,
        options: [
            { text: "Sleep more.", to: "sleepmore" },
            { text: "Wake up.", to: "wakeup" }
        ],
        contributor: "Dave"
    },
    sleepmore: {
        prompt: () => <div>
            <p>You continue to sleep.</p>
        </div>,
        options: [
            { text: "Sleep more.", to: "sleepmore", if: () => sleepTime < 26 },
            { text: "Wake up.", to: "sleep_ending", if: () => sleepTime >= 26 },
            { text: "Wake up.", to: "wakeup", if: () => sleepTime <= 20,  }
        ],
        action: () => sleepTime++,
        contributor: "Dave"
    },
    sleep_ending: {
        prompt: () => <div>
            You slept for so long that you were killed by a tornado. Not even the loud tornado sirens, or the tornado itself could wake you up before it killed you.
        </div>,
        ending: {
            id: "sleep-ending",
            name: "Death by Tornado",
            description: "Sleep until a tornado kills you."
        },
        contributor: "Hunter"
    },

    // Pancakes. Level 3.
    make_pancakes: {
        prompt: () => <div>
            <p>You want to make pancakes, but you have a few types to choose from.</p>
        </div>,
        options: [
            { text: "Regular.", to: "make_regular_pancakes" },
            { text: "McDonalds™ brand.", to: "make_mcd_pancakes" },
            { text: "Chocolate.", to: "make_chocolate_pancakes" },
            { text: "Peanut butter.", to: "make_pb_pancakes" }
        ],
        contributor: "Dave"
    },
});