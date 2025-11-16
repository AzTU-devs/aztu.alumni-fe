import React from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="items-center hidden w-full h-full lg:w-1/2 lg:grid bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/images/aztu.webp')",
            backgroundRepeat: "no-repeat"
          }}>
          {/* Blue overlay */}
          <div className="absolute inset-0 bg-blue-900/80"></div>

          <div className="flex flex-col items-start justify-between z-1 h-full p-[30px]">
            <div className="flex items-center">
              <img
                src="/images/logo/aztu-light-logo.png"
                alt="AZTU"
                className="w-[80px] mr-[20px]"
              />
              <h1 className="text-[20px] text-white font-bold">Azərbaycan Texniki Universiteti Məzun Platforması</h1>
            </div>
            <div>
              <h2 className="text-white text-[30px]">AZTU məzunu, xoş gəlmişsiniz</h2>
              <p className="text-[20px] text-white">Karyeranızı inkişaf etdirin</p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
        {children}
      </div>
    </div>
  );
}
