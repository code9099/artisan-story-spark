import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  BookOpen,
  Sparkles,
  Globe,
  Clock,
  MapPin,
  Heart,
  Share2,
  Download,
  Languages,
  Star
} from "lucide-react";
import { aiGenerator } from "@/lib/ai";

interface CraftStoryProps {
  product: any;
  onBack: () => void;
}

const CraftStory = ({ product, onBack }: CraftStoryProps) => {
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [marketingContent, setMarketingContent] = useState<any>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' }
  ];

  useEffect(() => {
    generateStory();
    generateMarketingContent();
  }, [product]);

  const generateStory = async () => {
    setIsLoading(true);
    try {
      const generatedStory = await aiGenerator.generateCraftStory(
        { name: product.artisan, location: product.location },
        { name: product.name, category: product.category }
      );
      setStory(generatedStory);
    } catch (error) {
      setStory(`In the heart of ${product.location}, master artisan ${product.artisan} creates extraordinary ${product.category.toLowerCase()} pieces that tell stories of tradition, culture, and unparalleled craftsmanship. Each piece is a testament to years of dedication and the preservation of ancient techniques passed down through generations.`);
    }
    setIsLoading(false);
  };

  const generateMarketingContent = async () => {
    try {
      const content = await aiGenerator.generateMarketingContent({
        name: product.name,
        artisan: product.artisan,
        category: product.category
      });
      setMarketingContent(content);
    } catch (error) {
      setMarketingContent({
        hashtags: ['#handmade', '#artisan', '#craft', '#traditional'],
        description: 'Beautiful handcrafted item with rich cultural heritage',
        songSuggestion: 'Traditional folk music'
      });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would control audio playback
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    // In real app, this would translate the story
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
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
      </div>

      <div className="px-4 pb-20">
        {/* Story Header */}
        <Card className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <div className="flex items-start space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-xl object-cover shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-purple-600 text-white">Craft Story</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white/80 text-sm">{product.rating}</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">{product.name}</h1>
              <p className="text-white/70">by {product.artisan} • {product.location}</p>
            </div>
          </div>
        </Card>

        {/* Language Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Globe className="h-5 w-5 text-white/80" />
            <span className="text-white/80 font-medium">Language</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                className={`rounded-full ${
                  currentLanguage === lang.code 
                    ? 'bg-purple-600 text-white' 
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Story Content */}
        <Card className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">The Story</h2>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-1/2"></div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 leading-relaxed text-lg">
                {story}
              </p>
            </div>
          )}
        </Card>

        {/* Cultural Context */}
        <Card className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Cultural Heritage</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-white/60" />
                <span className="text-white/80 text-sm">Origin</span>
              </div>
              <p className="text-white font-medium">{product.location}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-white/60" />
                <span className="text-white/80 text-sm">Tradition</span>
              </div>
              <p className="text-white font-medium">500+ years</p>
            </div>
          </div>
        </Card>

        {/* Marketing Content */}
        {marketingContent && (
          <Card className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-5 w-5 text-pink-400" />
              <h2 className="text-xl font-bold text-white">Share This Story</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-white/80 font-medium mb-2">Description</h3>
                <p className="text-white/90 text-sm bg-white/5 p-3 rounded-xl">
                  {marketingContent.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-white/80 font-medium mb-2">Hashtags</h3>
                <div className="flex flex-wrap gap-2">
                  {marketingContent.hashtags.map((hashtag: string, index: number) => (
                    <Badge key={index} className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white/80 font-medium mb-2">Suggested Music</h3>
                <p className="text-white/90 text-sm bg-white/5 p-3 rounded-xl">
                  🎵 {marketingContent.songSuggestion}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Story
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Related Stories */}
        <Card className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">More Stories</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">Related Craft Story {i}</h3>
                  <p className="text-white/60 text-sm">Discover more cultural heritage</p>
                </div>
                <ArrowLeft className="h-4 w-4 text-white/40 rotate-180" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CraftStory;
