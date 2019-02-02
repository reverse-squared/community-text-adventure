import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes, achieveEnding } from "@src/ending";

addScenes({
    missingno: {
        prompt: () => <div>
            <p>
                While saying it, he thinks you are MissingNo. He catches you in a attempt to get items.
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
    missingno_yell: {
        prompt: () => <div>
            <p>
                He says it's not "Retard", its "Mentally Challenged"... He then proceeeds to yell AT you for using the wrong terminology in 2019.
            </p>
        </div>,
        ending: {
            id: "wrong-word",
            name: "It's 2019 Get it Right",
            description: "You can't be saying those words these days.",
        },
        contributor: "Hunter"
    },
    missingno_getout: {
        prompt: () => <div>
            <p>
                You got out of the pokeball, the guy notices and throws another pokeball, it traps you back inside.
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout2" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Dave"
    },
    missingno_getout2: {
        prompt: () => <div>
            <p>
                You got out of the pokeball, the guy notices and throws another pokeball, MissingNo was caught!
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout3" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Dave"
    },
    missingno_getout3: {
        prompt: () => <div>
            <p>
                You got out of the pokeball, the guy notices and throws another pokeball, and you get trapped!
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout4" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Dave"
    },
    missingno_getout4: {
        prompt: () => <div>
            <p>
                Oh no he's out of balls. You escape.
            </p>
        </div>,
        ending: {
            id: "missingno-outofballs",
            name: "Ran out of Balls",
            description: "lmao he has no balls.",
        },
        contributor: "Dave"
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
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Suicide", to: "missingno_suicide" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
            { text: "Do nothing", to: "missingno_nothing" },
        ],
        contributor: "Durvenson"
    },
    missingno_suicide: {
        prompt: () => <div>
            <p>
                <span style={{ color: "lime" }}>dev: im done adding suicide endings. chooose something else</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
            { text: "Do nothing", to: "missingno_nothing2" },
        ],
        contributor: "Dave"
    },
    missingno_suicide2: {
        prompt: () => <div>
            <p>
                <span style={{ color: "lime" }}>dev: im done adding suicide endings. chooose something else</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
        ],
        contributor: "Dave"
    },
    missingno_pretendvirus: {
        prompt: () => <div>
            <p>
                You pretend it's a virus, but since it actually is, you die.
            </p>
        </div>,
        ending: {
            id: "virusend",
            name: "Virus",
            description: "Don't pretend it's a virus when it actually is.",
        },
        contributor: "Dave"
    },
    missingno_nothing: {
        prompt: () => <div>
            <p>
                <span style={{ color: "gray" }}>.......</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
            { text: "Suicide", to: "missingno_suicide2" },
        ],
        contributor: "Dave"
    },
    missingno_nothing2: {
        prompt: () => <div>
            <p>
                <span style={{ color: "gray" }}>....</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
        ],
        contributor: "Dave"
    },
    missingno_look: {
        prompt: () => <div>
            <p>
                Noice! You found a computer!
            </p>
        </div>,
        options: [
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Search on Google", to: "missingno_search" },
        ],
        contributor: "Durvenson"
    },
    missingno_search: {
        prompt: () => <div>
            <p>
                You search...
            </p>
        </div>,
        options: [
            { text: "how to escape a pokeball", to: "google_poke" },
            { text: "how to use google", to: "google_goolge" },
            { text: "how to make people not think that you are missingno", to: "google_missingno" },
            { text: "how to watch pornhub without anyone knowing", to: "google_pornhub" },
        ],
        contributor: "Durvenson"
    },
    google_poke: {
        prompt: () => <div>
            <p>
                It says you press the button to open a pokeball, but that only works when you're on the outside.
            </p>
        </div>,
        options: [
            { text: "how to escape a pokeball", to: null, if: () => false, disabledText: true },
            { text: "how to use google", to: "google_goolge" },
            { text: "how to make people not think that you are missingno", to: "google_missingno" },
            { text: "how to watch pornhub without anyone knowing", to: "google_pornhub" },
        ],
        contributor: "Durvenson"
    },
    google_goolge: {
        prompt: () => <div>
            <p>
                Someone catches you doing that and sends you to Preschool.
            </p>
        </div>,
        ending: {
            id: "googlprescofadsosdalkdsfafhsd",
            name: "Failed at Googling shit",
            description: "How the heck do you not know how to use google?",
        },
        contributor: "Durvenson"
    },
    google_missingno: {
        prompt: () => <div>
            <p>
                Somehow, the "missingno" made Google break. It sent you some random stuff. What do you click?
            </p>
        </div>,
        options: [
            { text: "bee movie meme xd", to: "meme_bee_end" },
            { text: "Potato", to: "gsearch_potato" },
            { text: "Community Text Adventure", to: "gsearch_cta" },
            { text: "Cary Teaches You How To Time Travel", to: "gsearch_timetravel" },
        ],
        contributor: "Durvenson"
    },
    gsearch_cta: {
        prompt: () => <div>
            <p>
                Your search ends up <a href="#" onClick={() => {
                    achieveEnding("recursion");
                    location.reload();
                }}>Here</a>.
            </p>
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        contributor: "Dave",
    },
    gsearch_cta_ending: {
        prompt: () => <div />,
        options: [],
        noContributor: true,
        excludeEmptyOptionsCheck: true,

        ending: {
            id: "recursion",
            name: "Recursion",
            description: "Go to CTA from CTA via a Google Search.",
        },
    },
    google_pornhub: {
        prompt: () => <div>
            <p>
                SafeSearch™™™™™™™™™™™™™™™™™™™™™™™™™™™ blocked that search.
            </p>
        </div>,
        ending: {
            id: "safe-search",
            name: "SafeSearch™",
            description: "Get blocked™ by™ (Safe™Search™)™.",
        }
    },
    gsearch_potato: {
        prompt: () => <div>
            <p>
                TODO: Potato Search
            </p>
        </div>,
        options: [

        ],
        contributor: null,
    },
    missingno_deletepokedex: {
        prompt: () => <div>
            <h3>Are you sure you want to permanently delete "missingno.pkdx"?</h3>
            <p>
                If you delete an item, it will be permanetly lost.
            </p>
        </div>,
        options: [
            { text: "Cancel", to: "delete_pokedex_dont" },
            { text: "Delete", to: "delete_pokedex" },
        ],
        contributor: "Dave"
    },
    delete_pokedex: {
        prompt: () => <div>
            <p>
                You delete the pokedex entry, then the game crashes...
            </p>
        </div>,
        ending: {
            id: "pokedex-delete",
            name: "Crashed Pokemon...",
            description: "Don't delete important files!",
        },
        contributor: "Dave"
    },
    delete_pokedex_dont: {
        prompt: () => <div>
            <p>
                You dont delete the pokedex entry, yay!
            </p>
        </div>,
        ending: {
            id: "pokedex-delete-dnont",
            name: "dOn't Delete mY stUFF",
            description: "Cancel deleting the missingno pokedex entry.",
        },
        contributor: "Dave"
    }
});
