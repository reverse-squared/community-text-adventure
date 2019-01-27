import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addFlag("graveWaitTime", 0);
addFlag("wrongPasswords", 0);
addFlag("passwords", [false, false, false, false, false, false]);

function increaseGraveWait() {
    graveWaitTime++;

    if (graveWaitTime > 4) {
        setScene("grave_die");
    }
}

addScenes({
    fake_your_death: {
        prompt: () => <div>
            <p>You fake your death by pretending you died on the street. Nobody cared to check your pulse so they assumed you were dead. They placed you in a
                coffin and burried you. With nobody knowing that you exist, what do you do.
            </p>
        </div>,
        options: [
            { text: "Leave your grave", to: "grave_death_leave" },
            { text: "Wait", to: "grave_wait" }
        ],
        contributor: "Hunter"
    },
    grave_death_leave: {
        prompt: () => <div>
            <p>When you left your grave, the burrial ceremony wasn't over. People though you were a zombie and shot you down.</p>
        </div>,
        ending: {
            id: "grave-zombie",
            name: "Rose from the Dead",
            description: "Fake your death and rise from the \"dead\".",
        },
        contributor: "Hunter",
    },
    grave_wait: {
        prompt: () => <div>
            <p>You waited five minutes. What now?</p>
        </div>,
        options: [
            { text: "Wait more", to: "grave_wait" },
            { text: "Leave grave", to: "grave_leave" }
        ],
        action: increaseGraveWait,
        contributor: "Hunter",
    },
    grave_die: {
        prompt: () => <div>
            <p>You somehow died in your grave, because of a lack of oxygen. The whole point was to fake your death and not <i>actually</i> die. Good job.</p>
        </div>,
        ending: {
            id: "grave-death",
            name: "Accidental Suicide",
            description: "You accidentally killed yourself in your own grave. How does that even happen?",
        },
        contributor: "Hunter",
    },

    // TODO: Crook.
    grave_leave: {
        prompt: () => <div>
            <p>Now that you are "dead", and nobody knows that you are alive, what illegal crimes will you commit?</p>
        </div>,
        options: [
            { text: "Become a Hitman", to: "hitman" },
            { text: "Rob a Bank", to: "bank_rob" },
            { text: "Become a Level 1 Crook", to: "level1_crook" }
        ],
        contributor: "Hunter"
    },

    bank_rob: {
        prompt: () => <div>
            <p>You want to enter a bank, but with the recent rising of bank robberies, they have password protected the bank. What is the <b>super secret password?</b></p>
        </div>,
        options: [
            { text: "123456", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[0], action: () => { wrongPasswords++; passwords[0] = true; } },
            { text: "password", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[1], action: () => { wrongPasswords++; passwords[1] = true; } },
            { text: "FUCKINGPASSWORD", to: "bank_rob_right" },
            { text: "h*82fX&11P*c4p", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[3], action: () => { wrongPasswords++; passwords[3] = true; } },
            { text: "Your SSN Number", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[4], action: () => { wrongPasswords++; passwords[4] = true; } },
            { text: "All of the Above", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[5], action: () => { wrongPasswords++; passwords[5] = true; } }
        ],
        contributor: "Hunter, Dave, and Colyderp"
    },
    bank_rob_wrong: {
        prompt: () => <div>
            <p>The tiny little screen buzzes at you...</p>
            <h1 style={{color: "red"}}>WRONG PASSWORD!</h1>
        </div>,
        options: [
            { text: "123456", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[0], action: () => { wrongPasswords++; passwords[0] = true; } },
            { text: "password", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[1], action: () => { wrongPasswords++; passwords[1] = true; } },
            { text: "FUCKINGPASSWORD", to: "bank_rob_right" },
            { text: "h*82fX&11P*c4p", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[3], action: () => { wrongPasswords++; passwords[3] = true; } },
            { text: "Your SSN Number", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[4], action: () => { wrongPasswords++; passwords[4] = true; } },
            { text: "All of the Above", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[5], action: () => { wrongPasswords++; passwords[5] = true; } }
        ],
        action: () => {
            if(wrongPasswords === 5) {
                setScene("bank_caught");
            }
        },
        contributor: "Hunter, Dave, and Colyderp"
    },

    hitman: {
        prompt: () => <div>
            <p>
                Your first job is to kill someone named... Wait... thats your name!? Your first job is to kill Yourself.
            </p>
        </div>,
        options: [
            { text: "Die", to: "hitman_do" },
            { text: "Don't", to: "hitman_dont" },
        ],
        contributor: "Dave"
    },
    hitman_dont: {
        prompt: () => <div>
            <p>
                You decide not to take the job, but within a day someone else was hired in your place, and they have killed you.
            </p>
        </div>,
        ending: {
            id: "death-by-hitman",
            name: "Killed by Hitman",
            description: "Refuse to take a hitman job to kill yourself, then someone else gets the job.",
        },
        contributor: "Dave"
    },
    hitman_do: {
        prompt: () => <div>
            <p>
                You take the job, and kill yourself... uhhh... They weren't able to pay you since you weren't alive to verify the transaction.
            </p>
        </div>,
        ending: {
            id: "paid-suicide",
            name: "Paid Suicide",
            description: "Become a hitman for yourself.",
        },
        contributor: "Dave"
    },

    bank_rob_right: {
        prompt: () => <div>
            <p>
                You unlocked the bank vault and got out of it the <strong>$123,456,789.10</strong> that they had stored in it.
            </p>
        </div>,
        ending: {
            id: "bank-vault",
            name: "Inside the Bank Vault",
            description: "Unlock the bank vault somehow.",
        }
    },
    bank_caught: {
        prompt: () => <div>
            <p>
                You got caught! If only you would have had one more chance you would have figured out that password!
            </p>
        </div>,
        ending: {
            id: "bank-vault",
            name: "HACKERMAN",
            description: "Suck it up buttercup... better luck next time!",
        }
    },

    level1_crook: {
        //TODO: Later
        prompt: () => <div>
            <p>
                You enter the mafia as a level 1 crook, now what do you do.
            </p>
        </div>,
        options: [
            { text: "Level Up", to: "" }
        ]
    }
});
