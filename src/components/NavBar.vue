<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item border rounded-3 ms-3 bg-dark" v-show="logged">
        <router-link to="/" class="nav-link text-center active" style="width: 120px">Home</router-link>
      </li>
      <li class="nav-item border rounded-3 ms-3 bg-dark" v-if="rol == 'alumno'">
        <router-link to="/actividades" class="nav-link text-center active" style="width: 120px">Actividades</router-link>
      </li>
      <li class="nav-item border rounded-3 ms-3 bg-dark" v-if="rol == 'alumno'">
        <router-link to="/modulos" class="nav-link text-center active" style="width: 120px">Modulos</router-link>
      </li>
      <li class="nav-item position-absolute top-25 end-0 border rounded-3 me-3 bg-primary" v-if="!logged">
        <router-link to="/login" class="nav-link text-center active" style="width: 120px">Login</router-link>
      </li>
      <li class="nav-item position-absolute top-25 end-0 border rounded-3 me-3 bg-danger" v-else-if="logged">
        <a href="#" @click="cerrarSesion" class="nav-link text-center active" style="width: 120px">Cerrar sesión</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      logged: false,
      rol: "",
    };
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("rol");

      this.$router.push("login");
      this.logged = false;
    },
  },
  computed: {},
  created() {
    const user = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    if (user) {
      this.logged = true;
      this.rol = rol;
    }
  },
};
</script>

<style>
</style>