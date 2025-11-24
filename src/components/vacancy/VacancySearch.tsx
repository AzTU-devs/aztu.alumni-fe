import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function VacancySearch() {
    const [search, setSearch] = useState("");

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-5 w-full">
            <div className="relative w-full">
                <SearchIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fontSize="small"
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#F5F5F7] outline-none w-full py-3 pl-10 pr-3 rounded-[10px]"
                    placeholder="Ad, E-poçt, ixtisas və digər məlumatlarla axtarış edin"
                />
            </div>
        </div>
    )
}
