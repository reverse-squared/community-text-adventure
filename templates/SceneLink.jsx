import React from "react";
import { setScene } from "web-text-adventure/src/adventure";

export default (props) => {
    return <a href="#" {...props} onClick={() => {
        setScene(props.to);
    }}>{props.children}</a>;
};