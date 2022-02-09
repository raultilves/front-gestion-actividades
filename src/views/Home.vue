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
import {mapState} from "vuex"
// @ is an alias to /src
import HomeAlumno from "@/components/HomeAlumno.vue"
import HomeProfesor from "@/components/HomeProfesor.vue"

export default {
  name: "Home",
  data() {
    return {
    };
  },
  components: {
    HomeAlumno,
    HomeProfesor
  },
  computed: {
    ...mapState(['rol', 'isLogged'])
  },
  created() {
    if (!this.isLogged) {
      this.$router.push('/login')
    }
  }
};
</script>
