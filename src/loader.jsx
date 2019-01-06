// This file handles hot-reloading and starting up 
// startup file, loads all other files

import "../templates/custom-html.jsx";
import { setScene } from "web-text-adventure";

// Hot Reloading
if (module.hot) {
    // Scene Files
    const sceneCtx = require.context("../scenes/", true, /\.jsx$/);
    sceneCtx.keys().forEach(file => {
        sceneCtx(file);
    });

    module.hot.accept("../templates/custom-html.jsx", () => {});
    module.hot.accept(sceneCtx.id, () => {
        const sceneCtx = require.context("../scenes/", true, /\.jsx$/);
        sceneCtx.keys().forEach(file => {
            sceneCtx(file);
        });
    });
} else {
    // eslint-disable-next-line no-inner-declarations
    function loadSubBranch(branch) {
        return import(
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            /* webpackInclude: /\.jsx$/ */
            /* webpackExclude: /(menu)\.jsx$/ */
            `../scenes/${branch}`
        );
    }
    require("../scenes/menu.jsx");
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