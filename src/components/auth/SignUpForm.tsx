import { useState } from "react";
import StepOneSignUp from "./StepOneSignUp";
import StepTwoSignUp from "./StepTwoSignUp";
import StepThreeSignUp from "./StepThreeSignUp";
import StepFourSignUp from "./StepFourSignUp";

function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="flex items-center w-full max-w-md mb-4">
      {steps.map((step, index) => {
        // const isCompleted = currentStep > step;
        // const isActive = currentStep === step;

        // let lineFill = 0;
        // if (currentStep > step) {
        //   lineFill = 100; // fully filled
        // } else if (currentStep === step) {
        //   lineFill = 0; // start filling next segment only after step increment
        // }

        return (
          <div key={step} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${currentStep >= step ? "bg-blue-500" : "bg-gray-300"
                }`}
            >
              {step}
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 rounded overflow-hidden relative bg-gray-300">
                <div
                  className="h-1 rounded absolute left-0 top-0 bg-blue-500 transition-all duration-300"
                  style={{
                    width: `${currentStep > step ? 100 : 0}%`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
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
    <div className="flex flex-col items-center justify-center w-[50%] px-4 min-h-screen">
      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {currentStep === 1 && <StepOneSignUp onNext={handleNext} />}
      {currentStep === 2 && <StepTwoSignUp onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && (<StepThreeSignUp onNext={handleNext} onBack={handleBack} />)}
      {currentStep === 4 && <StepFourSignUp onBack={handleBack} />}
    </div>
  );
}