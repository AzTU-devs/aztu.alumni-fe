import PageMeta from "../../components/common/PageMeta";
import NewEducation from "../../components/education/NewEducation";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function NewEducationPage() {
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Yeni təhsil" />
            <div className="space-y-6">
                <NewEducation />
            </div>
        </>
    );
}
