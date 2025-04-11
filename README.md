# Laravel Test Front (Angular)

Este projeto é um frontend Angular desenvolvido como parte de um teste técnico para a empresa Inicie. Utiliza a versão mais recente do Angular e Tailwind CSS 4.1 para construção da interface.

## 📦 Tecnologias

- Angular (mais recente via CLI)
- TypeScript
- SCSS
- Tailwind CSS 4.1

## 📁 Estrutura do Projeto

- `src/app` – Componentes e serviços principais
- `src/assets` – Imagens e arquivos estáticos
- `src/styles.scss` – Estilos globais e configuração do Tailwind
- `src/environments` – Configurações de ambiente (`apiUrl`, etc.)

## ⚙️ Configuração de Ambiente

No arquivo `src/environments/environment.ts`, configure a URL da API:

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:8000/api",
};
```

## 🚀 Como Rodar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
ng serve
```

O projeto estará disponível em `http://localhost:4200`.

## 🎨 Tailwind CSS

Tailwind já está configurado na versão 4.1. Você pode usar qualquer utilitário diretamente nos templates Angular. Os estilos globais podem ser adicionados em `styles.scss`.

## 📌 Observações

- Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica.
- Não contém backend.

---

Feito com 💻 por Rodrigo Portillo (VelhoBit)
