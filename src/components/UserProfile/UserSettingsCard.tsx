import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DropzoneComponent from "../form/form-elements/DropZone";

export default function UserSettingsCard() {
    const {
        isOpen: isImageModalOpen,
        openModal: openImageModal,
        closeModal: closeImageModal,
    } = useModal();

    const name = useSelector((state: RootState) => state.auth.name);
    const email = useSelector((state: RootState) => state.auth.email);
    const surname = useSelector((state: RootState) => state.auth.surname);
    // const finCode = useSelector((state: RootState) => state.auth.fin_code);
    const father_name = useSelector((state: RootState) => state.auth.father_name);

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex items-center">
                    <div className="flex items-center justify-start w-full">
                        <div className="relative w-23 h-23 mr-[20px]">
                            <img
                                src="/images/user/owner.jpg"
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
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {name} {surname} {father_name}
                            </h4>
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {email}
                                </p>
                                {/* <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {finCode}
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Upload Modal */}
            <Modal isOpen={isImageModalOpen} onClose={closeImageModal} className="max-w-[500px] m-4">
                <div className="relative w-full overflow-y-auto rounded-3xl bg-white p-10 dark:bg-gray-900">
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                        Şəkil əlavə edin
                    </h4>
                    <DropzoneComponent />
                    <div className="flex justify-end mt-4 gap-3">
                        <Button size="sm" variant="outline" onClick={closeImageModal}>
                            Ləğv et
                        </Button>
                        <Button size="sm" onClick={() => console.log("Upload confirmed")}>
                            Yüklə
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
