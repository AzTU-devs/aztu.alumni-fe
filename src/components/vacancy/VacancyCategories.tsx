import {
    Table,
    TableCell,
    TableRow,
    TableHeader,
    TableBody
} from "../ui/table";
import Label from "../form/Label";
import { Link } from "react-router";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import React, { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from "../../hooks/useModal";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createVacancyCategory, CreateVacancyCategory, getVacancyCategories, updateVacancyCategory, UpdateVacancyCategoryPayload, VacancyCategoriesInterface } from "../../services/vacancy/vacancyService";
import Swal from "sweetalert2";

export default function VacancyCategories() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [categories, setCategories] = useState<VacancyCategoriesInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<VacancyCategoriesInterface | null>(null);

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

    const { isOpen, openModal, closeModal } = useModal();
    const handleSave = async () => {
        setUpdateLoading(true);
        if (!selectedCategory) return;

        const categoryPayload: UpdateVacancyCategoryPayload = {
            category_code: selectedCategory.category_code,
            title: selectedCategory.title
        };

        const result = await updateVacancyCategory(categoryPayload);

        if (result === "SUCCESS") {
            setCategories(prevCategories =>
                prevCategories.map(cat =>
                    cat.category_code === selectedCategory.category_code ? selectedCategory : cat
                )
            );

            Swal.fire({
                icon: "success",
                title: "Uğurlu!",
                text: "Kateqoriya uğurla yeniləndi",
                timer: 1500,
                showConfirmButton: false,
                backdrop: true,
                heightAuto: false,
                target: document.body,
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup') as HTMLElement;
                    if (popup) popup.style.zIndex = '99999';
                },
                didClose: () => {
                    closeModal();
                    setUpdateLoading(false);
                }
            });
        }

        if (result === "NOT FOUND") {
            Swal.fire({
                icon: "error",
                title: "Tapılmadı!",
                text: "Bu kateqoriya mövcud deyil"
            }).then(() => {
                setUpdateLoading(false);
            });
        }

        if (result === "ERROR") {
            Swal.fire({
                icon: "error",
                title: "Xəta!",
                text: "Yeniləmə zamanı xəta baş verdi"
            }).then(() => {
                setUpdateLoading(false);
            });
        }
    };

   const handleVacancCreate = async () => {
    setUpdateLoading(true);
    try {
        const createCategoryPayload: CreateVacancyCategory = { title: title };
        const result = await createVacancyCategory(createCategoryPayload);

        if (result === "SUCCESS") {
            Swal.fire({
                icon: "success",
                title: "Uğurlu!",
                text: "Kateqoriya uğurla əlavə edildi",
                timer: 1500,
                showConfirmButton: false,
                backdrop: true,
                heightAuto: false,
                target: document.body,
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup') as HTMLElement;
                    if (popup) popup.style.zIndex = '99999';
                },
                didClose: () => {
                    setCategories((prev) => [
                        ...prev,
                        { category_code: Date.now().toString(), title: title, created_at: new Date().toISOString() }
                    ]);
                    setTitle("");
                    setUpdateLoading(false);
                    closeModal();
                }
            });
        } else if (result === "CONFLICT") {
            Swal.fire({
                icon: "error",
                title: "Xəta!",
                text: "Kateqoriya artıq mövcuddur"
            }).then(() => {
                closeModal();
                setUpdateLoading(false)
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Xəta!",
                text: "Gözlənilməz xəta baş verdi, yenidən cəhd edin"
            }).then(() => {
                closeModal();
                setUpdateLoading(false)
            });
        }
    } catch (err: any) {
        Swal.fire({
            icon: "error",
            title: "Xəta!",
            text: "Gözlənilməz xəta baş verdi, yenidən cəhd edin"
        }).then(() => {
                closeModal();
                setUpdateLoading(false)
            });
    }
};

    return (
        <>
            <div className="flex items-center justify-between w-full gap-6 xl:flex-row font-bold border-b border-gray-200 pb-[20px]">
                <h2 className="text-gray-800 dark:text-gray-200">
                    Kateqoriyalar
                </h2>
                <button
                    className='flex items-center justify-center border-1 border-[#CDD9FA] p-2 rounded-[10px] bg-[#E8EEFC] text-[#4167E9] mr-[10px]'
                    onClick={() => {
                        setSelectedCategory({
                            category_code: "",
                            title: "",
                            created_at: ""
                        });
                        setTitle("");
                        openModal();
                    }}
                >
                    <AddIcon />
                    <p className="text-[#4167E9]">
                        Əlavə et
                    </p>
                </button>
            </div>
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
                                    Kateqoriya adı
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Yaradılma tarixi
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
                                <TableRow>
                                    {/* Email */}
                                    <TableCell className="px-4 py-3 text-theme-sm">
                                        <Skeleton variant="text" width="120px" height={12} />
                                    </TableCell>

                                    {/* Registration Date */}
                                    <TableCell className="px-4 py-3 text-theme-sm">
                                        <Skeleton variant="text" width="100px" height={12} />
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="px-4 py-3 text-theme-sm flex items-center gap-2">
                                        <Skeleton variant="rectangular" width={32} height={32} className="rounded-md" />
                                        <Skeleton variant="rectangular" width={32} height={32} className="rounded-md" />
                                        <Skeleton variant="rectangular" width={32} height={32} className="rounded-md" />
                                    </TableCell>
                                </TableRow>
                            ) : categories.length > 0 ? (
                                categories.map((category) => (
                                    <TableRow key={category.category_code}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {category.title}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {category.created_at}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center justify-start">
                                            <div
                                                className="border-1 border-[#CDD9FA] p-2 rounded-[10px] bg-[#E8EEFC] cursor-pointer mr-[10px]"
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    openModal();
                                                }}
                                            >
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
                </div>
                <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                        <div className="px-2 pr-14">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                {selectedCategory?.category_code ? "Yeniləyin" : "Yeni kateqoriya yaradın"}
                            </h4>
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                {selectedCategory?.category_code ? "Vakansiya kateqoriyasını yeniləyin" : "Yeni vakansiya kateqoriyası yaradın"}
                            </p>
                        </div>
                        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                            <div className="px-2 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <Label>Kateqoriya adı</Label>
                                        <Input
                                            type="text"
                                            value={selectedCategory?.category_code ? selectedCategory?.title : title}
                                            onChange={(e) => {
                                                if (selectedCategory?.category_code) {
                                                    setSelectedCategory((prev) =>
                                                        prev ? { ...prev, title: e.target.value } : prev
                                                    )
                                                } else {
                                                    setTitle(e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                <Button size="sm" variant="outline" onClick={closeModal}>
                                    Bağla
                                </Button>
                                <Button
  size="sm"
  onClick={selectedCategory?.category_code ? handleSave : handleVacancCreate}
  disabled={updateLoading}
>
    {updateLoading
        ? "Yadda saxlanılır"
        : selectedCategory?.category_code
            ? "Yenilə"
            : "Yarat"}
</Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    )
}
