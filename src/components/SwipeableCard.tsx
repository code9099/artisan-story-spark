import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X, MapPin, Star } from "lucide-react";

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
}

interface SwipeableCardProps {
  product: Product;
  onSwipe: (direction: 'left' | 'right', productId: string) => void;
  onCardClick: (product: Product) => void;
  isTop?: boolean;
}

const SwipeableCard = ({ product, onSwipe, onCardClick, isTop = false }: SwipeableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTop) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isTop) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);
    
    const swipeThreshold = 100;
    if (Math.abs(dragOffset.x) > swipeThreshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction, product.id);
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSwipe('right', product.id);
  };

  const handlePass = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSwipe('left', product.id);
  };

  const rotation = dragOffset.x * 0.1;
  const scale = isTop ? 1 : 0.95;
  const opacity = isTop ? 1 : 0.8;

  return (
    <div 
      ref={cardRef}
      className="absolute inset-0 w-full h-full"
      style={{
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg) scale(${scale})`,
        opacity,
        zIndex: isTop ? 10 : 1,
        transition: isDragging ? 'none' : 'all 0.3s ease-out'
      }}
    >
      <Card 
        className="art-card h-full cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => !isDragging && onCardClick(product)}
      >
        {/* Product Image */}
        <div className="relative h-2/3">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/40 rounded-full px-2 py-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 h-1/3 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-2xl text-card-foreground mb-2">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2 text-muted-foreground mb-3">
              <span className="font-medium">by {product.artisan}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {product.story}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display text-2xl text-golden">
              ₹{product.price.toLocaleString()}
            </span>
            
            {isTop && (
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  onClick={handlePass}
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full btn-golden"
                  onClick={handleLike}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Swipe Indicators */}
        {isTop && isDragging && (
          <>
            <div 
              className={`absolute top-1/2 left-8 transform -translate-y-1/2 transition-opacity ${
                dragOffset.x > 50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                LIKE
              </div>
            </div>
            <div 
              className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-opacity ${
                dragOffset.x < -50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                PASS
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default SwipeableCard;