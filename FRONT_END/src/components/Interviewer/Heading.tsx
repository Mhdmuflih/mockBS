import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IheadingProps {
    heading: string;
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
            <div className="flex-1 flex flex-col">
                {/* Heading Section */}
                <div className="bg-[#181A22] mt-3 ml-1 rounded-t-lg p-5 flex justify-between">
                    <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
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
                <div className="flex-1">
                    {props.children}
                </div>
            </div>
        </>

    )
}

export default Heading;
