import Swal from "sweetalert2";
import Label from "../form/Label";
import { useState, useRef } from "react";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import Input from "../form/input/InputField";
import { ChevronLeftIcon } from "../../icons";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router";
import { verifySignup, VerifySignupPayload } from "../../services/authentication/authenticationService";

interface StepFourSignUpProps {
    onBack: () => void;
}

export default function StepFourSignUp({ onBack }: StepFourSignUpProps) {
    const navigate = useNavigate();
    // const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const signupDatas = useSelector((state: RootState) => state.signup);

    const handleVerifySignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const signupPayload: VerifySignupPayload = {
                name: signupDatas.fname,
                surname: signupDatas.lname,
                father_name: signupDatas.lname,
                gender: "Kişi",
                birth_date: "2025-10-11",
                major_code: signupDatas.major,
                email: signupDatas.email,
                password: signupDatas.password,
                education_degree: signupDatas.degree,
                start_date: signupDatas.startDate,
                end_date: signupDatas.endDate,
                otp: Number(otp.join(""))
            }
            const result = await verifySignup(signupPayload);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Qeydiyyat tamamlandı",
                    text: "E-poçt adresinizi izləmədə qalın, hesabınız təsdiq edildikdən sonra sizə qısa zamanda bildiriləcək.",
                    confirmButtonText: "Başa düşdüm",
                    confirmButtonColor: "#4461efff",
                }).then(() => {
                    navigate("/signin");
                });
            } else if (result === "BAD_REQUEST") {
                Swal.fire({
                    icon: "error",
                    title: "Qeydiyyat alınmadı",
                    text: "Bütün məlumatların tam və düzgün olduğundan əmin olun.",
                    confirmButtonText: "Başa düşdüm",
                    confirmButtonColor: "#ef4444",
                }).then(() => {
                    setLoading(false);
                });
            } else if (result === "INVALID_OTP") {
                Swal.fire({
                    icon: "error",
                    title: "Qeydiyyat alınmadı",
                    text: "Daxil etdiyiniz OTP kodu yanlışdır.",
                    confirmButtonText: "Başa düşdüm",
                    confirmButtonColor: "#ef4444",
                }).then(() => {
                    setLoading(false);
                });
            } else if (result === "OTP_EXPIRED") {
                Swal.fire({
                    icon: "error",
                    title: "Qeydiyyat alınmadı",
                    text: "Daxil etdiyiniz OTP kodunun müddəti bitmişdir. Əvvəlki addıma qayıdaraq yenidən OTP əldə edin.",
                    confirmButtonText: "Başa düşdüm",
                    confirmButtonColor: "#ef4444",
                }).then(() => {
                    setLoading(false);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Qeydiyyat alınmadı",
                    text: "Gözlənilməz xəta baş verdi. Zəhmət olmasa biraz sonra yenidən cəhd edin.",
                    confirmButtonText: "Başa düşdüm",
                    confirmButtonColor: "#ef4444",
                }).then(() => {
                    setLoading(false);
                });
            }
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Qeydiyyat alınmadı",
                text: "Gözlənilməz xəta baş verdi. Zəhmət olmasa biraz sonra yenidən cəhd edin.",
                confirmButtonText: "Başa düşdüm",
                confirmButtonColor: "#ef4444",
            }).then(() => {
                setLoading(false);
            });
        }
    }

    const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

    return (
        <div className="flex flex-col justify-center items-center w-[90%]">
            <div className="flex flex-col flex-1 justify-center">
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
                    >
                        <ChevronLeftIcon className="size-5 mr-1" /> Əvvəlki addım
                    </button>
                </div>
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            OTP təsdiqləmə
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qeydiyyati tamamlamaq üçün e-poçt adresinizə göndərilmiş bir dəfəlik (6 rəqəmli) OTP kodunu daxil edin.
                        </p>
                    </div>
                    <div>
                        <form
                            onSubmit={handleVerifySignUp}
                        >
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        OTP Kodu <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="flex gap-2 items-center">
                                        {otp.map((digit, index) => (
                                            <div key={index} className="flex items-center">
                                                <Input
                                                    ref={inputRefs[index]}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "");
                                                        const newOtp = [...otp];
                                                        newOtp[index] = value;
                                                        setOtp(newOtp);
                                                        if (value && index < inputRefs.length - 1) {
                                                            inputRefs[index + 1].current?.focus();
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                                                            inputRefs[index - 1].current?.focus();
                                                        }
                                                    }}
                                                    className="text-center w-8"
                                                    placeholder="-"
                                                />
                                                {index === 2 && (
                                                    <span className="ml-2 text-lg text-gray-500 select-none">-</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        className="w-full"
                                        size="sm"
                                        disabled={loading || otp.join("").length !== 6}
                                    >
                                        {loading ? "Təsdiqlənir..." : "Təsdiqlə"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
