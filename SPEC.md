# SPEC — LM Rocha Distribuidora · Site Institucional

> Versão: 1.0 · Atualizado em: 2026-06-10

---

## 1. Visão Geral do Projeto

**Cliente:** LM Rocha Comercio, Distribuição, Importação e Exportação LTDA  
**CNPJ:** 10.225.240/0001-48  
**Segmento:** Distribuição de tabaco, charutos e acessórios — Rio de Janeiro, RJ  
**Site original de referência:** https://www.lmrocha.com.br/  
**Repositório:** https://github.com/Murilo2811/Novo-SIte-LMRocha  
**Deploy (preview):** https://novo-s-ite-lm-rocha.vercel.app  

### Objetivo
Redesign moderno e completo do site institucional da LM Rocha, mantendo fidelidade ao conteúdo e estrutura do site original, com melhorias de UX, performance, SEO, bilinguismo (PT-BR / EN) e base preparada para integração futura com o ERP Alterdata Bimer.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| UI Library | React | 19.2.4 |
| Linguagem | TypeScript | ^5 |
| Estilização | styled-jsx (CSS-in-JS scoped) + globals.css | nativo Next.js |
| Animações | Framer Motion | ^12.40.0 |
| Autenticação | NextAuth.js (Google OAuth) | ^4.24.14 |
| E-mail | Nodemailer (SMTP) | ^7.0.13 |
| Validação | Zod | ^4.4.3 |
| Fonte | Barlow (Google Fonts) | — |
| Node.js types | @types/node | ^20 |
| Linting | ESLint + eslint-config-next | ^9 / 16.2.9 |

---

## 3. Estrutura de Pastas

```
src/
├── app/
│   ├── (public)/                  # Grupo de rotas públicas
│   │   ├── layout.tsx             # Layout com Navbar + Footer + WhatsApp button
│   │   ├── page.tsx               # Homepage
│   │   ├── quem-somos/page.tsx
│   │   ├── nossas-marcas/page.tsx
│   │   ├── nossos-parceiros/page.tsx
│   │   ├── catalogos/page.tsx
│   │   ├── seja-nosso-cliente/page.tsx
│   │   ├── trabalhe-conosco/page.tsx
│   │   └── contato/page.tsx
│   ├── admin/                     # Área restrita
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Dashboard
│   │   ├── login/page.tsx
│   │   ├── error/page.tsx
│   │   ├── contatos/page.tsx
│   │   └── catalogo/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── contato/route.ts
│   │   └── catalogo/route.ts
│   ├── layout.tsx                 # Root layout (metadata, AgeGate)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AgeGate.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── WhatsAppButton.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       └── ContactForm.tsx
├── context/
│   └── I18nContext.tsx
├── hooks/
│   └── useTranslation.ts
├── lib/
│   ├── auth.ts
│   ├── email.ts
│   ├── validation.ts
│   └── rate-limiter.ts
└── data/
    └── mock-catalog.json

public/
├── images/
│   ├── logo.png
│   └── site/                      # 32 imagens reais do acervo
├── locales/
│   ├── pt-BR.json
│   └── en.json
```

---

## 4. Páginas e Rotas

### 4.1 Públicas

| Rota | Arquivo | Descrição |
|---|---|---|
| `/` | `(public)/page.tsx` | Homepage com 4 seções |
| `/quem-somos` | `quem-somos/page.tsx` | História, missão, visão, valores + sidebar WhatsApp |
| `/nossas-marcas` | `nossas-marcas/page.tsx` | 17 marcas distribuídas, filtro por categoria |
| `/nossos-parceiros` | `nossos-parceiros/page.tsx` | 20 parceiros/fornecedores, filtro por categoria |
| `/catalogos` | `catalogos/page.tsx` | 19 produtos com imagens, filtro + busca |
| `/seja-nosso-cliente` | `seja-nosso-cliente/page.tsx` | Formulário de cadastro B2B (CNPJ, empresa, contato) |
| `/trabalhe-conosco` | `trabalhe-conosco/page.tsx` | Formulário de candidatura |
| `/contato` | `contato/page.tsx` | Formulário de contato geral |

### 4.2 Administrativas (protegidas por NextAuth)

| Rota | Descrição |
|---|---|
| `/admin` | Dashboard |
| `/admin/login` | Login Google OAuth |
| `/admin/error` | Página de erro de autenticação |
| `/admin/contatos` | Visualização de contatos recebidos |
| `/admin/catalogo` | Gerenciamento do catálogo |

---

## 5. Seções da Homepage

Em ordem de exibição, espelhando o site original:

