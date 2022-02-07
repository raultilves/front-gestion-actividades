<template>
  <div class="container-fluid">
    <div v-if="isLogged">
      <div class="row">
        <div class="col-2 p-0">
          <SideBar />
        </div>
        <div class="col">
          <div class="row">
            <div class="col p-0">
              <NavBar />
            </div>
          </div>
          <div class="row p-3">
            <div class="col">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
    <div class="row">
        <div class="column">
          <Footer />
        </div>
      </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      rol: "",
    };
  },
  components: {
    NavBar,
    Footer,
    SideBar,
  }, 
  computed: {
    ...mapState(['isLogged'])
  }
};
</script>
