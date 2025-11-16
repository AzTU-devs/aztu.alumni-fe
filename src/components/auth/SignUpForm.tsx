import { useState } from "react";
import StepOneSignUp from "./StepOneSignUp";
import StepTwoSignUp from "./StepTwoSignUp";
import StepThreeSignUp from "./StepThreeSignUp";

// Numbered stepper with connecting lines
function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 flex items-center">
          {/* Circle with number */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
              currentStep >= step ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            {step}
          </div>

          {/* Connecting line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                currentStep > step ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    agreed: false,
  });

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="max-w-md mx-auto p-5">
      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {/* Render current step */}
      {currentStep === 1 && <StepOneSignUp onNext={handleNext} />}
      {currentStep === 2 && <StepTwoSignUp onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <StepThreeSignUp data={formData} onBack={handleBack} />}
    </div>
  );
}