| # | Seção | Componente/Origem |
|---|---|---|
| 1 | Age Gate (verificação de 21 anos) | `AgeGate.tsx` |
| 2 | Navbar branco estático | `Navbar.tsx` |
| 3 | Hero + Formulário de contato flutuante | `HeroSection.tsx` + `ContactForm` |
| 4 | "Por Que Escolher a LM Rocha?" (3 feature cards) | `page.tsx` inline |
| 5 | "Quem Somos" — texto + estatísticas (+18 anos, 100+ marcas, RJ) | `page.tsx` inline |
| 6 | "Seja Dono do Seu Próprio Negócio" — parallax com 2 CTAs | `page.tsx` inline |
| 7 | Footer | `Footer.tsx` |

---

## 6. Componentes

### 6.1 Layout

**`Navbar.tsx`**
- Fundo branco estático (`#ffffff`) em todos os estados
- Texto grafite (`#3a3530`), hover dourado (`#b3862b`)
- Submenu dropdown sob "Quem Somos":
  - Nossas Marcas → `/nossas-marcas`
  - Nossos Parceiros → `/nossos-parceiros`
- Mobile: menu fullscreen com hamburger grafite
- Sombra sutil ao scrollar

**`Footer.tsx`**
- 3 colunas: sobre a empresa / links rápidos / contato
- Endereço: Estrada do Galeão, 2730 — Ilha do Governador, RJ
- Telefone: (21) 96956-0379
- E-mail: contato@lmrocha.com.br

**`AgeGate.tsx`**
- Modal de verificação de idade (requisito legal — tabaco adulto +21 anos)
- Persiste confirmação em localStorage

**`WhatsAppButton.tsx`**
- Botão flutuante fixo, abre chat com mensagem pré-formatada
- Link: `https://api.whatsapp.com/send?phone=5521969560379`

**`LanguageSwitcher.tsx`**
- Toggle PT-BR / EN
- Persiste escolha em localStorage + cookie

### 6.2 Sections

**`HeroSection.tsx`**
- Background: `/images/site/WhatsApp-Image-2020-07-14-at-23.09.02-1.jpeg`
- Grid 2 colunas: texto CTA (esquerda) + `ContactForm` (direita)
- Badge "DESDE 2006", título, subtítulo, botão "Quero ser cliente"

**`ContactForm.tsx`**
- 3 variantes: `contact` | `client` | `careers`
- Validação client-side (campos obrigatórios)
- Submete para `POST /api/contato`
- Sucesso: mostra confirmação + redireciona para WhatsApp

---

## 7. APIs Internas

### `POST /api/contato`

Recebe formulários do site, valida com Zod, envia e-mail via SMTP e retorna link WhatsApp formatado.

**Body:**
```json
{
  "formType": "contact" | "client" | "careers",
  "name": "...",
  "phone": "...",
  "subject": "...",    // contact only
  "message": "...",
  "companyName": "...", // client only
  "cnpj": "...",        // client only
  "email": "...",
  "cityState": "...",   // client only
  "position": "..."     // careers only
}
```

**Rate limiting:** 5 requisições/min por IP  
**Resposta sucesso:**
```json
{ "success": true, "whatsappUrl": "https://api.whatsapp.com/send?..." }
```

---

### `GET /api/catalogo`

Retorna produtos do catálogo (atualmente mock local; preparado para Bimer).

**Query params:**
| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `category` | string | `all` | Filtro de categoria |
| `q` | string | — | Busca por nome ou marca |
| `page` | number | `1` | Paginação |
| `limit` | number | `12` | Itens por página |

**Rate limiting:** 30 requisições/min por IP  
**Resposta:**
```json
{
  "products": [...],
  "pagination": { "total": 19, "page": 1, "limit": 12, "pages": 2 }
}
```

---

## 8. Modelo de Dados

### Produto (mock-catalog.json)
```typescript
interface Product {
  id: string
  name: string
  category: 'charutos' | 'fumo' | 'papel' | 'acessorios'
  brand: string
  description: string
  price: number
  image?: string          // path relativo em /images/site/
  features: Record<string, string>
}
```

**19 produtos cadastrados** mapeados para imagens reais em `/images/site/`:

| Categoria | Marcas |
|---|---|
| Charutos (6) | Gran Honduras (3 SKUs), Alonso Menendez, Gran Caboclo, Siboney |
| Fumo (2) | Vibe Tobacco, São Jorge |
| Papéis (6) | RAW, King Blunt, King Paper, NF, aLeda, 4/20 Free Time |
| Acessórios (5) | Clipper, Don Paiol, Bem Bolado, Talvis, Volcano |

