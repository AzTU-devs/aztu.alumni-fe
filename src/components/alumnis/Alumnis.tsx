import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router";
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from "react";
import { AlumnisInterface, getAlumnis } from "../../services/alumni/alumniService";
import Skeleton from '@mui/material/Skeleton';
import BottomNavigation from "../bottomNavigation/BottomNavigation";

// Removed fake tableData and Order interface as real alumnis are used.

export default function Alumnis() {
  const [page, setPage] = useState(1);
  const pageSize = 5; // same as before
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [alumnis, setAlumnis] = useState<AlumnisInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    getAlumnis(start, end)
      .then((res) => {
        if (typeof res === "object") {
          setTotal(res.total);
          setAlumnis(res.alumnis);
        } else {
          setTotal(0);
          setAlumnis([]);
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  console.log(alumnis);
  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-[#F5F5F7]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Məzun
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                E-poçt
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Qeydiyyat tarixi
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Son daxil olma
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Əməliyyatlar
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <Skeleton variant="circular" width={44} height={44} />
                      <div className="flex flex-col gap-1 w-32">
                        <Skeleton variant="text" width="100%" height={12} />
                        <Skeleton variant="text" width="80%" height={10} />
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="px-4 py-3 text-theme-sm">
                    <Skeleton variant="text" width="120px" height={12} />
                  </TableCell>

                  {/* Registration Date */}
                  <TableCell className="px-4 py-3 text-theme-sm">
                    <Skeleton variant="text" width="100px" height={12} />
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-theme-sm">
                    <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm">
                    <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-3 text-theme-sm flex items-center gap-2">
                    <Skeleton variant="rectangular" width={32} height={32} className="rounded-md" />
                    <Skeleton variant="rectangular" width={32} height={32} className="rounded-md" />
                    <Skeleton variant="rectangular" width={32} height={32} className="rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            ) : alumnis.length > 0 ? (
              alumnis.map((alumni) => (
                <TableRow key={alumni.uuid}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full">
                        <img
                          src={`http://localhost:8000/${alumni.photo}`}
                          alt={alumni.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 shadow-sm"
                        />
                        {/* Online / Offline Badge */}
                        <span
                          className={`
                            absolute -bottom-0.5 -right-0.5
                            w-3.5 h-3.5 
                            rounded-full
                            ring-2 ring-white dark:ring-gray-900
                            ${true ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" : "bg-gray-400"}
                          `}
                        ></span>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {alumni.name} {alumni.surname} {alumni.father_name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {alumni.job_title}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {alumni.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {alumni.created_at}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {alumni.last_login
                      ? new Date(alumni.last_login).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        }).replace(',', '')
                      : '-'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                      ${true
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                        }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${true
                          ? "bg-green-500"
                          : "bg-red-500"
                          }`}
                      ></span>

                      {true ? "Aktiv" : "Deaktiv"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center justify-between">
                    <Link to={`/alumni/${alumni.uuid}`}>
                      <div className="border-1 border-[#CDD9FA] p-2 rounded-[10px] bg-[#E8EEFC] cursor-pointer">
                        <RemoveRedEyeIcon sx={{ color: "#4167E9" }} />
                      </div>
                    </Link>
                    <div className="border-1 border-[#CDD9FA] p-2 rounded-[10px] bg-[#E8EEFC] cursor-pointer">
                      <CreateIcon sx={{ color: "#4167E9" }} />
                    </div>
                    <div className="border-1 border-[#CA4C3F] p-2 rounded-[10px] bg-[#F3D5D2] cursor-pointer">
                      <DeleteOutlineIcon sx={{ color: "#CA4C3F" }} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No alumni found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-white/[0.05] bg-[#F5F5F7]">
          {/* Showing X-Y out of total */}
          <div className="text-gray-500 text-theme-sm dark:text-gray-400">
            {`Showing ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total ?? 0)} out of ${total ?? 0}`}
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded-md bg-white dark:bg-gray-800 text-theme-sm cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Əvvəlki
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.ceil((total ?? 0) / pageSize) }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                key={pageNumber}
                className={`px-3 py-1 border rounded-md text-theme-sm ${pageNumber === page ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-white dark:bg-gray-800"}`}
                onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className="px-3 py-1 border rounded-md bg-white dark:bg-gray-800 text-theme-sm cursor-pointer"
              disabled={page >= Math.ceil((total ?? 0) / pageSize)}
              onClick={() => setPage(page + 1)}
            >
              Növbəti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
