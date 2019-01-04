import React from "react";
import { addScenes } from "../src/ending.jsx";
import { addFlag } from "web-text-adventure";

addFlag("airlineName", "Airline Companies");

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
            { text: "Delta Airlines", to: "adventure_africa_start", action: () => airlineName = "Delta" },
            { text: "United Airlines", to: "adventure_africa_start", action: () => airlineName = "United Airlines" },
            { text: "Spirit Airlines", to: "spirit_airlines", action: () => airlineName = "Spirit" },
            { text: "Air Canada", to: "adventure_africa_start", action: () => airlineName = "Air Canada" },
            { text: "JetBlue Airways", to: "adventure_africa_start", action: () => airlineName = "JetBlue" },
            { text: "WestJet Airlines", to: "adventure_africa_start", action: () => airlineName = "WestJet" },
            { text: "American Airlines", to: "adventure_africa_start", action: () => airlineName = "American Airlines" },
        ],
        contributor: "Dave"
    },

    spirit_airlines: {
        prompt: <div>
            <p>
                Now thats a mistake, you are already dead, just don't go on spirit. YOUR GAME HAS ENDED.
            </p>
            <a href="https://www.youtube.com/watch?v=YvfYK0EEhK4">Learn More</a>
        </div>,
        ending: {
            id: "spirit",
            name: "Spirit Airlines",
            description: "Go on a spirit airplane, what a mistake that was going to be.",
        },
        contributor: "Dave"
    },
    
    // Africa
    adventure_africa_start: {
        prompt: () => <div>
            <p>
                You board the plane to go to Africa. It is a long flight so you booked first class seating, but {airlineName} pulled a No U and downgraded you to a
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
            <p>
                You go to sleep, and realize that you slept so soundly that you never knew the plane crashed on a remote island. Then it burned and exploded due to the leak
                of engine fuel. Thanks {airlineName}.
            </p>
        </div>,
        ending: {
            id: "airplane-crash",
            name: "Died in a Metal Tube",
            description: "You slept in too long because you pulled an all nighter at the airport due to a cancelation. Then the plane crashed and no one helped you."
        },
        contributor: "Hunter"
    },

    // Fortnite
    adventure_fortnite_start: {
        prompt: () => <div>
            <p>
                You board the bus, but you realize that this is no ordinary bus, its a <strong>Battle Bus</strong>, and its flying.
            </p>
        </div>,
        options: [
            { text: "Try to get off", to: "" },
            { text: "Ask what the hell is going on", to: "adventure_fortnite_question" },
            { text: "Play some Fortnite™ Mobile", to: "" },
            { text: "Play some of this IRL Fortnite or whatever is happening", to: "" },
        ],
        contributor: "Dave"
    },
    adventure_fortnite_question: {
        prompt: () => <div>
            <p>
                Everyone on the bus is now questioning why you don't know whats going on.
            </p>
        </div>,
        options: [
            { text: "Try to get off", to: "" },
            { text: "Ask what the hell is going on", to: "adventure_fortnite_question", disabledText: true, if: () => false },
            { text: "Play some Fortnite™ Mobile", to: "" },
            { text: "Play some of this IRL Fortnite or whatever is happening", to: "" },
        ],
        contributor: "Dave"
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
