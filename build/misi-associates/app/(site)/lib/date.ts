function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function fromDateObject(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function fromParts(year: number, month: number, day: number): string | null {
  const candidate = new Date(Date.UTC(year, month - 1, day));
  const isValid =
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() + 1 === month &&
    candidate.getUTCDate() === day;

  if (!isValid) {
    return null;
  }

  return `${year}-${pad(month)}-${pad(day)}`;
}

export function normalizeDateOnly(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return fromDateObject(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);

    if (match) {
      return fromParts(Number(match[1]), Number(match[2]), Number(match[3]));
    }

    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return fromDateObject(parsed);
    }
    return null;
  }

  if (typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return fromDateObject(parsed);
    }
  }

  return null;
}

export function formatDateOnly(value: string, locale = "en-US"): string {
  const normalized = normalizeDateOnly(value);
  if (!normalized) {
    return value;
  }

  const [year, month, day] = normalized.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
