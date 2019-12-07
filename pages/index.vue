<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col cols="10">
        <Logo class="Brandy" />
        <b-col cols="12" class="main">
          <h4>Variación del dolar</h4>
          <Graph />
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Logo from "~/components/Brandy"
import Graph from "~/components/Graph"
export default {
  components: {
    Logo,
    Graph
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap");
h4 {
  font-family: "Montserrat", Verdana, sans-serif;
  font-weight: 700;
  font-size: 2.2em;
  letter-spacing: -2px;
  text-align: left !important;
  margin-left: 10px;
}
</style>

<style>
.main {
  border: 1px solid #e6e6e6;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.75);
  z-index: 2;
  height: 65vh;
  background-color: white;
}

.Brandy {
  position: relative;
  height: 250px;
  width: 250px;
  z-index: 1;
  left: 8%;
  margin-bottom: -51px;
}

.container {
  margin: 8% auto;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  z-index: 2;
}
</style>
