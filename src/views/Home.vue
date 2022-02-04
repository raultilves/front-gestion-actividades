<template>
  <div>
    <NavBar />
    <div class="container mt-5">
      <p class="display-1">Bienvenido {{ usuario }}</p>

      <div v-for="item in actividades" :key="item._id">
        {{ item.titulo }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      usuario: "",
      modulos: [],
      actividades: [],
    };
  },
  components: {
    NavBar,
  },
  async created() {
    const usuario = localStorage.getItem("username");
    const rol = localStorage.getItem("rol");
    const userId = localStorage.getItem("_id");

    if (usuario) {
      this.usuario = usuario;
    }

    if (rol == "alumno") {
      const matriculas = await axios.get(
        `http://localhost:3000/api/matriculas/byalumno/${userId}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      matriculas.data.forEach(async (matricula) => {
        const modulo = await axios.get(`http://localhost:3000/api/modulos/${matricula.modulo_id}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        this.modulos.push(modulo.data);

        axios.post("http://localhost:3000/api/actividades/find",
          {
            modulo_id: modulo._id,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        ).then((res) => {
          this.actividades = res.data
        });
      });
    }
  },
};
</script>
