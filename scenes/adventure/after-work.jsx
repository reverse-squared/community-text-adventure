import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("hasCheckedLong", false);

addScenes({
    // #region Dog
    dog_walk: {
        prompt: () => <div>
            <p>You want to take your nice little <strong>Pug</strong> for a walk, but WHOOPS, you don't have a <span style={{color: "#ffbaa3", fontWeight: "bold"}}>Leash</span>...</p>
            <p>Where do you go to buy a leash.</p>
        </div>,
        options: [
            { text: "The dark and not suspicious tunnel", to: "dog_tunnel" },
            { text: "The pet store", to: "dog_pet_store" },
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
    // #endregion

    // #region Computer
    computer_start: {
        prompt: () => <div>
            <p>You have time to play only one game on your computer before you must leave. What game do you play?</p>
        </div>,
        options: [
            { text: "Play Half Life 3", to: "hl3" },
            { text: "Play Minecraft", to: "minecraft_start" },
            { text: "Play LEGO Sid Meier's Tom Clancy SUPER Fortnite V Modern of War Craft FIFA Remastered Metal Fallcry Special Edition", to: "computer_small_boi" },
            { text: "Play Discord", to: "play_discord" },
            { text: "Play Sonic Team Presents: LEGO Tom Hideo Kojima Game Meier's Rise of the SUPER War for the NEW mini Mega Power Nintendo Dawn of the White Virtual Alpha Omega Sequel Final Smash 2 3 DS i lite Light of the Micro XL DD LL Mix Prequel of the e u Boy the Advance SP Player Master Reboot of the Disney Color Cube and Watch Entertainment System Planet Marvel of the Nomad Apes Game of the Year Edition and Knuckles Jam VS Sega Capcom Plus Version Episode Two Volume Two", if: () => !hasCheckedLong, disabledText: "Play Sonic Team Presents: LEGO Tom Hideo Kojima Game Meier's Rise of the SUPER War for the NEW mini Mega Power Nintendo Dawn of the White Virtual Alpha Omega Sequel Final Smash 2 3 DS i lite Light of the Micro XL DD LL Mix Prequel of the e u Boy the Advance SP Player Master Reboot of the Disney Color Cube and Watch Entertainment System Planet Marvel of the Nomad Apes Game of the Year Edition and Knuckles Jam VS Sega Capcom Plus Version Episode Two Volume Two (Already Checked!)", action: () => hasCheckedLong = true, to: "computer_big_boi" }
        ],
        contributor: "Hunter"
    },
    computer_small_boi: {
        prompt: () => <div>
            <p>
                You play <b>LEGO Sid Meier's Tom Clancy SUPER Fortnite V Modern of War Craft FIFA Remastered Metal Fallcry Special Edition</b>, and it was the best game you ever played.
            </p>
        </div>,
        ending: {
            id: "small-boi",
            name: "10/10 IGN",
            description: "When does the sequel come out?",
        },
        contributor: "Hunter"
    },
    play_discord: {
        prompt: () => <div>
            <p>You decide to play your favorite game, <span style={{color: "#7289DA"}}><strong>Discord</strong></span></p>
        </div>,
        ending: {
            id: "discord",
            name: "The Anti-Anit-Social Person",
            description: "Hang out with your friends... digitally.",
            opensDiscord: true,
        },
        contributor: "Dave",
    },
    computer_big_boi: {
        prompt: () => <div>
            <p>Before buying this game, you must know that this game is <strong>Only For Olympic Offical Video Game With Net Play Only On Games for Windows PlayStation Live Only For Nintendo 64 Only on Xbox Includes Your Own Mama Baby, Requires Kinect Sensor, Includes 50 Classic Atari Titles Includes Original Pac-Man Arcade Game, Platinum Hits Best Seller Award, Has the Official Nintendo Seal of Quality, Playable in 2D and 3D. 3D Mode for ages 7+. See back. Has the Official Genesis Seal of Quality, Nintendo WiFi connection, requires the Wii Motion Plus controller, Online Features available, learn with platinum the best of playstation 2, rated T for Teen, only for the gameboy color...</strong></p>
            <p>Do you still want to buy the game?</p>
            <a href="https://i.imgur.com/oNWsidw.png" target="_blank">Game Cover</a>
        </div>,
        options: [
            { text: "Yes", to: "big_boi_buy" },
            { text: "No", to: "computer_start" },
        ],
        contributor: "Hunter"
    },
    big_boi_buy: {
        prompt: () => <div>
            <p>You decide to buy the game. Yay!</p>
        </div>,
        ending: {
            id: "big-boi",
            name: "No Buyers Remorse with This One",
            description: "On a scale from 1-10, how good was the game?"
        },
        contributor: "Hunter"
    },
    // #endregion

    // #region Phone
    phone_start: {
        prompt: () => <div>
            <p>
                {
                    phoneFromSafe
                        ? "You get our your phone to play something. What game do you play?"
                        : "You have time to play only one game on your phone before you must leave. What game do you play?"
                }
                
            </p>
        </div>,
        options: [
            { text: "Candy Crush Saga", to: "candy_crushghsfdifsan" },
            { text: "Candy Crush Soda Saga", to: "candy_crushghsfdifsan" },
            { text: "Candy Crush Jelly Saga", to: "candy_crushghsfdifsan" },
            { text: "Candy Crush Friends Saga", to: "candy_crushghsfdifsan" },
            { text: "How About No", to: "phone_others" }
        ],
        contributor: "Hunter"
    },
    candy_crushghsfdifsan: {
        prompt: () => <div>
            <p>
                You open up Candy Crush, but since they all look the same, all those paths lead to this one :). You play through a game.
            </p>
        </div>,
        options: [
            { text: "win", to: "winthecandy" }
        ]
    },
    winthecandy: {
        prompt: () => <div>
            <p>
                You won candy crush, good job... I mean it's not too hard.
            </p>
        </div>,
        ending: {
            id: "winnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
            name: "Winner Winner Candy Dinner",
            description: "Win a game of candy crush.",
        }
    },
    phone_others: {
        prompt: () => <div>
            <p>You decide not to play the <b>Amazing Games</b>, and instead want to sign-up for something, but what is it?</p>
        </div>,
        options: [
            { text: "For Jeopardy", to: "jeopardy_pre" },
            { text: "For The Price is Right", to: "price_pre" },
            { text: "For Who Wants to be a Millionare", to: "mill_start" }
        ],
        contributor: "Hunter"
    }
    // #endregion
});
