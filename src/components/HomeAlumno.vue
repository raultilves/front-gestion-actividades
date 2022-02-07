<template>
  <div>
    <p class="display-1">Bienvenido {{ usuario }}</p>

    <p v-if="actividades.length > 1">
      Tienes {{ actividades.length }} actividades. Tienes pendiente:
      {{ actividades.lenght - entregas.length }}
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
            <a href="#" class="btn btn-primary">Ver más</a>
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
import axios from "axios";

export default {
  name: "HomeAlumno",
  data() {
    return {
      usuario: "",
      userId: "",
      modulos: [],
      actividades: [],
      entregas: [],
    };
  },
  methods: {
    async totalActividades() {
      const usuario = localStorage.getItem("username");
      const userId = localStorage.getItem("_id");

      if (usuario) {
        this.usuario = usuario;
        this.userId = userId;
        
        try {
          const matriculas = await axios.get(
            `http://localhost:3000/api/matriculas/byalumno/${userId}`,
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );

          matriculas.data.forEach(async (matricula) => {
            const modulo = await axios.get(
              `http://localhost:3000/api/modulos/${matricula.modulo_id}`,
              {
                headers: {
                  "auth-token": localStorage.getItem("auth-token"),
                },
              }
            );
            this.modulos.push(modulo.data);

            axios
              .post(
                "http://localhost:3000/api/actividades/find",
                {
                  modulo_id: modulo.data._id,
                },
                {
                  headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                  },
                }
              )
              .then((res) => {
                this.actividades = res.data;
              });
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$router.push("login");
      }
    },
    async totalEntregas() {
      if (this.usuario && this.rol == "alumno") {
        try {
          const entregas = await axios.get(
            `http://localhost:3000/api/entregas/byalumno/${this.userId}`,
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );

          if (entregas) this.entregas = entregas.data;
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  created() {
    this.totalActividades();
    this.totalEntregas();
  },
};
</script>

<style>
</style>