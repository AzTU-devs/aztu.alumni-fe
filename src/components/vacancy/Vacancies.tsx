import Swal from "sweetalert2";
import { Link } from "react-router";
import { Skeleton, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import VacancyFilter from "./VacancyFilter";
import { RootState } from "../../redux/store";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { getVacancies, saveVacancy, SaveVacancyPaload, VacancyInterface } from "../../services/vacancy/vacancyService";

export default function Vacancies() {
  const uuid = useSelector((state: RootState) => state.auth.uuid);
  // const [end, setEnd] = useState(10);
  // const [start, setStart] = useState(0);
  const end = 10;
  const start = 0;
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    jobTypes: number[];
    jobLocations: number[];
    categories: string[];
  }>({
    jobTypes: [],
    jobLocations: [],
    categories: []
  });

  useEffect(() => {
    setLoading(true);
    getVacancies(
      start,
      end,
      uuid,
      search,
      filters.jobTypes[0],
      filters.jobLocations[0],
      filters.categories[0]
    )
      .then((res) => {
        if (Array.isArray(res)) {
          setVacancies(res);
        } else {
          setVacancies([]);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [search, filters, start, end]);

  const handleSave = async (vacancy_code: string) => {
    try {
      setSavingIds(prev => new Set(prev).add(vacancy_code));
      const payload: SaveVacancyPaload = {
        uuid: uuid ? uuid : "",
        vacancy_code: vacancy_code
      }
      const response = await saveVacancy(payload);

      setSavedIds(prev => {
        const next = new Set(prev);
        if (next.has(vacancy_code)) {
          next.delete(vacancy_code);
        } else {
          next.add(vacancy_code);
        }
        return next;
      });

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
    } finally {
      setSavingIds(prev => {
        const next = new Set(prev);
        next.delete(vacancy_code);
        return next;
      });
    }
  };

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

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 w-full">
        <div className="relative w-full">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#F5F5F7] dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none w-full py-3 pl-10 pr-3 rounded-[10px]"
            placeholder="Ad, E-poçt, ixtisas və digər məlumatlarla axtarış edin"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
          <VacancyFilter
            onApply={(data) => {
              setFilters(data);
            }}
          />
        </div>
        <div className="w-full sm:w-3/4">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6 mb-5 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div className="flex-1">
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="40%" height={20} sx={{ mt: 0.5, mb: 1 }} />
                    <div className="flex items-center mt-2">
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="text" width={100} height={20} sx={{ ml: 1 }} />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Skeleton variant="circular" width={24} height={24} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <Skeleton variant="text" width={80} height={20} className="mb-3 sm:mb-0" />
                  <Skeleton variant="rectangular" width={140} height={36} sx={{ borderRadius: '10px' }} />
                </div>
              </div>
            ))
          ) : (
            vacancies.map((vacancy) => {
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
                      {savedIds.has(vacancy.vacancy_code) || vacancy.is_saved ? (
                        <div onClick={() => handleSave(vacancy.vacancy_code)} className='border border-[#CDD9FA] dark:border-blue-600 p-2 rounded-lg bg-[#E8EEFC] dark:bg-gray-800 text-[#4167E9] dark:text-blue-400 hover:bg-[#d7e0fa] dark:hover:bg-gray-700 transition flex justify-center items-center'>
                          {savingIds.has(vacancy.vacancy_code) ? <CircularProgress size={20} /> : <BookmarkIcon />}
                        </div>
                      ) : (
                        <div onClick={() => handleSave(vacancy.vacancy_code)} className='border border-[#CDD9FA] dark:border-blue-600 p-2 rounded-lg bg-[#E8EEFC] dark:bg-gray-800 text-[#4167E9] dark:text-blue-400 hover:bg-[#d7e0fa] dark:hover:bg-gray-700 transition flex justify-center items-center'>
                          {savingIds.has(vacancy.vacancy_code) ? <CircularProgress size={20} /> : <BookmarkBorderIcon />}
                        </div>
                      )}
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
          )}
        </div>
      </div>
    </>
  )
}
