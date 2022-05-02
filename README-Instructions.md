# nodeInitialDemo
## Entrega 4.2: Node REST + DB + JWT


### Instructions to run the programm
1) Starting 🚀: To execute and test the program, first you need to copy the project on your local machine. For example, by **cloning the github repository**. 
2) Pre requirements / Recommended tech-stack 📋: **Visual Studio Code, Node.js, npm, mySQL, MongoDB**
3) Installation 🔧 : Execute command **npm install** in the node terminal to install the dependencies
4) Set local variables, localhost, mysql password etc in the files ".env" and "config.js"
5) Create database, for example in MySQL Workbench run SQL query => CREATE DATABASE "node" (same name as in the "config.js" file;
6) Commands to start the program ⌨️ : **npm start**

### Project Structure ⚙️ 

### Endpoints - Postman Collection - Screenshots: 

**1) POST /players: crea un jugador**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/1.png)

**2) PUT /players: modifica el nom del jugador**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/2.png)

**3) POST /players/{id}/games: un jugador específic realitza una tirada**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/3.png)

**4) DELETE /players/{id}/games: elimina les tirades del jugador**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/4.png)

**5) GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/5.png)

**6) GET /players/{id}/games: retorna el llistat de jugades per un jugador**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/6.png)

**7) GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/7.png)

**8) GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/8.png)

**9) GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit**

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.2.Daus/img/9.png)
