import Alumnis from "../../components/alumnis/Alumnis";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function AlumnisPage() {
    return (
        <>
            <PageMeta
                title="Azərbaycan Texniki Universiteti Məzun Portalı"
                description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
            />
            <PageBreadcrumb pageTitle="Məzunlar" />
            <div className="space-y-6">
                {/* <AlumnisSearch /> */}
                <Alumnis />
            </div>
        </>
    );
}
