import React from "react";
import { addScenes } from "../src/ending.jsx";
import { addFlag, setScene } from "web-text-adventure";

addFlag("coffeeDrank", 0);

addScenes({
    work_pre: {
        prompt: () => <div>
            <p>He explains to you that you haven't shown up to work yesterday which you were supposed to. Someone had to make up all the work you missed and missing something.</p>
        </div>,
        options: [
            { text: "Go to work.", to: "work_start" },
            { text: "Don't go to work.", to: "" }
        ],
        contributor: "Hunter"
    },  
    work_start: {
        prompt: () => <div>
            <p>You sit down at your desk, then realizing all the work you missed. <i>I better get started</i> you think. What do you do first.</p>
        </div>,
        options: [
            { text: "Fix the bug.", to: "" },
            { text: "Develop new feature.", to: "" },
            { text: "Go get some coffee.", to: "work_coffee", action: () => coffeeDrank++ }
        ],
        contributor: "Hunter"
    },
    work_coffee: {
        prompt: () => <div>
            <p>The coffee you drink is great. It's the best you ever had. Now what?</p>
        </div>,
        options: [
            { text: "Go back.", to: "work_start" },
            { text: "Drink more.", to: "work_coffee", action: () => coffeeDrank++ }
        ],
        action: () => {
            if(coffeeDrank > 10) {
                setScene("work_coffee_addict");
            }
        },
        contributor: "Hunter"
    },
    work_coffee_addict: {
        prompt: () => <div>
            <p>You drank so much coffee, your heart is now going 200 BPM. I'm pretty sure thats not healthy.</p>
        </div>,
        ending: {
            id: "coffee-addict",
            name: "Coffee Addict",
            description: "Drinking coffee got your heartrate well out of what's normal at a sitting positon."
        },
        contributor: "Hunter"
    }
});
