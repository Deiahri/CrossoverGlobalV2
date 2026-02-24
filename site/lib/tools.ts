export function resolveStrapiImageUrl(input: string): string {
  // Check if input is already a URL (starts with http:// or https://)
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return input;
  }

  // If it's a path, prepend STRAPI_URL
  const baseUrl = process.env.STRAPI_URL || '';
  return `${baseUrl}${input}`;
}