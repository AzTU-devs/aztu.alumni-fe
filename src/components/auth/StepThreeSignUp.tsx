import Swal from "sweetalert2";
import { useState } from "react";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "../../icons";
import { RootState } from "../../redux/store";
import { signup, SignupPayload } from "../../services/authentication/authenticationService";

interface StepThreeSignUpProps {
  onNext: (data: { email: string }) => void;
  onBack: () => void;
}

export default function StepThreeSignUp({ onNext, onBack }: StepThreeSignUpProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const signupDatas = useSelector((state: RootState) => state.signup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const signupPayload: SignupPayload = {
      name: signupDatas.fname,
      surname: signupDatas.lname,
      father_name: signupDatas.lname,
      gender: signupDatas.gender,
      birth_date: signupDatas.birthDate,
      major_code: signupDatas.major,
      email: signupDatas.email,
      password: signupDatas.password,
      education_degree: signupDatas.degree,
      start_date: signupDatas.startDate,
      end_date: signupDatas.endDate
    }

    const result = await signup(signupPayload);

    if (result === "SUCCESS") {
      onNext({ email: signupDatas.email });
      setLoading(false);
    } else if (result === "EMAIL_EXISTS") {
      Swal.fire({
        icon: "error",
        title: "Qeydiyyat alınmadı",
        text: "Bu e-poçt artıq mövcuddur. Zəhmət olmasa başqa bir e-poçt daxil edin.",
        confirmButtonText: "Başa düşdüm",
        confirmButtonColor: "#ef4444",
      }).then(() => {
        setLoading(false);
      });
    } else if (result === "NETWORK_ERROR") {
      Swal.fire({
        icon: "error",
        title: "Qeydiyyat alınmadı",
        text: "İnternet şəbəkəsinin olduğundan əmin olun.",
        confirmButtonText: "Başa düşdüm",
        confirmButtonColor: "#ef4444",
      }).then(() => {
        setLoading(false);
      });
    } else if (result === "SERVER_ERROR") {
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
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="w-[60%] mx-auto mb-5 sm:pt-10">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5 mr-1" /> Əvvəlki addım
        </button>
      </div>

      <div className="flex flex-col justify-center flex-1 w-[60%] mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Məlumatlarınızı doğrulayın
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aşağıdakı məlumatları gözdən keçirin və təsdiqləyin.
          </p>
        </div>

        <div className="space-y-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <Label className="font-bold">Ad</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.fname}</p>
            </div>

            <div>
              <Label className="font-bold">Soyad</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.lname}</p>
            </div>
            <div>
              <Label className="font-bold">Ata adı</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.lname}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b p-5">
            <div>
              <Label className="font-bold">Cinsiniz</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.gender}</p>
            </div>

            <div>
              <Label className="font-bold">Doğum tarixi</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.birthDate}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b p-5">
            <div>
              <Label className="font-bold">E-poçt</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.email}</p>
            </div>

            <div>
              <Label className="font-bold">Şifrə</Label>
              <div className="flex items-center gap-3">
                <p className="mt-1 text-gray-800 dark:text-white">
                  {showPassword ? signupDatas.password : "••••••••"}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {showPassword ? "Gizlə" : "Göstər"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b p-5">
            <div>
              <Label className="font-bold">Təhsil pilləsi</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.degree}</p>
            </div>

            <div>
              <Label className="font-bold">İxtisas</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.major}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-5">
            <div>
              <Label className="font-bold">Başlanğıc tarixi</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.startDate}</p>
            </div>

            <div>
              <Label className="font-bold">Bitirmə tarixi</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{signupDatas.endDate}</p>
            </div>
          </div>
        </div>

        <Button disabled={loading} className="mt-[10px]">
          {loading ? "Təsdiqlənir..." : "Təsdiqlə"}
        </Button>

        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 mt-5">
          Hər hansı bir məlumatda dəyişiklik etmək üçün əvvəlki addıma qayıdın və dəyişiklik edin.
        </p>
      </div>
    </form>
  );
}
