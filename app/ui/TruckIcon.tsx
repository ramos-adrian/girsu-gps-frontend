import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faTruck} from "@fortawesome/free-solid-svg-icons";
import React from "react";


const getRotation = (direction?: "N" | "S" | "E" | "W") => {
    switch (direction) {
        case "N":
            return 0;
        case "E":
            return 90;
        case "S":
            return 180;
        case "W":
            return 270;
        default:
            return 0;
    }
};

const getPositionStyle = (direction?: "N" | "S" | "E" | "W") => {
    switch (direction) {
        case "N":
            return {bottom: '100%', left: '50%', transform: 'translateX(-50%)'};
        case "E":
            return {left: '100%', top: '50%', transform: 'translateY(-50%)'};
        case "S":
            return {top: '100%', left: '50%', transform: 'translateX(-50%)'};
        case "W":
            return {right: '100%', top: '50%', transform: 'translateY(-50%)'};
        default:
            return {};
    }
};

export const TruckIcon = ({direction}: { direction?: "N" | "S" | "E" | "W" }) =>
    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faTruck} size="2x" color="green"/>
        {direction && (
            <FontAwesomeIcon
                icon={faSortUp}
                size="2x"
                color="green"
                style={{
                    position: 'absolute', ...getPositionStyle(direction),
                    transform: `rotate(${getRotation(direction)}deg)`
                }}
            />
        )}
    </div>