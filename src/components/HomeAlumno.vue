<template>
  <div>
    <p class="display-1">Bienvenido {{ username }}</p>

    <p v-if="actividades.length > 1">
      Tienes {{ actividades.length }} actividades. Tienes pendiente:
      {{ actividades.length - entregas.length }}
    </p>
    <p v-else-if="actividades.length == 1 && entregas.length == 1">
      Tienes {{ actividades.length }} actividad y estás al dia
    </p>
    <p v-else-if="actividades.length == 1 && entregas.length == 0">
      Tienes {{ actividades.length }} actividad y está sin entregar
    </p>
    <p v-else>No tienes actividades aún</p>

    <hr class="my-5" />

    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Ver todas las actividades</h5>
            <p class="card-text" style="height: 100px">
              Echa un vistazo rápido a la lista de actividades propuestas en tus
              módulos. Esto mostrará tanto entregadas como pendientes.
            </p>
            <router-link to="/actividades-alumno" class="btn btn-primary">Ver más</router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Consultar módulos</h5>
            <p class="card-text" style="height: 100px">
              Consulta todos los módulos en los que estás matrículado. Desde
              aquí puedes consultar las actividades específicas de un módulo.
            </p>
            <a href="#" class="btn btn-primary">Ver más</a>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Actividades pendientes</h5>
            <p class="card-text" style="height: 100px">
              Pulsa aquí para ver todas tus actividades pendientes. Podrás
              filtrarlas por módulo y marcarlas como realizadas.
            </p>
            <a href="#" class="btn btn-primary">Ver más</a>
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
  name: "HomeAlumno",
  data() {
    return {
      modulos: [],
      actividades: [],
      entregas: [],
    };
  },
  computed: {
    ...mapState(["username", "userId", "token"]),
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
          this.modulos.push(modulo.data);

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
        console.log(this.modulos)
      } catch (err) {
        console.log(err);
      }
    },
    async totalEntregas() {
      try {
        const entregas = await axios.get(
          `http://localhost:3000/api/entregas/byalumno/${this.userId}`,
          {
            headers: {
              "auth-token": this.token,
            },
          }
        );

        if (entregas) this.entregas = entregas.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    await this.totalActividades();
    this.totalEntregas();
  },
};
</script>

<style>
</style>