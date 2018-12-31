import React from 'react';
import { addFlag, addScenes } from 'web-text-adventure';

addFlag("loanMoney", -4313);
addFlag("loanTurns", 30);
addFlag("loanBills1", [false,false,false]);

const displayMoney = (num) => {
    if(num < 0) return "-$" + (-num);
    return "$" + num;
}

const LoanHeader = () => <div>
    <p className="loan-header">
        Money: <strong>{displayMoney(loanMoney)}</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
    </p>
</div>

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
        contributor: "Hunter Parcells"
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
        contributor: "Hunter Parcells"
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
        contributor: "Hunter Parcells"
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
            // { text: "Pay More Shipping (-$0.50)", disabledText: true, to: "", if: () => false },
            // { text: "Pay Handling (-$0.45)", to: "loan_paybills5", action: () => loanMoney -= 98 },
        ],
        contributor: "Hunter Parcells"
    }
});

// todo
/*

half off  - Hunter

Also you might wanna repaint the place -$500   - Hunter
And fix the wood floors -$1700  - Hunter

Turns into a renovation simulator - Hunter

You got so focused on having the best house that you went a million dollars in debt - Dave

and then at the end of it all, all of your stuff gets stolen from you - SinkingSailor

Buy iPhone XR MAX PLUS PRO 2tb,    -$4000                               - Dave
Buy the headphone dongle,    -$45                                       - Dave
Buy the charger,    -$55                                                - Dave
Buy the charger brick that should be included with the charger,    -$60 - Dave
Buy the air pods,    -$235                                              - Dave
Sell the useless headphone dongle,    +$10                              - Dave

*/