import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { LoanHeader } from "./loan/loan";

addFlag("graveWaitTime", 0);
addFlag("wrongPasswords", 0);
addFlag("triedL1Crook", false);
addFlag("passwords", [false, false, false, false, false, false]);
addFlag("mafiaLevel", 1);
addFlag("mafiaTitle", "Crook");

function increaseGraveWait() {
    graveWaitTime++;

    if (graveWaitTime > 4) {
        setScene("grave_die");
    }
}

addScenes({
    // #region Fake Death
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

    // #region Grave
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
    grave_leave: {
        prompt: () => <div>
            <p>Now that you are "dead", and nobody knows that you are alive, what illegal crimes will you commit?</p>
        </div>,
        options: [
            { text: "Become a Hitman", to: "hitman" },
            { text: "Rob a Bank", to: "bank_rob" },
            { text: "Become a Level 1 Crook", to: "level1_crook", if: () => !triedL1Crook, disabledText: true }
        ],
        contributor: "Hunter"
    },
    // #endregion

    // #region Hitman
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
    // #endregion

    // #region Bank Rob
    bank_rob: {
        prompt: () => <div>
            { isPlayingMillionaire && <LoanHeader /> }
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
            {isPlayingMillionaire && <LoanHeader />}
            <p>The tiny little screen buzzes at you...</p>
            <h1 style={{color: "red"}}>WRONG PASSWORD!</h1>
        </div>,
        options: () => [
            { text: "123456", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[0], action: () => { wrongPasswords++; passwords[0] = true; } },
            { text: "password", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[1], action: () => { wrongPasswords++; passwords[1] = true; } },
            { text: "FUCKINGPASSWORD", to: isPlayingMillionaire ? "bank_rob_right_mill" : "bank_rob_right" },
            { text: "h*82fX&11P*c4p", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[3], action: () => { wrongPasswords++; passwords[3] = true; } },
            { text: "Your SSN Number", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[4], action: () => { wrongPasswords++; passwords[4] = true; } },
            { text: "All of the Above", to: "bank_rob_wrong", disabledText: true, if: () => !passwords[5], action: () => { wrongPasswords++; passwords[5] = true; } }
        ],
        action: () => {
            if(wrongPasswords === 5) {
                if(isPlayingMillionaire) {
                    setScene("bank_caught_mill");
                } else {
                    setScene("bank_caught");
                }
            }
        },
        contributor: "Hunter, Dave, and Colyderp"
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
        },
        contributor: "Dave",
    },
    bank_rob_right_mill: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You unlocked the bank vault and got out of it the <strong>$123,456,789.10</strong> that they had stored in it. Thats enough to win the game!
                You win <span style={{ color: "lime" }}>Who Wants to be a Millionare</span>! Great Job
            </p>
        </div>,
        action: () => {
            loanMoney += 123456789.1;
        },
        ending: {
            id: "mill-win",
            name: "How to be a Millionaire",
            description: "You won Who Wants to be a Millionare!",
        },
        contributor: "Dave",
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
        },
        contributor: "Hunter",
    },
    bank_caught_mill: {
        prompt: () => <div>
            <p>
                You got caught! If only you would have had one more chance you would have figured out that password! Going
                to jail is against the rules of <span style={{ color: "lime" }}>Who Wants to be a Millionare</span>, so you
                are disqualified!
            </p>
        </div>,
        ending: {
            id: "disqualified",
            name: "Disqualified",
            description: "Get Disqualified from How to be a Millionaire."
        },
        contributor: "Dave",
    },
    // #endregion

    // #region Mafia
    level1_crook: {
        prompt: () => <div>
            <p>
                You enter the mafia as a Level 1 Crook, now what do you do.
            </p>
        </div>,
        options: [
            { text: "Level Up", to: "level2_crook" },
            { text: "Walk around", to: "level1_crook_walk_around" },
            { text: "Drop out of the mafia", to: "grave_leave", action: () => triedL1Crook = true },
        ],
        contributor: "Dave"
    },

    level1_crook_upgraded: {
        prompt: () => <div>
            <p><span style={{ color: "purple" }}>You are a Level {mafiaLevel} {mafiaTitle}</span></p>
            <p>You upgrade yourself to a Level {mafiaLevel} {mafiaTitle}. Now what?</p>
        </div>,
        options: [
            { text: "Level Up", to: "level1_crook_upgraded", action: () => {
                mafiaLevel++;

                if(mafiaLevel >= 10 && mafiaLevel < 35) {
                    mafiaTitle = "Hitman";
                }else if(mafiaLevel >= 35 && mafiaLevel < 100) {
                    mafiaTitle = "Boss";
                }else if(mafiaLevel >= 100 && mafiaLevel < 250) {
                    mafiaTitle = "Master";
                }else if(mafiaLevel > 250 && mafiaLevel < 1000) {
                    mafiaTitle = "God";
                }else if(mafiaLevel >= 1000) {
                    setScene("mafia_leader");
                }
            } }
        ],
        contributor: "Dave and Hunter",
    },
    level1_crook_walk_around: {
        prompt: () => <div>
            <p>You start to walk around the city, and all of a sudden you are jumped by a bunch of Level 75 Bosses. They kill you for the XP of yours. Of course they didn;t get very much because you were a Level 1 Crook, but it was
                still fun.
            </p>
        </div>,
        ending: {
            id: "killed-level-1",
            name: "Level 1 Crook",
            description: "You got a long way to become a leader..."
        },
        contributor: "Hunter"
    },
    mafia_leader: {
        prompt: () => <div>
            <p>Now athat you have become a Level 1000 Mafia member, you are now the leader of everyone else. Even all the bosses!</p>
        </div>,
        ending: {
            id: "mafia-leader",
            name: "Mafia Leader",
            description: "Become the ultimate mafia leader."
        },
        contributor: "Hunter"
    }
    // #endregion
    
    // #endregion
});
