// This file handles hot-reloading and starting up 
// startup file, loads all other files
import upgrade from "./upgrade";
import "@templates/CustomHTML";
import { setScene } from "web-text-adventure/src/adventure";

// CSS Loading
import "@css/style.css";
import(/* webpackPrefetch: true, webpackPreload: true, webpackChunkName: "CSSLOAD" */ "../css/style-offload.css");

upgrade();

// manually prefetch Google Fonts Files
const gfonts = "https://fonts.googleapis.com/css?family=Roboto:400,700";
const linkElem = document.createElement("link");
linkElem.rel = "prefetch";
linkElem.href = gfonts;
linkElem.onload = () => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = gfonts;
    document.head.appendChild(style);
};
document.head.appendChild(linkElem);

// Hot Reloading
if (module.hot) {
    // Scene Files
    const sceneCtx = require.context("@scenes/", true, /\.jsx$/);
    sceneCtx.keys().forEach(file => {
        sceneCtx(file);
    });

    module.hot.accept("@templates/CustomHTML", () => {});
    module.hot.accept(sceneCtx.id, () => {
        const sceneCtx = require.context("@scenes/", true, /\.jsx$/);
        sceneCtx.keys().forEach(file => {
            sceneCtx(file);
        });
    });


    // lmao if you want to get all endings run in devtools:
    //  ((e)=>Object.keys(e).forEach((f)=>$js.Ending.achieveEnding(f)))($js.Ending.getAllEndings())

    window.$js = {
        Ending: require("./ending"),
        Card: require("./card").default,
        WTA: require("web-text-adventure"),
    };

} else {
    // eslint-disable-next-line no-inner-declarations
    function loadSubBranch(branch) {
        return import(
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            /* webpackInclude: /\.jsx$/ */
            /* webpackExclude: /(_main\/menu)\.jsx$/ */
            /* webpackChunkName: "scenes" */
            `@scenes/${branch}`
        );
    }
    require("@scenes/_main/menu.jsx");
    if (typeof $dynamicFiles !== "undefined") {
        Promise.all($dynamicFiles.map(loadSubBranch)).then(x => {
            // eslint-disable-next-line no-console
            console.log("All loaded!");
        });
    }
}

if(location.href.endsWith("#credits")) {
    setScene("credits");
}
