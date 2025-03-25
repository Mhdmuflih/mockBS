import { ReactNode } from "react";

interface headingProps {
    heading: string
    subHeading?: string
    children?: ReactNode
}


const Heading = (props: headingProps) => {


    return (
        <div className="w-full"> {/* Ensure full width */}
            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full"> {/* Add w-full here */}
                {/* Heading Section */}
                <div className="bg-gray-800 p-6 flex justify-between w-full">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                        <h3 className="text-white font-extralight">{props.subHeading}</h3>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 w-full h-screen"> {/* Change width from fixed value to full */}
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Heading;
