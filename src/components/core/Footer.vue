<template>
  <v-footer padless absolute class="mt-6">
    <v-row justify="center" no-gutters>
      <v-col class="primary py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Arquitectura-Web</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "DashboardCoreFooter",
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>
