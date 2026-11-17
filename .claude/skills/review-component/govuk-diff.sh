#!/usr/bin/env bash
# Lists the GOV.UK Frontend components whose markup, options, JavaScript or
# styles changed between two versions, with the diff of each.
#
#   .claude/skills/review-component/govuk-diff.sh <old-version> <new-version> [out-dir]
#
# Downloads both packages from npm with `npm pack` into out-dir (a new
# temporary directory by default) and compares them. Nothing is installed.
set -euo pipefail

old=${1:?old version, such as 5.11.0}
new=${2:?new version, such as 6.0.0}
out=${3:-$(mktemp -d)}

for version in "$old" "$new"; do
  mkdir -p "$out/$version"
  npm pack "govuk-frontend@$version" --pack-destination "$out/$version" --silent >/dev/null
  tar -xzf "$out/$version"/govuk-frontend-*.tgz -C "$out/$version"
done

components() { ls "$out/$1/package/dist/govuk/components"; }

echo "Compared govuk-frontend $old and $new in $out"
echo
echo "## Added components"
comm -13 <(components "$old") <(components "$new") | sed 's/^/- /'
echo
echo "## Removed components"
comm -23 <(components "$old") <(components "$new") | sed 's/^/- /'
echo
echo "## Changed components"
for id in $(comm -12 <(components "$old") <(components "$new")); do
  a="$out/$old/package/dist/govuk/components/$id"
  b="$out/$new/package/dist/govuk/components/$id"
  changed=()
  for file in template.njk macro-options.json "$id.mjs" _mixin.scss; do
    if ! diff -q "$a/$file" "$b/$file" >/dev/null 2>&1; then
      [[ -e "$a/$file" || -e "$b/$file" ]] && changed+=("$file")
    fi
  done
  if ((${#changed[@]})); then
    echo "- $id: ${changed[*]}"
    for file in "${changed[@]}"; do
      diff -u "$a/$file" "$b/$file" > "$out/$id.$file.diff" 2>/dev/null || true
    done
  fi
done
echo
echo "Diffs are in $out/<id>.<file>.diff"
