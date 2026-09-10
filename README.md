# vkstack TechDocs UI

Unofficial Broadcom TechDocs–styled reimplementation of the
[vkstack](https://vkstack.warroyo.com) VKS stack compatibility map.

**Not affiliated with or endorsed by Broadcom.** Compatibility data comes from
cached interoperability-matrix snapshots published by the upstream
[warroyo/vkstack](https://github.com/warroyo/vkstack) project. The official
authority is always [interopmatrix.broadcom.com](https://interopmatrix.broadcom.com).

## Features

- Interactive stack map: pin any product/version; compatible nodes stay lit
- URL state: `?product=vcenter&version=9.1.1.0` (plus `gen`, `with`, `legacy`)
- Generation filters: All / vSphere 9 / vSphere 8
- Optional layers: NSX, Avi, TMC-SM
- Pan/zoom map, hover edge tracing, detail rail, legend, recommended stack
- TechDocs chrome: Inter font, sticky header, red→purple→slate gradient

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

| File | Purpose |
|------|---------|
| `data.json` | Full map (all generations, core layers) |
| `data-gen8.json` / `data-gen9.json` | Generation-filtered answers |

Optional-layer variants (`data-nsx.json`, `data-avi-gen9.json`, …) are large and
are **not** committed by default. The app will:

1. Load local `/data*.json` when present
2. Otherwise fetch the same filename from `https://vkstack.warroyo.com` at runtime

To vendor every variant offline:

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
