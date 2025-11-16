import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { ChevronLeftIcon, EyeIcon, EyeCloseIcon } from "../../icons";

interface StepTwoSignUpProps {
  onNext: (data: {
    fname: string;
    lname: string;
    email: string;
    password: string;
    agreed: boolean;
  }) => void;
  onBack: () => void; // <-- back prop
}

export default function StepTwoSignUp({ onNext, onBack }: StepTwoSignUpProps) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fname || !formData.lname || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setError("");
    onNext({ ...formData, agreed });
  };

  return (
    <div className="max-w-md mx-auto p-5">
      {/* Back button */}
      <div className="mb-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
        >
          <ChevronLeftIcon className="size-5 mr-1" /> Back
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Step 2: Account Details</h2>

      {error && <p className="mb-3 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>First Name<span className="text-error-500">*</span></Label>
            <Input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          <div>
            <Label>Last Name<span className="text-error-500">*</span></Label>
            <Input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <Label>Email<span className="text-error-500">*</span></Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <Label>Password<span className="text-error-500">*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
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

        <div className="flex items-center gap-3">
          <Checkbox checked={agreed} onChange={setAgreed} />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            I agree to the <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span> and <span className="text-gray-800 dark:text-white/90">Privacy Policy</span>.
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </form>
    </div>
  );
}   