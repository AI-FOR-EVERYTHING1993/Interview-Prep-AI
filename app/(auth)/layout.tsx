import React from "react";
import AuthGuard from "@/components/AuthGuard";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="auth-layout">
        {children}
      </div>
    </AuthGuard>
  );
};

export default AuthLayout;

