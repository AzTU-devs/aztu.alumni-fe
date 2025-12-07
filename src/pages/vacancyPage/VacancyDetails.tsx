import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import VacancyDetails from "../../components/vacancy/VacancyDetails";

export default function VacancyDetailsPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Vakansiyalar" />
            <div className="space-y-6">
                <VacancyDetails />
            </div>
        </>
    );
}
