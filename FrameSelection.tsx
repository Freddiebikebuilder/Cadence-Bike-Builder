import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mountain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bikeFrames } from '@/data/bikes';
import { useBike } from '@/contexts/BikeContext';
import heroImage from '@/assets/hero-bike.jpg';

const FrameSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setFrame } = useBike();
  const navigate = useNavigate();

  const filteredFrames = bikeFrames.filter(frame =>
    frame.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    frame.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFrameSelect = (frame: typeof bikeFrames[0]) => {
    setFrame(frame);
    navigate('/build');
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'e-bike':
        return <Zap className="w-4 h-4" />;
      default:
        return <Mountain className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary via-primary-glow to-accent overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-5xl font-bold mb-4">
              Build Your Dream Mountain Bike
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Start by selecting the perfect frame for your riding style. 
              Then customize every component to create your ultimate ride.
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                8 Frame Options
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Visual Builder
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search frames by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Frame Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFrames.map((frame) => (
            <Card 
              key={frame.id} 
              className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => handleFrameSelect(frame)}
            >
              <CardHeader className="p-4">
                <div className="aspect-[4/3] bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={frame.image}
                    alt={frame.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getCategoryIcon(frame.category)}
                    {frame.category}
                  </Badge>
                  <span className="font-bold text-primary">£{frame.basePrice}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardTitle className="text-lg mb-2">{frame.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {frame.description}
                </p>
                <div className="flex gap-2 mb-4">
                  {frame.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: getColorHex(color) }}
                    />
                  ))}
                  {frame.colors.length > 3 && (
                    <div className="w-6 h-6 rounded-full border-2 border-border bg-muted flex items-center justify-center text-xs">
                      +{frame.colors.length - 3}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="frame" className="w-full" size="sm">
                  Select Frame
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredFrames.length === 0 && (
          <div className="text-center py-12">
            <Mountain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No frames found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms to find the perfect frame.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to convert color names to hex values
const getColorHex = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'matte-black': '#2c2c2c',
    'electric-blue': '#0066ff',
    'forest-green': '#228b22',
    'burnt-orange': '#cc5500',
    'silver': '#c0c0c0',
    'red': '#dc2626',
    'blue': '#2563eb',
    'black': '#000000',
    'stealth-black': '#1a1a1a',
    'sky-blue': '#87ceeb',
    'lime-green': '#32cd32',
    'raw-steel': '#71797e',
    'powder-blue': '#b0e0e6',
    'neon-yellow': '#ffff00',
    'titanium': '#878681',
    'midnight-blue': '#191970',
    'copper': '#b87333',
    'arctic-white': '#f8f8ff',
    'sunset-orange': '#ff8c00',
    'deep-purple': '#4b0082',
    'carbon-weave': '#36454f',
    'electric-red': '#ff073a',
    'forest-camo': '#355e3b',
    'charcoal': '#36454f',
    'olive-green': '#556b2f'
  };
  
  return colorMap[colorName] || '#6b7280';
};

export default FrameSelection;