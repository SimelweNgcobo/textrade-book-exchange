import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AdminReportsTab from "@/components/admin/AdminReportsTab";

const AdminReports = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <Layout>
      <div
        className={`container mx-auto ${isMobile ? "px-2" : "px-4"} py-4 md:py-8 max-w-7xl`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-book-600 hover:text-book-700 flex-shrink-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isMobile ? "" : "Back"}
          </Button>

          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Flag className="h-5 w-5 text-red-600 flex-shrink-0" />
            <h1
              className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-book-800 truncate`}
            >
              Reports & Moderation
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`bg-white rounded-lg shadow-md ${isMobile ? "p-2" : "p-3 md:p-6"} min-h-[calc(100vh-200px)]`}
        >
          <AdminReportsTab />
        </div>
      </div>
    </Layout>
  );
};

export default AdminReports;
