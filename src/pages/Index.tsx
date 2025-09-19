import { useState } from "react";
import RoleSelection from "@/components/RoleSelection";
import Marketplace from "@/components/Marketplace";

const Index = () => {
  const [userRole, setUserRole] = useState<'buyer' | 'artisan' | null>(null);

  const handleRoleSelect = (role: 'buyer' | 'artisan') => {
    setUserRole(role);
  };

  const handleBackToRoleSelection = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  return <Marketplace userRole={userRole} onBack={handleBackToRoleSelection} />;
};

export default Index;