import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending";

addScenes({
    make_hashbrowns: {
        prompt: () => <div>
            <p>Hashbrowns are pretty neat. Lets make some! Pick your flavor.</p>
        </div>,
        options: [
            { text: "Hashbrowns", to: "hashbrown_death" },
            { text: "Hashbrownies", to: "hashbrownies" }
        ],
        contributor: "Adr"
    },
    hashbrown_death: {
        prompt: () => <div>
            <p>When the hashbrowns are done making, you choke on them. Nobody is there to save you nor can you save yourself.You eventually pass out and die.</p>
        </div>,
        ending: {
            id: "hashbrowns",
            name: "Potato Death",
            description: "How did you even choke on something that easy to eat?"
        },
        contributor: "Colyderp"
    },
    hashbrownies: {
        prompt: () => <div>
            <p>You make <b>hash</b>brownies, but the hashbrownies have all sorts of assortments of letters all over it. Do you try and understand what it 
                means?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "hash_start" },
            { text: "Sure", to: "hash_start" },
            { text: "Absolutely", to: "hash_start" },
            { text: "By All Means", to: "hash_start" },
            { text: "Okey Dokey", to: "hash_start" },
            { text: "Alright", to: "hash_start" },
            { text: "Of Course", to: "hash_start" },
            { text: "Definitely", to: "hash_start" },
            { text: "No thank!", to: "hash_no" }
        ],
        contributor: "Toshiyuki and Hunter"
    },
    hash_no: {
        prompt: () => <div>
            <p>You ate a brownie.</p>
        </div>,
        ending: {
            id: "ate-brownie",
            name: "Eated Unhealthy",
            description: "You ate a brownie."
        },
        contributor: "Hunter"
    }

    // TODO: hash_start
});
