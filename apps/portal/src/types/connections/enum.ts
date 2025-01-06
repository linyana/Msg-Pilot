enum CONNECTIONTYPE {
  Red,
  TikTok,
}

export const CONNECTION_TYPE = Object.fromEntries(
  Object.keys(CONNECTIONTYPE)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => [key, key]),
) as Record<keyof typeof CONNECTIONTYPE, keyof typeof CONNECTIONTYPE>

export type CONNECTION_TYPE = keyof typeof CONNECTION_TYPE;
