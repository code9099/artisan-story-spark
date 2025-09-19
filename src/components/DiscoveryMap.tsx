import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Heart, 
  Compass, 
  Zap, 
  Crown,
  Sparkles,
  Navigation,
  Target,
  Award,
  ArrowLeft
} from "lucide-react";

// Import existing images
import peacockSculpture from "@/assets/peacock-sculpture.jpg";
import potteryVase from "@/assets/pottery-vase.jpg";
import silkTextile from "@/assets/silk-textile.jpg";
import jewelryBox from "@/assets/jewelry-box.jpg";

interface DiscoveryMapProps {
  onNavigateToCraft: (craft: any) => void;
  onNavigateToArtisan: (artisan: any) => void;
  onNavigateToHome?: () => void;
  onNavigateToFeed?: () => void;
  onNavigateToProfile?: () => void;
}

const DiscoveryMap = ({ onNavigateToCraft, onNavigateToArtisan, onNavigateToHome, onNavigateToFeed, onNavigateToProfile }: DiscoveryMapProps) => {
  const [currentLocation, setCurrentLocation] = useState({ x: 50, y: 50 });
  const [discoveredCrafts, setDiscoveredCrafts] = useState<string[]>([]);
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  // Mock discovery points on the map
  const discoveryPoints = [
    {
      id: 1,
      name: "Rajasthani Wood Carving",
      artisan: "Rajesh Kumar",
      location: { x: 20, y: 30 },
      type: "sculpture",
      rarity: "legendary",
      image: peacockSculpture,
      experience: 50,
      discovered: false
    },
    {
      id: 2,
      name: "Mughal Pottery",
      artisan: "Fatima Sheikh",
      location: { x: 70, y: 25 },
      type: "pottery",
      rarity: "epic",
      image: potteryVase,
      experience: 30,
      discovered: false
    },
    {
      id: 3,
      name: "Varanasi Silk Weaving",
      artisan: "Lakshmi Devi",
      location: { x: 30, y: 70 },
      type: "textile",
      rarity: "legendary",
      image: silkTextile,
      experience: 50,
      discovered: false
    },
    {
      id: 4,
      name: "Bidri Metalwork",
      artisan: "Mohammed Ali",
      location: { x: 80, y: 80 },
      type: "metalwork",
      rarity: "rare",
      image: jewelryBox,
      experience: 20,
      discovered: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500';
      case 'epic': return 'bg-purple-500';
      case 'rare': return 'bg-blue-500';
      case 'common': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="h-4 w-4" />;
      case 'epic': return <Zap className="h-4 w-4" />;
      case 'rare': return <Star className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const handleDiscovery = (point: any) => {
    if (!discoveredCrafts.includes(point.id.toString())) {
      setDiscoveredCrafts(prev => [...prev, point.id.toString()]);
      setExperience(prev => prev + point.experience);
      setUserLevel(Math.floor(experience / 100) + 1);
    }
    onNavigateToCraft(point);
  };

  const calculateDistance = (point1: any, point2: any) => {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex items-center justify-between">
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
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Discovery Map</h1>
              <p className="text-white/80 text-sm">Level {userLevel} • {experience} XP</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-yellow-500 text-white">
              {discoveredCrafts.length} Discovered
            </Badge>
          </div>
        </div>
      </div>

      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-40 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-purple-500/20 rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Discovery Points */}
      <div className="relative w-full h-screen">
        {discoveryPoints.map((point) => {
          const distance = calculateDistance(currentLocation, point.location);
          const isNearby = distance < 15;
          const isDiscovered = discoveredCrafts.includes(point.id.toString());
          
          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${point.location.x}%`,
                top: `${point.location.y}%`,
              }}
              onClick={() => handleDiscovery(point)}
            >
              {/* Discovery Ring */}
              {isNearby && !isDiscovered && (
                <div className="absolute inset-0 animate-ping">
                  <div className="w-16 h-16 border-2 border-yellow-400 rounded-full"></div>
                </div>
              )}
              
              {/* Discovery Point */}
              <div className={`relative w-12 h-12 rounded-full ${getRarityColor(point.rarity)} flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110`}>
                {getRarityIcon(point.rarity)}
                
                {/* Discovery Status */}
                {isDiscovered && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              {/* Craft Preview Card */}
              {isNearby && (
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-48 z-20">
                  <Card className="p-3 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={point.image}
                        alt={point.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm">{point.name}</h3>
                        <p className="text-gray-600 text-xs">by {point.artisan}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">+{point.experience} XP</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          );
        })}

        {/* User Location */}
        <div
          className="absolute w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${currentLocation.x}%`,
            top: `${currentLocation.y}%`,
          }}
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() => setCurrentLocation(prev => ({ ...prev, x: Math.max(10, prev.x - 10) }))}
          >
            <Navigation className="h-5 w-5 rotate-180" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() => setCurrentLocation(prev => ({ ...prev, y: Math.max(10, prev.y - 10) }))}
          >
            <Navigation className="h-5 w-5 -rotate-90" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() => setCurrentLocation(prev => ({ ...prev, y: Math.min(90, prev.y + 10) }))}
          >
            <Navigation className="h-5 w-5 rotate-90" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() => setCurrentLocation(prev => ({ ...prev, x: Math.min(90, prev.x + 10) }))}
          >
            <Navigation className="h-5 w-5" />
          </Button>
        </div>

        {/* Discovery Stats */}
        <div className="absolute bottom-20 left-4 right-4">
          <Card className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border-white/30">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{discoveredCrafts.length}</div>
                  <div className="text-xs opacity-80">Discovered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userLevel}</div>
                  <div className="text-xs opacity-80">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{experience}</div>
                  <div className="text-xs opacity-80">Experience</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span className="text-sm">Explore to discover more!</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-purple-600 bg-purple-50 rounded-xl"
            >
              <Compass className="h-6 w-6" />
              <span className="text-xs font-medium">Discover</span>
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
            >
              <Star className="h-6 w-6" />
              <span className="text-xs font-medium">Category</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
              onClick={onNavigateToProfile}
            >
              <Heart className="h-6 w-6" />
              <span className="text-xs font-medium">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryMap;
