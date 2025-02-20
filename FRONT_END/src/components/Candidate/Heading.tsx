import { ReactNode } from "react";

interface headingProps {
    heading: string
    children?: ReactNode
}


const Heading = (props: headingProps) => {


    return (
        <div className="">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                    {/* Heading Section */}
                    <div className="bg-[#181A22] mt-3 ml-1 rounded-t-lg p-5 flex justify-between">
                        <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 ">
                        {props.children}
                    </div>
                </div>

        </div>
    )
}

export default Heading;
