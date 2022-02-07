<template>
  <div class="container">
    <div class="postion-relative">
      <div class="position-absolute top-50 start-50 translate-middle">
        <div
          class="border p-5 rounded-3 bg-dark"
          style="width: 400px; height: 300px"
        >
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input
                type="text"
                name="user"
                id="user"
                placeholder="Usuario"
                class="form-control"
                v-model="username"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                class="form-control"
                v-model="password"
              />
            </div>

            <div class="d-grid fixed-bottom m-5">
              <button class="btn btn-primary">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(['logIn']),
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/login",
          {
            username: this.username,
            password: this.password,
          }
        );

        const jwtDecoded = await VueJwtDecode.decode(response.data.token);

        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("rol", jwtDecoded.rol);
        localStorage.setItem("_id", jwtDecoded._id);
        localStorage.setItem("username", jwtDecoded.username);

        this.logIn()
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>