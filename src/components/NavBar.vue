<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item border rounded-3 ms-3 bg-dark">
        <router-link to="/" class="nav-link text-center active" style="width: 120px">Home</router-link>
      </li>
      <li class="nav-item border rounded-3 ms-3 bg-dark">
        <router-link to="/actividades" class="nav-link text-center active" style="width: 120px">Actividades</router-link>
      </li>
      <li class="nav-item border rounded-3 ms-3 bg-dark">
        <router-link to="/modulos" class="nav-link text-center active" style="width: 120px">Modulos</router-link>
      </li>
      <li class="nav-item position-absolute end-0 border rounded-3 me-3 bg-danger">
        <a href="#" @click="cerrarSesion" class="nav-link text-center active" style="width: 120px">Cerrar sesión</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "NavBar",
  methods: {
    ...mapMutations(['logOut']),
    cerrarSesion() {
      localStorage.clear()

      this.logOut()
      this.$router.push("login");
    },
  },
};
</script>

<style>
</style>