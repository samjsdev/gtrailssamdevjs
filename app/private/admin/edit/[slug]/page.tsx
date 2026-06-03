'use client';

import { useEffect, useState, use } from 'react';

import { 
  Loader2, Settings2, Trash2, Star, Plus, Check, ChevronDown, ChevronUp,
  Image as ImageIcon, Layout, FileText, CheckCircle2, Eye, Globe, Palette,
  Sparkles, Layers, User, Phone, MapPin, Upload, RotateCcw, ArrowDown, ArrowUp,
  X, Search
} from 'lucide-react';

const TEMPLATE_OPTIONS = [
  { id: 'base', name: 'Base Defaults (Global fallback for all templates)' },
  { id: 'template1', name: 'Template 1 (Bespoke Editorial theme layout)' },
  { id: 'template2', name: 'Template 2 (Garamond Luxe theme layout)' },
  { id: 'template3', name: 'Template 3 (Reference theme layout)' },
  { id: 'template4', name: 'Template 4 (Minimal Creative theme layout)' },
  { id: 'template6', name: 'Template 6 (Glassmorphism Flow layout)' },
  { id: 'template10', name: 'Template 10 (Raw Industrial theme layout)' }
];

import { TEMPLATE_SCHEMAS, SHARED_PAGES } from './schemas';

type SchemaPage = typeof SHARED_PAGES[number];
type SchemaSection = SchemaPage['sections'][number];
type SchemaElement = SchemaSection['elements'][number];
type MediaArrayKey = 'clinicImages' | 'treatmentImages' | 'otherImages';

type CanvasSelection = {
  sectionIndex: number;
  elementIndex: number;
};

// Curated stock library representing premium interior aesthetics
const PREMIUM_STOCK_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1200',
    label: 'Modern Cozy Living Room'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    label: 'Warm Scandi Kitchen & Dining'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
    label: 'Luxury Marble Kitchen'
  },
  {
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
    label: 'Serene Modern Bedroom'
  },
  {
    url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200',
    label: 'Professional Architect Studio'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    label: 'Modern Wooden Ceiling Detail'
  },
  {
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200',
    label: 'Rustic Industrial Workspace'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    label: 'Minimalist Hallway Corridor'
  }
];

