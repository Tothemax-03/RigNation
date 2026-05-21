const WRAPPED_URL_PARAM_KEYS = ['imgurl', 'mediaurl', 'adurl', 'url', 'u'];

export function normalizeImageUrl(rawValue?: string): string {
  const raw = (rawValue || '').trim();
  if (!raw) return raw;

  try {
    const parsed = new URL(raw);

    // Some copied links (Google, Bing, etc.) wrap the actual image URL in query params.
    for (const key of WRAPPED_URL_PARAM_KEYS) {
      const wrapped = parsed.searchParams.get(key);
      if (wrapped) {
        try {
          const decoded = decodeURIComponent(wrapped);
          if (/^https?:\/\//i.test(decoded)) {
            return decoded;
          }
        } catch {
          if (/^https?:\/\//i.test(wrapped)) {
            return wrapped;
          }
        }
      }
    }

    return parsed.toString();
  } catch {
    return raw;
  }
}
