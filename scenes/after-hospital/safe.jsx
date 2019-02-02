import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("phoneFromSafe", false);
addFlag("safeNothing", true);
addFlag("safeBomb", true);

addScenes({
    hospital_car_success_other: {
        prompt: () => <div>
            <p>
                You escaped the police, and made it somewhere safe. It's a very safe place. Now what?
            </p>
        </div>,
        options: [
            { text: "Use your phone", to: "phone_start", action: () => phoneFromSafe = true },
            { text: "Do nothing", to: "safe_nothing", if: () => safeBomb, action: () => safeBomb = false, disabledText: true },
            { text: "BOMB THE PLACE", to: "safe_bomb", if: () => safeNothing, action: () => safeNothing = false, disabledText: true },
        ],
        contributor: "torinpotato",
    },
    safe_nothing: {
        prompt: () => <div>
            <p>
                You are safe-ly safe in this safe place, which is very safe and you are saved. Now what?
            </p>
        </div>,
        options: [
            { text: "Use your phone", to: "phone_start", action: () => phoneFromSafe = true },
            { text: "Do nothing", to: "safe_nothing", if: () => safeBomb, action: () => safeBomb = false, disabledText: true },
            { text: "BOMB THE PLACE", to: "safe_bomb", if: () => safeNothing, action: () => safeNothing = false, disabledText: true },
        ],
        contributor: "Dave",
    },
    safe_bomb: {
        prompt: () => <div>
            <p>
                This place is too safe to BOMB, the bombs don't do anything. Now what?
            </p>
        </div>,
        options: [
            { text: "Use your phone", to: "phone_start", action: () => phoneFromSafe = true },
            { text: "Do nothing", to: "safe_nothing", if: () => safeBomb, action: () => safeBomb = false, disabledText: true },
            { text: "BOMB THE PLACE", to: "safe_bomb", if: () => safeNothing, action: () => safeNothing = false, disabledText: true },
        ],
        contributor: "Dave",
    },
});