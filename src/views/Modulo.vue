<template>
  <div class="card mx-auto mt-5" style="width: 50rem">
    <div class="card-body">
      <h5 class="card-title">{{ modulo.nombre }}</h5>
      <p>Docente: {{ profesor.username.charAt(0).toUpperCase() + profesor.username.slice(1) }}</p>

      <hr>

      <ul class="list-group">
        <li v-for="item in actividades" :key="item.id" class="list-group-item">
          {{item}}
        </li>
      </ul>

      <hr>

      <button v-if="!entregada" @click="entregar" class="btn btn-success">Marcar como entregada</button>
      <button v-if="entregada" @click="desentregar" class="btn btn-danger">Marcar como no entregada</button>
      <router-link to="/actividades-alumno" class="btn btn-primary position-absolute end-0 me-3">Volver</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      modulo: {},
      profesor: {},
      actividades: []
    };
  },
  computed: {
    ...mapState(["token", "userId"]),
  },
  methods: {
    async queryModulo(){
      try {
        const modulo = await axios.get(
          `http://localhost:3000/api/modulos/${this.$route.params.id}`,
          {
            headers: {
              "auth-token": this.token
            }
          }
        )

        const docente = await axios.get(
          `http://localhost:3000/api/user/${modulo.data.profesor_id}`,
          {
            headers: {
              "auth-token": this.token
            }
          }
        )

        const actividades = await axios.post(
          `http://localhost:3000/api/actividades/find`,
          {
            modulo_id: modulo.data._id
          },
          {
            headers: {
              "auth-token": this.token
            }
          }
        )

        this.actividades = actividades.data
        this.profesor = docente.data
        this.modulo = modulo.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {

  }
}
</script>

<style>

</style>