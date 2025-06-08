import Layout from "@/components/Layout";
import EmailChangeTest from "@/components/EmailChangeTest";
import AdminLoginTest from "@/components/AdminLoginTest";

const AuthTest = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Authentication & Admin Test Dashboard
          </h1>

          <div className="space-y-8">
            <AdminLoginTest />
            <EmailChangeTest />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthTest;
