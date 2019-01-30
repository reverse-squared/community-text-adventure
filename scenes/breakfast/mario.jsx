import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("bettedKart", "");
addFlag("kartPlace", 0);

const KartHeader = () => {
    if(kartPlace === 1) {
        return <div>
            <p style={{color: "#e5ff00"}}>You Are 1st Place</p>
        </div>;
    }else if(kartPlace === 2) {
        return <div>
            <p style={{color: "#dddddd"}}>You Are 2nd Place</p>
        </div>;
    }else if(kartPlace === 3) {
        return <div>
            <p style={{color: "#d39a30"}}>You Are 3rd Place</p>
        </div>;
    }else {
        return <div>
            <p>You Are {kartPlace}th Place</p>
        </div>;
    }
};

addScenes({
    hash_potatokart: {
        prompt: <div>
            <p>You make some tiny, somehow fully functional racekarts out of potatos (don't question it) and put them at the start of the track. Which kart do you bet on?</p>
        </div>,
        options: [
            { text: "The reddish one", to: "hash_potatokart_bet", action: () => bettedKart = "The reddish one" },
            { text: "The yellow one", to: "hash_potatokart_bet", action: () => bettedKart = "The yellow one" },
            { text: "The brown one", to: "hash_potatokart_bet", action: () => bettedKart = "The brown one" },
            { text: "The one with a tiny stalk in it", to: "hash_potatokart_bet", action: () => bettedKart = "The one with a tiny stalk in it" },
            { text: "Your kart", to: "hash_potatokart_bet", action: () => bettedKart = "Your kart" }
        ],
        contributor: "Neema and Durvenson"
    },
    hash_potatokart_bet: {
        prompt: () => <div>
            <p>You placed your bet!</p>
            <h1>3...</h1>
        </div>,
        options: [
            { text: "Press it", to: "" },
            { text: "not yet", to: "hash_potatokart_bet_2" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_bet_2: {
        prompt: () => <div>
            <p>You placed your bet!</p>
            <h1>2...</h1>
        </div>,
        options: [
            { text: "Press it", to: "" },
            { text: "not yet", to: "hash_potatokart_bet_1" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_bet_1: {
        prompt: () => <div>
            <p>You placed your bet!</p>
            <h1>1...</h1>
        </div>,
        options: [
            { text: "Press it", to: "hash_potatokart_press1" },
            { text: "not yet", to: "hash_potatokart_bet_1" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_press1: {
        prompt: () => <div>
            <KartHeader />
            <p>You are going super fast! You are in first place!</p>
        </div>,
        action: () => kartPlace = 1,
        options: [
            { text: "Go further", to: "hash_potatokart_further" },
            { text: "Nah", to: "" },
            { text: "Backwards", to: "" },
            { text: "Disconnect", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_further: {
        prompt: () => <div>
            <KartHeader />
            <p>You got hit by a <span color={{color: "#3549ff"}}>Blue Shell</span>! You are now in <span style={{color: "#d39a30"}}>3rd place</span>!</p>
        </div>,
        action: () => kartPlace = 3,
        options: [
            { text: "Go further", to: "" },
            { text: "Say F R I C C", to: "hash_potatokart_fricc" },
            { text: "N O", to: "" },
            { text: "Backwards", to: "" },
            { text: "Disconnect", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_fricc: {
        prompt: () => <div>
            <p>It turns out that this is a christian race. You get kicked into a painting, and you are in Bomb Omb Battlefield.</p>
        </div>,
        options: [
            { text: "Say FRICK again", to: "" },
            { text: "Speak to the bomb dudes", to: "" },
            { text: "Go forward", to: "" },
            { text: "Try to do a BLJ", to: "hash_potatokart_blj" },
            { text: "Leave the level", to: "" },
            { text: "Stand there", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj: {
        prompt: () => <div>
            <p>You find a parallel universe.</p>
        </div>,
        options: [
            { text: "Go forward", to: "hash_potatokart_blj_forward" },
            { text: "BLJ Again", to: "" },
            { text: "Leave the level", to: "hash_potatokart_blj_leave" },
            { text: "Stand there", to: "" },
            { text: "Move forward", to: "" },
            { text: "Upload your \"discovery\" to Youtube", to: "hash_potatokart_blj_upload" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_upload: {
        prompt: () => <div>
            <p>Turns out that you had 2 copyright strikes, and <a href="https://www.youtube.com/channel/UCMm211NGh4Ls5SAMZJF7E8A" target="_blank">pannenkoek2012</a> took down your video due to copyright infringment.</p>
        </div>,
        ending: {
            id: "pannenkoek2012-strike",
            name: "Copyrighted",
            description: "Be careful about what you upload..."
        },
        contributor: "Durvenson"
    },
    hash_potatokart_blj_forward: {
        prompt: () => <div>
            <p>You get suddenly a message from TJ Henry Yoshi, which says "A A press is a A press. You can't say it's half" because he thought you were pannenkoek2012.</p>
        </div>,
        options: [
            { text: "Ignore it", to: "" },
            { text: "I am not pannenkoek2012", to: "" },
            { text: "That is not true", to: "" },
            { text: "LIAR! GO KYS", to: "" },
            { text: "Fight him", to: "" },
            { text: "Leave the level", to: "hash_potatokart_blj_forward_leave" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_forward_leave: {
        prompt: () => <div>
            <p>Your game crashed, which means you died.</p>
        </div>,
        ending: {
            id: "game-crash",
            name: "Game Crash",
            description: "Video games can be deadly sometimes."
        },
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave: {
        prompt: () => <div>
            <p>You are in the castle. Which room do you go to?</p>
        </div>,
        options: [
            { text: "Bob omb battlefield", to: "" },
            { text: "Cool, cool mountain", to: "" },
            { text: "Jolly roger bay", to: "" },
            { text: "Whomp's fortress", to: "" },
            { text: "Bowser in the dark world", to: "" },
            { text: "Secret level", to: "" },
            { text: "Upper floor", to: "" },
            { text: "Basement", to: "" },
            { text: "Outside", to: "hash_potatokart_blj_leave_outside" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside: {
        prompt: () => <div>
            <p>You are now outside of the castle.</p>
        </div>,
        options: [
            { text: "Go back in the castle", to: "" },
            { text: "Try to get in the moat while the water level is still high", to: "" },
            { text: "Yolo to get to the roof", to: "hash_potatokart_blj_leave_outside_yolo" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo: {
        prompt: () => <div>
            <p>You yoloed to get to the roof. Do you take the 1-ups?</p>
        </div>,
        options: [
            { text: "Yes", to: "hash_potatokart_blj_leave_outside_yolo_yes" },
            { text: "Maybe", to: "" },
            { text: "Some of them", to: "hash_potatokart_blj_leave_outside_yolo_some" },
            { text: "I guess", to: "" },
            { text: "A little bit of them", to: "" },
            { text: "No", to: "" },
            { text: "Nope", to: "" },
            { text: "Never", to: "" },
            { text: "WHY", to: "" },
            { text: "It's time to stop", to: "" },
            { text: "GET OUT OF MY SWAMP", to: "" },
            { text: "These are supicious", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo_yes: {
        prompt: () => <div>
            <p>Actually, you find out that they are cocaine after eating one. Will you smoke the rest?</p>
        </div>,
        options: [
            { text: "Yes", to: "" },
            { text: "Maybe", to: "" },
            { text: "Some of them", to: "" },
            { text: "I guess", to: "" },
            { text: "A little bit of them", to: "" },
            { text: "No", to: "" },
            { text: "Nope", to: "" },
            { text: "Never", to: "" },
            { text: "WHY", to: "" },
            { text: "It's time to stop", to: "" },
            { text: "I DON'T WANT THE FBI TO BE HERE", to: "" },
            { text: "This is dumb", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo_some: {
        prompt: () => <div>
            <p>You decide to split them in half. You still realize that it is cocaine, but it isn't as bad, and you don't eat it. Instead, you try to escape.</p>
        </div>,
        options: [
            { text: "To the \"hills\"", to: "" },
            { text: "On a tree", to: "" },
            { text: "On a \"wall\" of the castle", to: "hash_potatokart_blj_leave_outside_yolo_some_wall" },
            { text: "In the castle", to: "" },
            { text: "Underwater", to: "" },
            { text: "Do nothing", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo_some_wall: {
        prompt: () => <div>
            <p>You fall into an area.</p>
        </div>,
        options: [
            { text: "Try and get out", to: "hash_potatokart_blj_leave_outside_yolo_some_wall_try" },
            { text: "Go through the door", to: "hash_potatokart_blj_leave_outside_yolo_some_wall_door" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo_some_wall_try: {
        prompt: () => <div>
            <p>You are stuck inside.</p>
        </div>,
        options: [
            { text: "BREAK THE WALL", to: "hash_potatokart_blj_leave_outside_yolo_some_wall_try_break" },
            { text: "Go through the door", to: "hash_potatokart_blj_leave_outside_yolo_some_wall_door" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo_some_wall_try_break: {
        prompt: () => <div>
            <p>You injured yourself so bad that you lost an arm.</p>
        </div>,
        ending: {
            id: "break-arm-wall",
            name: "The Least You Need to be a Amputee",
            description: "Don't break walls!"
        },
        contributor: "Durvenson"
    },
    hash_potatokart_blj_leave_outside_yolo_some_wall_door: {
        prompt: () => <div>
            <p>You get into another area.</p>
        </div>,
        options: [
            // TODO: VVV Goes to castle.
            { text: "Go into a wall", to: "" },
            { text: "Go through the door", to: "hash_potatokart_blj_leave_outside_yolo_some_wall" },
            { text: "Wall jump out", to: "hash_potatokart_blj_leave_outside_yolo_some_wall_try_break" }
        ],
        contributor: "Durvenson"
    }
});
