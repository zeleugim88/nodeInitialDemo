# Entrega 4.1: Node REST Server 💻

### Instructions to run the programm
1) Starting 🚀: To execute and test the program, first you need to copy the project on your local machine. For example, by **cloning the github repository**. 
2) Pre requirements / Recommended tech-stack 📋: **Visual Studio Code, Node.js, npm**
3) Installation 🔧 : Execute command **npm install** in the node terminal to install the dependencies
4) Commands to start the program ⌨️ : **npm start**

### Project Structure ⚙️ - Endpoints - Screenshots: 

### Nivell 1
- Exercici 1 : Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i la url des d'on es fa la petició.
- Exercici 2: Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.

**User GET** http://localhost:8080/user

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.1.NodeRestServer/screenshots/user2.png)

**Upload POST - accepted format** http://localhost:8080/upload

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.1.NodeRestServer/screenshots/upload-post2.png)

**Upload POST - rejected format** http://localhost:8080/upload

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.1.NodeRestServer/screenshots/upload-post-rejected2.png)

### Nivell 2
- Exercici 1 : Creu un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, ja sigui mitjançant Express o mitjançant un altre middleware.

**Time GET - accepted credentials** http://localhost:8080/time

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.1.NodeRestServer/screenshots/time-get2.png)

### Nivell 3
- Exercici 1: Afegeixi un middleware a l'endpoint anterior que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari i contrasenya).
- 
**Time GET - rejected credentials** http://localhost:8080/time

![](https://raw.githubusercontent.com/zeleugim88/nodeInitialDemo/4.1.NodeRestServer/screenshots/time2.png)


