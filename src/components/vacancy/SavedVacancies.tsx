import Swal from "sweetalert2";
import { Link } from "react-router";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getSavedVacancies, VacancyInterface, saveVacancy, SaveVacancyPaload } from '../../services/vacancy/vacancyService';

export default function SavedVacancies() {
    const uuid = useSelector((state: RootState) => state.auth.uuid);
    const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);

    useEffect(() => {
        getSavedVacancies(uuid ? uuid : "")
            .then((res) => {
                if (Array.isArray(res)) {
                    setVacancies(res);
                } else {
                    setVacancies([]);
                }
            })
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isSameDay = (d1: Date, d2: Date) =>
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();

        if (isSameDay(date, today)) return "Bugün";
        if (isSameDay(date, yesterday)) return "Dünən";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleSave = async (vacancy_code: string) => {
        try {
            const payload: SaveVacancyPaload = {
                uuid: uuid ? uuid : "",
                vacancy_code: vacancy_code
            }
            const response = await saveVacancy(payload);

            if (response === "SUCCESS") {

                Swal.fire({
                    icon: "success",
                    title: "Uğurla əlavə olundu",
                    text: "Vakansiya saxlanılanlara əlavə edildi",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (response === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta!",
                    text: "Vakansiyanın düzgünlüyündən əmin olun.",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xəta!",
                    text: "Gözlənilməz xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Xəta!",
                text: "Gözlənilməz xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <>
            {
                vacancies.map((vacancy, _) => {
                    return (
                        <div key={vacancy.vacancy_code} className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6 mb-5 w-full">
                            <div className="flex sm:items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-blue-900 dark:text-blue-400 font-bold text-lg sm:text-xl mb-1">{vacancy.job_title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-1">{vacancy.company}</p>
                                    <div className="flex items-center text-gray-400 dark:text-gray-500 font-[200]">
                                        <LocationOnIcon sx={{ color: "#a3a3a3" }} />
                                        <p className="ml-1">
                                            {vacancy.city}, {vacancy.country}
                                        </p>
                                    </div>
                                    <p className="mt-[10px] text-gray-700 dark:text-gray-300">
                                        {vacancy.description}
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 cursor-pointer">
                                    <div onClick={() => handleSave(vacancy.vacancy_code)} className='border border-[#CDD9FA] dark:border-blue-600 p-2 rounded-lg bg-[#E8EEFC] dark:bg-gray-800 text-[#4167E9] dark:text-blue-400 hover:bg-[#d7e0fa] dark:hover:bg-gray-700 transition flex justify-center items-center'>
                                        <BookmarkIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div className="text-gray-700 dark:text-gray-400 mb-3 sm:mb-0">
                                    {formatDate(vacancy.created_at)}
                                </div>
                                <div>
                                    <Link
                                        to={`/vacancy/${vacancy.vacancy_code}`}
                                        state={{ vacancy }}
                                    >
                                        <button className='border border-[#CDD9FA] dark:border-blue-600 p-2 rounded-lg bg-[#E8EEFC] dark:bg-gray-800 text-[#4167E9] dark:text-blue-400 hover:bg-[#d7e0fa] dark:hover:bg-gray-700 transition'>
                                            Ətraflı məlumat
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}