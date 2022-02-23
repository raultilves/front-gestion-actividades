<template>
  <div>
    <div class="row">
      <div class="col">
        <p class="display-2">Actividades Pendientes</p>
      </div>
    </div>
    <div class="row">
      <select class="form-select" @change="filterHandler">
        <option value="all">Todos los módulos</option>
        <option v-for="modulo in modulos" :key="modulo._id" :value="modulo._id">
          {{ modulo.nombre }}
        </option>
      </select>
    </div>
    <hr />
    <div class="row">
      <div v-for="item in actividades" :key="item._id" class="col-4 mt-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.titulo }}</h5>
            <p class="card-text">{{ item.descripcion }}</p>
            <router-link
              :to="{ name: 'Actividad', params: { id: item._id } }"
              class="btn btn-primary"
              >Ver</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Actividades",
  data() {
    return {
      modulos: [],
      actividades: [],
    };
  },
  computed: {
    ...mapState(["token", "username", "userId"]),
  },
  methods: {
    filterHandler(event) {
      if (event) {
        if (event.target.value == "all") {
          this.queryPendientes("all");
        } else {
          this.queryPendientes(event.target.value);
        }
      }
    },
    async queryPendientes(query) {
      console.log(query);
      this.actividades = []
      try {
        if (query == "all") {
          const matriculas = await axios.get(
            `http://localhost:3000/api/matriculas/byalumno/${this.userId}`,
            {
              headers: {
                "auth-token": this.token,
              },
            }
          );

          matriculas.data.forEach(async (matricula) => {
            const modulo = await axios.get(
              `http://localhost:3000/api/modulos/${matricula.modulo_id}`,
              {
                headers: {
                  "auth-token": this.token,
                },
              }
            );
            this.modulos.push(modulo.data);

            const actividades = await axios.post(
              "http://localhost:3000/api/actividades/find",
              {
                modulo_id: modulo.data._id,
              },
              {
                headers: {
                  "auth-token": this.token,
                },
              }
            );

            actividades.data.forEach(async (actividad) => {
              const response = await axios.post(
                `http://localhost:3000/api/entregas/find`,
                {
                  actividad_id: actividad._id,
                  alumno_id: this.userId,
                },
                {
                  headers: {
                    "auth-token": this.token,
                  },
                }
              );
              if (response.data.length == 0) {
                this.actividades.push(actividad);
              }
            });
          });
        } else {
          const modulo = await axios.get(
            `http://localhost:3000/api/modulos/${query}`,
            {
              headers: {
                "auth-token": this.token,
              },
            }
          );
          this.modulos.push(modulo.data);

          const actividades = await axios.post(
            "http://localhost:3000/api/actividades/find",
            {
              modulo_id: modulo.data._id,
            },
            {
              headers: {
                "auth-token": this.token,
              },
            }
          );

          actividades.data.forEach(async (actividad) => {
            const response = await axios.post(
              `http://localhost:3000/api/entregas/find`,
              {
                actividad_id: actividad._id,
                alumno_id: this.userId,
              },
              {
                headers: {
                  "auth-token": this.token,
                },
              }
            );
            if (response.data.length == 0) {
              this.actividades.push(actividad);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    await this.queryPendientes(this.$route.params.modulo);
  },
};
</script>

<style>
</style>