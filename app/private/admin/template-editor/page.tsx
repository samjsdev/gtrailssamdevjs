'use client';

import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Braces,
  Copy,
  FileImage,
  FileText,
  GalleryHorizontal,
  Image as ImageIcon,
  Layers,
  LayoutTemplate,
  PanelRight,
  Plus,
  Trash2,
  Type,
  Upload,
} from 'lucide-react';

type TextTag = 'eyebrow' | 'heading' | 'subheading' | 'paragraph' | 'button' | 'listItem' | 'stat' | 'caption';
type SectionType = 'hero' | 'split' | 'featureGrid' | 'gallery' | 'contact' | 'footer' | 'contentBand';
type ImageRole = 'image' | 'background' | 'icon';

type ElementStyle = {
  color?: string;
  background?: string;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
};

type BaseElement = {
  id: string;
  label: string;
  style?: ElementStyle;
};

type TextElement = BaseElement & {
  kind: 'text';
  tag: TextTag;
  content: string;
};

type ImageElement = BaseElement & {
  kind: 'image';
  role: ImageRole;
  src: string;
  alt: string;
};

type TemplateElement = TextElement | ImageElement;

type TemplateSection = {
  id: string;
  name: string;
  type: SectionType;
  settings: {
    background: string;
    accent: string;
    spacing: 'compact' | 'normal' | 'generous';
  };
  elements: TemplateElement[];
};

type TemplatePage = {
  id: string;
  name: string;
  slug: string;
  sections: TemplateSection[];
};

type TemplateDocument = {
  schemaVersion: '1.0.0';
  id: string;
  name: string;
  theme: {
    fontHeading: string;
    fontBody: string;
    radius: number;
  };
  pages: TemplatePage[];
};

type Selection = {
  pageId: string;
  sectionId: string;
  elementId?: string;
};

const pageNames = ['Home', 'About', 'Services', 'Gallery', 'Contact'];

