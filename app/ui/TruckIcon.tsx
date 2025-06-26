'use client'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faTruck} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {MovementDirection} from "@/app/types";

const getArrowRotation = (direction: MovementDirection) => {
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

const getTruckRotation = (direction: MovementDirection) => {
    switch (direction) {
        case "N":
            return -90;
        case "E":
            return 0;
        case "S":
            return 90;
        case "W":
            return 0;
        default:
            return 0;
    }
};

const getPositionStyle = (direction: MovementDirection) => {
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

const getFlip = (direction: MovementDirection) => {
    return direction === "W" ? "scaleX(-1)" : "";
};

export const TruckIcon = ({direction}: { direction: MovementDirection }) =>
    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
        {direction &&
            <FontAwesomeIcon icon={faTruck} size="2x" color="green" style={{
                transform: `${getFlip(direction)} rotate(${getTruckRotation(direction)}deg)`
            }}/>
        }
        {direction && (
            <FontAwesomeIcon
                icon={faSortUp}
                size="2x"
                color="green"
                style={{
                    position: 'absolute', ...getPositionStyle(direction),
                    transform: `rotate(${getArrowRotation(direction)}deg)`
                }}
            />
        )}
        {!direction && (
            <FontAwesomeIcon icon={faTruck} size="2x" color="green" style={{transform: 'rotate(0deg)'}}/>
        )}
    </div>
