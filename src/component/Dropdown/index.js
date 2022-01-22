import React, { useEffect } from 'react';

import Select from 'react-select';
import makeAnimate from 'react-select/animated';

const Dropdown = (props) => {


    const animatedComponents = makeAnimate();

    const Countries = [
        { label: "Albania", value: 355 },
        { label: "Argentina", value: 54 },
        { label: "Austria", value: 43 },
        { label: "Cocos Islands", value: 61 },
        { label: "Kuwait", value: 965 },
        { label: "Sweden", value: 46 },
        { label: "Venezuela", value: 58 }
    ];

    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            console.log({ data, isDisabled, isFocused, isSelected });
            return {
                ...styles,
                backgroundColor: isFocused ? "#999999" : null,
                color: "#333333"
            };
        }
    };

    return (
        <div className="card card-body">
            <div className="form-group input-group">
                <div className="container ">
                    <Select
                        defaultValue={Countries[1]}
                        options={Countries}
                        components={animatedComponents}
                        isMulti
                        styles={colourStyles} />
                </div>
            </div>
        </div>
    );
}

export default Dropdown;