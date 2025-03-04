import { ReactNode } from "react";

interface headingProps {
    heading: string
    subHeading?: string
    children?: ReactNode
}


const Heading = (props: headingProps) => {


    return (
        <div className="">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Heading Section */}
                <div className="bg-[#181A22] mt-4 ml-1 rounded-t-lg p-3 flex justify-between w-[1050px]">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                        <h3 className="text-white font-extralight">{props.subHeading}</h3>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 w-[1054px]">
                    {props.children}
                </div>
            </div>

        </div>
    )
}

export default Heading;
