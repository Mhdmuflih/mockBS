import { ReactNode } from "react";

interface headingProps {
    heading: string
    children?: ReactNode
}

const Heading = (props: headingProps) => {
    return (
        <>
            {/* Content Area */}
            <div className="flex-1 bg-black  ">
                <div className="bg-[#30323A] mt-3 ml-1 p-5">
                    <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                </div>
                {/* Add other content here */}
                <div className="flex-1">
                        {props.children}
                    </div>
            </div>
        </>
    )
}

export default Heading;
