<template>
  <div>
    <div class="row">
      <div class="col">
        <p class="display-2">Todas tus actividades</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-link :to="{name: 'ActividadesPendientes', params: {modulo: 'all'}}" class="btn btn-primary">Ver solo las pendientes</router-link>
      </div>
    </div>
    <hr>
    <div class="row">
      <div v-for="item in actividades" :key="item._id" class="col-4 mt-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.titulo }}</h5>
            <p class="card-text">{{ item.descripcion }}</p>
            <router-link :to="{name: 'Actividad', params: {id: item._id}}" class="btn btn-primary">Ver</router-link>
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
      actividades: [],
    };
  },
  computed: {
    ...mapState(["token", "username", "userId"]),
  },
  methods: {
    async totalActividades() {
      try {
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

          const actividades = await axios
            .post(
              "http://localhost:3000/api/actividades/find",
              {
                modulo_id: modulo.data._id,
              },
              {
                headers: {
                  "auth-token": this.token,
                },
              }
            )
            
            actividades.data.forEach(actividad => {
              this.actividades.push(actividad)
            })
        });
      } catch (err) {
        console.log(err);
      }
    },
    async actividadesByModulo(query) {
      try {
        const actividades = await axios.post(
          `http://localhost:3000/api/actividades/find/`,
          {
            modulo_id: query,
          },
          {
            headers: {
              "auth-token": this.token
            }
          },
        )

        actividades.data.forEach(actividad => {
          this.actividades.push(actividad)
        })

      } catch (err) {
        console.log(err)
      }
    }
  },
  async created() {
    if (this.$route.params.modulo == "all") {
      await this.totalActividades();
    } else {
      await this.actividadesByModulo(this.$route.params.modulo);
    }
    
    
  },
};
</script>

