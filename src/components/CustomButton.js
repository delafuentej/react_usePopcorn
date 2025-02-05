

const CustomButton = ({ children, handleClick, className = "" }) => {
    return (
        <button 
            className={`${className}`} 
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default CustomButton;
