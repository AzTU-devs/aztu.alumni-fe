import { useState } from "react";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { EyeIcon, EyeCloseIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSignupData } from "../../redux/slices/signupSlice";

interface StepOneSignUpProps {
  onNext: (data: { fname: string; lname: string; email: string; password: string }) => void;
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
  const [surname, setSurname] = useState(signup.lname);
  const [email, setEmail] = useState(signup.email);
  const [password, setPassword] = useState(signup.password);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !surname || !email || !password) {
      setError("Bütün sahələr doldurulmalıdır.");
      return;
    }

    setError("");

    dispatch(setSignupData({
      fname: name,
      lname: surname,
      email,
      password,
    }));

    onNext({
      fname: name,
      lname: surname,
      email,
      password,
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-5">
      <h2 className="text-2xl font-semibold mb-4">Addım 1: Şəxsi məlumatlar</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form className="space-y-5 w-full" onSubmit={handleNext}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>Ad<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="text"
              name="fname"
              value={name}
              onChange={(e) => setName(capitalizeWords(e.target.value))}
              placeholder="Ad"
            />
          </div>
          <div>
            <Label>Soyad<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="text"
              name="lname"
              value={surname}
              onChange={(e) => setSurname(capitalizeWords(e.target.value))}
              placeholder="Soyad"
            />
          </div>
        </div>

        <div>
          <Label>Email<span className="text-error-500">*</span></Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <Label>Password<span className="text-error-500">*</span></Label>
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
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Növbəti
        </Button>
      </form>
    </div>
  );
}