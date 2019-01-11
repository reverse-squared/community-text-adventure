import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "../../src/js/ending.jsx";

addScenes({
    make_waffles: {
        prompt: () => <div>
            <p>
                You start making the waffles, but you dont have any <span style={{ color: "orange" }}>Waffle Mix</span> so you decide to go to the Grocery Store.
            </p>
            <p>
                The grocery store has two brands: Hungry Jack and Bisquick. Which do you buy?
            </p>
        </div>,
        options: [
            { text: "Hungry Jack", to: "" },
            { text: "Bisquick", to: "" },
            { text: "Don't buy anything and instead go to the Pancake House", to: "pancake_house" },
        ]
    },
});
