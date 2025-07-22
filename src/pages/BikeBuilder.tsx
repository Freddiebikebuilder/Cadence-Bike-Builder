import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Settings, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBike } from '@/contexts/BikeContext';
import { getCompatibleParts, bikeParts } from '@/data/bikes';

const BikeBuilder = () => {
  const { config, setFrameColor, setPart, getTotalPrice } = useBike();
  const navigate = useNavigate();
  const [activePartCategory, setActivePartCategory] = useState<string>('fork');

  if (!config.frame) {
    navigate('/');
    return null;
  }

  const partCategories = [
    { id: 'fork', name: 'Fork', icon: '🍴' },
    { id: 'wheels', name: 'Wheels', icon: '⚙️' },
    { id: 'drivetrain', name: 'Drivetrain', icon: '⛓️' },
    { id: 'brakes', name: 'Brakes', icon: '🛑' },
    { id: 'handlebars', name: 'Handlebars', icon: '🚴' },
    { id: 'saddle', name: 'Saddle', icon: '🪑' }
  ];

  const handlePartSelect = (category: string, part: any) => {
    setPart(category, part);
  };

  const handleColorChange = (color: string) => {
    setFrameColor(color);
  };

  const handleFinishBuild = () => {
    navigate('/summary');
  };

  const getColorStyle = (colorName: string) => {
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
      'lime-green': '#32cd32'
    };
    return { backgroundColor: colorMap[colorName] || '#6b7280' };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Frames
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{config.frame.name}</h1>
              <p className="text-muted-foreground">Build Configuration</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-2xl font-bold text-primary">£{getTotalPrice().toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual Builder - Left/Main Section */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Visual Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Frame Display */}
                <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-lg p-8 mb-6">
                  <div className="aspect-[4/3] flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <img
                        src={config.frame.image}
                        alt={config.frame.name}
                        className="w-full h-auto"
                        style={{
                          filter: `hue-rotate(${getHueRotation(config.frameColor)}deg)`
                        }}
                      />
                      {/* Part overlays would go here in a full implementation */}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="absolute top-4 right-4"
                  >
                    {config.frameColor.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>

                {/* Color Picker */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Frame Color
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {config.frame.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          config.frameColor === color
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                        style={getColorStyle(color)}
                        title={color.replace('-', ' ')}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parts Selection - Right Sidebar */}
          <div className="space-y-6">
            {/* Parts Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Parts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activePartCategory} onValueChange={setActivePartCategory}>
                  <TabsList className="grid grid-cols-3 w-full m-4 mb-0">
                    <TabsTrigger value="fork">Fork</TabsTrigger>
                    <TabsTrigger value="wheels">Wheels</TabsTrigger>
                    <TabsTrigger value="drivetrain">Drive</TabsTrigger>
                  </TabsList>
                  
                  {partCategories.slice(0, 3).map((category) => (
                    <TabsContent key={category.id} value={category.id} className="p-4 pt-4">
                      <div className="space-y-3">
                        {getCompatibleParts(config.frame, category.id).map((part) => (
                          <div
                            key={part.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              config.parts[category.id]?.id === part.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => handlePartSelect(category.id, part)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">{part.name}</h4>
                              <span className="text-sm font-bold text-primary">£{part.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Compatible with {part.compatibility.join(', ')}
                            </p>
                          </div>
                        ))}
                        
                        {getCompatibleParts(config.frame, category.id).length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No compatible {category.name.toLowerCase()} available
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Build Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Build Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{config.frame.name}</span>
                  <span>£{config.frame.basePrice}</span>
                </div>
                
                <Separator />
                
                {Object.entries(config.parts).map(([category, part]) => (
                  part && (
                    <div key={category} className="flex justify-between text-sm">
                      <span>{part.name}</span>
                      <span>£{part.price}</span>
                    </div>
                  )
                ))}
                
                <Separator />
                
                <div className="flex justify-between font-bold text-primary">
                  <span>Total</span>
                  <span>£{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <Button
                  variant="hero"
                  className="w-full mt-4"
                  onClick={handleFinishBuild}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Finish Build
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get hue rotation for color simulation
const getHueRotation = (colorName: string): number => {
  const rotationMap: Record<string, number> = {
    'electric-blue': 220,
    'forest-green': 120,
    'burnt-orange': 25,
    'red': 0,
    'blue': 220,
    'sky-blue': 200,
    'lime-green': 90,
    'neon-yellow': 60,
    'midnight-blue': 240,
    'electric-red': 350
  };
  return rotationMap[colorName] || 0;
};

export default BikeBuilder;
