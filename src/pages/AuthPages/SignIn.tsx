import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Azərbaycan Texniki Universiteti Məzun Portalı"
        description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
