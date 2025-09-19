import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Palette, ShoppingBag } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: 'buyer' | 'artisan') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'artisan' | null>(null);

  const handleRoleSelect = (role: 'buyer' | 'artisan') => {
    setSelectedRole(role);
    setTimeout(() => onRoleSelect(role), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl text-golden mb-2">
            Artisan's Gallery
          </h1>
          <p className="text-muted-foreground text-lg">
            Connecting traditional craftsmanship with the digital world
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          <Card 
            className={`art-card p-6 cursor-pointer transition-all duration-300 ${
              selectedRole === 'buyer' ? 'ring-2 ring-primary shadow-golden' : ''
            }`}
            onClick={() => handleRoleSelect('buyer')}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-card-foreground">Art Enthusiast</h3>
                <p className="text-muted-foreground mt-1">
                  Discover and collect unique handcrafted treasures
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card 
            className={`art-card p-6 cursor-pointer transition-all duration-300 ${
              selectedRole === 'artisan' ? 'ring-2 ring-primary shadow-golden' : ''
            }`}
            onClick={() => handleRoleSelect('artisan')}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-card-foreground">Local Artisan</h3>
                <p className="text-muted-foreground mt-1">
                  Share your craft and connect with art lovers
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Preserving heritage through digital innovation
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;