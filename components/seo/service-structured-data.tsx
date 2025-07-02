// Infrastructure Service 结构化数据
export function ServiceStructuredData({
  name,
  displayName,
  description,
  category,
  subcategory,
  websiteUrl,
  logoUrl,
  highlights,
  plans,
  dateModified
}: {
  name: string;
  displayName: string;
  description: string;
  category: string;
  subcategory?: string;
  websiteUrl: string;
  logoUrl?: string;
  highlights?: string[];
  plans?: Array<{
    name: string;
    price: string | number;
    description: string;
  }>;
  dateModified?: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cloud Infrastructure Service',
    name: displayName,
    alternateName: name,
    description,
    category: `${category}${subcategory ? ` - ${subcategory}` : ''}`,
    url: `https://bytehive.site/service/${name}`,
    provider: {
      '@type': 'Organization',
      name: displayName,
      url: websiteUrl,
      logo: logoUrl
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    },
    ...(dateModified && { dateModified }),
    ...(highlights && highlights.length > 0 && {
      additionalProperty: highlights.map((highlight, index) => ({
        '@type': 'PropertyValue',
        name: `Feature ${index + 1}`,
        value: highlight
      }))
    }),
    ...(plans && plans.length > 0 && {
      offers: plans.map(plan => ({
        '@type': 'Offer',
        name: plan.name,
        description: plan.description,
        price: typeof plan.price === 'number' ? plan.price : 0,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: typeof plan.price === 'number' ? plan.price : 0,
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false
        }
      }))
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Service Category 结构化数据
export function ServiceCategoryStructuredData({
  categoryName,
  categoryDescription,
  services
}: {
  categoryName: string;
  categoryDescription: string;
  services: Array<{
    id: string;
    name: string;
    description: string;
    logoUrl?: string;
  }>;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} Services`,
    description: categoryDescription,
    url: `https://bytehive.site/infrastructure-navigator#${categoryName.toLowerCase()}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${categoryName} Service Providers`,
      description: `List of ${categoryName} service providers`,
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          url: `https://bytehive.site/service/${service.id}`,
          provider: {
            '@type': 'Organization',
            name: service.name,
            logo: service.logoUrl
          }
        }
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Service Comparison 结构化数据
export function ServiceComparisonStructuredData({
  comparisonTitle,
  services
}: {
  comparisonTitle: string;
  services: Array<{
    name: string;
    features: Array<{ name: string; value: string | boolean }>;
    pricing: string;
  }>;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: comparisonTitle,
    description: `Comparison of ${services.map(s => s.name).join(', ')}`,
    about: services.map(service => ({
      '@type': 'Service',
      name: service.name,
      additionalProperty: service.features.map(feature => ({
        '@type': 'PropertyValue',
        name: feature.name,
        value: feature.value.toString()
      }))
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}