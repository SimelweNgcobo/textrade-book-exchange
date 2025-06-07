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
        className={`container mx-auto ${isMobile ? "px-2" : "px-4"} py-4 md:py-8`}
      >
        <div
          className={`flex ${isMobile ? "flex-col" : "flex-row items-center justify-between"} gap-4 mb-4 md:mb-6`}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={`text-book-600 ${isMobile ? "self-start" : ""}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {isMobile && (
            <div className="flex items-center gap-2 self-start">
              <Flag className="h-5 w-5 text-red-600" />
              <h1 className="text-xl font-bold text-book-800">
                Reports & Moderation
              </h1>
            </div>
          )}
        </div>

        <div
          className={`bg-white rounded-lg shadow-md ${isMobile ? "p-2" : "p-3 md:p-6"}`}
        >
          <AdminReportsTab />
        </div>
      </div>
    </Layout>
  );
};

export default AdminReports;
