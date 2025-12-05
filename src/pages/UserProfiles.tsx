import PageMeta from "../components/common/PageMeta";
import UserProfile from "../components/UserProfile/UserProfile";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="space-y-6">
        <UserProfile />
      </div>
    </>
  );
}
