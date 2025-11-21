import Label from "../form/Label";
import Select from "../form/Select";
import { useState, useEffect } from "react";
import DatePicker from "../form/date-picker";
import { ChevronLeftIcon } from "../../icons";
import Button from "../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../redux/slices/signupSlice";
import { RootState } from "../../redux/store";

interface StepTwoSignUpProps {
  onNext: (data: {
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
  }) => void;
  onBack: () => void;
}

export default function StepTwoSignUp({ onNext, onBack}: StepTwoSignUpProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signup = useSelector((state: RootState) => state.signup);

  const [degree, setDegree] = useState(signup.degree);
  const [major, setMajor] = useState(signup.major);
  const [startDate, setStartDate] = useState(signup.startDate);
  const [endDate, setEndDate] = useState(signup.endDate);

  useEffect(() => {
    setDegree(signup.degree);
    setMajor(signup.major);
    setStartDate(signup.startDate);
    setEndDate(signup.endDate);
  }, [signup]);

  console.log(signup);
  

  const degreeOptions = [
    {
      value: "Bakalavr",
      label: "Bakalavr"
    }, {
      value: "Magistr",
      label: "Magistr"
    }, {
      value: "Doktorantura",
      label: "Doktorantura"
    }
  ];

  const degreeOnChange = (value: string) => {
    setDegree(value);
  };

  const majorOptions = [
    {
      value: "6001660",
      label: "Kompüter elmləri"
    }, {
      value: "6001550",
      label: "İnformasiya Texnalogiyaları"
    }, {
      value: "6001220",
      label: "Kompüter Mühəndisliyi"
    }
  ];

  const majorOnChange = (value: string) => {
    setMajor(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!degree || !major || !startDate || !endDate) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    const stepTwoData = { degree, major, startDate, endDate };

    // Save to Redux
    dispatch(setSignupData(stepTwoData));

    // Pass data to parent
    onNext(stepTwoData);
  };

  return (
    <div className="w-full p-5">
      {/* Back button */}
      <div className="mb-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
        >
          <ChevronLeftIcon className="size-5 mr-1" /> Əvvəlki addım
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Addım 2: Təhsil məlumatları</h2>

      {error && <p className="mb-3 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
          <div>
            <Label>Təhsil pilləsi<span className="text-error-500">*</span></Label>
            <Select
              options={degreeOptions}
              onChange={degreeOnChange}
              value={degree}
              placeholder="Təhsil pilləsi seçin"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
          <div>
            <Label>İxtisas<span className="text-error-500">*</span></Label>
            <Select
              options={majorOptions}
              onChange={majorOnChange}
              value={major}
              placeholder="İxtisas axtarın seçin"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>Başlanğıc tarixi<span className="text-error-500">*</span></Label>
            <DatePicker
              id="start-date"
              placeholder="Tarix seçin"
              value={startDate}
              onChange={(_, currentDateString) => {
                setStartDate(currentDateString || "");
              }}
            />
          </div>
          <div>
            <Label>Bitirmə tarixi<span className="text-error-500">*</span></Label>
            <DatePicker
              id="end-date"
              placeholder="Tarix seçin"
              value={endDate}
              onChange={(_, currentDateString) => {
                setEndDate(currentDateString || "");
              }}
            />
          </div>
        </div>

        <Button
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Növbəti addım
        </Button>
      </form>
    </div>
  );
}