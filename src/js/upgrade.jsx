import { achieveEnding } from "./ending";
export default function() {
    const upgrades = [
        ["dev-text-adventure.netlify.com", "dev.cta.davecode.me"],
        ["text-adventure.netlify.com", "cta.davecode.me"],
    ];

    if (location.hash.startsWith("#upgrade=")) {
        const save = location.hash.substring(9).split(";");
        save.forEach(i => {
            achieveEnding(i);
        });
        location.hash = "#";
    }

    let find = upgrades.find((i) => location.host === i[0]);
    if (find) {
        localStorage.endings = localStorage.endings || "";
        const endings = localStorage.endings.split(";").filter(x => x !== "");
        location.href = "https://" + find[1] + (endings.length >= 1 ? "/#upgrade=" + endings.join(";") : "/");
    }
}