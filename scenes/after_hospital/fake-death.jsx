import React from "react";
import { addFlag } from "web-text-adventure";
import { addScenes } from "../../src/js/ending.jsx";

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
