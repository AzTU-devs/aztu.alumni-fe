import Swal from "sweetalert2";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { RootState } from "../../redux/store";
import { completeProfile, CompleteProfilePayload, getAlumniDetails } from "../../services/alumni/alumniService";
import { setProfileCompleted } from "../../redux/slices/authSlice";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [finCode, setFinCode] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [married, setMarried] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registeredCity, setRegisteredCity] = useState("");
  const [phoneIsPublic, setPhoneIsPublic] = useState(false);
  const [addressIsPublic, setAddressIsPublic] = useState(false);
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [militaryObligation, setMilitartyObligation] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [phoneIsChecked, setPhoneIsChecked] = useState(true);
  const [addressIsChecked, setAddressIsChecked] = useState(true);

  const uuid = useSelector((state: RootState) => state.auth.uuid);

  useEffect(() => {
    if (!uuid) return;
    setLoading(true);

    getAlumniDetails(uuid)
      .then((res) => {
        if (res && typeof res === "object") {
          console.log(res);
          
          setName((res as any).name || "");
          setSurname((res as any).surname || "");
          setFatherName((res as any).father_name || "");
          setFinCode((res as any).fin_code || "");
          setPhoneNumber((res as any).phone_number || "");
          setRegisteredCity((res as any).registered_city || "");
          setRegisteredAddress((res as any).registered_address || "");
          setAddress((res as any).address || "");
          setBirthDate((res as any).birth_date || "");
          setPhoneIsPublic(Boolean((res as any).phone_is_public));
          setAddressIsPublic(Boolean((res as any).address_is_public));
          setPhoneIsChecked(!Boolean((res as any).phone_is_public));
          setAddressIsChecked(!Boolean((res as any).address_is_public));
          setJobTitle((res as any).job_title || "");
          setMilitartyObligation(
            (res as any).military_obligation?.toString() || ""
          );
          setMarried((res as any).married?.toString() || "");
        }
      })
      .catch(() => {
        setName("");
        setSurname("");
        setFatherName("");
        setFinCode("");
        setPhoneNumber("");
        setRegisteredCity("");
        setRegisteredAddress("");
        setAddress("");
        setBirthDate("");
        setMilitartyObligation("");
        setMarried("");
        setPhoneIsChecked(true);
        setAddressIsChecked(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [uuid]);

  const militaryOptions = [
    {
      value: "1",
      label: "Var"
    }, {
      value: "2",
      label: "Yoxdur"
    }, {
      value: "3",
      label: "Hərbi xidmətə getmirəm"
    }, {
      value: "4",
      label: "Müvəqqəti olaraq getmirəm"
    }, {
      value: "5",
      label: "Digər"
    }
  ];

  const militaryOnChange = (value: string) => {
    setMilitartyObligation(value);
  }

  const marriageOptions = [
    {
      value: "true",
      label: "Evli"
    }, {
      value: "false",
      label: "Subay"
    }
  ];

  const marriageOnChange = (value: string) => {
    setMarried(value);
  };

  const toBoolean = (value: string): boolean => {
    return value.toLowerCase() === "true";
  };

  const handleProfileComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Bu sahə doldurulmalıdır";
    if (!surname.trim()) newErrors.surname = "Bu sahə doldurulmalıdır";
    if (!fatherName.trim()) newErrors.fatherName = "Bu sahə doldurulmalıdır";
    if (!finCode.trim()) newErrors.finCode = "Bu sahə doldurulmalıdır";
    if (!jobTitle.trim()) newErrors.jobTitle = "Bu sahə doldurulmalıdır";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Bu sahə doldurulmalıdır";
    if (!registeredCity.trim()) newErrors.registeredCity = "Bu sahə doldurulmalıdır";
    if (!registeredAddress.trim()) newErrors.registeredAddress = "Bu sahə doldurulmalıdır";
    if (!address.trim()) newErrors.address = "Bu sahə doldurulmalıdır";
    if (!birthDate.trim()) newErrors.birthDate = "Bu sahə doldurulmalıdır";
    if (!militaryObligation) newErrors.militaryObligation = "Bu sahə doldurulmalıdır";
    if (!married) newErrors.married = "Bu sahə doldurulmalıdır";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Məlumatlar doldurulmayıb",
        text: "Zəhmət olmasa, bütün sahələri doldurun",
        confirmButtonText: "Bağla"
      }).then(() => {
        setLoading(false);
      });
      return;
    }

    try {
      const profilePayload: CompleteProfilePayload = {
        uuid: uuid ? uuid : "",
        name: name,
        surname: surname,
        father_name: fatherName,
        birth_date: birthDate,
        phone_number: phoneNumber,
        phone_is_public: phoneIsPublic,
        fin_code: finCode,
        job_title: jobTitle,
        registered_city: registeredCity,
        registered_address: registeredAddress,
        address: address,
        address_is_public: addressIsPublic,
        military_obligation: +militaryObligation,
        married: toBoolean(married)
      }

      console.log(militaryObligation);

      console.log(profilePayload);
      
      const result = await completeProfile(profilePayload);

      if (result === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Uğurla tamamlandı!",
          text: "Profil məlumatlarınız yadda saxlanıldı.",
          confirmButtonText: "OK"
        }).then(() => {
          setLoading(false);
          setProfileCompleted();
          navigate("/profile");
        });
      } else if (result === "NOT FOUND") {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi!",
          text: "Profil məlumatları yadda saxlanılmadı. Zəhmət olmasa yenidən cəhd edin.",
          confirmButtonText: "Bağla"
        }).then(() => {
          setLoading(false);
        });
      } else if (result === "FIN_CONFLICT") {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi!",
          text: "Fin kod istifadə olunub. Zəhmət olmasa başqa bir fin kod yoxlayın.",
          confirmButtonText: "Bağla"
        }).then(() => {
          setLoading(false);
        });
      } else if (result === "PHONE_CONFLICT") {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi!",
          text: "Telefon nömrəsi istifadə olunub. Zəhmət olmasa başqa bir telefon nömrəsi yoxlayın.",
          confirmButtonText: "Bağla"
        }).then(() => {
          setLoading(false);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi!",
          text: "Profil məlumatları yadda saxlanılmadı. Zəhmət olmasa yenidən cəhd edin.",
          confirmButtonText: "Bağla"
        }).then(() => {
          setLoading(false);
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Xəta baş verdi!",
        text: "Profil məlumatları yadda saxlanılmadı. Zəhmət olmasa yenidən cəhd edin.",
        confirmButtonText: "Bağla"
      }).then(() => {
        setLoading(false);
      });
    }
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleProfileComplete}>
        <div className="px-2 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3 mb-[10px]">
            <div>
              <Label>Ad</Label>
              <Input
                type="text"
                placeholder="Ad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label>Soyad</Label>
              <Input
                type="text"
                placeholder="Soyad"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className={errors.surname ? "border border-red-500" : ""}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>

            <div>
              <Label>Ata adı</Label>
              <Input
                type="text"
                placeholder="Ata adı"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className={errors.fatherName ? "border border-red-500" : ""}
              />
              {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
            </div>
          </div>

          {/* fin kod */}

          <div className="mb-[10px]">
            <Label>Fin kod</Label>
            <Input
              maxLength={7}
              type="text"
              placeholder="Fin Kod"
              value={finCode}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                setFinCode(value);
              }}
              className={errors.finCode ? "border border-red-500" : ""}
            />
            {errors.finCode && <p className="text-red-500 text-sm mt-1">{errors.finCode}</p>}
          </div>

          <div>
            <Label>İşiniz</Label>
            <Input
              type="text"
              placeholder="nüm. Proqramçı"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={errors.jobTitle ? "border border-red-500" : ""}
            />
            {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1 mt-[10px]">
            <div>
              <Label>Telefon Nömrəsi</Label>
              <Input
                maxLength={13}
                type="text"
                placeholder="+994-XX-XXX-XX-XX"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9+]/g, "");
                  setPhoneNumber(value);
                }}
                className={errors.phoneNumber ? "border border-red-500" : ""}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            <div className="flex justify-start items-center">
              <Checkbox checked={phoneIsChecked} onChange={
                () => {
                  setPhoneIsChecked(true);
                  setPhoneIsPublic(true);
                }
              } />
              <p className="ml-[10px] text-gray-800 dark:text-gray-200">
                Telefon nömrəmi gizli saxla
              </p>
            </div>
          </div>

          {/* address details */}

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1 mt-[10px]">
            <div>
              <Label>Qeydiyyatda olduğunuz ölkə</Label>
              <Input
                type="text"
                placeholder="nüm. Azərbaycan"
                value={registeredAddress}
                onChange={(e) => setRegisteredAddress(e.target.value)}
                className={errors.registeredAddress ? "border border-red-500" : ""}
              />
              {errors.registeredAddress && <p className="text-red-500 text-sm mt-1">{errors.registeredAddress}</p>}
            </div>

            <div>
              <Label>Qeydiyyatda olduğunuz şəhər</Label>
              <Input
                type="text"
                placeholder="nüm. Bakı"
                value={registeredCity}
                onChange={(e) => setRegisteredCity(e.target.value)}
                className={errors.registeredCity ? "border border-red-500" : ""}
              />
              {errors.registeredCity && <p className="text-red-500 text-sm mt-1">{errors.registeredCity}</p>}
            </div>

            <div>
              <Label>Tam ünvanınız</Label>
              <Input
                type="text"
                placeholder="nüm. Azərbaycan, Bakı şəhəri, ..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={errors.address ? "border border-red-500" : ""}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="flex justify-start items-center">
              <Checkbox checked={addressIsChecked} onChange={
                () => {
                  setPhoneIsChecked(true);
                  setAddressIsChecked(true);
                }
              } />
              <p className="ml-[10px] text-gray-800 dark:text-gray-200">
                Adresimi gizli saxla
              </p>
            </div>
          </div>

          {/* military obligation & marriage status  */}

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1 mt-[10px]">
            <div>
              <Label>Hərbi mükəlləfiyətiniz</Label>
              <Select
                value={militaryObligation}
                placeholder="Hərbi mükəlləfiyətinizi seçin"
                options={militaryOptions}
                onChange={militaryOnChange}
              />
              {errors.militaryObligation && (
                <p className="text-red-500 text-sm mt-1">{errors.militaryObligation}</p>
              )}
            </div>

            <div>
              <Label>Mədəni halınız</Label>
              <Select
                placeholder="Mədəni halınızı seçin"
                value={married}
                options={marriageOptions}
                onChange={marriageOnChange}
              />
              {errors.married && (
                <p className="text-red-500 text-sm mt-1">{errors.married}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" disabled={loading}>
            {loading ? "Yadda saxlanılır" : "Yadda saxla"}
          </Button>
        </div>
      </form>
    </div>
  )
}
