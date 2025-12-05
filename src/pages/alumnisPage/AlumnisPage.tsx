import Alumnis from "../../components/alumnis/Alumnis";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function AlumnisPage() {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Məzunlar" />
            <div className="space-y-6">
                {/* <AlumnisSearch /> */}
                <Alumnis />
            </div>
        </>
    );
}
