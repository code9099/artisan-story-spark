import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  BookOpen, 
  Users, 
  Calendar, 
  Star, 
  Clock, 
  MapPin, 
  Heart, 
  Share2, 
  Download,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Camera,
  Mic,
  Globe,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

// Import existing images
import peacockSculpture from "@/assets/peacock-sculpture.jpg";
import potteryVase from "@/assets/pottery-vase.jpg";
import silkTextile from "@/assets/silk-textile.jpg";
import jewelryBox from "@/assets/jewelry-box.jpg";

interface MarketplaceExpansionProps {
  onNavigateToTutorial: (tutorial: any) => void;
  onNavigateToWorkshop: (workshop: any) => void;
  onNavigateToArtisan: (artisan: any) => void;
  onNavigateToHome?: () => void;
  onNavigateToFeed?: () => void;
  onNavigateToProfile?: () => void;
}

const MarketplaceExpansion = ({ 
  onNavigateToTutorial, 
  onNavigateToWorkshop, 
  onNavigateToArtisan,
  onNavigateToHome,
  onNavigateToFeed,
  onNavigateToProfile
}: MarketplaceExpansionProps) => {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'workshops' | 'collections' | 'artisans'>('tutorials');

  // Mock data
  const tutorials = [
    {
      id: 1,
      title: "Wood Carving Basics",
      instructor: "Rajesh Kumar",
      duration: "45 min",
      difficulty: "Beginner",
      rating: 4.8,
      students: 1234,
      thumbnail: peacockSculpture,
      price: "Free",
      category: "Sculpture"
    },
    {
      id: 2,
      title: "Pottery Wheel Techniques",
      instructor: "Fatima Sheikh",
      duration: "1h 20min",
      difficulty: "Intermediate",
      rating: 4.9,
      students: 856,
      thumbnail: potteryVase,
      price: "₹299",
      category: "Pottery"
    },
    {
      id: 3,
      title: "Silk Weaving Masterclass",
      instructor: "Lakshmi Devi",
      duration: "2h 15min",
      difficulty: "Advanced",
      rating: 5.0,
      students: 432,
      thumbnail: silkTextile,
      price: "₹599",
      category: "Textiles"
    }
  ];

  const workshops = [
    {
      id: 1,
      title: "Live Pottery Workshop",
      instructor: "Fatima Sheikh",
      date: "Dec 15, 2024",
      time: "2:00 PM IST",
      duration: "3 hours",
      price: "₹1,299",
      maxStudents: 15,
      enrolled: 12,
      location: "Delhi, NCR",
      thumbnail: potteryVase,
      type: "In-Person"
    },
    {
      id: 2,
      title: "Virtual Wood Carving Session",
      instructor: "Rajesh Kumar",
      date: "Dec 20, 2024",
      time: "6:00 PM IST",
      duration: "2 hours",
      price: "₹799",
      maxStudents: 25,
      enrolled: 18,
      location: "Online",
      thumbnail: peacockSculpture,
      type: "Virtual"
    }
  ];

  const collections = [
    {
      id: 1,
      title: "Rajasthani Heritage Collection",
      curator: "Artisan Collective",
      items: 24,
      followers: 2340,
      thumbnail: peacockSculpture,
      description: "Traditional crafts from Rajasthan"
    },
    {
      id: 2,
      title: "Mughal Era Pottery",
      curator: "Heritage Gallery",
      items: 18,
      followers: 1890,
      thumbnail: potteryVase,
      description: "Authentic Mughal-inspired ceramics"
    }
  ];

  const artisans = [
    {
      id: 1,
      name: "Rajesh Kumar",
      specialty: "Wood Carving",
      location: "Jaipur, Rajasthan",
      rating: 4.9,
      followers: 12340,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
      featured: true
    },
    {
      id: 2,
      name: "Fatima Sheikh",
      specialty: "Pottery",
      location: "Delhi, NCR",
      rating: 4.8,
      followers: 8920,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
      featured: false
    }
  ];

  const tabs = [
    { id: 'tutorials', label: 'Tutorials', icon: Play, count: tutorials.length },
    { id: 'workshops', label: 'Workshops', icon: Calendar, count: workshops.length },
    { id: 'collections', label: 'Collections', icon: BookOpen, count: collections.length },
    { id: 'artisans', label: 'Artisans', icon: Users, count: artisans.length }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {onNavigateToHome && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
                onClick={onNavigateToHome}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold mb-1">Marketplace</h1>
              <p className="text-white/80">Learn, create, and discover</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
            >
              <Camera className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/20 backdrop-blur-sm rounded-2xl p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-1 rounded-xl ${
                  activeTab === tab.id 
                    ? 'bg-white text-purple-600' 
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.label}
                <Badge className="ml-2 bg-purple-600 text-white text-xs">
                  {tab.count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {/* Tutorials Tab */}
        {activeTab === 'tutorials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Featured Tutorials</h2>
              <Button variant="ghost" className="text-purple-600">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid gap-4">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex space-x-4">
                    <div className="relative">
                      <img
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <Badge className={`absolute -top-2 -right-2 ${getDifficultyColor(tutorial.difficulty)} text-white`}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-800">{tutorial.title}</h3>
                        <span className="text-purple-600 font-bold">{tutorial.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">by {tutorial.instructor}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{tutorial.students}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{tutorial.rating}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                        onClick={() => onNavigateToTutorial(tutorial)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Workshops Tab */}
        {activeTab === 'workshops' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Workshops</h2>
              <Button variant="ghost" className="text-purple-600">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid gap-4">
              {workshops.map((workshop) => (
                <Card key={workshop.id} className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex space-x-4">
                    <img
                      src={workshop.thumbnail}
                      alt={workshop.title}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-800">{workshop.title}</h3>
                        <Badge className={workshop.type === 'In-Person' ? 'bg-green-500' : 'bg-blue-500'}>
                          {workshop.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">by {workshop.instructor}</p>
                      <div className="space-y-1 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{workshop.date} at {workshop.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{workshop.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{workshop.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{workshop.enrolled}/{workshop.maxStudents} enrolled</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-600 font-bold text-lg">{workshop.price}</span>
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                          onClick={() => onNavigateToWorkshop(workshop)}
                        >
                          Join Workshop
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Featured Collections</h2>
              <Button variant="ghost" className="text-purple-600">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {collections.map((collection) => (
                <Card key={collection.id} className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={collection.thumbnail}
                    alt={collection.title}
                    className="w-full h-32 rounded-xl object-cover mb-3"
                  />
                  <h3 className="font-bold text-gray-800 mb-1">{collection.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {collection.curator}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{collection.items} items</span>
                    <span>{collection.followers} followers</span>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                    Explore Collection
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Artisans Tab */}
        {activeTab === 'artisans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Featured Artisans</h2>
              <Button variant="ghost" className="text-purple-600">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid gap-4">
              {artisans.map((artisan) => (
                <Card key={artisan.id} className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={artisan.avatar}
                        alt={artisan.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {artisan.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      {artisan.featured && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Award className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-gray-800">{artisan.name}</h3>
                        {artisan.featured && (
                          <Badge className="bg-yellow-500 text-white text-xs">Featured</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{artisan.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{artisan.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{artisan.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{artisan.followers}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                        onClick={() => onNavigateToArtisan(artisan)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            onClick={onNavigateToHome}
          >
            <Play className="h-6 w-6" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-purple-600 bg-purple-50 rounded-xl"
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs font-medium">Tutorials</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            onClick={onNavigateToFeed}
          >
            <Heart className="h-6 w-6" />
            <span className="text-xs font-medium">Feed</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            onClick={onNavigateToProfile}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceExpansion;
