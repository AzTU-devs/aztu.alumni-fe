import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AlumniDetails from "../../components/alumnis/AlumniDetails";

export default function AlumniDetailsPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Məzun" />
            <div className="space-y-6">
                <AlumniDetails />
            </div>
        </>
    );
}