---

## 9. Internacionalização (i18n)

- **Idiomas:** PT-BR (padrão) e EN
- **Arquivos:** `public/locales/pt-BR.json` e `public/locales/en.json`
- **Provider:** `I18nContext.tsx` com `useTranslation()` hook
- **Persistência:** localStorage + cookie
- **Namespaces de chaves:** `nav`, `ageGate`, `footer`, `common`, `home`, `about`, `brands`, `catalogs`, `forms`

---

## 10. Autenticação (Área Admin)

- **Provider:** Google OAuth via NextAuth.js
- **Sessão:** JWT, duração 24h
- **Whitelist:** e-mails autorizados em `ALLOWED_ADMIN_EMAILS` (`.env`)
- **Admin padrão:** contato@lmrocha.com.br
- **Rotas protegidas:** `/admin/*`

---

## 11. Segurança

| Mecanismo | Implementação |
|---|---|
| Rate limiting | In-memory por IP (`src/lib/rate-limiter.ts`) — 5 req/min contato, 30 req/min catálogo |
| Validação | Zod schemas em `src/lib/validation.ts` para todos os formulários |
| Security headers | CSP, HSTS, X-Frame-Options, Permissions-Policy em `next.config.ts` |
| Autenticação admin | NextAuth JWT + whitelist de e-mails |
| Age gate | Verificação de idade (+21) obrigatória (requisito legal tabaco) |

---

## 12. Design System

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `#ffcc66` | Dourado — CTAs, destaques |
| `--primary-hover` | `#e6b84d` | Hover de CTAs |
| `--primary-dark` | `#b3862b` | Hover de links, textos dourados |
| Background light | `#fdfdfd` | Fundo página (modo claro) |
| Background dark | `#0f0f0e` | Fundo página (modo escuro) |
| Foreground light | `#1c1816` | Texto principal (modo claro) |
| Foreground dark | `#f5f2eb` | Texto principal (modo escuro) |
| Grafite navbar | `#3a3530` | Links do menu |

### Tipografia
- **Fonte:** Barlow (Google Fonts) — pesos 300, 400, 500, 600, 700, 700 italic
- **Títulos:** `font-style: italic; font-weight: 700` (classe `.italic-bold`)
- **Dourado:** classe `.text-gold` → `color: var(--primary)`

### Border Radius
- `--border-radius-sm`: 8px
- `--border-radius-md`: 16px
- `--border-radius-lg`: 24px
- `--border-radius-full`: 9999px (pílulas)

### Efeitos
- **Glassmorphism:** classe `.glass` → backdrop-filter blur + rgba
- **Hover lift:** classe `.hover-lift` → translateY(-5px) + sombra
- **Transições:** fast 0.2s / smooth 0.4s / bounce 0.5s

---

## 13. Imagens do Acervo

**32 imagens** em `public/images/site/` — logos reais das marcas e fotos de produtos:

| Tipo | Arquivos |
|---|---|
| Logo institucional | `marca-site.png`, `marca-site-150x50.png` |
| Logos de marcas | `Logo-Gran-Honduras-*.png`, `Logo_Alonso-Menendez.jpg`, `Gran-Caboclo-*.jpg`, `Novo-Logo-SIBONEY-*.png`, `Logo_vibe_tobacco-*.png`, `Logo_Sao_Jorge-*.png`, `Logo-Raw_Rolling_Papers.png`, `King_Blunt_2.jpg`, `King_Paper-*.jpg`, `Logo_NF-*.png`, `aLeda_Celulose-*.jpg`, `4e20_free_time-*.jpg`, `Clipper-Logo-2.png`, `Logo_Don_Paiol_Preta-*.png`, `Logo_Bem_Bolado.png`, `Logo-Talvis.png`, `volcano.png`, `Logo_Alonso-Menendez.jpg` |
| Sub-produtos Gran Honduras | `Gran_Honduras_Seconds-*.png`, `Gran_Honduras_SHORT_FILLER-*.png` |
| Fotos de produtos (WhatsApp) | 11 arquivos `WhatsApp-Image-2020-07-*.jpeg` |

---

