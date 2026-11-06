import { buildNicheVoice, lockNicheList } from './niches';
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

  return {
    ...source,
    siteCopy: voice,
    clinic: {
      ...(source.clinic || {}),
      tagline: voice.tagline,
      description: voice.description,
    },
    business: {
      ...(source.business || {}),
      services: lockNicheList(voice.services),
      highlights: lockNicheList(voice.highlights),
    },
    doctor: {
      ...(source.doctor || {}),
      specialization: voice.specialization,
    },
    reviews: source.reviews?.length ? source.reviews : voice.reviews,
    media,
  } as T;
}
