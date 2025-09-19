import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SwipeableCard from "./SwipeableCard";
import ProductDetail from "./ProductDetail";
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

  const handleSwipe = (direction: 'left' | 'right', productId: string) => {
    if (direction === 'right') {
      setLikedProducts(prev => [...prev, productId]);
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToCards = () => {
    setSelectedProduct(null);
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);
  const hasMoreProducts = currentIndex < products.length;

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={handleBackToCards} />;
  }

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
          <h1 className="font-display text-3xl text-foreground mb-2">
            {userRole === 'buyer' ? 'Good Morning,' : 'Your Gallery,'}
          </h1>
          <h2 className="font-display text-2xl text-golden">
            {userRole === 'buyer' ? 'Art Explorer...' : 'Master Artisan...'}
          </h2>
        </div>
      </div>

      {/* Card Stack */}
      <div className="px-6 pb-8">
        {hasMoreProducts ? (
          <div className="relative h-[600px] max-w-sm mx-auto">
            {visibleProducts.map((product, index) => (
              <SwipeableCard
                key={product.id}
                product={product}
                onSwipe={handleSwipe}
                onCardClick={handleCardClick}
                isTop={index === 0}
              />
            ))}
          </div>
        ) : (
          <Card className="art-card p-8 text-center max-w-sm mx-auto">
            <div className="space-y-4">
              <Clock className="h-12 w-12 text-primary mx-auto" />
              <h3 className="font-display text-2xl text-card-foreground">
                You've explored all treasures!
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new artisan creations
              </p>
              {likedProducts.length > 0 && (
                <div className="mt-6">
                  <p className="text-muted-foreground mb-2">
                    You liked {likedProducts.length} treasures
                  </p>
                  <Button className="btn-golden">
                    View Liked Items
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Tips */}
      {currentIndex === 0 && (
        <div className="px-6 pb-8">
          <Card className="art-card p-4">
            <p className="text-center text-muted-foreground text-sm">
              💡 Swipe right to like, left to pass, or tap to learn more about the artisan's story
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Marketplace;