# ai-extension

Este repositório contém um projeto composto por duas partes principais:

1. **API**  
   Implementada em [`api/index.js`](api/index.js), esta API cria um servidor HTTP que disponibiliza o endpoint `/api/generate` para processar requisições via método POST.  
   A API pode ser iniciada através dos scripts:
   - Pelo Node.js: `npm start` (conforme definido em [`api/package.json`](api/package.json))
   - Pelo script do Windows: execute `start.bat`
   - Pelo script do Unix/Linux: execute `start.sh`

2. **Extensão**  
   A extensão é composta por:
   - [`extension/content.js`](extension/content.js): injeta o script na página.
   - [`extension/script.js`](extension/script.js): se comunica com a API para processar as perguntas.
   - O manifesto [`extension/manifest.json`](extension/manifest.json) define as configurações necessárias para a extensão rodar nos navegadores compatíveis com Manifest V3.

## Estrutura do Projeto

```bash
ai-extension/  
├── api/  
│   ├── .gitignore  
│   ├── index.js  
│   ├── package.json  
│   ├── start.bat  
│   └── start.sh  
├── extension/  
│   ├── content.js  
│   ├── manifest.json  
│   └── script.js  
├── LICENSE  
└── README.md
```

## Como Executar a API

1. Abra um terminal na pasta `api`.

2. Inicie a API:

```bash
npm start
```

A API ficará disponível em http://127.0.0.1:11435/ para lidar com as requisições feitas pela extensão.
Como Utilizar a Extensão
A extensão injeta o script definido em script.js nas páginas, permitindo:

Capturar as solicitações dos usuários.
Enviar requisições para a API para obter respostas.
Atualizar o contexto da interação com base nas respostas recebidas.
Para instalar a extensão, utilize as ferramentas de desenvolvimento do seu navegador e carregue a pasta extension como uma extensão sem empacotamento.

Licença
Este projeto está licenciado sob a Licença MIT.
