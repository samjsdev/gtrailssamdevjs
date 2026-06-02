const fs = require('fs');
const path = require('path');

// Mock data and function definitions to run getLogicalSectionForElement
const sections = [
  { label: 'Hero Section' },
  { label: 'Why Choose Us' },
  { label: 'Services Section' },
  { label: 'About Us Section' },
  { label: 'Portfolio Gallery Section' },
  { label: 'Final CTA Section' }
];

function findServicesSectionLabel(sections) {
  const servicesKeywords = ['service', 'specialization', 'capabilities', 'catalog'];
  for (const section of sections) {
    const labelLower = section.label.toLowerCase();
    if (servicesKeywords.some(kw => labelLower.includes(kw))) {
      return section.label;
    }
  }
  return null;
}

function findHeroSectionLabel(sections) {
  const heroKeywords = ['hero', 'intro', 'banner', 'welcome', 'header'];
  for (const section of sections) {
    const labelLower = section.label.toLowerCase();
    if (heroKeywords.some(kw => labelLower.includes(kw))) {
      return section.label;
    }
  }
  return null;
}

function findAboutSectionLabel(sections) {
  const aboutKeywords = ['about', 'story', 'leadership', 'principal', 'founder', 'vision'];
  for (const section of sections) {
    const labelLower = section.label.toLowerCase();
    if (aboutKeywords.some(kw => labelLower.includes(kw))) {
      return section.label;
    }
  }
  return null;
}

function findGallerySectionLabel(sections) {
  const galleryKeywords = ['gallery', 'portfolio', 'preview', 'archive', 'work', 'project', 'character'];
  for (const section of sections) {
    const labelLower = section.label.toLowerCase();
    if (galleryKeywords.some(kw => labelLower.includes(kw))) {
      return section.label;
    }
  }
  return null;
}

function findContactSectionLabel(sections) {
  const contactKeywords = ['contact', 'location', 'reach', 'connect', 'find us', 'details'];
  for (const section of sections) {
    const labelLower = section.label.toLowerCase();
    if (contactKeywords.some(kw => labelLower.includes(kw))) {
      return section.label;
    }
  }
  return null;
}

function getLogicalSectionForElement(element, pageId, sections = []) {
  const isImage = element.type === 'image';
  const pathArr = element.path || [];
  
  if (pageId === 'home') {
    if (pathArr[0] === 'clinic' && (pathArr[1] === 'tagline' || pathArr[1] === 'description')) {
      return findHeroSectionLabel(sections) || 'Hero Intro Banner';
    }
    if (pathArr[0] === 'clinic' && pathArr[1] === 'name') {
      return findHeroSectionLabel(sections) || 'Hero Intro Banner';
    }
    if (isImage && element.imageConfig.arrayKey === 'clinicImages' && element.imageConfig.index === 0) {
      return findHeroSectionLabel(sections) || 'Hero Intro Banner';
    }
    
    if (pathArr[0] === 'philosophy') {
      for (const section of sections) {
        if (/philosophy|values|why|strength/i.test(section.label)) return section.label;
      }
      return 'Philosophy & Values (Why Choose Us)';
    }
    if (isImage && element.imageConfig.arrayKey === 'otherImages' && element.imageConfig.index >= 2 && element.imageConfig.index <= 5) {
      for (const section of sections) {
        if (/philosophy|values|why|strength/i.test(section.label)) return section.label;
      }
      return 'Philosophy & Values (Why Choose Us)';
    }
    
    if (pathArr[0] === 'doctor' || pathArr[0] === 'homeAbout') {
      return findAboutSectionLabel(sections) || 'About Studio Section';
    }
    if (isImage && element.imageConfig.arrayKey === 'otherImages' && element.imageConfig.index === 0) {
      return findAboutSectionLabel(sections) || 'About Studio Section';
    }
    
    if (pathArr[0] === 'business' && pathArr[1] === 'services') {
      return findServicesSectionLabel(sections) || 'Services Preview';
    }
    
    if (pathArr[0] === 'clinic' && pathArr[1] === 'contact') {
      return findContactSectionLabel(sections) || 'Contact Details';
    }
    if (pathArr[0] === 'clinic' && pathArr[1] === 'address') {
      return findContactSectionLabel(sections) || 'Contact Details';
    }

    if (isImage && element.imageConfig.arrayKey === 'otherImages' && element.imageConfig.index >= 6 && element.imageConfig.index <= 13) {
      return findServicesSectionLabel(sections) || 'Services Preview';
    }

    if (isImage && element.imageConfig.arrayKey === 'treatmentImages') {
      return findGallerySectionLabel(sections) || 'Portfolio Gallery Section';
    }

    if (isImage && element.imageConfig.arrayKey === 'clinicImages' && element.imageConfig.index === 1) {
      return findGallerySectionLabel(sections) || findAboutSectionLabel(sections) || 'About Studio Section';
    }
    
    if (isImage && ['clinicImages', 'treatmentImages'].includes(element.imageConfig.arrayKey)) {
      return findHeroSectionLabel(sections) || 'Hero Intro Banner';
    }
    return findHeroSectionLabel(sections) || 'Hero Intro Banner';
  }
}

const result = getLogicalSectionForElement({type: 'image', imageConfig: {arrayKey: 'otherImages', index: 6}}, 'home', sections);
console.log('Result for otherImages[6]:', result);
