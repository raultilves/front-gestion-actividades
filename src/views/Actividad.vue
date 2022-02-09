<template>
  <div class="card mx-auto mt-5" style="width: 50rem">
    <div class="card-body">
      <h5 class="card-title">{{ actividad.titulo }} - {{ modulo.nombre }}</h5>
      <p>{{ actividad.descripcion }}</p>
      <p>Límite de entrega: {{ fechaFormatted }}</p>

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
      actividad: {},
      fechaFormatted: "",
      modulo: {},
      entregada: false
    };
  },
  computed: {
    ...mapState(["token", "userId"]),
  },
  methods: {
    async getActivity() {
      const actividad = await axios.get(
        `http://localhost:3000/api/actividades/${this.$route.params.id}`,
        {
          headers: {
            "auth-token": this.token,
          },
        }
      );
      this.actividad = actividad.data
      const fecha_limite = new Date(actividad.data.fecha_limite)
      this.fechaFormatted = fecha_limite.toLocaleString('es-ES')
    },
    async getModulo() {
      const modulo = await axios.get(
        `http://localhost:3000/api/modulos/${this.actividad.modulo_id}`,
        {
          headers: {
            "auth-token": this.token,
          },
        }
      );
      this.modulo = modulo.data
    },
    async comprobarEntrega() {
      const entregas = await axios.get(
        `http://localhost:3000/api/entregas/byalumno/${this.userId}`,
        {
          headers: {
            "auth-token": this.token
          }
        }
      )

      let match = false;
      entregas.data.forEach(entrega => {
        if (entrega.actividad_id == this.actividad._id) {
          match = true
        }
      })
      
      if (match) {
        this.entregada = true
      } else {
        this.entregada = false
      }
    },
    async entregar() {
      const res = await axios.post('http://localhost:3000/api/entregas/', 
      {
        "alumno_id": this.userId,
        "actividad_id": this.actividad._id
      },
      {
        headers: {
          "auth-token": this.token
        }
      })
      console.log(res)
      this.comprobarEntrega()
    },
    async desentregar() {
      const entrega = await axios.post('http://localhost:3000/api/entregas/find',
        {
          "actividad_id": this.actividad._id,
          "alumno_id": this.userId
        }, 
        {
          headers: {
            "auth-token": this.token
          }
        }
      )
      const res = await axios.delete(`http://localhost:3000/api/entregas/${entrega.data[0]._id}`,
        {
          headers: {
            "auth-token": this.token
          }
        }
      )
      console.log(res)
      this.comprobarEntrega()
    }
  },
  async created() {
    await this.getActivity();
    this.getModulo();
    this.comprobarEntrega()
  },
};
</script>

<style>
</style>