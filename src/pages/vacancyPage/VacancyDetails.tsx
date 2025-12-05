import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import VacancyDetails from "../../components/vacancy/VacancyDetails";

export default function VacancyDetailsPage() {
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Vakansiyalar" />
            <div className="space-y-6">
                <VacancyDetails />
            </div>
        </>
    );
}
