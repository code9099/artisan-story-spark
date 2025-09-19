import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Star, Heart, Share, ShoppingCart } from "lucide-react";

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
  artisanImage?: string;
  techniques?: string[];
  materials?: string[];
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/40 border-white/20 text-white hover:bg-black/60"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/40 border-white/20 text-white hover:bg-black/60"
            >
              <Share className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/40 border-white/20 text-white hover:bg-black/60"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-2 text-white/80 mb-2">
            <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium text-primary-foreground">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <h1 className="font-display text-3xl text-white mb-2">{product.name}</h1>
          <div className="flex items-center space-x-2 text-white/80">
            <span>by {product.artisan}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        {/* Price and Actions */}
        <Card className="art-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-3xl text-golden">
              ₹{product.price.toLocaleString()}
            </span>
            <Button className="btn-golden">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </Card>

        {/* Artisan Story */}
        <Card className="art-card p-6">
          <h2 className="font-display text-2xl text-card-foreground mb-4">Artisan's Story</h2>
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="font-display text-2xl text-primary">
                {product.artisan.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">{product.artisan}</h3>
              <p className="text-muted-foreground text-sm">{product.location}</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {product.story}
          </p>
        </Card>

        {/* Techniques & Materials */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="art-card p-6">
            <h3 className="font-display text-xl text-card-foreground mb-4">Techniques</h3>
            <div className="flex flex-wrap gap-2">
              {(product.techniques || ['Hand-carved', 'Traditional', 'Heritage']).map((technique, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {technique}
                </span>
              ))}
            </div>
          </Card>

          <Card className="art-card p-6">
            <h3 className="font-display text-xl text-card-foreground mb-4">Materials</h3>
            <div className="flex flex-wrap gap-2">
              {(product.materials || ['Natural wood', 'Eco-friendly', 'Sustainable']).map((material, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {material}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Description */}
        <Card className="art-card p-6">
          <h3 className="font-display text-xl text-card-foreground mb-4">About this piece</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description || `This exquisite ${product.name.toLowerCase()} represents the pinnacle of traditional craftsmanship. Each piece is meticulously handcrafted using time-honored techniques passed down through generations. The intricate details and superior quality make this a treasured addition to any collection.`}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;