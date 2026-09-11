# vkstack TechDocs UI

Unofficial Broadcom TechDocs–styled reimplementation of the
[vkstack](https://vkstack.warroyo.com) VKS stack compatibility map.

**Not affiliated with or endorsed by Broadcom.** Compatibility data comes from
cached interoperability-matrix snapshots published by the upstream
[warroyo/vkstack](https://github.com/warroyo/vkstack) project. The official
authority is always [interopmatrix.broadcom.com](https://interopmatrix.broadcom.com).

## Preview

GitHub Pages (when enabled for this repo):

**https://chrisgreene.github.io/vkstack-techdocs/**

This repository is currently **private**. GitHub Pages on private repositories
requires GitHub Pro / Team / Enterprise Pages entitlement. The
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) workflow builds
with Vite and deploys via `actions/deploy-pages`. If Pages is unavailable until
the repo is public (or the account has Pages on private repos), run locally:

```bash
npm run build && npm run preview
```

Vite `base` is `./` so the same `dist/` works on project pages, a custom domain,
or any static host. Data fetches use `import.meta.env.BASE_URL` so subpath
deploys resolve `/data*.json` correctly.

## Features

- Interactive stack map: pin any product/version; compatible nodes stay lit
- URL state: `?product=vcenter&version=9.1.1.0` (plus `gen`, `with`, `legacy`)
- Generation filters: All / vSphere 9 / vSphere 8
- Optional layers: NSX, Avi, TMC-SM
- Pan/zoom map, hover edge tracing, detail rail, legend, recommended stack
- TechDocs chrome: Inter font, sticky header, red→purple→slate gradient
- Disclaimer palette on path chips (slate fills, red selection border)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/?product=vcenter&version=9.1.1.0

Production build:

```bash
npm run build
npm run preview
```

Static output is in `dist/` (Vite). Host it on any static file server.

## Data bundles

Precomputed answers live under `public/`:

| File | Purpose | Approx. size |
|------|---------|--------------|
| `data.json` | Full map (all generations, core layers) | ~8 MB |
| `data-gen8.json` / `data-gen9.json` | Generation-filtered answers | ~4–5 MB |
| `data-{nsx\|avi\|tmc…}-gen9.json` | **Vendored** optional-layer demos for vSphere 9 | ~3–5 MB each |

**Vendored for offline gen9 demos** (committed):

- `data-nsx-gen9.json`, `data-avi-gen9.json`, `data-tmc-gen9.json`
- combos: `data-nsx-avi-gen9.json`, `data-nsx-tmc-gen9.json`,
  `data-avi-tmc-gen9.json`, `data-nsx-avi-tmc-gen9.json`

Full (all-generation) optional bundles such as `data-nsx.json` (~10 MB) and
gen8 optional variants are **not** committed — they still load from
`https://vkstack.warroyo.com` at runtime when missing locally.

To vendor every variant offline (can exceed 100 MB total):

```bash
npm run fetch-data
```

Refresh core files from upstream:

```bash
curl -fsSL -o public/data.json https://vkstack.warroyo.com/data.json
curl -fsSL -o public/data-gen8.json https://vkstack.warroyo.com/data-gen8.json
curl -fsSL -o public/data-gen9.json https://vkstack.warroyo.com/data-gen9.json
```

## Credits

- Map semantics and static data format: [warroyo/vkstack](https://github.com/warroyo/vkstack)
- Visual theme inspired by Broadcom TechDocs / VKS documentation patterns

## License

This UI reimplementation is provided as-is for personal/internal use. Upstream
vkstack licensing applies to its data and original assets.
