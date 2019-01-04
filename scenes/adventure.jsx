import React from "react";
import { addScenes } from "../src/ending.jsx";
import { addFlag } from "web-text-adventure";

addFlag("hasEatenTurkey", false);

addScenes({
    adventure_start: {
        prompt: () => <div>
            <p>Your adventure starts today. You are going to make the best of it. You <strong>plan</strong> to be gone for seven days. <s>That's gonna happen</s>. <b>
                What do you do first?</b></p>
        </div>,
        options: [
            { text: "Get on a plane to go to Africa.", to: "adventure_africa_pre" },
            { text: "Board the bus.", to: "adventure_fortnite_start" },
            { text: "Walk in the tall grass.", to: "adventure_pokemon_start" }
        ],
        contributor: "Hunter"
    },

    adventure_africa_pre: {
        prompt: () => <div>
            You decide to take a plane to Africa since planes are "the safest way of travel". But which airline do you take to get there?
        </div>,
        options: [
            { text: "Delta", to: "" },
            { text: "United Airlines", to: "adventure_africa_united_start" },
        ],
    },
    
    // Africa
    adventure_africa_united_start: {
        prompt: () => <div>
            <p>You board the plane to go to Africa. It is a long flight so you booked first class seating, but United Airlines pulled a No U and downgraded you to a
                regular seat with no compensation. OwO. The plane takes off normal, and reaches it cruising altitiude. With another ten hours to go, what do you do?
            </p>
        </div>,
        options: [
            { text: "Sleep", to: "adventure_africa_united_sleep" },
            { text: "Stay Woke", to: "adventure_africa_crash_start" },
            { text: "Jump Out of the Plane", to: "adventure_africa_jump" },
        ],
        contributor: "Hunter"
    },

    adventure_africa_united_sleep: {
        prompt: <div>
            <p>You go to sleep, and realize that you slept so soundly that you never knew the plane crashed on a remote island. Then it burned and exploded due to the leak
                of jet fuel.
            </p>
        </div>,
        ending: {
            id: "airplane-crash",
            name: "Died in a Metal Tube",
            description: "You slept in too long because you pulled an all nighter at the airport due to a cancelation. Thanks a lot United Airlines."
        },
        contributor: "Hunter"
    },

    adventure_africa_crash_start: {
        prompt: () => <div>
            <p>Staying awake is fun. You got a sprite cranberry, seven packs of pretzels and even used the bathroom a couple times. The flight is fun until you crashed into
                an island. Somehow you dropped from 12,500 feet to zero within a milisecond. Don't ask how, the flat earthers will blame the pilots. The crash landing wasn't
                as bad as some of the landings with Ryanair, but you did feel a <i>little</i> jolt. The plane is now on fire. <strong>What do you do?</strong>
            </p>
        </div>,
        options: [
            { text: "Wait until rescue comes.", to: "adventure_africa_crash_wait" },
            { text: "Escape the plane.", to: "advenure_island_start" },
            { text: "Finish eating that 10 pound turkey you smuggled in your carry-on.", to: "adventure_africa_crash_eat" },
        ],
        contributor: "Hunter"
    },

    adventure_africa_crash_wait: {
        prompt: () => <div>
            <p>You waited for rescue to come, but nobody came. Waiting inside a burning plane. The plane later exploded because of the leaking jet fuel.</p>
        </div>,
        ending: {
            id: "boom-roasted",
            name: "Boom Roasted",
            description: "You got roasted alive, and the plane went BOOM!"
        },
        contributor: "Hunter"
    },

    adventure_island_start: {
        prompt: () => <div>
            <p>You escape the plane without any harm done. With only you as the survivor that you know of, and with the plane about to explode, what do you do?</p>
        </div>,
        options: [
            { text: "Punch some trees.", to: "" },
            { text: "Find some food.", to: "", if: () => !hasEatenTurkey },
            { text: "Break open some suitcases.", to: "" },
        ]
    },

    adventure_africa_crash_eat: {
        prompt: () => <div>
            <p>You carefully take out the uncooked turkey out of your bag and start to eat it. When you eat the turkey, you are satisfied.</p>
        </div>,
        options: [
            { text: "Continue", to: "adventure_island_start", action: () => hasEatenTurkey =  true }
        ]
    },

    // Fortnite
    adventure_fortnite_start: {
        prompt: () => <div>
            <p></p>
        </div>,
        options: [
            { text: "", to: "" },
        ],
        contributor: "Hunter"
    },

    // Pokemon
    adventure_pokemon_start: {
        prompt: () => <div>
            <p>You carefully step into the tall grass. Then suddenly a Pokemon appears! You can't run from trainer battles, so you send out your Charmander to fight the 
                Squirtle.
            </p>
        </div>,
        options: [
            { text: "Continue", to: "adventure_pokemon_main" },
        ],
        contributor: "Hunter"
    },

    adventure_pokemon_main: {
        prompt: () => <div>
            <p>What does Charmander do?</p>
        </div>,
        options: [
            { text: "Fight", to: "" },
            { text: "Bag", to: "" },
            { text: "Pokemon", to: "" },
            { text: "Run", to: "" },
        ]
    },
});
