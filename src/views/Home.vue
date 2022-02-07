<template>
  <div>
    <div v-if="rol == 'alumno'">
      <HomeAlumno />
    </div>
    <div v-else-if="rol == 'profesor'">
      <HomeProfesor />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeAlumno from "@/components/HomeAlumno.vue"
import HomeProfesor from "@/components/HomeProfesor.vue"

export default {
  name: "Home",
  data() {
    return {
      rol: "",
    };
  },
  components: {
    HomeAlumno,
    HomeProfesor
  },
  methods: {
    
  },
  created() {
    const usuario = localStorage.getItem("username")
    if (usuario) {
      this.rol = localStorage.getItem("rol");
    } else {
      this.$router.push('login')
    }
    
  },
};
</script>
