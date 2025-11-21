import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alumni, getAlumniDetails } from "../../services/alumni/alumniService";
import { Education, getEducations } from "../../services/education/educationService";

export default function UserMetaCard() {
    const { uuid } = useParams<{ uuid: string }>();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alumni, setALumni] = useState<Alumni>();
    const [notFound, setNotFound] = useState(false);
    const [education, setEducation] = useState<Education[]>([]);

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
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <>
            {notFound ? (
                <div className="w-full p-10 text-center text-red-600 text-lg font-semibold">
                    Məlumat tapılmadı
                </div>
            ) : (
                <>
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
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
                                    <div className="relative w-23 h-23 rounded-full">
                                        <img
                                            src={`http://localhost:8000/${alumni?.photo}`}
                                            alt={alumni?.name}
                                            className="w-full h-full object-cover rounded-full border border-gray-200 dark:border-gray-800"
                                        />
                                        <span
                                            className={`
    absolute bottom-1 right-3
    w-3.5 h-3.5
    rounded-full
    ring-2 ring-white dark:ring-gray-900
    ${true ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" : "bg-gray-400"}
  `}
                                        ></span>
                                    </div>
                                )}
                                <div className="order-3 xl:order-2">
                                    <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                        {alumni?.name} {alumni?.surname} {alumni?.father_name}
                                    </h4>
                                    <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {alumni?.job_title}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {alumni?.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col items-center w-full gap-6 xl:flex-row font-bold border-b border-gray-200 pb-[20px]">
                                Şəxsi məlumatlar
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
                                        <h3 className="text-gray-500 mb-[5px]">Ad, Soyad, Ata adı</h3>
                                        <p>
                                            {alumni?.name} {alumni?.surname} {alumni?.father_name}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">E-poçt</h3>
                                        <p>{alumni?.email}</p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Telefon nömrəsi</h3>
                                        <p>
                                            {alumni?.phone_number ? (
                                                alumni?.phone_number
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Fin Kod</h3>
                                        <p>
                                            {alumni?.fin_code ? (
                                                alumni?.fin_code
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Qeydiyyatda olduğu şəhər, ölkə</h3>
                                        <p>
                                            {alumni?.registered_city ? (
                                                alumni?.registered_city
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Qeydiyyatda olduğu ünvan</h3>
                                        <p>
                                            {alumni?.registered_address ? (
                                                alumni?.registered_address
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Yaşayış ünvanı</h3>
                                        <p>
                                            {alumni?.address ? (
                                                alumni?.address
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
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
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
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
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Mədəni hal</h3>
                                        <p>
                                            {alumni?.married !== null && alumni?.married !== undefined ? (
                                                alumni.married ? "Evli" : "Subay"
                                            ) : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Qeydiyyat tarixi</h3>
                                        <p>
                                            {alumni?.created_at}
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/4">
                                        <h3 className="text-gray-500 mb-[5px]">Profilin yenilənmə tarixi</h3>
                                        <p>
                                            {alumni?.updated_at ? alumni?.updated_at : (
                                                <div className="inline-block px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-[30px]">
                                                    Mövcud deyil
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col items-center w-full gap-6 xl:flex-row font-bold border-b border-gray-200 pb-[20px]">
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
                                                <h4 className="text-gray-800 dark:text-white font-semibold">
                                                    {edu.university}
                                                </h4>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    {edu.degree}, {edu.major}
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    {edu.start_date} - {edu.end_date ? edu.end_date : "Davam edir"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-yellow-800 bg-yellow-300 inline-block px-2 py-1 rounded-[30px]">
                                    Mövcud deyil
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col items-center w-full gap-6 xl:flex-row font-bold border-b border-gray-200 pb-[20px]">
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
                            ) : education.length > 0 ? (
                                <div className="relative mt-5">
                                    {education.map((edu, index) => (
                                        <div key={index} className="flex items-start gap-4 relative pb-8 last:pb-0">
                                            {index !== education.length - 1 && (
                                                <div className="absolute left-[5px] top-5 bottom-2 w-px bg-gray-300"></div>
                                            )}
                                            <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0 z-10"></div>
                                            <div>
                                                <h4 className="text-gray-800 dark:text-white font-semibold">
                                                    {edu.university}
                                                </h4>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    {edu.degree}, {edu.major}
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    {edu.start_date} - {edu.end_date ? edu.end_date : "Davam edir"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-yellow-800 bg-yellow-300 inline-block px-2 py-1 rounded-[30px]">
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
