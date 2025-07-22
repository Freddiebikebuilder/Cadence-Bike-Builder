import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BikeFrame, BikePart, BikeConfig } from '@/data/bikes';

interface BikeContextType {
  config: BikeConfig;
  setFrame: (frame: BikeFrame) => void;
  setFrameColor: (color: string) => void;
  setPart: (category: string, part: BikePart | null) => void;
  resetConfig: () => void;
  getTotalPrice: () => number;
}

const BikeContext = createContext<BikeContextType | undefined>(undefined);

const initialConfig: BikeConfig = {
  frame: null,
  frameColor: '',
  parts: {
    fork: null,
    wheels: null,
    drivetrain: null,
    brakes: null,
    handlebars: null,
    stem: null,
    seatpost: null,
    saddle: null,
    grips: null,
    pedals: null,
    tires: null
  },
  totalPrice: 0
};

export const BikeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BikeConfig>(initialConfig);

  const setFrame = (frame: BikeFrame) => {
    setConfig(prev => ({
      ...prev,
      frame,
      frameColor: frame.colors[0] || '',
      // Reset parts when frame changes for compatibility
      parts: { ...initialConfig.parts }
    }));
  };

  const setFrameColor = (color: string) => {
    setConfig(prev => ({
      ...prev,
      frameColor: color
    }));
  };

  const setPart = (category: string, part: BikePart | null) => {
    setConfig(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [category]: part
      }
    }));
  };

  const resetConfig = () => {
    setConfig(initialConfig);
  };

  const getTotalPrice = () => {
    const framePrice = config.frame?.basePrice || 0;
    const partsPrice = Object.values(config.parts).reduce((total, part) => {
      return total + (part?.price || 0);
    }, 0);
    return framePrice + partsPrice;
  };

  return (
    <BikeContext.Provider
      value={{
        config,
        setFrame,
        setFrameColor,
        setPart,
        resetConfig,
        getTotalPrice
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export const useBike = () => {
  const context = useContext(BikeContext);
  if (context === undefined) {
    throw new Error('useBike must be used within a BikeProvider');
  }
  return context;
};