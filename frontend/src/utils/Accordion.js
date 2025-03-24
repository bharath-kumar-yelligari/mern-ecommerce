import "../styles/Accordion.scss";

const Accordion = ({ title, children, isOpen, toggle }) => {
    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={toggle}>
                {title}
                <span className={`icon ${isOpen ? "rotate" : ""}`}>▼</span>
            </div>
            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;
