import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Download, ShoppingBag, Layers, Sparkles, Check, ChevronRight } from 'lucide-react';
import { formatPrice } from '../data/mockData';

export const Kitchen3DViewer = () => {
  const { products, activeSurfaces, setSurfaceMaterial, addToCart, language, t, showToast } = useShop();
  const isAr = language === 'ar';

  const [activeSurfaceType, setActiveSurfaceType] = useState('countertop'); // 'countertop' | 'cabinet' | 'backsplash'
  const [rotationX, setRotationX] = useState(15);
  const [rotationY, setRotationY] = useState(-25);
  const [zoom, setZoom] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  // Active Selected Products
  const activeCountertop = products.find(p => p.id === activeSurfaces.countertop) || products[0];
  const activeCabinet = products.find(p => p.id === activeSurfaces.cabinet) || products[3];
  const activeBacksplash = products.find(p => p.id === activeSurfaces.backsplash) || products[6];

  // Surface Filtered Materials
  const compatibleMaterials = products.filter(p => {
    if (activeSurfaceType === 'countertop') return p.category === 'Countertops' || p.surfaceType === 'countertop';
    if (activeSurfaceType === 'cabinet') return p.category === 'Cabinets & Units' || p.surfaceType === 'cabinet';
    if (activeSurfaceType === 'backsplash') return p.category === 'Tiles & Backsplash' || p.surfaceType === 'backsplash';
    return false;
  });

  // Render 3D Perspective Kitchen Scene onto Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = canvas.parentElement.clientWidth || 800;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient (Architectural Studio Lighting)
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.2);
    bgGrad.addColorStop(0, '#2C2B29');
    bgGrad.addColorStop(1, '#121110');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2 + 30);
    ctx.scale(zoom, zoom);

    // Dynamic Iso Angles
    const radY = (rotationY * Math.PI) / 180;
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    // Helper 3D Projection
    const project = (x, y, z) => {
      // Rotate around Y axis
      const rx = x * cosY - z * sinY;
      const rz = x * sinY + z * cosY;
      // Tilt with rotationX
      const radX = (rotationX * Math.PI) / 180;
      const ry = y * Math.cos(radX) - rz * Math.sin(radX);
      const depth = 600 / (600 + (y * Math.sin(radX) + rz * Math.cos(radX)));
      return {
        px: rx * depth,
        py: ry * depth,
        depth: rz
      };
    };

    // ── 1. Render Backsplash Wall (Back Wall) ──
    const wallColor = activeBacksplash?.colorHex || '#F2EFE9';
    ctx.save();
    const w1 = project(-220, -180, -100);
    const w2 = project(220, -180, -100);
    const w3 = project(220, 30, -100);
    const w4 = project(-220, 30, -100);

    ctx.beginPath();
    ctx.moveTo(w1.px, w1.py);
    ctx.lineTo(w2.px, w2.py);
    ctx.lineTo(w3.px, w3.py);
    ctx.lineTo(w4.px, w4.py);
    ctx.closePath();

    // Tile pattern / shading
    ctx.fillStyle = wallColor;
    ctx.fill();

    // Grid lines for tiles
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Highlight if active
    if (activeSurfaceType === 'backsplash') {
      ctx.strokeStyle = '#C5A059';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();

    // ── 2. Upper Wall Cabinets (Hanging Units) ──
    const upperCabinetColor = activeCabinet?.colorHex || '#FFFFFF';
    ctx.save();
    const u1 = project(-200, -170, -70);
    const u2 = project(200, -170, -70);
    const u3 = project(200, -60, -70);
    const u4 = project(-200, -60, -70);

    ctx.beginPath();
    ctx.moveTo(u1.px, u1.py);
    ctx.lineTo(u2.px, u2.py);
    ctx.lineTo(u3.px, u3.py);
    ctx.lineTo(u4.px, u4.py);
    ctx.closePath();
    ctx.fillStyle = upperCabinetColor;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Under-cabinet warm LED glow bar
    const led1 = project(-190, -58, -75);
    const led2 = project(190, -58, -75);
    ctx.beginPath();
    ctx.moveTo(led1.px, led1.py);
    ctx.lineTo(led2.px, led2.py);
    ctx.strokeStyle = '#FFE5A3';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#FFE5A3';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    // ── 3. Base Cabinets (Lower Units) ──
    ctx.save();
    const bFront1 = project(-200, 45, 80);
    const bFront2 = project(200, 45, 80);
    const bFront3 = project(200, 150, 80);
    const bFront4 = project(-200, 150, 80);

    ctx.beginPath();
    ctx.moveTo(bFront1.px, bFront1.py);
    ctx.lineTo(bFront2.px, bFront2.py);
    ctx.lineTo(bFront3.px, bFront3.py);
    ctx.lineTo(bFront4.px, bFront4.py);
    ctx.closePath();

    ctx.fillStyle = activeCabinet?.colorHex || '#3A3B3C';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cabinet door vertical divisions
    [-66, 66].forEach(splitX => {
      const sp1 = project(splitX, 45, 80);
      const sp2 = project(splitX, 150, 80);
      ctx.beginPath();
      ctx.moveTo(sp1.px, sp1.py);
      ctx.lineTo(sp2.px, sp2.py);
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Cabinet Handles
    [-130, 0, 130].forEach(hx => {
      const hp1 = project(hx, 60, 85);
      const hp2 = project(hx + 30, 60, 85);
      ctx.beginPath();
      ctx.moveTo(hp1.px, hp1.py);
      ctx.lineTo(hp2.px, hp2.py);
      ctx.strokeStyle = '#C5A059'; // Gold handles
      ctx.lineWidth = 3;
      ctx.stroke();
    });

    if (activeSurfaceType === 'cabinet') {
      ctx.strokeStyle = '#C5A059';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();

    // ── 4. Countertop Slab (Top & Front Edge) ──
    const countertopColor = activeCountertop?.colorHex || '#121217';
    ctx.save();
    
    // Top Slab Face
    const c1 = project(-210, 30, -90);
    const c2 = project(210, 30, -90);
    const c3 = project(210, 30, 95);
    const c4 = project(-210, 30, 95);

    ctx.beginPath();
    ctx.moveTo(c1.px, c1.py);
    ctx.lineTo(c2.px, c2.py);
    ctx.lineTo(c3.px, c3.py);
    ctx.lineTo(c4.px, c4.py);
    ctx.closePath();

    // Slab Reflection Gradient
    const slabGrad = ctx.createLinearGradient(c1.px, c1.py, c3.px, c3.py);
    slabGrad.addColorStop(0, countertopColor);
    slabGrad.addColorStop(0.5, lightenColor(countertopColor, 20));
    slabGrad.addColorStop(1, countertopColor);
    ctx.fillStyle = slabGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Front Edge Thickness (3cm chamfer)
    const ce1 = project(-210, 30, 95);
    const ce2 = project(210, 30, 95);
    const ce3 = project(210, 45, 95);
    const ce4 = project(-210, 45, 95);

    ctx.beginPath();
    ctx.moveTo(ce1.px, ce1.py);
    ctx.lineTo(ce2.px, ce2.py);
    ctx.lineTo(ce3.px, ce3.py);
    ctx.lineTo(ce4.px, ce4.py);
    ctx.closePath();
    ctx.fillStyle = darkenColor(countertopColor, 25);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.stroke();

    // Built-in Undermount Sink representation
    const s1 = project(50, 30, -20);
    const s2 = project(150, 30, -20);
    const s3 = project(150, 30, 50);
    const s4 = project(50, 30, 50);
    ctx.beginPath();
    ctx.moveTo(s1.px, s1.py);
    ctx.lineTo(s2.px, s2.py);
    ctx.lineTo(s3.px, s3.py);
    ctx.lineTo(s4.px, s4.py);
    ctx.closePath();
    ctx.fillStyle = '#444446';
    ctx.fill();
    ctx.strokeStyle = '#88888A';
    ctx.stroke();

    if (activeSurfaceType === 'countertop') {
      ctx.strokeStyle = '#C5A059';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();

    ctx.restore(); // Restore global translation
  }, [rotationX, rotationY, zoom, activeSurfaces, activeSurfaceType, language]);

  // Color Shading Helpers
  function lightenColor(col, amt) {
    if (!col || col[0] !== '#') return '#666';
    let num = parseInt(col.slice(1), 16);
    if (isNaN(num)) return '#666';
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0x00FF) + amt;
    let b = (num & 0x0000FF) + amt;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }

  function darkenColor(col, amt) {
    return lightenColor(col, -amt);
  }

  // Mouse / Touch Orbit Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotationY(prev => prev + dx * 0.5);
    setRotationX(prev => Math.max(5, Math.min(45, prev + dy * 0.3)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSaveRender = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Aura-Kitchen-3D-Render-${Date.now()}.png`;
    link.href = image;
    link.click();
    showToast(isAr ? 'تم حفظ صورة التصميم 3D بنجاح!' : 'Render image downloaded!', 'success');
  };

  return (
    <div className="bg-brand-50 text-noir-900 p-6 md:p-10 max-w-6xl mx-auto rounded-3xl border border-brand-200 shadow-xl space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            {isAr ? 'استوديو المعاينة التفاعلي 3D' : 'Interactive 3D Material Studio'}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-noir-900">{t('studioTitle')}</h2>
          <p className="text-xs md:text-sm text-noir-600 mt-1">{t('studioSubtitle')}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setRotationX(15); setRotationY(-25); setZoom(1.0); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-200 hover:bg-brand-300 text-noir-800 text-xs font-semibold transition-colors"
          >
            <RotateCw size={14} />
            {t('resetView')}
          </button>
          <button
            onClick={handleSaveRender}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-gold text-noir-950 text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
          >
            <Download size={14} />
            {t('takeScreenshot')}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas & Surface Controller Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 3D Canvas Viewport (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-300 bg-noir-950 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} className="w-full block" />

            {/* Orbit Helper Pill */}
            <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1.5 rounded-xl bg-noir-900/80 backdrop-blur-md text-brand-100 text-[11px] font-sans border border-brand-500/30 flex items-center gap-2 pointer-events-none">
              <span>🖱️</span>
              <span>{t('rotatePrompt')}</span>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex flex-col gap-1.5 bg-noir-900/80 backdrop-blur-md p-1.5 rounded-xl border border-brand-500/30">
              <button 
                onClick={() => setZoom(prev => Math.min(1.4, prev + 0.1))} 
                className="p-2 text-brand-100 hover:text-accent-gold hover:bg-noir-800 rounded-lg transition-colors"
              >
                <ZoomIn size={16} />
              </button>
              <button 
                onClick={() => setZoom(prev => Math.max(0.7, prev - 0.1))} 
                className="p-2 text-brand-100 hover:text-accent-gold hover:bg-noir-800 rounded-lg transition-colors"
              >
                <ZoomOut size={16} />
              </button>
            </div>
          </div>

          {/* Surface Switcher Pills */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { type: 'countertop', label: t('surfaceCountertop'), activeObj: activeCountertop, icon: '🪨' },
              { type: 'cabinet', label: t('surfaceCabinet'), activeObj: activeCabinet, icon: '🗄️' },
              { type: 'backsplash', label: t('surfaceBacksplash'), activeObj: activeBacksplash, icon: '🧱' },
            ].map(item => (
              <button
                key={item.type}
                onClick={() => setActiveSurfaceType(item.type)}
                className={`p-3 rounded-2xl border text-left rtl:text-right transition-all ${
                  activeSurfaceType === item.type
                    ? 'bg-accent-gold/20 border-accent-gold shadow-md'
                    : 'bg-brand-100/50 border-brand-200 hover:bg-brand-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-noir-900">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-noir-600 line-clamp-1">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0 border border-noir-400" 
                    style={{ backgroundColor: item.activeObj?.colorHex || '#333' }}
                  />
                  <span>{isAr ? (item.activeObj?.nameAr || item.activeObj?.name) : item.activeObj?.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Material Palette Selector Panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          <div className="p-5 rounded-3xl bg-brand-100/60 border border-brand-200 flex-1 flex flex-col space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-200 pb-3">
              <h3 className="font-serif font-bold text-sm text-noir-900 flex items-center gap-2">
                <Layers size={16} className="text-accent-gold" />
                {t('availableMaterials')}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-md bg-brand-200 font-mono font-bold">
                {compatibleMaterials.length}
              </span>
            </div>

            {/* Material Swatch List */}
            <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
              {compatibleMaterials.map(mat => {
                const isSelected = activeSurfaces[activeSurfaceType] === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setSurfaceMaterial(activeSurfaceType, mat.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-accent-gold/25 border-accent-gold shadow-md'
                        : 'bg-brand-50 border-brand-200 hover:bg-brand-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={mat.image}
                        alt={mat.name}
                        className="w-12 h-12 rounded-xl object-cover border border-brand-200 shadow-sm shrink-0"
                      />
                      <div>
                        <p className="font-bold text-xs text-noir-900 line-clamp-1">
                          {isAr ? (mat.nameAr || mat.name) : mat.name}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-noir-600 mt-0.5">
                          <span className="font-bold text-accent-gold font-mono">{formatPrice(mat.price, language)}</span>
                          <span>•</span>
                          <span>{mat.thickness || mat.finish}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="w-7 h-7 rounded-full bg-accent-gold text-noir-950 flex items-center justify-center shadow-sm">
                          <Check size={14} className="stroke-[3]" />
                        </span>
                      ) : (
                        <span className="w-7 h-7 rounded-full border border-brand-300 flex items-center justify-center text-noir-400 hover:text-noir-900 hover:border-accent-gold">
                          <ChevronRight size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Material Summary & Add to Cart */}
            <div className="pt-3 border-t border-brand-200 space-y-2">
              <button
                onClick={() => {
                  const activeMat = products.find(p => p.id === activeSurfaces[activeSurfaceType]);
                  if (activeMat) {
                    addToCart(activeMat, 1, `Selected from 3D Studio (${activeSurfaceType})`);
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-noir-900 text-brand-50 text-xs font-bold hover:bg-noir-800 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} className="text-accent-gold" />
                {t('addToCartFrom3D')}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
