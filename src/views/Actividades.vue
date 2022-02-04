<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row" v-if="rol == 'alumno'">
        <div
          v-for="item in actividades.data"
          :key="item._id"
          class="col-4 mt-5"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.titulo }}</h5>
              <p class="card-text">{{ item.descripcion }}</p>
              <a href="#" class="btn btn-primary">Ver</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else-if="rol == 'profesor'">
        <div class="col-4 mt-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Crear actividad</h5>
              <p class="card-text">
                Crea una nueva actividad para uno de tus módulos
              </p>
              <a href="#" class="btn btn-primary">Crear</a>
            </div>
          </div>
        </div>
        <div class="col-4 mt-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Consultar entregas</h5>
              <p class="card-text">
                Consulta las actividades entregadas de tus actividades
              </p>
              <a href="#" class="btn btn-primary">Consultar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
export default {
  name: "Actividades",
  data() {
    return {
      actividades: [],
      rol: "",
    };
  },
  methods: {},
  components: {
    NavBar,
  },
  async beforeCreate() {
    try {
      const actividades = await axios.get(
        "http://localhost:3000/api/actividades/",
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      this.rol = localStorage.getItem("rol");
      this.actividades = actividades;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

