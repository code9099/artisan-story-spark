import { useState, useRef, useEffect } from "react";
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
  onSwipe: (direction: 'up' | 'down', productId: string) => void;
  onCardClick: (product: Product) => void;
  stackIndex: number;
  totalCards: number;
}

const SwipeableCard = ({ product, onSwipe, onCardClick, stackIndex, totalCards }: SwipeableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isTop = stackIndex === 0;
  const isVisible = stackIndex < 3;

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTop || isAnimating) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isTop || isAnimating) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isTop || isAnimating) return;
    handleDragEnd();
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTop || isAnimating) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isTop || isAnimating) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging || !isTop || isAnimating) return;
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsAnimating(true);
    
    const cardHeight = cardRef.current?.offsetHeight || 400;
    const swipeThreshold = cardHeight * 0.3; // 30% of card height
    
    if (Math.abs(dragOffset.y) > swipeThreshold) {
      const direction = dragOffset.y < 0 ? 'up' : 'down';
      // Animate card flying off screen
      if (direction === 'up') {
        setDragOffset({ x: dragOffset.x, y: -cardHeight * 2 });
      } else {
        setDragOffset({ x: dragOffset.x, y: cardHeight * 2 });
      }
      
      setTimeout(() => {
        onSwipe(direction, product.id);
        setDragOffset({ x: 0, y: 0 });
        setIsAnimating(false);
      }, 300);
    } else {
      // Return to original position
      setDragOffset({ x: 0, y: 0 });
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    const cardHeight = cardRef.current?.offsetHeight || 400;
    setDragOffset({ x: 0, y: -cardHeight * 2 });
    setTimeout(() => {
      onSwipe('up', product.id);
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300);
  };

  const handlePass = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    const cardHeight = cardRef.current?.offsetHeight || 400;
    setDragOffset({ x: 0, y: cardHeight * 2 });
    setTimeout(() => {
      onSwipe('down', product.id);
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300);
  };

  // Calculate 3D transforms based on stack position
  const getStackTransform = () => {
    if (!isVisible) return { scale: 0, translateY: 100, opacity: 0 };
    
    const baseScale = 1 - (stackIndex * 0.05); // 1, 0.95, 0.9
    const baseTranslateY = stackIndex * 20; // 0, 20, 40
    const baseOpacity = stackIndex === 0 ? 1 : 0.8;
    
    return {
      scale: baseScale,
      translateY: baseTranslateY,
      opacity: baseOpacity
    };
  };

  // Calculate drag transforms with 3D tilt
  const getDragTransform = () => {
    if (!isDragging && !isAnimating) return "";
    
    const tiltX = (dragOffset.x / 20) * -1; // Subtle horizontal tilt
    const rotateY = (dragOffset.x / 400) * 15; // 3D perspective tilt
    
    return `rotateX(${tiltX}deg) rotateY(${rotateY}deg)`;
  };

  const stackTransform = getStackTransform();
  const dragTransform = getDragTransform();

  // Prevent context menu on long press
  useEffect(() => {
    const handleContextMenu = (e: Event) => e.preventDefault();
    if (cardRef.current) {
      cardRef.current.addEventListener('contextmenu', handleContextMenu);
    }
    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cardRef}
      className="absolute inset-0 w-full h-full"
      style={{
        transform: `
          translateY(${dragOffset.y + stackTransform.translateY}px) 
          translateX(${dragOffset.x}px) 
          scale(${stackTransform.scale}) 
          ${dragTransform}
        `,
        opacity: stackTransform.opacity,
        zIndex: totalCards - stackIndex,
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}  
      onTouchEnd={handleTouchEnd}
    >
      <Card 
        className="art-card h-full cursor-pointer select-none relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => !isDragging && !isAnimating && onCardClick(product)}
        style={{
          borderRadius: '24px',
          boxShadow: stackIndex === 0 ? '0 20px 40px rgba(0,0,0,0.15)' : '0 10px 20px rgba(0,0,0,0.1)'
        }}
      >
        {/* Product Image */}
        <div 
          className="relative h-2/3"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)'
            }}
          />
          
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
            <h3 className="font-display text-2xl text-card-foreground mb-2 font-bold uppercase">
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
            <span className="font-display text-2xl text-golden font-bold">
              ₹{product.price.toLocaleString()}
            </span>
            
            {isTop && (
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  onClick={handlePass}
                  disabled={isAnimating}
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full btn-golden"
                  onClick={handleLike}
                  disabled={isAnimating}
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
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                dragOffset.y < -50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                LIKE ❤️
              </div>
            </div>
            <div 
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                dragOffset.y > 50 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                PASS ✗
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default SwipeableCard;