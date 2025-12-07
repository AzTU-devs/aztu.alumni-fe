import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SavedVacancies from "../../components/vacancy/SavedVacancies";

export default function SavedVacanciesPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Saxlanılmış vakansiyalar" />
            <div className="space-y-6">
                <SavedVacancies />
            </div>
        </>
    );
}
