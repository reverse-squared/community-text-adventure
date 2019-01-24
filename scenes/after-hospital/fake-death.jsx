import React from "react";
import { addFlag } from "web-text-adventure";
import { addScenes } from "@src/ending";

addFlag("graveWaitTime", 0);

function increaseGraveWait() {
    graveWaitTime++;

    if (graveWaitTime > 4) {
        setScene("grave_die");
    }
}

addScenes({
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
        },
        contributor: "Hunter",
    },
    grave_wait: {
        prompt: () => <div>
            <p>You waited five minutes. What now?</p>
        </div>,
        options: [
            { text: "Wait more.", to: "grave_wait" },
            { text: "Leave grave.", to: "grave_leave" }
        ],
        action: increaseGraveWait,
        contributor: "Hunter",
    },
    grave_die: {
        prompt: () => <div>
            <p>You somehow died in your grave, because of a lack of oxygen. The whole point was to fake your death and not <i>actually</i> die. Good job.</p>
        </div>,
        ending: {
            id: "grave-death",
            name: "Accidental Suicide",
            description: "You accidentally killed yourself in your own grave. How does that even happen?",
        },
        contributor: "Hunter",
    },
    grave_leave: {
        prompt: () => <div>
            <p>Now that you are "dead", and nobody knows that you are alive, what illegal crimes will you commit?</p>
        </div>,
        options: [
            { text: "Become a Hitman", to: "hitman" },
            { text: "Rob a Bank", to: "" },
            { text: "Become a Level 1 Crook", to: "" }
        ],
        contributor: "Hunter"
    },

    hitman: {
        prompt: () => <div>
            <p>
                Your first job is to kill someone named... Wait... thats your name!? Your first job is to kill Yourself.
            </p>
        </div>,
        options: [
            { text: "Die", to: "hitman_do" },
            { text: "Don't", to: "hitman_dont" },
        ],
        contributor: "Dave"
    },

    hitman_dont: {
        prompt: () => <div>
            <p>
                You decide not to take the job, but within a day someone else was hired in your place, and they have killed you.
            </p>
        </div>,
        ending: {
            id: "death-by-hitman",
            name: "Killed by Hitman",
            description: "Refuse to take a hitman job to kill yourself, then someone else gets the job.",
        },
        contributor: "Dave"
    },
    hitman_do: {
        prompt: () => <div>
            <p>
                You take the job, and kill yourself... uhhh... They weren't able to pay you since you weren't alive to verify the transaction.
            </p>
        </div>,
        ending: {
            id: "paid-suicide",
            name: "Paid Suicide",
            description: "Become a hitman for yourself.",
        },
        contributor: "Dave"
    }
});
