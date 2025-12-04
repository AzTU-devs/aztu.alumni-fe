import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Experiences from "../../components/experience/Experiences";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function ExperiencesPage() {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="İş məlumatlarım" />
            <div className="space-y-6">
                <ComponentCard title="İş məlumatlarım">
                    <Experiences />
                </ComponentCard>
            </div>
        </>
    );
}
