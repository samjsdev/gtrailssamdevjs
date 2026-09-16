export interface OfficeLocation {
  city: string;
  state: string;
  code: string;
  type: string;
  address: string;
  coverage: string;
  mapEmbedUrl: string;
  mapSearchUrl: string;
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
    type: 'Headquarters',
    address: 'W115A, 3rd Avenue, Anna Nagar East, Chennai 600040',
    coverage: 'Serving Greater Chennai, ECR, OMR and surrounding districts',
    ...mapUrls('Murali Patharala & Associates, W115A 3rd Avenue, Anna Nagar East, Chennai 600040'),
  },
  {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    code: 'CJB',
    type: 'Regional studio',
    address: 'Coimbatore, Tamil Nadu',
    coverage: 'Serving Coimbatore and the western Tamil Nadu region',
    ...mapUrls('Coimbatore, Tamil Nadu'),
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    code: 'BLR',
    type: 'Regional studio',
    address: 'Bangalore, Karnataka',
    coverage: 'Serving Bangalore and its surrounding urban corridor',
    ...mapUrls('Bangalore, Karnataka'),
  },
  {
    city: 'Pondicherry',
    state: 'Puducherry',
    code: 'PNY',
    type: 'Regional studio',
    address: 'Pondicherry, Puducherry',
    coverage: 'Serving Puducherry, Cuddalore and the southern ECR corridor',
    ...mapUrls('Pondicherry, Puducherry'),
  },
];
