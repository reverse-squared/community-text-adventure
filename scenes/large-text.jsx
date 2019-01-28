import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import BeeMovie from "../res/bee-movie.txt";

addScenes({
    meme_alexa2_000: {
        prompt: () => <div>
            <p>
                <b>Alexa</b>: One Quintillion to the Power of One Quintillion is <span style={{ wordWrap: "break-word" }}>1{"0".repeat(15400)}</span>
            </p>
        </div>,
        ending: {
            id: "000",
            name: "000000000",
            description: "0000000000000000000000000000000000000"
        },
        contributor: "Hunter"
    },
    meme_bee: {
        prompt: () => <div>
            <style>{"::-webkit-scrollbar{display:none}"}</style>
            <pre
                style={{ fontFamily: "inherit" }}
            >{ BeeMovie }</pre>
        </div>,
        options: [
            { text: "DO IT AGAIN!", to: "meme_bee", action: () => scriptsRead++ },
            { text: "no dont...", to: "meme_bee_dont" }
        ],
        action: () => {
            if(scriptsRead > 5) {
                setScene("bee_lover");
            }
        },
        contributor: "Hunter"
    },
});
