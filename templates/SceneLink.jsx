import React from "react";
import { setScene } from "web-text-adventure/src/adventure";

export default (props) => {
    if(props.disabled) {
        return <a {...props} className='option-disabled'>{props.children}</a>;
    } else {
        return <a href="#" {...props} onClick={() => {
            setScene(props.to);
        }}>{props.children}</a>;
    }
};