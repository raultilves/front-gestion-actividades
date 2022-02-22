<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item border rounded-3 ms-3 bg-dark">
        <router-link to="/" class="nav-link text-center active" style="width: 120px">Home</router-link>
      </li>
      <li class="nav-item border rounded-3 ms-3 bg-dark">
        <router-link v-if="rol == 'alumno'" to="/actividades-alumno/all" class="nav-link text-center active" style="width: 120px">Actividades</router-link>
        <router-link v-else-if="rol == 'profesor'" to="/actividades-profesor" class="nav-link text-center active" style="width: 120px">Actividades</router-link>
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
import {mapState, mapMutations} from 'vuex'

export default {
  name: "NavBar",
  methods: {
    ...mapMutations(['logOut']),
    cerrarSesion() {
      this.logOut()
      
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(['rol'])
  }
};
</script>

<style>
</style>