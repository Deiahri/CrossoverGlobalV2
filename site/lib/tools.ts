export function resolveStrapiMediaUrl(input: string): string {
  // Check if input is already a URL (starts with http:// or https://)
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return input;
  }

  // If it's a path, prepend NEXT_PUBLIC_STRAPI_URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
  return `${baseUrl}${input}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}