import { buildNicheVoice, lockNicheList, isNicheTagline } from './niches';
import { nicheMediaFor } from './nicheLibrary';

type NicheData = {
  niches?: string[];
  subNiches?: string[];
  regions?: string[];
  clinic?: {
    name?: string;
    tagline?: string;
    description?: string;
    address?: { city?: string };
  };
  business?: {
    services?: string[];
    highlights?: string[];
    [key: string]: unknown;
  };
  doctor?: {
    specialization?: string;
    [key: string]: unknown;
  };
  reviews?: { author: string; rating: number; text: string }[];
  media?: {
    clinicImages?: string[];
    treatmentImages?: string[];
    otherImages?: string[];
  };
  siteCopy?: unknown;
  [key: string]: unknown;
};

export async function applyNicheOverlay<T>(data: T): Promise<T> {
  const source = data as NicheData;
  const nicheIds = Array.isArray(source?.niches) ? source.niches : [];
  if (!nicheIds.length) return data;

  const regionIds = Array.isArray(source?.regions) ? source.regions : [];

  const voice = buildNicheVoice(nicheIds, source.subNiches || [], {
    name: source.clinic?.name,
    city: source.clinic?.address?.city,
    regions: regionIds,
  });
  if (!voice) return data;

  const media = await nicheMediaFor(voice.nicheIds, regionIds);

  // Preserve client-specific assets and place them first
  const clientClinicImages = (source.media?.clinicImages || []).filter(Boolean);
  const clientTreatmentImages = (source.media?.treatmentImages || []).filter(Boolean);
  const clientOtherImages = (source.media?.otherImages || []).filter(Boolean);

  const finalMedia = {
    clinicImages: clientClinicImages.length ? [...new Set([...clientClinicImages, ...media.clinicImages])] : media.clinicImages,
    treatmentImages: clientTreatmentImages.length ? [...new Set([...clientTreatmentImages, ...media.treatmentImages])] : media.treatmentImages,
    otherImages: clientOtherImages.length ? [...new Set([...clientOtherImages, ...media.otherImages])] : media.otherImages,
  };

  const hasCustomTagline = Boolean(source.clinic?.tagline && !isNicheTagline(source.clinic.tagline));
  const hasCustomDesc = Boolean(source.clinic?.description && !source.clinic.description.includes('brings together'));
  const hasCustomServices = Boolean(source.business?.services?.length);
  const hasCustomHighlights = Boolean(source.business?.highlights?.length);

  return {
    ...source,
    siteCopy: voice,
    clinic: {
      ...(source.clinic || {}),
      tagline: hasCustomTagline ? source.clinic!.tagline : voice.tagline,
      description: hasCustomDesc ? source.clinic!.description : voice.description,
    },
    business: {
      ...(source.business || {}),
      services: hasCustomServices ? source.business!.services : lockNicheList(voice.services),
      highlights: hasCustomHighlights ? source.business!.highlights : lockNicheList(voice.highlights),
    },
    doctor: {
      ...(source.doctor || {}),
      specialization: source.doctor?.specialization || voice.specialization,
    },
    reviews: source.reviews?.length ? source.reviews : voice.reviews,
    media: finalMedia,
  } as T;
}
