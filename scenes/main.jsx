import React from "react";
import Credits from "../templates/credits.jsx";
import { addFlag } from "web-text-adventure";
import { addScenes } from "../src/ending.jsx";

addFlag("sleepTime", 0);

addScenes({
    // Introduction Paragraph
    start: {
        prompt: <div>
            <p>
                Welcome to the Community Text Adventure. All paths and options are
                made by different people, collaborating to create a full game.
            </p>
        </div>,
        options: [
            { text: "Begin", to: "wakeup" }
        ],
        contributor: null
    },

    // Start. Level 1.
    wakeup: {
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
        contributor: "Hunter"
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
            { text: "...you are still sleepy and need more rest.", to: "sleep" },
            { text: "...you're hungry and want to eat something.", to: "breakfast" },
            { text: "...you have plans to go outside and go on an adventure.", to: "" }
        ],
        // anonymous
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
        prompt: <div>
            you fucking died
        </div>,
        options: [

        ],
        contributor: "Hunter"
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
        contributor: "Hunter"
    },

    // Pay the hospital bill.
    yesPayBill: {
        prompt: () => <div>
            <p>You wanna pay your bill, so you have two options, pay with cash and risk getting arrested with counterfeit cash, or pay with one of your 23 credit cards which probably are all maxed out.</p>
        </div>,
        options: [
            { text: "Pay with Cash", to: "payCash" },
            { text: "Pay with Credit", to: "payCredit" }
        ],
        contributor: "Hunter"
    },

    payCash: {
        prompt: () => <div>
            <p>You paid with your cash. Even though it was counterfeit, nobody noticed. <s>That won't come back up later.</s> You continue with your day and go outside. What do you do?</p>
        </div>,
        options: [
            { text: "Fake your death", to: "fakeDeath" },
            { text: "Go skydiving.", to: "skydive" }
        ],
        contributor: "Hunter"
    },

    // Don't pay hospital bill. Level 5.
    noPayBill: {
        prompt: () => <div>
            <p>You decide not to pay the bill and...</p>
        </div>,
        options: [
            { text: "Run for it.", to: "runFromHospital" },
            { text: "Take out a loan.", to: "loan_start" },
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
            { text: () => <span className="playAgain">Play Again</span>, to: "wakeup" }
        ],
        ending: {
            id: "dead-generic",
            name: "Dead",
            description: "Die somehow. This ending should not really exist, and there should be specific ways to die."
        },
        contributor: null
    }
});
