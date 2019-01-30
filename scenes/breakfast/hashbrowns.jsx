import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { CircleText } from "@templates/FontStyles";

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
    make_hashbrowns: {
        prompt: () => <div>
            <p>Hashbrowns are pretty neat. Lets make some! Pick your flavor.</p>
        </div>,
        options: [
            { text: "Hashbrowns", to: "hashbrown_death" },
            { text: "Hashbrownies", to: "hashbrownies" }
        ],
        contributor: "Adr"
    },
    hashbrown_death: {
        prompt: () => <div>
            <p>When the hashbrowns are done making, you choke on them. Nobody is there to save you nor can you save yourself.You eventually pass out and die.</p>
        </div>,
        ending: {
            id: "hashbrowns",
            name: "Potato Death",
            description: "How did you even choke on something that easy to eat?"
        },
        contributor: "Colyderp"
    },
    hashbrownies: {
        prompt: () => <div>
            <p>
                You make <b>hash</b>brownies, but the hashbrownies have all sorts of assortments of letters all over it. Do you try and understand what it 
                means?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "hash_failtounderstand" },
            { text: "Sure", to: "hash_sure" },
            { text: "Absolutely", to: "" },
            { text: "By All Means", to: "hash_byallmeans" },
            { text: "Okey Dokey", to: "hash_okaydokey" },
            { text: "Alright", to: "hash_allright" },
            { text: "Of Course", to: "hash_ofcourse" },
            { text: "Definitely", to: "hash_definetly" },
            { text: "No thank!", to: "hash_no" }
        ],
        contributor: "Toshiyuki and Hunter"
    },
    hash_failtounderstand: {
        prompt: () => <div>
            <p>
                You try to understand what it means, but it's too hard to understand... You end up deciding that you should not eat this as it may be dangerous to your health.
            </p>
        </div>,
        options: [
            { text: "Find something else to eat", to: "wakeup_breakfast", action: () => startedHashbrowns = true }
        ],
        contributor: "Dave"
    },
    hash_okaydokey: {
        prompt: () => <div>
            <p>
                You say "Okey Dokey", like you dont know how to read words, but you can read letters. You need to go back to <span style={{color: "cornflowerblue"}}><CircleText string="Reading School" /></span>.
            </p>
        </div>,
        contributor: "Dave",
        ending: {
            id: "reading-school",
            name: "Forget How to Read Properly",
            description: "You half-forgot how to read so you went to reading school."
        }
    },
    hash_ofcourse: {
        prompt: () => <div>
            <p>
                Of course you can read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_smokeit: {
        prompt: () => <div>
            <p>
                You shred the hashbrownies and shove them into your vaporiser. Time to vape some potato brownies!
            </p>
        </div>,
        options: [
            { text: "Inhale", to: "hash_smokeit2" },
            { text: "Stop Vaping", to: "hash_stop_novape" },
        ],
        contributor: "Neema"
    },
    hash_smokeit2: {
        prompt: () => <div>
            <p>
                You inhale it...
            </p>
        </div>,
        options: [
            { text: "Inhale MORE", to: "hash_smokeit3" },
            { text: "Stop Vaping", to: "hash_smoke_end" },
        ],
        contributor: "Dave"
    },
    hash_smokeit3: {
        prompt: () => <div>
            <p>
                You inhale it...
            </p>
        </div>,
        options: [
            { text: () => <span>Inhale <span style={{ fontWeight: "900", fontStyle: "italic" }}>M O R E</span></span>, to: "hash_smokeit4" },
            { text: "Stop Vaping", to: "hash_smoke_end" },
        ],
        contributor: "Dave"
    },
    hash_smokeit4: {
        prompt: () => <div>
            <p>
                You inhale it...
            </p>
        </div>,
        options: [
            { text: () => <span style={{ fontFamily: "monospace", fontSize: "", color: "red", fontWeight: "900", fontStyle: "italic", textShadow: "0 0 5px red" }}>I N H A L E &nbsp; M O R E</span>, to: "hash_smoke_end" },
        ],
        contributor: "Dave"
    },
    hash_smoke_end: {
        prompt: () => <div>
            <p>You vaped so much potato brownies, you started to get severe vomiting, seizures, and difficulty breathing.</p>
            <p>You also passed out, and died of dehydration soon after.</p>
        </div>,
        ending: {
            id: "over-vape",
            name: "xX_420VapeLord_Xx",
            description: "You are now in the club of the dankest of dank vape lords. Welcome to the gang!"
        },
        contributor: "Hunter"
    },

    hash_definetly: {
        prompt: () => <div>
            <p>
                You definetly can read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_byallmeans: {
        prompt: () => <div>
            <p>
                By all means you read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_no: {
        prompt: () => <div>
            <p>You ate the brownie instead.</p>
        </div>,
        ending: {
            id: "ate-brownie",
            name: "Eated Unhealthy",
            description: "You ate a brownie."
        },
        contributor: "Hunter"
    },
    hash_allright: {
        prompt: () => <div>
            <p>You got your left arm and leg cut off trying to say alright. I guess you were <strong>ALL RIGHT</strong>. <em>ba dum tss...</em></p>
        </div>,
        ending: {
            id: "all-right",
            name: "All Right",
            description: "Looks like you are right handed... Let me take care of the left..."
        },
        contributor: "Hunter"
    },
    hash_sure: {
        prompt: () => <div>
            <p>You say sure, but the person neat you heard you say "sue". He decideds to sue you for "threatening" to sue him. What do you do?</p>
        </div>,
        options: [
            { text: "Sue back", to: "hash_sue" },
            { text: "Get sued", to: "hash_get_sued" },
            { text: "Murder him", to: "hash_murder" },
            { text: "Escape", to: "" },
            { text: "Throw a No U", to: "sue_nou" },
        ],
        contributor: "Hunter"
    },
    sue_nou: {
        prompt: <div>
            <p>He says quietly:</p>
            <h1>No U</h1>
        </div>,
        ending: {
            id: "nou",
            name: "No U",
            description: "Get \"No U-ed\" after \"No U-ing\" someone.",
        },
        contributor: "Dave"
    },
    hash_sue: {
        prompt: () => <div>
            <p>You tell him that you are going to sue him. He says, "bet no proof." What now?</p>
        </div>,
        options: [
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" }
        ],
        contributor: "Hunter"
    },
    hash_sue2: {
        prompt: () => <div>
            <p>You sue the guy and win.</p>
        </div>,
        ending: {
            id: "hash-sue",
            name: "Accidental Sueing",
            description: "Sue an innocent person."
        },
        contributor: "Hunter"
    },
    hash_get_sued: {
        prompt: () => <div>
            <p>You were even told that you were going to get sued. Still, you did nothing about it. Not even get a lawyer.</p>
        </div>,
        ending: {
            id: "hash-sued",
            name: "Agree to get Sued",
            description: "I guess you just wanted to see what it would be like. Who does that?"
        },
        contributor: "Hunter"
    },
    hash_murder: {
        prompt: () => <div>
            <p>You killed him because he was going to sue you. Now his familiy is probably gonna sue you. You should of just ran away.</p>
        </div>,
        ending: {
            id: "sue-murder",
            name: "Violence IS the Answer",
            description: "Hahahahahahahahahahahahahah."
        },
        contributor: "Hunter"
    },
    hash_fuckingbig_version: {
        prompt: () => <div>
            <p>You make it, but then you get really tired when you are done. However, you are tempted to try it.</p>
        </div>,
        options: [
            { text: "Go to bed", to: "" },
            { text: "Have some coffee", to: "" },
            { text: "Make a tiny potato kart", to: "" },
            { text: "Play on it with friends", to: "" },
            { text: "Throw it in the Trash Bin", to: "hash_fuckingbig_bin" }
        ],
        contributor: "Durvenson"
    },
    hash_fuckingbig_bin: {
        prompt: () => <div>
            <p>You throw it in, but you fell in by mistake, and you couldn't get out. You are now being transported in a dump truck.</p>
        </div>,
        options: [
            { text: "Get out", to: "" },
            { text: "Ask the driver about what the fuck is going on", to: "" },
            { text: "Chill in there", to: "hash_truck_chill" },
            { text: "Go on top of the truck", to: "" },
            { text: "Find something in there", to: "hash_truck_find" }
        ],
        contributor: "Durvenson"
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
    hash_truck_find: {
        prompt: () => <div>
            <p>There is a lot in here. What do you get?</p>
        </div>,
        options: [
            { text: "Coke bottle", to: "" },
            { text: "\"Food\"", to: "" },
            { text: "A computer", to: "hash_truck_find_computer" },
            { text: "Your track", to: "" },
            { text: "Your potato", to: "" },
            { text: "Radioactive materials", to: "" },
            { text: "A trash bin", to: "" }
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
            { text: "Play LEGO Sid Meier's Tom Clancy SUPER Fortnite V Modern of War Craft FIFA Remastered Metal Fallcry Special Edition", to: "" },
            { text: "Play Discord", to: "play_discord" },
            { text: "Play Sonic Team Presents: LEGO Tom Hideo Kojima Game Meier's Rise of the SUPER War for the NEW mini Mega Power Nintendo Dawn of the White Virtual Alpha Omega Sequel Final Smash 2 3 DS i lite Light of the Micro XL DD LL Mix Prequel of the e u Boy the Advance SP Player Master Reboot of the Disney Color Cube and Watch Entertainment System Planet Marvel of the Nomad Apes Game of the Year Edition and Knuckles Jam VS Sega Capcom Plus Version Episode Two Volume Two", if: () => !hasCheckedLong, disabledText: "Play Sonic Team Presents: LEGO Tom Hideo Kojima Game Meier's Rise of the SUPER War for the NEW mini Mega Power Nintendo Dawn of the White Virtual Alpha Omega Sequel Final Smash 2 3 DS i lite Light of the Micro XL DD LL Mix Prequel of the e u Boy the Advance SP Player Master Reboot of the Disney Color Cube and Watch Entertainment System Planet Marvel of the Nomad Apes Game of the Year Edition and Knuckles Jam VS Sega Capcom Plus Version Episode Two Volume Two (Already Checked!)", action: () => hasCheckedLong = true, to: "computer_big_boi" },
            { text: "Watch YouTube", to: "" },
            { text: "Watch PornHub", to: "hash_truck_ph" }
        ],
        contributor: "Durvenson"
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
            { text: "Try to do a BLJ", to: "" },
            { text: "Leave the level", to: "" },
            { text: "Stand there", to: "" }
        ],
        contributor: "Durvenson"
    }
});
