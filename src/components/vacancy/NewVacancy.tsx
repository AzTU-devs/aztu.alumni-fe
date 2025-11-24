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

export default function NewVacancy() {
  function capitalizeWords(str: string): string {
    return str
      .split(" ")
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [flexIsChecked, setFlexIsChecked] = useState(false);

  //

  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [endHour, setEndHour] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startHour, setStartHour] = useState("");
  const [status, setStatus] = useState<number>();
  const [minSalary, setMinSalary] = useState<number>();
  const [maxSalary, setMaxSalary] = useState<number>();
  const [isSalaryPublic, setIsSalaryPublic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [employmentType, setEmploymentType] = useState<number>();
  const [selectedLocationType, setSelectedLocationType] = useState<number>();



  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (!university || !major || !degree || !startDate) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Xəta baş verdi',
  //       text: 'Zəhmət olmasa bütün məcburi sahələri doldurun.',
  //       confirmButtonText: 'OK'
  //     });
  //     setLoading(false);
  //     return;
  //   }
  //   try {
  //     const educationPayload: EducationPayload = {
  //       uuid: uuid ? uuid : "",
  //       university: university,
  //       start_date: startDate,
  //       end_date: endDate,
  //       degree: degree,
  //       major: major,
  //       gpa: gpa
  //     };

  //     const result = await createEducation(educationPayload);

  //     if (result === "SUCCESS") {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Uğurlu!',
  //         text: 'Təhsil məlumatlarınız əlavə olundu.',
  //         timer: 2000
  //       }).then(() => {
  //         setLoading(false);
  //         navigate("/educations");
  //       });
  //     } else if (result === "ERROR") {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Xəta baş verdi',
  //         text: 'Təhsil məlumatları əlavə edilə bilmədi. Zəhmət olmasa yenidən cəhd edin.',
  //         confirmButtonText: 'OK'
  //       }).then(() => {
  //         setLoading(false);
  //       });
  //     } else if (result === "NOT FOUND") {
  //       Swal.fire({
  //         icon: 'warning',
  //         title: 'Tapılmadı',
  //         text: 'Sistem məlumatları tapa bilmədi.',
  //         confirmButtonText: 'OK'
  //       }).then(() => {
  //         setLoading(false);
  //       });
  //     }
  //   } catch (err: any) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Şəbəkə xətası',
  //       text: 'Xəta baş verdi. İnternet bağlantınızı yoxlayın.',
  //       confirmButtonText: 'OK'
  //     }).then(() => {
  //       setLoading(false);
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const locationSelect = [
    {
      label: "Ofisdə",
      value: "1"
    }, {
      label: "Hibrid",
      value: "2"
    }, {
      label: "Uzaqdan",
      value: "3"
    }
  ];

  const toggleLocation = (value: string) => {
    setSelectedLocationType(+value);
  };

  const employmentSelect = [
    {
      label: "Tam ştat",
      value: "1"
    }, {
      label: "Yarım ştat",
      value: "2"
    }, {
      label: "Özünüməşğul",
      value: "3"
    }, {
      label: "Frilans",
      value: "4"
    }, {
      label: "Müqaviləli",
      value: "5"
    }, {
      label: "Təcrübəçi",
      value: "6"
    }, {
      label: "Könüllü",
      value: "7"
    }
  ];

  const toggleEmployment = (value: string) => {
    setEmploymentType(+value);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start p-5">
      <Link to={"/vacancy"}>
        <div className="flex items-start justify-start w-full mb-[20px] cursor-pointer">
          <ChevronLeftIcon className="text-gray-800 dark:text-gray-200 flex items-center justify-center" />
          <h2 className="text-l text-gray-800 dark:text-gray-200">
            Vakansiyalar
          </h2>
        </div>
      </Link>
      {/* {error && <p className="text-red-500 mb-3">{error}</p>} */}
      <form className="space-y-5 w-full">
        <div>
          <Label>İş başlığı<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="fname"
            value={jobTitle}
            onChange={(e) => setJobTitle(capitalizeWords(e.target.value))}
            placeholder="nüm. Azərbaycan Texniki Universiteti"
          />
        </div>

        <div>
          <Label>Şirkət<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="major"
            value={company}
            onChange={(e) => setCompany(capitalizeWords(e.target.value))}
            placeholder="nüm. Kompüter elmləri"
          />
        </div>

        {/* <div>
          <Label>Öl<span className="text-error-500">&nbsp;*</span></Label>
          <Select
            options={degreeOptions}
            onChange={degreeOnChange}
            placeholder="nüm. Bakalavr"
          />
        </div> */}

        <div>
          <Label>Ölkə<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(capitalizeWords(e.target.value))}
            placeholder="nüm. Azərbaycan"
          />
        </div>

        <div>
          <Label>Şəhər<span className="text-error-500">&nbsp;*</span></Label>
          <Input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(capitalizeWords(e.target.value))}
            placeholder="nüm. Bakı"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>Məkan<span className="text-error-500">&nbsp;*</span></Label>
            <Select
              placeholder="Məkan tipi seçin"
              options={locationSelect}
              onChange={toggleLocation}
            />
          </div>
          <div>
            <Label>İş rejimi<span className="text-error-500">&nbsp;*</span></Label>
            <Select
              placeholder="İş rejimi seçin"
              options={employmentSelect}
              onChange={toggleEmployment}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>Başlanğıc saatı<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="text"
              name="startHour"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              placeholder="nüm. 9:00"
              disabled={flexIsChecked}
            />
          </div>
          <div>
            <Label>Bitiş saatı</Label>
            <Input
              type="text"
              name="endHour"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              placeholder="nüm. 17:00"
              disabled={flexIsChecked}
            />
          </div>
          <div className="flex justify-start items-center">
            <Checkbox checked={flexIsChecked} onChange={setFlexIsChecked} />
            <p className="ml-[10px] text-gray-800 dark:text-gray-200">
              Sərbəst rejim
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label>Min. əmək haqqı<span className="text-error-500">&nbsp;*</span></Label>
            <Input
              type="number"
              name="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(+e.target.value)}
              placeholder="nüm. 1000"
              disabled={isChecked}
            />
          </div>
          <div>
            <Label>Max. əmək haqqı</Label>
            <Input
              type="number"
              name="maxSalary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(+e.target.value)}
              placeholder="nüm. 1500"
              disabled={isChecked}
            />
          </div>
          <div className="flex justify-start items-center">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <p className="ml-[10px] text-gray-800 dark:text-gray-200">
              Razılaşma yolu ilə
            </p>
          </div>
        </div>

        <div>
            <Label>Müraciət üçün son tarix<span className="text-error-500">&nbsp;*</span></Label>
            <DatePicker
              id="end-date"
              placeholder="Doğum tarixi seçin"
              value={deadline}
              onChange={(_, currentDateString) => {
                setDeadline(currentDateString || "");
              }}
            />
          </div>

        {/* <div>
          <Label>Qeyd<span className="text-gray-400">&nbsp;(İstəyə bağlı)</span></Label>
          <TextArea
            placeholder="Qeyd"
            value={description}
            onChange={(value: string) => setDescription(capitalizeWords(value))}
          />
        </div> */}

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
