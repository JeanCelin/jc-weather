# JC Weather - Weather Forecast System
**v1.0.0**
## 1. Introduction

**JC Weather** is a weather forecast system developed using modern web technologies. The system allows users to search for weather information for any city by entering its name. It operates by consuming two distinct APIs: one to obtain the geographical coordinates of the searched city and another to retrieve the corresponding weather data.

## 2. Objective

The project's goal is to provide an intuitive and efficient way to check weather forecasts, making it easier to access climate information for different locations.

## 3. Technologies Used

- **JavaScript (ES6+)** - Main language for data manipulation and user interaction.
- **HTML5** - Structure of the user interface.
- **CSS3** - Styling and system responsiveness.
- **Next.js** - Framework for web development using React.
- **Axios** - Library for making HTTP requests.
- **Git** - Version control system.
- **GitHub** - Repository hosting and collaboration.
- **Vercel** - Platform for continuous deployment.
- **OpenWeather APIs**:
  - **Geocoding API**: Converts the city name entered by the user into geographical coordinates (latitude and longitude).
  - **5 Days Forecast API**: Provides a weather forecast based on the obtained geographical coordinates.

## 4. System Functionality

1. The user enters the city name in the search field.
2. The system makes a request to the **Geocoding API**, which returns the city's latitude and longitude.
3. These coordinates are used to make another request to the **5 Days Forecast API**, which returns the corresponding weather data.
4. Weather information (temperature, humidity, wind speed, etc.) is displayed in an organized and intuitive interface.

## 5. Project Structure

```
JC-Weather/
│-- public/       # Public resources like icons and images
│-- src/          # Main source code
│   ├── components/  # Reusable components
│   ├── hooks/       # Custom hooks
│   ├── styles/      # CSS styling
│-- pages/        # Website pages
│   ├── index.html    # Page structure
│   ├── index.js      # Main component
│-- package.json  # Project dependencies and scripts
```

## 6. Installation and Execution

### 6.1. Requirements

- Node.js installed (for package management if needed)

### 6.2. Cloning the Repository

```sh
git clone https://github.com/JeanCelin/jc-weather.git
cd jc-weather
```

### 6.3. Installing Dependencies (if applicable)

```sh
npm install
```

### 6.4. Running the Project

```sh
npm start
```

## 7. Licensing

The code for this project is freely available for modification and distribution. However, the rights and terms of use of the utilized APIs should be checked directly with the service providers.

## 8. Developer

- **Jean Celin** - Front-End Developer
- Contact: [LinkedIn](https://www.linkedin.com/in/jean-celin/) | [GitHub](https://github.com/JeanCelin) | [Portfolio](https://jeancelin.vercel.app/)


---
---
---

# JS Weather - Sistema de Previsão do Tempo
**v1.0.0**

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



