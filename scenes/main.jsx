import React from "react";
import { addFlag, resetFlags, setScene } from "web-text-adventure";
import { addScenes } from "../src/ending.jsx";

addFlag("sleepTime", 0);
addFlag("hasTouchedSpider", false);
addFlag("graveWaitTime", 0);

function increaseGraveWait() {
    graveWaitTime++;

    if(graveWaitTime > 4) {
        setScene("grave_die");
    }
}
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

    // Spider
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
            { text: "Get it treated", to: ""},
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
        contributor: null
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

    make_regular_pancakes: {
        prompt: () => <div>
            <p>You start making a pancake. What do you do with it.</p>
        </div>,
        options: [
            { text: "Put syrup on it.", to: "regular_pancake_syrup" },
            { text: "Put butter on it.", to: "regular_pancake_butter" },
            { text: "Leave it as is.", to: "regular_pancake_leave" },
            { text: "Rent someone else's pancake.", to: "regular_pancake_rent" }
        ],
        contributor: null
    },
    // Peanut butter pancakes. Level 4.
    make_pb_pancakes: {
        prompt: () => <div>
            <p>Turns out you are allergic to peanut butter. Now you have to play a hospital and ambulance bill of <strong>$4313</strong>. Do you pay it?</p>
        </div>,
        options: [
            { text: "Yes (-$4313)", to: "yes_pay_bill" },
            { text: "No", to: "no_pay_bill" }
        ],
        contributor: "Hunter"
    },

    // Pay the hospital bill.
    yes_pay_bill: {
        prompt: () => <div>
            <p>You wanna pay your bill, so you have two options, pay with cash and risk getting arrested with counterfeit cash, or pay with one of your 23 credit cards which probably are all maxed out.</p>
        </div>,
        options: [
            { text: "Pay with Cash", to: "pay_bill_cash" },
            { text: "Pay with Credit", to: "pay_bill_credit" }
        ],
        contributor: "Hunter"
    },

    pay_bill_cash: {
        prompt: () => <div>
            <p>You paid with your cash. Even though it was counterfeit, nobody noticed. <s>That won't come back up later.</s> You continue with your day and go outside. What do you do?</p>
        </div>,
        options: [
            { text: "Fake your death", to: "fake_your_death" },
            { text: "Go skydiving.", to: "skydive_pre" }
        ],
        contributor: "Hunter"
    },

    pay_bill_credit: {
        prompt: () => <div>
            <p></p>
        </div>,
        options: [
            { text: "", to: "" },
            { text: "", to: "" }
        ],
        contributor: ""
    },

    // Don't pay hospital bill. Level 5.
    no_pay_bill: {
        prompt: () => <div>
            <p>You decide not to pay the bill and...</p>
        </div>,
        options: [
            { text: "Run for it.", to: "run_from_hospital" },
            { text: "Take out a loan.", to: "loan_start" },
            { text: "Jump out a window.", to: "jump_out_a_window" },
        ],
        contributor: "Filip96"
    },

    jump_out_a_window: {
        prompt: () => <div>
            You jump out of the window, taking your leap of faith... and die, what kind of idea was that supposed to be.
        </div>,
        ending: {
            id: "jump-out-window",
            name: "Leap of Faith",
            description: "Why would anyone want to jump out of a window?",
        }
    },

    fake_your_death: {
        prompt: () => <div>
            <p>You fake your death by pretending you died on the street. Nobody cared to check your pulse so they assumed you were dead. They placed you in a 
                coffin and burried you. With nobody knowing that you exist, what do you do.
            </p>
        </div>,
        options: [
            { text: "Leave your grave.", to: "grave_death_leave" },
            { text: "Wait.", to: "grave_wait" }
        ],
        contributor: "Hunter"
    },
    grave_death_leave: {
        prompt: () => <div>
            <p>When you left your grave, the burrial ceremony wasn't over. People though you were a zombie and shot you down.</p>
        </div>,
        ending: {
            id: "grave-zombie",
            name: "Rose from the Dead",
            description: "Fake your death and rise from the \"dead\".",
        }
    },
    grave_wait: {
        prompt: () => <div>
            <p>You waited five minutes. What now?</p>
        </div>,
        options: [
            { text: "Wait more.", to: "grave_wait" },
            { text: "Leave grave.", to: "grave_leave" }
        ],
        action: increaseGraveWait
    },
    grave_die: {
        prompt: () => <div>
            <p>You somehow died in your grave, because of a lack of oxygen. The whole point was to fake your death and not <i>actually</i> die. Good job.</p>
        </div>,
        ending: {
            id: "grave-death",
            name: "Accidental Suicide",
            description: "You accidentally killed yourself in your own grave. How does that even happen?",
        }
    }
});
