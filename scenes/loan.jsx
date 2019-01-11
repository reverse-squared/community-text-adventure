// This file handles the different paths from the loan of $4313 that you need to pay off
import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { RainbowCircleText, RainbowText } from "../templates/font-styles.jsx";
import { addScenes } from "../src/js/ending.jsx";

addFlag("loanMoney", -4313);
addFlag("loanTurns", 31);
addFlag("loanBills1", [false,false,false]);
addFlag("loanBills2", [false,false]);
addFlag("loanGroceries", [false,false,false,false,false,false,false]);
addFlag("loanBills3", [false,false,false,false,false]);
addFlag("loanIPhone", false);
addFlag("loanWindows", false);
addFlag("loanWindowsSoldOut", false);
addFlag("loan_visitedStore", false);

addFlag("loan_bitcoin", 0);
addFlag("loan_walletcash", 50);
addFlag("loan_initial_deposit", 0);
addFlag("loan_payloan", false);

addFlag("askedOldMan", false);
addFlag("askedLawyer", false);
addFlag("askedTeen", false);

// amount of Bitcoin you get per one cash
const BTC_EXCHANGES = [
    5, // loanTurns===30
    5, // loanTurns===29 (initial deposit)
    5, // loanTurns===28
    4.99999, // loanTurns===27
    4.9951, // loanTurns===26
    4.9523, // loanTurns===25
    4.571364,
    4.216314,
    3.221634,
    5.256134,
    4.21761, // loanTurns===20
    10.25152,
    8.521523,
    3.3315253,
    1.95152,
    1.401532,
    0.31521523,
    0.112531253,
    0.01152532,
    0.001512532,
    0.000521525, // loanTurns===10
    0.000245123,
    0.00055213,
    0.0003643,
    0.055231523,
    0.075213,
    0.0054123,
    0.001852,
    0.0041,
    0.000000000000000111111111111111115, // :joy:
];

function cashToBTC(cash) {
    return cash * BTC_EXCHANGES[30 - loanTurns];
}
function btcToCash(btc) {
    return btc / BTC_EXCHANGES[30 - loanTurns];
}

const formatMoney = (num) => {
    num = (Math.round(num * 100) / 100);
    if(num < 0) return "-$" + (-num);
    return "$" + num;
};
const formatBTC = (num) => {
    return (Math.floor(num * 500) / 500) + " BTC";
};

const LoanHeader = () => <div>
    <p className={"loan-header " + (loanTurns < 10 ? "loan-header-low" : "")}>
        Money: <strong>{formatMoney(loanMoney)}</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
    </p>
</div>;

const LoanBTCHeader = () => <div>
    <p className={"loan-header " + (loanTurns < 10 ? "loan-header-low" : "")} style={{ marginBottom: "10px" }}>
        You need to pay off a loan of <strong>$4313</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
    </p>
    <div className="bitcoin-status">
        <p>You have <strong>{formatMoney(loan_walletcash)}</strong> cash, and <strong>{formatBTC(loan_bitcoin)}</strong></p>
    </div>
    <div className="bitcoin-exchange" style={{ marginTop: "0" }}>
        <h3 style={{ marginTop: "0" }}>BTC Exchange Rate</h3>
        <p>
            <strong>$1</strong> --> <strong>{formatBTC(cashToBTC(1))} BTC</strong><br />
            <strong>1 BTC</strong> --> <strong>{formatMoney(btcToCash(1))}</strong><br />
        </p>
    </div>
</div>;

const decreaseTurn = () => {
    loanTurns--;
    if(loanTurns <= 0) {
        if (loan_initial_deposit > 0) {
            
            if(loan_walletcash >= 4313 || loan_payloan) {
                if(loan_walletcash>=1000000000) {
                    setScene("loan_bitcoin_win");
                } else {
                    setScene("loan_bitcoin_win_sortof");
                }
            } else {
                setScene("loan_bitcoin_lose");
            }
            // Bit Coin
        } else {
            // Lose
            if(loanBills1[0]) {
                // spend more money, go 500k in debt.
                setScene("loan_debt_house_ending");
            } else {
                // unknown situation
                setScene("loan_lose_generic");
            }
        }
    }
};

