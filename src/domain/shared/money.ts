export const supportedCurrencyCodes = Object.freeze(['USD'] as const);

export type CurrencyCode = (typeof supportedCurrencyCodes)[number];
export type MinorUnits = bigint;

export type Money = Readonly<{
  currency: CurrencyCode;
  minor: MinorUnits;
}>;

export type SerializedMoney = Readonly<{
  currency: CurrencyCode;
  minor: string;
}>;

const CANONICAL_MINOR_UNITS_PATTERN = /^(0|-?[1-9]\d*)$/;

export function defineMinorUnits(value: unknown): MinorUnits {
  if (typeof value !== 'bigint') {
    throw new Error('Money minor units must be a bigint.');
  }

  return value;
}

export function serializeMinorUnits(value: MinorUnits): string {
  return defineMinorUnits(value).toString();
}

export function deserializeMinorUnits(value: unknown): MinorUnits {
  if (typeof value !== 'string' || !CANONICAL_MINOR_UNITS_PATTERN.test(value)) {
    throw new Error('Serialized money minor units must be a canonical base-10 integer string.');
  }

  return BigInt(value);
}

export function defineMoney(input: { currency: CurrencyCode; minor: MinorUnits }): Money {
  if (!isSupportedCurrencyCode(input.currency)) {
    throw new Error('Unsupported currency code.');
  }

  return Object.freeze({
    currency: input.currency,
    minor: defineMinorUnits(input.minor),
  });
}

export function serializeMoney(money: Money): SerializedMoney {
  const validated = defineMoney(money);

  return Object.freeze({
    currency: validated.currency,
    minor: serializeMinorUnits(validated.minor),
  });
}

export function deserializeMoney(value: unknown): Money {
  if (!isRecord(value)) {
    throw new Error('Serialized money must be an object.');
  }

  if (!isSupportedCurrencyCode(value.currency)) {
    throw new Error('Unsupported currency code.');
  }

  return defineMoney({
    currency: value.currency,
    minor: deserializeMinorUnits(value.minor),
  });
}

function isSupportedCurrencyCode(value: unknown): value is CurrencyCode {
  return supportedCurrencyCodes.some((currency) => currency === value);
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
