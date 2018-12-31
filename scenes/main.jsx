import React from 'react';
import Credits from '../credits.jsx';
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
        
        contributor: "Dave"
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
            { text: "Waffles.", to: "waffles" },
            { text: "Hashbrowns.", to: "hashbrowns" },
            { text: "Omlette.", to: "omelette" }
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
        ],
        // anonymous
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
        contributor: "Dave"
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
            { text: "Run for it.", to: "runFromHospital" },
            { text: "Take out a loan.", to: "" },
            { text: "Jump out a window.", to: "dead" },
        ],
        contributor: "Filip96"
    },

    // Dead. Level 0.
    dead: {
        prompt: () => <div>
            <p>
                How unfortunate, You died... Good thing in this world you can always go back to the beginning.
            </p>
            
            <Credits />

            <br/><br/>
        </div>,
        options: [
            { text: () => <span className="playAgain">Play Again</span>, to: "start" }
        ],
        contributor: null
    }
});
