Comandos para migrar um projeto React de Javascript para Typescript:

Fonte: https://create-react-app.dev/docs/adding-typescript/#installation

Instalando Typescript no projeto:
npm install --save typescript @types/node @types/react @types/react-dom @types/jest

Criando o tsconfig.json:
npx tsc --init

Criar um arquivo chamado "react-app-env.d.ts":
/// <reference types="react-scripts" />

Instalar os tipos do styled components:
npm i --save-dev @types/styled-components

Instalar os tipos do react modal:
npm i --save-dev @types/react-modal

Instalar os tipos de react router dom:
npm i --save-dev @types/react-router-dom






