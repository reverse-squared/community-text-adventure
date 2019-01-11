import React from "react";
import { addScenes } from "../../src/js/ending.jsx";

addScenes({
    make_omelette: {
        prompt: () => <div>
            <p>You make yourself an omelette. You heard on the news that they have a lot of protein in them. You are proud of yourself. You are part of the 25% of Americans
                <b>who aren't</b> overweight.
            </p>
        </div>,
        options: [
            { text: "Next.", to: "omelette_ending_1" },
        ],
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    },
    omelette_ending_1: {
        prompt: () => <div>
            <p>The omelet is a breakfast classic!  Protein-rich eggs delicately cooked with a variety of tantalizing ingredients and folded into a pillow of tasty goodness, omelets are usually a top seller at restaurants.  With so many ways to make this favorite dish, your question is a good one to ask. </p>
        </div>,
        options: [
            { text: "Next.", to: "omelette_ending_2" },
        ],
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    },
    omelette_ending_2: {
        prompt: () => <div>
            <p>The first question that usually comes up when it comes to omelets and eggs is whether or not egg whites are healthier than whole eggs.  Egg whites can be a lower fat, calorie and cholesterol option for protein, but the yolk of a whole egg holds many of the vitamins and minerals.  Choose the option that works best for your tastes and dietary needs when ordering an omelet.</p>
        </div>,
        options: [
            { text: "Next.", to: "omelette_ending_3" },
        ],
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    },
    omelette_ending_3: {
        prompt: () => <div>
            <p>Beyond the eggs themselves, follow these dietitian tips for ordering the healthiest omelet:</p>
            <ul>
                <li>Include veggies – A wide variety of vegetables, including bell peppers, onions, zucchini, tomatoes, artichokes and more, can add flavor and nutrition to your omelet.</li>
                <li>Request less cheese – Omelets are known for being loaded with gooey cheese.  Requesting less or none at all can help cut down on calories and saturated fat.</li>
                <li>Opt for lean meats – Lean meats such as ham, turkey bacon or sausage and Canadian bacon in small servings can all be lower fat and calorie choices to add more flavor to your omelet.</li>
                <li>Pair them well – Whole grain toast and fresh fruit can help round out your meal.  These sides add filling fiber, vitamins and minerals to your healthy diet.</li>
            </ul>
        </div>,
        options: [
            { text: "Next.", to: "omelette_ending_4" },
        ],
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    },
    omelette_ending_4: {
        prompt: () => <div>
            <p>The fluffy omelette is a refined version of an ancient food. According to Alan Davidson, the French word omelette came into use during the mid-16th century, but the versions alumelle and alumete are employed by the Ménagier de Paris (II, 5) in 1393. Rabelais (Pantagruel, IV, 9) mentions an homelaicte d'oeufs,    Olivier de Serres an amelette, François Pierre La Varenne's Le cuisinier françois (1651) has aumelette, and the modern omelette appears in Cuisine bourgoise (1784).</p>
            <p>According to the founding legend of the annual giant Easter omelette of Bessières, Haute-Garonne, when Napoleon Bonaparte and his army were traveling through southern France, they decided to rest for the night near the town of Bessières. Napoleon feasted on an omelette prepared by a local innkeeper, and thought it was a culinary delight. He then ordered the townspeople to gather all the eggs in the village and to prepare a huge omelette for his army the next day.</p>
        </div>,
        options: [
            { text: "Next.", to: "omelette_ending_5" },
        ],
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    },
    omelette_ending_5: {
        prompt: () => <div>
            <p>On March 19, 1994, the largest omelette (128.5 m2, 1,383 sq ft) in the world at the time was made with 160,000 eggs in Yokohama, Japan, but was subsequently overtaken by another, weighing 2,950 kilograms (6,500 lb), made by the Canadian Lung Association at the Brockville Memorial Centre in Brockville, Ontario, Canada, on May 11, 2002. In turn, that record was surpassed on August 11, 2012, by an omelette cooked by the Ferreira do Zêzere City Council in Santarém, Portugal. This record-breaking omelette weighed 6,466 kg (14,255 lb), and required 145,000 eggs and a 10.3-metre (34 ft) diameter pan.</p>
        </div>,
        options: [
            { text: "Next.", to: "omelette_ending_final" },
        ],
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    },
    omelette_ending_final: {
        prompt: () => <div>
            <p>After reading all of this, you feel really good about yourself. You tell all your friends and you even ate an entire cake and 5 brownies to celebrate your
                healthy decision.
            </p>
        </div>,
        ending: {
            id: "omelette",
            name: "Making Food",
            description: "Prepare, cook, and eat a healthy omelette.",
        },
        contributor: "Colyderp (Idea) and Hunter (Facts)"
    }
});
