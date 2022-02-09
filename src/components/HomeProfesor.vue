<template>
  <div>
    <div class="row">
      <p class="display-1">Bienvenido {{ usuario }}</p>

      <p>Actualmente eres docente de {{ modulos.length }} modulo(s)</p>
    </div>

    <hr>

    <div class="row mt-3">
      <div class="col-4">
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
      <div class="col-4">
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
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Ver mis módulos</h5>
            <p class="card-text">
              Lista los módulos en los que eres profesor
            </p>
            <a href="#" class="btn btn-primary">Consultar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import axios from "axios";

export default {
  name: "HomeProfesor",
  data() {
    return {
      modulos: [],
      actividades: [],
    };
  },
  computed: {
    ...mapState(['username', 'userId', 'token'])
  },
  methods: {
    async stats(userId) {
      try {
        const modulos = await axios.post(
          "http://localhost:3000/api/modulos/find",
          {
            profesor_id: userId,
          },
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );
        this.modulos = modulos.data
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.stats(this.userId);
  },
};
</script>

<style>
</style>