const initialTemplate: TemplateDocument = {
  schemaVersion: '1.0.0',
  id: 'interior-studio-template',
  name: 'Interior Studio Editorial',
  theme: {
    fontHeading: 'Georgia',
    fontBody: 'Inter',
    radius: 8,
  },
  pages: [
    {
      id: 'page-home',
      name: 'Home',
      slug: '/',
      sections: [
        {
          id: 'home-hero',
          name: 'Hero Section',
          type: 'hero',
          settings: { background: '#101820', accent: '#d85c47', spacing: 'generous' },
          elements: [
            {
              id: 'home-hero-bg',
              kind: 'image',
              role: 'background',
              label: 'Hero background image',
              src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600',
              alt: 'Warm kitchen and dining interior with wood finishes',
            },
            { id: 'home-hero-eyebrow', kind: 'text', tag: 'eyebrow', label: 'Hero eyebrow', content: 'Boutique interior studio' },
            { id: 'home-hero-title', kind: 'text', tag: 'heading', label: 'Hero heading', content: 'Rooms that feel composed, lived in, and quietly exact.' },
            {
              id: 'home-hero-copy',
              kind: 'text',
              tag: 'paragraph',
              label: 'Hero paragraph',
              content: 'A full-service template for studios that need elegant pages, editable narratives, and image-led project storytelling.',
            },
            { id: 'home-hero-cta', kind: 'text', tag: 'button', label: 'Primary button label', content: 'Start a project' },
          ],
        },
        {
          id: 'home-services',
          name: 'Services Preview',
          type: 'featureGrid',
          settings: { background: '#f7f2eb', accent: '#007c72', spacing: 'normal' },
          elements: [
            { id: 'home-services-title', kind: 'text', tag: 'heading', label: 'Section heading', content: 'Design services built around real decisions.' },
            { id: 'home-services-subtitle', kind: 'text', tag: 'paragraph', label: 'Section intro', content: 'Each service card is stored as editable text and media rather than component copy.' },
            { id: 'home-service-1-title', kind: 'text', tag: 'subheading', label: 'Card 1 title', content: 'Residential concepts' },
            { id: 'home-service-1-copy', kind: 'text', tag: 'paragraph', label: 'Card 1 description', content: 'Spatial planning, palettes, fixtures, and procurement direction.' },
            {
              id: 'home-service-1-icon',
              kind: 'image',
              role: 'icon',
              label: 'Card 1 icon',
              src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=500',
              alt: 'Soft neutral living room detail',
            },
            { id: 'home-service-2-title', kind: 'text', tag: 'subheading', label: 'Card 2 title', content: 'Retail and hospitality' },
            { id: 'home-service-2-copy', kind: 'text', tag: 'paragraph', label: 'Card 2 description', content: 'Guest journeys, mood systems, and operational layouts for public interiors.' },
            {
              id: 'home-service-2-icon',
              kind: 'image',
              role: 'icon',
              label: 'Card 2 icon',
              src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=500',
              alt: 'Wood ceiling and architectural interior detail',
            },
          ],
        },
        {
          id: 'home-footer',
          name: 'Footer',
          type: 'footer',
          settings: { background: '#101820', accent: '#f0b44c', spacing: 'compact' },
          elements: [
            { id: 'home-footer-name', kind: 'text', tag: 'subheading', label: 'Footer studio name', content: 'GTrails Studio' },
            { id: 'home-footer-line', kind: 'text', tag: 'paragraph', label: 'Footer line', content: 'Editorial interiors, material strategy, and site-ready template systems.' },
          ],
        },
      ],
    },
    {
      id: 'page-about',
      name: 'About',
      slug: '/about',
      sections: [
        {
          id: 'about-story',
          name: 'Studio Story',
          type: 'split',
          settings: { background: '#fbfaf7', accent: '#d85c47', spacing: 'normal' },
          elements: [
            {
              id: 'about-story-image',
              kind: 'image',
              role: 'image',
              label: 'Studio portrait image',
              src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200',
              alt: 'Interior design studio table with plans and samples',
            },
            { id: 'about-story-title', kind: 'text', tag: 'heading', label: 'Story heading', content: 'A practice shaped by proportion, restraint, and practical comfort.' },
            {
              id: 'about-story-copy',
              kind: 'text',
              tag: 'paragraph',
              label: 'Story copy',
              content: 'The editor treats every sentence and image as a first-class node, so brand teams can refine a page without opening component files.',
            },
          ],
        },
      ],
    },
    {
      id: 'page-services',
      name: 'Services',
      slug: '/services',
      sections: [
        {
          id: 'services-catalog',
          name: 'Services Catalog',
          type: 'contentBand',
          settings: { background: '#eef4f1', accent: '#007c72', spacing: 'normal' },
          elements: [
            { id: 'services-title', kind: 'text', tag: 'heading', label: 'Services heading', content: 'From first sketch to final styling.' },
            { id: 'services-item-1', kind: 'text', tag: 'listItem', label: 'Service item 1', content: 'Concept design and material palettes' },
            { id: 'services-item-2', kind: 'text', tag: 'listItem', label: 'Service item 2', content: 'Furniture schedules and procurement' },
            { id: 'services-item-3', kind: 'text', tag: 'listItem', label: 'Service item 3', content: 'Site styling and handover direction' },
          ],
        },
      ],
    },
    {
      id: 'page-gallery',
      name: 'Gallery',
      slug: '/gallery',
      sections: [
        {
          id: 'gallery-featured',
          name: 'Gallery Grid',
          type: 'gallery',
          settings: { background: '#fbfaf7', accent: '#d85c47', spacing: 'normal' },
          elements: [
            { id: 'gallery-title', kind: 'text', tag: 'heading', label: 'Gallery heading', content: 'Recent room studies' },
            {
              id: 'gallery-image-1',
              kind: 'image',
              role: 'image',
              label: 'Gallery image 1',
              src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=900',
              alt: 'Minimal interior corridor with warm lighting',
            },
            { id: 'gallery-caption-1', kind: 'text', tag: 'caption', label: 'Gallery caption 1', content: 'Warm corridor palette' },
            {
              id: 'gallery-image-2',
              kind: 'image',
              role: 'image',
              label: 'Gallery image 2',
              src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=900',
              alt: 'Contemporary living room with a neutral sofa',
            },
            { id: 'gallery-caption-2', kind: 'text', tag: 'caption', label: 'Gallery caption 2', content: 'Layered living room' },
          ],
        },
      ],
    },
    {
      id: 'page-contact',
      name: 'Contact',
      slug: '/contact',
      sections: [
        {
          id: 'contact-panel',
          name: 'Contact Panel',
          type: 'contact',
          settings: { background: '#101820', accent: '#f0b44c', spacing: 'normal' },
          elements: [
            { id: 'contact-title', kind: 'text', tag: 'heading', label: 'Contact heading', content: 'Let the next room begin with a clear brief.' },
            { id: 'contact-phone', kind: 'text', tag: 'paragraph', label: 'Phone number', content: '+91 98765 43210' },
            { id: 'contact-email', kind: 'text', tag: 'paragraph', label: 'Email address', content: 'studio@gtrails.example' },
            { id: 'contact-address', kind: 'text', tag: 'paragraph', label: 'Studio address', content: 'Indiranagar, Bengaluru' },
          ],
        },
      ],
    },
  ],
};

