import React from "react";
import { addFlag, addScenes } from "web-text-adventure";
import { RainbowCircleText } from "../styles.jsx";

addFlag("loanMoney", -4313);
addFlag("loanTurns", 31);
addFlag("loanBills1", [false,false,false]);
addFlag("loanBills2", [false,false]);

const displayMoney = (num) => {
    if(num < 0) return "-$" + (-num);
    return "$" + num;
};

const LoanHeader = () => <div>
    <p className={"loan-header " + (loanTurns < 10 ? "loan-heder-low" : "")}>
        Money: <strong>{displayMoney(loanMoney)}</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
    </p>
</div>;

const decreaseTurn = () => loanTurns--;

addScenes({
    loan_start: {
        prompt: <div>
            You somehow got a loan of $4313, and now have to pay it off within 30 turns. Now this is going to be tricky!
        </div>,
        options: [
            { text: "Begin", to: "loan_main" }
        ],
        contributor: "Dave"
    },
    loan_main: {
        prompt: () => <div>
            <LoanHeader />
            <div>
                You are outside the hospital, and you are free of your peanut allergy. <strong>What do you do?</strong>
            </div>
        </div>,
        options: [
            { text: "Pay your bills", to: "loan_paybills" }
        ],
        action: decreaseTurn,
        contributor: "Dave and Hunter"
    },
    loan_paybills: {
        prompt: () => <div>
            <LoanHeader />
            <div>
                You decide to pay your bills{(loanBills1[0] && loanBills1[1] && loanBills1[2]) ? ", and go even further into debt." : "..."}
            </div>
        </div>,
        options: [
            {
                text: "Pay Electric Bill (-$100)",
                disabledText: "(Purchased)",
                to: "loan_paybills",
                if: () => !loanBills1[0],
                action: () => {
                    loanBills1[0] = true;
                    loanMoney -= 100;
                }
            },
            {
                text: "Pay Gas Bill (-$60)",
                disabledText: "(Purchased)",
                to: "loan_paybills",
                if: () => !loanBills1[1],
                action: () => {
                    loanBills1[1] = true;
                    loanMoney -= 100;
                }
            },
            {
                text: "Pay Water Bill (-$28)",
                disabledText: "(Purchased)",
                to: "loan_paybills",
                if: () => !loanBills1[2],
                action: () => {
                    loanBills1[2] = true;
                    loanMoney -= 28;
                }
            },
            {
                text: "Pay Rent (-$2000)",
                to: "loan_paybills2",
                if: () => loanBills1[0] && loanBills1[1] && loanBills1[2],
                action: () => {
                    loanMoney -= 2000;
                }
            },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills2: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                It really seems like you could use a new car
            </p>
        </div>,
        options: [
            { text: "Buy Car (-$17,000)", to: "loan_paybills3", action: () => loanMoney-=17000 }
        ],
        action: decreaseTurn,
        contributor: "Dave"
    },
    loan_paybills3: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                ...and maybe a new house would be nice...
            </p>
        </div>,
        options: [
            { text: "Buy a new house (-$319,679)", disabledText: true, to: "loan_paybills3", if: () => loanMoney > -30000, action: () => loanMoney -= 319679 },
            { text: "Pay Shipping (-$0.99)", to: "loan_paybills4", if: () => loanMoney < -30000, action: () => loanMoney -= .99 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills4: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                ...and maybe a new house would be nice...
            </p>
        </div>,
        options: [
            { text: "Buy a new house (-$319,679)", disabledText: true, to: "", if: () => false },
            { text: "Pay Shipping (-$0.99)", disabledText: true, to: "", if: () => false },
            { text: "Pay Handling (-$0.98)", to: "loan_paybills5", action: () => loanMoney -= .98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills5: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                Hey, it looks like its also on sale! Buy one, get another half off!
            </p>
        </div>,
        options: [
            { text: "Buy another house (-$159,839)", to: "loan_paybills6", action: () => loanMoney -= 156839 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills6: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                Hey, it looks like its also on sale! Buy one, get another half off!
            </p>
        </div>,
        options: [
            { text: "Buy another house (-$159,839)", to: "", disabledText: true, if: () => false },
            { text: "Pay More Shipping (-$0.50)", to: "loan_paybills7", action: () => loanMoney-=0.50},
            // { text: "Pay Handling (-$0.45)", to: "loan_paybills5", action: () => loanMoney -= 98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills7: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                Hey, it looks like its also on sale! Buy one, get another half off!
            </p>
        </div>,
        options: [
            { text: "Buy another house (-$159,839)", to: "", disabledText: true, if: () => false },
            { text: "Pay More Shipping (-$0.50)", to: "", disabledText: true, if: () => false },
            { text: "Pay More Handling (-$0.45)", to: "loan_paybills8", action: () => loanMoney -= 98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills8: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You are now at your amazing new house, and realize how ugly it is.
            </p>
        </div>,
        options: [
            { text: "Repaint the walls (-$500)", disabledText: "Repaint the walls (Purchased)", to: "loan_paybills8", if: () => !loanBills2[0], action: () => { loanBills2[0] = true; loanMoney -= 500; } },
            { text: "Fix the wood floors (-$1700)", disabledText: "Fix the wood floors (Purchased)", to: "loan_paybills8", if: () => !loanBills2[1], action: () => { loanBills2[1] = true; loanMoney -= 1700; } },
            { text: "Replace the windows (-$1500)", to: "loan_paybills_windows", action: () => loanMoney -= 1500 },
            { text: "Go buy groceries", to: "loan_paybills_groceries", action: () => loanMoney -= 500 },
            { text: "Buy an iPhone (-$4000)", to: "loan_paybills_iphone", action: () => loanMoney -= 500 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills_iphone: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                It looks like the <RainbowCircleText string="iPhone XSR Max Plus Deluxe Pro"/> just came out, so you bought the first in stock.
            </p>
        </div>,
        options: [
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    }
});

// todo
/*

Also you might wanna repaint the place -$500   - Hunter
And fix the wood floors -$1700  - Hunter

used on having the best house that you went a million dollars in debt - Dave

and then at the end of it all, all of your stuff gets stolen from you - SinkingSailor

Buy iPhone XR MAX PLUS PRO 2tb,    -$4000                               - Dave
Buy the headphone dongle,    -$45                                       - Dave
Buy the charger,    -$55                                                - Dave
Buy the charger brick that should be included with the charger,    -$60 - Dave
Buy the air pods,    -$235                                              - Dave
Sell the useless headphone dongle,    +$10                              - Dave
Buy the Bluetooth adapter

*/