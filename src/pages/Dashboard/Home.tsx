import PageMeta from "../../components/common/PageMeta";
import VacanciesPage from "../vacancyPage/VacanciesPage";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Azərbaycan Texniki Universiteti Məzun Portalı"
        description="Azərbaycan Texniki Universitetinin məzunlarını karyera imkanlarını artırmaq üçün məzun portalı"
      />
      <VacanciesPage />
    </>
  );
}
