<template>
  <div
    class="d-flex flex-column flex-shrink-0 px-3 pt-2 m-0 text-white bg-dark"
    style="height: 960px"
    >
    <a
      href="/"
      class="
        d-flex
        align-items-center
        mb-3 mb-md-0
        me-md-auto
        text-white text-decoration-none
      "
    >
      <span class="fs-4">Gestion</span>
    </a>
    <hr style="margin-top: 14px; margin-bottom: 18px" />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-white" aria-current="page">
          Home
        </router-link>
      </li>
      <li>
        <router-link v-if="rol == 'alumno'" to="/actividades-alumno" class="nav-link text-white">
          Actividades
        </router-link>
        <router-link v-else-if="rol == 'profesor'" to="/actividades-profesor" class="nav-link text-white">
          Actividades
        </router-link>
      </li>
      <li>
        <router-link to="/modulos" class="nav-link text-white">
          Módulos
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "SideBar",
  computed: {
    ...mapState(['rol'])
  }
};
</script>

<style>
</style>