
# Entrega 5.1: Xat

### Project Structure

Descripció
Construïm un Xat!!!

Necessitarem socket.io, una biblioteca de Javascript per a aplicacions web en temps real. Permet la comunicació bidireccional en temps real entre clients i servidors web. Té dues parts: una biblioteca del costat del client que s'executa en el navegador i una biblioteca del costat del servidor per a Node.js. 

Trobaràs el que necessitis en socket.io

### Nivell 1
Crea una aplicació que mostri una pàgina de login on l'usuari pugui entrar a una sala de xat (el client i el server han d'estar completament separats). Obrint la mateixa url en una altra finestra del navegador podrem fer login amb un altre usuari. Verifica que estan en la mateixa sala i permet que xategin l'un amb l'altre. Afegeix la possibilitat de crear múltiples sales de xat i gestiona la persistència amb MongoDB (amb Mongoose) o MySQL (amb Sequelize).

### Nivell 2
Afegeix autentificació utilitzant Google Token (google-auth-library)

### Nivell 3
Per superar aquest nivell pots afegir diferents opcions:
Afegeix qualsevol funcionalitat que vegis útil
Afegeix la personalització del frontend que vulguis
Realitza el frontend amb algun framework (React, Vue, Angular)
Efectua el projecte amb TypeScript