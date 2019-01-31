import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import neverGiveUp from "@res/nggyu.txt";

addFlag("bettedKart", "");
addFlag("kartPlace", 0);
addFlag("__rerender", undefined);

const KartHeader = () => {
    return <p>
        You are in <Place place={kartPlace}/>.
    </p>;
};
const Place = (props) => {
    const place = Number(props.place);
    if (place === 1) {
        return <span style={{color: "#e5ff00"}}>1st Place</span>;
    } else if (place === 2) {
        return <span style={{color: "#dddddd"}}>2nd Place</span>;
    } else if (place === 3) {
        return <span style={{color: "#d39a30"}}>3rd Place</span>;
    }else {
        return <span>You Are {place}th Place</span>;
    }
};
const BlueShell = () => <span color={{ color: "#3549ff" }}>Blue Shell</span>;

addFlag("garbage_pail", []);
const throwAway = (item) => {
    garbage_pail.push(item);
    if(
        garbage_pail[0] === "Wallet"
        && garbage_pail[1] === "Phone"
        && garbage_pail[2] === "Keys"
        && garbage_pail[3] === "Shoes"
        && garbage_pail[4] === "Instrument that you play"    
    ) {
        setScene("bill_wurtz");
    }
    if (garbage_pail.length >= 14) {
        setScene("");
    }
    __rerender = undefined;
};
const throwAwayThe = (item) => ((item === "The Universe") ? (
    {
        text: "Throw away your " + item,
        if: () => garbage_pail.length >= 13,
        to: "threw_it_all_away",
    }
) : (
    {
        text: "Throw away your " + item,
        to: null,
        if: () => !garbage_pail.includes(item),
        disabledText: true,
        action: () => throwAway(item),
    }
));

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
            { text: "Not yet", to: "hash_potatokart_bet_2" }
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
            { text: "Not yet", to: "hash_potatokart_bet_1" }
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
            { text: "Not yet", to: "hash_potatokart_bet_0" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_bet_0: {
        prompt: () => <div>
            <p>You placed your bet!</p>
            <h1>0...</h1>
        </div>,
        options: [
            { text: "Press it", to: "hash_potatokart_press1" },
            { text: "Not yet", to: "hash_potatokart_bet_neg1" }
        ],
        contributor: "Dave"
    },
    ...(Array(25).fill(0).map((x, i) => -i - 1).map((num) => ({
        [`hash_potatokart_bet_neg${-num}`]: {
            prompt: () => <div>
                <p>You placed your bet!</p>
                <h1>{num}...</h1>
            </div>,
            options: [
                { text: "Press it", to: num <= -3 ? "game_ended_without_it_starting" : "hash_potatokart_press_late" },
                { text: "Not yet", to: `hash_potatokart_bet_neg${(-num) + 1}` }
            ],
            contributor: "Dave"
        },
    })).reduce((a,b)=>({...a,...b}),{})),
    hash_potatokart_bet_neg26: {
        prompt: () => <div>
            <p>You placed your bet!</p>
            <h1>{num}...</h1>
        </div>,
        options: [
            { text: "Press it", to: "game_ended_without_it_starting" },
            { text: "Not yet", to: "game_ended_without_it_starting" }
        ],
        contributor: "Dave"
    },
    game_ended_without_it_starting: {
        prompt: () => <div>
            <p>
                You start the race but the race is already over.
            </p>
        </div>,
        ending: {
            id: "endracenegativelmao",
            name: "The Race is Already Over",
            description: "Start the race after it ends."
        }
    },
    hash_potatokart_press1: {
        prompt: () => <div>
            <KartHeader />
            <p>You are going super fast! You are in <Place place='1'/>!</p>
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
    hash_potatokart_press_late: {
        prompt: () => <div>
            <KartHeader />
            <p>You mistimed! You are in <Place place='8' />!!</p>
        </div>,
        action: () => kartPlace = 8,
        options: [
            { text: "Go further", to: "" },
            { text: "Nah", to: "" },
            { text: "Backwards", to: "" },
            { text: "Disconnect", to: "" }
        ],
        contributor: "Durvenson"
    },
    hash_potatokart_further: {
        prompt: () => <div>
            <KartHeader />
            <p>You got hit by a <BlueShell />! You are now in <Place place='3' /></p>
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
            { text: "Maybe", to: "hash_potatokart_blj_leave_outside_yolo_yes" },
            { text: "Some of them", to: "hash_potatokart_blj_leave_outside_yolo_some" },
            { text: "I guess", to: "i_guess" },
            { text: "A little bit of them", to: "" },
            { text: "No", to: "hash_potatokart_blj_leave_outside_yolo_no" },
            { text: "Nope", to: "hash_potatokart_blj_leave_outside_yolo_no" },
            { text: "Never", to: "nevergonnagiveyoufuckingup" },
            { text: "WHY", to: "hash_potatokart_blj_leave_outside_yolo_yes" },
            { text: "It's time to stop", to: "elem_tts" },
            { text: "GET OUT OF MY SWAMP", to: "elem_shrak" },
            { text: "These are supicious", to: "hash_potatokart_blj_leave_outside_yolo_yes" }
        ],
        contributor: "Durvenson"
    },
    i_guess: {
        prompt: () => <div>
            <p>
                <b>"I GUESS"?1st</b>, <em>YOU GUESS!?</em>, <b><em>Y O U  G U E S S????</em></b>
            </p>
            <p>
                what the hell is your guess then?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "hash_potatokart_blj_leave_outside_yolo_yes" },
            { text: "No", to: "hash_potatokart_blj_leave_outside_yolo_no" },
        ],
        contributor: "Dave"
    },
    nevergonnagiveyoufuckingup: {
        prompt: () => <div>
            <p style={{ whiteSpace: "pre" }}>
                {neverGiveUp}
            </p>
        </div>,
        ending: {
            id: "nevergive",
            name: "Never Going to What?",
            description: "rickroll",
        },
        contributor: "Dave"
    },
    hash_potatokart_blj_leave_outside_yolo_yes: {
        prompt: () => <div>
            <p>Actually, you find out that they are cocaine after eating one. Will you smoke the rest?</p>
        </div>,
        options: [
            { text: "Yes", to: "smoke_the_one_ups_yes" },
            { text: "No", to: "smoke_the_one_ups_nah" },
            { text: "I DON'T WANT THE FBI TO BE HERE", to: "smoke_the_one_ups_fbi" },
        ],
        contributor: "Durvenson"
    },
    smoke_the_one_ups_fbi: {
        prompt: () => <div>
            <p>
                Thats right, you don't want the FBI here, so you decide to throw them all away.
            </p>
        </div>,
        options: [
            throwAwayThe("1-Ups"),
            throwAwayThe("Shoes"),
            throwAwayThe("Pineapples"),
            throwAwayThe("Cloths"),
            throwAwayThe("Drugs"),
            throwAwayThe("Keys"),
            throwAwayThe("VSCode"),
            throwAwayThe("Stuff"),
            throwAwayThe("Instrument that you play"),
            throwAwayThe("Wallet"),
            throwAwayThe("Games"),
            throwAwayThe("Tables"),
            throwAwayThe("Phone"),
            throwAwayThe("The Universe"),
        ],
        contributor: "Dave"
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
    },
    bill_wurtz: {
        prompt: () => <div>
            <p>
                <a href="https://www.youtube.com/watch?v=OwkoShhtoGs">
                    Gonna throw my wallet away,
                    <br/><br/>
                    ...and my phone
                    <br/><br/>
                    ...and my keys
                    <br/><br/>
                    ...and my shoes
                    <br/><br/>
                    <em><b>
                    ...and the Instrument that I play!
                    </b></em>
                </a>
            </p>
        </div>,
        ending: {
            id: "billwurtz",
            name: "Bill Wurtz",
            description: "Throw away the right things.",
        },
        contributor: "Dave"
    },
    threw_it_all_away: {
        prompt: () => <div>
            <p>
                You threw the universe away how did it even fit lmao
            </p>
        </div>,
        ending: {
            id: "throw-univsres-away",
            name: "Throw Away the Universe",
            description: "i mean what?",
        },
        contributor: "Dave"
    }
});
