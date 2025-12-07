import Swal from "sweetalert2";
import React, { useState } from "react";
import Label from "../form/Label";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { loginSuccess } from "../../redux/slices/authSlice";
import { signin, SigninPayload } from "../../services/authentication/authenticationService";

export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    const signinPayload: SigninPayload = {
      email,
      password
    };

    try {
      const result = await signin(signinPayload);

      console.log(result);
      

      if (typeof result === "string") {
        switch (result) {
          case "UNAUTHORIZED":
            Swal.fire({
              icon: "error",
              title: "Xəta",
              text: "E-poçt və ya şifrə səhvdir",
            });
            break;
          case "NOT_FOUND":
            Swal.fire({
              icon: "warning",
              title: "Tapılmadı",
              text: "Alumni məlumatı tapılmadı",
            });
            break;
          case "SERVER_ERROR":
            Swal.fire({
              icon: "error",
              title: "Server Xətası",
              text: "Serverdə problem baş verdi. Yenidən cəhd edin",
            });
            break;
          case "NETWORK_ERROR":
            Swal.fire({
              icon: "error",
              title: "Şəbəkə Xətası",
              text: "İnternet bağlantınızı yoxlayın",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Naməlum Xəta",
              text: "Naməlum xəta baş verdi",
            });
        }
        return;
      }

      const token = result?.token;
      const alumni = result?.alumni;
      dispatch(loginSuccess({ token, alumni }));

      navigate("/");

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Naməlum Xəta",
        text: "Xahiş edirik, yenidən cəhd edin",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col flex-1">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daxil Ol
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              E-poçt və şifrəni təmin edərək daxil olun
            </p>
          </div>
          <div>
            <form onSubmit={handleSignin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    E-poçt <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@aztu.edu.az"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Şifrə <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Şifrəni daxil edin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  {/* <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div> */}
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Şifrəmi unutdum?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={loading}>
                    {loading ? "Daxil olunur" : "Daxil ol"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Hesabınız yoxdur? &nbsp;
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Qeydiyyat
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
