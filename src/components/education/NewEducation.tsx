import Swal from "sweetalert2";
import Label from "../form/Label";
import Select from "../form/Select";
import { Link, useNavigate } from "react-router";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import Input from "../form/input/InputField";
import DatePicker from "../form/date-picker";
import Checkbox from "../form/input/Checkbox";
import TextArea from "../form/input/TextArea";
import { RootState } from "../../redux/store";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { createEducation, EducationPayload } from "../../services/education/educationService";

export default function NewEducation() {
  function capitalizeWords(str: string): string {
    return str
      .split(" ")
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }

  const uuid = useSelector((state: RootState) => state.auth.uuid);

  const navigate = useNavigate();
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [university, setUniversity] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [gpa, setGpa] = useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!university || !major || !degree || !startDate) {
      Swal.fire({
        icon: 'error',
        title: 'Xəta baş verdi',
        text: 'Zəhmət olmasa bütün məcburi sahələri doldurun.',
        confirmButtonText: 'OK'
      });
      setLoading(false);
      return;
    }
    try {
      const educationPayload: EducationPayload = {
        uuid: uuid ? uuid : "",
        university: university,
        start_date: startDate,
        end_date: endDate,
        degree: degree,
        major: major,
        gpa: gpa
      };

      const result = await createEducation(educationPayload);

      if (result === "SUCCESS") {
        Swal.fire({
          icon: 'success',
          title: 'Uğurlu!',
          text: 'Təhsil məlumatlarınız əlavə olundu.',
          timer: 2000
        }).then(() => {
          setLoading(false);
          navigate("/educations");
        });
      } else if (result === "ERROR") {
        Swal.fire({
          icon: 'error',
          title: 'Xəta baş verdi',
          text: 'Təhsil məlumatları əlavə edilə bilmədi. Zəhmət olmasa yenidən cəhd edin.',
          confirmButtonText: 'OK'
        }).then(() => {
          setLoading(false);
        });
      } else if (result === "NOT FOUND") {
        Swal.fire({
          icon: 'warning',
          title: 'Tapılmadı',
          text: 'Sistem məlumatları tapa bilmədi.',
          confirmButtonText: 'OK'
        }).then(() => {
          setLoading(false);
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Şəbəkə xətası',
        text: 'Xəta baş verdi. İnternet bağlantınızı yoxlayın.',
        confirmButtonText: 'OK'
      }).then(() => {
        setLoading(false);
      });
    } finally {
      setLoading(false);
    }
  };

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
  }

  console.log(uuid);

  return (
    <div className="w-full flex flex-col items-start justify-start p-5">
      <Link to={"/educations"}>
        <div className="flex items-start justify-start w-full mb-[20px] cursor-pointer">
          <ChevronLeftIcon className="text-gray-800 dark:text-gray-200 flex items-center justify-center" />
          <h2 className="text-l text-gray-800 dark:text-gray-200">
            Təhsil məlumatlarım
          </h2>
        </div>
      </Link>
      {/* {error && <p className="text-red-500 mb-3">{error}</p>} */}
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
        <div>
          <Label>Universitet<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="fname"
            value={university}
            onChange={(e) => setUniversity(capitalizeWords(e.target.value))}
            placeholder="nüm. Azərbaycan Texniki Universiteti"
          />
        </div>

        <div>
          <Label>İxtisas<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="major"
            value={major}
            onChange={(e) => setMajor(capitalizeWords(e.target.value))}
            placeholder="nüm. Kompüter elmləri"
          />
        </div>

        <div>
          <Label>Təhsil pilləsi<span className="text-error-500">&nbsp;*</span></Label>
          <Select
            options={degreeOptions}
            onChange={degreeOnChange}
            placeholder="nüm. Bakalavr"
          />
        </div>

        <div>
          <Label>Ortalama<span className="text-gray-500">&nbsp;(İstəyə bağlı)</span></Label>
          <Input
            type="text"
            name="gpa"
            value={gpa}
            onChange={(e) => setGpa(+e.target.value)}
            placeholder="nüm. 90"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>Başlanğıc tarixi<span className="text-error-500">&nbsp;*</span></Label>
            <DatePicker
              id="end-date"
              placeholder="Başlanğıc tarixi"
              value={startDate}
              onChange={(_, currentDateString) => {
                setStartDate(currentDateString || "");
              }}
            />
          </div>
          <div>
            <Label>Bitirmə tarixi</Label>
            <DatePicker
              disabled={isChecked}
              id="end-date"
              placeholder="Bitirmə tarixi"
              value={endDate}
              onChange={(_, currentDateString) => {
                setEndDate(currentDateString || "");
              }}
            />
          </div>
          <div className="flex justify-start items-center">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <p className="ml-[10px] text-gray-800 dark:text-gray-200">
              Hal-hazırda oxuyuram
            </p>
          </div>
        </div>

        <div>
          <Label>Qeyd<span className="text-gray-400">&nbsp;(İstəyə bağlı)</span></Label>
          <TextArea
            placeholder="Qeyd"
            value={description}
            onChange={(value: string) => setDescription(capitalizeWords(value))}
          />
        </div>

        <Button
          disabled={loading}
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Yadda saxlanılır" : "Yadda saxla"}
        </Button>
      </form>
    </div>
  )
}
