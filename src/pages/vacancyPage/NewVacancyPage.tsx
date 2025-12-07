import PageMeta from "../../components/common/PageMeta";
import NewVacancy from "../../components/vacancy/NewVacancy";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function NewVacancyPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Yeni Vakansiya" />
            <div className="space-y-6">
                <NewVacancy />
            </div>
        </>
    );
}
