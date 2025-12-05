import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import NewExperience from "../../components/experience/NewExperience";

export default function NewExperiencePage() {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Yeni iş məlumatı" />
            <div className="space-y-6">
                <ComponentCard title="Yeni iş məlumatı">
                    <NewExperience />
                </ComponentCard>
            </div>
        </>
    );
}
