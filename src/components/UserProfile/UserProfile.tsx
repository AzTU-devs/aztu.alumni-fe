import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import EditIcon from '@mui/icons-material/Edit';
import UserSettingsCard from "./UserSettingsCard";
import { Alumni, getAlumniDetails } from "../../services/alumni/alumniService";
import { Education, getEducations } from "../../services/education/educationService";
import { Experience, getExperiences } from "../../services/experience/experienceService";

export default function UserProfile() {
    const uuid = useSelector((state: RootState) => state.auth.uuid);

    const [_, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alumni, setALumni] = useState<Alumni>();
    const [notFound, setNotFound] = useState(false);
    const [education, setEducation] = useState<Education[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    useEffect(() => {
        setLoading(true);
        getAlumniDetails(uuid ? uuid : "")
            .then((res) => {
                if (typeof res === "object") {
                    setALumni(res);
                } else if (res === "NOT FOUND") {
                    setNotFound(true);
                } else {
                    setError(true);
                }
            })
        getEducations(uuid ? uuid : "")
            .then((res) => {
                if (Array.isArray(res)) {
                    setEducation(res);
                } else if (res === "NO CONTENT") {
                    setEducation([]);
                } else {
                    setEducation([]);
                }
            })
        getExperiences(uuid ? uuid : "")
            .then((res) => {
                if (Array.isArray(res)) {
                    setExperiences(res)
                } else {
                    setExperiences([]);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <>
            {notFound ? (
                <div className="w-full p-10 text-center text-red-600 dark:text-red-400 text-lg font-semibold bg-white dark:bg-gray-900 rounded-2xl">
                    Məlumat tapılmadı
                </div>
            ) : (
                <>
                    <div className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl lg:p-6">
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                                {loading ? (
                                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                                        <div className="w-23 h-23 rounded-full bg-gray-300 animate-pulse"></div>
                                        <div className="flex-1 space-y-2 w-full">
                                            <div className="h-5 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <UserSettingsCard photo={alumni?.photo} name={alumni?.name} surname={alumni?.surname} email={alumni?.email} uuid={uuid} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl lg:p-6 my-[10px]">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between w-full gap-6 xl:flex-row font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-[20px]">
                                <div>
                                    Şəxsi məlumatlar
                                </div>
                                <div>
                                    <Link to={"/complete-profile"}>
                                        <button className='flex items-center justify-center border border-[#CDD9FA] dark:border-blue-500 p-2 rounded-[10px] bg-[#E8EEFC] dark:bg-gray-800 text-[#4167E9] dark:text-blue-400 mr-[10px] hover:opacity-90 transition'>
                                            <EditIcon />
                                            <p className="text-[#4167E9] dark:text-blue-400 ml-[5px]">
                                                Redaktə et
                                            </p>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            {loading ? (
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center justify-between w-full gap-6">
                                        {[...Array(12)].map((_, idx) => (
                                            <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 space-y-2">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                                                <div className="h-5 bg-gray-300 rounded w-full animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-wrap items-center justify-between w-full gap-6">
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Ad, Soyad, Ata adı</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.name} {alumni?.surname} {alumni?.father_name}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">E-poçt</h3>
                                        <p className="text-gray-900 dark:text-gray-100">{alumni?.email}</p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Telefon nömrəsi</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.phone_number ? (
                                                alumni?.phone_number
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Fin Kod</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.fin_code ? (
                                                alumni?.fin_code
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Qeydiyyatda olduğu şəhər, ölkə</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.registered_city ? (
                                                alumni?.registered_city
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Qeydiyyatda olduğu ünvan</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.registered_address ? (
                                                alumni?.registered_address
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Yaşayış ünvanı</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.address ? (
                                                alumni?.address
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Hərbi mükəlləfiyyəti</h3>
                                        <p>
                                            {alumni?.military_obligation ? (
                                                alumni?.military_obligation
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div> */}
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Hərbi mükəlləfiyyəti</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.military_obligation === 1 ? (
                                                <>
                                                    Var
                                                </>
                                            ) : alumni?.military_obligation === 2 ? (
                                                <>
                                                    Yoxdur
                                                </>
                                            ) : alumni?.military_obligation === 3 ? (
                                                <>
                                                    Hərbi xidmətə yollanmıram
                                                </>
                                            ) : alumni?.military_obligation === 4 ? (
                                                <>
                                                    Müvəqqəti olaraq getmirəm
                                                </>
                                            ) : alumni?.military_obligation === 5 ? (
                                                <>
                                                    Digər
                                                </>
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Mədəni hal</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.married !== null && alumni?.married !== undefined ? (
                                                alumni.married ? "Evli" : "Subay"
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Qeydiyyat tarixi</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.created_at
                                              ? new Date(alumni.created_at).toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                  second: "2-digit",
                                                  hour12: false,
                                                })
                                              : (
                                                  <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                  </div>
                                                )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 dark:text-gray-400 mb-[5px]">Profilin yenilənmə tarixi</h3>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {alumni?.updated_at
                                              ? new Date(alumni.updated_at).toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                  second: "2-digit",
                                                  hour12: false,
                                                })
                                              : (
                                                  <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 rounded-[30px]">
                                                    Mövcud deyil
                                                  </div>
                                                )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl lg:p-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col items-center w-full gap-6 xl:flex-row font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-[20px]">
                                Təhsil məlumatları
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
                            ) : education.length > 0 ? (
                                <div className="relative mt-5">
                                    {education.map((edu, index) => (
                                        <div key={index} className="flex items-start gap-4 relative pb-8 last:pb-0">
                                            {index !== education.length - 1 && (
                                                <div className="absolute left-[5px] top-5 bottom-2 w-px bg-gray-300"></div>
                                            )}
                                            <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0 z-10"></div>
                                            <div>
                                                <h4 className="text-gray-900 dark:text-gray-100 font-semibold">
                                                    {edu.university}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {edu.degree}, {edu.major}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {edu.start_date} - {edu.end_date ? edu.end_date : "Davam edir"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 inline-block px-2 py-1 rounded-[30px]">
                                    Mövcud deyil
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl lg:p-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col items-center w-full gap-6 xl:flex-row font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-[20px]">
                                İş yeri məlumatları
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
                            ) : experiences.length > 0 ? (
                                <div className="relative mt-5">
                                    {experiences.map((exp, index) => (
                                        <div key={index} className="flex items-start gap-4 relative pb-8 last:pb-0">
                                            {index !== education.length - 1 && (
                                                <div className="absolute left-[5px] top-5 bottom-2 w-px bg-gray-300"></div>
                                            )}
                                            <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0 z-10"></div>
                                            <div>
                                                <h4 className="text-gray-900 dark:text-gray-100 font-semibold">
                                                    {exp.company}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {exp.job_title} - {exp.employment_type}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {exp.start_date} - {exp.end_date ? exp.end_date : "Davam edir"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-yellow-900 dark:text-yellow-200 bg-yellow-300 dark:bg-yellow-900/40 inline-block px-2 py-1 rounded-[30px]">
                                    Mövcud deyil
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
