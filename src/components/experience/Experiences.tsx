import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getExperiences, Experience } from "../../services/experience/experienceService";

export default function Experiences() {
    const [loading, setLoading] = useState(false);
    const [educations, setEducations] = useState<Experience[]>([]);
    const uuid = useSelector((state: RootState) => state.auth.uuid);

    useEffect(() => {
        setLoading(true);
        getExperiences(uuid ? uuid : "")
            .then((res) => {
                if (Array.isArray(res)) {
                    setEducations(res)
                } else {
                    setEducations([]);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between w-full gap-6 xl:flex-row font-bold border-b border-gray-200 pb-[20px]">
                <h2 className="text-gray-800 dark:text-gray-200">
                    İş məlumatlarım
                </h2>
                <Link to={"/new-experience"}>
                    <button className='flex items-center justify-center border-1 border-[#CDD9FA] p-2 rounded-[10px] bg-[#E8EEFC] text-[#4167E9] mr-[10px]'>
                        <AddIcon />
                        <p className="text-[#4167E9]">
                            Əlavə et
                        </p>
                    </button>
                </Link>
            </div>
            {loading ? (
                <div className="space-y-6 mt-5">
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex items-start gap-4 relative animate-pulse">
                            <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0 z-10"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : educations.length > 0 ? (
                <div className="relative mt-5">
                    {educations.map((edu, index) => (
                        <div key={index} className="flex items-start gap-4 relative pb-8 last:pb-0">
                            {index !== educations.length - 1 && (
                                <div className="absolute left-[5px] top-5 bottom-2 w-px bg-gray-300"></div>
                            )}
                            <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0 z-10"></div>
                            <div className="border-1 border-gray-200 p-5 rounded-[10px] bg-white dark:bg-gray-800 w-full">
                                <div className="flex items-center justify-start">
                                    <ApartmentIcon sx={{ fontSize: 30, marginRight: "10px", color: "#C9C9C9" }} />
                                    <h4 className="text-gray-800 dark:text-gray-200 font-semibold">
                                        {edu.company.toUpperCase()}
                                    </h4>
                                </div>
                                <div className="flex items-center justify-start">
                                    <WorkIcon sx={{ fontSize: 30, marginRight: "10px", color: "#C9C9C9" }} />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {edu.job_title}
                                    </p>
                                </div>
                                <div className="flex items-center justify-start">
                                    <CalendarMonthIcon sx={{ fontSize: 30, marginRight: "10px", color: "#C9C9C9" }} />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {edu.start_date} - {edu.end_date ? edu.end_date : "Davam edir"}
                                    </p>
                                </div>
                                {edu.description ? (
                                    <div className="ml-[30px] mt-[20px] text-gray-700 dark:text-gray-300">
                                        {edu.description}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-yellow-800 bg-yellow-300 inline-block px-2 py-1 rounded-[30px] dark:text-yellow-300 dark:bg-yellow-800">
                    Mövcud deyil
                </p>
            )}
        </div>
    )
}
