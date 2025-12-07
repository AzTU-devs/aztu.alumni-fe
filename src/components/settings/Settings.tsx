import { useDispatch, useSelector } from "react-redux";
import Switch from '../form/switch/Switch';
import { useEffect, useState } from "react";
import WorkIcon from '@mui/icons-material/Work';
import { Link, useNavigate } from "react-router";
import GetAppIcon from '@mui/icons-material/GetApp';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import { logout } from "../../redux/slices/authSlice";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import UserSettingsCard from '../UserProfile/UserSettingsCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileProgress from "../profileProgress/ProfileProgress";
import { Alumni, getAlumniDetails } from "../../services/alumni/alumniService";
import { RootState } from "../../redux/store";

export default function Settings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [_, setError] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alumni, setALumni] = useState<Alumni>();
    const [notFound, setNotFound] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        console.log("Switch is now:", checked ? "ON" : "OFF");
    };
    const uuid = useSelector((state: RootState) => state.auth.uuid);

    useEffect(() => {
        setLoading(true);
            getAlumniDetails(uuid ? uuid : "")
                .then((res) => {
                    if (typeof res === "object") {
                        setALumni(res);
                    } else if (res === "NOT FOUND") {
                        setNotFound(true);
                    } else {
                        setError(true);
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
    }, []);

    return (
        <>
            <UserSettingsCard photo={alumni?.photo} name={alumni?.name} surname={alumni?.surname} email={alumni?.email} uuid={uuid}  />
            <ProfileProgress />
            <h3 className='font-bold'>
                Hesab
            </h3>
            <div className='border-1 border-gray-200 rounded-[10px]'>
                <Link to={"/profile"}>
                    <div className='p-4 flex justify-between items-center border-b border-gray-200'>
                        <div className='flex items-center'>
                            <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                                <AccountCircleIcon />
                            </div>
                            <p>Şəxsi məlumatlarım</p>
                        </div>
                        <div>
                            <ChevronRightIcon sx={{ color: "gray" }} />
                        </div>
                    </div>
                </Link>
                <Link to={"/educations"}>
                    <div className='p-4 flex justify-between items-center border-b border-gray-200'>
                        <div className='flex items-center'>
                            <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                                <SchoolIcon />
                            </div>
                            <p>Təhsil məlumatlarım</p>
                        </div>
                        <div>
                            <ChevronRightIcon sx={{ color: "gray" }} />
                        </div>
                    </div>
                </Link>
                <Link to={"/experiences"}>
                    <div className='p-4 flex justify-between items-center border-b border-gray-200'>
                        <div className='flex items-center'>
                            <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                                <WorkIcon />
                            </div>
                            <p>İş məlumatlarım</p>
                        </div>
                        <div>
                            <ChevronRightIcon sx={{ color: "gray" }} />
                        </div>
                    </div>
                </Link>
                <div className='p-4 flex justify-between items-center border-b border-gray-200'>
                    <div className='flex items-center'>
                        <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                            <LockOutlineIcon />
                        </div>
                        <p>Şifrəni dəyiş</p>
                    </div>
                    <div>
                        <ChevronRightIcon sx={{ color: "gray" }} />
                    </div>
                </div>
                <div className='p-4 flex justify-between items-center border-b border-gray-200'>
                    <div className='flex items-center'>
                        <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                            <LocalPhoneIcon />
                        </div>
                        <p>Nömrəmi göstər</p>
                    </div>
                    <div>
                        <Switch
                            label=''
                            defaultChecked={true}
                            onChange={handleSwitchChange}
                        />
                    </div>
                </div>
                <div className='p-4 flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                            <LocationOnIcon />
                        </div>
                        <p>Adresimi göstər</p>
                    </div>
                    <div
                        onClick={() => setToggle(!toggle)}
                        className={`w-[42px] h-[22px] flex items-center rounded-full px-[2px] cursor-pointer transition-all duration-300`}
                    >
                        <Switch
                            label=''
                            defaultChecked={true}
                            onChange={handleSwitchChange}
                        />
                    </div>
                </div>
            </div>
            <h3 className='font-bold'>
                Tətbiq
            </h3>
            <div className='border-1 border-gray-200 rounded-[10px]'>
                <div className='p-4 flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                            <GetAppIcon />
                        </div>
                        <p>Applikasiyanı endirin</p>
                    </div>
                    <div>
                        <ChevronRightIcon sx={{ color: "gray" }} />
                    </div>
                </div>
            </div>
            <div className='border-1 border-gray-200 rounded-[10px] mb-[70px]'>
                <div className='p-4 flex justify-between items-center' onClick={() => {
                    dispatch(logout());
                    navigate("/signin");
                }}>
                    <div className='flex items-center'>
                        <div className='bg-[#F0F3F8] p-2 rounded-[10px] mr-[10px]'>
                            <LogoutIcon />
                        </div>
                        <p>Çıxış edin</p>
                    </div>
                </div>
            </div>
        </>
    )
}
