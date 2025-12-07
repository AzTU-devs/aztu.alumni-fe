import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SavedVacancies from "../../components/vacancy/SavedVacancies";

export default function SavedVacanciesPage() {
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Saxlanılmış vakansiyalar" />
            <div className="space-y-6">
                <SavedVacancies />
            </div>
        </>
    );
}
