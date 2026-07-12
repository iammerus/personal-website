// Shared JSON-LD objects — define Person once so profiles/job title never drift between pages.
export const SITE_URL = 'https://mups.co.zw';

export const person = {
  '@type': 'Person',
  name: 'Melvin Mupondori',
  url: SITE_URL,
  jobTitle: 'Senior software engineer',
  address: { '@type': 'PostalAddress', addressLocality: 'Harare', addressCountry: 'ZW' },
  sameAs: ['https://github.com/iammerus', 'https://x.com/wezhirawevhu'],
};

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
