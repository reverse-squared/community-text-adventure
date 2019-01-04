import React from "react";
import { addScenes } from "../src/ending.jsx";
import { addFlag } from "web-text-adventure";

addScenes({
    adventure_start: {
        prompt: () => <div>
            <p>Your adventure starts today. You are going to make the best of it. You <strong>plan</strong> to be gone for seven days. <s>That's gonna happen</s>. <b>
                What do you do first?</b></p>
        </div>,
        options: [
            { text: "Get on a plane to go to Africa.", to: "adventure_africa_start" },
            { text: "Board the bus.", to: "adventure_fortnite_start" },
            { text: "Walk in the tall grass.", to: "adventure_pokemon_start" }
        ],
        contributor: "Hunter"
    },

    // Africa
    adventure_africa_start: {
        prompt: () => <div>
            <p>You board the plane to go to Africa. It is a long flight so you booked first class seating, but United Airlines pulled a No U and downgraded you to a
                regular seat with no compensation. OwO. The plane takes off normal, and reaches it cruising altitiude. With another ten hours to go, what do you do?
            </p>
        </div>,
        options: [
            { text: "Sleep", to: "adventure_africa_sleep" },
            { text: "Stay Woke", to: "adventure_africa_crash_start" },
            { text: "Jump Out of the Plane", to: "" },
        ],
        contributor: "Hunter"
    },

    adventure_africa_sleep: {
        prompt: <div>
            <p>You go to sleep, and realize that you slept so soundly that you never knew the plane crashed on a remote island. Then it burned and exploded due to the leak
                of engine fuel.
            </p>
        </div>,
        ending: {
            id: "airplane-crash",
            name: "Died in a Metal Tube",
            description: "You slept in too long because you pulled an all nighter at the airport due to a cancelation. Thanks a lot United Airlines."
        },
        contributor: "Hunter"
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
            <p></p>
        </div>,
        options: [
            { text: "", to: "" },
        ],
        contributor: "Hunter"
    },
});