// Curated stock images mapped to specific template layouts
const TEMPLATE_STOCK_IMAGES: Record<string, { url: string; label: string }[]> = {
  template1: [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', label: 'Modern Architectural Studio' },
    { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', label: 'Lead Portrait' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', label: 'Associate Portrait' },
    { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800', label: 'Cozy Dining & Kitchen' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', label: 'Warm Living Room' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', label: 'Minimalist Bed' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', label: 'Marble Kitchen Counter' },
    { url: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=800&q=80', label: 'Architect Drafting Desk' },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', label: 'Living Room Corner' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', label: 'Light Cozy Bedroom' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', label: 'Modern Office Space' },
    { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', label: 'Study Table & Chair' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', label: 'Open Concrete Architecture' },
    { url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', label: 'Bespoke Lounge Chair' },
    { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', label: 'Minimalist Dining Set' },
    { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', label: 'Bright Office Corridor' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', label: 'Boutique Storefront' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', label: 'Collaborative Workspace' }
  ],
  template2: [
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600', label: 'Warm Ceiling Detail' },
    { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600', label: 'Cozy Armchair Corner' },
    { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600', label: 'Warm Wood Kitchen' },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', label: 'Living Room Shelf' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', label: 'Luxury Living Space' },
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400', label: 'Minimal Lounge Room' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400', label: 'Corporate Office Area' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400', label: 'Living Room Sofa' },
    { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400', label: 'Desk Setup' },
    { url: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=400&q=80', label: 'Architect Workspace' },
    { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', label: 'Principal Portrait' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', label: 'Associate Portrait' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', label: 'Comfortable Bedroom' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800', label: 'Scandi Living Room' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', label: 'Commercial Interior' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', label: 'Meeting Room Setup' }
  ],
  template3: [
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', label: 'Minimalist Lounge' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400', label: 'Corporate Office' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400', label: 'Modern Living Area' },
    { url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=400', label: 'Designer Armchair' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400', label: 'Concrete Design Detail' },
    { url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=400', label: 'Creative Meeting' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Architectural Salon' },
    { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', label: 'Principal Portrait' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', label: 'Associate Portrait' },
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', label: 'Wooden Ceiling' },
    { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600', label: 'Armchair Corner' },
    { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600', label: 'Wooden Theme Kitchen' },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', label: 'Living Room Shelf' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', label: 'Serene Bedroom' },
    { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', label: 'Clean Dining Layout' },
    { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', label: 'Bright Studio Office' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800', label: 'Living Room Cozy Desk' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', label: 'Commercial Interior' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800', label: 'Group Workshop' }
  ],
  template4: [
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', label: 'Minimalist Lounge' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', label: 'Cozy Bedroom' },
    { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', label: 'Dining Area Set' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', label: 'Commercial Space' },
    { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', label: 'Light Office Space' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', label: 'Minimalist Living Room' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', label: 'Boutique Store' },
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', label: 'Warm Wood Ceiling' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', label: 'Meeting Room Setup' }
  ],
  template6: [
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600', label: 'Residential Design Lounge' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600', label: 'Commercial Meeting Area' },
    { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600', label: 'Space Planning Lounge' },
    { url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600', label: 'Custom Chair Design' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600', label: 'Renovation Architecture' },
    { url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=600', label: 'Project Management Team' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Living Room Hero' },
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', label: 'Wooden Ceilings' },
    { url: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=600&q=80', label: 'Studio Drafting Setup' },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', label: 'Living Room Shelf Corner' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', label: 'Bright Cozy Bedroom' },
    { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', label: 'Study Table & Plant' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', label: 'Master Bedroom Bed' },
    { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', label: 'Modern Dining Room Set' },
    { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', label: 'Architect Office Corridor' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', label: 'Cosy Seat Layout' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', label: 'Boutique Store Area' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', label: 'Active Team Studio' },
    { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', label: 'Lead Portrait' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', label: 'Associate Portrait' }
  ],
  template10: [
    { url: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=600&q=80', label: 'Studio Drafting Desk' },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', label: 'Living Room Shelf Corner' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', label: 'Bright Cozy Bedroom' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', label: 'Modern Office Room' },
    { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', label: 'Study Table & Desk Setup' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', label: 'Open Concrete Architecture' },
    { url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80', label: 'Bespoke Chair Curation' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', label: 'Serene Modern Bed' },
    { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', label: 'Dining Area Setup' },
    { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', label: 'Office Bright Corridor' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80', label: 'Cosy Seating Corner' },
    { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', label: 'Boutique Store Area' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', label: 'Collaborative Workspace' },
    { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', label: 'Principal Portrait' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', label: 'Associate Portrait' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', label: 'Living Room Hero' }
  ]
};

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // UI Control State
  const [globalTab, setGlobalTab] = useState<'info' | 'designer' | 'reviews' | 'media'>('info');
  const [canvasScope, setCanvasScope] = useState('template1');
  const [canvasPageId, setCanvasPageId] = useState('home');
  const [canvasSelection, setCanvasSelection] = useState<CanvasSelection>({
    sectionIndex: 0,
    elementIndex: 0
  });

  // Drag and drop image swap state
  const [draggedImage, setDraggedImage] = useState<{
    arrayKey: MediaArrayKey;
    index: number;
    sectionIndex: number;
    elementIndex: number;
  } | null>(null);
  const [dragOverCard, setDragOverCard] = useState<string | null>(null);

  // State to track image selection popup modal config
  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    scope: string;
    arrayKey: MediaArrayKey;
    index: number;
    label: string;
  } | null>(null);

  const [modalTab, setModalTab] = useState<'favorites' | 'business' | 'template' | 'curated' | 'upload'>('business');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gtrails_favorite_images');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const toggleFavorite = (url: string) => {
    setFavorites(prev => {
      const next = prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url];
      try {
        localStorage.setItem('gtrails_favorite_images', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleUploadImageFromModal = (file: File) => {
    if (!imageModal || !file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, String(reader.result || ''));
      setImageModal(null);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/data?slug=${slug}`);
        if (!res.ok) throw new Error('Failed to load data');
        const json = await res.json();
        setData({
          ...json,
          reviews: Array.isArray(json?.reviews) ? json.reviews : [],
          templateOverrides: json?.templateOverrides || {}
        });
        if (json?.selected_template) {
          setCanvasScope(json.selected_template);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const saveSourceData = async () => {
    if (!data) throw new Error('No data available to save');

    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, sourceData: data })
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result?.error || 'Failed to save data');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaveMessage('');

    try {
      await saveSourceData();
      setSaveMessage('Changes saved successfully.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Scoped Overrides Helpers
  const getOverrideValueRaw = (scope: string, path: string[]) => {
    if (!data) return '';
    let current = scope === 'base' ? data : data.templateOverrides?.[scope];
    for (const p of path) {
      current = current?.[p];
    }
    return current ?? '';
  };

  const handleOverrideChange = (scope: string, path: string[], value: any) => {
    setData((prev: any) => {
      if (scope === 'base') {
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
          current[path[i]] = { ...current[path[i]] };
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        return newData;
      } else {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[scope] || {};
        const newTemplateData = { ...templateData };
        let current = newTemplateData;
        for (let i = 0; i < path.length - 1; i++) {
          current[path[i]] = { ...current[path[i]] };
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [scope]: newTemplateData
          }
        };
      }
    });
  };

  const getArrayString = (scope: string, path: string[]) => {
    const val = getOverrideValueRaw(scope, path);
    if (Array.isArray(val)) return val.join('\n');
    return '';
  };

  const handleArrayStringChange = (scope: string, path: string[], value: string) => {
    const arr = value.split('\n');
    handleOverrideChange(scope, path, arr);
  };

  // Review overrides
  const getReviewList = (scope: string) => {
    if (!data) return [];
    if (scope !== 'base') {
      const templateOverride = data.templateOverrides?.[scope];
      if (templateOverride?.reviews !== undefined) {
        return templateOverride.reviews;
      }
    }
    return data.reviews || [];
  };

  const getReviewValue = (scope: string, index: number, field: string) => {
    if (!data) return '';
    if (scope !== 'base') {
      const templateOverride = data.templateOverrides?.[scope];
      const val = templateOverride?.reviews?.[index]?.[field];
      if (val !== undefined) return val;
    }
    return data.reviews?.[index]?.[field] ?? '';
  };

  const handleScopeReviewChange = (scope: string, index: number, field: string, value: string) => {
    if (scope === 'base') {
      setData((prev: any) => {
        const reviews = [...(prev.reviews || [])];
        reviews[index] = { ...reviews[index], [field]: value };
        return { ...prev, reviews };
      });
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[scope] || {};
        const reviews = [...(templateData.reviews || prev.reviews || [])];
        reviews[index] = { ...reviews[index], [field]: value };
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [scope]: {
              ...templateData,
              reviews
            }
          }
        };
      });
    }
  };

  const addScopeReview = (scope: string) => {
    if (scope === 'base') {
      setData((prev: any) => ({
        ...prev,
        reviews: [...(prev.reviews || []), { author: '', rating: '5', text: '' }]
      }));
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[scope] || {};
        const reviews = [...(templateData.reviews || prev.reviews || [])];
        reviews.push({ author: '', rating: '5', text: '' });
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [scope]: {
              ...templateData,
              reviews
            }
          }
        };
      });
    }
  };

  const removeScopeReview = (scope: string, index: number) => {
    if (scope === 'base') {
      setData((prev: any) => {
        const reviews = [...(prev.reviews || [])];
        reviews.splice(index, 1);
        return { ...prev, reviews };
      });
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[scope] || {};
        const reviews = [...(templateData.reviews || prev.reviews || [])];
        reviews.splice(index, 1);
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [scope]: {
              ...templateData,
              reviews
            }
          }
        };
      });
    }
  };

  // Theme Section Images Resolver & Mutator
  const getSectionImageValueRaw = (scope: string, arrayKey: MediaArrayKey, index: number) => {
    if (!data) return '';
    if (scope === 'base') {
      return data.media?.[arrayKey]?.[index] ?? '';
    }
    const templateOverride = data.templateOverrides?.[scope];
    return templateOverride?.media?.[arrayKey]?.[index] ?? '';
  };

  const getSectionImageValue = (scope: string, arrayKey: MediaArrayKey, index: number) => {
    if (!data) return '';
    if (scope === 'base') {
      return data.media?.[arrayKey]?.[index] ?? '';
    }
    const templateOverride = data.templateOverrides?.[scope];
    const val = templateOverride?.media?.[arrayKey]?.[index];
    if (val !== undefined && val !== '') return val;
    return data.media?.[arrayKey]?.[index] ?? '';
  };

  const handleAssignSectionImage = (scope: string, arrayKey: MediaArrayKey, index: number, imageUrl: string) => {
    setData((prev: any) => {
      if (scope === 'base') {
        const mediaData = prev.media || {};
        const currentArray = [...(mediaData[arrayKey] || [])];

        while (currentArray.length <= index) {
          currentArray.push('');
        }
        currentArray[index] = imageUrl;

        return {
          ...prev,
          media: {
            ...mediaData,
            [arrayKey]: currentArray
          }
        };
      }

      const overrides = prev.templateOverrides || {};
      const templateData = overrides[scope] || {};
      const mediaData = templateData.media || {};
      const currentArray = [...(mediaData[arrayKey] || prev.media?.[arrayKey] || [])];
      
      while (currentArray.length <= index) {
        currentArray.push('');
      }
      currentArray[index] = imageUrl;

      return {
        ...prev,
        templateOverrides: {
          ...overrides,
          [scope]: {
            ...templateData,
            media: {
              ...mediaData,
              [arrayKey]: currentArray
            }
          }
        }
      };
    });
  };

  const handleSwapImages = (
    scope: string,
    arrayKeyA: MediaArrayKey,
    indexA: number,
    arrayKeyB: MediaArrayKey,
    indexB: number
  ) => {
    setData((prev: any) => {
      // Helper to retrieve the current active image value for a slot from prev
      const getVal = (arrKey: MediaArrayKey, idx: number) => {
        if (scope === 'base') {
          return prev.media?.[arrKey]?.[idx] ?? '';
        }
        const templateOverride = prev.templateOverrides?.[scope];
        const val = templateOverride?.media?.[arrKey]?.[idx];
        if (val !== undefined && val !== '') return val;
        return prev.media?.[arrKey]?.[idx] ?? '';
      };

      const valA = getVal(arrayKeyA, indexA);
      const valB = getVal(arrayKeyB, indexB);

      // Helper to assign value in a data structure and return new structure
      const assignVal = (targetData: any, arrKey: MediaArrayKey, idx: number, value: string) => {
        if (scope === 'base') {
          const mediaData = { ...(targetData.media || {}) };
          const currentArray = [...(mediaData[arrKey] || [])];
          while (currentArray.length <= idx) {
            currentArray.push('');
          }
          currentArray[idx] = value;
          return {
            ...targetData,
            media: {
              ...mediaData,
              [arrKey]: currentArray
            }
          };
        }

        const overrides = { ...(targetData.templateOverrides || {}) };
        const templateData = { ...(overrides[scope] || {}) };
        const mediaData = { ...(templateData.media || {}) };
        const currentArray = [...(mediaData[arrKey] || targetData.media?.[arrKey] || [])];
        while (currentArray.length <= idx) {
          currentArray.push('');
        }
        currentArray[idx] = value;

        return {
          ...targetData,
          templateOverrides: {
            ...overrides,
            [scope]: {
              ...templateData,
              media: {
                ...mediaData,
                [arrKey]: currentArray
              }
            }
          }
        };
      };

      // Swap the values: A gets valB, B gets valA
      let updatedData = assignVal(prev, arrayKeyA, indexA, valB);
      updatedData = assignVal(updatedData, arrayKeyB, indexB, valA);
      return updatedData;
    });
  };

  const resolveElementLabel = (element: any) => {
    if (!element) return '';
    if (element.type !== 'image') return element.label;
    const { arrayKey, index } = element.imageConfig;
    if (arrayKey === 'otherImages' && index >= 6 && index <= 13) {
      const services = data?.business?.services || [];
      const serviceItems = services.length > 0 ? services : [
        "Residential Interior Design",
        "Modular Kitchen Design",
        "Living Room Styling",
        "Bedroom Makeovers",
        "Space Planning",
        "Custom Furniture"
      ];
      for (const svc of serviceItems) {
        const lower = svc.toLowerCase();
        if (index === 6 && (lower.includes("space") || lower.includes("zoning") || lower.includes("layout") || lower.includes("planning"))) return svc;
        if (index === 7 && (lower.includes("material") || lower.includes("finish") || lower.includes("kitchen"))) return svc;
        if (index === 8 && lower.includes("lighting")) return svc;
        if (index === 9 && (lower.includes("residential") || lower.includes("home") || lower.includes("villa") || lower.includes("apartment"))) return svc;
        if (index === 10 && (lower.includes("commercial") || lower.includes("office") || lower.includes("retail") || lower.includes("corporate"))) return svc;
        if (index === 12 && (lower.includes("renovation") || lower.includes("makeover") || lower.includes("overhaul"))) return svc;
        if (index === 11 && (lower.includes("styling") || lower.includes("decor") || lower.includes("bedroom") || lower.includes("living"))) return svc;
        if (index === 13 && (lower.includes("furniture") || lower.includes("joinery") || lower.includes("steel") || lower.includes("millwork") || lower.includes("wood"))) return svc;
      }
    }
    return element.label;
  };

  const getEffectiveValueRaw = (scope: string, path: string[]) => {
    if (scope === 'base') return getOverrideValueRaw('base', path);

    const overrideValue = getOverrideValueRaw(scope, path);
    if (Array.isArray(overrideValue)) {
      return overrideValue.length > 0 ? overrideValue : getOverrideValueRaw('base', path);
    }
    if (overrideValue !== undefined && overrideValue !== null && overrideValue !== '') {
      return overrideValue;
    }
    return getOverrideValueRaw('base', path);
  };

  const getCanvasElementValue = (scope: string, element: SchemaElement) => {
    if (element.type === 'image') {
      const { arrayKey, index } = element.imageConfig;
      return getSectionImageValue(scope, arrayKey, index);
    }

    const raw = getEffectiveValueRaw(scope, element.path);
    if (Array.isArray(raw)) return raw.join('\n');
    return String(raw || '');
  };

  const getCanvasElementRawValue = (scope: string, element: SchemaElement) => {
    if (element.type === 'image') {
      const { arrayKey, index } = element.imageConfig;
      return getSectionImageValueRaw(scope, arrayKey, index);
    }

    const raw = getOverrideValueRaw(scope, element.path);
    if (Array.isArray(raw)) return raw.join('\n');
    return String(raw || '');
  };

  const updateCanvasElementValue = (scope: string, element: SchemaElement, value: string) => {
    if (element.type === 'image') {
      const { arrayKey, index } = element.imageConfig;
      handleAssignSectionImage(scope, arrayKey, index, value);
      return;
    }

    if (element.type === 'list') {
      handleArrayStringChange(scope, element.path, value);
      return;
    }

    handleOverrideChange(scope, element.path, value);
  };

  const clearCanvasElementOverride = (scope: string, element: SchemaElement) => {
    if (scope === 'base') return;

    if (element.type === 'image') {
      const { arrayKey, index } = element.imageConfig;
      handleAssignSectionImage(scope, arrayKey, index, '');
      return;
    }

    handleOverrideChange(scope, element.path, element.type === 'list' ? [] : '');
  };

  useEffect(() => {
    if (imageModal && imageModal.isOpen) {
      const currentUrl = getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index);
      setPreviewImage(currentUrl);
    } else {
      setPreviewImage(null);
    }
  }, [imageModal, data]);

  const getImageAltValue = (scope: string, arrayKey: MediaArrayKey, index: number, fallback: string) => {
    if (!data) return fallback;
    const altMap = scope === 'base'
      ? data.mediaAlt
      : data.templateOverrides?.[scope]?.mediaAlt;
    return altMap?.[arrayKey]?.[index] || fallback;
  };

  const handleImageAltChange = (scope: string, arrayKey: MediaArrayKey, index: number, alt: string) => {
    setData((prev: any) => {
      if (scope === 'base') {
        const mediaAlt = prev.mediaAlt || {};
        return {
          ...prev,
          mediaAlt: {
            ...mediaAlt,
            [arrayKey]: {
              ...(mediaAlt[arrayKey] || {}),
              [index]: alt
            }
          }
        };
      }

      const overrides = prev.templateOverrides || {};
      const templateData = overrides[scope] || {};
      const mediaAlt = templateData.mediaAlt || {};
      return {
        ...prev,
        templateOverrides: {
          ...overrides,
          [scope]: {
            ...templateData,
            mediaAlt: {
              ...mediaAlt,
              [arrayKey]: {
                ...(mediaAlt[arrayKey] || {}),
                [index]: alt
              }
            }
          }
        }
      };
    });
  };

  const handleCanvasImageUpload = (scope: string, element: SchemaElement, file?: File) => {
    if (!file || element.type !== 'image') return;

    const reader = new FileReader();
    reader.onload = () => updateCanvasElementValue(scope, element, String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  // Stored Image Pool Functions
  const getAllAvailableImages = () => {
    if (!data) return [];
    return Array.from(new Set([
      ...(data.media?.clinicImages || []),
      ...(data.media?.treatmentImages || []),
      ...(data.media?.otherImages || [])
    ])).filter(Boolean) as string[];
  };

  const addImageUrl = () => {
    const url = prompt("Enter new image URL:");
    if (url) {
      setData((prev: any) => ({
        ...prev,
        media: {
          ...prev.media,
          otherImages: [...(prev.media.otherImages || []), url.trim()]
        }
      }));
    }
  };

  const removeImage = (arrayKey: string, index: number) => {
    setData((prev: any) => {
      const updatedArray = [...(prev.media?.[arrayKey] || [])];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        media: {
          ...prev.media,
          [arrayKey]: updatedArray
        }
      };
    });
  };

  const makeHero = (arrayKey: string, index: number) => {
    setData((prev: any) => {
      const sourceArray = [...(prev.media?.[arrayKey] || [])];
      const img = sourceArray[index];
      if (!img) return prev;
      
      sourceArray.splice(index, 1);
      const clinicImages = [...(prev.media?.clinicImages || [])];
      if (!clinicImages.includes(img)) {
        clinicImages.push(img);
      }
      
      return {
        ...prev,
        media: {
          ...prev.media,
          [arrayKey]: sourceArray,
          clinicImages
        }
      };
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-indigo-600 h-10 w-10" />
        <span className="text-sm font-semibold text-slate-500">Loading Configuration Builder...</span>
      </div>
    );
  }
  
  if (error) {
    return <div className="p-8 text-rose-500 bg-slate-50 min-h-screen font-bold font-sans">Error: {error}</div>;
  }
  
  if (!data) return null;

  const canvasSchema = canvasScope === 'base' ? { pages: SHARED_PAGES } : TEMPLATE_SCHEMAS[canvasScope];
  const canvasPage = canvasSchema.pages.find(page => page.id === canvasPageId) || canvasSchema.pages[0];
  const selectedCanvasSection = canvasPage.sections[canvasSelection.sectionIndex] || canvasPage.sections[0];
  const selectedCanvasElement = selectedCanvasSection?.elements[canvasSelection.elementIndex] || selectedCanvasSection?.elements[0];
  const selectedImageConfig = selectedCanvasElement?.type === 'image' ? selectedCanvasElement.imageConfig : null;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        
        {/* Editor Sticky Header */}
        <div className="bg-white/95 backdrop-blur-md sticky top-0 z-40 p-5 rounded-2xl border border-slate-205 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Settings2 className="h-7 w-7 text-indigo-650" />
              Website Editor
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Refine global studio information, manage stock media, and customize individual theme overrides.
            </p>
          </div>
          <div className="w-full md:w-auto flex gap-3 shrink-0">
            <a
              href={`/preview/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial flex items-center justify-center py-2.5 px-5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50 transition-all shadow-xs gap-2"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              View Site
            </a>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-initial flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-600/10"
            >
              {saving && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
              Save
            </button>
          </div>
        </div>

        {/* Global Save Messages / Errors */}
        {saveMessage && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ========================================================
            VISUAL BUSINESS TEMPLATE EDITOR
           ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-100/50 overflow-hidden">
          <div className="bg-slate-950 text-white p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Layout className="w-3.5 h-3.5" /> Business Version Editor
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Template canvas for this business</h2>
                <p className="text-slate-400 text-sm max-w-3xl">
                  Edits here are saved into this slug&apos;s source data. Template selections write to <span className="font-mono text-slate-200">templateOverrides</span>, so the global template code stays untouched.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0 lg:min-w-[420px]">
                <label className="space-y-1.5">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Edit Scope</span>
                  <select
                    value={canvasScope}
                    onChange={(e) => {
                      setCanvasScope(e.target.value);
                      setCanvasPageId('home');
                      setCanvasSelection({ sectionIndex: 0, elementIndex: 0 });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="base">Business Defaults</option>
                    {TEMPLATE_OPTIONS.filter(opt => opt.id !== 'base').map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name.split(' (')[0]}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Page</span>
                  <select
                    value={canvasPage.id}
                    onChange={(e) => {
                      setCanvasPageId(e.target.value);
                      setCanvasSelection({ sectionIndex: 0, elementIndex: 0 });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {canvasSchema.pages.map(page => (
                      <option key={page.id} value={page.id}>{page.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-100">
              {canvasScope === 'base'
                ? 'You are editing this business default content and default stock image slots. All templates can fall back to these values.'
                : `You are editing only this business version of ${canvasScope}. Empty template fields continue to fall back to the business defaults.`}
            </div>
          </div>
        </div>

        {/* ========================================================
            FLOATING EDITOR WORKSPACE
           ======================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_320px] gap-6 items-start w-full">
          <aside className="xl:sticky xl:top-[90px] xl:self-start xl:max-h-[calc(100vh-120px)] xl:overflow-y-auto bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Sections</h3>
                <span className="text-[10px] font-bold text-slate-400">{canvasPage.sections.length} total</span>
              </div>
              <div className="space-y-2">
                {canvasPage.sections.map((section, sectionIndex) => (
                  <button
                    key={`${canvasPage.id}-${section.label}`}
                    type="button"
                    onClick={() => setCanvasSelection({ sectionIndex, elementIndex: 0 })}
                    className={`w-full text-left rounded-xl border px-3 py-3 transition-all ${
                      canvasSelection.sectionIndex === sectionIndex
                        ? 'border-emerald-500 bg-emerald-50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Section {sectionIndex + 1}</span>
                    <span className="block text-xs font-bold text-slate-800 mt-1">{section.label}</span>
                    <span className="block text-[11px] text-slate-500 mt-1">{section.elements.length} editable elements</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={canvasSelection.sectionIndex === 0}
                  className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-[10px] font-bold text-slate-500 disabled:opacity-40"
                  title="Section order is shown here for editing orientation. Template code controls final layout order."
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Up
                </button>
                <button
                  type="button"
                  disabled={canvasSelection.sectionIndex >= canvasPage.sections.length - 1}
                  className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-[10px] font-bold text-slate-500 disabled:opacity-40"
                  title="Section order is shown here for editing orientation. Template code controls final layout order."
                >
                  <ArrowDown className="w-3.5 h-3.5" /> Down
                </button>
              </div>
            </aside>

            <section className="min-w-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between gap-3 bg-slate-900 text-white px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Eye className="w-4 h-4 text-emerald-300" />
                    Canvas Preview / {canvasPage.label}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{canvasScope === 'base' ? 'Business Defaults' : canvasScope}</span>
                </div>

                <div className="bg-white">
                  {canvasPage.sections.map((section, sectionIndex) => (
                    <div
                      key={`${section.label}-${sectionIndex}`}
                      onClick={() => setCanvasSelection({ sectionIndex, elementIndex: 0 })}
                      className={`relative border-b border-slate-100 p-5 md:p-7 cursor-pointer transition-all ${
                        canvasSelection.sectionIndex === sectionIndex
                          ? 'ring-2 ring-inset ring-emerald-500 bg-emerald-50/30'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Section {sectionIndex + 1}</p>
                          <h4 className="text-sm font-extrabold text-slate-900">{section.label}</h4>
                        </div>
                        <span className="text-[10px] font-bold rounded-full bg-white border border-slate-200 px-2.5 py-1 text-slate-500">
                          {section.elements.length} nodes
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.elements.map((element, elementIndex) => {
                          const isSelected = canvasSelection.sectionIndex === sectionIndex && canvasSelection.elementIndex === elementIndex;

                          if (element.type === 'image') {
                            const { arrayKey, index } = element.imageConfig;
                            const currentUrl = getSectionImageValue(canvasScope, arrayKey, index);
                            const resolvedTitle = resolveElementLabel(element);
                            const altText = getImageAltValue(canvasScope, arrayKey, index, resolvedTitle);

                            const cardKey = `${sectionIndex}-${elementIndex}`;
                            const isBeingDragged = draggedImage !== null &&
                              draggedImage.sectionIndex === sectionIndex &&
                              draggedImage.elementIndex === elementIndex;
                            const isOverThisCard = dragOverCard === cardKey;
                            const isValidDragTarget = draggedImage !== null && !isBeingDragged;

                            return (
                              <button
                                key={`${element.label}-${elementIndex}`}
                                type="button"
                                draggable={true}
                                onDragStart={(e) => {
                                  setDraggedImage({ arrayKey, index, sectionIndex, elementIndex });
                                  e.dataTransfer.effectAllowed = "move";
                                  e.dataTransfer.setData("text/plain", JSON.stringify({ arrayKey, index, sectionIndex, elementIndex }));
                                }}
                                onDragEnd={() => {
                                  setDraggedImage(null);
                                  setDragOverCard(null);
                                }}
                                onDragOver={(e) => {
                                  if (isValidDragTarget) {
                                    e.preventDefault();
                                  }
                                }}
                                onDragEnter={(e) => {
                                  if (isValidDragTarget) {
                                    e.preventDefault();
                                    setDragOverCard(cardKey);
                                  }
                                }}
                                onDragLeave={() => {
                                  if (isOverThisCard) {
                                    setDragOverCard(null);
                                  }
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  try {
                                    const sourceDataStr = e.dataTransfer.getData("text/plain");
                                    if (sourceDataStr) {
                                      const source = JSON.parse(sourceDataStr);
                                      if (
                                        source &&
                                        (source.arrayKey !== arrayKey || source.index !== index)
                                      ) {
                                        handleSwapImages(canvasScope, source.arrayKey, source.index, arrayKey, index);
                                      }
                                    }
                                  } catch (err) {
                                    console.error("Drop error:", err);
                                  }
                                  setDraggedImage(null);
                                  setDragOverCard(null);
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCanvasSelection({ sectionIndex, elementIndex });
                                }}
                                className={`text-left rounded-xl border overflow-hidden transition-all duration-200 relative group/card ${
                                  isSelected 
                                    ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                                    : isOverThisCard
                                      ? 'border-dashed border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/30 scale-[1.02]'
                                      : isValidDragTarget
                                        ? 'border-dashed border-indigo-400 bg-indigo-50/20 animate-pulse'
                                        : 'border-slate-200 hover:border-emerald-300'
                                } ${isBeingDragged ? 'opacity-40 scale-95 cursor-grabbing' : ''}`}
                              >
                                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                  {currentUrl ? (
                                    <img src={currentUrl} alt={altText} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image assigned</div>
                                  )}

                                  {/* Glassmorphism Title Overlay - Left */}
                                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-slate-900/75 backdrop-blur-md rounded-lg text-[10px] font-semibold text-white border border-white/10 shadow-sm truncate max-w-[70%] z-10 transition-all group-hover/card:bg-slate-950/80" title={resolvedTitle}>
                                    {resolvedTitle}
                                  </div>

                                  {/* Glassmorphism Path / Slot Overlay - Right */}
                                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-emerald-500/80 backdrop-blur-md rounded-md text-[9px] font-mono text-white border border-white/10 shadow-sm z-10">
                                    {arrayKey}[{index}]
                                  </div>

                                  {/* Drag / Swap Instructions overlay */}
                                  {isValidDragTarget && (
                                    <div className="absolute inset-0 bg-indigo-950/45 backdrop-blur-xs flex items-center justify-center z-20 transition-all">
                                      <span className="bg-white/90 backdrop-blur-md text-indigo-900 text-[10px] font-bold px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
                                        {isOverThisCard ? "Drop to Swap ⇄" : "Drag here to Swap"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                                  <div>
                                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Image Card</p>
                                    <p className="text-xs font-bold text-slate-800 mt-0.5 truncate max-w-[150px]">{resolvedTitle}</p>
                                  </div>
                                  <span className="text-[9px] font-bold text-slate-400 px-1.5 py-0.5 rounded-md bg-slate-100 uppercase tracking-wide">
                                    Draggable
                                  </span>
                                </div>
                              </button>
                            );
                          }

                          const value = getCanvasElementValue(canvasScope, element);
                          return (
                            <button
                              key={`${element.label}-${elementIndex}`}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCanvasSelection({ sectionIndex, elementIndex });
                              }}
                              className={`text-left rounded-xl border bg-white p-4 transition-all ${
                                isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
                              } ${element.type === 'textarea' || element.type === 'list' ? 'md:col-span-2' : ''}`}
                            >
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{element.type}</p>
                              <p className="text-xs font-bold text-slate-800 mt-1">{element.label}</p>
                              <p className={`mt-2 text-sm text-slate-700 ${element.type === 'text' ? 'font-semibold' : 'leading-6 whitespace-pre-line'}`}>
                                {value || <span className="italic text-slate-400">Empty</span>}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="xl:sticky xl:top-[90px] xl:self-start xl:max-h-[calc(100vh-120px)] xl:overflow-y-auto bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Element Inspector</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedCanvasSection?.label}</p>
                </div>
                {canvasScope !== 'base' && selectedCanvasElement && (
                  <button
                    type="button"
                    onClick={() => clearCanvasElementOverride(canvasScope, selectedCanvasElement)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50"
                    title="Clear this template override and use the business default value"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Default
                  </button>
                )}
              </div>

              {selectedCanvasElement && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Selected Node</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{resolveElementLabel(selectedCanvasElement)}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedCanvasElement.type === 'image' ? 'Image source + alt text' : `Text path: ${selectedCanvasElement.path.join('.')}`}
                    </p>
                  </div>

                  {selectedCanvasElement.type === 'image' && selectedImageConfig ? (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        {getSectionImageValue(canvasScope, selectedImageConfig.arrayKey, selectedImageConfig.index) ? (
                          <img
                            src={getSectionImageValue(canvasScope, selectedImageConfig.arrayKey, selectedImageConfig.index)}
                            alt={getImageAltValue(canvasScope, selectedImageConfig.arrayKey, selectedImageConfig.index, resolveElementLabel(selectedCanvasElement))}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image assigned</div>
                        )}
                      </div>

                      <label className="space-y-1.5 block">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Choose from business & stock image pool</span>
                        <button
                           type="button"
                           onClick={() => setImageModal({
                             isOpen: true,
                             scope: canvasScope,
                             arrayKey: selectedImageConfig.arrayKey,
                             index: selectedImageConfig.index,
                             label: resolveElementLabel(selectedCanvasElement)
                           })}
                           className="w-full flex items-center justify-between text-slate-700 bg-white border border-slate-300 hover:border-slate-400 rounded-xl p-3 text-xs hover:bg-slate-50 active:bg-slate-100 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <span className="truncate max-w-[180px]">
                            {getCanvasElementRawValue(canvasScope, selectedCanvasElement)
                              ? `Selected Image (${getCanvasElementRawValue(canvasScope, selectedCanvasElement).substring(0, 20)}...)`
                              : canvasScope !== 'base' ? 'Using Business Default' : 'Select an Image...'}
                          </span>
                          <span className="text-emerald-600 font-bold hover:underline shrink-0">Browse Gallery &rarr;</span>
                        </button>
                      </label>

                      <label className="space-y-1.5 block">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Image URL</span>
                        <input
                          value={getCanvasElementValue(canvasScope, selectedCanvasElement)}
                          onChange={(e) => updateCanvasElementValue(canvasScope, selectedCanvasElement, e.target.value.trim())}
                          className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          placeholder="Paste image URL"
                        />
                      </label>

                      <label className="space-y-1.5 block">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Alt Text</span>
                        <textarea
                          rows={3}
                          value={getImageAltValue(canvasScope, selectedImageConfig.arrayKey, selectedImageConfig.index, resolveElementLabel(selectedCanvasElement))}
                          onChange={(e) => handleImageAltChange(canvasScope, selectedImageConfig.arrayKey, selectedImageConfig.index, e.target.value)}
                          className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                        />
                      </label>

                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100">
                        <Upload className="w-4 h-4" />
                        Upload for this business
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCanvasImageUpload(canvasScope, selectedCanvasElement, e.target.files?.[0])}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="space-y-1.5 block">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Content</span>
                      {selectedCanvasElement.type === 'text' ? (
                        <input
                          value={getCanvasElementValue(canvasScope, selectedCanvasElement)}
                          onChange={(e) => updateCanvasElementValue(canvasScope, selectedCanvasElement, e.target.value)}
                          className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      ) : (
                        <textarea
                          rows={selectedCanvasElement.type === 'list' ? 6 : 4}
                          value={getCanvasElementValue(canvasScope, selectedCanvasElement)}
                          onChange={(e) => updateCanvasElementValue(canvasScope, selectedCanvasElement, e.target.value)}
                          className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                        />
                      )}
                    </label>
                  )}
                </div>
              )}
            </aside>
          </div>

        {/* ========================================================
            1. GLOBAL DATA EDITOR (BASE CONFIG)
           ======================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-100/50 overflow-hidden">
          <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" /> Level 1
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Global Data Editor</h2>
              <p className="text-slate-400 text-xs md:text-sm">
                These fields serve as baseline configurations and fallback values for all themes.
              </p>
            </div>
            
            {/* Global Tabs Nav */}
            <div className="flex bg-slate-800 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'info', label: 'Studio Info', icon: FileText },
                { id: 'designer', label: 'Designer & Meta', icon: User },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'media', label: 'Global Media Pool', icon: ImageIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setGlobalTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      globalTab === tab.id
                        ? 'bg-slate-700 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* TAB: Studio Info */}
            {globalTab === 'info' && (
              <div className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Studio Name</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['clinic', 'name'])} 
                      onChange={e => handleOverrideChange('base', ['clinic', 'name'], e.target.value)} 
                      placeholder="e.g. Artistry Interiors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Tagline</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['clinic', 'tagline'])} 
                      onChange={e => handleOverrideChange('base', ['clinic', 'tagline'], e.target.value)} 
                      placeholder="e.g. Crafting bespoke spaces"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Studio Description / About</label>
                  <textarea 
                    className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs resize-none" 
                    rows={4} 
                    value={getOverrideValueRaw('base', ['clinic', 'description'])} 
                    onChange={e => handleOverrideChange('base', ['clinic', 'description'], e.target.value)} 
                    placeholder="Provide a detailed description of your studio's design philosophy..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Contact Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        className="w-full text-slate-900 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                        value={getOverrideValueRaw('base', ['clinic', 'contact', 'phone'])} 
                        onChange={e => handleOverrideChange('base', ['clinic', 'contact', 'phone'], e.target.value)} 
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Full Studio Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        className="w-full text-slate-900 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                        value={getOverrideValueRaw('base', ['clinic', 'address', 'full'])} 
                        onChange={e => handleOverrideChange('base', ['clinic', 'address', 'full'], e.target.value)} 
                        placeholder="No. 12, Nungambakkam High Rd, Chennai"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Designer & Meta */}
            {globalTab === 'designer' && (
              <div className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Lead Designer Name</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['doctor', 'name'])} 
                      onChange={e => handleOverrideChange('base', ['doctor', 'name'], e.target.value)} 
                      placeholder="e.g. Priya Raj"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Specialization</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['doctor', 'specialization'])} 
                      onChange={e => handleOverrideChange('base', ['doctor', 'specialization'], e.target.value)} 
                      placeholder="e.g. Interior Architect"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Experience Info</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['doctor', 'experience'])} 
                      onChange={e => handleOverrideChange('base', ['doctor', 'experience'], e.target.value)} 
                      placeholder="e.g. 8+ Years Experience"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Google Rating</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['business', 'rating'])} 
                      onChange={e => handleOverrideChange('base', ['business', 'rating'], e.target.value)} 
                      placeholder="e.g. 4.9"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Review Count</label>
                    <input 
                      type="text"
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs" 
                      value={getOverrideValueRaw('base', ['business', 'reviewCount'])} 
                      onChange={e => handleOverrideChange('base', ['business', 'reviewCount'], e.target.value)} 
                      placeholder="e.g. 142 Reviews"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Highlights (1 per line)</label>
                    <textarea 
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs resize-none" 
                      rows={5} 
                      value={getArrayString('base', ['business', 'highlights'])} 
                      onChange={e => handleArrayStringChange('base', ['business', 'highlights'], e.target.value)} 
                      placeholder="e.g. 100% Quality Guaranteed&#10;Bespoke Architecture..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">Services (1 per line)</label>
                    <textarea 
                      className="w-full text-slate-900 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-xs resize-none" 
                      rows={5} 
                      value={getArrayString('base', ['business', 'services'])} 
                      onChange={e => handleArrayStringChange('base', ['business', 'services'], e.target.value)} 
                      placeholder="e.g. Modular Kitchens&#10;Residential Renovations..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Reviews */}
            {globalTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Client Reviews</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Manage reviews showcased in global sections across layouts.</p>
                  </div>
                  <button 
                    onClick={() => addScopeReview('base')} 
                    className="flex items-center gap-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl font-bold transition-all border border-indigo-100/50 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Review
                  </button>
                </div>

                {getReviewList('base').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getReviewList('base').map((review: any, index: number) => (
                      <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 relative group hover:border-slate-300 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Review #{index + 1}</span>
                          <button
                            onClick={() => removeScopeReview('base', index)}
                            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-100 px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Author Name</label>
                            <input
                              className="w-full text-slate-900 border border-slate-200 bg-white rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                              value={getReviewValue('base', index, 'author')}
                              onChange={e => handleScopeReviewChange('base', index, 'author', e.target.value)}
                              placeholder="Author name"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rating (1 to 5)</label>
                            <input
                              type="number"
                              min={1}
                              max={5}
                              className="w-full text-slate-900 border border-slate-200 bg-white rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                              value={getReviewValue('base', index, 'rating')}
                              onChange={e => handleScopeReviewChange('base', index, 'rating', e.target.value)}
                              placeholder="5"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Feedback Content</label>
                          <textarea
                            rows={3}
                            className="w-full text-slate-900 border border-slate-200 bg-white rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none"
                            value={getReviewValue('base', index, 'text')}
                            onChange={e => handleScopeReviewChange('base', index, 'text', e.target.value)}
                            placeholder="Type client feedback review here..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic p-6 bg-slate-50 border border-slate-100 rounded-xl text-center">
                    No reviews registered. Click &quot;Add Review&quot; to begin.
                  </p>
                )}
              </div>
            )}

            {/* TAB: Media & Stock Images */}
            {globalTab === 'media' && (
              <div className="space-y-8">
                {/* Scraped Asset Pool */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Scraped Asset Pool</h3>
                      <p className="text-slate-400 text-xs mt-0.5">Manage default image assets scraped or added manually.</p>
                    </div>
                    <button 
                      onClick={addImageUrl} 
                      className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 active:bg-slate-205 text-slate-700 px-4 py-2.5 rounded-xl font-bold transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Image URL
                    </button>
                  </div>

                  {/* Hero Banner Images */}
                  <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100/50">
                    <h4 className="text-xs font-extrabold text-indigo-900 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                      Global Hero Slides (Fallback Banner Gallery)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {data.media?.clinicImages?.length > 0 ? (
                        data.media.clinicImages.map((src: string, i: number) => (
                          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-indigo-200 shadow-xs bg-slate-100">
                            <img src={src} className="w-full h-full object-cover" alt={`Hero ${i}`} />
                            <div className="absolute inset-0 bg-slate-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  const img = data.media.clinicImages[i];
                                  const newHeroArr = [...data.media.clinicImages];
                                  newHeroArr.splice(i, 1);
                                  setData((prev: any) => ({
                                    ...prev,
                                    media: {
                                      ...prev.media,
                                      clinicImages: newHeroArr,
                                      otherImages: [...(prev.media.otherImages || []), img]
                                    }
                                  }));
                                }}
                                className="bg-white hover:bg-slate-100 p-2 rounded-lg text-slate-800 text-xs font-bold shadow-sm"
                                title="Demote to other gallery"
                              >
                                ↓
                              </button>
                              <button
                                onClick={() => removeImage('clinicImages', i)}
                                className="bg-rose-600 hover:bg-rose-700 p-2 rounded-lg text-white shadow-sm"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic col-span-full">No hero slider images assigned.</p>
                      )}
                    </div>
                  </div>

                  {/* Rest of Gallery Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Projects / Treatment Images */}
                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200">
                      <h4 className="text-xs font-extrabold text-slate-700 mb-3 uppercase tracking-wider font-mono">Project Portfolio Gallery</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {data.media?.treatmentImages?.length > 0 ? (
                          data.media.treatmentImages.map((src: string, i: number) => (
                            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white">
                              <img src={src} className="w-full h-full object-cover" alt="Treatment" />
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  onClick={() => makeHero('treatmentImages', i)}
                                  className="bg-indigo-655 hover:bg-indigo-700 p-2 rounded-lg text-white shadow-sm"
                                  title="Promote to Hero Slides"
                                >
                                  <Star className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => removeImage('treatmentImages', i)}
                                  className="bg-rose-600 hover:bg-rose-700 p-2 rounded-lg text-white shadow-sm"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-400 italic col-span-full">No project portfolio images found.</p>
                        )}
                      </div>
                    </div>

                    {/* Other Images */}
                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200">
                      <h4 className="text-xs font-extrabold text-slate-700 mb-3 uppercase tracking-wider font-mono">Other / External Images</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {data.media?.otherImages?.length > 0 ? (
                          data.media.otherImages.map((src: string, i: number) => (
                            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white">
                              <img src={src} className="w-full h-full object-cover" alt="Other" />
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  onClick={() => makeHero('otherImages', i)}
                                  className="bg-indigo-650 hover:bg-indigo-700 p-2 rounded-lg text-white shadow-sm"
                                  title="Promote to Hero Slides"
                                >
                                  <Star className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => removeImage('otherImages', i)}
                                  className="bg-rose-600 hover:bg-rose-700 p-2 rounded-lg text-white shadow-sm"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-400 italic col-span-full">No other images available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PREMIUM STOCK IMAGE LIBRARY */}
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      Premium Curated Stock Library
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Need better photography? Add high-resolution stock images directly to your global media pool.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {PREMIUM_STOCK_IMAGES.map((stock, sIdx) => {
                      const isInPool = data.media?.clinicImages?.includes(stock.url) || 
                                       data.media?.treatmentImages?.includes(stock.url) || 
                                       data.media?.otherImages?.includes(stock.url);
                      return (
                        <div key={sIdx} className="bg-slate-550 border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors">
                          <div className="aspect-video relative overflow-hidden bg-slate-205">
                            <img src={stock.url} className="w-full h-full object-cover" alt={stock.label} />
                            {isInPool && (
                              <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-sm">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                          
                          <div className="p-3 space-y-2 flex-1 flex flex-col justify-between bg-white">
                            <span className="text-[11px] font-bold text-slate-700 leading-tight block">{stock.label}</span>
                            <div className="flex gap-1.5 pt-2">
                              <button
                                onClick={() => {
                                  if (isInPool) return;
                                  setData((prev: any) => ({
                                    ...prev,
                                    media: {
                                      ...prev.media,
                                      otherImages: [...(prev.media.otherImages || []), stock.url]
                                    }
                                  }));
                                }}
                                disabled={isInPool}
                                className={`w-full text-[10px] font-extrabold uppercase py-1.5 rounded-lg border transition-all text-center ${
                                  isInPool 
                                    ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-white border-slate-200 hover:bg-slate-50 active:bg-slate-105 text-slate-750'
                                }`}
                              >
                                {isInPool ? 'In Pool' : '+ Add to Pool'}
                              </button>

                              <button
                                onClick={() => {
                                  setData((prev: any) => {
                                    const currentHero = [...(prev.media?.clinicImages || [])];
                                    if (currentHero.includes(stock.url)) return prev;
                                    return {
                                      ...prev,
                                      media: {
                                        ...prev.media,
                                        clinicImages: [...currentHero, stock.url]
                                      }
                                    };
                                  });
                                }}
                                className="px-2 py-1.5 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100/60 rounded-lg text-indigo-650 shrink-0"
                                title="Add directly to global Hero slides"
                              >
                                <Star className="w-3 h-3 fill-indigo-600 text-indigo-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>      {imageModal && imageModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Top Full-Width Image Preview */}
            <div className="w-full h-64 md:h-72 bg-slate-950 relative overflow-hidden shrink-0 border-b border-slate-200/80 flex items-center justify-center">
              {previewImage ? (
                <>
                  <img src={previewImage} className="w-full h-full object-cover opacity-90 transition-all duration-300" alt="Preview" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  
                  {/* Favorite Button on Preview Box */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(previewImage);
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/50 hover:bg-slate-950/75 backdrop-blur-md text-white transition-all shadow-md z-10"
                    title={favorites.includes(previewImage) ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <Star className={`w-4 h-4 transition-all ${favorites.includes(previewImage) ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block mb-1">
                        {previewImage === getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index)
                          ? "● Currently Active Asset"
                          : "Previewing Asset (Hovered)"}
                      </span>
                      <p className="text-xs text-slate-300 font-mono truncate max-w-lg md:max-w-xl">
                        {previewImage}
                      </p>
                    </div>
                    {previewImage !== getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index) && (
                      <button
                        type="button"
                        onClick={() => {
                          handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, previewImage);
                          setImageModal(null);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-950/25 transition-all shrink-0 active:scale-95"
                      >
                        Apply Selected
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2 bg-slate-900">
                  <ImageIcon className="w-10 h-10 text-slate-600 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-400">No Image Selected</span>
                </div>
              )}
            </div>

            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-white">
              <div>
                <h3 className="text-md md:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-indigo-650" />
                  Select Image Asset
                </h3>
                <p className="text-[11px] md:text-xs text-slate-500 mt-1">
                  Configuring image slot for: <strong className="text-slate-850">{imageModal.label}</strong> (Scope: {imageModal.scope === 'base' ? 'Global Default' : imageModal.scope})
                </p>
              </div>
              <button
                onClick={() => setImageModal(null)}
                className="p-2 text-slate-400 hover:text-slate-650 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="px-6 py-2 border-b border-slate-100 bg-slate-50 flex gap-2 overflow-x-auto">
              {[
                { id: 'business', label: 'Business Image Pool' },
                { id: 'template', label: 'Template Stock Images' },
                { id: 'curated', label: 'Curated Stock Library' },
                { id: 'favorites', label: `Favorites (${favorites.length})` },
                { id: 'upload', label: 'Upload New' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    modalTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 min-h-[250px]">
              {/* Tab: Business Image Pool */}
              {modalTab === 'business' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Images scraped or uploaded specifically for this business page.
                    </p>
                    {imageModal.scope !== 'base' && (
                      <button
                        type="button"
                        onClick={() => {
                          handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, '');
                          setImageModal(null);
                        }}
                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Clear Override / Use Default
                      </button>
                    )}
                  </div>
                  {getAllAvailableImages().length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {getAllAvailableImages().map((src, srcIdx) => {
                        const isSelected = getSectionImageValueRaw(imageModal.scope, imageModal.arrayKey, imageModal.index) === src;
                        return (
                          <div
                            key={srcIdx}
                            onMouseEnter={() => setPreviewImage(src)}
                            onMouseLeave={() => {
                              const currentUrl = getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index);
                              setPreviewImage(currentUrl);
                            }}
                            className={`group aspect-video rounded-2xl overflow-hidden border cursor-pointer bg-slate-100 hover:shadow-lg transition-all relative ${
                              isSelected ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
                            }`}
                          >
                            <img 
                              src={src} 
                              onClick={() => {
                                handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, src);
                                setImageModal(null);
                              }}
                              className="w-full h-full object-cover" 
                              alt={`Business Image ${srcIdx + 1}`} 
                            />
                            {/* Favorite Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(src);
                              }}
                              className={`absolute top-2 left-2 p-1.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xs text-white transition-all z-10 ${
                                favorites.includes(src) 
                                  ? 'opacity-100 scale-100' 
                                  : 'opacity-0 group-hover:opacity-100 scale-90 hover:scale-100'
                              }`}
                              title={favorites.includes(src) ? "Remove from Favorites" : "Add to Favorites"}
                            >
                              <Star className={`w-3.5 h-3.5 transition-all ${favorites.includes(src) ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                            </button>
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md z-10">
                                <Check className="w-3 h-3 font-bold" />
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 backdrop-blur-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
                              <span className="text-[10px] text-white font-bold block truncate">Business Image #{srcIdx + 1}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <span className="text-xs font-semibold text-slate-400">No business images available</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Template Stock Images */}
              {modalTab === 'template' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Curated high-quality stock images representing default look and feel for the active template.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* Render Stock Images for the template or fall back to general stock images */}
                    {((imageModal.scope !== 'base' && TEMPLATE_STOCK_IMAGES[imageModal.scope]) 
                      ? TEMPLATE_STOCK_IMAGES[imageModal.scope] 
                      : Object.values(TEMPLATE_STOCK_IMAGES).flat()
                    ).map((stock, srcIdx) => {
                      const isSelected = getSectionImageValueRaw(imageModal.scope, imageModal.arrayKey, imageModal.index) === stock.url;
                      return (
                        <div
                          key={srcIdx}
                          onMouseEnter={() => setPreviewImage(stock.url)}
                          onMouseLeave={() => {
                            const currentUrl = getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index);
                            setPreviewImage(currentUrl);
                          }}
                          className={`group aspect-video rounded-2xl overflow-hidden border cursor-pointer bg-slate-100 hover:shadow-lg transition-all relative ${
                            isSelected ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <img 
                            src={stock.url} 
                            onClick={() => {
                              handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, stock.url);
                              setImageModal(null);
                            }}
                            className="w-full h-full object-cover" 
                            alt={stock.label} 
                          />
                          {/* Favorite Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(stock.url);
                            }}
                            className={`absolute top-2 left-2 p-1.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xs text-white transition-all z-10 ${
                              favorites.includes(stock.url) 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 group-hover:opacity-100 scale-90 hover:scale-100'
                            }`}
                            title={favorites.includes(stock.url) ? "Remove from Favorites" : "Add to Favorites"}
                          >
                            <Star className={`w-3.5 h-3.5 transition-all ${favorites.includes(stock.url) ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                          </button>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md z-10">
                              <Check className="w-3 h-3 font-bold" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 backdrop-blur-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
                            <span className="text-[10px] text-white font-bold block truncate">{stock.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab: Curated Stock Library */}
              {modalTab === 'curated' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Browse a curated library of high-resolution stock photography for premium interior design styles.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {PREMIUM_STOCK_IMAGES.map((stock, srcIdx) => {
                      const isSelected = getSectionImageValueRaw(imageModal.scope, imageModal.arrayKey, imageModal.index) === stock.url;
                      return (
                        <div
                          key={srcIdx}
                          onMouseEnter={() => setPreviewImage(stock.url)}
                          onMouseLeave={() => {
                            const currentUrl = getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index);
                            setPreviewImage(currentUrl);
                          }}
                          className={`group aspect-video rounded-2xl overflow-hidden border cursor-pointer bg-slate-100 hover:shadow-lg transition-all relative ${
                            isSelected ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <img 
                            src={stock.url} 
                            onClick={() => {
                              handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, stock.url);
                              setImageModal(null);
                            }}
                            className="w-full h-full object-cover" 
                            alt={stock.label} 
                          />
                          {/* Favorite Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(stock.url);
                            }}
                            className={`absolute top-2 left-2 p-1.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xs text-white transition-all z-10 ${
                              favorites.includes(stock.url) 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 group-hover:opacity-100 scale-90 hover:scale-100'
                            }`}
                            title={favorites.includes(stock.url) ? "Remove from Favorites" : "Add to Favorites"}
                          >
                            <Star className={`w-3.5 h-3.5 transition-all ${favorites.includes(stock.url) ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                          </button>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md z-10">
                              <Check className="w-3 h-3 font-bold" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 backdrop-blur-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
                            <span className="text-[10px] text-white font-bold block truncate">{stock.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab: Favorites */}
              {modalTab === 'favorites' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Your collection of starred images. Star any image across the tabs to add it here.
                  </p>
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {favorites.map((src, srcIdx) => {
                        const isSelected = getSectionImageValueRaw(imageModal.scope, imageModal.arrayKey, imageModal.index) === src;
                        return (
                          <div
                            key={srcIdx}
                            onMouseEnter={() => setPreviewImage(src)}
                            onMouseLeave={() => {
                              const currentUrl = getSectionImageValue(imageModal.scope, imageModal.arrayKey, imageModal.index);
                              setPreviewImage(currentUrl);
                            }}
                            className={`group aspect-video rounded-2xl overflow-hidden border cursor-pointer bg-slate-100 hover:shadow-lg transition-all relative ${
                              isSelected ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
                            }`}
                          >
                            <img
                              src={src}
                              onClick={() => {
                                handleAssignSectionImage(imageModal.scope, imageModal.arrayKey, imageModal.index, src);
                                setImageModal(null);
                              }}
                              className="w-full h-full object-cover"
                              alt={`Favorite Image ${srcIdx + 1}`}
                            />
                            {/* Favorite Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(src);
                              }}
                              className="absolute top-2 left-2 p-1.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xs text-white transition-all opacity-100 z-10"
                              title="Remove from Favorites"
                            >
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            </button>
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md z-10">
                                <Check className="w-3 h-3 font-bold" />
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 backdrop-blur-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
                              <span className="text-[10px] text-white font-bold block truncate">Fav #{srcIdx + 1}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                      <Star className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <span className="text-xs font-semibold text-slate-400">No favorite images yet. Star some images in other tabs to show them here!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Upload New */}
              {modalTab === 'upload' && (
                <div className="space-y-6 py-6 max-w-md mx-auto">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-slate-350 mx-auto mb-3" />
                    <h4 className="text-sm font-bold text-slate-800">Upload Image File</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload an image from your device to assign it directly to this slot.
                    </p>
                  </div>
                  
                  <label className="flex flex-col cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-indigo-400 transition-all text-center">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-xl border border-indigo-100">Select Local File</span>
                    <span className="text-[10px] text-slate-400 font-normal">Supports JPEG, PNG, WEBP files</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadImageFromModal(file);
                      }}
                      className="sr-only"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setImageModal(null)}
                className="py-2.5 px-5 rounded-xl text-xs font-bold text-slate-750 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
