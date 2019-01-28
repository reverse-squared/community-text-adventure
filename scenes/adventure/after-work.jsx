import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addScenes({
    dog_walk: {
        prompt: () => <div>
            <p>You want to take your nice little <strong>Pug</strong> for a walk, but WHOOPS, you don't have a <span style={{color: "#ffbaa3", fontWeight: "bold"}}>Leash</span>...</p>
            <p>Where do you go to buy a leash.</p>
        </div>,
        options: [
            { text: "The dark and not suspicious tunnel.", to: "dog_tunnel" },
            { text: "The pet store.", to: "dog_pet_store" },
        ],
        contributor: "Hunter"
    },
    dog_tunnel: {
        prompt: () => <div>
            <p>There's a rope hanging down from the ceiling that looks like a noose...<b>Do you take it to walk you dog?</b></p>
        </div>,
        options: [
            { text: "Yes", to: "dog_yes_walk" },
            { text: "No", to: "dog_die" },
        ],
        contributor: "Hunter"
    },
    dog_pet_store: {
        prompt: () => <div>
            <p>Looks like the Pet Store doesn't have a <span style={{color: "#ffbaa3", fontWeight: "bold"}}>Leash</span> either.</p>
        </div>,
        options: [
            { text: "Leave", to: "dog_die" }
        ],
        contributor: "Hunter"
    },
    dog_die: {
        prompt: () => <div>
            <p>Your little <strong>Pug</strong> got so impatient with you not taking it for a walk, and started to evolve to a big huge monster that tore you to shreads.</p>
        </div>,
        ending: {
            id: "dog-die",
            name: "Look! The Pug is Evolving!",
            description: "We all know the government has to do with this."
        },
        contributor: "Hunter"
    },
    dog_yes_walk: {
        prompt: () => <div>
            <p>You put the rope around the dog's neck and start walking it. It is very happy. You are happy. You all are happy!</p>
        </div>,
        ending: {
            id: "happy-family",
            name: "Happy Dog, Happy Life",
            description: "Wag wag wag wag wag wag wag wag wag wag."
        },
        contributor: "Hunter"
    },

    computer_start: {
        prompt: () => <div>
            <p>You have time to play only one game on your computer before you must leave. What game do you play?</p>
        </div>,
        options: [
            { text: "Play Half Life 3", to: "hl3" },
            { text: "Play Minecraft", to: "minecraft_start" },
            { text: "Play LEGO Sid Meier's Tom Clancy SUPER Fortnite V Modern of War Craft FIFA Remastered Metal Fallcry Special Edition", to: "" }
        ],
        contributor: "Hunter"
    },
    phone_start: {
        prompt: () => <div>
            <p>You have time to play only one game on your phone before you must leave. What game do you play?</p>
        </div>,
        options: [
            { text: "Candy Crush Saga", to: "" },
            { text: "Candy Crush Soda Saga", to: "" },
            { text: "Candy Crush Jelly Saga", to: "" },
            { text: "Candy Crush Friends Saga", to: "" },
            { text: "How About No", to: "" }
        ],
        contributor: "Hunter"
    }
});
