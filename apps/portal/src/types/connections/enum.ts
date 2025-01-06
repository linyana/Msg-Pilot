enum CONNECTIONTYPE {
  Red,
  TikTok,
}

export const IConnectionType = Object.fromEntries(
  Object.keys(CONNECTIONTYPE)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => [key, key]),
) as Record<keyof typeof CONNECTIONTYPE, keyof typeof CONNECTIONTYPE>

export type IConnectionType = keyof typeof IConnectionType;
