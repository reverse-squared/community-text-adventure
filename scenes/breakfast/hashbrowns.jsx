import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending";
import { CircleText } from "@templates/FontStyles";

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
            <p>
                You make <b>hash</b>brownies, but the hashbrownies have all sorts of assortments of letters all over it. Do you try and understand what it 
                means?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "hash_failtounderstand" },
            { text: "Sure", to: "" },
            { text: "Absolutely", to: "" },
            { text: "By All Means", to: "hash_byallmeans" },
            { text: "Okey Dokey", to: "hash_okaydokey" },
            { text: "Alright", to: "hash_allright" },
            { text: "Of Course", to: "hash_ofcourse" },
            { text: "Definitely", to: "hash_definetly" },
            { text: "No thank!", to: "hash_no" }
        ],
        contributor: "Toshiyuki and Hunter"
    },
    hash_failtounderstand: {
        prompt: () => <div>
            <p>
                You try to understand what it means, but it's too hard to understand... You end up deciding that you should not eat this as it may be dangerous to your health.
            </p>
        </div>,
        options: [
            { text: "Find something else to eat.", to: "wakeup_breakfast", action: () => startedHashbrowns = true }
        ]
    },
    hash_okaydokey: {
        prompt: () => <div>
            <p>
                You say "Okey Dokey", like you dont know how to read words, but you can read letters. You need to go back to <span style={{color: "cornflowerblue"}}><CircleText string="Reading School" /></span>.
            </p>
        </div>,
        contributor: "Dave",
        ending: {
            id: "reading-school",
            name: "Forget How to Read Properly",
            description: "You half-forgot how to read so you went to reading school"
        }
    },
    hash_ofcourse: {
        prompt: () => <div>
            <p>
                Of course you can read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_definetly: {
        prompt: () => <div>
            <p>
                You definetly can read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_byallmeans: {
        prompt: () => <div>
            <p>
                By all means you read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_no: {
        prompt: () => <div>
            <p>You ate the brownie instead.</p>
        </div>,
        ending: {
            id: "ate-brownie",
            name: "Eated Unhealthy",
            description: "You ate a brownie."
        },
        contributor: "Hunter"
    },
    hash_allright: {
        prompt: () => <div>
            <p>You got your left arm and leg cut off trying to say alright. I guess you were <strong>ALL RIGHT</strong>. <em>ba dum tss...</em></p>
        </div>,
        ending: {
            id: "all-right",
            name: "All right.",
            description: "Looks like you are right handed... Let me take care of the left..."
        },
        contributor: "Hunter"
    }
});
