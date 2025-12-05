import { useEffect, useRef } from "react";
import Button from "../ui/button/Button";
import { useLocation } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
// import { getRequirements, Requirements } from "../../services/vacancyRequirements/vacancyRequirementsService";

const listStyles = {
  ul: { listStyleType: "disc", paddingLeft: "1.5rem", marginTop: "0.5rem", marginBottom: "0.5rem" },
  ol: { listStyleType: "decimal", paddingLeft: "1.5rem", marginTop: "0.5rem", marginBottom: "0.5rem" }
};

export default function VacancyDetails() {
    const location = useLocation();
    const vacancy = location.state?.vacancy;
    // const [loading, setLoading] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.querySelectorAll("ul").forEach((el) => {
                Object.assign(el.style, listStyles.ul);
            });
            contentRef.current.querySelectorAll("ol").forEach((el) => {
                Object.assign(el.style, listStyles.ol);
            });
        }
    }, [vacancy.html_content]);

    if (!vacancy) {
        return <div>No vacancy data available.</div>;
    }

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
            <div
                ref={contentRef}
                className="max-w-full dark:prose-invert"
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: vacancy.html_content || "" }}
            />
        </>
    );
}