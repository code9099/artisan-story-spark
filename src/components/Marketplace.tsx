import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SwipeableCard from "./SwipeableCard";
import ProductDetail from "./ProductDetail";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import DiscoveryMap from "./DiscoveryMap";
import ImmersiveProductDisplay from "./ImmersiveProductDisplay";
import CraftStory from "./CraftStory";
import CameraUpload from "./CameraUpload";
import MarketplaceExpansion from "./MarketplaceExpansion";
import { ArrowLeft, Filter, MapPin, Clock } from "lucide-react";

// Import generated images
import peacockSculpture from "@/assets/peacock-sculpture.jpg";
import potteryVase from "@/assets/pottery-vase.jpg";
import silkTextile from "@/assets/silk-textile.jpg";
import jewelryBox from "@/assets/jewelry-box.jpg";

interface Product {
  id: string;
  name: string;
  artisan: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  story: string;
  category: string;
  description?: string;
  techniques?: string[];
  materials?: string[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Dancing Peacock Sculpture',
    artisan: 'Rajesh Kumar',
    location: 'Jaipur, Rajasthan',
    price: 15000,
    image: peacockSculpture,
    rating: 4.9,
    story: 'A master craftsman with 30 years of experience in traditional wood carving, creating pieces that celebrate the beauty of Indian wildlife.',
    category: 'Sculpture',
    description: 'Hand-carved from sustainably sourced rosewood, this dancing peacock represents grace and beauty in traditional Indian art.',
    techniques: ['Hand-carving', 'Traditional finishing', 'Natural polish'],
    materials: ['Rosewood', 'Natural oils', 'Traditional stains']
  },
  {
    id: '2',
    name: 'Mughal Garden Vase',
    artisan: 'Fatima Sheikh',
    location: 'Delhi, NCR',
    price: 8500,
    image: potteryVase,
    rating: 4.8,
    story: 'Fourth-generation potter specializing in Mughal-era designs, keeping alive the artistic traditions of medieval India.',
    category: 'Pottery',
    description: 'Inspired by the gardens of the Mughal emperors, this vase features intricate blue and gold patterns.',
    techniques: ['Wheel throwing', 'Hand painting', 'Gold leafing'],
    materials: ['Clay', 'Natural pigments', 'Gold leaf']
  },
  {
    id: '3',
    name: 'Royal Silk Tapestry',
    artisan: 'Lakshmi Devi',
    location: 'Varanasi, Uttar Pradesh',
    price: 25000,
    image: silkTextile,
    rating: 5.0,
    story: 'Master weaver from the silk city of Varanasi, creating textiles that have adorned palaces for generations.',
    category: 'Textiles',
    description: 'Handwoven silk with golden threads, featuring traditional motifs that tell stories of ancient India.',
    techniques: ['Hand weaving', 'Gold thread work', 'Traditional dyeing'],
    materials: ['Pure silk', 'Gold threads', 'Natural dyes']
  },
  {
    id: '4',
    name: 'Heritage Jewelry Box',
    artisan: 'Mohammed Ali',
    location: 'Hyderabad, Telangana',
    price: 12000,
    image: jewelryBox,
    rating: 4.7,
    story: 'Skilled metalworker specializing in Bidriware, an ancient art form that combines beauty with functionality.',
    category: 'Metalwork',
    description: 'Ornate silver jewelry box with precious stone inlays, perfect for storing treasured possessions.',
    techniques: ['Metal engraving', 'Stone setting', 'Silver inlay'],
    materials: ['Sterling silver', 'Semi-precious stones', 'Velvet lining']
  }
];

interface MarketplaceProps {
  userRole: 'buyer' | 'artisan';
  onBack: () => void;
}

