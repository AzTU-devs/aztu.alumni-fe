import { useState } from "react";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import DatePicker from "../form/date-picker";
import { RootState } from "../../redux/store";
import { EyeIcon, EyeCloseIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../redux/slices/signupSlice";

  const sanitizeNameInput = (value: string) => {
    return value.replace(/[^A-Za-zƏəÇçĞğİıÖöŞşÜü\s]/g, "");
  };

interface StepOneSignUpProps {
  onNext: (data: {
    fname: string;
    lname: string;
    fatherName: string;
    gender: string;
    birthDate: string;
    email: string;
    password: string;
  }) => void;
}

export default function StepOneSignUp({ onNext }: StepOneSignUpProps) {
  function capitalizeWords(str: string): string {
    return str
      .split(" ")
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }

  const signup = useSelector((state: RootState) => state.signup);

  const [name, setName] = useState(signup.fname);
  const [email, setEmail] = useState(signup.email);
  const [gender, setGender] = useState(signup.gender);
  const [surname, setSurname] = useState(signup.lname);
  const [password, setPassword] = useState(signup.password);
  const [birthDate, setBirthDate] = useState(signup.birthDate);
  const [fatherName, setFathername] = useState(signup.fatherName);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const genderOptions = [
    {
      value: "Kişi",
      label: "Kişi"
    }, {
      value: "Qadın",
      label: "Qadın"
    }
  ];

  const genderOnChange = (value: string) => {
    setGender(value);
  }

  const dispatch = useDispatch();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !surname || !email || !password || !fatherName) {
      setError("Bütün sahələr doldurulmalıdır.");
      return;
    }

    setError("");

    dispatch(setSignupData({
      fname: name,
      lname: surname,
      fatherName: fatherName,
      gender: gender,
      birthDate: birthDate,
      email,
      password,
    }));

    onNext({
      fname: name,
      lname: surname,
      fatherName: fatherName,
      gender: gender,
      birthDate: birthDate,
      email,
      password,
    });
  };

  return (
    <div className="w-full max-w-6xl flex flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-10 mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">Addım 1: Şəxsi məlumatlar</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form className="space-y-6 w-full" onSubmit={handleNext}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full">
            <Label>Ad<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="text"
              name="fname"
              value={name}
              onChange={(e) => setName(capitalizeWords(sanitizeNameInput(e.target.value)))}
              placeholder="Ad"
            />
          </div>
          <div className="w-full">
            <Label>Soyad<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="text"
              name="lname"
              value={surname}
              onChange={(e) => setSurname(capitalizeWords(sanitizeNameInput(e.target.value)))}
              placeholder="Soyad"
            />
          </div>
          <div className="w-full">
            <Label>Ata adı<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="text"
              name="fatherName"
              value={fatherName}
              onChange={(e) => setFathername(capitalizeWords(sanitizeNameInput(e.target.value)))}
              placeholder="Ata adı"
            />
          </div>
        </div>

        <div className="w-full">
          <Label>Cinsiniz<span className="text-error-500">&nbsp;*</span></Label>
          <Select
            options={genderOptions}
            onChange={genderOnChange}
            value={gender}
            placeholder="Cinsinizi seçin"
          />
        </div>

        <div className="w-full">
          <Label>Doğum tarixi<span className="text-error-500">*</span></Label>
          <DatePicker
            id="end-date"
            placeholder="Doğum tarixi seçin"
            value={birthDate}
            onChange={(_, currentDateString) => {
              setBirthDate(currentDateString || "");
            }}
          />
        </div>

        <div className="w-full">
          <Label>Email<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="w-full">
          <Label>Password<span className="text-error-500">&nbsp;*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>
        </div>

        <Button
          className="w-full px-4 py-3 text-sm sm:text-base md:text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Növbəti
        </Button>
      </form>
    </div>
  );
}