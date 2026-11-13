#!/usr/bin/env bash
# Builds the public NxtGen OS demo into public/demos/nxtgen-os/ of the portfolio.
# 1. Copies the dashboard UI (app, components, lib, configs) from F:\Claude\agentic-os\dashboard to a
#    temp folder; the original project is never modified.
# 2. Drops the server-only API route, adds demo mode (demo-shim.js + generated sample data).
# 3. Exports static files with basePath /demos/nxtgen-os and copies them into the portfolio.
# Usage: bash build-demo.sh            (uses the saved, already-clean demo-data.js)
#        bash build-demo.sh <api-dir>  (regenerates demo-data.js from freshly captured local API JSON)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="/f/Claude/agentic-os/dashboard"
PORTFOLIO="$(cd "$HERE/../../.." && pwd)"
CAP="${1:-}"
TMP="${TMPDIR:-/tmp}/nxtgen-demo-build"

# The temp folder links to the dashboard's node_modules with a junction. Always unlink it before any
# delete (and on exit), so cleanup can never reach the real packages.
unlink_modules() { [ -e "$TMP/node_modules" ] && MSYS_NO_PATHCONV=1 cmd /c rmdir "$(cygpath -w "$TMP/node_modules")" || true; }
unlink_modules
trap unlink_modules EXIT
rm -rf "$TMP" && mkdir -p "$TMP"
cp -r "$SRC/app" "$SRC/components" "$SRC/lib" "$TMP/"
cp "$SRC/package.json" "$SRC/postcss.config.mjs" "$SRC/tailwind.config.js" "$TMP/"
rm -rf "$TMP/app/api"
mkdir -p "$TMP/server/auto-editor" && cp "$SRC/server/auto-editor/core.js" "$TMP/server/auto-editor/"  # pure timeline logic used by the editor screen
# Reuse the dashboard's installed packages (Windows directory junction, no copy).
MSYS_NO_PATHCONV=1 cmd /c mklink /J "$(cygpath -w "$TMP/node_modules")" "$(cygpath -w "$SRC/node_modules")" > /dev/null

if [ -n "$CAP" ]; then node "$HERE/make-mock-data.mjs" "$CAP" "$HERE/demo-data.js"; fi
cp "$HERE/demo-data.js" "$TMP/lib/demo-data.js"
cp "$HERE/demo-shim.js" "$TMP/lib/demo-shim.js"
# Demo mode loads before anything else on the page.
{ echo "'use client';"; echo "import '../lib/demo-shim';"; grep -v "^'use client';" "$TMP/app/page.js"; } > "$TMP/app/page.tmp" && mv "$TMP/app/page.tmp" "$TMP/app/page.js"
sed -i "s/title: 'Agentic OS — Mission Control'/title: 'NxtGen OS — live demo'/" "$TMP/app/layout.js"
# Mask client names and local paths that are hard-coded in the UI copy (literal replacements, then a check).
node "$HERE/mask-ui.mjs" "$TMP"

cat > "$TMP/next.config.mjs" <<'EOF'
/** Static export for the portfolio demo. */
export default {
  output: 'export',
  basePath: '/demos/nxtgen-os',
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};
EOF

(cd "$TMP" && NEXT_TELEMETRY_DISABLED=1 node node_modules/next/dist/bin/next build)

rm -rf "$PORTFOLIO/public/demos/nxtgen-os"
mkdir -p "$PORTFOLIO/public/demos"
cp -r "$TMP/out" "$PORTFOLIO/public/demos/nxtgen-os"
echo "demo built -> public/demos/nxtgen-os ($(du -sh "$PORTFOLIO/public/demos/nxtgen-os" | cut -f1))"
