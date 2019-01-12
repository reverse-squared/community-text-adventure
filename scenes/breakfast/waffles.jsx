import React from "react";
import SceneLink from "@templates/SceneLink";
import { addScenes } from "@src/ending";
import { Color } from "@templates/FontStyles";

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
            { text: "Frosted Flakes", to: "waffles_frosted" },
        ],
        action: () => startedWaffles = true,
        contributor: "Dave",
    },
    // #region debate over which one
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
    waffles_frosted: {
        prompt: () => <div>
            <p>
                Right as you start grabbing the Frosted Flakes waffle mix, Lucky Charms decides to place out an advertisement on the new Lucky Waffles that they have with 50% less fat and 60% more luck. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_frosted2" },
            { text: "Frosted Flakes", to: "waffles_charms_from_frosted1" },
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
    waffles_frosted2: {
        prompt: () => <div>
            <p>
                Right as you start grabbing the Frosted Flakes waffle mix, Lucky Charms decides to place out an advertisement on the new Lucky Waffles that they have with 50% less fat and 60% more luck. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_start_making_f" },
            { text: "Frosted Flakes", to: "waffles_charms_from_frosted1" },
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
            { text: "Lucky Charms", to: "waffles_charms_from_frosted2" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms2" },
        ],
        contributor: "Dave",
    },
    waffles_frosted_from_charms2: {
        prompt: () => <div>
            <p>
                You decide to change to Frosted Flakes, but then another advertisement appears about the Expensive Price that Frosted Flakes has. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_charms_from_frosted3" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms3" },
        ],
        contributor: "Dave",
    },
    waffles_frosted_from_charms3: {
        prompt: () => <div>
            <p>
                The CEO of Google emails you about how the world is going to die if you choose the Frosted Flakes. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_final_choice" },
            { text: "Frosted Flakes", to: "waffles_final_choice" },
        ],
        contributor: "Dave",
    },
    waffles_charms_from_frosted1: {
        prompt: () => <div>
            <p>
                You switch to Lucky Charms, but then you get a advertisement about. <strong>Are you sure you want the Frosted Flakes.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_charms_from_frosted2" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms2" },
        ],
        contributor: "Dave",
    },
    waffles_charms_from_frosted2: {
        prompt: () => <div>
            <p>
                You decide to change to Lucky Charms, but then they advertise the buy one get 50 free sale that Frosted Flakes are doing. <strong>Are you sure you want the Lucky Charms.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_charms_from_frosted3" },
            { text: "Frosted Flakes", to: "waffles_frosted_from_charms3" },
        ],
        contributor: "Dave",
    },
    waffles_charms_from_frosted3: {
        prompt: () => <div>
            <p>
                The CEO of Google emails you about how the world is going to die if you choose the Lucky Charms. <strong>Are you sure you want the Lucky Charms.</strong>
            </p>
        </div>,
        options: [
            { text: "Lucky Charms", to: "waffles_final_choice" },
            { text: "Frosted Flakes", to: "waffles_final_choice" },
        ],
        contributor: "Dave",
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
        contributor: "Dave",
    },
    // #endregion

    // starting
    waffles_start_making_lc: {
        prompt: () => <div>
            <p>
                You start making the Lucky Charms Waffles...
            </p>
        </div>,
        options: [
            { text: "Wait for it to finish.", to: "waffles_wait" },
            { text: "Just eat it raw.", to: "waffles_raw_ending" },
            { text: "Make something else for breakfast", to: "wakeup_breakfast" },
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
            { text: "Wait for it to finish.", to: "waffles_wait" },
            { text: "Just eat it raw.", to: "waffles_raw_ending" },
            { text: "Make something else for breakfast", to: "wakeup_breakfast" },
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

    // not sure what this will do
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
    },
    // ^ hunter do something

    waffles_wait: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink to="waffles_wait1">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait1: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    transform: "translateY(1px)",
                }} to="waffles_wait2">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait2: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    transform: "translateY(3px)",
                }} to="waffles_wait3">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait3: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    transform: "translateY(9px)",
                }} to="waffles_wait4">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait4: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    transform: "translateY(120px)",
                }} to="waffles_wait5">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait5: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    transform: "translateY(100px) translateX(60px)",
                }} to="waffles_wait6">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait6: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-100px",
                    right: "500px",
                }} to="waffles_wait7">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait7: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    transform: "translateX(60px) rotate(232deg)"
                }} to="waffles_wait8">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait8: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    transform: "translateX(80px) translateY(180px) rotate(42deg) scale(3)"
                }} to="waffles_wait9">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait9: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    transform: "translateX(-20px) translateY(240px) rotate(90deg) scale(0.5)"
                }} to="waffles_wait10">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait10: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    transform: "translateX(-200px) translateY(240px) rotate(-20deg) scale(40)"
                }} to="waffles_wait11">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait11: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    color: "black",
                    transform: "translateX(-2px) translateY(60px) rotate(23deg) scale(1.1)"
                }} to="waffles_wait12">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait12: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    color: "black",
                    transform: "translateX(54px) translateY(72px) rotate(101deg) scale(0.8)"
                }} to="waffles_wait13">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait13: {
        prompt: () => <div style={{position: "relative"}}>
            <p>
                You <span style={{visibility: "hidden"}}>Wait</span> for the waffles to cook...
            </p>
            <SceneLink style={{
                display: "block",
                position: "absolute",
                color: "white",
                top: "0px",
                left: "34.9px"
            }} to="waffles_wait14">Wait</SceneLink>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait14: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    transform: "translateX(300px) translateY(20px) rotate(30deg) scale(4)"
                }} to="waffles_wait15">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait15: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook...
            </p>
            <ul>
                <SceneLink style={{
                    display: "block",
                    position: "absolute",
                    transform: "translateX(200px) translateY(220px) rotate(-46deg) scale(4)"
                }} to="waffles_wait_done">Wait</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    waffles_wait_done: {
        prompt: () => <div>
            <p>
                You Wait for the waffles to cook... and they are done now!
            </p>
        </div>,
        options: [
            { text: "Eat them", to: "eat_waffle_ending"},
            { text: "Throw them away", to: "throw_away_waffle"},
        ],
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    },
    throw_away_waffle: {
        prompt: () => <div>
            <p>
                Without tasting the waffle, you throw it away, and a homeless person goes off with it. Well, you still need breakfast so you should start doing that.
            </p>
        </div>,
        options: [
            {text: "Make Breakfast", to: "wakeup_breakfast"}
        ],
        contributor: "Colyderp",
        excludeEmptyOptionsCheck: true,
    },
    eat_waffle_ending: {
        prompt: () => <div>
            <p>
                You have created the best waffle there has ever been, and won the award winning prize for best waffle, but because you ate the waffle it doesn't count. Close Enough.
            </p>
        </div>,
        ending: {
            id: "waffle",
            name: "Close Enough to Award Winning",
            description: "Create a award winning waffle, but have it be disqualified due to it being eaten."
        },
        contributor: "Dave",
        excludeEmptyOptionsCheck: true,
    }
});
