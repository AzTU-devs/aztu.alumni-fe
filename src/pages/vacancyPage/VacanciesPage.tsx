import PageMeta from "../../components/common/PageMeta";
import Vacancies from "../../components/vacancy/Vacancies";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function VacanciesPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Vakansiyalar" />
            <div className="space-y-6">
                <Vacancies />
            </div>
        </>
    );
}
