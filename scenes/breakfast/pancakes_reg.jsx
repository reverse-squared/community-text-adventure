import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending";

addScenes({
    make_regular_pancakes: {
        prompt: () => <div>
            <p>You start making a pancake. What do you do with it.</p>
        </div> ,
        options: [
            { text: "Put syrup on it.", to: "regular_pancake_syrup" },
            { text: "Put butter on it.", to: "regular_pancake_butter" },
            { text: "Leave it as is.", to: "regular_pancake_leave" },
            { text: "Rent someone else's pancake.", to: "regular_pancake_rent" }
        ],
        contributor: "Toshiyuki"
    },
});
