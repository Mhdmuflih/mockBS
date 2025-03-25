import { useEffect } from "react";
import SideBar from "../../../components/Admin/SideBar";
// import AdminSideLoading from "../../../components/Admin/AdminSideLoading";

const AdminCommunityList = () => {

    // const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);
    }, []);

    // if (isLoading) {
    //     return <div><AdminSideLoading /></div>
    // }

    return (
        <>
            <div className="flex">

                <SideBar heading="Communities" >
                    <div className="bg-[#30323A] p-4 shadow-md h-screen">

                    </div>
                </SideBar>
            </div>
        </>
    )
}

export default AdminCommunityList;
