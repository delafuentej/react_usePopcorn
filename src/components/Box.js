import ToggleButton from "./ToggleButton";


const Box = ({element, isOpen, setIsOpen}) =>{

    return(
        <div className="box">
            <ToggleButton 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                />

            {isOpen && element}

        </div>
    )
}
export default Box;