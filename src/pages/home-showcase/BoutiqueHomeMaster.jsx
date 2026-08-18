import React, { useState } from 'react';
import { HomePage as ClassicHome } from '../HomePage';
import { EditorialMagazineHome } from './EditorialMagazineHome';
import { DarkGlamourLuxeHome } from './DarkGlamourLuxeHome';
import { ArtisanalHeritageHome } from './ArtisanalHeritageHome';
import { Sparkles, Palette, Layers, Moon, Sun, BookOpen, Feather } from 'lucide-react';

export const BoutiqueHomeMaster = () => {
  const [currentStyle, setCurrentStyle] = useState(() => {
    return localStorage.getItem('aura_home_style') || 'classic';
  });

  const changeStyle = (styleKey) => {
    setCurrentStyle(styleKey);
    localStorage.setItem('aura_home_style', styleKey);
  };

  const styleOptions = [
    { id: 'classic', label: 'Classic Minimalist', icon: Sun, desc: 'Clean, elegant, lots of whitespace' },
    { id: 'editorial', label: 'Editorial Magazine', icon: BookOpen, desc: 'High-fashion magazine lookbook' },
    { id: 'dark', label: 'Dark Glamour', icon: Moon, desc: 'Night boutique obsidian theme' },
    { id: 'heritage', label: 'Artisanal Heritage', icon: Feather, desc: 'Craftsmanship & material spotlight' },
  ];

  const renderActiveStyle = () => {
    switch (currentStyle) {
      case 'classic':
        return <ClassicHome />;
      case 'editorial':
        return <EditorialMagazineHome />;
      case 'dark':
        return <DarkGlamourLuxeHome />;
      case 'heritage':
        return <ArtisanalHeritageHome />;
      default:
        return <ClassicHome />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* FLOATING HOME DESIGN STYLE SWITCHER BAR */}
      <div className="sticky top-20 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white/90 backdrop-blur-xl border border-brand-200/80 p-2.5 rounded-2xl shadow-floating flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 px-2 text-noir-900 font-serif text-sm font-semibold">
            <Palette className="w-4 h-4 text-brand-600 animate-pulse-subtle" />
            <span>Select Home Page Style:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {styleOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = currentStyle === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => changeStyle(opt.id)}
                  title={opt.desc}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-noir-900 text-white shadow-md scale-[1.02]'
                      : 'bg-brand-50 hover:bg-brand-100 text-noir-800 border border-brand-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-400' : 'text-brand-600'}`} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* RENDER SELECTED HOME PAGE STYLE */}
      <div>
        {renderActiveStyle()}
      </div>

    </div>
  );
};
