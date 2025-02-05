import { useState } from "react";


const TextExpander = ({
    collapsedNumWords = 15,
    expandButtonText = 'Show more',
    collapsedButtonText = 'Show less',
    buttonColor = 'green',
    expanded = false,
    className,
    children
}) => {

    const [isExpanded, setIsExpanded] = useState(expanded);

    const displayText = isExpanded ? children : `${children.split(' ').slice(0, collapsedNumWords).join(' ')} ...`;

    const handleExpanded = () => {
        setIsExpanded((exp) => !(exp));
    }

    const buttonStyle = {
        background: "none",
        border: "none",
        font: "inherit",
        cursor: "pointer",
        marginLeft: "1px",
        color: buttonColor
      };

    return(
        <div className={className}>
            <span>{displayText}</span>
            <button 
                style={buttonStyle}
                onClick={handleExpanded}
                >
                    {isExpanded ? collapsedButtonText : expandButtonText}
                </button>
           
        </div>
    )
}

export default TextExpander;