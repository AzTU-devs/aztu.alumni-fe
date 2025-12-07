import PageMeta from "../../components/common/PageMeta";
import Educations from "../../components/education/Educations";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function EducationsPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Təhsil məlumatlarım" />
            <div className="space-y-6">
                <Educations />
            </div>
        </>
    );
}
