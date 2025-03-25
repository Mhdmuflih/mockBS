import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IheadingProps {
    heading: string;
    subHeading?: string;
    children?: ReactNode;
    addButton?: string;
}

const Heading = (props: IheadingProps) => {

    const navigate = useNavigate();

    const handleToAddSlot = () => {
        navigate('/interviewer/add-slot');
    }

    return (
        <>
            {/* Main Content */}
            <div className="w-full">
                <div className="flex-1 flex flex-col w-full"> {/* Add w-full here */}

                    {/* Heading Section */}
                    <div className="bg-gray-800 p-6 flex justify-between w-full">
                        <div>
                            <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                            <h3 className="text-white font-extralight">{props.subHeading}</h3>
                        </div>
                        {props.addButton ? (
                            <>
                                <div>
                                    <button className="text-black bg-white p-2 rounded-xl" onClick={handleToAddSlot}> {props.addButton} </button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 w-full h-screen">
                        {props.children}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Heading;
