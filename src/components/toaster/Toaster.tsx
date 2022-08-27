//import styles
import "./ToasterStyle.scss";

//import icons
import close from "./close.svg";

interface ToasterProps {
    message: string,
    backgroundColor: number,
    setToaster: React.Dispatch<React.SetStateAction<any>>
}

const Toaster:React.FC<ToasterProps> = ({ message, backgroundColor, setToaster }) => {

    const toasterStyling = {
        backgroundColor: backgroundColor < 299 ? "#7AB87A":"#CC6361",
        color: "#fff"
    }

    return (
        <>
        <div style={toasterStyling} className="toaster">
            <span>

            </span>
            <p>{message}</p>
            <button aria-label="close" onClick={() => {
                setToaster(null);
            }}>
                <img src={close} alt="close img"/>
            </button>
        </div>
        </>
    )
}

export default Toaster;