import PageMeta from "../../components/common/PageMeta";
import Settings from "../../components/settings/Settings";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function SettingsPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Profile" />
            <div className="space-y-6">
                <Settings />
            </div>
        </>
    );
}
