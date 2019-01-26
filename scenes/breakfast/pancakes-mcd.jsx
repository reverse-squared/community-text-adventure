import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { addScenes } from "@src/ending";

addFlag("mcDonaldsWaitTime", 0);

addScenes({
    make_mcd_pancakes: {
        prompt: () => <div>
            <p>You order your pancakes and they tell you to wait at table A4. You sit down waiting for your meal. What do you do now?</p>
        </div>,
        options: [
            { text: "Wait", to: "make_mcd_pancakes", action: () => mcDonaldsWaitTime++ },
            { text: "Give up and leave", to: "wakeup_breakfast" },
            { text: "Give up and go to The Pancake House", to: "pancake_house" }
        ],
        action: () => {
            if(mcDonaldsWaitTime > 15) {
                setScene("mcd_death");
            }

            startedPancakes = true;
        },
        contributor: "Hunter",
    },

    pancake_house: {
        prompt: () => <div>
            <p>You arrive at the pancake house after the bad service at McDonalds. You order your water and you realize that the ice cold glass of 
                water, turned out to be bleach. Now that you know you are going to die, what do you do?</p>
        </div>,
        options: [
            { text: "Sue", to: "" },
            { text: "Accept your death", to: "bleach_drink" },
            { text: "Tell your friend to try the water and see if it tastes fishy", to: "bleach_friend" },
        ],
        contributor: "Hunter"
    },
    bleach_drink: {
        prompt: () => <div>
            <p>You finally accept your death and die in the resturant. Nobody cares to call 911 either.</p>
        </div>,
        ending: {
            id: "drink-bleach",
            name: "Drinking Bleach",
            description: "All the Xbox kids told you to do it and you finally did."
        },
        contributor: "Hunter"
    },
    bleach_friend: {
        prompt: () => <div>
            <p>You hand the glass to your friend and he sips it. He said it tastes normal. When you start to die, he tells you he did a switch-a-roo and sipped
                his own when you weren't looking. What a failure.
            </p>
        </div>,
        ending: {
            id: "failed-prankster",
            name: "Failed Prank",
            description: "Inspired from all the prank YouTube channels, you thought it was easy and you tried it, and failed."
        },
        contributor: "Hunter"
    },

    mcd_death: {
        prompt: () => <div>
            <p>After a <strong><em>very long</em></strong> wait, you recieved your McDonald's pancakes and you eat them. Unfortunately, the pancakes 
            were loaded with sugar, and you just happen to be diabetic. It doesn't take a doctor to figure out what happens next.</p>
        </div>,
        contributor: "Alchemyking",
        ending: {
            id: "mcd-death",
            name: "Captain Novolin Was Right",
            description: "Now that's a lot of SUGAR!"
        }
    }
});
