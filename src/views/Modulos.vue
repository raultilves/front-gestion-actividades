<template>
  <div>
    <div class="row">
      <div class="col">
        <p class="display-2">Tus matrículas</p>
      </div>
    </div>
    <hr />
    <div class="row">
      <div v-for="item in modulos" :key="item._id" class="col-4 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Modulo: {{ item.nombre }}</h5>
            <p class="card-text">Docente: {{ item.profesor.username.charAt(0).toUpperCase() + item.profesor.username.slice(1) }}</p>
            <div class="d-grid gap-2">
              <router-link :to="{ name: 'ActividadesAlumno', params: { modulo: item._id } }"
                class="btn btn-outline-primary"
                >Consultar sus actividades</router-link
              >
            </div>
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
  name: "Modulos",
  data() {
    return {
      modulos: [],
    };
  },
  computed: {
    ...mapState(["token", "username", "userId"]),
  },
  methods: {
    async queryModulos() {
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
          const docente = await axios.get(
            `http://localhost:3000/api/user/${modulo.data.profesor_id}`,
            {
              headers: {
                "auth-token": this.token
              }
            }
          )
          modulo.data.profesor = docente.data
          this.modulos.push(modulo.data);
        });

        console.log(matriculas);
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    this.queryModulos();
    console.log(this.modulos)
  },
};
</script>