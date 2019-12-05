<template>
  <b-container>
    <Logo class="Brandy"/>
    <b-row class="justify-content-center">
      <b-col cols="10" class="main">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Logo from '~/components/Brandy'
export default {
  components: {
    Logo
  }
}
</script>

<style>

.main {
  border: 1px solid #e6e6e6;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.75);
  z-index: 2;
  height: 55vh;
  background-color: white;
}

.Brandy {
  position: absolute;
  height: 300px;
  width: 300px;
  z-index: 1;
  top: 1%;
  left: 6%;
}

.container {
  margin: 10% auto;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
}

</style>
