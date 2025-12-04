import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { useLocation } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import { getRequirements, Requirements } from "../../services/vacancyRequirements/vacancyRequirementsService";

export default function VacancyDetails() {
    const location = useLocation();
    const vacancy = location.state?.vacancy;
    const [loading, setLoading] = useState(false);
    const [requirements, setRequirements] = useState<Requirements[]>([]);

    if (!vacancy) {
        return <div>No vacancy data available.</div>;
    }

    useEffect(() => {
        setLoading(true);
        getRequirements(vacancy.vacancy_code)
            .then((res) => {
                if (Array.isArray(res)) {
                    setRequirements(res);
                } else {
                    setRequirements([]);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <>
            <div className="bg-white p-[10px] rounded-[10px] flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-[30px]">{vacancy.job_title}</h1>
                    <p className="font-bold text-gray-500">{vacancy.company}</p>
                </div>
                <div className="flex items-center">
                    <Button className="mr-[10px]">
                        Müraciət et
                    </Button>
                    <div className="bg-gray-100 p-[10px] rounded-full flex items-center justify-center">
                        <ShareIcon />
                    </div>
                </div>
            </div>
            <div>
                <h2>Tələblər</h2>
                <ul className="list-none">
                    {requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center gap-2 mt-[10px] font-bold text-[18px]">
                            <span>{requirement.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}