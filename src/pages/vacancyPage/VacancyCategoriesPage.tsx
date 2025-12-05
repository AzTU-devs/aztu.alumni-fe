import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import VacancyCategories from "../../components/vacancy/VacancyCategories";

export default function VacancyCategoriesPage() {
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Vakansiya Kateqoriyaları" />
            <div className="space-y-6">
                <VacancyCategories />
            </div>
        </>
    );
}
