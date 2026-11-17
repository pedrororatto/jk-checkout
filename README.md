# Cursos — Centro de Estudos John Knox

Carrinho de cursos: a pessoa escolhe vários cursos e paga tudo em um único checkout da Eduzz (API de carrinho do Checkout Sun). A Eduzz entrega os cursos no AlpaClass pela integração já existente nos produtos.

## Setup

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `EDUZZ_TOKEN` | Access token do app no console.eduzz.com (conta John Knox). **Só servidor**, nunca use prefixo `NEXT_PUBLIC_`. |
| `EDUZZ_API_BASE` | `https://api.eduzz.com` |
| `SCHOOL_URL` | `https://johnknoxonline.alpaclass.com` |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site, sem barra final (usada no `returnUrl` e `postbackUrl`). |

## Habilitar um curso novo

1. Confirme no admin do AlpaClass que o produto da Eduzz está vinculado ao curso correto (faça uma compra de teste).
2. Em `src/data/courses.ts`, adicione/edite a linha com o **ID numérico do MyEduzz** (ex. `3143464`, não o código do link de checkout), a categoria e `enabled: true` (`on(...)`).
3. Nome e preço vêm da API da Eduzz (cache de 1h). O produto precisa estar `active` e com preço > 0.

## Deploy na Vercel

1. Importe o repositório na Vercel (framework Next.js detectado automaticamente).
2. Em *Settings → Environment Variables*, cadastre as quatro variáveis acima.
3. Faça o deploy e confira `NEXT_PUBLIC_SITE_URL` com o domínio final (alterá-la exige novo build).

## Rotas

- `POST /api/checkout` — `{ productIds: string[] }` → `{ paymentUrl }`. Preço sempre vem da Eduzz, nunca do navegador.
- `POST /api/eduzz/postback` — só registra em log o que chegar.
- `/obrigado` — instruções de acesso pós-compra.
