import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addScenes({
    elemental4: {
        prompt: () => <div>
            <p>
                What element do you want to make?
            </p>
        </div>,
        options: [
            { text: "It's time to stop", to: "elem_tts" },
            { text: "1000000000x Earth's Water", to: "elem_water" },
            { text: "somebody once told me", to: "elem_shrak" },
            { text: "OwO", to: "elem_owo" }
        ],
        contributor: "Alchemyking"
    },
    elem_tts: {
        prompt: () => <div>
            <p>
                You are now stuck in place for all eternity. You’re not dead, but this is still the end.
            </p>
        </div>,
        ending: {
            id: "stop-motion",
            name: "Slow Motion",
            description: "Sssssssssssssooooooooooooooooooo sssssssssssllllllllllooooooooowwwwwwwww......."
        },
        contributor: "Alchemyking"
    },
    elem_water: {
        prompt: () => <div>
            <p>
                Suddenly, you explode into a bunch of water and flood the whole world. Nice going jackass.
            </p>
        </div>,
        ending: {
            id: "elem-water-wahtevr",
            name: "Drowned The Earth",
            description: "You bastard!"
        },
        contributor: "Alchemyking"
    },
    elem_shrak: {
        prompt: () => <div>
            <p>
                Suddenly, Shrek appears out of your monitor and drags you to his swamp, where he does unspeakable things to you.
            </p>
        </div>,
        ending: {
            id: "elem-shreak",
            name: "Shrek Is Love, Shrek Is Life",
            description: "I was only nine years old. I loved Shrek so much, I had all the merchandise and movies. I'd pray to Shrek every night before I go to bed, thanking for the life I've been given. \"Shrek is love\", I would say, \"Shrek is life\"."
        },
        contributor: "Alchemyking"
    },
    elem_owo: {
        prompt: () => <div>
            <p>You said OwO which automatically makes you a furry. Nobody likes furries. Turns out it is hunting season for furries and you just got shot. RIP</p>
        </div>,
        ending: {
            id: "furry-hunting",
            name: "Make Furry Hunting Legal Again",
            description: "That's kinda neat."
        }
    }
});