addScenes({
    loan_start: {
        prompt: () => <div>
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
            { text: "Invest in some Bitcoin", to: "loan_bitcoin" },
            { text: "Go back to the hospital", to: "loan_back_to_hospital" },
        ],
        action: decreaseTurn,
        contributor: "Dave and Hunter"
    },
    loan_bitcoin: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You go to your local <span style={{ color: "orange" }}>Bitcoin Store</span>, you are going to be able to spend up to $50 of your cash on Bitcoin. How much should you start off doing.
            </p>
        </div>,
        options: [
            { text: "$50", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 50 },
            { text: "$40", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 40 },
            { text: "$30", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 30 },
            { text: "$20", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 20 },
            { text: "$10", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 10 },
            { text: "$5", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 5 },
        ],
        action: decreaseTurn,
        contributor: "Dave"
    },
    loan_bitcoin_initial_dep: {
        prompt: () => <div>
            <p>
                You trade ${loan_initial_deposit} for {formatBTC(cashToBTC(loan_initial_deposit))} as an initial deposit.
            </p>
        </div>,
        options: [
            { text: "Okay", to: "loan_bitcoin_main"}
        ],
        action: () => {
            // process and set some new variables
            decreaseTurn();

            loan_bitcoin = cashToBTC(loan_initial_deposit);
            loan_walletcash = 50 - loan_initial_deposit;
        },
        contributor: "Dave"
    },
    loan_bitcoin_main: {
        prompt: () => <div>
            <LoanBTCHeader />
            
            <p>
                What do you do now?
            </p>
        </div>,
        options: [
            { text: "Trade $$ --> BTC", to: "loan_bitcoin_deposit"},
            { text: "Trade BTC --> $$", to: "loan_bitcoin_withdraw"},
            { text: "Wait", to: "loan_bitcoin_main"},
            "seperator",
            {
                text: "Pay Loan (-$4313)",
                disabledText: () => {
                    if(loan_payloan) {
                        return "Pay Loan (Purchased)";
                    } else {
                        return "Pay Loan (-$4313)";
                    }
                },
                action: () => loan_payloan = true,
                to: "loan_bitcoin_main",
                if:() => (loan_walletcash > 4313 && !loan_payloan)
            }
        ],
        action: decreaseTurn,
        contributor: "Dave"
    },
    loan_bitcoin_deposit: {
        prompt: ()=> <div>
            <LoanBTCHeader />
            <p>
                You want to exchange cash for Bitcoin. How much?
            </p>
        </div>,
        options: [
            { text: "Cancel", to: "loan_bitcoin_main"},
            "seperator",
            { text: "", disabledText: () => (loan_walletcash < 1) ? "(You need at least $1 to buy bitcoin)" : null, if: () => false, to: "loan_bitcoin_main" },  
            ...[1, 2, 3, 4, 5, 10, 25, 50, 80, 100, 200, 300, 400, 500, 1000, 5000, 10000, 50000, 100000].map(cash => {
                return {
                    text: () => `${formatMoney(cash)} for ${formatBTC(cashToBTC(cash))}`,
                    action: () => {
                        loan_walletcash -= cash;
                        loan_bitcoin += cashToBTC(cash);
                    },
                    if: () => loan_walletcash >= cash,
                    to: "loan_bitcoin_main"
                };
            }),
        ],
        contributor: "Dave",
    },
    loan_bitcoin_withdraw: {
        prompt: ()=> <div>
            <LoanBTCHeader />
            <p>
                You want to exchange Bitcoins for cash. How much?
            </p>
        </div>,
        options: [
            { text: "Cancel", to: "loan_bitcoin_main"},
            "seperator",
            { text: "", disabledText: () => (loan_bitcoin < 0.5) ? "(You need at least 0.5 BTC to sell bitcoin)" : null, if: () => false, to: "loan_bitcoin_main" },  
            ...[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 250, 300, 350, 400, 450, 500, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(price => {
                return {
                    text: () => `${formatBTC(price)} for ${formatMoney(btcToCash(price))}`,
                    action: () => {
                        loan_walletcash += btcToCash(price);
                        loan_bitcoin -= price;
                    },
                    if: () => loan_bitcoin >= price,
                    to: "loan_bitcoin_main"
                };
            }),
        ],
        contributor: "Dave",
    },
    loan_bitcoin_lose: {
        prompt: () => <div>
            <p>You were not able to make enough money from Bitcoin to pay off the loan, and fell even farther into debt. First time huh?</p>

        </div>,
        ending: {
            id: "btc-lose",
            name: "Failed Investment",
            description: "Fail to get rich off of Bitcoin, and fail to pay your loan."
        },
        contributor: "Dave",
    },
    loan_bitcoin_win: {
        prompt: () => <div>
            <p>You got <span style={{fontWeight:"bold"}}><RainbowText string={formatMoney(loan_walletcash)} /></span> by investing in Bitcoin, and were able to pay off your loan. What a crazy thing.</p>
        </div>,
        ending: {
            id: "btc-win-billion",
            name: "Bitcoin Billionaire",
            description: "Pay off your loan by getting crazy rich off of Bitcoin."
        },
        contributor: "Dave",
    },
    loan_bitcoin_win_sortof: {
        prompt: () => <div>
            <p>You got <span style={{ fontWeight: "bold", color: "green" }}>{formatMoney(loan_walletcash)}</span> by investing in Bitcoin, and were able to pay off your loan.</p>
        </div>,
        ending: {
            id: "btc-win",
            name: "Bitcoin Success",
            description: "Pay off your loan by getting money from Bitcoin."
        },
        contributor: "Dave",
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
            { text: "Buy a new house (-$319,679)", disabledText: true, to: "BLANKSCENE", if: () => false },
            { text: "Pay Shipping (-$0.99)", disabledText: true, to: "BLANKSCENE", if: () => false },
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
            { text: "Buy another house (-$159,839)", to: "BLANKSCENE", disabledText: true, if: () => false },
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
            { text: "Buy another house (-$159,839)", to: "BLANKSCENE", disabledText: true, if: () => false },
            { text: "Pay More Shipping (-$0.50)", to: "BLANKSCENE", disabledText: true, if: () => false },
            { text: "Pay More Handling (-$0.45)", to: "loan_paybills_house", action: () => loanMoney -= 98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills_house: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You are now at your amazing new house, and realize how ugly it is.
            </p>
        </div>,
        options: [
            { text: "Repaint the walls (-$500)", disabledText: "Repaint the walls (Purchased)", to: "loan_paybills_house", if: () => !loanBills2[0], action: () => { loanBills2[0] = true; loanMoney -= 500; } },
            { text: "Fix the wood floors (-$1700)", disabledText: "Fix the wood floors (Purchased)", to: "loan_paybills_house", if: () => !loanBills2[1], action: () => { loanBills2[1] = true; loanMoney -= 1700; } },
            { text: "Replace the windows (-$1500)", disabledText: "Replace the windows (Purchased)", to: "loan_paybills_windows", if: () => !loanWindows,action: () => loanMoney -= 1500 },
            { text: "Go buy groceries", disabledText: "Go buy groceries (Purchased)", to: "loan_paybills_groceries", if: ()=> !loan_visitedStore,action: () => loanMoney -= 500 },
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
            { text: () => "Leave Apple Store", disabledText: true, to: "loan_paybills_house", if: () => loanBills3.reduce((x, y) => x && y, true) },
        ],
        action: () => {
            loanIPhone = true;
            decreaseTurn();
        },
        contributor: "Dave"
    },
    loan_paybills_groceries: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                {
                    loanGroceries.reduce((x, y) => x && y, true) 
                        ? <span>
                            You have <a href="https://youtu.be/D0NzFatmLCo">taken the entire stock</a> of the store.
                        </span>
                        : <span>
                            You enter the grocery store, and you decide to buy everything inside the shop, as your
                            new house is currently empty.
                        </span>
                }
            </p>
        </div>,
        options: [
            { text: "Buy all the Eggs (-$5543)", disabledText: "Buy all the Eggs (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 5543; loanGroceries[0] = true; } , if: () => !loanGroceries[0] },
            { text: "Buy all the Salad (-$4234)", disabledText: "Buy all the Salad (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 4234; loanGroceries[1] = true; }, if: () => !loanGroceries[1] },
            { text: "Buy all the Cookies (-$2445)", disabledText: "Buy all the Cookies (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 2445; loanGroceries[2] = true; }, if: () => !loanGroceries[2] },
            { text: "Buy all the Candy (-$23585)", disabledText: "Buy all the Candy (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 23585; loanGroceries[3] = true; }, if: () => !loanGroceries[3] },
            { text: "Buy all the Poptarts (-$854)", disabledText: "Buy all the Poptarts (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 854; loanGroceries[4] = true; }, if: () => !loanGroceries[4] },
            { text: "Buy all the Milk (-$482)", disabledText: "Buy all the Milk (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 482; loanGroceries[5] = true; }, if: () => !loanGroceries[5] },
            { text: "Buy all the Dog Toys (-$1)", disabledText: "Buy all the Dog Toys (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 1; loanGroceries[6] = true; }, if: () => !loanGroceries[6] },
            "seperator",
            { text: "Leave", disabledText: true, to: "loan_paybills_house", if: () => loanGroceries.reduce((x,y) => x&&y, true) },
            
        ],
        action: () => {
            loan_visitedStore = true;
            decreaseTurn();
        },
        contributor: "Hunter",
    },
    loan_paybills_windows: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                After replacing the windows on your house, you notice your neighbour has more windows than you. <strong>Do you buy more windows?</strong>
            </p>
        </div>,
        options: [
            { text: "Oh, hell yeah. (-$1500)", to: "loan_paybills_windows_buymore", action: () => loanMoney -= 1500 },
            { text: "No.", to: "loan_paybills_house" },
            { text: "Smash neighbour's windows.", to: "loan_paybills_smashwindow" },
        ],
        action: () => {
            loanWindows = true;
            decreaseTurn();
        },
        contributor: "Toshiyuki",
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
            { text: "Return Home", to: "loan_paybills_house" }
        ],
        contributor: "Toshiyuki",
    },
    loan_paybills_windows_buymore2: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows... there is a shortage of windows so the price of windows has been marked up.
            </p>
        </div>,
        options: [
            { text: "More Windows (-$3500)", to: "loan_paybills_windows_buymore3", action: () => loanMoney -= 3500 },
            { text: "Return Home", to: "loan_paybills_house" }
        ],
        action: decreaseTurn,
        contributor: "Toshiyuki",
    },
    loan_paybills_windows_buymore3: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows... the Window Store has run out of windows.
            </p>
        </div>,
        options: [
            { text: "Return Home", to: "loan_paybills_house" }
        ],
        action: () => {
            loanWindowsSoldOut = true;
            decreaseTurn();
        },
        contributor: "Toshiyuki",
    },
    loan_debt_house_ending: {
        prompt: () => <div>
            <p>
                Time's Up!
            </p>
            <p>
                Instead of trying to pay off the loan, you got so focused on having the best house
                that you went <strong style={{color:"red"}}>{formatMoney(-loanMoney)}</strong> into debt. You have been sent to jail for
                spending so much money, but at least you had fun in the moment.
            </p>
        </div>,
        ending: {
            id: "loan-500k debt",
            name: "500k in Debt",
            description: "Spend half a million dollars instead of paying your loan."
        },
        contributor: "Dave"
    },
    loan_paybills_smashwindow: {
        prompt: () => <div>
            <p>
                Despite being <strong style={{ color: "red" }}>{formatMoney(-loanMoney)}</strong> into debt, you smashed your neighbour's windows,
                and now they are suing you for the cost of repairs. Turns out they spent over ten million dollars on their windows, so you are definitely
                unable to pay off your loan...
            </p>
        </div>,
        options: [
            { text: "Pay for windows (-$10000000)", to: "loan_paybills_smashwindow_end" }
        ],
        contributor: "Dave"
    },
    loan_paybills_smashwindow_end: {
        prompt: () => <div>
            <p>
                Despite being <strong style={{ color: "red" }}>{formatMoney(-loanMoney)}</strong> into debt, you smashed your neighbour's windows,
                and now they are suing you for the cost of repairs. Turns out they spent over ten million dollars on their windows, so you are definitely
                unable to pay off your loan. You are now going to jail, forever, but at least you had fun in the moment.
            </p>
        </div>,
        ending: {
            id: "smash-window",
            name: "Smash Windows",
            description: "Smash your neighbour's $10,000,000 set of windows",
        },
        contributor: "Dave"
    },
    loan_back_to_hospital: {
        prompt: () => <div>
            <p>You walk back into the hospital with the possibility that someone will pay off your loan for you. Who do you ask first.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist.", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist.", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842.", to: "loan_old_man", disabledText: "The old man in room 842.", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629.", to: "loan_teen", disabledText: "The teenager who broke her leg in 629.", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞.", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_lawyer: {
        prompt: () => <div>
            <p>The lawyer kept talking totally disregarding you.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist.", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist.", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842.", to: "loan_old_man", disabledText: "The old man in room 842.", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629.", to: "loan_teen", disabledText: "The teenager who broke her leg in 629.", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞.", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_old_man: {
        prompt: () => <div>
            <p>The old man was sleeping so you left him alone.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist.", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist.", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842.", to: "loan_old_man", disabledText: "The old man in room 842.", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629.", to: "loan_teen", disabledText: "The teenager who broke her leg in 629.", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞.", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_teen: {
        prompt: () => <div>
            <p>"dONt TAlK tO mE UnTIl I HaD MY CoFFeE," she says. You leave the room pretending you heard and saw nothing.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist.", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist.", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842.", to: "loan_old_man", disabledText: "The old man in room 842.", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629.", to: "loan_teen", disabledText: "The teenager who broke her leg in 629.", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞.", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_jebus: {
        prompt: () => <div>
            <p>You enter the elevator to go to the highly talked about Je🅱us. All your friends say that he helped them, so he must help you.</p>
            <p>You arrive in Je🅱us' office and he offers you to pay your loan. He gives you the 
                <RainbowCircleText string="All Holy, Brand New 2019, One of a Kind, Premium, Limited Edition, Never Seen Before, Deluxe Pro Plus, All Natrual, Grass Fed, No GMO, Vegetarian, Feminist and Flat Earther Free, Version 2019.2a CC for Binbows 9... Dank B Emoji" />
            </p>
            <p>Maybe you can get some money for it.</p>
            <p className="inventory-update">
                + Added 🅱 to Inventory.
            </p>
        </div>,
        options: [
            { text: "Continue", to: "loan_jebus_2" }
        ],
        contributor: "Hunter and Dave"
    },
    loan_jebus_2: {
        prompt: () => <div>
            <p>You went to your local jewler, and he said you can get $258,394,798,753,983 for it. You agree and he gives you the money as long as you keep
                this transaction a secret.
            </p>
            <p>You had enough money to pay off your loan and live your dream life.</p>
        </div>,
        ending: {
            id: "jebus",
            name: "🅱",
            description: <div style={{ textAlign: "center" }}>🅱</div>
        },
        contributor: "Hunter"
    }
});

// todo
/*

used on having the best house that you went a million dollars in debt - Dave

and then at the end of it all, all of your stuff gets stolen from you - SinkingSailor

*/