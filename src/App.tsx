import Blank from "./pages/Blank";
import { jwtDecode } from "jwt-decode";
import Calendar from "./pages/Calendar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import type { JwtPayload } from "jwt-decode";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import useIsMobile from "./hooks/useIsMobile";
import BarChart from "./pages/Charts/BarChart";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import UserProfiles from "./pages/UserProfiles";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import ResponsiveLayout from "./layout/ResponsiveLayout";
import AlumnisPage from "./pages/alumnisPage/AlumnisPage";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import { ScrollToTop } from "./components/common/ScrollToTop";
import VacanciesPage from "./pages/vacancyPage/VacanciesPage";
import NewVacancyPage from "./pages/vacancyPage/NewVacancyPage";
import EducationsPage from "./pages/educationPage/EducationsPage";
import VacancyDetailsPage from "./pages/vacancyPage/VacancyDetails";
import ExperiencesPage from "./pages/experiencePage/ExperiencesPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AlumniDetailsPage from "./pages/alumnisPage/AlumniDetailsPage";
import NewEducationPage from "./pages/educationPage/NewEducationPage";
import CompleteProfile from "./components/UserProfile/CompleteProfile";
import NewExperiencePage from "./pages/experiencePage/NewExperiencePage";
import VacancyCategoriesPage from "./pages/vacancyPage/VacancyCategoriesPage";

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

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

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

            {/* Profile */}
            <Route path="/complete-profile" element={<CompleteProfile />} />

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
