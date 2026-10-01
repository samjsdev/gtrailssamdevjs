import { STUDIO } from './clientProfile';

export interface OfficeLocation {
  city: string;
  state: string;
  code: string;
  type: string;
  address: string;
  coverage: string;
  mapEmbedUrl: string;
  mapSearchUrl: string;
  hasStudioAddress: boolean;
}

const mapUrls = (query: string) => {
  const encodedQuery = encodeURIComponent(query);
  return {
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodedQuery}&output=embed`,
    mapSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
  };
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    code: 'MAA',
    type: 'MPA studio',
    address: STUDIO.address,
    coverage: 'Architecture, interiors, construction and property development enquiries for Chennai and the surrounding region.',
    hasStudioAddress: true,
    ...mapUrls(`${STUDIO.name}, ${STUDIO.address}`),
  },
  {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    code: 'CJB',
    type: 'Project enquiries',
    address: 'Coimbatore, Tamil Nadu',
    coverage: 'Discuss a project in Coimbatore or western Tamil Nadu with the MPA team. Meeting details are arranged after your enquiry.',
    hasStudioAddress: false,
    ...mapUrls('Coimbatore, Tamil Nadu'),
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    code: 'BLR',
    type: 'Project enquiries',
    address: 'Bangalore, Karnataka',
    coverage: 'Discuss a project in Bangalore and the surrounding region with the MPA team. Meeting details are arranged after your enquiry.',
    hasStudioAddress: false,
    ...mapUrls('Bangalore, Karnataka'),
  },
  {
    city: 'Pondicherry',
    state: 'Puducherry',
    code: 'PNY',
    type: 'Project enquiries',
    address: 'Pondicherry, Puducherry',
    coverage: 'Discuss a project in Puducherry or the southern ECR corridor with the MPA team. Meeting details are arranged after your enquiry.',
    hasStudioAddress: false,
    ...mapUrls('Pondicherry, Puducherry'),
  },
];
