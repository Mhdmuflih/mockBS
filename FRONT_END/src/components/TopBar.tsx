import { useNavigate } from "react-router-dom";
import logo from "../assets/Creative Logo Templates.jpeg"

const TopBar = () => {

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/')
    }

    return (
        <div className="bg-[#30323A] w-full p-2">
            <img onClick={navigateToHomePage} src={logo} alt="Company Logo" className="h-10 w-14 mr-4 ml-3 hover:cursor-pointer" />
        </div>
    )
}

export default TopBar;
