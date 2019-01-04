import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { addScenes } from "../src/ending.jsx";

addFlag("skydiveTurns", 11);

const SkydiveHeader = () => <div>
    <p className={"loan-header " + (skydiveTurns < 3 ? "loan-header-low" : "")}>
        You have <strong>{skydiveTurns}</strong> turns save yourself.
    </p>
</div>;

const decreaseSkydiveTurn = () => {
    skydiveTurns--;

    if(skydiveTurns <= 0) {
        setScene("skydive_die");
    }
};

addScenes({
    skydive_pre: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>
                Skydiving is nice. Right out of the hospital, you board the plane and climb to 12,500 feet. The guy opens
                the door and tells you to jump. You jump and he tells you to open your parachute when you think it right.
            </p>
        </div>,
        options: [
            { text: "Open the parachute...", to: "skydive_start" },
        ],
        contributor: "Hunter"
    },
    skydive_start: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>Okay, so your parachute just failed.</p>
            <h6>CALM DOWN</h6>
            <h3>CALM DOWN</h3>
            <h1>CALM DOWN</h1>
            <p><strong>What do you do.</strong></p>
        </div>,
        options: [
            { text: "Try the paracute again.", to: "skydive_parachute_try_again" },
            { text: "Try the backup paracute.", to: "skydive_backup_parachute" },
            { text: "Use your phone to post to Snapchat that you're about to die.", to: "skydive_snapchat" },
        ],
        action: () => {
            decreaseSkydiveTurn();
        },
        contributor: "Hunter"
    },

    skydive_parachute_try_again: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>Hmmmm. That didnt work. What now?</p>
        </div>,
        options: [
            { text: "Try the paracute again.", to: "skydive_parachute_try_again" },
            { text: "Try the backup paracute.", to: "skydive_backup_parachute" },
        ],
        action: () => {
            decreaseSkydiveTurn();
        },
        contributor: "Hunter"
    },

    skydive_backup_parachute: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>Nothing. What now?</p>
        </div>,
        options: [
            { text: "Try the backup paracute again.", to: "skydive_backup_parachute" },
        ],
        action: () => {
            decreaseSkydiveTurn();
        },
        contributor: "Hunter"
    },

    skydive_snapchat: {
        prompt: () => <div>
            <SkydiveHeader />
            <p>Nice snap. Nice way to document your ending. <strong>Now what do you do?</strong></p>
        </div>,
        options: [
            { text: "Take another snap.", to: "skydive_snapchat_2" },
        ],
        action: () => {
            decreaseSkydiveTurn();
        },
        contributor: "Hunter"
    },

    skydive_snapchat_2: {
        prompt: () => <div>
            <p>Nice snap. <strong>Now what?</strong></p>
        </div>,
        options: [
            { text: "Take another snap.", to: "skydive_snapchat_3" },
        ],
        contributor: "Hunter"
    },

    skydive_snapchat_3: {
        prompt: () => <div>
            <p>Nice snap. <strong>Now what?</strong></p>
        </div>,
        options: [
            { text: "Take another snap.", to: "skydive_snapchat_4" },
        ],
        contributor: "Hunter"
    },

    skydive_snapchat_4: {
        prompt: () => <div>
            <p>Nice snap. <strong>Now what?</strong></p>
        </div>,
        options: [
            { text: "Take another snap.", to: "skydive_snapchat_ending" },
        ],
        contributor: "Hunter"
    },

    skydive_snapchat_ending: {
        prompt: () => <div>
            <p>Even with all your attempts to save yourself from death, and all the safety features on your parachute, you still somehow died.</p>
        </div>,
        ending: {
            id: "skydiving-snapchat",
            name: "Snap Snap Snap",
            description: "You were too busy trying to please your friends on Snapchat and too caught up in yourself to actually try to save yourself. Kids these days..."
        },
        contributor: "Hunter"
    },
    
    skydive_die: {
        prompt: () => <div>
            <p>Even with all your attempts to save yourself from death, and all the safety features on your parachute, you still somehow died.</p>
        </div>,
        ending: {
            id: "skydiving-death",
            name: "Skydiving Disaster",
            description: "Fail to find anything on the parachute that could save your fall.",
        },
        contributor: "Hunter"
    }
}); 