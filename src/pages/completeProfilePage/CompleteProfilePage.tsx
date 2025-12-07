import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CompleteProfile from "../../components/UserProfile/CompleteProfile";

export default function CompleteProfilePage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Profili tamamla" />
            <div className="space-y-6">
                <ComponentCard title="Profili tamamla">
                    <CompleteProfile />
                </ComponentCard>
            </div>
        </>
    );
}
