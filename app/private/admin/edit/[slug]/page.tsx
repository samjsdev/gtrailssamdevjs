'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Settings2, Trash2, Star, Plus, Check, ChevronDown, Image, Layout, FileText, CheckCircle2 } from 'lucide-react';

const TEMPLATE_OPTIONS = [
  { id: 'base', name: 'Base Defaults (Global fallback for all templates)' },
  { id: 'template1', name: 'Template 1 (Dental Clinic theme layout)' },
  { id: 'template2', name: 'Template 2 (Garamond Luxe theme layout)' },
  { id: 'template3', name: 'Template 3 (Reference theme layout)' },
  { id: 'template4', name: 'Template 4 (Minimal Creative theme layout)' },
  { id: 'template6', name: 'Template 6 (Glassmorphism Flow layout)' },
  { id: 'template10', name: 'Template 10 (Raw Industrial theme layout)' }
];

const TEMPLATE_IMAGE_SECTIONS: Record<string, { key: string; label: string; arrayKey: 'clinicImages' | 'otherImages'; index: number }[]> = {
  template1: [
    { key: 'heroImage', label: 'Hero Main Banner Image', arrayKey: 'clinicImages', index: 0 },
    { key: 'doctorImage', label: 'Doctor Portrait Image', arrayKey: 'otherImages', index: 0 },
    { key: 'founderImage', label: 'About Founder Image', arrayKey: 'otherImages', index: 0 },
    { key: 'assistantImage', label: 'About Assistant Image', arrayKey: 'otherImages', index: 1 }
  ],
  template2: [
    { key: 'heroImage', label: 'Hero Section Image', arrayKey: 'clinicImages', index: 0 }
  ],
  template3: [
    { key: 'heroImage', label: 'Hero Header Image', arrayKey: 'clinicImages', index: 0 }
  ],
  template4: [
    { key: 'heroImage', label: 'Hero Slider Image', arrayKey: 'clinicImages', index: 0 },
    { key: 'principalImage', label: 'Principal Designer Image', arrayKey: 'otherImages', index: 0 }
  ],
  template6: [
    { key: 'heroImage', label: 'Hero Landing Image', arrayKey: 'clinicImages', index: 0 },
    { key: 'doctorImage', label: 'Styling Director Image', arrayKey: 'otherImages', index: 0 }
  ],
  template10: [
    { key: 'heroImage', label: 'Hero Drafting Banner', arrayKey: 'clinicImages', index: 0 },
    { key: 'doctorImage', label: 'Lead Fabricator Image', arrayKey: 'otherImages', index: 0 }
  ]
};

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Active Edit Scope
  const [activeScope, setActiveScope] = useState<string>('base');

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

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    setError('');
    setSaveMessage('');

    try {
      await saveSourceData();
      setSaveMessage('Changes saved successfully.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingDraft(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setSaveMessage('');

    try {
      await saveSourceData();
      router.push(`/preview/${slug}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  // Scope-Aware Value Resolvers
  const getNestedValue = (section: string, subsection: string, field: string) => {
    if (!data) return '';
    if (activeScope !== 'base') {
      const templateOverride = data.templateOverrides?.[activeScope];
      const val = templateOverride?.[section]?.[subsection]?.[field];
      if (val !== undefined) return val;
    }
    return data[section]?.[subsection]?.[field] ?? '';
  };

  const getArrayValue = (section: string, field: string) => {
    if (!data) return [];
    if (activeScope !== 'base') {
      const templateOverride = data.templateOverrides?.[activeScope];
      const val = templateOverride?.[section]?.[field];
      if (val !== undefined) return val;
    }
    return data[section]?.[field] ?? [];
  };

  const getReviewValue = (index: number, field: string) => {
    if (!data) return '';
    if (activeScope !== 'base') {
      const templateOverride = data.templateOverrides?.[activeScope];
      const val = templateOverride?.reviews?.[index]?.[field];
      if (val !== undefined) return val;
    }
    return data.reviews?.[index]?.[field] ?? '';
  };

  const getReviewList = () => {
    if (!data) return [];
    if (activeScope !== 'base') {
      const templateOverride = data.templateOverrides?.[activeScope];
      if (templateOverride?.reviews !== undefined) {
        return templateOverride.reviews;
      }
    }
    return data.reviews || [];
  };

  // Scope-Aware Edit Mutators
  const handleScopeChange = (section: string, field: string, value: any) => {
    if (activeScope === 'base') {
      setData((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[activeScope] || {};
        const sectionData = templateData[section] || {};
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [activeScope]: {
              ...templateData,
              [section]: {
                ...sectionData,
                [field]: value
              }
            }
          }
        };
      });
    }
  };

  const handleScopeNestedChange = (section: string, subsection: string, field: string, value: any) => {
    if (activeScope === 'base') {
      setData((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [field]: value
          }
        }
      }));
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[activeScope] || {};
        const sectionData = templateData[section] || {};
        const subData = sectionData[subsection] || {};
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [activeScope]: {
              ...templateData,
              [section]: {
                ...sectionData,
                [subsection]: {
                  ...subData,
                  [field]: value
                }
              }
            }
          }
        };
      });
    }
  };

  const handleScopeArrayChange = (section: string, field: string, value: string) => {
    const arr = value.split('\n');
    handleScopeChange(section, field, arr);
  };

  const handleScopeReviewChange = (index: number, field: string, value: string) => {
    if (activeScope === 'base') {
      setData((prev: any) => {
        const reviews = [...(prev.reviews || [])];
        reviews[index] = { ...reviews[index], [field]: value };
        return { ...prev, reviews };
      });
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[activeScope] || {};
        const reviews = [...(templateData.reviews || prev.reviews || [])];
        reviews[index] = { ...reviews[index], [field]: value };
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [activeScope]: {
              ...templateData,
              reviews
            }
          }
        };
      });
    }
  };

  const addScopeReview = () => {
    if (activeScope === 'base') {
      setData((prev: any) => ({
        ...prev,
        reviews: [...(prev.reviews || []), { author: '', rating: '5', text: '' }]
      }));
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[activeScope] || {};
        const reviews = [...(templateData.reviews || prev.reviews || [])];
        reviews.push({ author: '', rating: '5', text: '' });
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [activeScope]: {
              ...templateData,
              reviews
            }
          }
        };
      });
    }
  };

  const removeScopeReview = (index: number) => {
    if (activeScope === 'base') {
      setData((prev: any) => {
        const reviews = [...(prev.reviews || [])];
        reviews.splice(index, 1);
        return { ...prev, reviews };
      });
    } else {
      setData((prev: any) => {
        const overrides = prev.templateOverrides || {};
        const templateData = overrides[activeScope] || {};
        const reviews = [...(templateData.reviews || prev.reviews || [])];
        reviews.splice(index, 1);
        return {
          ...prev,
          templateOverrides: {
            ...overrides,
            [activeScope]: {
              ...templateData,
              reviews
            }
          }
        };
      });
    }
  };

  // Section Image Assignment Logic
  const handleAssignSectionImage = (arrayKey: 'clinicImages' | 'otherImages', index: number, imageUrl: string) => {
    setData((prev: any) => {
      const overrides = prev.templateOverrides || {};
      const templateData = overrides[activeScope] || {};
      const mediaData = templateData.media || {};
      const currentArray = [...(mediaData[arrayKey] || prev.media?.[arrayKey] || [])];
      
      // Pad array if index is larger than size
      while (currentArray.length <= index) {
        currentArray.push('');
      }
      currentArray[index] = imageUrl;

      return {
        ...prev,
        templateOverrides: {
          ...overrides,
          [activeScope]: {
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

  const getSectionImageValue = (arrayKey: 'clinicImages' | 'otherImages', index: number) => {
    if (!data) return '';
    const templateOverride = data.templateOverrides?.[activeScope];
    const val = templateOverride?.media?.[arrayKey]?.[index];
    if (val !== undefined && val !== '') return val;
    return data.media?.[arrayKey]?.[index] ?? '';
  };

  // Stored Image Pool
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
      
      // Move from source array to hero images
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

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-blue-500 h-8 w-8" /></div>;
  if (error) return <div className="p-8 text-red-500 bg-gray-50 min-h-screen">Error: {error}</div>;
  if (!data) return null;

  const currentTemplateSections = TEMPLATE_IMAGE_SECTIONS[activeScope] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-8">
        
        {/* Editor Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Settings2 className="h-7 w-7 text-blue-500" />
              Configure Website
            </h1>
            <p className="text-gray-500 text-sm mt-1">Refine the clinic data and setup template-specific overrides.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={savingDraft || generating}
              className="flex items-center py-3 px-6 rounded-lg shadow-sm text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 transition-all justify-center"
            >
              {savingDraft && <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />}
              Save Changes
            </button>

            <button
              onClick={handleGenerate}
              disabled={savingDraft || generating}
              className="flex items-center py-3 px-8 rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition-all justify-center"
            >
              {generating && <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />}
              Save & Open Preview
            </button>
          </div>
        </div>

        {/* Global Save Messages */}
        {saveMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {saveMessage}
          </div>
        )}

        {/* Active Edit Scope Selection Selector Banner */}
        <div className="bg-blue-50/70 p-6 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Layout className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 text-sm">Active Editing Scope</h3>
              <p className="text-blue-700 text-xs mt-0.5">Select if you want to edit base defaults or overrides specific to an individual template.</p>
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <select
              value={activeScope}
              onChange={(e) => {
                setActiveScope(e.target.value);
                setSaveMessage('');
              }}
              className="w-full sm:w-80 bg-white border-2 border-blue-200 hover:border-blue-400 focus:outline-none focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm cursor-pointer"
            >
              {TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeScope !== 'base' && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Currently editing overrides for <strong>{TEMPLATE_OPTIONS.find(t => t.id === activeScope)?.name.split(' (')[0]}</strong>. Empty fields will automatically fall back to Base Defaults.</span>
          </div>
        )}

        {/* ── SECTION IMAGE ASSIGNMENT BOARD (Only for specific templates) ──── */}
        {activeScope !== 'base' && currentTemplateSections.length > 0 && (
          <div className="border border-gray-200 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Image className="w-5 h-5 text-blue-500" />
              Theme Section Image Assigner
            </h2>
            <p className="text-xs text-gray-500 mt-1">Assign custom images from your scraped media pool directly to the layout sections of this theme.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTemplateSections.map((sec) => {
                const assignedUrl = getSectionImageValue(sec.arrayKey, sec.index);
                return (
                  <div key={sec.key} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{sec.label}</h4>
                      <span className="text-[10px] text-gray-500 font-mono block mt-0.5">resolves to [{sec.arrayKey}[{sec.index}]]</span>
                    </div>

                    {/* Preview Area */}
                    <div className="aspect-video w-full rounded-lg bg-stone-900 border overflow-hidden relative flex items-center justify-center">
                      {assignedUrl ? (
                        <img src={assignedUrl} className="w-full h-full object-cover" alt={sec.label} />
                      ) : (
                        <span className="text-xs text-gray-400 italic">No custom image assigned (falls back to global)</span>
                      )}
                    </div>

                    {/* Gallery Selector Dropdown */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-gray-600 uppercase">Select Scraped Image</label>
                      <select
                        value={assignedUrl}
                        onChange={(e) => handleAssignSectionImage(sec.arrayKey, sec.index, e.target.value)}
                        className="w-full text-xs text-gray-800 border bg-white rounded-lg p-2.5"
                      >
                        <option value="">-- Fallback to Global Defaults --</option>
                        {getAllAvailableImages().map((src, sidx) => (
                          <option key={sidx} value={src}>
                            Scraped Image #{sidx + 1} ({src.substring(0, 45)}...)
                          </option>
                        ))}
                      </select>

                      <div className="pt-2">
                        <label className="block text-[11px] font-bold text-gray-600 uppercase">Or Paste Custom Image URL</label>
                        <input
                          type="text"
                          value={assignedUrl}
                          placeholder="https://example.com/custom-image.jpg"
                          onChange={(e) => handleAssignSectionImage(sec.arrayKey, sec.index, e.target.value.trim())}
                          className="w-full text-xs border bg-white rounded-lg p-2.5 mt-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Studio Data */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Studio Information
            </h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Studio Name</label>
              <input 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                value={activeScope === 'base' ? (data.clinic?.name || '') : (data.templateOverrides?.[activeScope]?.clinic?.name ?? '')} 
                placeholder={data.clinic?.name || ''}
                onChange={e => handleScopeChange('clinic', 'name', e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tagline</label>
              <input 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                value={activeScope === 'base' ? (data.clinic?.tagline || '') : (data.templateOverrides?.[activeScope]?.clinic?.tagline ?? '')} 
                placeholder={data.clinic?.tagline || ''}
                onChange={e => handleScopeChange('clinic', 'tagline', e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none" 
                rows={4} 
                value={activeScope === 'base' ? (data.clinic?.description || '') : (data.templateOverrides?.[activeScope]?.clinic?.description ?? '')} 
                placeholder={data.clinic?.description || ''}
                onChange={e => handleScopeChange('clinic', 'description', e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                value={getNestedValue('clinic', 'contact', 'phone')} 
                placeholder={data.clinic?.contact?.phone || ''}
                onChange={e => handleScopeNestedChange('clinic', 'contact', 'phone', e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address</label>
              <textarea 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none" 
                rows={2} 
                value={getNestedValue('clinic', 'address', 'full')} 
                placeholder={data.clinic?.address?.full || ''}
                onChange={e => handleScopeNestedChange('clinic', 'address', 'full', e.target.value)} 
              />
            </div>
          </div>

          {/* Column 2: Business & Designer */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              Designer & Business Meta
            </h2>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Google Rating</label>
                <input 
                  className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                  value={activeScope === 'base' ? (data.business?.rating || '') : (data.templateOverrides?.[activeScope]?.business?.rating ?? '')} 
                  placeholder={data.business?.rating || ''}
                  onChange={e => handleScopeChange('business', 'rating', e.target.value)} 
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Review Count</label>
                <input 
                  className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                  value={activeScope === 'base' ? (data.business?.reviewCount || '') : (data.templateOverrides?.[activeScope]?.business?.reviewCount ?? '')} 
                  placeholder={data.business?.reviewCount || ''}
                  onChange={e => handleScopeChange('business', 'reviewCount', e.target.value)} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Lead Designer Name</label>
              <input 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                value={activeScope === 'base' ? (data.doctor?.name || '') : (data.templateOverrides?.[activeScope]?.doctor?.name ?? '')} 
                placeholder={data.doctor?.name || ''}
                onChange={e => handleScopeChange('doctor', 'name', e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Specialization</label>
              <input 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                value={activeScope === 'base' ? (data.doctor?.specialization || '') : (data.templateOverrides?.[activeScope]?.doctor?.specialization ?? '')} 
                placeholder={data.doctor?.specialization || ''}
                onChange={e => handleScopeChange('doctor', 'specialization', e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Info</label>
              <input 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
                value={activeScope === 'base' ? (data.doctor?.experience || '') : (data.templateOverrides?.[activeScope]?.doctor?.experience ?? '')} 
                placeholder={data.doctor?.experience || ''}
                onChange={e => handleScopeChange('doctor', 'experience', e.target.value)} 
              />
            </div>
            
            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Highlights (1 per line)</label>
              <textarea 
                className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none" 
                rows={4} 
                value={getArrayValue('business', 'highlights').join('\n')} 
                placeholder={(data.business?.highlights || []).join('\n')}
                onChange={e => handleScopeArrayChange('business', 'highlights', e.target.value)} 
              />
            </div>
          </div>

          {/* Full Width: Services */}
          <div className="lg:col-span-2 space-y-4">
             <h2 className="text-xl font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-blue-500" />
               Services configuration (1 per line)
             </h2>
             <div>
                <textarea 
                  className="w-full text-gray-900 border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none" 
                  rows={6} 
                  value={getArrayValue('business', 'services').join('\n')} 
                  placeholder={(data.business?.services || []).join('\n')}
                  onChange={e => handleScopeArrayChange('business', 'services', e.target.value)} 
                />
             </div>
          </div>

          {/* Full Width: Reviews */}
          <div className="lg:col-span-2 space-y-4">
             <div className="flex justify-between items-center pb-2 border-b border-gray-100">
               <h2 className="text-xl font-bold text-gray-800">Client Reviews</h2>
               <button onClick={addScopeReview} className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                 <Plus className="w-4 h-4" /> Add Review
               </button>
             </div>

             {getReviewList().length > 0 ? (
               <div className="space-y-4">
                 {getReviewList().map((review: any, index: number) => (
                   <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                     <div className="flex items-center justify-between mb-4">
                       <h3 className="font-semibold text-gray-800">Review {index + 1}</h3>
                       <button
                         onClick={() => removeScopeReview(index)}
                         className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-2.5 py-1.5 rounded-md"
                       >
                         <Trash2 className="w-3.5 h-3.5" /> Remove
                       </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                         <input
                           className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                           value={getReviewValue(index, 'author')}
                           placeholder={data.reviews?.[index]?.author || ''}
                           onChange={e => handleScopeReviewChange(index, 'author', e.target.value)}
                         />
                       </div>

                       <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1-5)</label>
                         <input
                           type="number"
                           min={1}
                           max={5}
                           className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                           value={getReviewValue(index, 'rating')}
                           placeholder={data.reviews?.[index]?.rating ?? '5'}
                           onChange={e => handleScopeReviewChange(index, 'rating', e.target.value)}
                         />
                       </div>
                     </div>

                     <div className="mt-4">
                       <label className="block text-sm font-semibold text-gray-700 mb-1">Review Text</label>
                       <textarea
                         rows={3}
                         className="w-full text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                         value={getReviewValue(index, 'text')}
                         placeholder={data.reviews?.[index]?.text || ''}
                         onChange={e => handleScopeReviewChange(index, 'text', e.target.value)}
                       />
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-sm text-gray-500 italic p-4 bg-gray-50 border border-gray-100 rounded-lg">
                 No reviews available. Click Add Review to include one.
               </p>
             )}
          </div>

          {/* Full Width: Scraped Media */}
          <div className="lg:col-span-2 space-y-6 mt-4">
             <div className="flex justify-between items-center pb-2 border-b border-gray-100">
               <h2 className="text-xl font-bold text-gray-800">Media Pool Manager (Scraped Gallery)</h2>
               <button onClick={addImageUrl} className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                 <Plus className="w-4 h-4" /> Add External Image URL
               </button>
             </div>
             
             <div className="space-y-8">
                 {/* Hero Images Section */}
                 <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                   <h3 className="text-md font-bold text-blue-900 mb-3 flex items-center gap-2">
                     <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                     Base Defaults Hero Section Slides (Max 5)
                   </h3>
                   <div className="flex flex-wrap gap-4">
                     {data.media?.clinicImages?.length > 0 ? data.media.clinicImages.map((src: string, i: number) => (
                       <div key={i} className="relative group">
                         <img src={src} className="w-40 h-40 object-cover rounded-lg border-2 border-blue-300 shadow-sm" alt={`Hero ${i}`} />
                         <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => {
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
                           }} className="bg-white/90 hover:bg-white p-1.5 rounded-md shadow text-gray-600 tooltip" title="Demote from Hero">
                             ↓
                           </button>
                           <button onClick={() => removeImage('clinicImages', i)} className="bg-red-500/90 hover:bg-red-600 p-1.5 rounded-md shadow text-white" title="Delete">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                     )) : <p className="text-sm text-gray-500 italic p-4">No hero images selected.</p>}
                   </div>
                 </div>

                 {/* Project Images Section */}
                 <div>
                   <h3 className="text-md font-semibold text-gray-700 mb-3">Stored Gallery Images (Projects)</h3>
                   <div className="flex flex-wrap gap-4">
                     {data.media?.treatmentImages?.length > 0 ? data.media.treatmentImages.map((src: string, i: number) => (
                       <div key={i} className="relative group">
                         <img src={src} className="w-32 h-32 object-cover rounded-lg border border-gray-200" alt="Project" />
                         <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => makeHero('treatmentImages', i)} className="bg-blue-500/90 hover:bg-blue-600 p-1.5 rounded-md shadow text-white" title="Set as Hero">
                             <Star className="w-4 h-4" />
                           </button>
                           <button onClick={() => removeImage('treatmentImages', i)} className="bg-red-500/90 hover:bg-red-600 p-1.5 rounded-md shadow text-white" title="Delete">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                     )) : <p className="text-sm text-gray-400">No project images found</p>}
                   </div>
                 </div>

                 {/* Other/External Images Section */}
                 <div>
                   <h3 className="text-md font-semibold text-gray-700 mb-3">Other & External Images</h3>
                   <div className="flex flex-wrap gap-4">
                     {data.media?.otherImages?.length > 0 ? data.media.otherImages.map((src: string, i: number) => (
                       <div key={i} className="relative group">
                         <img src={src} className="w-32 h-32 object-cover rounded-lg border border-gray-200" alt="Other" />
                         <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => makeHero('otherImages', i)} className="bg-blue-500/90 hover:bg-blue-600 p-1.5 rounded-md shadow text-white" title="Set as Hero">
                             <Star className="w-4 h-4" />
                           </button>
                           <button onClick={() => removeImage('otherImages', i)} className="bg-red-500/90 hover:bg-red-600 p-1.5 rounded-md shadow text-white" title="Delete">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                     )) : <p className="text-sm text-gray-400">No other images available</p>}
                   </div>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
