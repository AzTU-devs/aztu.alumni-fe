import { Link } from "react-router";
import Button from "../ui/button/Button";
import { LinearProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function ProfileProgress() {
    const progress = useSelector((state: RootState) => state.auth.profile_completed_percentage);
    return (
        <>
            {progress !== 100 ? (
                <div className="p-[10px] bg-[#F2F5F9] rounded-[10px]">
                    <div className="mb-[10px] flex items-center justify-between">
                        <h2 className="font-bold">Profil Statusu</h2>
                        <p className="text-[#3D6BE6] font-bold">{progress}%</p>
                    </div>
                    <div className="mb-[10px]">
                        <Box sx={{ width: "100%" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                            </Box>

                            <LinearProgress
                                variant="determinate"
                                value={progress ? progress : 0}
                                sx={{
                                    height: 8,
                                    borderRadius: 5
                                }}
                            />
                        </Box>
                    </div>
                    <p className="mb-[10px] font-italic text-[15px] text-gray-400">
                        <i>
                            Karyera imkanlarınızı artırmaq üçün profili tamalayın
                        </i>
                    </p>
                    <div className="flex items-center justify-center">
                        <Link to={"/complete-profile"}>
                            <Button>
                                Profili tamamla
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : null}
        </>
    )
}
