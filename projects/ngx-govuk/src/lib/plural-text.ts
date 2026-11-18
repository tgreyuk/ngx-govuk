/**
 * Text for each plural form, such as `one` and `other`, as
 * `Intl.PluralRules` names them. `%{count}` is replaced with the number.
 */
export type NgxGovukPluralText = Partial<Record<Intl.LDMLPluralRule, string>>;

/**
 * Picks the plural form for `count`, falling back to `other`, and puts the
 * number in place of `%{count}`, as GOV.UK Frontend's i18n does.
 *
 * @internal
 */
export function formatPluralText(
  texts: NgxGovukPluralText,
  count: number,
  pluralRules: Intl.PluralRules,
): string {
  const text = texts[pluralRules.select(count)] ?? texts.other ?? '';
  return text.replace('%{count}', String(count));
}
