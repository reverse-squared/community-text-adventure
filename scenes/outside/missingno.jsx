import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes, achieveEnding } from "@src/ending";

addScenes({
    missingno: {
        prompt: () => <div>
            <p>
                While saying it, he thinks you are MissingNo. He catches you in a attempt to get items.
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Durvenson"
    },
    missingno_yell: {
        prompt: () => <div>
            <p>
                He says it's not "Retard", its "Mentally Challenged"... He then proceeeds to yell AT you for using the wrong terminology in 2019.
            </p>
        </div>,
        ending: {
            id: "wrong-word",
            name: "It's 2019 Get it Right",
            description: "You can't be saying those words these days.",
        },
        contributor: "Hunter"
    },
    missingno_getout: {
        prompt: () => <div>
            <p>
                You got out of the pokeball, the guy notices and throws another pokeball, it traps you back inside.
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout2" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Dave"
    },
    missingno_getout2: {
        prompt: () => <div>
            <p>
                You got out of the pokeball, the guy notices and throws another pokeball, MissingNo was caught!
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout3" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Dave"
    },
    missingno_getout3: {
        prompt: () => <div>
            <p>
                You got out of the pokeball, the guy notices and throws another pokeball, and you get trapped!
            </p>
        </div>,
        options: [
            { text: "I AIN'T MISSINGNO YOU RETARD", to: "missingno_yell" },
            { text: "Get out of the pokeball", to: "missingno_getout4" },
            { text: "Chill in the pokeball", to: "missingno_chill" },
            { text: "Pretend to have fainted", to: "missingno_faint" },
        ],
        contributor: "Dave"
    },
    missingno_getout4: {
        prompt: () => <div>
            <p>
                Oh no he's out of balls. You escape.
            </p>
        </div>,
        ending: {
            id: "missingno-outofballs",
            name: "Ran out of Balls",
            description: "lmao he has no balls.",
        },
        contributor: "Dave"
    },
    missingno_chill: {
        prompt: () => <div>
            <p>
                You chill inside of the pokeball...
            </p>
        </div>,
        options: [
            { text: "Get out of the pokeball", to: "missingno_getout" },
        ],
        contributor: "Dave"
    },
    missingno_faint: {
        prompt: () => <div>
            <p>
                He doesn't want you now. He will send you to Professor Oak!
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Suicide", to: "missingno_suicide" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
            { text: "Do nothing", to: "missingno_nothing" },
        ],
        contributor: "Durvenson"
    },
    missingno_suicide: {
        prompt: () => <div>
            <p>
                <span style={{ color: "lime" }}>dev: im done adding suicide endings. chooose something else</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
            { text: "Do nothing", to: "missingno_nothing2" },
        ],
        contributor: "Dave"
    },
    missingno_suicide2: {
        prompt: () => <div>
            <p>
                <span style={{ color: "lime" }}>dev: im done adding suicide endings. chooose something else</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
        ],
        contributor: "Dave"
    },
    missingno_pretendvirus: {
        prompt: () => <div>
            <p>
                You pretend it's a virus, but since it actually is, you die.
            </p>
        </div>,
        ending: {
            id: "virusend",
            name: "Virus",
            description: "Don't pretend it's a virus when it actually is.",
        },
        contributor: "Dave"
    },
    missingno_nothing: {
        prompt: () => <div>
            <p>
                <span style={{ color: "gray" }}>.......</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
            { text: "Suicide", to: "missingno_suicide2" },
        ],
        contributor: "Dave"
    },
    missingno_nothing2: {
        prompt: () => <div>
            <p>
                <span style={{ color: "gray" }}>....</span>
            </p>
        </div>,
        options: [
            { text: "Pretend that it was a virus", to: "missingno_pretendvirus" },
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Look around for stuff", to: "missingno_look" },
        ],
        contributor: "Dave"
    },
    missingno_look: {
        prompt: () => <div>
            <p>
                Noice! You found a computer!
            </p>
        </div>,
        options: [
            { text: "Delete your entry in the pokedex", to: "missingno_deletepokedex" },
            { text: "Search on Google", to: "missingno_search" },
        ],
        contributor: "Durvenson"
    },
    missingno_search: {
        prompt: () => <div>
            <p>
                You search...
            </p>
        </div>,
        options: [
            { text: "how to escape a pokeball", to: "google_poke" },
            { text: "how to use google", to: "google_goolge" },
            { text: "how to make people not think that you are missingno", to: "google_missingno" },
            { text: "how to watch pornhub without anyone knowing", to: "google_pornhub" },
        ],
        contributor: "Durvenson"
    },
    google_poke: {
        prompt: () => <div>
            <p>
                It says you press the button to open a pokeball, but that only works when you're on the outside.
            </p>
        </div>,
        options: [
            { text: "how to escape a pokeball", to: null, if: () => false, disabledText: true },
            { text: "how to use google", to: "google_goolge" },
            { text: "how to make people not think that you are missingno", to: "google_missingno" },
            { text: "how to watch pornhub without anyone knowing", to: "google_pornhub" },
        ],
        contributor: "Durvenson"
    },
    google_goolge: {
        prompt: () => <div>
            <p>
                Someone catches you doing that and sends you to Preschool.
            </p>
        </div>,
        ending: {
            id: "googlprescofadsosdalkdsfafhsd",
            name: "Failed at Googling shit",
            description: "How the heck do you not know how to use google?",
        },
        contributor: "Durvenson"
    },
    google_missingno: {
        prompt: () => <div>
            <p>
                Somehow, the "missingno" made Google break. It sent you some random stuff. What do you click?
            </p>
        </div>,
        options: [
            { text: "bee movie meme xd", to: "meme_bee_end" },
            { text: "Potato", to: "gsearch_potato" },
            { text: "Community Text Adventure", to: "gsearch_cta" },
            { text: "Cary Teaches You How To Time Travel", to: "gsearch_timetravel" },
        ],
        contributor: "Durvenson"
    },
    gsearch_cta: {
        prompt: () => <div>
            <p>
                Your search ends up <a href="#" onClick={() => {
                    achieveEnding("recursion");
                    location.reload();
                }}>Here</a>.
            </p>
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        contributor: "Dave",
    },
    gsearch_cta_ending: {
        prompt: () => <div />,
        options: [],
        noContributor: true,
        excludeEmptyOptionsCheck: true,

        ending: {
            id: "recursion",
            name: "Recursion",
            description: "Go to CTA from CTA via a Google Search.",
        },
    },
    google_pornhub: {
        prompt: () => <div>
            <p>
                SafeSearch™™™™™™™™™™™™™™™™™™™™™™™™™™™ blocked that search.
            </p>
        </div>,
        ending: {
            id: "safe-search",
            name: "SafeSearch™",
            description: "Get blocked™ by™ (Safe™Search™)™.",
        },
        contributor: "Dave",
    },
    gsearch_potato: {
        prompt: () => <div>
            <p>
            The potato is a starchy, tuberous crop from the perennial nightshade Solanum tuberosum. In many contexts, potato refers to the edible tuber, but it can also refer to the plant itself.[2] Common or slang terms include tater, tattie and spud. Potatoes were introduced to Europe in the second half of the 16th century by the Spanish. Today they are a staple food in many parts of the world and an integral part of much of the world's food supply. As of 2014, potatoes were the world's fourth-largest food crop after maize (corn), wheat, and rice.[3]
            </p>
            <p>
            Wild potato species can be found throughout the Americas, from the United States to southern Chile.[4] The potato was originally believed to have been domesticated independently in multiple locations,[5] but later genetic testing of the wide variety of cultivars and wild species traced a single origin for potatoes. In the area of present-day southern Peru and extreme northwestern Bolivia, from a species in the Solanum brevicaule complex, potatoes were domesticated approximately 7,000–10,000 years ago.[6][7][8] In the Andes region of South America, where the species is indigenous, some close relatives of the potato are cultivated.
            </p>
            <p>
            Following millennia of selective breeding, there are now over 1,000 different types of potatoes.[7] Over 99% of presently cultivated potatoes worldwide descended from varieties that originated in the lowlands of south-central Chile, which have displaced formerly popular varieties from the Andes.[9][10]
            </p>
            <p>
            The importance of the potato as a food source and culinary ingredient varies by region and is still changing. It remains an essential crop in Europe, especially eastern and central Europe, where per capita production is still the highest in the world, while the most rapid expansion in production over the past few decades has occurred in southern and eastern Asia, with China and India leading the world in overall production as of 2014.
            </p>
            <p>
            Being a nightshade similar to tomatoes, the vegetative and fruiting parts of the potato contain the toxin solanine and are not fit for human consumption. Normal potato tubers that have been grown and stored properly produce glycoalkaloids in amounts small enough to be negligible to human health, but if green sections of the plant (namely sprouts and skins) are exposed to light, the tuber can accumulate a high enough concentration of glycoalkaloids to affect human health.[11][12]
            </p>
            <p>
            The English word potato comes from Spanish patata (the name used in Spain). The Spanish Royal Academy says the Spanish word is a hybrid of the Taíno batata (sweet potato) and the Quechua papa (potato).[13][14] The name originally referred to the sweet potato although the two plants are not closely related. The 16th-century English herbalist John Gerard referred to sweet potatoes as "common potatoes", and used the terms "bastard potatoes" and "Virginia potatoes" for the species we now call "potato".[15] In many of the chronicles detailing agriculture and plants, no distinction is made between the two.[16] Potatoes are occasionally referred to as "Irish potatoes" or "white potatoes" in the United States, to distinguish them from sweet potatoes.[15]
            </p>
            <p>
                The name spud for a small potato comes from the digging of soil (or a hole) prior to the planting of potatoes. The word has an unknown origin and was originally (c. 1440) used as a term for a short knife or dagger, probably related to the Latin "spad-" a word root meaning "sword"; cf. Spanish "espada", English "spade" and "spadroon". It subsequently transferred over to a variety of digging tools. Around 1845, the name transferred to the tuber itself, the first record of this usage being in New Zealand English.[17] The origin of the word "spud" has erroneously been attributed to an 18th-century activist group dedicated to keeping the potato out of Britain, calling itself The Society for the Prevention of Unwholesome Diet (S.P.U.D.). It was Mario Pei's 1949 The Story of Language that can be blamed for the word's false origin. Pei writes, "the potato, for its part, was in disrepute some centuries ago. Some Englishmen who did not fancy potatoes formed a Society for the Prevention of Unwholesome Diet. The initials of the main words in this title gave rise to spud." Like most other pre-20th century acronymic origins, this is false, and there is no evidence that a Society for the Prevention of Unwholesome Diet ever existed.[18][14]
            </p>
            <p>
            Potato plants are herbaceous perennials that grow about 60 cm (24 in) high, depending on variety, with the leaves dying back after flowering, fruiting and tuber formation. They bear white, pink, red, blue, or purple flowers with yellow stamens. In general, the tubers of varieties with white flowers have white skins, while those of varieties with colored flowers tend to have pinkish skins.[19] Potatoes are mostly cross-pollinated by insects such as bumblebees, which carry pollen from other potato plants, though a substantial amount of self-fertilizing occurs as well. Tubers form in response to decreasing day length, although this tendency has been minimized in commercial varieties.[20]
            </p>
            <p>
            After flowering, potato plants produce small green fruits that resemble green cherry tomatoes, each containing about 300 seeds. Like all parts of the plant except the tubers, the fruit contain the toxic alkaloid solanine and are therefore unsuitable for consumption. All new potato varieties are grown from seeds, also called "true potato seed", "TPS" or "botanical seed" to distinguish it from seed tubers. New varieties grown from seed can be propagated vegetatively by planting tubers, pieces of tubers cut to include at least one or two eyes, or cuttings, a practice used in greenhouses for the production of healthy seed tubers. Plants propagated from tubers are clones of the parent, whereas those propagated from seed produce a range of different varieties.
            </p>
            <p>
            There are about 5,000 potato varieties worldwide. Three thousand of them are found in the Andes alone, mainly in Peru, Bolivia, Ecuador, Chile, and Colombia. They belong to eight or nine species, depending on the taxonomic school. Apart from the 5,000 cultivated varieties, there are about 200 wild species and subspecies, many of which can be cross-bred with cultivated varieties. Cross-breeding has been done repeatedly to transfer resistances to certain pests and diseases from the gene pool of wild species to the gene pool of cultivated potato species. Genetically modified varieties have met public resistance in the United States and in the European Union.[21][22]
            </p>
            <p>
            The major species grown worldwide is Solanum tuberosum (a tetraploid with 48 chromosomes), and modern varieties of this species are the most widely cultivated. There are also four diploid species (with 24 chromosomes): S. stenotomum, S. phureja, S. goniocalyx, and S. ajanhuiri. There are two triploid species (with 36 chromosomes): S. chaucha and S. juzepczukii. There is one pentaploid cultivated species (with 60 chromosomes): S. curtilobum. There are two major subspecies of Solanum tuberosum: andigena, or Andean; and tuberosum, or Chilean.[23] The Andean potato is adapted to the short-day conditions prevalent in the mountainous equatorial and tropical regions where it originated; the Chilean potato, however, native to the Chiloé Archipelago, is adapted to the long-day conditions prevalent in the higher latitude region of southern Chile.[24]
            </p>
            <p>
            The International Potato Center, based in Lima, Peru, holds an ISO-accredited collection of potato germplasm.[25] The international Potato Genome Sequencing Consortium announced in 2009 that they had achieved a draft sequence of the potato genome.[26] The potato genome contains 12 chromosomes and 860 million base pairs, making it a medium-sized plant genome.[27] More than 99 percent of all current varieties of potatoes currently grown are direct descendants of a subspecies that once grew in the lowlands of south-central Chile.[28] Nonetheless, genetic testing of the wide variety of cultivars and wild species affirms that all potato subspecies derive from a single origin in the area of present-day southern Peru and extreme Northwestern Bolivia (from a species in the Solanum brevicaule complex).[6][7][8] The wild Crop Wild Relatives Prebreeding project encourages the use of wild relatives in breeding programs. Enriching and preserving the gene bank collection to make potatoes adaptive to diverse environmental conditions is seen as a pressing issue due to climate change.[29]
            </p>
            <p>
            Most modern potatoes grown in North America arrived through European settlement and not independently from the South American sources, although at least one wild potato species, Solanum fendleri, naturally ranges from Peru into Texas, where it is used in breeding for resistance to a nematode species that attacks cultivated potatoes. A secondary center of genetic variability of the potato is Mexico, where important wild species that have been used extensively in modern breeding are found, such as the hexaploid Solanum demissum, as a source of resistance to the devastating late blight disease.[30] Another relative native to this region, Solanum bulbocastanum, has been used to genetically engineer the potato to resist potato blight.[31]
            </p>
            <p>
            Potatoes yield abundantly with little effort, and adapt readily to diverse climates as long as the climate is cool and moist enough for the plants to gather sufficient water from the soil to form the starchy tubers. Potatoes do not keep very well in storage and are vulnerable to moulds that feed on the stored tubers and quickly turn them rotten, whereas crops such as grain can be stored for several years with a low risk of rot. The yield of Calories per acre (about 9.2 million) is higher than that of maize (7.5 million), rice (7.4 million), wheat (3 million), or soybean (2.8 million).[32]
            </p>
            <p>
            There are close to 4,000 varieties of potato including common commercial varieties, each of which has specific agricultural or culinary attributes.[33] Around 80 varieties are commercially available in the UK.[34] In general, varieties are categorized into a few main groups based on common characteristics, such as russet potatoes (rough brown skin), red potatoes, white potatoes, yellow potatoes (also called Yukon potatoes) and purple potatoes.
            </p>
            <p>
            For culinary purposes, varieties are often differentiated by their waxiness: floury or mealy baking potatoes have more starch (20–22%) than waxy boiling potatoes (16–18%). The distinction may also arise from variation in the comparative ratio of two different potato starch compounds: amylose and amylopectin. Amylose, a long-chain molecule, diffuses from the starch granule when cooked in water, and lends itself to dishes where the potato is mashed. Varieties that contain a slightly higher amylopectin content, which is a highly branched molecule, help the potato retain its shape after being boiled in water.[35] Potatoes that are good for making potato chips or potato crisps are sometimes called "chipping potatoes", which means they meet the basic requirements of similar varietal characteristics, being firm, fairly clean, and fairly well-shaped.[36]
            </p>
            <p>
            The European Cultivated Potato Database (ECPD) is an online collaborative database of potato variety descriptions that is updated and maintained by the Scottish Agricultural Science Agency within the framework of the European Cooperative Programme for Crop Genetic Resources Networks (ECP/GR)—which is run by the International Plant Genetic Resources Institute (IPGRI).[37]
            </p>
            <p>
            Dozens of potato cultivars have been selectively bred specifically for their skin or, more commonly, flesh color, including gold, red, and blue varieties[38] that contain varying amounts of phytochemicals, including carotenoids for gold/yellow or polyphenols for red or blue cultivars.[39] Carotenoid compounds include provitamin A alpha-carotene and beta-carotene, which are converted to the essential nutrient, vitamin A, during digestion. Anthocyanins mainly responsible for red or blue pigmentation in potato cultivars do not have nutritional significance, but are used for visual variety and consumer appeal.[40] Recently, as of 2010, potatoes have also been bioengineered specifically for these pigmentation traits.[41]
            </p>
            <p>
            Genetic research has produced several genetically modified varieties. 'New Leaf', owned by Monsanto Company, incorporates genes from Bacillus thuringiensis, which confers resistance to the Colorado potato beetle; 'New Leaf Plus' and 'New Leaf Y', approved by US regulatory agencies during the 1990s, also include resistance to viruses. McDonald's, Burger King, Frito-Lay, and Procter & Gamble announced they would not use genetically modified potatoes, and Monsanto published its intent to discontinue the line in March 2001.[42]
            </p>
            <p>
            Waxy potato varieties produce two main kinds of potato starch, amylose and amylopectin, the latter of which is most industrially useful. BASF developed the Amflora potato, which was modified to express antisense RNA to inactivate the gene for granule bound starch synthase, an enzyme which catalyzes the formation of amylose.[43] Amflora potatoes therefore produce starch consisting almost entirely of amylopectin, and are thus more useful for the starch industry. In 2010, the European Commission cleared the way for 'Amflora' to be grown in the European Union for industrial purposes only—not for food. Nevertheless, under EU rules, individual countries have the right to decide whether they will allow this potato to be grown on their territory. Commercial planting of 'Amflora' was expected in the Czech Republic and Germany in the spring of 2010, and Sweden and the Netherlands in subsequent years.[44] Another GM potato variety developed by BASF is 'Fortuna' which was made resistant to late blight by adding two resistance genes, blb1 and blb2, which originate from the Mexican wild potato Solanum bulbocastanum.[45][46] In October 2011 BASF requested cultivation and marketing approval as a feed and food from the EFSA. In 2012, GMO development in Europe was stopped by BASF.[47][48]
            </p>
            <p>
            In November 2014, the USDA approved a genetically modified potato developed by J.R. Simplot Company, which contains genetic modifications that prevent bruising and produce less acrylamide when fried than conventional potatoes; the modifications do not cause new proteins to be made, but rather prevent proteins from being made via RNA interference.[49][50][51]
            </p>
            <p>
            The potato was first domesticated in the region of modern-day southern Peru and extreme northwestern Bolivia[6] between 8000 and 5000 BC.[7] It has since spread around the world and become a staple crop in many countries.
            </p>
            <p>
            The earliest archaeologically verified potato tuber remains have been found at the coastal site of Ancon (central Peru), dating to 2500 BC.[52][53] The most widely cultivated variety, Solanum tuberosum tuberosum, is indigenous to the Chiloé Archipelago, and has been cultivated by the local indigenous people since before the Spanish conquest.[54][55]
            </p>
            <p>
            According to conservative estimates, the introduction of the potato was responsible for a quarter of the growth in Old World population and urbanization between 1700 and 1900.[56] Following the Spanish conquest of the Inca Empire, the Spanish introduced the potato to Europe in the second half of the 16th century, part of the Columbian exchange. The staple was subsequently conveyed by European mariners to territories and ports throughout the world. The potato was slow to be adopted by European farmers, but soon enough it became an important food staple and field crop that played a major role in the European 19th century population boom.[8] However, lack of genetic diversity, due to the very limited number of varieties initially introduced, left the crop vulnerable to disease. In 1845, a plant disease known as late blight, caused by the fungus-like oomycete Phytophthora infestans, spread rapidly through the poorer communities of western Ireland as well as parts of the Scottish Highlands, resulting in the crop failures that led to the Great Irish Famine.[30] Thousands of varieties still persist in the Andes however, where over 100 cultivars might be found in a single valley, and a dozen or more might be maintained by a single agricultural household.[57]
            </p>
            <p>
            In 2016, world production of potatoes was 377 million tonnes, led by China with over 26% of the world total (see table). Other major producers were India, Russia, Ukraine and the United States. It remains an essential crop in Europe (especially eastern and central Europe), where per capita production is still the highest in the world, but the most rapid expansion over the past few decades has occurred in southern and eastern Asia.[3][58]
            </p>
            <p>
            A raw potato is 79% water, 17% carbohydrates (88% is starch), 2% protein, and contains negligible fat (see table). In an amount measuring 100 grams (3.5 oz), raw potato provides 322 kilojoules (77 kilocalories) of energy and is a rich source of vitamin B6 and vitamin C (23% and 24% of the Daily Value, respectively), with no other vitamins or minerals in significant amount (see table). The potato is rarely eaten raw because raw potato starch is poorly digested by humans.[59] When a potato is baked, its contents of vitamin B6 and vitamin C decline notably, while there is little significant change in the amount of other nutrients.[60]
            </p>
            <p>
            Potatoes are often broadly classified as having a high glycemic index (GI) and so are often excluded from the diets of individuals trying to follow a low-GI diet. The GI of potatoes can vary considerably depending on the cultivar or cultivar category (such as "red", russet, "white", or King Edward), growing conditions and storage, preparation methods (by cooking method, whether it is eaten hot or cold, whether it is mashed or cubed or consumed whole), and accompanying foods consumed (especially the addition of various high-fat or high-protein toppings).[61] In particular, consuming reheated or cooled potatoes that were previously cooked may yield a lower GI effect.[61]
            </p>
            <p>
                In the UK, potatoes are not considered by the National Health Service (NHS) as counting or contributing towards the recommended daily five portions of fruit and vegetables, the 5-A-Day program.[62]
            </p>
            <p>
                This table shows the nutrient content of potatoes next to other major staple foods, each one measured in its respective raw state, even though staple foods are not commonly eaten raw and are usually sprouted or cooked before eating. In sprouted and cooked form, the relative nutritional and anti-nutritional contents of each of these grains (or other foods) may be different from the values in this table. Each nutrient (every row) has the highest number highlighted to show the staple food with the greatest amount in a 100-gram raw portion.
            </p>
            <p>
            Potatoes contain toxic compounds known as glycoalkaloids, of which the most prevalent are solanine and chaconine. Solanine is found in other plants in the same family, Solanaceae, which includes such plants as deadly nightshade (Atropa belladonna), henbane (Hyoscyamus niger) and tobacco (Nicotiana spp.), as well as the food plants eggplant and tomato. These compounds, which protect the potato plant from its predators, are generally concentrated in its leaves, flowers, sprouts, and fruits (in contrast to the tubers).[64] In a summary of several studies, the glycoalkaloid content was highest in the flowers and sprouts and lowest in the tuber flesh. (The glycoalkaloid content was, in order from highest to lowest: flowers, sprouts, leaves, skin[clarification needed], roots, berries, peel [skin plus outer cortex of tuber flesh], stems, and tuber flesh.)[11]
            </p>
            <p>
            Exposure to light, physical damage, and age increase glycoalkaloid content within the tuber.[12] Cooking at high temperatures—over 170 °C (338 °F)—partly destroys these compounds. The concentration of glycoalkaloids in wild potatoes is sufficient to produce toxic effects in humans. Glycoalkaloid poisoning may cause headaches, diarrhea, cramps, and, in severe cases, coma and death. However, poisoning from cultivated potato varieties is very rare. Light exposure causes greening from chlorophyll synthesis, giving a visual clue as to which areas of the tuber may have become more toxic. However, this does not provide a definitive guide, as greening and glycoalkaloid accumulation can occur independently of each other.
            </p>
            <p>
            Different potato varieties contain different levels of glycoalkaloids. The Lenape variety was released in 1967 but was withdrawn in 1970 as it contained high levels of glycoalkaloids.[65] Since then, breeders developing new varieties test for this, and sometimes have to discard an otherwise promising cultivar. Breeders try to keep glycoalkaloid levels below 200 mg/kg (200 ppmw). However, when these commercial varieties turn green, they can still approach solanine concentrations of 1000 mg/kg (1000 ppmw). In normal potatoes, analysis has shown solanine levels may be as little as 3.5% of the breeders' maximum, with 7–187 mg/kg being found.[66] While a normal potato tuber has 12–20 mg/kg of glycoalkaloid content, a green potato tuber contains 250–280 mg/kg and its skin has 1500–2200 mg/kg.[67]
            </p>
            <p>
            Potatoes are generally grown from seed potatoes, tubers specifically grown to be free from disease and to provide consistent and healthy plants. To be disease free, the areas where seed potatoes are grown are selected with care. In the US, this restricts production of seed potatoes to only 15 states out of all 50 states where potatoes are grown.[68] These locations are selected for their cold, hard winters that kill pests and summers with long sunshine hours for optimum growth. In the UK, most seed potatoes originate in Scotland, in areas where westerly winds prevent aphid attack and thus prevent spread of potato virus pathogens.[69][not in citation given]
            </p>
            <p>
            Potato growth is divided into five phases. During the first phase, sprouts emerge from the seed potatoes and root growth begins. During the second, photosynthesis begins as the plant develops leaves and branches. In the third phase, stolons develop from lower leaf axils on the stem and grow downwards into the ground and on these stolons new tubers develop as swellings of the stolon. This phase is often, but not always, associated with flowering. Tuber formation halts when soil temperatures reach 27 °C (81 °F); hence potatoes are considered a cool-season, or winter, crop.[70] Tuber bulking occurs during the fourth phase, when the plant begins investing the majority of its resources in its newly formed tubers. At this phase, several factors are critical to a good yield: optimal soil moisture and temperature, soil nutrient availability and balance, and resistance to pest attacks. The fifth and final phase is the maturation of the tubers: the plant canopy dies back, the tuber skins harden, and the sugars in the tubers convert to starches.[71]
            </p>
            <p>
            New tubers may start growing at the surface of the soil. Since exposure to light leads to an undesirable greening of the skins and the development of solanine as a protection from the sun's rays, growers cover surface tubers. Commercial growers cover them by piling additional soil around the base of the plant as it grows (called "hilling" up, or in British English "earthing up"). An alternative method, used by home gardeners and smaller-scale growers, involves covering the growing area with organic mulches such as straw or plastic sheets.[71]
            </p>
            <p>
            Correct potato husbandry can be an arduous task in some circumstances. Good ground preparation, harrowing, plowing, and rolling are always needed, along with a little grace from the weather and a good source of water.[72] Three successive plowings, with associated harrowing and rolling, are desirable before planting. Eliminating all root-weeds is desirable in potato cultivation. In general, the potatoes themselves are grown from the eyes of another potato and not from seed. Home gardeners often plant a piece of potato with two or three eyes in a hill of mounded soil. Commercial growers plant potatoes as a row crop using seed tubers, young plants or microtubers and may mound the entire row. Seed potato crops are rogued in some countries to eliminate diseased plants or those of a different variety from the seed crop.
            </p>
            <p>
                Potatoes are sensitive to heavy frosts, which damage them in the ground. Even cold weather makes potatoes more susceptible to bruising and possibly later rotting, which can quickly ruin a large stored crop.
            </p>
            <p>
            The historically significant Phytophthora infestans (late blight) remains an ongoing problem in Europe[30][73] and the United States.[74] Other potato diseases include Rhizoctonia, Sclerotinia, black leg, powdery mildew, powdery scab and leafroll virus.
            </p>
            <p>
            Insects that commonly transmit potato diseases or damage the plants include the Colorado potato beetle, the potato tuber moth, the green peach aphid (Myzus persicae), the potato aphid, beet leafhoppers, thrips, and mites. The potato cyst nematode is a microscopic worm that thrives on the roots, thus causing the potato plants to wilt. Since its eggs can survive in the soil for several years, crop rotation is recommended.
            </p>
            <p>
            During the crop year 2008, many of the certified organic potatoes produced in the United Kingdom and certified by the Soil Association as organic were sprayed with a copper pesticide[75] to control potato blight (Phytophthora infestans).[76] According to the Soil Association, the total copper that can be applied to organic land is 6 kg/ha/year.[77]
            </p>
            <p>
            According to an Environmental Working Group analysis of USDA and FDA pesticide residue tests performed from 2000 through 2008, 84% of the 2,216 tested potato samples contained detectable traces of at least one pesticide. A total of 36 unique pesticides were detected on potatoes over the 2,216 samples, though no individual sample contained more than 6 unique pesticide traces, and the average was 1.29 detectable unique pesticide traces per sample. The average quantity of all pesticide traces found in the 2,216 samples was 1.602 ppm. While this was a very low value of pesticide residue, it was the highest amongst the 50 vegetables analyzed.[78]
            </p>
            <p>
            At harvest time, gardeners usually dig up potatoes with a long-handled, three-prong "grape" (or graip), i.e., a spading fork, or a potato hook, which is similar to the graip but with tines at a 90° angle to the handle. In larger plots, the plow is the fastest implement for unearthing potatoes. Commercial harvesting is typically done with large potato harvesters, which scoop up the plant and surrounding earth. This is transported up an apron chain consisting of steel links several feet wide, which separates some of the dirt. The chain deposits into an area where further separation occurs. Different designs use different systems at this point. The most complex designs use vine choppers and shakers, along with a blower system to separate the potatoes from the plant. The result is then usually run past workers who continue to sort out plant material, stones, and rotten potatoes before the potatoes are continuously delivered to a wagon or truck. Further inspection and separation occurs when the potatoes are unloaded from the field vehicles and put into storage.
            </p>
            <p>
                Immature potatoes may be sold as "creamer potatoes" and are particularly valued for taste. These are often harvested by the home gardener or farmer by "grabbling", i.e. pulling out the young tubers by hand while leaving the plant in place. A creamer potato is a variety of potato harvested before it matures to keep it small and tender. It is generally either a Yukon Gold potato or a red potato, called gold creamers[79] or red creamers respectively, and measures approximately 1 inch (2.5 cm) in diameter.[80] The skin of creamer potatoes is waxy and high in moisture content, and the flesh contains a lower level of starch than other potatoes. Like potatoes in general, they can be prepared by boiling, baking, frying, and roasting.[80] Slightly older than creamer potatoes are "new potatoes", which are also prized for their taste and texture and often come from the same varieties.[81]
            </p>
            <p>
            Potatoes are usually cured after harvest to improve skin-set. Skin-set is the process by which the skin of the potato becomes resistant to skinning damage. Potato tubers may be susceptible to skinning at harvest and suffer skinning damage during harvest and handling operations. Curing allows the skin to fully set and any wounds to heal. Wound-healing prevents infection and water-loss from the tubers during storage. Curing is normally done at relatively warm temperatures 50 to 60 °F (10 to 16 °C) with high humidity and good gas-exchange if at all possible.[82]
            </p>
            <p>
            Storage facilities need to be carefully designed to keep the potatoes alive and slow the natural process of decomposition, which involves the breakdown of starch. It is crucial that the storage area is dark, ventilated well and, for long-term storage, maintained at temperatures near 4 °C (39 °F). For short-term storage, temperatures of about 7 to 10 °C (45 to 50 °F) are preferred.[83]
            </p>
            <p>
            On the other hand, temperatures below 4 °C (39 °F) convert the starch in potatoes into sugar, which alters their taste and cooking qualities and leads to higher acrylamide levels in the cooked product, especially in deep-fried dishes. The discovery of acrylamides in starchy foods in 2002 has led to international health concerns. They are believed to be probable carcinogens and their occurrence in cooked foods is being studied for potentially influencing health problems.[a][84]
            </p>
            <p>
            Under optimum conditions in commercial warehouses, potatoes can be stored for up to 10–12 months.[83] The commercial storage and retrieval of potatoes involves several phases: first drying surface moisture; wound healing at 85% to 95% relative humidity and temperatures below 25 °C (77 °F); a staged cooling phase; a holding phase; and a reconditioning phase, during which the tubers are slowly warmed. Mechanical ventilation is used at various points during the process to prevent condensation and the accumulation of carbon dioxide.[83]
            </p>
            <p>
            When stored in homes unrefrigerated, the shelf life is usually a few weeks.[citation needed]
            </p>
            <p>
            If potatoes develop green areas or start to sprout, trimming or peeling those green-colored parts is inadequate to remove copresent toxins, and such potatoes are no longer edible.[85][86]
            </p>
            <p>
            The world dedicated 18.6 million ha (46 million acres) in 2010 for potato cultivation. The average world farm yield for potato was 17.4 tonnes per hectare, in 2010. Potato farms in the United States were the most productive in 2010, with a nationwide average of 44.3 tonnes per hectare.[87] United Kingdom was a close second.
            </p>
            <p>
            New Zealand farmers have demonstrated some of the best commercial yields in the world, ranging between 60 and 80 tonnes per hectare, some reporting yields of 88 tonnes potatoes per hectare.[88][89][90]
            </p>
            <p>
            There is a big gap among various countries between high and low yields, even with the same variety of potato. Average potato yields in developed economies ranges between 38–44 tonnes per hectare. China and India accounted for over a third of world's production in 2010, and had yields of 14.7 and 19.9 tonnes per hectare respectively.[87] The yield gap between farms in developing economies and developed economies represents an opportunity loss of over 400 million tonnes of potato, or an amount greater than 2010 world potato production. Potato crop yields are determined by factors such as the crop breed, seed age and quality, crop management practices and the plant environment. Improvements in one or more of these yield determinants, and a closure of the yield gap, can be a major boost to food supply and farmer incomes in the developing world.[91][92]
            </p>
            <p>
            Potatoes are prepared in many ways: skin-on or peeled, whole or cut up, with seasonings or without. The only requirement involves cooking to swell the starch granules. Most potato dishes are served hot but some are first cooked, then served cold, notably potato salad and potato chips (crisps). Common dishes are: mashed potatoes, which are first boiled (usually peeled), and then mashed with milk or yogurt and butter; whole baked potatoes; boiled or steamed potatoes; French-fried potatoes or chips; cut into cubes and roasted; scalloped, diced, or sliced and fried (home fries); grated into small thin strips and fried (hash browns); grated and formed into dumplings, Rösti or potato pancakes. Unlike many foods, potatoes can also be easily cooked in a microwave oven and still retain nearly all of their nutritional value, provided they are covered in ventilated plastic wrap to prevent moisture from escaping; this method produces a meal very similar to a steamed potato, while retaining the appearance of a conventionally baked potato. Potato chunks also commonly appear as a stew ingredient. Potatoes are boiled between 10 and 25[93] minutes, depending on size and type, to become soft.
            </p>
            <p>
            Potatoes are also used for purposes other than eating by humans, for example:
            </p>
            <ul>
                <li>Potatoes are used to brew alcoholic beverages such as vodka, poitín, or akvavit.</li>
                <li>They are also used as fodder for livestock. Livestock-grade potatoes, considered too small and/or blemished to sell or market for human use but suitable for fodder use, have been called chats in some dialects. They may be stored in bins until use; they are sometimes ensiled.[94] Some farmers prefer to steam them rather than feed them raw and are equipped to do so efficiently.</li>
                <li>Potato starch is used in the food industry as a thickener and binder for soups and sauces, in the textile industry as an adhesive, and for the manufacturing of papers and boards.[95][96]</li>
                <li>Maine companies are exploring the possibilities of using waste potatoes to obtain polylactic acid for use in plastic products; other research projects seek ways to use the starch as a base for biodegradable packaging.[96][97]</li>
                <li>Potato skins, along with honey, are a folk remedy for burns in India. Burn centres in India have experimented with the use of the thin outer skin layer to protect burns while healing.[98][99]</li>
                <li>Potatoes (mainly Russets) are commonly used in plant research. The consistent parenchyma tissue, the clonal nature of the plant and the low metabolic activity provide a very nice "model tissue" for experimentation. Wound-response studies are often done on potato tuber tissue, as are electron transport experiments. In this respect, potato tuber tissue is similar to Drosophila melanogaster, Caenorhabditis elegans and Escherichia coli: they are all "standard" research organisms.</li>
                <li>Potatoes have been delivered with personalized messages as a novelty. Potato delivery services include Potato Parcel and Mail A Spud.[100][101][102][103]</li>
            </ul>
            <p>
            Peruvian cuisine naturally contains the potato as a primary ingredient in many dishes, as around 3,000 varieties of this tuber are grown there.[104] Some of the more notable dishes include boiled potato as a base for several dishes or with ají-based sauces like in Papa a la Huancaína or ocopa, diced potato for its use in soups like in cau cau, or in Carapulca with dried potato (papa seca). Smashed condimented potato is used in causa Limeña and papa rellena. French-fried potatoes are a typical ingredient in Peruvian stir-fries, including the classic dish lomo saltado.
            </p>
            <p>
            Chuño is a freeze-dried potato product traditionally made by Quechua and Aymara communities of Peru and Bolivia,[105] and is known in various countries of South America, including Peru, Bolivia, Argentina, and Chile. In Chile's Chiloé Archipelago, potatoes are the main ingredient of many dishes, including milcaos, chapaleles, curanto and chochoca. In Ecuador, the potato, as well as being a staple with most dishes, is featured in the hearty locro de papas, a thick soup of potato, squash, and cheese.
            </p>
            <p>
            In the UK, potatoes form part of the traditional staple, fish and chips. Roast potatoes are commonly served as part of a Sunday roast dinner and mashed potatoes form a major component of several other traditional dishes, such as shepherd's pie, bubble and squeak, and bangers and mash. New potatoes may be cooked with mint and are often served with butter.[106]
            </p>
            <p>
            The Tattie scone is a popular Scottish dish containing potatoes. Colcannon is a traditional Irish food made with mashed potato, shredded kale or cabbage, and onion; champ is a similar dish. Boxty pancakes are eaten throughout Ireland, although associated especially with the North, and in Irish diaspora communities; they are traditionally made with grated potatoes, soaked to loosen the starch and mixed with flour, buttermilk and baking powder. A variant eaten and sold in Lancashire, especially Liverpool, is made with cooked and mashed potatoes.
            </p>
            <p>
            Bryndzové halušky is the Slovakian national dish, made of a batter of flour and finely grated potatoes that is boiled to form dumplings. These are then mixed with regionally varying ingredients.
            </p>
            <p>
            In Germany, Northern and Eastern Europe (especially in Scandinavian countries), Finland, Poland, Russia, Belarus and Ukraine, newly harvested, early ripening varieties are considered a special delicacy. Boiled whole and served un-peeled with dill, these "new potatoes" are traditionally consumed with Baltic herring. Puddings made from grated potatoes (kugel, kugelis, and potato babka) are popular items of Ashkenazi, Lithuanian, and Belarusian cuisine.[107] German fries and various version of Potato salad are part of German cuisine. Bauernfrühstück (literally farmer's breakfast) is a warm German dish made from fried potatoes, eggs, ham and vegetables.
            </p>
            <p>
            Cepelinai is Lithuanian national dish. They are a type of dumpling made from riced potatoes (see Potato ricer) and usually stuffed with minced meat, although sometimes dry cottage cheese (curd) or mushrooms are used instead.[108] In Western Europe, especially in Belgium, sliced potatoes are fried to create frieten, the original French fried potatoes. Stamppot, a traditional Dutch meal, is based on mashed potatoes mixed with vegetables.
            </p>
            <p>
            In France, the most notable potato dish is the Hachis Parmentier, named after Antoine-Augustin Parmentier, a French pharmacist, nutritionist, and agronomist who, in the late 18th century, was instrumental in the acceptance of the potato as an edible crop in the country. The pâté aux pommes de terre is a regional potato dish from the central Allier and Limousin regions.
            </p>
            <p>
            In the north of Italy, in particular, in the Friuli region of the northeast, potatoes serve to make a type of pasta called gnocchi.[109] Similarly, cooked and mashed potatoes or potato flour can be used in the Knödel or dumpling eaten with or added to meat dishes all over central and Eastern Europe, but especially in Bavaria and Luxembourg. Potatoes form one of the main ingredients in many soups such as the vichyssoise and Albanian potato and cabbage soup. In western Norway, komle is popular.
            </p>
            <p>
            A traditional Canary Islands dish is Canarian wrinkly potatoes or papas arrugadas. Tortilla de patatas (potato omelette) and patatas bravas (a dish of fried potatoes in a spicy tomato sauce) are near-universal constituent of Spanish tapas.
            </p>
            <p>
            In the US, potatoes have become one of the most widely consumed crops and thus have a variety of preparation methods and condiments. French fries and often hash browns are commonly found in typical American fast-food burger "joints" and cafeterias. One popular favourite involves a baked potato with cheddar cheese (or sour cream and chives) on top, and in New England "smashed potatoes" (a chunkier variation on mashed potatoes, retaining the peel) have great popularity. Potato flakes are popular as an instant variety of mashed potatoes, which reconstitute into mashed potatoes by adding water, with butter or oil and salt to taste. A regional dish of Central New York, salt potatoes are bite-size new potatoes boiled in water saturated with salt then served with melted butter. At more formal dinners, a common practice includes taking small red potatoes, slicing them, and roasting them in an iron skillet. Among American Jews, the practice of eating latkes (fried potato pancakes) is common during the festival of Hanukkah.
            </p>
            <p>
            A traditional Acadian dish from New Brunswick is known as poutine râpée. The Acadian poutine is a ball of grated and mashed potato, salted, sometimes filled with pork in the centre, and boiled. The result is a moist ball about the size of a baseball. It is commonly eaten with salt and pepper or brown sugar. It is believed to have originated from the German Klöße, prepared by early German settlers who lived among the Acadians. Poutine, by contrast, is a hearty serving of French fries, fresh cheese curds and hot gravy. Tracing its origins to Quebec in the 1950s, it has become a widespread and popular dish throughout Canada.
            </p>
            <p>
            Potato grading for Idaho potatoes is performed in which No. 1 potatoes are the highest quality and No. 2 are rated as lower in quality due to their appearance (e.g. blemishes or bruises, pointy ends).[110] Potato density assessment can be performed by floating them in brines.[111] High-density potatoes are desirable in the production of dehydrated mashed potatoes, potato crisps and french fries.[111]
            </p>
            <p>
            In South Asia, the potato is a very popular traditional staple. In India, the most popular potato dishes are aloo ki sabzi, batata vada, and samosa, which is spicy mashed potato mixed with a small amount of vegetable stuffed in conical dough, and deep fried. Potatoes are also a major ingredient as fast food items, such as aloo chaat, where they are deep fried and served with chutney. In Northern India, alu dum and alu paratha are a favourite part of the diet; the first is a spicy curry of boiled potato, the second is a type of stuffed chapati.
            </p>
            <p>
            A dish called masala dosa from South India is very notable all over India. It is a thin pancake of rice and pulse paste rolled over spicy smashed potato and eaten with sambhar and chutney. Poori in south India in particular in Tamil Nadu is almost always taken with smashed potato masal. Other favourite dishes are alu tikki and pakoda items.
            </p>
            <p>
            Vada pav is a popular vegetarian fast food dish in Mumbai and other regions in the Maharashtra in India.
            </p>
            <p>
            Aloo posto (a curry with potatoes and poppy seeds) is immensely popular in East India, especially Bengal. Although potatoes are not native to India, it has become a vital part of food all over the country especially North Indian food preparations. In Tamil Nadu this tuber acquired a name based on its appearance 'urulai-k-kizhangu' (உருளைக் கிழங்கு) meaning cylindrical tuber.
            </p>
            <p>
            The Aloo gosht, Potato and meat curry, is one of the popular dishes in South Asia, especially in Pakistan.
            </p>
            <p>
            In East Asia, particularly Southeast Asia, rice is by far the predominant starch crop, with potatoes a secondary crop, especially in China and Japan. However, it is used in northern China where rice is not easily grown, with a popular dish being 青椒土豆丝 (qīng jiāo tǔ dòu sī), made with green pepper, vinegar and thin slices of potato. In the winter, roadside sellers in northern China will also sell roasted potatoes. It is also occasionally seen in Korean and Thai cuisines.[112]
            </p>
            <p>
            During the late 19th century, numerous images of potato harvesting appeared in European art, including the works of Willem Witsen and Anton Mauve.[113]
            </p>
            <p>
            Van Gogh's 1885 painting The Potato Eaters portrays a family eating potatoes. Van Gogh said he wanted to depict peasants as they really were. He deliberately chose coarse and ugly models, thinking that they would be natural and unspoiled in his finished work.[114]
            </p>
            <p>
            Jean-François Millet's The Potato Harvest depicts peasants working in the plains between Barbizon and Chailly. It presents a theme representative of the peasants' struggle for survival. Millet's technique for this work incorporated paste-like pigments thickly applied over a coarsely textured canvas.
            </p>
            <p>
            The potato has been an essential crop in the Andes since the pre-Columbian Era. The Moche culture from Northern Peru made ceramics from earth, water, and fire. This pottery was a sacred substance, formed in significant shapes and used to represent important themes. Potatoes are represented anthropomorphically as well as naturally.[115]
            </p>
            <p>
            Invented in 1949, and marketed and sold commercially by Hasbro in 1952, Mr. Potato Head is an American toy that consists of a plastic potato and attachable plastic parts, such as ears and eyes, to make a face. It was the first toy ever advertised on television.[116]
            </p>
        </div>,
        ending: {
            id: "potato-master",
            name: "Potato Expert",
            description: "Know everything about potatos.",
        },
        contributor: "Hunter",
    },
    missingno_deletepokedex: {
        prompt: () => <div>
            <h3>Are you sure you want to permanently delete "missingno.pkdx"?</h3>
            <p>
                If you delete an item, it will be permanetly lost.
            </p>
        </div>,
        options: [
            { text: "Cancel", to: "delete_pokedex_dont" },
            { text: "Delete", to: "delete_pokedex" },
        ],
        contributor: "Dave"
    },
    delete_pokedex: {
        prompt: () => <div>
            <p>
                You delete the pokedex entry, then the game crashes...
            </p>
        </div>,
        ending: {
            id: "pokedex-delete",
            name: "Crashed Pokemon...",
            description: "Don't delete important files!",
        },
        contributor: "Dave"
    },
    delete_pokedex_dont: {
        prompt: () => <div>
            <p>
                You dont delete the pokedex entry, yay!
            </p>
        </div>,
        ending: {
            id: "pokedex-delete-dnont",
            name: "dOn't Delete mY stUFF",
            description: "Cancel deleting the missingno pokedex entry.",
        },
        contributor: "Dave"
    }
});
