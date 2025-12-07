import Swal from "sweetalert2";
import Label from "../form/Label";
import Select from "../form/Select";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import Input from "../form/input/InputField";
import DatePicker from "../form/date-picker";
import Checkbox from "../form/input/Checkbox";
import TextArea from "../form/input/TextArea";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { createExperience, ExperiencePayload } from "../../services/experience/experienceService";

export default function NewExperience() {
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
  const [endDate, setEndDate] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [jobLocationType, setJobLocationType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!company || !jobTitle || !startDate) {
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
      const experiencePayload: ExperiencePayload = {
        uuid: uuid ? uuid : "",
        company: company,
        job_title: jobTitle,
        start_date: startDate,
        ...(endDate && !isChecked ? { end_date: endDate } : {}),
        job_location_type: +jobLocationType,
        employment_type: +employmentType,
        description: description
      };

      const result = await createExperience(experiencePayload);

      if (result === "SUCCESS") {
        Swal.fire({
          icon: 'success',
          title: 'Uğurlu!',
          text: 'İş məlumatlarınız əlavə olundu.',
          timer: 2000
        }).then(() => {
          setLoading(false);
          navigate("/experiences");
        });
      } else if (result === "ERROR") {
        Swal.fire({
          icon: 'error',
          title: 'Xəta baş verdi',
          text: 'İş məlumatları əlavə edilə bilmədi. Zəhmət olmasa yenidən cəhd edin.',
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

  const empOptions = [
    {
      value: "1",
      label: "Tam ştat"
    }, {
      value: "2",
      label: "Yarım ştat"
    }, {
      value: "3",
      label: "Özünüməşğul"
    }, {
      value: "4",
      label: "Frilans"
    }, {
      value: "5",
      label: "Müqavilə"
    }, {
      value: "6",
      label: "Təcrübə proqramı"
    }, {
      value: "7",
      label: "Könüllü"
    }
  ];

  const empOnChange = (value: string) => {
    setEmploymentType(value);
  }

//   # 1 - on-site
//     # 2 - hybrid
//     # 3 - remote

  const locationOptions = [
    {
      value: "1",
      label: "Yerində"
    }, {
      value: "2",
      label: "Hibrid"
    }, {
      value: "3",
      label: "Uzaqdan"
    }
  ];

  const locationOnChange = (value: string) => {
    setJobLocationType(value);
  }

  console.log(uuid);

  return (
    <div className="w-full flex flex-col items-start justify-start p-5">
      <Link to={"/educations"}>
        <div className="flex items-start justify-start w-full mb-[20px] cursor-pointer">
          <ChevronLeftIcon className="text-gray-800 dark:text-gray-200 flex items-center justify-center" />
          <h2 className="text-l text-gray-800 dark:text-gray-200">
            İş məlumatlarım
          </h2>
        </div>
      </Link>
      {/* {error && <p className="text-red-500 mb-3">{error}</p>} */}
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
        <div>
          <Label>Qurum<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="fname"
            value={company}
            onChange={(e) => setCompany(capitalizeWords(e.target.value))}
            placeholder="nüm. Azərbaycan Texniki Universiteti"
          />
        </div>

        <div>
          <Label>İş başlığı<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="major"
            value={jobTitle}
            onChange={(e) => setJobTitle(capitalizeWords(e.target.value))}
            placeholder="nüm. Kompüter elmləri"
          />
        </div>

        <div>
          <Label>İş növü<span className="text-error-500">&nbsp;*</span></Label>
          <Select
            options={empOptions}
            onChange={empOnChange}
            placeholder="İş növü"
          />
        </div>

        <div>
          <Label>İş məkanı<span className="text-error-500">&nbsp;*</span></Label>
          <Select
            options={locationOptions}
            onChange={locationOnChange}
            placeholder="İş məkanı"
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
              Hal-hazırda işləyirəm
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