## 14. Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXTAUTH_SECRET` | Sim (prod) | Secret JWT do NextAuth |
| `NEXTAUTH_URL` | Sim (prod) | URL base do site |
| `GOOGLE_CLIENT_ID` | Sim | OAuth Google — Client ID |
| `GOOGLE_CLIENT_SECRET` | Sim | OAuth Google — Client Secret |
| `ALLOWED_ADMIN_EMAILS` | Não | E-mails autorizados no admin (vírgula) |
| `CONTACT_EMAIL` | Não | Destino dos e-mails (padrão: contato@lmrocha.com.br) |
| `SMTP_HOST` | Não* | Servidor SMTP |
| `SMTP_PORT` | Não* | Porta SMTP (padrão: 587) |
| `SMTP_USER` | Não* | Usuário SMTP |
| `SMTP_PASS` | Não* | Senha SMTP |
| `SMTP_SECURE` | Não* | `true` para porta 465 |

*Se SMTP não configurado, e-mails são simulados no console (modo dev).

---

## 15. Integração Futura — Alterdata Bimer API

O projeto já tem a estrutura preparada em `src/app/api/catalogo/route.ts` para substituir o mock pelo ERP real.

### Informações da API

| Campo | Valor |
|---|---|
| Documentação | https://bimer-api-docs.alterdata.com.br/ |
| Versão alvo | 11.03.01.01 (mais recente) |
| Protocolo | REST / JSON / HTTPS |
| Autenticação | Bearer Token (`POST /auth/token`) |

### Endpoints prioritários para integração

```
# Autenticação
POST /auth/token                                    → obter token
GET  /auth/refresh-token                            → renovar token

# Produtos / Catálogo
GET  /api/produtos/nome/{nome}                      → busca por nome
GET  /api/produtos/{id}                             → produto por ID
GET  /api/produtos/{id}/imagens                     → imagens do produto
GET  /api/produtos/grupo/{idGrupo}                  → por grupo
GET  /api/produtos/familia/{idFamilia}              → por família
GET  /api/precosProduto/{empresa}/{id}              → preço atual
GET  /api/estoque/produto/{id}                      → estoque atual

# Clientes
GET  /api/pessoas/cpfCnpj/{cnpj}                   → buscar por CNPJ
POST /api/pessoas/{id}/cliente                      → cadastrar cliente
PUT  /api/pessoas/{id}/cliente                      → atualizar cliente

# Pedidos
POST /api/vendas/pedidos                            → criar pedido
GET  /api/vendas/pedidos/{id}                       → consultar pedido
```

### O que precisa para ativar

1. **URL base** da instância Bimer da LM Rocha (host interno ou cloud)
2. **Credenciais** de acesso à API (usuário + senha)
3. **Código da empresa** (`codigoEmpresa`) para queries de preço e estoque
4. Adicionar as 3 variáveis de ambiente:
   - `BIMER_API_URL`
   - `BIMER_USERNAME`
   - `BIMER_PASSWORD`

### Plano de migração (mock → Bimer)

```typescript
// src/app/api/catalogo/route.ts — substituir fetchProductsFromERP():

async function fetchProductsFromERP() {
  const token = await getBimerToken()  // POST /auth/token
  const res = await fetch(`${process.env.BIMER_API_URL}/api/produtos`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}
```

---

## 16. Separação de Conteúdo: Marcas vs. Parceiros

| | Nossas Marcas (`/nossas-marcas`) | Nossos Parceiros (`/nossos-parceiros`) |
|---|---|---|
| **Definição** | Marcas distribuídas com exclusividade pela LM Rocha | Fabricantes e fornecedores parceiros do ecossistema |
| **Quantidade** | 17 marcas | 20 parceiros |
| **Categorias** | Charutos, Fumo, Papéis, Acessórios | + Palheiros |
| **Exemplos exclusivos** | Gran Honduras, Siboney, Vibe Tobacco, 4/20, Don Paiol | Dannemann, Dona Flor, Titan, Dipalha, Parvathi, Sasso |
| **Com logo** | 17/17 | 9/20 (restantes: card com iniciais) |

---

## 17. Contatos da Empresa

| Campo | Valor |
|---|---|
| WhatsApp | (21) 96956-0379 |
| E-mail | contato@lmrocha.com.br |
| Endereço | Estrada do Galeão, 2730 — Ilha do Governador, RJ, 21931-382 |
| Fundação | Agosto de 2006 |
| CNPJ | 10.225.240/0001-48 |

---

## 18. Histórico de Commits Relevantes

| Hash | Descrição |
|---|---|
| `00fd617` | Implementação inicial completa do clone modernizado |
| `ccbbf6b` | Substituição imagens Unsplash por fotos reais + redesign Nossas Marcas |
| `151cb2c` | Novas seções da homepage + separação Marcas/Parceiros |
| `85143a8` | Imagens reais nos cards do catálogo + 19 produtos reais |
| `9bfe027` | Navbar branco estático com textos grafite |
