import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DiscoveryMap from "./DiscoveryMap";
import ImmersiveProductDisplay from "./ImmersiveProductDisplay";
import CraftStory from "./CraftStory";
import CameraUpload from "./CameraUpload";
import MarketplaceExpansion from "./MarketplaceExpansion";
import { 
  Menu, 
  User, 
  Search, 
  MapPin, 
  Calendar, 
  Palette, 
  Image, 
  Users,
  Home,
  Grid3X3,
  Heart,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Filter,
  Bell,
  Compass,
  Camera,
  BookOpen,
  Play
} from "lucide-react";

// Import existing images
import peacockSculpture from "@/assets/peacock-sculpture.jpg";
import potteryVase from "@/assets/pottery-vase.jpg";
import silkTextile from "@/assets/silk-textile.jpg";
import jewelryBox from "@/assets/jewelry-box.jpg";

interface HomePageProps {
  onNavigateToFeed: () => void;
  onNavigateToCategory: () => void;
  onNavigateToProfile: () => void;
  onNavigateToDiscovery: () => void;
  onNavigateToMarketplace: () => void;
  onNavigateToCamera: () => void;
}

const HomePage = ({ 
  onNavigateToFeed, 
  onNavigateToCategory, 
  onNavigateToProfile,
  onNavigateToDiscovery,
  onNavigateToMarketplace,
  onNavigateToCamera
}: HomePageProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCraftStory, setShowCraftStory] = useState(false);

  // Mock exhibition data
  const exhibitions = [
    {
      id: 1,
      title: "Michael Angelo's Masterpieces",
      dateRange: "May 23 - June 23",
      image: peacockSculpture,
      location: "National Gallery",
      price: "Free",
      rating: 4.9,
      featured: true
    },
    {
      id: 2,
      title: "Renaissance Masters",
      dateRange: "June 1 - July 15",
      image: potteryVase,
      location: "Art Museum",
      price: "£15",
      rating: 4.7
    },
    {
      id: 3,
      title: "Modern Sculptures",
      dateRange: "July 5 - August 20",
      image: silkTextile,
      location: "Contemporary Art Center",
      price: "£20",
      rating: 4.8
    },
    {
      id: 4,
      title: "Traditional Crafts",
      dateRange: "August 1 - September 10",
      image: jewelryBox,
      location: "Heritage Gallery",
      price: "£12",
      rating: 4.6
    }
  ];

  const categories = [
    { name: "Discover", icon: Compass, count: 24, color: "bg-purple-500", action: onNavigateToDiscovery },
    { name: "Tutorials", icon: Play, count: 12, color: "bg-blue-500", action: onNavigateToMarketplace },
    { name: "Camera", icon: Camera, count: 0, color: "bg-green-500", action: onNavigateToCamera },
    { name: "Stories", icon: BookOpen, count: 8, color: "bg-orange-500", action: onNavigateToMarketplace }
  ];

  const trendingItems = [
    {
      id: 1,
      title: "Sculpture Collection",
      artist: "Rajesh Kumar",
      image: peacockSculpture,
      price: 15000,
      likes: 234
    },
    {
      id: 2,
      title: "Ceramic Vases",
      artist: "Fatima Sheikh",
      image: potteryVase,
      price: 8500,
      likes: 189
    }
  ];

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleCraftStory = () => {
    setShowCraftStory(true);
  };

  const handleCameraUpload = (files: any[]) => {
    console.log('Uploaded files:', files);
  };

  const handleTutorialClick = (tutorial: any) => {
    console.log('Navigate to tutorial:', tutorial);
  };

  const handleWorkshopClick = (workshop: any) => {
    console.log('Navigate to workshop:', workshop);
  };

  const handleArtisanClick = (artisan: any) => {
    console.log('Navigate to artisan:', artisan);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="px-4 pt-12 pb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="h-4 w-4 text-white/80" />
          <span className="text-white/80 text-sm">Birmingham, UK</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">
          {getCurrentTime()}, Brooklyn
        </h1>
        <p className="text-white/80 text-sm">Discover amazing art and exhibitions</p>
      </div>

      {/* Search Bar */}
      <div className="px-4 -mt-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search exhibitions, events, or artists…"
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-lg"
          />
          <Button size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-purple-600 hover:bg-purple-700">
            <Filter className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Category Scroll Section */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Explore Categories</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index} 
                className="flex-shrink-0 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={category.action}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
                  <p className="text-gray-500 text-xs">{category.count} items</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Exhibition */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Featured Exhibition</h2>
          <Button variant="ghost" className="text-purple-600 p-0 font-medium">
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Card className="rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-48">
            <img
              src={exhibitions[0].image}
              alt={exhibitions[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-purple-600 text-white">Featured</Badge>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/40 rounded-full px-2 py-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">{exhibitions[0].rating}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-1">{exhibitions[0].title}</h3>
              <p className="text-white/80 text-sm mb-2">{exhibitions[0].dateRange}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">{exhibitions[0].location}</span>
                <span className="text-white font-bold">{exhibitions[0].price}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Trending Items */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Trending Now</h2>
          <Button variant="ghost" className="text-purple-600 p-0 font-medium">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {trendingItems.map((item) => (
            <Card 
              key={item.id} 
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleProductClick(item)}
            >
              <div className="relative h-32">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/40 rounded-full px-2 py-1">
                  <Heart className="h-3 w-3 text-red-400 fill-current" />
                  <span className="text-white text-xs">{item.likes}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-2">by {item.artist}</p>
                <p className="text-purple-600 font-bold text-sm">₹{item.price.toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Exhibition Section */}
      <div className="px-4 mb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Upcoming Exhibitions</h2>
          <Button variant="ghost" className="text-purple-600 p-0 font-medium">
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {exhibitions.slice(1).map((exhibition) => (
            <Card key={exhibition.id} className="flex-shrink-0 w-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-40">
                <img
                  src={exhibition.image}
                  alt={exhibition.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/40 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-medium">{exhibition.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm mb-1">{exhibition.title}</h3>
                  <p className="text-white/80 text-xs mb-1">{exhibition.dateRange}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs">{exhibition.location}</span>
                    <span className="text-white font-bold text-sm">{exhibition.price}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            className={`flex flex-col items-center space-y-1 p-2 rounded-xl ${
              activeTab === 'home' ? 'text-purple-600 bg-purple-50' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <Home className={`h-6 w-6 ${activeTab === 'home' ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex flex-col items-center space-y-1 p-2 rounded-xl ${
              activeTab === 'category' ? 'text-purple-600 bg-purple-50' : 'text-gray-400'
            }`}
            onClick={() => {
              setActiveTab('category');
              onNavigateToCategory();
            }}
          >
            <Grid3X3 className={`h-6 w-6 ${activeTab === 'category' ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="text-xs font-medium">Category</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex flex-col items-center space-y-1 p-2 rounded-xl ${
              activeTab === 'feed' ? 'text-purple-600 bg-purple-50' : 'text-gray-400'
            }`}
            onClick={() => {
              setActiveTab('feed');
              onNavigateToFeed();
            }}
          >
            <Heart className={`h-6 w-6 ${activeTab === 'feed' ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="text-xs font-medium">Feed</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex flex-col items-center space-y-1 p-2 rounded-xl ${
              activeTab === 'profile' ? 'text-purple-600 bg-purple-50' : 'text-gray-400'
            }`}
            onClick={() => {
              setActiveTab('profile');
              onNavigateToProfile();
            }}
          >
            <User className={`h-6 w-6 ${activeTab === 'profile' ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
