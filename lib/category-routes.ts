/** Category display name → URL slug (matches app/[category]/page.tsx CATEGORY_MAP keys) */
export const CATEGORY_NAME_TO_SLUG: Record<string, string> = {
  Strategie: "strategie",
  Formate: "formate",
  Trends: "trends",
  Meinung: "meinung",
  Newcomer: "newcomer",
  "The Growth Lab": "lab",
  "Case Studies": "case-studies",
};

export function categoryHref(category: string | null | undefined): string | undefined {
  if (!category) return undefined;
  const slug = CATEGORY_NAME_TO_SLUG[category];
  return slug ? `/${slug}` : undefined;
}
