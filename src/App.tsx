import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import type { JwtPayload } from "jwt-decode";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import useIsMobile from "./hooks/useIsMobile";
import NotFound from "./pages/OtherPage/NotFound";
import ResponsiveLayout from "./layout/ResponsiveLayout";
import AlumnisPage from "./pages/alumnisPage/AlumnisPage";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import { ScrollToTop } from "./components/common/ScrollToTop";
import VacanciesPage from "./pages/vacancyPage/VacanciesPage";
import NewVacancyPage from "./pages/vacancyPage/NewVacancyPage";
import EducationsPage from "./pages/educationPage/EducationsPage";
import VacancyDetailsPage from "./pages/vacancyPage/VacancyDetails";
import ExperiencesPage from "./pages/experiencePage/ExperiencesPage";
import AlumniDetailsPage from "./pages/alumnisPage/AlumniDetailsPage";
import NewEducationPage from "./pages/educationPage/NewEducationPage";
import CompleteProfile from "./components/UserProfile/CompleteProfile";
import SavedVacanciesPage from "./pages/vacancyPage/SavedVacanciesPage";
import NewExperiencePage from "./pages/experiencePage/NewExperiencePage";
import VacancyCategoriesPage from "./pages/vacancyPage/VacancyCategoriesPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import UserProfile from "./components/UserProfile/UserProfile";

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export default function App() {
  const isMobile = useIsMobile();
  const token = useSelector((state: RootState) => state.auth.token);
  const isValid = isTokenValid(token);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route
            element={
              !isValid ? (
                <Navigate to="/signin" replace />
              ) : isMobile ? (
                <ResponsiveLayout />
              ) : (
                <AppLayout />
              )
            }
          >
            <Route index path="/" element={<Home />} />

            {/* Alumni */}
            <Route path="/alumnis" element={<AlumnisPage />} />
            <Route path="/alumni/:uuid" element={<AlumniDetailsPage />} />

            {/* Settings */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Education */}
            <Route path="/educations" element={<EducationsPage />} />
            <Route path="/new-education" element={<NewEducationPage />} />

            {/* Work Experience */}
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/new-experience" element={<NewExperiencePage />} />

            {/* Vacancy */}
            <Route path="/vacancy" element={<VacanciesPage />} />
            <Route path="/new-vacancy" element={<NewVacancyPage />} />
            <Route path="/vacancy-categories" element={<VacancyCategoriesPage />} />
            <Route path="/vacancy/:vacancy_code" element={<VacancyDetailsPage />} />
            <Route path="/vacancy/saved" element={<SavedVacanciesPage />} />

            {/* Profile */}
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/profile" element={<UserProfile />} />

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
