import PageMeta from "../../components/common/PageMeta";
import Educations from "../../components/education/Educations";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function EducationsPage() {
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Təhsil məlumatlarım" />
            <div className="space-y-6">
                <Educations />
            </div>
        </>
    );
}
