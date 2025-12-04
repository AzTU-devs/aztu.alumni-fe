import { Link } from "react-router";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import VacancyFilter from "./VacancyFilter";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { getVacancies, VacancyInterface } from "../../services/vacancy/vacancyService";

export default function Vacancies() {
  const [end, setEnd] = useState(10);
  const [start, setStart] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);
  const [loading, setLoading] = useState(false);
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

  const toggleSaving = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

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
    if (isSameDay(date, yesterday)) return "Yesterday";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
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
      {/* <div className="mb-6 px-4 sm:px-6 lg:px-8">
        <VacancySearch />
      </div> */}
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
              <div key={index} className="border border-gray-200 rounded-lg bg-white p-4 sm:p-6 mb-5 w-full">
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
                <div key={vacancy.vacancy_code} className="border border-gray-200 rounded-lg bg-white p-4 sm:p-6 mb-5 w-full">
                  <div className="flex sm:items-center justify-between mb-6">
                    <div>
                      <h2 className="text-blue-900 font-bold text-lg sm:text-xl mb-1">{vacancy.job_title}</h2>
                      <p className="text-gray-600 mb-1">{vacancy.company}</p>
                      <div className="flex items-center text-gray-600">
                        <LocationOnIcon sx={{ color: "gray" }} />
                        <p className="ml-1">
                          {vacancy.city}, {vacancy.country}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 cursor-pointer">
                      {savedIds.has(vacancy.vacancy_code) ? (
                        <div onClick={() => toggleSaving(vacancy.vacancy_code)}>
                          <BookmarkIcon />
                        </div>
                      ) : (
                        <div onClick={() => toggleSaving(vacancy.vacancy_code)}>
                          <BookmarkBorderIcon />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="text-gray-700 mb-3 sm:mb-0">
                      {formatDate(vacancy.created_at)}
                    </div>
                    <div>
                      <Link
                        to={`/vacancy/${vacancy.vacancy_code}`}
                        state={{ vacancy }}
                      >
                        <button className='border border-[#CDD9FA] p-2 rounded-lg bg-[#E8EEFC] text-[#4167E9] hover:bg-[#d7e0fa] transition'>
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
