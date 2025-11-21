import { Outlet } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BottomNavigation from "../components/bottomNavigation/BottomNavigation";

export default function ResponsiveLayout() {
    return (
        <div>
            <header className="flex justify-between items-center border-b border-gray-200 p-3">
                <div className="flex items-center">
                    <img
                        src="/images/logo/aztu-logo-dark.png"
                        alt=""
                        className="w-[50px] mr-[20px]"
                    />
                    <h2 className="font-bold">Məzun Platforması</h2>
                </div>
                <div className="relative">
                    <NotificationsNoneIcon sx={{ fontSize: "35px" }} />
                    <div className="bg-red-500 w-[20px] h-[20px] p-[2px] flex items-center justify-center rounded-full text-white absolute top-[-2px] right-[-2px]">
                        2
                    </div>
                </div>
            </header>
            <main className="p-5">
                <Outlet />
            </main>
            <BottomNavigation />
        </div>
    );
}