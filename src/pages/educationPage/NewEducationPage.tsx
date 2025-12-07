import PageMeta from "../../components/common/PageMeta";
import NewEducation from "../../components/education/NewEducation";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function NewEducationPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Yeni təhsil məlumatı" />
            <div className="space-y-6">
                <NewEducation />
            </div>
        </>
    );
}
