import React from "react";
import { addFlag } from "web-text-adventure";
import { addScenes } from "@src/ending";

addFlag("topping", "");

addScenes({
    make_regular_pancakes: {
        prompt: () => <div>
            <p>You start making a pancake. What do you do with it.</p>
        </div> ,
        options: [
            { text: "Put syrup on it", to: "regular_pancake_eat", action: () => topping = "Syrup" },
            { text: "Put butter on it", to: "regular_pancake_eat", action: () => topping = "Butter" },
            { text: "Leave it as is", to: "regular_pancake_leave" },
            { text: "Rent someone else's pancake", to: "regular_pancake_rent" }
        ],
        contributor: "Toshiyuki"
    },

    regular_pancake_eat: {
        prompt: () => <div>
            <p>You put the nice {topping} on it. You eat the pancake and feel nice to go on with your day, what do you do?</p>
        </div>,
        options: [
            // TODO: Options for regular_pancake_eat.
        ],
        contributor: "Hunter"
    },
    regular_pancake_leave: {
        prompt: () => <div>
            <p>You leave the pancake as is, and eat it. All of a sudden, you start to choke on it. Turns out the pancake was super dry. Should of put some toppings
                on it.
            </p>
        </div>,
        ending: {
            id: "pancake-choke",
            name: "Dry Food",
            description: "Choking on dry food isn't good for your health™."
        },
        contributor: "Hunter"
    },
    regular_pancake_rent: {
        prompt: () => <div>
            <p>You decide to ask your neighbors for their pancakes. They turn out to be really nice and let you have THE ENTIRE STOCK. Looks like you made
                a friend.
            </p>
        </div>,
        ending: {
            id: "good-neighbors",
            name: "Nice Neighbors",
            description: "They let you have their food for FREE."
        },
        contributor: "Hunter"
    }
});
