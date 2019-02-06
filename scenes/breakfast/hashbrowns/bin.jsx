import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("hasTriedCoke", false);
addFlag("radio", false);

addScenes({
    // #region Bin
    hash_fuckingbig_bin: {
        prompt: () => <div>
            <p>You throw it in, but you fell in by mistake, and you couldn't get out. You are now being transported in a dump truck.</p>
        </div>,
        options: [
            { text: "Get out", to: "hash_fuckingbig_bin_out" },
            { text: "Ask the driver about what the fuck is going on", to: "hash_fuckingbig_bin_ask" },
            { text: "Chill in there", to: "hash_truck_chill" },
            { text: "Go on top of the truck", to: "hash_fuckingbig_bin_top" },
            { text: "Find something in there", to: "hash_truck_find" }
        ],
        contributor: "Durvenson"
    },
    hash_fuckingbig_bin_ask: {
        prompt: () => <div>
            <p>
                He tells you that you are being transported to a landfill to be burned.
            </p>
        </div>,
        options: [
            { text: "Get out", to: "hash_fuckingbig_bin_out" },
            { text: "Ask the driver about what the fuck is going on", to: "hash_fuckingbig_bin_ask", disabledText: true, if: () => false },
            { text: "Chill in there", to: "hash_truck_chill" },
            { text: "Go on top of the truck", to: "hash_fuckingbig_bin_top" },
            { text: "Find something in there", to: "hash_truck_find" }
        ],
        contributor: "Hunter"
    },
    hash_fuckingbig_bin_out: {
        prompt: () => <div>
            <p>You get out of the truck, but instead of jumping out of the just you just fell, and got injured. You are 100 miles away from home.</p>
        </div>,
        options: [
            { text: "Call the hospital", to: "hash_truck_find_coke_mentos_nuke_CAR" },
            { text: "Go explore town", to: "town" },
            { text: "Find your way back home", to: "hash_truck_find_coke_mentos_nuke_back" }
        ],
        contributor: "Hunter"
    },
    hash_fuckingbig_bin_top: {
        prompt: () => <div>
            <p>
                You climb on top of the truck and you just fell, and got injured. You are 100 miles away from home.
            </p>
        </div>,
        options: [
            { text: "Call the hospital", to: "hash_truck_find_coke_mentos_nuke_CAR" },
            { text: "Go explore town", to: "town" },
            { text: "Find your way back home", to: "hash_truck_find_coke_mentos_nuke_back" }
        ],
        contributor: "Hunter"
    },
    hash_truck_chill: {
        prompt: () => <div>
            <p>You stayed in, and now you are buried in a landfill.</p>
        </div>,
        ending: {
            id: "landfill",
            name: "Buried in the Landfill",
            description: "Never trust trash cans."
        },
        contributor: "Durvenson"
    },

    // #region Findings
    hash_truck_find: {
        prompt: () => <div>
            <p>There is a lot in here. What do you get?</p>
        </div>,
        options: [
            { text: "Coke bottle", to: "hash_truck_find_coke", disabledText: "Already inspected...", if: () => !hasTriedCoke, action: () => hasTriedCoke = true },
            { text: "\"Food\"", to: "hash_truck_find_food" },
            { text: "A computer", to: "hash_truck_find_computer" },
            { text: "Your track", to: "hash_truck_find_track" },
            { text: "Your potato", to: "hash_truck_find_potato" },
            { text: "Radioactive materials", to: "hash_truck_find_radio", disabledText: true, if: () => !radio },
            { text: "A trash bin", to: "hash_truck_find_trash" }
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_food: {
        prompt: () => <div>
            <p>
            You eat it and die, because all of the food in there is years past its expiration date.
            </p>
        </div>,
        ending: {
            id: "expire-date",
            name: "Expiration Dates Matter",
            description: "Always read them.",
        },
        contributor: "Durvenson and Hunter"
    },
    hash_truck_find_track: {
        prompt: () => <div>
            <p>
                You shred it up into pieces.
            </p>
        </div>,
        options: [
            { text: "Go back", to: "hash_truck_find" },
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_trash: {
        prompt: () => <div>
            <p>
                How the fuck do you throw away a trash bin? Anyways, you put it on your head, because you are drunk. You roam around the streets, and the people dislike you. They dislike you so much that you got murdered.
            </p>
        </div>,
        ending: {
            id: "murdered-irl",
            name: "Murdered IRL",
            description: "Get died.",
        },
        contributor: "Durvenson"
    },
    hash_truck_find_potato: {
        prompt: () => <div>
            <p>
                The potato is fine.
            </p>
        </div>,
        options: [
            { text: "Go back", to: "hash_truck_find" },
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_computer: {
        prompt: () => <div>
            <p>You have a lot to do and a lot of time. What do you do?</p>
        </div>,
        options: [
            { text: "Play Half Life 3", to: "hl3" },
            { text: "Play Minecraft", to: "minecraft_start" },
            { text: "Play LEGO Sid Meier's Tom Clancy SUPER Fortnite V Modern of War Craft FIFA Remastered Metal Fallcry Special Edition", to: "computer_small_boi" },
            { text: "Play Discord", to: "play_discord" },
            { text: "Play Sonic Team Presents: LEGO Tom Hideo Kojima Game Meier's Rise of the SUPER War for the NEW mini Mega Power Nintendo Dawn of the White Virtual Alpha Omega Sequel Final Smash 2 3 DS i lite Light of the Micro XL DD LL Mix Prequel of the e u Boy the Advance SP Player Master Reboot of the Disney Color Cube and Watch Entertainment System Planet Marvel of the Nomad Apes Game of the Year Edition and Knuckles Jam VS Sega Capcom Plus Version Episode Two Volume Two", if: () => !hasCheckedLong, disabledText: "Play Sonic Team Presents: LEGO Tom Hideo Kojima Game Meier's Rise of the SUPER War for the NEW mini Mega Power Nintendo Dawn of the White Virtual Alpha Omega Sequel Final Smash 2 3 DS i lite Light of the Micro XL DD LL Mix Prequel of the e u Boy the Advance SP Player Master Reboot of the Disney Color Cube and Watch Entertainment System Planet Marvel of the Nomad Apes Game of the Year Edition and Knuckles Jam VS Sega Capcom Plus Version Episode Two Volume Two (Already Checked!)", action: () => hasCheckedLong = true, to: "computer_big_boi" },
            { text: "Watch YouTube", to: "hash_truck_find_computer_youtube" },
            { text: "Watch PornHub", to: "hash_truck_ph" }
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_computer_youtube: {
        prompt: () => <div>
            <p>
                You go on YouTube to watch some videos, and turns out all of them got taken down by UMG and your favorite content creators moved to <strong>V I M E O</strong>.
            </p>
        </div>,
        ending: {
            id: "thanks-umg",
            name: "Thanks UGM",
            description: "GOTTA CLAIM THEM ALLLLLLL!!!",
        },
        contributor: "Hunter"
    },
    hash_truck_ph: {
        prompt: () => <div>
            <p>Your wife finds out, and destroys the computer. Also, you are divorced now.</p>
        </div>,
        ending: {
            id: "ph",
            name: "You got Divorced",
            description: "That was the end of a \"good\" relationship..."
        },
        contributor: "Durvenson"
    },
    hash_fuckingbig_friends: {
        prompt: () => <div>
            <p>You are lonely, and you have no friends. You start to feel kind of "depressed".</p>
        </div>,
        options: [
            { text: "Hire robots to play with", to: "hash_fuckingbig_friends_depression" },
            { text: "Play something else", to: "hash_fuckingbig_friends_depression" },
            { text: "Don't play anything", to: "hash_fuckingbig_friends_depression" },
            { text: "Go to the neighborhood and make some friends there", to: "hash_fuckingbig_friends_depression" }
        ],
        contributor: "Durvenson"
    },
    hash_fuckingbig_friends_depression: {
        prompt: () => <div>
            <p>
                No matter how hard you try, you cannot cure your depression.
            </p>
        </div>,
        ending: {
            id: "depresssss",
            name: "Depression",
            description: "Some people have no friends... some people have no food...",
        },
        contributor: "Hunter"
    },
    hash_truck_find_coke: {
        prompt: () => <div>
            <p>It has some coke in it, and it is diet.</p>
        </div>,
        options: [
            { text: "Drink it", to: "hash_truck_find_coke_drink" },
            { text: "Throw it into the water", to: "jillion" },
            { text: "Do nothing", to: "hash_truck_find_coke" },
            { text: "M E N T O S", to: "hash_truck_find_coke_mentos" }
        ],
        contributor: "Durvenson"
    },
    
    jillion: {
        prompt: () => <div>
            <p>
                You are sentenced to a jillion years in prison for the overly specific crime of "tampering with the national beverage."
            </p>
        </div>,
        ending: {
            id: "jillion",
            name: "A Jillion Years",
            description: "By the time you get out of jail, you’ll be older than the universe.",
        },
        contributor: "Alchemyking"
    },
    hash_truck_find_coke_drink: {
        prompt: () => <div>
            <p>
                You drink the coke, but it has radioactive materials in it. You die.
            </p>
        </div>,
        ending: {
            id: "drinking-radio",
            name: "Drinking Radioactive Materials",
            description: "Healthy.",
        },
        contributor: "Hunter"
    },
    hash_truck_find_coke_mentos: {
        prompt: () => <div>
            <p>You get diet coke all over the truck.</p>
        </div>,
        options: [
            { text: "Clean it", to: "hash_truck_find_coke_mentos_clean" },
            { text: "Make a fucking nuke out of the diet coke bottles", to: "hash_truck_find_coke_mentos_nuke" },
            { text: "Find something else", to: "hash_truck_find" }
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_coke_mentos_clean: {
        prompt: () => <div>
            <p>You cleaned it. Now it is shiny!</p>
        </div>,
        options: [
            { text: "Clean it", to: "hash_truck_find_coke_mentos_clean", disabledText: true, if: () => false },
            { text: "Make a fucking nuke out of the diet coke bottles", to: "hash_truck_find_coke_mentos_nuke" },
            { text: "Find something else", to: "hash_truck_find" }
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_coke_mentos_nuke: {
        prompt: () => <div>
            <p>It made the truck slip. You fell, and got injured. You are 100 miles away from home.</p>
        </div>,
        options: [
            { text: "Call the hospital", to: "hash_truck_find_coke_mentos_nuke_CAR" },
            { text: "Go explore town", to: "town" },
            { text: "Find your way back home", to: "hash_truck_find_coke_mentos_nuke_back" }
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_coke_mentos_nuke_back: {
        prompt: () => <div>
            <p>
                Your car is out of gas, you could maybe find some around here.
            </p>
        </div>,
        options: [
            { text: "Call the hospital", to: "hash_truck_find_coke_mentos_nuke_CAR" },
            { text: "Go explore town", to: "town" },
            { text: "Find your way back home", to: null, if: () => false, disabledText: true },
        ],
        contributor: "Dave"
    },
    town: {
        prompt: () => <div>
            <p>
                You start exploring the town... but you fall down as you didnt get that injury treated.
            </p>
        </div>,
        ending: {
            id: "fall-down",
            name: "Fall Down",
            description: "Fall down while exploring the town.",
        },
        contributor: "Dave",
    },
    hash_truck_find_radio: {
        prompt: () => <div>
            <p>Radium, along with other stuff, is in here for some reason. Your hands are fucked up.</p>
        </div>,
        options: [
            { text: "Yell at whoever put that in there", to: "hash_truck_find_radio_yell" },
            { text: "Make a fucking nuke", to: "hash_truck_find_radio_nuke" },
            { text: "Find something else", to: "hash_truck_find", action: () => radio = true }
        ],
        contributor: "Durvenson"
    },
    hash_truck_find_radio_yell: {
        prompt: () => <div>
            <p>
                The person isn't here.
            </p>
        </div>,
        options: [
            { text: "Yell at whoever put that in there", to: "hash_truck_find_radio_yell" },
            { text: "Make a fucking nuke", to: "hash_truck_find_radio_nuke" },
            { text: "Find something else", to: "hash_truck_find", action: () => radio = true }
        ],
        contributor: "Hunter"
    },
    hash_truck_find_radio_nuke: {
        prompt: () => <div>
            <p>You blew up the world, and you also killed yourself.</p>
        </div>,
        ending: {
            id: "end-of-world",
            name: "End of the World",
            description: "Nuke the world."
        },
        contributor: "Durvenson"
    }
    // #endregion

    // #endregion
});