const architectureItems = [
  'TemplateEditor: owns TemplateDocument state, active page, section selection, and element selection.',
  'PageTabs and SectionNavigator: switch page context and manage stacked sections.',
  'PageRenderer: renders a page from JSON only; it receives selection callbacks from the editor.',
  'SectionRenderer: chooses a layout by section.type and maps section.elements into editable nodes.',
  'EditableText and EditableImage: selectable leaf components that expose element IDs to the properties panel.',
  'InspectorPanel: context-aware controls for selected section, text node, or image node.',
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function createBlankSection(): TemplateSection {
  const sectionId = makeId('section');
  return {
    id: sectionId,
    name: 'New Content Section',
    type: 'contentBand',
    settings: { background: '#ffffff', accent: '#d85c47', spacing: 'normal' },
    elements: [
      {
        id: makeId('text'),
        kind: 'text',
        tag: 'heading',
        label: 'Heading',
        content: 'New editable heading',
      },
      {
        id: makeId('text'),
        kind: 'text',
        tag: 'paragraph',
        label: 'Paragraph',
        content: 'Add the section copy here.',
      },
    ],
  };
}

export default function TemplateEditorPage() {
  const [template, setTemplate] = useState<TemplateDocument>(initialTemplate);
  const [activePageId, setActivePageId] = useState(initialTemplate.pages[0].id);
  const [selection, setSelection] = useState<Selection>({
    pageId: initialTemplate.pages[0].id,
    sectionId: initialTemplate.pages[0].sections[0].id,
    elementId: initialTemplate.pages[0].sections[0].elements[1].id,
  });

  const activePage = useMemo(
    () => template.pages.find((page) => page.id === activePageId) ?? template.pages[0],
    [activePageId, template.pages],
  );

  const selectedSection = useMemo(
    () => activePage.sections.find((section) => section.id === selection.sectionId) ?? activePage.sections[0],
    [activePage.sections, selection.sectionId],
  );

  const selectedElement = useMemo(
    () => selectedSection?.elements.find((element) => element.id === selection.elementId),
    [selectedSection, selection.elementId],
  );

  const selectPage = (pageId: string) => {
    const page = template.pages.find((item) => item.id === pageId);
    if (!page) return;

    setActivePageId(pageId);
    setSelection({
      pageId,
      sectionId: page.sections[0]?.id ?? '',
      elementId: page.sections[0]?.elements[0]?.id,
    });
  };

  const updatePage = (pageId: string, updater: (page: TemplatePage) => TemplatePage) => {
    setTemplate((current) => ({
      ...current,
      pages: current.pages.map((page) => (page.id === pageId ? updater(page) : page)),
    }));
  };

  const updateSection = (pageId: string, sectionId: string, patch: Partial<TemplateSection>) => {
    updatePage(pageId, (page) => ({
      ...page,
      sections: page.sections.map((section) => (section.id === sectionId ? { ...section, ...patch } : section)),
    }));
  };

  const updateElement = (pageId: string, sectionId: string, elementId: string, patch: Partial<TemplateElement>) => {
    updatePage(pageId, (page) => ({
      ...page,
      sections: page.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              elements: section.elements.map((element) =>
                element.id === elementId ? ({ ...element, ...patch } as TemplateElement) : element,
              ),
            }
          : section,
      ),
    }));
  };

  const addSection = () => {
    const section = createBlankSection();
    updatePage(activePage.id, (page) => ({ ...page, sections: [...page.sections, section] }));
    setSelection({ pageId: activePage.id, sectionId: section.id, elementId: section.elements[0].id });
  };

  const removeSection = (sectionId: string) => {
    if (activePage.sections.length <= 1) return;

    updatePage(activePage.id, (page) => {
      const nextSections = page.sections.filter((section) => section.id !== sectionId);
      return { ...page, sections: nextSections };
    });

    const fallback = activePage.sections.find((section) => section.id !== sectionId);
    if (fallback) {
      setSelection({ pageId: activePage.id, sectionId: fallback.id, elementId: fallback.elements[0]?.id });
    }
  };

  const moveSection = (sectionId: string, direction: -1 | 1) => {
    const currentIndex = activePage.sections.findIndex((section) => section.id === sectionId);
    const targetIndex = currentIndex + direction;
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= activePage.sections.length) return;

    updatePage(activePage.id, (page) => {
      const sections = [...page.sections];
      const [section] = sections.splice(currentIndex, 1);
      sections.splice(targetIndex, 0, section);
      return { ...page, sections };
    });
  };

  const addElement = (kind: 'text' | 'image') => {
    if (!selectedSection) return;

    const element: TemplateElement =
      kind === 'text'
        ? {
            id: makeId('text'),
            kind: 'text',
            tag: 'paragraph',
            label: 'New text',
            content: 'Editable text node',
          }
        : {
            id: makeId('image'),
            kind: 'image',
            role: 'image',
            label: 'New image',
            src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=900',
            alt: 'Editable interior image',
          };

    updateSection(activePage.id, selectedSection.id, { elements: [...selectedSection.elements, element] });
    setSelection({ pageId: activePage.id, sectionId: selectedSection.id, elementId: element.id });
  };

  const removeElement = (elementId: string) => {
    if (!selectedSection || selectedSection.elements.length <= 1) return;

    const nextElements = selectedSection.elements.filter((element) => element.id !== elementId);
    updateSection(activePage.id, selectedSection.id, { elements: nextElements });
    setSelection({ pageId: activePage.id, sectionId: selectedSection.id, elementId: nextElements[0]?.id });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, element: ImageElement) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateElement(activePage.id, selectedSection.id, element.id, { src: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(template, null, 2));
  };

  return (
    <div className="min-h-full bg-[#ede7dc] text-[#101820]">
      <header className="border-b border-[#101820]/10 bg-[#fbfaf7]/95 px-4 py-4 backdrop-blur md:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d85c47]">
              <LayoutTemplate className="h-4 w-4" />
              Template Editor
            </div>
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-normal md:text-4xl">
              Multi-page section builder
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#101820]/65">
              A working editor demonstration where pages, sections, text, images, alt text, and visual settings all come from a single JSON state tree.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {template.pages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => selectPage(page.id)}
                className={cx(
                  'rounded-lg border px-4 py-2 text-sm font-semibold transition',
                  page.id === activePage.id
                    ? 'border-[#101820] bg-[#101820] text-white shadow-sm'
                    : 'border-[#101820]/15 bg-white text-[#101820] hover:border-[#d85c47]',
                )}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-132px)] grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="border-b border-[#101820]/10 bg-[#f7f2eb] p-4 xl:border-b-0 xl:border-r">
          <PanelTitle icon={<Layers className="h-4 w-4" />} title="Sections" />
          <div className="mt-4 space-y-2">
            {activePage.sections.map((section, index) => (
              <button
                type="button"
                key={section.id}
                onClick={() =>
                  setSelection({
                    pageId: activePage.id,
                    sectionId: section.id,
                    elementId: section.elements[0]?.id,
                  })
                }
                className={cx(
                  'group w-full rounded-lg border bg-white p-3 text-left transition',
                  selection.sectionId === section.id ? 'border-[#101820] shadow-sm' : 'border-[#101820]/10 hover:border-[#d85c47]/70',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#101820]/45">
                      {String(index + 1).padStart(2, '0')} / {section.type}
                    </div>
                    <div className="mt-1 text-sm font-bold text-[#101820]">{section.name}</div>
                    <div className="mt-1 text-xs text-[#101820]/55">{section.elements.length} editable elements</div>
                  </div>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: section.settings.accent }} />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <IconButton label="Move section up" onClick={() => moveSection(selectedSection.id, -1)} disabled={!selectedSection}>
              <ArrowUp className="h-4 w-4" />
            </IconButton>
            <IconButton label="Move section down" onClick={() => moveSection(selectedSection.id, 1)} disabled={!selectedSection}>
              <ArrowDown className="h-4 w-4" />
            </IconButton>
            <IconButton label="Remove section" onClick={() => removeSection(selectedSection.id)} disabled={activePage.sections.length <= 1}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>

          <button
            type="button"
            onClick={addSection}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#101820] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#26313a]"
          >
            <Plus className="h-4 w-4" />
            Add section
          </button>

          <div className="mt-6 rounded-lg border border-[#101820]/10 bg-white p-3">
            <PanelTitle icon={<FileText className="h-4 w-4" />} title="Component Architecture" />
            <ul className="mt-3 space-y-2 text-xs leading-5 text-[#101820]/65">
              {architectureItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="min-w-0 p-4 md:p-6">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-[#101820]/15 bg-white shadow-xl shadow-[#101820]/10">
            <div className="flex flex-col gap-3 border-b border-[#101820]/10 bg-[#101820] px-4 py-3 text-white md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <GalleryHorizontal className="h-4 w-4 text-[#f0b44c]" />
                Canvas Preview / {activePage.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {pageNames.map((name) => (
                  <span
                    key={name}
                    className={cx(
                      'rounded-md px-2.5 py-1 text-xs font-semibold',
                      activePage.name === name ? 'bg-[#f0b44c] text-[#101820]' : 'bg-white/10 text-white/70',
                    )}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <PageRenderer
              page={activePage}
              selection={selection}
              onSelectSection={(sectionId) => setSelection({ pageId: activePage.id, sectionId, elementId: undefined })}
              onSelectElement={(sectionId, elementId) => setSelection({ pageId: activePage.id, sectionId, elementId })}
            />
          </div>

          <div className="mt-6 rounded-lg border border-[#101820]/15 bg-[#101820] p-4 text-white">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <PanelTitle icon={<Braces className="h-4 w-4" />} title="JSON Data Model" inverted />
              <button
                type="button"
                onClick={copyJson}
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#101820] transition hover:bg-[#f0b44c]"
              >
                <Copy className="h-4 w-4" />
                Copy JSON
              </button>
            </div>
            <pre className="mt-4 max-h-96 overflow-auto rounded-md bg-black/30 p-4 text-xs leading-5 text-[#f7f2eb]">
              {JSON.stringify(template, null, 2)}
            </pre>
          </div>
        </section>

        <aside className="border-t border-[#101820]/10 bg-[#fbfaf7] p-4 xl:border-l xl:border-t-0">
          <PanelTitle icon={<PanelRight className="h-4 w-4" />} title="Inspector" />
          {selectedSection ? (
            <div className="mt-4 space-y-5">
              <div className="rounded-lg border border-[#101820]/10 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#101820]/45">Section</div>
                    <div className="mt-1 text-sm font-bold">{selectedSection.name}</div>
                  </div>
                  <Layers className="h-5 w-5 text-[#d85c47]" />
                </div>
                <div className="mt-4 space-y-3">
                  <Field label="Name">
                    <input
                      value={selectedSection.name}
                      onChange={(event) => updateSection(activePage.id, selectedSection.id, { name: event.target.value })}
                      className="control-input"
                    />
                  </Field>
                  <Field label="Layout type">
                    <select
                      value={selectedSection.type}
                      onChange={(event) => updateSection(activePage.id, selectedSection.id, { type: event.target.value as SectionType })}
                      className="control-input"
                    >
                      {['hero', 'split', 'featureGrid', 'gallery', 'contact', 'footer', 'contentBand'].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Background">
                      <input
                        type="color"
                        value={selectedSection.settings.background}
                        onChange={(event) =>
                          updateSection(activePage.id, selectedSection.id, {
                            settings: { ...selectedSection.settings, background: event.target.value },
                          })
                        }
                        className="h-10 w-full rounded-md border border-[#101820]/15 bg-white"
                      />
                    </Field>
                    <Field label="Accent">
                      <input
                        type="color"
                        value={selectedSection.settings.accent}
                        onChange={(event) =>
                          updateSection(activePage.id, selectedSection.id, {
                            settings: { ...selectedSection.settings, accent: event.target.value },
                          })
                        }
                        className="h-10 w-full rounded-md border border-[#101820]/15 bg-white"
                      />
                    </Field>
                  </div>
                  <Field label="Spacing">
                    <select
                      value={selectedSection.settings.spacing}
                      onChange={(event) =>
                        updateSection(activePage.id, selectedSection.id, {
                          settings: { ...selectedSection.settings, spacing: event.target.value as TemplateSection['settings']['spacing'] },
                        })
                      }
                      className="control-input"
                    >
                      <option value="compact">compact</option>
                      <option value="normal">normal</option>
                      <option value="generous">generous</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div className="rounded-lg border border-[#101820]/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#101820]/45">Elements</div>
                    <div className="mt-1 text-sm text-[#101820]/60">Select any text or image in the canvas.</div>
                  </div>
                  <div className="flex gap-2">
                    <IconButton label="Add text" onClick={() => addElement('text')}>
                      <Type className="h-4 w-4" />
                    </IconButton>
                    <IconButton label="Add image" onClick={() => addElement('image')}>
                      <ImageIcon className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {selectedSection.elements.map((element) => (
                    <button
                      type="button"
                      key={element.id}
                      onClick={() => setSelection({ pageId: activePage.id, sectionId: selectedSection.id, elementId: element.id })}
                      className={cx(
                        'flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-xs transition',
                        selectedElement?.id === element.id ? 'border-[#d85c47] bg-[#fff7f2]' : 'border-[#101820]/10 hover:border-[#d85c47]/60',
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {element.kind === 'text' ? <Type className="h-4 w-4 shrink-0" /> : <FileImage className="h-4 w-4 shrink-0" />}
                        <span className="truncate font-semibold">{element.label}</span>
                      </span>
                      <span className="shrink-0 text-[#101820]/45">{element.kind}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedElement ? (
                <ElementInspector
                  element={selectedElement}
                  canRemove={selectedSection.elements.length > 1}
                  onPatch={(patch) => updateElement(activePage.id, selectedSection.id, selectedElement.id, patch)}
                  onRemove={() => removeElement(selectedElement.id)}
                  onUpload={(event) =>
                    selectedElement.kind === 'image' ? handleImageUpload(event, selectedElement) : undefined
                  }
                />
              ) : (
                <div className="rounded-lg border border-dashed border-[#101820]/20 bg-white p-5 text-sm text-[#101820]/60">
                  Select an element in the canvas or element list to edit its content, image URL, upload, and alt text.
                </div>
              )}
            </div>
          ) : null}
        </aside>
      </main>
    </div>
  );
}

function PanelTitle({ icon, title, inverted = false }: { icon: React.ReactNode; title: string; inverted?: boolean }) {
  return (
    <div className={cx('flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]', inverted ? 'text-white/80' : 'text-[#101820]/60')}>
      {icon}
      {title}
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 items-center justify-center rounded-lg border border-[#101820]/10 bg-white text-[#101820] transition hover:border-[#d85c47] hover:text-[#d85c47] disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#101820]/45">{label}</span>
      {children}
    </label>
  );
}

function ElementInspector({
  element,
  canRemove,
  onPatch,
  onRemove,
  onUpload,
}: {
  element: TemplateElement;
  canRemove: boolean;
  onPatch: (patch: Partial<TemplateElement>) => void;
  onRemove: () => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-lg border border-[#101820]/10 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#101820]/45">{element.kind} node</div>
          <div className="mt-1 text-sm font-bold">{element.label}</div>
        </div>
        <button
          type="button"
          title="Remove element"
          aria-label="Remove element"
          disabled={!canRemove}
          onClick={onRemove}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#101820]/10 text-[#101820] transition hover:border-[#d85c47] hover:text-[#d85c47] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <Field label="Editor label">
          <input value={element.label} onChange={(event) => onPatch({ label: event.target.value })} className="control-input" />
        </Field>

        {element.kind === 'text' ? (
          <>
            <Field label="Text role">
              <select value={element.tag} onChange={(event) => onPatch({ tag: event.target.value as TextTag })} className="control-input">
                {['eyebrow', 'heading', 'subheading', 'paragraph', 'button', 'listItem', 'stat', 'caption'].map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Content">
              <textarea
                value={element.content}
                rows={5}
                onChange={(event) => onPatch({ content: event.target.value })}
                className="control-input resize-none"
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="Image role">
              <select value={element.role} onChange={(event) => onPatch({ role: event.target.value as ImageRole })} className="control-input">
                <option value="image">image</option>
                <option value="background">background</option>
                <option value="icon">icon</option>
              </select>
            </Field>
            <Field label="Source URL">
              <input value={element.src} onChange={(event) => onPatch({ src: event.target.value })} className="control-input" />
            </Field>
            <Field label="Alt text">
              <textarea value={element.alt} rows={3} onChange={(event) => onPatch({ alt: event.target.value })} className="control-input resize-none" />
            </Field>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#101820]/25 bg-[#fbfaf7] px-4 py-3 text-sm font-bold text-[#101820] transition hover:border-[#d85c47] hover:text-[#d85c47]">
              <Upload className="h-4 w-4" />
              Upload image
              <input type="file" accept="image/*" onChange={onUpload} className="sr-only" />
            </label>
          </>
        )}
      </div>
    </div>
  );
}

function PageRenderer({
  page,
  selection,
  onSelectSection,
  onSelectElement,
}: {
  page: TemplatePage;
  selection: Selection;
  onSelectSection: (sectionId: string) => void;
  onSelectElement: (sectionId: string, elementId: string) => void;
}) {
  return (
    <div className="bg-white">
      {page.sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          isSelected={selection.sectionId === section.id && !selection.elementId}
          selectedElementId={selection.sectionId === section.id ? selection.elementId : undefined}
          onSelectSection={onSelectSection}
          onSelectElement={onSelectElement}
        />
      ))}
    </div>
  );
}

function SectionRenderer({
  section,
  isSelected,
  selectedElementId,
  onSelectSection,
  onSelectElement,
}: {
  section: TemplateSection;
  isSelected: boolean;
  selectedElementId?: string;
  onSelectSection: (sectionId: string) => void;
  onSelectElement: (sectionId: string, elementId: string) => void;
}) {
  const textElements = section.elements.filter((element): element is TextElement => element.kind === 'text');
  const imageElements = section.elements.filter((element): element is ImageElement => element.kind === 'image');
  const background = imageElements.find((element) => element.role === 'background');

  const sectionStyle = {
    backgroundColor: section.settings.background,
    '--section-accent': section.settings.accent,
  } as React.CSSProperties;

  const sectionPadding = section.settings.spacing === 'generous' ? 'py-24 md:py-32' : section.settings.spacing === 'compact' ? 'py-10' : 'py-16';

  const handleSectionClick = () => onSelectSection(section.id);
  const handleElementClick = (event: MouseEvent, elementId: string) => {
    event.stopPropagation();
    onSelectElement(section.id, elementId);
  };

  if (section.type === 'hero') {
    return (
      <section
        onClick={handleSectionClick}
        className={cx('group/section relative cursor-pointer overflow-hidden px-6 text-white outline-offset-[-4px]', sectionPadding, isSelected && 'outline outline-2 outline-[#d85c47]')}
        style={sectionStyle}
      >
        {background ? (
          <EditableImage element={background} selected={selectedElementId === background.id} onClick={handleElementClick} background />
        ) : null}
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="max-w-3xl">
            {textElements.map((element) => (
              <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} inverse />
            ))}
          </div>
        </div>
        <SectionBadge name={section.name} />
      </section>
    );
  }

  if (section.type === 'split') {
    return (
      <section
        onClick={handleSectionClick}
        className={cx('relative cursor-pointer px-6 outline-offset-[-4px]', sectionPadding, isSelected && 'outline outline-2 outline-[#d85c47]')}
        style={sectionStyle}
      >
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden rounded-lg">
            {imageElements.map((element) => (
              <EditableImage key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
            ))}
          </div>
          <div>
            {textElements.map((element) => (
              <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
            ))}
          </div>
        </div>
        <SectionBadge name={section.name} />
      </section>
    );
  }

  if (section.type === 'featureGrid') {
    const intro = textElements.slice(0, 2);
    const cardElements = section.elements.slice(2);

    return (
      <section
        onClick={handleSectionClick}
        className={cx('relative cursor-pointer px-6 outline-offset-[-4px]', sectionPadding, isSelected && 'outline outline-2 outline-[#d85c47]')}
        style={sectionStyle}
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            {intro.map((element) => (
              <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {chunkElements(cardElements, 3).map((items, index) => (
              <div key={index} className="rounded-lg border border-[#101820]/10 bg-white/75 p-5">
                {items.map((element) =>
                  element.kind === 'text' ? (
                    <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
                  ) : (
                    <EditableImage key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} compact />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <SectionBadge name={section.name} />
      </section>
    );
  }

  if (section.type === 'gallery') {
    return (
      <section
        onClick={handleSectionClick}
        className={cx('relative cursor-pointer px-6 outline-offset-[-4px]', sectionPadding, isSelected && 'outline outline-2 outline-[#d85c47]')}
        style={sectionStyle}
      >
        <div className="mx-auto max-w-5xl">
          {textElements.slice(0, 1).map((element) => (
            <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
          ))}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {imageElements.map((element, index) => {
              const caption = textElements.slice(1)[index];
              return (
                <figure key={element.id} className="overflow-hidden rounded-lg bg-white">
                  <EditableImage element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
                  {caption ? (
                    <figcaption className="p-3">
                      <EditableText element={caption} selected={selectedElementId === caption.id} onClick={handleElementClick} />
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </div>
        <SectionBadge name={section.name} />
      </section>
    );
  }

  if (section.type === 'contact' || section.type === 'footer') {
    const inverse = section.type === 'contact' || section.type === 'footer';
    return (
      <section
        onClick={handleSectionClick}
        className={cx('relative cursor-pointer px-6 outline-offset-[-4px]', sectionPadding, inverse && 'text-white', isSelected && 'outline outline-2 outline-[#d85c47]')}
        style={sectionStyle}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2">
            {textElements.map((element) => (
              <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} inverse={inverse} />
            ))}
          </div>
        </div>
        <SectionBadge name={section.name} />
      </section>
    );
  }

  return (
    <section
      onClick={handleSectionClick}
      className={cx('relative cursor-pointer px-6 outline-offset-[-4px]', sectionPadding, isSelected && 'outline outline-2 outline-[#d85c47]')}
      style={sectionStyle}
    >
      <div className="mx-auto max-w-5xl">
        {section.elements.map((element) =>
          element.kind === 'text' ? (
            <EditableText key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
          ) : (
            <EditableImage key={element.id} element={element} selected={selectedElementId === element.id} onClick={handleElementClick} />
          ),
        )}
      </div>
      <SectionBadge name={section.name} />
    </section>
  );
}

function SectionBadge({ name }: { name: string }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-[#101820] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white opacity-0 transition group-hover/section:opacity-100">
      {name}
    </div>
  );
}

function EditableText({
  element,
  selected,
  onClick,
  inverse = false,
}: {
  element: TextElement;
  selected: boolean;
  onClick: (event: MouseEvent, elementId: string) => void;
  inverse?: boolean;
}) {
  const common = cx(
    'rounded-md outline-offset-4 transition hover:outline hover:outline-2 hover:outline-[var(--section-accent)]',
    selected && 'outline outline-2 outline-[#d85c47]',
  );

  const style = element.style as React.CSSProperties | undefined;
  const handleClick = (event: MouseEvent) => onClick(event, element.id);

  if (element.tag === 'eyebrow') {
    return (
      <p onClick={handleClick} style={style} className={cx(common, 'mb-4 text-xs font-black uppercase tracking-[0.24em]', inverse ? 'text-white/75' : 'text-[#d85c47]')}>
        {element.content}
      </p>
    );
  }

  if (element.tag === 'heading') {
    return (
      <h2 onClick={handleClick} style={style} className={cx(common, 'mb-4 font-serif text-4xl font-semibold leading-tight tracking-normal md:text-6xl', inverse ? 'text-white' : 'text-[#101820]')}>
        {element.content}
      </h2>
    );
  }

  if (element.tag === 'subheading') {
    return (
      <h3 onClick={handleClick} style={style} className={cx(common, 'mb-2 text-xl font-bold leading-snug', inverse ? 'text-white' : 'text-[#101820]')}>
        {element.content}
      </h3>
    );
  }

  if (element.tag === 'button') {
    return (
      <span
        onClick={handleClick}
        style={style}
        className={cx(common, 'mt-5 inline-flex rounded-lg bg-[var(--section-accent)] px-5 py-3 text-sm font-black text-white shadow-sm')}
      >
        {element.content}
      </span>
    );
  }

  if (element.tag === 'listItem') {
    return (
      <p onClick={handleClick} style={style} className={cx(common, 'mb-3 border-l-4 border-[var(--section-accent)] bg-white/60 px-4 py-3 text-base font-semibold', inverse ? 'text-white' : 'text-[#101820]')}>
        {element.content}
      </p>
    );
  }

  if (element.tag === 'stat') {
    return (
      <p onClick={handleClick} style={style} className={cx(common, 'mb-3 text-3xl font-black text-[var(--section-accent)]')}>
        {element.content}
      </p>
    );
  }

  if (element.tag === 'caption') {
    return (
      <p onClick={handleClick} style={style} className={cx(common, 'text-sm font-bold uppercase tracking-[0.14em]', inverse ? 'text-white/70' : 'text-[#101820]/55')}>
        {element.content}
      </p>
    );
  }

  return (
    <p onClick={handleClick} style={style} className={cx(common, 'mb-4 max-w-2xl text-base leading-7 md:text-lg', inverse ? 'text-white/78' : 'text-[#101820]/68')}>
      {element.content}
    </p>
  );
}

function EditableImage({
  element,
  selected,
  onClick,
  background = false,
  compact = false,
}: {
  element: ImageElement;
  selected: boolean;
  onClick: (event: MouseEvent, elementId: string) => void;
  background?: boolean;
  compact?: boolean;
}) {
  if (background) {
    return (
      <button
        type="button"
        aria-label={element.label}
        onClick={(event) => onClick(event, element.id)}
        className={cx('absolute inset-0 h-full w-full', selected && 'outline outline-4 outline-[#d85c47] outline-offset-[-4px]')}
      >
        <img src={element.src} alt={element.alt} className="h-full w-full object-cover opacity-45" />
        <span className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/80 to-[#101820]/15" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={element.label}
      onClick={(event) => onClick(event, element.id)}
      className={cx(
        'block w-full overflow-hidden rounded-lg outline-offset-4 transition hover:outline hover:outline-2 hover:outline-[var(--section-accent)]',
        compact ? 'mb-4 h-28' : 'aspect-[4/3]',
        selected && 'outline outline-2 outline-[#d85c47]',
      )}
    >
      <img src={element.src} alt={element.alt} className="h-full w-full object-cover" />
    </button>
  );
}

function chunkElements(elements: TemplateElement[], size: number) {
  const chunks: TemplateElement[][] = [];
  for (let index = 0; index < elements.length; index += size) {
    chunks.push(elements.slice(index, index + size));
  }
  return chunks;
}
