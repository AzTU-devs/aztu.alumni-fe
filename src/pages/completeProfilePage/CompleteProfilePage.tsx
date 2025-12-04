import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CompleteProfile from "../../components/UserProfile/CompleteProfile";

export default function CompleteProfilePage() {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
