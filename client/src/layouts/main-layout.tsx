import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-dvh bg-primary-100">
      <div className="flex flex-1 overflow-y-auto">
        <div className="flex justify-center items-center w-full -mt-32 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