const Marketplace = ({ userRole, onBack }: MarketplaceProps) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [location] = useState("Mumbai, Maharashtra");
  const [currentView, setCurrentView] = useState<'home' | 'feed' | 'category' | 'profile' | 'discovery' | 'marketplace' | 'camera' | 'immersive' | 'story'>('home');
  const [showCraftStory, setShowCraftStory] = useState(false);

  const handleSwipe = (direction: 'up' | 'down', productId: string) => {
    if (direction === 'up') {
      setLikedProducts(prev => [...prev, productId]);
    }
    
    // Create infinite loop by cycling through products
    setTimeout(() => {
      setProducts(prev => {
        const newProducts = [...prev];
        const swiped = newProducts.shift(); // Remove first product
        if (swiped) {
          newProducts.push(swiped); // Add it to the end
        }
        return newProducts;
      });
    }, 300);
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToCards = () => {
    setSelectedProduct(null);
  };

  const handleNavigateToFeed = () => {
    setCurrentView('feed');
  };

  const handleNavigateToCategory = () => {
    setCurrentView('category');
  };

  const handleNavigateToProfile = () => {
    setCurrentView('profile');
  };

  const handleNavigateToDiscovery = () => {
    setCurrentView('discovery');
  };

  const handleNavigateToMarketplace = () => {
    setCurrentView('marketplace');
  };

  const handleNavigateToCamera = () => {
    setCurrentView('camera');
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setCurrentView('immersive');
  };

  const handleCraftStory = () => {
    setShowCraftStory(true);
    setCurrentView('story');
  };

  const handleCameraUpload = (files: any[]) => {
    console.log('Uploaded files:', files);
    setCurrentView('home');
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

  const visibleProducts = products.slice(0, 3); // Always show first 3 cards for stacking

  // For art enthusiasts, show HomePage by default
  if (userRole === 'buyer' && currentView === 'home') {
    return (
      <HomePage 
        onNavigateToFeed={handleNavigateToFeed}
        onNavigateToCategory={handleNavigateToCategory}
        onNavigateToProfile={handleNavigateToProfile}
        onNavigateToDiscovery={handleNavigateToDiscovery}
        onNavigateToMarketplace={handleNavigateToMarketplace}
        onNavigateToCamera={handleNavigateToCamera}
      />
    );
  }

  // For art enthusiasts, show feed (swipeable cards) when navigating to feed
  if (userRole === 'buyer' && currentView === 'feed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <div className="px-4 pt-12 pb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
              onClick={() => setCurrentView('home')}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
            >
              <Filter className="h-6 w-6" />
            </Button>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 text-white/80 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Discover Art
            </h1>
            <p className="text-white/80 text-sm">
              Swipe through amazing handcrafted treasures
            </p>
          </div>
        </div>

        {/* Card Stack */}
        <div className="px-4 pb-8">
          <div className="relative h-[600px] max-w-sm mx-auto">
            {visibleProducts.map((product, index) => (
              <SwipeableCard
                key={`${product.id}-${Date.now()}`}
                product={product}
                onSwipe={handleSwipe}
                onCardClick={handleCardClick}
                stackIndex={index}
                totalCards={visibleProducts.length}
              />
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <Card className="p-4 rounded-2xl shadow-lg bg-white">
              <p className="text-center text-gray-600 text-sm">
                💡 Swipe up to like ❤️, down to pass ✗, or tap to discover the artisan's story
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs font-medium">Home</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            >
              <Grid3X3 className="h-6 w-6" />
              <span className="text-xs font-medium">Category</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-purple-600 bg-purple-50 rounded-xl"
            >
              <Heart className="h-6 w-6" />
              <span className="text-xs font-medium">Feed</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            >
              <User className="h-6 w-6" />
              <span className="text-xs font-medium">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Discovery Map view
  if (userRole === 'buyer' && currentView === 'discovery') {
    return (
      <DiscoveryMap 
        onNavigateToCraft={handleProductClick}
        onNavigateToArtisan={handleArtisanClick}
        onNavigateToHome={() => setCurrentView('home')}
        onNavigateToFeed={handleNavigateToFeed}
        onNavigateToProfile={handleNavigateToProfile}
      />
    );
  }

  // Marketplace Expansion view
  if (userRole === 'buyer' && currentView === 'marketplace') {
    return (
      <MarketplaceExpansion
        onNavigateToTutorial={handleTutorialClick}
        onNavigateToWorkshop={handleWorkshopClick}
        onNavigateToArtisan={handleArtisanClick}
        onNavigateToHome={() => setCurrentView('home')}
        onNavigateToFeed={handleNavigateToFeed}
        onNavigateToProfile={handleNavigateToProfile}
      />
    );
  }

  // Camera Upload view
  if (userRole === 'buyer' && currentView === 'camera') {
    return (
      <CameraUpload
        onClose={() => setCurrentView('home')}
        onUpload={handleCameraUpload}
      />
    );
  }

  // Immersive Product Display view
  if (userRole === 'buyer' && currentView === 'immersive' && selectedProduct) {
    return (
      <ImmersiveProductDisplay
        product={selectedProduct}
        onClose={() => setCurrentView('home')}
        onLike={() => console.log('Liked product')}
        onShare={() => console.log('Shared product')}
        onViewStory={handleCraftStory}
      />
    );
  }

  // Craft Story view
  if (userRole === 'buyer' && currentView === 'story' && selectedProduct) {
    return (
      <CraftStory
        product={selectedProduct}
        onBack={() => setCurrentView('immersive')}
      />
    );
  }

  // Profile view for art enthusiasts
  if (userRole === 'buyer' && currentView === 'profile') {
    return (
      <ProfilePage onBack={() => setCurrentView('home')} />
    );
  }

  // Placeholder view for category
  if (userRole === 'buyer' && currentView === 'category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <div className="px-4 pt-12 pb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
              onClick={() => setCurrentView('home')}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold capitalize">Categories</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Grid3X3 className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Categories Coming Soon
            </h2>
            <p className="text-gray-500 mb-6">
              This feature is under development
            </p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl"
              onClick={() => setCurrentView('home')}
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs font-medium">Home</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-purple-600 bg-purple-50 rounded-xl"
            >
              <Grid3X3 className="h-6 w-6" />
              <span className="text-xs font-medium">Category</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            >
              <Heart className="h-6 w-6" />
              <span className="text-xs font-medium">Feed</span>
            </Button>
            
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 p-2 text-gray-400"
            >
              <User className="h-6 w-6" />
              <span className="text-xs font-medium">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={handleBackToCards} />;
  }

  // For artisans, show the original swipeable interface
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-secondary/50 border-border text-foreground hover:bg-secondary"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-secondary/50 border-border text-foreground hover:bg-secondary"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <h1 className="font-display text-4xl text-foreground mb-2 font-bold">
            Pick your future.
          </h1>
          <h2 className="font-display text-lg text-golden">
            Showcase your masterpieces
          </h2>
        </div>
      </div>

      {/* Card Stack */}
      <div className="px-6 pb-8">
        <div className="relative h-[600px] max-w-sm mx-auto">
          {visibleProducts.map((product, index) => (
            <SwipeableCard
              key={`${product.id}-${Date.now()}`} // Unique key for infinite loop
              product={product}
              onSwipe={handleSwipe}
              onCardClick={handleCardClick}
              stackIndex={index}
              totalCards={visibleProducts.length}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8">
          <Card className="art-card p-4">
            <p className="text-center text-muted-foreground text-sm">
              💡 Swipe up to like ❤️, down to pass ✗, or tap to discover the artisan's story
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;