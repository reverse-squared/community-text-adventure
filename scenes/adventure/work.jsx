import React from "react";
import { addScenes } from "@src/ending";
import { addFlag, setScene } from "web-text-adventure/src/adventure";

addFlag("coffeeDrank", 0);
addFlag("hasChosenToCommit", false);

addScenes({
    work_pre: {
        prompt: () => <div>
            <p>He explains to you that you haven't shown up to work yesterday which you were supposed to. Someone had to make up all the work you missed and missing something. He says that you need to come.</p>
        </div>,
        options: [
            { text: "Go to work", to: "work_start" },
            { text: "Don't go to work", to: "work_dont" }
            // TODO: Don't go to work path.
        ],
        contributor: "Hunter"
    },  
    work_start: {
        prompt: () => <div>
            <p>You sit down at your desk, then realizing all the work you missed. <i>I better get started</i> you think. What do you do first.</p>
        </div>,
        options: [
            { text: "Fix the bug", to: "fourth_wall" },
            { text: "Develop new feature", to: "work_new_feature" },
            { text: "Play Half Life 3", to: "hl3" },
            { text: "Go get some coffee", to: "work_coffee", action: () => coffeeDrank++ }
        ],
        contributor: "Hunter"
    },
    work_coffee: {
        prompt: () => <div>
            <p>The coffee you drink is great. It's the best you ever had. Now what?</p>
        </div>,
        options: [
            { text: "Go back", to: "work_start" },
            { text: "Drink more", to: "work_coffee", action: () => coffeeDrank++ }
        ],
        action: () => {
            if(coffeeDrank > 10) {
                setScene("work_coffee_addict");
            }
        },
        contributor: "Hunter"
    },
    work_coffee_addict: {
        prompt: () => <div>
            <p>You drank so much coffee, your heart is now going 200 BPM. I'm pretty sure thats not healthy.</p>
        </div>,
        ending: {
            id: "coffee-addict",
            name: "Coffee Addict",
            description: "Drinking coffee got your heartrate well out of what's normal at a sitting positon."
        },
        contributor: "Hunter"
    },
    fourth_wall: {
        prompt: () => <div>
            <p>You search through the endless lines of code until... oh! There’s the problem! > ‘You search through the endl’...  then you realise... You broke the forth wall! Good job! Because the wall is 
                broken, you have to endlessly read every movement you do, this is practically the end.
            </p>
        </div>,
        ending: {
            id: "fourth-wall",
            name: "Breaking the Fourth Wall",
            description: "You broke it..."
        },
        contributor: "Daniel (Phrotonz)"
    },
    hl3: {
        prompt: () => <div>
            <p>
                You load up the new <span style={{ fontSize: "1.25em", color: "orange", fontStyle: "italic" }}>Half Life 3</span>. It's super good. So many new features.
            </p>
            <p>
                While playing, you come to the plot twist that the Cake is a Lie. This leads you into an existential crisis and you faint.
            </p>
        </div>,
        ending: {
            id: "cake-lie",
            name: "The Cake is a Lie",
            description: "While playing Half Life 3, you realize the cake was a lie and experience an existential crisis and die.",
        },
        contributor: "Helvetica"
    },
    work_new_feature: {
        prompt: () => <div>
            <p>You worked on this cool new feature... do you commit?</p>
        </div>,
        options: [
            { text: "Yes", to: "work_new_feature", action: () => hasChosenToCommit = true, if: () => !hasChosenToCommit },
            { text: "No", to: "work_failure", if: () => !hasChosenToCommit },
            { text: "To the master branch", to: "work_master", if: () => hasChosenToCommit },
            { text: "To the development branch", to: "work_dev", if: () => hasChosenToCommit },
            { text: "Open a pull request", to: "work_pr", if: () => hasChosenToCommit }
        ],
        contributor: "Hunter"
    },
    work_failure: {
        prompt: () => <div>
            <p>Since you have this done, and have not commited anything in the last eight hours, your project manager assumes you are slacing off playing game and whatnot. He fires
                you on the spot.
            </p>
        </div>,
        ending: {
            id: "commit-a-day",
            name: "A Commit a Day",
            description: "Keeps the doctor away..."
        },
        contributor: "Hunter"
    },
    work_master: {
        prompt: () => <div>
            <p>You commited to the master branch and the changes went to everyone instantly. Your project manager found out that you did this and fired you for not 
                following work protocol.
            </p>
        </div>,
        ending: {
            id: "git-master",
            name: "git push -f",
            description: "That's not how the force works..."
        },
        contributor: "Hunter"
    },
    work_pr: {
        prompt: () => <div>
            <p>You open a <b>Pull Request</b> just to be sure that your changes are fine, but the project manager wanted this feature to be done today and not have a whole day to
                review it. He fires you for wasting their time.
            </p>
        </div>,
        ending: {
            id: "work-pr",
            name: "Open a Pull Request",
            description: "Be a good boi and open a PR, and also get fired."
        },
        contributor: "Hunter"
    },
    work_dev: {
        prompt: () => <div>
            <p>You push your changes to the development branch, and your project manager is proud of you. He tells you that you can now leave work. Also don't forget to come back tomorrow for more work.</p>
            <p>You leave work, now what do you do?</p>
        </div>,
        options: [
            { text: "Go on your computer", to: "computer_start" },
            { text: "Go on your phone", to: "phone_start" },
            { text: "Walk your dog", to: "dog_walk" }
        ],
        contributor: "Hunter"
    },
    work_dont: {
        prompt: () => <div>
            <p>You decide not to go to work, even after being told.</p>
        </div>,
        ending: {
            id: "disobedient",
            name: "Disobedient",
            description: "Don't go to work, even after being told."
        }
    }
});
