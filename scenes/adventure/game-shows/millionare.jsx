import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addScenes({
    mill_start: {
        prompt: () => <div>
            <p>Do you want to be a millionaire?</p>
        </div>,
        options: [
            { text: "Yes", to: "mill_yes" },
            { text: "No", to: "mill_no" }
        ],
        contributor: "Dave"
    },
    mill_yes: {
        prompt: () => <div>
            <p>How shall you get a million dollars?</p>
        </div>,
        options: [
            // TODO: Do links.
            { text: "Pay bills", to: "" },
            { text: "Invest in Bitcoin", to: "" },
            { text: "Ask Bill Gates", to: "" }
        ],
        contributor: "Dave"
    },
    mill_no: {
        prompt: () => <div>
            <p>Oh... okay.</p>
        </div>,
        ending: {
            id: "no-million",
            name: "Not a Millionaire",
            description: "Who doesn't want a million dollars?"
        },
        contributor: "Dave"
    }
});
