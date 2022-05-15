<template>
  <div>
    <img class="logo" alt="MCR logo" src="./assets/mars-congress.png">
  </div> 

  <div class="rightbox">
    <select-username
      v-if="!usernameAlreadySelected"
      @input="onUsernameSelection" 
    />
    <chat v-else /> 
  </div>

    
  <!--<ChatItem msg="The Martian Chat"/>-->
  <!--¿Por qué no puedo cambiar estilos de "The Martian Chat??? Qué es el style de #app??"-->
  <div class="presentation">
    <h1>The Martian Chat</h1>
    <p>
      Keeping our space explorers connected since 2340
    </p>
  </div>
  <div class="info">
    <h3 style="font-size: 12px">Intergalactic Communication Services provided by: </h3>
    <ul>
      <li><a href="https://www.barcelonactiva.cat/es/itacademy" target="_blank" rel="noopener">IT Academy</a></li>
      <li><a href="https://github.com/zeleugim88/" target="_blank" rel="noopener">Github</a></li>
    </ul>
  </div>

</template>

<script>
//import ChatItem from './components/ChatItem.vue'
import SelectUsername from './components/SelectUsername.vue'

export default {
  name: 'App',
  components: {
    //ChatItem,
    SelectUsername
  },
  data() { //A) initial reactive state
    return {
      //The application is started with usernameAlreadySelected set to false, so the form to select a username is displayed
      usernameAlreadySelected: false,
    };
  },
  
  methods: { //A) state related (see data() above). Methods = function bound to the Vue instance
  //Methods: it accepts parameters and will be re-evaluated every time it's called
    //Once the form is submitted, we'll reach the onUsernameSelection method:
    onUsernameSelection(username) { 
      this.usernameAlreadySelected = true;
      const jitu = username; 
      console.log(jitu)
            /*socket.auth = { username }; //We attach the username in the auth object
      socket.connect(); */
      //In the client initialization autoConnect is set to false so that 
      //only at this point we call socket.connect()
    },
  },
  
} 
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size:250px;
}

p {
  font-size: 20px;

}

ul {
  list-style-type: none;

}

li {
  display: inline-block;

}

a {
  color: #42b983;
  padding: 10px;
}

body {
  position: fixed;
  background-image: url("./assets/mars_planet.jpg");
  background-size: 2000px 1000px;
}

.rightbox {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  overflow-x: hidden;
  background-image: url("./assets/metalic.png");
}

.logo {
  max-width: 150px;
  max-height: 150px;
  position: fixed;
  top: 5px;
  left: 5px;
}

.presentation {
  position: fixed;
  right: 600px;
  top: 300px;
}

.info {
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  width: 300px;
  color: white;
}

h3 {
  font-size: 2px;
}
</style>
