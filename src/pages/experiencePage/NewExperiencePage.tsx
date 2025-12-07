import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import NewExperience from "../../components/experience/NewExperience";

export default function NewExperiencePage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Yeni iş məlumatı" />
            <div className="space-y-6">
                <ComponentCard title="Yeni iş məlumatı">
                    <NewExperience />
                </ComponentCard>
            </div>
        </>
    );
}
