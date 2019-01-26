import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending.jsx";

addScenes({
    // Fortnite
    adventure_fortnite_start: {
        prompt: () => <div>
            <p>
                You board the bus, but you realize that this is no ordinary bus, its a <strong>Battle Bus</strong>, and its flying.
            </p>
        </div>,
        options: [
            { text: "Try to get off", to: "adventure_fortnite_get_off" },
            { text: "Ask what the hell is going on", to: "adventure_fortnite_question" },
            { text: "Play some Fortnite™ Mobile", to: "" },
            { text: "Play some of this IRL Fortnite or whatever is happening", to: "adventure_fortnite_leave" },
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
            { text: "Try to get off", to: "adventure_fortnite_get_off" },
            { text: "Ask what the hell is going on", to: "adventure_fortnite_question", disabledText: true, if: () => false },
            { text: "Play some Fortnite™ Mobile", to: "" },
            { text: "Play some of this IRL Fortnite or whatever is happening", to: "" },
        ],
        contributor: "Dave"
    },
    adventure_fortnite_get_off: {
        prompt: () => <div>
            <p>You try to open the doors in the front and back of the bus, they are locked, so are the emergency exit window. The bus driver sees you trying to leave,
                and then he grabs you, opens the door, and throws you out the window.
            </p>
        </div>,
        options: [
            { text: "Continue", to: "adventure_fortnite_leave" }
        ],
        contributor: "Hunter"
    },
    adventure_fortnite_leave: {
        prompt: () => <div>
            <p>Now that you are out of the bus, you see everyone else in the bus start jumping too. What do you do?</p>
        </div>,
        options: [
            { text: "Activate your glider", to: "" },
            { text: "Keep falling", to: "" },
            { text: "Disconnect from the game", to: "adventure_fortnite_leave_game" },
        ],
        contributor: "Hunter"
    },
    adventure_fortnite_leave_game: {
        prompt: () => <div>
            <p>You left the game before you even landed. It wasn't even a game, so you did suicide to leave the game. GG.</p>
        </div>,
        ending: {
            id: "fortnite-suicide",
            name: "Bus Jumping Suicide",
            description: "Why would killing yourself in the sky be a good idea?"
        },
        contributor: "Hunter"
    }
});
