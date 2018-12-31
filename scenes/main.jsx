import React from 'react';
import { addFlag, addScenes } from 'web-text-adventure';

addScenes({
    // Start. Level 1.
    start: {
        prompt: () => <div>
            <p>You wake up in a room. <b>What do you do?</b></p>
        </div>,
        
        options: [
            { text: "Go outstide", to: "outside" },
            { text: "Make some breakfast.", to: "breakfast" },
            { text: "Check the time", to: "checkTime" }
        ],
        
        contributor: "dave"
    },

    // Go outside. Level 2.
    outside: {
        prompt: () => <div>
            <p>You walk outside from sleeping. You spot multiple different animals such as lizards, spiders, and humans. <b>What do you do?</b></p>
        </div>,
        options: [
            { text: "Touch the lizard.", to: "lizardTouch" },
            { text: "Touch the spider.", to: "spiderTouch" },
            { text: "Touch the human.", to: "humanTouch" }
        ],
        contributor: "Hunter Parcells"
    },

    // Eat breakfast. Level 2.
    breakfast: {
        prompt: () => <div>
            <p>You walk downstairs to make some breakfast.What do you make?</p>
        </div>,
        options: [
            { text: "Pancakes.", to: "pancakes" },
            { text: "Waffles.", to: "" },
            { text: "Hashbrowns.", to: "" },
            { text: "Omlete.", to: "" }
        ],
        contributor: "Colyderp"
    },

    // Check time. Level 2.
    checkTime: {
        prompt: () => <div>
            <p>You look at your clock to check the time and realize...</p>
        </div>,
        options: [
            { text: "...you are still sleepy and need more rest.", to: "start" },
            { text: "...you're hungry and want to eat something.", to: "breakfast" },
            { text: "...you have plans to go outside and go on an adventure.", to: "" }
        ]
    },

    // Pancakes. Level 3.
    pancakes: {
        prompt: () => <div>
            <p>You want to make pancakes, but you have a few types to choose from.</p>
        </div>,
        options: [
            { text: "Regular.", to: "regularPancakes" },
            { text: "McDonalds™ brand.", to: "mcdPancakes" },
            { text: "Chocolate.", to: "chocolatePancakes" },
            { text: "Peanut butter.", to: "pbPancakes" }
        ],
        contributor: "dave"
    },

    // Peanut butter pancakes. Level 4.
    pbPancakes: {
        prompt: () => <div>
            <p>Turns out you are allergic to peanut butter. Now you have to play a hospital and ambulance bill of <b>$4313</b>. Do you pay it?</p>
        </div>,
        options: [
            { text: "Yes (-$4313)", to: "yesPayBill" },
            { text: "No", to: "noPayBill" }
        ],
        contributor: "Hunter Parcells"
    },

    // Don't pay hospital bill. Level 5.
    noPayBill: {
        prompt: () => <div>
            <p>You decide not to pay the bill and...</p>
        </div>,
        options: [
            { text: "Run for it.", to: "" },
            { text: "Take out a loan.", to: "" },
            { text: "Jump out a window.", to: "" },
        ],

        contributor: <a href="https://filipkin.com/">Filip96</a>
    },

    dead: {
        prompt: () => <div>
            <p>Uh oh how unfortunate. <b>You died.</b></p>
            <p class="credit">Contributed by: .</p>
        </div>,
        options: [
            { text: "Play again.", to: "start" }
        ],

        contributor: "Hunter Parcells"
    }
});
