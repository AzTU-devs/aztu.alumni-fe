import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import VacancyCategories from "../../components/vacancy/VacancyCategories";

export default function VacancyCategoriesPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Vakansiya Kateqoriyaları" />
            <div className="space-y-6">
                <VacancyCategories />
            </div>
        </>
    );
}
