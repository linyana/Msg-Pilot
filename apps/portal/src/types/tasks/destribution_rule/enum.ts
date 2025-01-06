enum DISTRIBUTIONRULE {
  ACCOUNT_UNIQUE,
}

export const DISTRIBUTION_RULE = Object.fromEntries(
  Object.keys(DISTRIBUTIONRULE)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => [key, key]),
) as Record<keyof typeof DISTRIBUTIONRULE, keyof typeof DISTRIBUTIONRULE>

export type DISTRIBUTION_RULE = keyof typeof DISTRIBUTION_RULE;
