    import { useState } from "react";
    import { Link } from "react-router";
    import Label from "../form/Label";
    import Input from "../form/input/InputField";
    import Checkbox from "../form/input/Checkbox";
    import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
    interface StepThreeSignUpProps {
    onBack: () => void;
    data: {
        fname: string;
        lname: string;
        email: string;
        password: string;
        agreed?: boolean;
    };
    }


    export default function StepThreeSignUp({ onBack, data }: StepThreeSignUpProps) {
        const [showPassword, setShowPassword] = useState(false);
        const [isChecked, setIsChecked] = useState(false);
        return (
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="size-5 mr-1" /> Back
          </button>
        </div>

        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Confirm Your Information
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Review the details below and confirm your account.
            </p>
          </div>

          <div className="space-y-4 bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <Label>First Name</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{data.fname}</p>
            </div>

            <div>
              <Label>Last Name</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{data.lname}</p>
            </div>

            <div>
              <Label>Email</Label>
              <p className="mt-1 text-gray-800 dark:text-white">{data.email}</p>
            </div>

            <div>
              <Label>Password</Label>
              <div className="flex items-center gap-3">
                <p className="mt-1 text-gray-800 dark:text-white">
                  {showPassword ? data.password : "••••••••"}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-blue-500 hover:underline"
                    >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
                </div>
          </div>

          <button className="mt-6 w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
            Confirm & Finish
          </button>

          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 mt-5">
            Want to change something? Use the back button above.
          </p>
            </div>
      </div>
        );
    }
