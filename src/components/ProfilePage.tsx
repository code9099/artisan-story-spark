import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  Heart,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
  Camera,
  Star,
  Award,
  Bookmark,
  Share2,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  Check
} from "lucide-react";

// Import existing images for mock data
import peacockSculpture from "@/assets/peacock-sculpture.jpg";
import potteryVase from "@/assets/pottery-vase.jpg";
import silkTextile from "@/assets/silk-textile.jpg";
import jewelryBox from "@/assets/jewelry-box.jpg";

interface ProfilePageProps {
  onBack: () => void;
}

const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const userData = {
    name: "Brooklyn Johnson",
    email: "brooklyn.johnson@email.com",
    location: "Birmingham, UK",
    joinDate: "March 2024",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Art enthusiast passionate about discovering unique handcrafted treasures from around the world.",
    stats: {
      likedItems: 24,
      savedExhibitions: 8,
      reviews: 12,
      badges: 3
    }
  };

  // Mock liked items
  const likedItems = [
    {
      id: 1,
      name: "Dancing Peacock Sculpture",
      artisan: "Rajesh Kumar",
      price: 15000,
      image: peacockSculpture,
      likedDate: "2 days ago"
    },
    {
      id: 2,
      name: "Mughal Garden Vase",
      artisan: "Fatima Sheikh",
      price: 8500,
      image: potteryVase,
      likedDate: "1 week ago"
    },
    {
      id: 3,
      name: "Royal Silk Tapestry",
      artisan: "Lakshmi Devi",
      price: 25000,
      image: silkTextile,
      likedDate: "2 weeks ago"
    },
    {
      id: 4,
      name: "Heritage Jewelry Box",
      artisan: "Mohammed Ali",
      price: 12000,
      image: jewelryBox,
      likedDate: "3 weeks ago"
    }
  ];

  // Mock saved exhibitions
  const savedExhibitions = [
    {
      id: 1,
      title: "Renaissance Masters",
      date: "June 1 - July 15",
      location: "Art Museum",
      image: potteryVase
    },
    {
      id: 2,
      title: "Modern Sculptures",
      date: "July 5 - August 20",
      location: "Contemporary Art Center",
      image: silkTextile
    }
  ];

  const menuItems = [
    { icon: User, label: "Personal Information", action: "edit-profile" },
    { icon: Heart, label: "Liked Items", count: userData.stats.likedItems, action: "liked" },
    { icon: Bookmark, label: "Saved Exhibitions", count: userData.stats.savedExhibitions, action: "saved" },
    { icon: Star, label: "Reviews & Ratings", count: userData.stats.reviews, action: "reviews" },
    { icon: Award, label: "Badges & Achievements", count: userData.stats.badges, action: "badges" },
    { icon: Settings, label: "Settings", action: "settings" },
    { icon: Bell, label: "Notifications", action: "notifications" },
    { icon: Shield, label: "Privacy & Security", action: "privacy" },
    { icon: HelpCircle, label: "Help & Support", action: "help" },
    { icon: LogOut, label: "Sign Out", action: "logout", isDestructive: true }
  ];

  const handleMenuAction = (action: string) => {
    console.log(`Action: ${action}`);
    // Handle different menu actions here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={() => handleMenuAction('edit-profile')}
          >
            <Edit3 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-4 -mt-4 mb-6">
        <Card className="p-6 rounded-2xl shadow-lg border-0">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{userData.name}</h2>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{userData.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mb-3">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Joined {userData.joinDate}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{userData.bio}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <Card className="p-4 rounded-2xl shadow-md">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.stats.likedItems}</div>
              <div className="text-xs text-gray-600">Liked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.stats.savedExhibitions}</div>
              <div className="text-xs text-gray-600">Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.stats.reviews}</div>
              <div className="text-xs text-gray-600">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userData.stats.badges}</div>
              <div className="text-xs text-gray-600">Badges</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {likedItems.slice(0, 2).map((item) => (
            <Card key={item.id} className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-gray-600 text-xs">by {item.artisan}</p>
                  <p className="text-gray-500 text-xs">{item.likedDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600 text-sm">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mb-20">
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="p-0 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <Button
                  variant="ghost"
                  className={`w-full justify-between p-4 h-auto rounded-2xl ${
                    item.isDestructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-purple-50'
                  }`}
                  onClick={() => handleMenuAction(item.action)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${item.isDestructive ? 'bg-red-100' : 'bg-purple-100'}`}>
                      <IconComponent className={`h-5 w-5 ${item.isDestructive ? 'text-red-600' : 'text-purple-600'}`} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.count && (
                      <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-gray-400"
          >
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-gray-400"
          >
            <Heart className="h-6 w-6" />
            <span className="text-xs font-medium">Category</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-gray-400"
          >
            <Bookmark className="h-6 w-6" />
            <span className="text-xs font-medium">Feed</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-purple-600 bg-purple-50 rounded-xl"
          >
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
