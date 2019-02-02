import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes, achieveEnding } from "@src/ending";

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
        ]
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
        ]
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
        ]
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
                SafeSearch™™™™™™™™™™™™™™™™™™™™™™™™™™™ blocked that search
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
    }
});
