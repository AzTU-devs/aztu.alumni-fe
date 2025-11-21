import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function AlumnisSearch() {
    const [search, setSearch] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [faculty, setFaculty] = useState("");
    const [profileStatus, setProfileStatus] = useState("");

    const hasFilters = search.length > 0 || graduationYear || faculty || profileStatus;

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

            <div className="mt-4 w-full flex justify-between items-center">
                <div className='w-[40%] flex justify-between items-center'>
                    {/* Graduation Year */}
                    <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="bg-[#F5F5F7] outline-none p-3 rounded-[10px] text-sm text-gray-700"
                        style={{ width: "calc((100% / 3) - 10px)" }}
                    >
                        <option value="">Buraxılış ili</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>

                    {/* Faculty */}
                    <select
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="bg-[#F5F5F7] outline-none w-full p-3 rounded-[10px] text-sm text-gray-700"
                        style={{ width: "calc((100% / 3) - 10px)" }}
                    >
                        <option value="">Fakültə</option>
                        <option value="it">İnformasiya Texnologiyaları</option>
                        <option value="engineering">Mühəndislik</option>
                        <option value="mechanic">Mexanika</option>
                        <option value="energy">Energetika</option>
                    </select>

                    {/* Profile Status */}
                    <select
                        value={profileStatus}
                        onChange={(e) => setProfileStatus(e.target.value)}
                        className="bg-[#F5F5F7] outline-none w-full p-3 rounded-[10px] text-sm text-gray-700"
                        style={{ width: "calc((100% / 3) - 10px)" }}
                    >
                        <option value="">Profil statusu</option>
                        <option value="active">Aktiv</option>
                        <option value="deactivated">Deaktiv</option>
                        <option value="frozen">Dondurulmuş</option>
                    </select>
                </div>

                <div className='flex items-center'>
                    <button className='border-1 border-[#CDD9FA] p-2 rounded-[10px] bg-[#E8EEFC] text-[#4167E9] mr-[10px]'>
                        Filteri tətbiq et
                    </button>

                    {hasFilters && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setGraduationYear("");
                                setFaculty("");
                                setProfileStatus("");
                            }}
                            className='border-1 border-[#CA4C3F] p-2 rounded-[10px] bg-[#F3D5D2] text-[#CA4C3F]'
                        >
                            Filteri təmizlə
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}