import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "../../hooks/useModal";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DropzoneComponent from "../form/form-elements/DropZone";
import { uploadUserProfilePhoto } from "../../services/alumni/alumniService";
import Swal from "sweetalert2"; // <- import SweetAlert2

export default function UserSettingsCard({
    uuid,
    photo,
    name,
    surname,
    email,
}: {
    uuid: string | null | undefined;
    photo: string | null | undefined;
    name: string | null | undefined;
    surname: string | null | undefined;
    email: string | null | undefined;
}) {
    const {
        isOpen: isImageModalOpen,
        openModal: openImageModal,
        closeModal: closeImageModal,
    } = useModal();

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        Swal.fire({
            title: "Fayl seçildi",
            text: `Fayl seçildi: ${file.name}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
    };

    const handleUpload = async () => {
        if (!selectedFile || !uuid) return;

        setIsUploading(true);

        const res = await uploadUserProfilePhoto(uuid, selectedFile);

        setIsUploading(false);

        if (res.status === "SUCCESS") {
            Swal.fire({
                title: "Uğurlu",
                text: "Şəkil uğurla yükləndi!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            closeImageModal();
            window.location.reload();
        } else {
            Swal.fire({
                title: "Xəta",
                text: "Şəkil yüklənmədi!",
                icon: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    return (
        <>
            <div className="rounded-2xl dark:border-gray-800"> 
                <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex flex-col sm:flex-row items-center justify-start w-full">
                        <div className="relative w-23 h-23 mr-0 sm:mr-[20px] mb-4 sm:mb-0">
                            <img
                                src={photo ? `http://localhost:8000/${photo}` : "/profile-image.png"}
                                alt="user"
                                className="w-full h-full object-cover rounded-full border border-gray-200 dark:border-gray-800"
                            />
                            <button
                                className="absolute bg-blue-500 bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full text-gray-700 dark:bg-gray-800 dark:text-gray-200 shadow-md"
                                onClick={openImageModal}
                            >
                                <CameraAltIcon className="w-4 h-4" sx={{ color: "white" }} />
                            </button>
                        </div>
                        <div className="order-3 xl:order-2 text-center sm:text-left">
                            <h4 className="mb-2 text-lg font-semibold text-center sm:text-left text-gray-800 dark:text-white/90">
                                {name} {surname}
                            </h4>
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isImageModalOpen} onClose={closeImageModal} className="max-w-[500px] m-4">
                <div className="relative w-full overflow-y-auto rounded-3xl bg-white p-10 dark:bg-gray-900">
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                        Şəkil əlavə edin
                    </h4>
                    <DropzoneComponent onFileSelect={handleFileSelect} />
                    <div className="flex justify-end mt-4 gap-3">
                        <Button size="sm" variant="outline" onClick={closeImageModal}>
                            Ləğv et
                        </Button>
                        <Button size="sm" onClick={handleUpload} disabled={!selectedFile || isUploading}>
                            {isUploading ? "Yüklənir..." : "Yüklə"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}