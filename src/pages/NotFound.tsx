import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import AppWindow from "@/components/AppWindow";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <AppWindow title="Error 404" className="w-full max-w-lg">
        <div className="text-center py-12">
          <h1 className="text-6xl font-black text-pink-600 mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-6">Oops! The page you are looking for doesn't exist.</p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline font-medium">
            Return to Home
          </Link>
        </div>
      </AppWindow>
    </AppLayout>
  );
};

export default NotFound;