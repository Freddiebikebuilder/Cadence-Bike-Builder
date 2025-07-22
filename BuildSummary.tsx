import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBike } from '@/contexts/BikeContext';

const BuildSummary = () => {
  const { config, getTotalPrice, resetConfig } = useBike();
  const navigate = useNavigate();

  if (!config.frame) {
    navigate('/');
    return null;
  }

  const handleBackToBuild = () => {
    navigate('/build');
  };

  const handleStartOver = () => {
    resetConfig();
    navigate('/');
  };

  const handleDownloadBuild = () => {
    // Create CSV content
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${config.frame.name.replace(/\s+/g, '_')}_build.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = () => {
    let csv = 'Component,Name,Price,Marketplace Links\n';
    csv += `Frame,${config.frame?.name},£${config.frame?.basePrice},\n`;
    
    Object.entries(config.parts).forEach(([category, part]) => {
      if (part) {
        const links = part.marketplaceLinks.map(link => `${link.name}: ${link.url}`).join(' | ');
        csv += `${category.charAt(0).toUpperCase() + category.slice(1)},${part.name},£${part.price},"${links}"\n`;
      }
    });
    
    csv += `Total,,£${getTotalPrice()},\n`;
    return csv;
  };

  const selectedParts = Object.entries(config.parts).filter(([_, part]) => part !== null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToBuild}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Builder
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Build Complete!</h1>
              <p className="text-muted-foreground">{config.frame.name} Configuration</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDownloadBuild}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="secondary" onClick={handleStartOver}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Landscape Bike View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Custom Mountain Bike</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg p-8">
                  <div className="aspect-[16/9] flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                      <img
                        src={config.frame.image}
                        alt={`${config.frame.name} in ${config.frameColor}`}
                        className="w-full h-auto"
                        style={{
                          filter: `hue-rotate(${getHueRotation(config.frameColor)}deg)`
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge variant="secondary">
                      {config.frame.category}
                    </Badge>
                    <Badge variant="outline">
                      {config.frameColor.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold text-primary">
                        £{getTotalPrice().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Frame Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Frame Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Material & Category</p>
                    <p className="font-medium">{config.frame.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wheel Size</p>
                    <p className="font-medium">{config.frame.compatibility.wheelSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fork Compatibility</p>
                    <p className="font-medium">{config.frame.compatibility.forkType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Brake Type</p>
                    <p className="font-medium">{config.frame.compatibility.brakeType}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">{config.frame.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Parts Table & Purchase Links */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Frame</span>
                    <span>£{config.frame.basePrice}</span>
                  </div>
                  
                  {selectedParts.length > 0 && (
                    <>
                      <Separator />
                      {selectedParts.map(([category, part]) => (
                        <div key={category} className="flex justify-between items-center text-sm">
                          <span>{part!.name}</span>
                          <span>£{part!.price}</span>
                        </div>
                      ))}
                    </>
                  )}
                  
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-lg text-primary">
                    <span>Total</span>
                    <span>£{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parts List */}
            {selectedParts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Components</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedParts.map(([category, part]) => (
                        <TableRow key={category}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{part!.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {category}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">£{part!.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Purchase Links */}
            <Card>
              <CardHeader>
                <CardTitle>Where to Buy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getUniqueMarketplaces().map((marketplace) => (
                  <Button
                    key={marketplace.name}
                    variant="outline"
                    className="w-full justify-between"
                    asChild
                  >
                    <a href={marketplace.url} target="_blank" rel="noopener noreferrer">
                      {marketplace.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
                <p className="text-xs text-muted-foreground mt-4">
                  Links will open in a new tab. Prices may vary by retailer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  function getUniqueMarketplaces() {
    const marketplaces = new Map();
    
    selectedParts.forEach(([_, part]) => {
      part!.marketplaceLinks.forEach(link => {
        marketplaces.set(link.name, link);
      });
    });
    
    // Add default marketplaces if none found
    if (marketplaces.size === 0) {
      marketplaces.set('Chain Reaction Cycles', { name: 'Chain Reaction Cycles', url: 'https://chainreactioncycles.com' });
      marketplaces.set('Wiggle', { name: 'Wiggle', url: 'https://wiggle.com' });
    }
    
    return Array.from(marketplaces.values());
  }
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

export default BuildSummary;