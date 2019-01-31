import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("__rerender");
addFlag("topping", "");
addFlag("pizzatoppings", []);

const pizzaTopping = (id) => ({
    text: "add " + id,
    to: null,
    if: () => !pizzatoppings.includes(id),
    action: () => {
        pizzatoppings.push(id);
        if(pizzatoppings.length >= 5) {
            setScene("pineapple_on_pancakes_ending");
        }
        __rerender = undefined;
    },
    disabledText: true
});

addScenes({
    // #region Regular Pancakes
    make_regular_pancakes: {
        prompt: () => <div>
            <p>You start making a pancake. What do you do with it.</p>
        </div> ,
        options: [
            { text: "Put syrup on it", to: "regular_pancake_eat", action: () => topping = "Syrup" },
            { text: "Put butter on it", to: "regular_pancake_eat", action: () => topping = "Butter" },
            { text: "Put pineapple on it", to: "regular_pancake_pineapple" },
            { text: "Leave it as is", to: "regular_pancake_leave" },
            { text: "Rent someone else's pancake", to: "regular_pancake_rent" },
        ],
        contributor: "Toshiyuki"
    },
    regular_pancake_pineapple: {
        prompt: () => <div>
            <p>
                You put the pineapple on the pancake... At least it's not a pizza!
            </p>
        </div>,
        options: [
            pizzaTopping("some cheese"),
            pizzaTopping("some pepperoni"),
            pizzaTopping("some mayo"),
            pizzaTopping("some bacon"),
            pizzaTopping("whatever else goes on a pizza"),
        ],
        contributor: "Helvetica"
    },
    regular_pancake_eat: {
        prompt: () => <div>
            <p>You put the nice {topping} on it. You eat the pancake and feel nice to go on with your day, what do you do?</p>
        </div>,
        options: [
            { text: "Go outstide", to: "wakeup_outside" },
            { text: "Go skydiving", to: "skydive_pre" },
            { text: "Play some Elemental 4", to: "elemental4" },
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
    },
    pineapple_on_pancakes_ending: {
        prompt: () => <div>
            <p>
                You've created a pineapple pizza, but it's a pancake. Is this really what you wanted?
            </p>
        </div>,
        ending: {
            id: "pineapple-pancakes",
            name: "Pineapple on Pancakes",
            description: "Construct a pancake that is actaully a pizza..."
        },
        contributor: "Helvetica"
    }
    // #endregion
});
