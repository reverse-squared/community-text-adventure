import React from "react";
import { addFlag, addScenes } from "web-text-adventure";
import { RainbowCircleText } from "../styles.jsx";

addFlag("loanMoney", -4313);
addFlag("loanTurns", 31);
addFlag("loanBills1", [false,false,false]);
addFlag("loanBills2", [false,false]);
addFlag("loanGroceries", [false,false,false,false,false,false,false,false,false,false,false,false])
addFlag("loanBills3", [false,false,false,false,false]);
addFlag("loanIPhone", false);
addFlag("loanWindows", false);
addFlag("loanWindowsSoldOut", false);

const displayMoney = (num) => {
    if(num < 0) return "-$" + (-num);
    return "$" + num;
};

const LoanHeader = () => <div>
    <p className={"loan-header " + (loanTurns < 10 ? "loan-header-low" : "")}>
        Money: <strong>{displayMoney(loanMoney)}</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
    </p>
</div>;

const decreaseTurn = () => loanTurns--;

function checkAllBought(array)  {
    for(i = 0; i < array.length; i++) {
        if(!array[i]) {
            return false;
        }
    }
    return true;
}

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
            { text: "Pay your bills", to: "loan_paybills" },
            { text: "Invest in some BitCoin", to: "loan_bitcoin" },
            { text: "Invest in some something else", to: "" },
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
            { text: "Buy an iPhone (-$4000)", disabledText: "Buy an iPhone (Purchased)", if: () => !loanIPhone, to: "loan_paybills_iphone", action: () => loanMoney -= 4000 },
        ],
        action: decreaseTurn,
        contributor: "many people"
    },
    loan_paybills_iphone: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                It looks like the <RainbowCircleText string="iPhone XSR Max Plus Deluxe Pro" /> just came out, so you bought the first in stock.
            </p>
        </div>,
        options: [
            { text: "Buy the headphone jack adapter (-$10)", to: "loan_paybills_iphone", if: () => !loanBills3[0], action: () => { loanMoney -= 10; loanBills3[0] = true; } },
            { text: "Buy the charger (-$55)", to: "loan_paybills_iphone", if: () => !loanBills3[1], action: () => { loanMoney -= 55; loanBills3[1] = true; } },
            { text: "Buy the charger brick (-$60)", to: "loan_paybills_iphone", if: () => !loanBills3[2] && loanBills3[1], action: () => { loanMoney -= 60; loanBills3[2] = true; } },
            { text: "Buy the new AirPods (-$235)", to: "loan_paybills_iphone", if: () => !loanBills3[3] && loanBills3[0], action: () => { loanMoney -= 235; loanBills3[3] = true; } },
            { text: "Sell the useless headphone jack adapter (+$2)", to: "loan_paybills_iphone", if: () => !loanBills3[4] && loanBills3[0] && loanBills3[3], action: () => { loanMoney += 2; loanBills3[4] = true; } },
            "seperator",
            { text: () => <span>Leave Apple Store <span style={{opacity: "0.5"}}>(without buying all the stuff)</span></span>, to: "loan_paybills8", if: () => !loanBills1.reduce((x,y) => x && y, true) },
            { text: () => <span>Leave Apple Store</span>, to: "loan_paybills8", if: () => loanBills1.reduce((x, y) => x && y, true) },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills_groceries: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You will take the entire stock of the store.
            </p>
        </div>,
        options: [
            { text: "Buy All The Eggs (-$5543)", to: "loan_paybills_groceries", action: () => { loanMoney -= 5543; loanGroceries[0] = true; } , if: () => !loanGroceries[0] },
            { text: "Buy All The Salad (-$4234)", to: "loan_paybills_groceries", action: () => { loanMoney -= 4234; loanGroceries[1] = true; }, if: () => !loanGroceries[1] },
            { text: "Buy All The Cookies (-$2445)", to: "loan_paybills_groceries", action: () => { loanMoney -= 2445; loanGroceries[2] = true; }, if: () => !loanGroceries[2] },
            { text: "Buy All The Bleach (-$12137)", to: "loan_paybills_groceries", action: () => { loanMoney -= 12137; loanGroceries[3] = true; }, if: () => !loanGroceries[3] },
            { text: "Buy All The Pepsi (-$1245)", to: "loan_paybills_groceries", action: () => { loanMoney -= 1245; loanGroceries[4] = true; }, if: () => !loanGroceries[4] },
            { text: "Buy All The TVs (-$74633583)", to: "loan_paybills_groceries", action: () => { loanMoney -= 74633583; loanGroceries[5] = true; }, if: () => !loanGroceries[5] },
            { text: "Buy All The Candy (-$23585)", to: "loan_paybills_groceries", action: () => { loanMoney -= 23585; loanGroceries[6] = true; }, if: () => !loanGroceries[6] },
            { text: "Buy All The Poptarts (-$854)", to: "loan_paybills_groceries", action: () => { loanMoney -= 854; loanGroceries[7] = true; }, if: () => !loanGroceries[7] },
            { text: "Buy All The Milk (-$482)", to: "loan_paybills_groceries", action: () => { loanMoney -= 482; loanGroceries[8] = true; }, if: () => !loanGroceries[8] },
            { text: "Buy All The Bouncy Balls (-$474034)", to: "loan_paybills_groceries", action: () => { loanMoney -= 474034; loanGroceries[9] = true; }, if: () => !loanGroceries[9] },
            { text: "Buy All The Thing Inventor (-$89347598759832754093740923759027359834)", to: "loan_paybills_groceries", action: () => { loanMoney -= 89347598759832754093740923759027359834; loanGroceries[10] = true; }, if: () => !loanGroceries[10] },
            { text: "Buy All The Dog Toys (-$1)", to: "loan_paybills_groceries  ", action: () => { loanMoney -= 1; loanGroceries[11] = true; }, if: () => !loanGroceries[11] },
            { text: "Leave", to: "leaveStore", if: () => loanGroceries },
            
        ],
        action: decreaseTurn,
        contributor: "Hunter",
        action: () => {
            loanIPhone = true;
            decreaseTurn();
        },
        contributor: "Dave"
    },
    loan_paybills_windows: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                After replacing the windows on your house, you notice your neighbour has more windows than you. <strong>Do you buy more windows?</strong>
            </p>
        </div>,
        options: [
            { text: "Oh hell yeah. (-$1500)", to: "loan_paybills_windows_buymore", action: () => loanMoney -= 1500 },
            { text: "No.", to: "" },
            { text: "Smash neighbour's windows.", to: "loan_paybills_smashwindow" },
        ],
        action: () => {
            loanWindows = true;
            decreaseTurn();
        }
    },
    loan_paybills_windows_buymore: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows...
            </p>
        </div>,
        options: [
            { text: "More Windows (-$1500)", to: "loan_paybills_windows_buymore2", action: () => loanMoney -= 1500 },
            { text: "Return Home", to: "loan_paybills8" }
        ]
    },
    loan_paybills_windows_buymore2: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows... There is a shortage of windows so the price has been marked up.
            </p>
        </div>,
        options: [
            { text: "More Windows (-$3500)", to: "loan_paybills_windows_buymore3", action: () => loanMoney -= 3500 },
            { text: "Return Home", to: "loan_paybills8" }
        ],
        action: decreaseTurn
    },
    loan_paybills_windows_buymore3: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows... The Window Store has run out of windows.
            </p>
        </div>,
        options: [
            { text: "Return Home", to: "loan_paybills8" }
        ],
        action: () => {
            loanWindowsSoldOut = true;
            decreaseTurn();
        }
    }
});

// todo
/*

used on having the best house that you went a million dollars in debt - Dave

and then at the end of it all, all of your stuff gets stolen from you - SinkingSailor

*/