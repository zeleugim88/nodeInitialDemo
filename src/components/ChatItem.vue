<template>

  <div class="presentation">
    <h1>{{ msg }}</h1>
    <p>
      Keeping our space explorers connected since 2340
    </p>
  </div>
  <div class="info">
    <h3>Intergalactic Communication Services provided by: </h3>
    <ul>
      <li><a href="https://www.barcelonactiva.cat/es/itacademy" target="_blank" rel="noopener">IT Academy</a></li>
      <li><a href="https://github.com/zeleugim88/" target="_blank" rel="noopener">Github</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
