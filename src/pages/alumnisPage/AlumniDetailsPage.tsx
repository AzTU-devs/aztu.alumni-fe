import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AlumniDetails from "../../components/alumnis/AlumniDetails";

export default function AlumniDetailsPage() {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Məzun" />
            <div className="space-y-6">
                <AlumniDetails />
            </div>
        </>
    );
}
