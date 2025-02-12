# JS Weather - Sistema de Previsão do Tempo

## 1. Introdução

O **JS Weather** é um sistema de previsão do tempo desenvolvido utilizando tecnologias web modernas. O sistema permite que os usuários busquem informações meteorológicas de qualquer cidade ao inserir seu nome. O funcionamento do sistema se baseia no consumo de duas APIs distintas: uma para obter as coordenadas geográficas da cidade pesquisada e outra para recuperar os dados climáticos da região correspondente.

## 2. Objetivo

O projeto tem como objetivo fornecer um meio intuitivo e eficiente para consulta de previsões meteorológicas, facilitando o acesso a informações climáticas de diferentes localidades.

## 3. Tecnologias Utilizadas

- **JavaScript (ES6+)** - Linguagem principal para manipulação de dados e interação do usuário.
- **HTML5** - Estruturação da interface do usuário.
- **CSS3** - Estilização e responsividade do sistema.
- **Next.js** - Framework para desenvolvimento web utilizando React.
- **Axios** - Biblioteca para requisições HTTP.
- **Git** - Controle de versão do projeto.
- **GitHub** - Hospedagem do repositório e colaboração.
- **Vercel** - Plataforma para implantação contínua do projeto.
- **APIs OpenWeather**:
  - **Geocoding API**: Responsável por converter o nome da cidade inserida pelo usuário em coordenadas geográficas (latitude e longitude).
  - **5 Days Forecast API**: Fornece previsão do tempo baseada nas coordenadas geográficas obtidas.

## 4. Funcionamento do Sistema

1. O usuário insere o nome da cidade no campo de busca.
2. O sistema faz uma requisição à **Geocoding API**, que retorna a latitude e longitude da cidade.
3. Essas coordenadas são utilizadas para fazer uma nova requisição à **5 Days Forecast API**, que retorna os dados meteorológicos correspondentes.
4. As informações climáticas (temperatura, umidade, velocidade do vento, entre outras) são exibidas na interface do usuário de maneira organizada e intuitiva.

## 5. Estrutura do Projeto

```
JS-Weather/
│-- public/       # Recursos públicos como ícones e imagens
│-- src/          # Código-fonte principal
│   ├── components/  # Componentes reutilizáveis
|-- |-- ├── hooks/      # Hooks personalizados
│   ├── styles/      # Estilização em CSS
│-- pages/        # Páginas do site
|-- ├── index.html    # Estrutura da página
│   ├── index.js      # Componente principal
│-- package.json  # Dependências e scripts do projeto
```

## 6. Instalação e Execução

### 6.1. Requisitos

- Node.js instalado (para uso de pacotes, se necessário)

### 6.2. Clonando o repositório

```sh
git clone https://github.com/JeanCelin/jc-weather.git
cd jc-weather
```

### 6.3. Instalando dependências (se aplicável)

```sh
npm install
```

### 6.4. Executando o projeto

```sh
npm start
```

## 7. Licenciamento

O código deste projeto é de uso livre, podendo ser modificado e distribuído conforme desejado. No entanto, os direitos e termos de uso das APIs utilizadas devem ser consultados diretamente com os provedores de serviço.

## 8. Desenvolvedor

- **Jean Celin** - Desenvolvedor Front-End
- Contato: [LinkedIn](https://www.linkedin.com/in/jean-celin/) | [GitHub](https://github.com/JeanCelin) | [Portfólio](https://jeancelin.vercel.app/)

