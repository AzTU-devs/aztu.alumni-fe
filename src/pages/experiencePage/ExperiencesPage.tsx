import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Experiences from "../../components/experience/Experiences";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function ExperiencesPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="İş məlumatlarım" />
            <div className="space-y-6">
                <ComponentCard title="İş məlumatlarım">
                    <Experiences />
                </ComponentCard>
            </div>
        </>
    );
}
