import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("jeopardyMoney", 0);

addScenes({
    jeopardy_pre: {
        prompt: () => <div>
            <p>Your application to play Jeopardy on LIVE national TV has been approved!</p>
        </div>,
        options: [
            { text: "Go there", to: "jeopardy_start" }
        ],
        contributor: "Hunter"
    },
    jeopardy_start: {
        prompt: () => <div>
            <p>You stand behind your podium as Alex Trebek names off the categories...</p>
            <p>Which do you go for first?</p>
        </div>,
        options: [],
        contributor: ""
    }
});
