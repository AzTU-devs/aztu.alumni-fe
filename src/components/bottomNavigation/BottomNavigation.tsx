import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import { useLocation, useNavigate } from 'react-router';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function BottomNavigation() {
    const path = useLocation();
    console.log(path.pathname);
    const navigate = useNavigate();

    return (
        <div style={{
            width: '100%',
            height: '70px',
            position: "fixed",
            bottom: 0,
            left: 0,
            display: "flex",
            marginTop: "30px",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100
        }}>
            <div
                className='flex justify-between items-center w-full h-full bg-white border-t border-gray-200 px-5'>
                <div
                    onClick={() => { navigate("/") }}
                    className='flex justify-center items-center'
                    style={path.pathname === "/" ? {
                        width: "calc(100% / 3)",
                        padding: "5px 8px",
                        transition: "all 400ms",
                        borderRadius: 20,
                        backgroundColor: "rgb(221, 215, 243)"
                    } : {
                        width: "calc(100% / 4)",
                        transition: "all 400ms"
                    }}
                >
                    <HomeFilledIcon style={path.pathname === "/" ?
                        {
                            color: "rgb(89, 66, 173)",
                            fontSize: 30,
                            marginRight: 5
                        } : {
                            color: "rgba(0, 0, 0, 0.4)",
                            fontSize: 30,
                            marginRight: 5
                        }} />
                    {path.pathname === "/" ? (
                        <p style={{
                            color: "rgb(89, 66, 173)"
                        }}>Əsas</p>
                    ) : null}
                </div>
                <div
                    onClick={() => { navigate("/vacancy/saved") }}
                    className='flex justify-center items-center'
                    style={path.pathname === "/vacancy/saved" ? {
                        width: "calc(100% / 3)",
                        padding: "5px 8px",
                        transition: "all 400ms",
                        borderRadius: 20,
                        backgroundColor: "rgb(246, 241, 206)"
                    } : {
                        width: "calc(100% / 4)",
                        transition: "all 400ms"
                    }}>
                    <BookmarkBorderIcon style={path.pathname === "/vacancy/saved" ?
                        {
                            color: "rgb(199, 172, 49)",
                            fontSize: 30,
                            marginRight: 5
                        } : {
                            color: "rgba(0, 0, 0, 0.4)",
                            fontSize: 30,
                            marginRight: 5
                        }} />
                    {path.pathname === "/vacancy/saved" ? (
                        <p style={{
                            color: "rgb(199, 172, 49)"
                        }}>Saxlanılmış vakansiyalar</p>
                    ) : null}
                </div>
                <div
                    onClick={() => { navigate('/settings') }}
                    className='flex justify-center items-center'
                    style={path.pathname === "/settings" ? {
                        width: "calc(100% / 3 + 10px)",
                        padding: "5px 8px",
                        transition: "all 400ms",
                        borderRadius: 20,
                        backgroundColor: "rgb(219, 234, 238)"
                    } : {
                        width: "calc(100% / 4)",
                        transition: "all 400ms"
                    }}>
                    <SettingsIcon style={path.pathname === "/settings" ?
                        {
                            color: "rgb(95, 143, 149)",
                            fontSize: 30,
                            marginRight: 5
                        } : {
                            color: "rgba(0, 0, 0, 0.4)",
                            fontSize: 30,
                            marginRight: 5
                        }} />
                    {path.pathname === "/settings" ? (
                        <p style={{
                            color: "rgb(95, 143, 149)"
                        }}>Sazlamalar</p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
