// This file handles the different paths from the loan of $4313 that you need to pay off
import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { FlashText } from "@templates/FontStyles";
import { addScenes } from "@src/ending";

addFlag("loanMoney", -4313);
addFlag("loanTurns", 31);

addFlag("askedOldMan", false);
addFlag("askedLawyer", false);
addFlag("askedTeen", false);

export const LoanHeader = () => <div>
    <p className={"loan-header " + (loanTurns < 10 ? "loan-header-low" : "")}>
        Money: <strong>{formatMoney(loanMoney)}</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
    </p>
</div>;

export const decreaseTurn = () => {
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

export const formatMoney = (num) => {
    num = (Math.round(num * 100) / 100);
    if(num < 0) return "-$" + (-num);
    return "$" + num;
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
            { text: "Pass Go and Pickup $200", to: "monopoly_200_ending", if: () => collect200 }
        ],
        action: decreaseTurn,
        contributor: "Dave and Hunter"
    },
    loan_back_to_hospital: {
        prompt: () => <div>
            <p>You walk back into the hospital with the possibility that someone will pay off your loan for you. Who do you ask first.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842", to: "loan_old_man", disabledText: "The old man in room 842", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629", to: "loan_teen", disabledText: "The teenager who broke her leg in 629", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_lawyer: {
        prompt: () => <div>
            <p>The lawyer kept talking totally disregarding you.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842", to: "loan_old_man", disabledText: "The old man in room 842", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629", to: "loan_teen", disabledText: "The teenager who broke her leg in 629", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_old_man: {
        prompt: () => <div>
            <p>The old man was sleeping so you left him alone.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842", to: "loan_old_man", disabledText: "The old man in room 842", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629", to: "loan_teen", disabledText: "The teenager who broke her leg in 629", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_teen: {
        prompt: () => <div>
            <p>"dONt TAlK tO mE UnTIl I HaD MY CoFFeE," she says. You leave the room pretending you heard and saw nothing.</p>
        </div>,
        options: [
            { text: "The lawyer talking to the receptionist", to: "loan_lawyer", disabledText: "The lawyer talking to the receptionist", action: () => askedLawyer = true, if: () => !askedLawyer },
            { text: "The old man in room 842", to: "loan_old_man", disabledText: "The old man in room 842", action: () => askedOldMan = true, if: () => !askedOldMan },
            { text: "The teenager who broke her leg in 629", to: "loan_teen", disabledText: "The teenager who broke her leg in 629", action: () => askedTeen = true, if: () => !askedTeen },
            { text: "Je🅱us in room ∞", to: "loan_jebus" },
        ],
        contributor: "Hunter"
    },
    loan_jebus: {
        prompt: () => <div>
            <p>You enter the elevator to go to the highly talked about Je🅱us. All your friends say that he helped them, so he must help you.</p>
            <p>You arrive in Je🅱us' office and he offers you to pay your loan. He gives you the...
            </p>
            <p>
                <FlashText string="All Holy, Brand New 2019, One of a Kind, Premium, Limited Edition, Never Seen Before, Deluxe Pro Plus, Version 2019.2a CC... Dank 🅱 Emoji" />
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
    },
    monopoly_200_ending: {
        prompt: () => <div>
            <LoanHeader />
            <p>Oh look at that. There's $200 dollars on the ground. How crazy. Do you pick it up?</p>
        </div>,
        options: [
            { text: "Yes", to: "luck_ending" },
            { text: "No", to: "loan_main", action: () => collect200 = false }
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    luck_ending: {
        prompt: () => <div>
            <p>You pickup the $200 and keep it for yourself. It didn't pay off your loan, but you were lucky!</p>
        </div>,
        ending: {
            id: "lucky-guy",
            name: "Lucky Guy",
            description: "So lucky, you found $200 laying on the ground just by passing go.",
        },
        contributor: "Hunter"
    }
});
