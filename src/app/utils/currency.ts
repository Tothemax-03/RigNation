export const USD_TO_PHP = 56.5;

interface CurrencyOptions {
  withCents?: boolean;
}

export function usdToPhp(amountUsd: number, options: CurrencyOptions = {}): number {
  const converted = amountUsd * USD_TO_PHP;
  if (options.withCents) {
    return Math.round(converted * 100) / 100;
  }

  return Math.round(converted);
}

export function formatPhp(amountPhp: number, options: CurrencyOptions = {}): string {
  const withCents = options.withCents ?? false;

  return `₱${amountPhp.toLocaleString("en-PH", {
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  })}`;
}

export function formatUsdAsPhp(amountUsd: number, options: CurrencyOptions = {}): string {
  return formatPhp(usdToPhp(amountUsd, options), options);
}
