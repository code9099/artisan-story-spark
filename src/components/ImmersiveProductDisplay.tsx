import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Heart,
  Share2,
  BookOpen,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Eye,
  Hand
} from "lucide-react";

interface ImmersiveProductDisplayProps {
  product: any;
  onClose: () => void;
  onLike: () => void;
  onShare: () => void;
  onViewStory: () => void;
}

const ImmersiveProductDisplay = ({ 
  product, 
  onClose, 
  onLike, 
  onShare, 
  onViewStory 
}: ImmersiveProductDisplayProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentView, setCurrentView] = useState<'3d' | 'details' | 'process'>('3d');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock 3D rotation data
  const productImages = [
    product.image,
    product.image, // In real app, these would be different angles
    product.image,
    product.image
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * zoomFactor)));
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={onClose}
            >
              ×
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-white/70">by {product.artisan}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={onLike}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={onShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex h-full">
          {/* 3D View Area */}
          <div className="flex-1 p-6">
            <div className="relative h-full">
              {/* View Controls */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full ${currentView === '3d' ? 'bg-purple-600' : 'bg-white/10'} text-white`}
                  onClick={() => setCurrentView('3d')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  3D View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full ${currentView === 'details' ? 'bg-purple-600' : 'bg-white/10'} text-white`}
                  onClick={() => setCurrentView('details')}
                >
                  <Hand className="h-4 w-4 mr-2" />
                  Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full ${currentView === 'process' ? 'bg-purple-600' : 'bg-white/10'} text-white`}
                  onClick={() => setCurrentView('process')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Process
                </Button>
              </div>

              {/* 3D Container */}
              <div
                ref={containerRef}
                className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                style={{
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {currentView === '3d' && (
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
                      style={{
                        transform: 'translateZ(50px)',
                        boxShadow: '0 0 50px rgba(147, 51, 234, 0.3)'
                      }}
                    />
                    {/* 3D Effects */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                    <div className="absolute -inset-4 rounded-2xl border border-purple-500/30"></div>
                  </div>
                )}

                {currentView === 'details' && (
                  <div className="text-center space-y-6">
                    <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Sparkles className="h-32 w-32 text-white/50" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Material Details</h3>
                      <p className="text-white/70">Explore the intricate materials and techniques used</p>
                    </div>
                  </div>
                )}

                {currentView === 'process' && (
                  <div className="text-center space-y-6">
                    <div className="w-80 h-80 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center">
                      <Play className="h-32 w-32 text-white/50" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Making Process</h3>
                      <p className="text-white/70">Watch how this masterpiece was created</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Panel */}
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                        onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                        onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                        onClick={resetView}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-white/70">
                      Zoom: {Math.round(zoom * 100)}%
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Info Sidebar */}
          <div className="w-80 p-6 border-l border-white/10 bg-gradient-to-b from-gray-900 to-black">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-purple-600 text-white">{product.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-white/70 text-sm mb-4">{product.description}</p>
                <div className="text-2xl font-bold text-purple-400">₹{product.price.toLocaleString()}</div>
              </div>

              {/* Artisan Info */}
              <div className="space-y-3">
                <h3 className="font-semibold">Artisan</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{product.artisan.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{product.artisan}</p>
                    <div className="flex items-center space-x-1 text-white/70 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Techniques & Materials */}
              <div className="space-y-3">
                <h3 className="font-semibold">Techniques</h3>
                <div className="flex flex-wrap gap-2">
                  {product.techniques?.map((technique: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-white/30 text-white/80">
                      {technique}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials?.map((material: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-white/30 text-white/80">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                  onClick={onViewStory}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Craft Story
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl"
                >
                  Contact Artisan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImmersiveProductDisplay;
