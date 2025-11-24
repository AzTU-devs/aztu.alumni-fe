import PageMeta from "../../components/common/PageMeta";
import NewVacancy from "../../components/vacancy/NewVacancy";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function NewVacancyPage() {
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Yeni Vakansiya" />
            <div className="space-y-6">
                <NewVacancy />
            </div>
        </>
    );
}
