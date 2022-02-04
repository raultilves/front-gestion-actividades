<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container -fluid">
        <ul class="navbar-nav">
          <li class="nav-item" v-show="logged">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item" v-if="rol == 'alumno'">
            <router-link to="/actividades" class="nav-link">Actividades</router-link>
          </li>
          <li class="nav-item" v-if="!logged">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-else-if="logged">
            <a href="#" @click="cerrarSesion" class="nav-link">Cerrar sesión</a>
          </li>
        </ul>
      </div>
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