import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "../../src/js/ending.jsx";
import { Color } from "../../templates/font-styles.jsx";

addScenes({
    make_waffles: {
        prompt: () => <div>
            <p>
                You start making the waffles, but you dont have any <Color color="orange">Waffle Mix</Color> so you decide to go to the Grocery Store.
            </p>
            <p>
                The grocery store has new Waffle brands: <Color color="lime">Lucky Charms</Color> and <Color color="cornflowerblue">Frosted Flakes</Color>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_charms" },
            { text: "Frosted Flakes", to: "" },
            { text: "Leave, and go to The Waffle House", to: "waffle_house" }
        ],
        contributor: "Dave",
    },
    waffles_charms: {
        prompt: () => <div>
            <p>
                Right as you start grabbing the Lucky Charms waffle mix, Frosted Flakes decides to place out an advertisement on the new Frosted Waffles that they have with 30% less fat and 24% more frosting. <strong>Are you sure you want the Lucky Charms.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_charms2" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms1" },
        ],
        contributor: "Dave",
    },
    waffles_charms2: {
        prompt: () => <div>
            <p>
                Frosted Flakes has a new advertisement on the unluckiness of Lucky Charms, and how it curses you with infinite unluck. <strong>Are you sure you want the Lucky Charms.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_start_making_lc" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms1" },
        ],
        contributor: "Dave",
    },
    waffles_frosted_from_charms1: {
        prompt: () => <div>
            <p>
                You decide to change to Frosted Flakes, but then another advertisement appears about the Health Risks of the Frosting that Frosted Flakes uses. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_charms_from_frosted1" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms2" },
        ],
        contributor: "Dave",
    },
    waffles_frosted_from_charms2: {
        prompt: () => <div>
            <p>
                The CEO of Google emails you about how the world is going to die if you choose the Frosted Flakes. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_final_choice" },
            { text: "Frosted Flakes", to: "waffles_final_choice" },
        ],
    },
    waffles_final_choice: {
        prompt: () => <div>
            <p>
                Final Choice:
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_start_making_lc" },
            { text: "Frosted Flakes", to: "waffles_start_making_f" },
        ],
    },

    waffles_start_making_lc: {
        prompt: () => <div>
            <p>
                You start making the Lucky Charms Waffles...
            </p>
        </div>,
        options: [
            { text: "Wait for it to finish.", to: "" },
            { text: "Just eat it raw.", to: "waffles_raw_ending" },
            { text: "Make something else for breakfast", to: "" },
        ],
        contributor: "Dave",
    },
    waffles_start_making_f: {
        prompt: () => <div>
            <p>
                You start making the Frosted Flakes Waffles...
            </p>
        </div>,
        options: [
            { text: "Wait for it to finish.", to: "" },
            { text: "Just eat it raw.", to: "waffles_raw_ending" },
            { text: "Make something else for breakfast", to: "" },
        ],
        contributor: "Dave",
    },

    waffles_raw_ending: {
        prompt: () => <div>
            <p>
                After eating the waffles raw you get suicidal (since the waffles contain ketchup). You die and go to Heck.
            </p>
        </div>,
        ending: {
            id: "raw-waffles",
            name: "Going to Heck",
            description: "You feel Suicidal after eating the waffles raw and you die and go to Heck."
        },
        contributor: "Colyderp"
    },
    waffle_house: {
        prompt: () => <div>
            <p>You realize that the ice cold glass of water, turned out to be bleach. Now that you know you are going to die, what do you do?</p>
        </div>,
        options: [
            { text: "Sue.", to: "" },
            { text: "Accept your death.", to: "drink_bleach" },
            { text: "Tell your friend to try the water and see if it tastes fishy.", to: "" },
        ],
        contributor: "Hunter"
    },
    drink_bleach: {
        prompt: () => <div>
            <p>You finally accept your death and die in the resturant. Nobody cares to call 911 either.</p>
        </div>,
        ending: {
            id: "drink-bleach",
            name: "Drinking Bleach",
            description: "All the Xbox kids told you to do it and you finally did."
        },
        contributor: "Hunter"
    }
});
