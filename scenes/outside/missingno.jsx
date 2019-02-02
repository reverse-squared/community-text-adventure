import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addScenes({
    missingno: {
        prompt: () => <div>
            <p>
                While saying it, he thinks you are MissingNo. He catches you in a attempt to get items
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Durvenson"
    },
    missingno_chill: {
        prompt: () => <div>
            <p>
                You chill inside of the pokeball...
            </p>
        </div>,
        options: [
            { text: "Get out of the pokeball", to: "missingno_getout" },
        ],
        contributor: "Dave"
    },
    missingno_faint: {
        prompt: () => <div>
            <p>
                He doesn't want you now. He will send you to Professor Oak!
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus"},
            { text: "Suicide", to: "missingno_pretendvirus"},
            { text: "Delete your entry in the pokedex", to: "missingno_pretendvirus"},
            { text: "Look around for stuff", to: "missingno_pretendvirus"},
            { text: "Do nothing", to: "missingno_pretendvirus"},
        ],
        contributor: "Durvenson"
    },
});
