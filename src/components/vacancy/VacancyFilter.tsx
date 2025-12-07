import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getVacancyCategories, VacancyCategoriesInterface } from "../../services/vacancy/vacancyService";

export default function VacancyFilter({ onApply }: { onApply: (filters: any) => void }) {
    const [jobTypeOpen, setJobTypeOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [jobLocationOpen, setJobLocationOpen] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [categories, setCategories] = useState<VacancyCategoriesInterface[]>([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState<number[]>([]);
    const [selectedJobLocations, setSelectedJobLocations] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categoryOpen, setCategoryOpen] = useState(true);

    useEffect(() => {
            setLoading(true);
            getVacancyCategories()
                .then((res) => {
                    if (Array.isArray(res)) {
                        setCategories(res);
                    } else {
                        setCategories([]);
                    }
                })
                .finally(() => {
                    setLoading(false);
                })
        }, []);

    const jobTypes = [
        { id: 1, label: "Tam zamanlı" },
        { id: 2, label: "Yarım zamanlı" },
        { id: 3, label: "Özəl işçi" },
        { id: 4, label: "Freelance" },
        { id: 5, label: "Müqavilə" },
        { id: 6, label: "Təcrübə" },
        { id: 7, label: "Könüllü" },
    ];

    const jobLocations = [
        { id: 1, label: "Ofisdə" },
        { id: 2, label: "Hibrid" },
        { id: 3, label: "Uzaqdan" },
    ];

    const toggleSelection = (id: number, arr: number[], setArr: (arr: number[]) => void) => {
        if (arr.includes(id)) {
            setArr(arr.filter(i => i !== id));
        } else {
            setArr([...arr, id]);
        }
    };

    const clearFilters = () => {
        setSelectedJobTypes([]);
        setSelectedJobLocations([]);
        setSelectedCategories([]);
    };

    const animationProps = {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.3 },
    };

    const hasFilters =
        selectedJobTypes.length > 0 ||
        selectedJobLocations.length > 0 ||
        selectedCategories.length > 0;

    return (
        <>
            <div className="md:hidden top-40 right-4 z-50">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md flex items-center justify-between"
                >
                    <MenuIcon sx={{marginRight: "10px"}} />
                    <p>Filter</p>
                </button>
            </div>
            <aside className={`border border-gray-200 dark:border-gray-800 rounded-[10px] fixed inset-y-0 left-0 bg-white dark:bg-gray-900 shadow-md w-72 p-4 z-40 transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none md:block`}>
                
                <div className="flex justify-end md:hidden mb-2">
                    <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-700 dark:text-gray-200">
                        <CloseIcon />
                    </button>
                </div>

                <h2 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Filtrlər</h2>

                <div className="mb-4">
                    <button
                        onClick={() => setJobTypeOpen(!jobTypeOpen)}
                        className="w-full text-left font-medium flex justify-between items-center px-3 py-2 bg-blue-50 dark:bg-gray-800 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
                    >
                        İş növü
                        <span>{jobTypeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
                    </button>
                    <AnimatePresence initial={false}>
                        {jobTypeOpen && (
                            <motion.div {...animationProps} className="mt-2 space-y-1 pl-2 overflow-hidden">
                                {jobTypes.map((type) => (
                                    <label key={type.id} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                        <input
                                            type="checkbox"
                                            checked={selectedJobTypes.includes(type.id)}
                                            onChange={() => toggleSelection(type.id, selectedJobTypes, setSelectedJobTypes)}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                        />
                                        {type.label}
                                    </label>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* İş yeri Section */}
                <div className="mb-4">
                    <button
                        onClick={() => setJobLocationOpen(!jobLocationOpen)}
                        className="w-full text-left font-medium flex justify-between items-center px-3 py-2 bg-blue-50 dark:bg-gray-800 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
                    >
                        İş yeri
                        <span>{jobLocationOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
                    </button>
                    <AnimatePresence initial={false}>
                        {jobLocationOpen && (
                            <motion.div {...animationProps} className="mt-2 space-y-1 pl-2 overflow-hidden">
                                {jobLocations.map((loc) => (
                                    <label key={loc.id} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                        <input
                                            type="checkbox"
                                            checked={selectedJobLocations.includes(loc.id)}
                                            onChange={() => toggleSelection(loc.id, selectedJobLocations, setSelectedJobLocations)}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                        />
                                        {loc.label}
                                    </label>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Kateqoriya Section */}
                <div className="mb-4">
                    <button
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        className="w-full text-left font-medium flex justify-between items-center px-3 py-2 bg-blue-50 dark:bg-gray-800 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
                    >
                        Kateqoriya
                        <span>{categoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
                    </button>

                    <AnimatePresence initial={false}>
                        {categoryOpen && (
                            <motion.div {...animationProps} className="mt-2 space-y-1 pl-2 overflow-hidden max-h-60 overflow-y-auto">
                                {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Yüklənir...</p>}

                                {!loading && categories.length === 0 && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Kateqoriya yoxdur</p>
                                )}

                                {categories.map((cat) => (
                                    <label key={cat.category_code} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.category_code)}
                                            onChange={() =>
                                                toggleSelection(
                                                    cat.category_code as any,
                                                    selectedCategories as any,
                                                    setSelectedCategories as any
                                                )
                                            }
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                        />
                                        {cat.title}
                                    </label>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className='flex flex-col items-center w-full'>
                    <button
                        onClick={() =>
                            onApply({
                                jobTypes: selectedJobTypes,
                                jobLocations: selectedJobLocations,
                                categories: selectedCategories
                            })
                        }
                        className='w-full border border-[#CDD9FA] dark:border-blue-600 p-2 rounded-[10px] bg-[#E8EEFC] dark:bg-gray-800 text-[#4167E9] dark:text-blue-400 mb-2 hover:opacity-90 transition'
                    >
                        Filteri tətbiq et
                    </button>

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className='w-full border border-red-400 dark:border-red-600 p-2 rounded-[10px] bg-[#F3D5D2] dark:bg-red-900/40 text-[#CA4C3F] dark:text-red-300 hover:opacity-90 transition'
                        >
                            Filteri təmizlə
                        </button>
                    )}
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 dark:bg-black/60 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    );
}
