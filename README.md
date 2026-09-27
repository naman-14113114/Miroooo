# Miroooo — Sonic Oral-Care Monorepo

A modern, high-performance multi-region e-commerce monorepo powering the **Miroooo** sonic electric toothbrush storefronts worldwide. Built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript**, and **Turborepo** with **pnpm workspaces**.

---

## 🌐 Overview & Regional Storefronts

The monorepo contains two independent, localized storefront applications and shared core libraries:

| Storefront | Target Region | Currency & Pricing | Canonical Domain | Directory |
| :--- | :--- | :--- | :--- | :--- |
| **UK** | United Kingdom | GBP (`£`) | `https://www.trymiroooo.com` | `apps/uk` |
| **US** | United States | USD (`$`) | `https://miroooo.us` | `apps/us` |

---

## 📦 Monorepo Architecture

```
miroooo/
├── apps/
│   ├── uk/                 # UK Next.js 16 storefront (GBP £)
│   └── us/                 # US Next.js 16 storefront (USD $)
├── packages/
│   ├── shared/             # Typed schemas, product catalog, pricing, reviews & checkout logic
│   ├── ui/                 # Reusable UI primitives, buttons, icons, and accessible components
│   ├── tsconfig/           # Shared TypeScript configuration files
│   └── eslint-config/      # Shared ESLint configuration
├── scripts/
│   └── verify.mjs          # Static integrity, route verification, and asset audit script
├── docs/                   # Migration notes and architectural documentation
├── turbo.json              # Turborepo task pipeline configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── package.json            # Root dependencies & workspace scripts
```

---

## 🪥 Product Catalog & Models

- **Miroooo X1 (`/products/miroooo-x`)**:
  - 51g ultralight unibody acoustic sonic toothbrush
  - 32,000 VPM acoustic sonic motor with 3 cleaning modes
  - 60-day single charge runtime, IPX7 immersion waterproofing
  - Magnetic travel case included

- **Miroooo X2 (`/products/miroooo-x2`)**:
  - Aerospace-grade aluminium body
  - 45° Bass sweep vibration with smart red halo pressure defense
  - 90-day battery life, 3 cleaning modes, IPX7 waterproofing
  - Luxury hard travel case, wall-mounted magnetic dock, companion Smile Coach WebApp

- **Miroooo Precision Heads (2-Pack)**:
  - **Miroooo X1 Heads (`/products/miroooo-x1-heads`)**: Model-specific DuPont acoustic precision bristles
  - **Miroooo X2 Heads (`/products/miroooo-x2-heads`)**: Model-specific DuPont precision bristles for 45° Bass sweep

---

## 🚀 Key Features

- **Next.js 16 + React 19**: Next-generation App Router with zero-waterfall Server Components and Turbopack.
- **Universal XPage Direct Checkout**: Secure server-side `/api/checkout/prepare` route handling direct XPage checkout sessions and native bundle discount calculations (`POST /create-bundle-order`).
- **Interactive Companion Experiences**:
  - **Smile Coach WebApp (`/smile-coach`)**: Interactive brushing timer, quadrant guide, and dental routine assistant.
  - **Dental Care Quiz (`/dentalcare-quiz`)**: Personalized toothbrush selection engine.
- **Reviews Engine**: 8,550+ verified customer reviews with interactive star ratings, photo filters, sort options, and modal submission.
- **Regional Localization**: Strict currency handling, localized shipping guarantees, localized postal/support addresses, and regional English spelling.
- **Attribution & Analytics**: Preservation of Microsoft UET, Bing Ads, Google Ads (gclid), and UTM campaign tracking parameters.

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **pnpm**: `>= 9.0.0` (Recommended: `pnpm@11.1.1`)

### Installation

```bash
# Clone the repository
git clone https://github.com/naman-14113114/Miroooo.git
cd Miroooo

# Install all workspace dependencies
pnpm install
```

---

## 💻 Available Scripts

### Development

Run all storefronts concurrently:
```bash
pnpm dev
```

Or run a specific regional storefront:
```bash
pnpm dev:uk   # UK Storefront (port 3000)
pnpm dev:us   # US Storefront (port 3001)
```

### Production Build

Build all workspace apps and packages:
```bash
pnpm build
```

Build a single regional app:
```bash
pnpm build:uk
pnpm build:us
```

### Linting & Type Checking

```bash
pnpm lint          # Lint all packages with ESLint
pnpm typecheck     # Type check all packages with TypeScript
pnpm verify        # Run static integrity and asset verification suite
```

---

## 🔒 Security & Privacy

- All sensitive keys, tokens, and private credentials are excluded from source control via `.gitignore`.
- Payment transactions are routed securely through authorized gateway bridge endpoints.

---

## 📄 License

Private repository. All rights reserved &copy; Miroooo Oral Care.
