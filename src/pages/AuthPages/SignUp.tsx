import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Azərbaycan Texniki Universiteti Məzun Portalı"
        description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
