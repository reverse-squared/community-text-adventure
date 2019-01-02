import React from "react";
import { setScene } from "web-text-adventure";

export default (props) => {
    return <a href="#" style={props.style} onClick={() => {
        setScene(props.to);
    }}>{props.children}</a>;
};