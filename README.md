# 👩‍🚀 SPRINT 5: SOCKET CHAT 👽

### Sign Up / Log In ✍️
_To create your chat user, provide a nickname and a password. To Log in again, use the same nickname and password._

![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/1.png)

### Menu 🏡
_On this page you can either join an already created room (on the right sidebar) or create your own room (button at the center). If there is not any room created, you will need to create one at least._

![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/2.png)

### Chat Page - Two users chatting

![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/3.png)

### Chat Page - One user leaves the room to come back to the Menu

![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/4.png)

## Chat Tech
![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/5.png)

### Client Technology used💻
_The frontend has been developed without using any frameworks, just with javascript (vanilla style)._
_An express server was initiated to be able to serve the static content (in folder public) with more funcionalities like choosing the server PORT._ 
_Public folder contains: _
1) Some style assets like CSS, images... 
2) 3 HTML files (homepage for signup / login, menu page and chat page). 
3) 3 Javascript files (one for each HTML file) that contains the buttons, event-handlers, html-elements definition and cleaning of session storage.
4) 2 helper javascript files (users and rooms) for the FETCH functions that manage the requests and the responses with the server. 
 
 ⚠️ FRONT IS NOT RESPONSIVE, SO THE CHAT CAN ONLY BE USED IN COMPUTER WITH FULL SCREEN ⚠️
 
 ![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/6.png)

### Server Technology used⚙️
_Express, HTTP and Socket server are class based. This provides a clean way to organize the chat._
_The database models are 3: message, room and user. This last one hast two methods to generate authentification tokens and to find users in database._
_There are five endpoints defined clearly and separately in both routes and controllers folder: /signup, /login, /user and /rooms_
_Authentification is based on Json Web Tokens_

![Demo](https://raw.githubusercontent.com/zeleugim88/chat-it-academy/main/img/7.png)
