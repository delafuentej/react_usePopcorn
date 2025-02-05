

const ToggleButton = ({isOpen, setIsOpen}) => {
    return (
        <button
            className="btn-toggle "
            onClick={() => setIsOpen(!isOpen)}
        >

        {isOpen ?'－' : '＋'}
        </button>
    )
}

export default ToggleButton;