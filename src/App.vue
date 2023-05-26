<template>
  <div>
    <div v-if="$store.state.is_login">
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
          <Menu />
        </v-navigation-drawer>

        <v-app-bar app style="background-color: white;">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>
            <vs-input placeholder="Search" />
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <vs-button circle icon>
            <i class="bx bx-share-alt"></i>
          </vs-button>

          <vs-button circle icon>
            <i class="bx bx-check"></i>
          </vs-button>

          <vs-button circle icon>
            <i class="bx bx-user"></i>
          </vs-button>

          <vs-button circle icon>
            <i class="bx bx-time"></i>
          </vs-button>

          <vs-button circle icon>
            <i class="bx bx-bell"></i>
          </vs-button>

        </v-app-bar>

        <v-main app>
          <v-container>
            <router-view />
          </v-container>
        </v-main>
      </v-app>
    </div>
    <div v-if="!$store.state.is_login">
      <v-container class="w-100 p-4 d-flex align-items-center justify-content-center" style="height: 350px;">
        <router-view />
      </v-container>

    </div>
  </div>
</template>

<script>
import Menu from "@/views/layout/Menu.vue";

export default {
  components: {
    Menu,
  },
  data() {
    return {
      drawer: null
    };
  },
  mounted: function () {
    if (this.$store.state.is_login == false) {
      this.$router.push({ name: "home" }).catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
    } else {
      this.drawer = this.$store.state.drawer;
    }
  },
}
</script>

<style></style>
