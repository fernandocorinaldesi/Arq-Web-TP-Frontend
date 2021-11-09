<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
      
          class="my-3"
          contain
          height="50"
        />
      </v-col>

      <v-col class="mb-1">
        <h1 class="display-2 font-weight-bold mb-3">Bienvenido a TP obligatorio</h1>

       </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Materia</h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in materia"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Alumno</h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in alumno"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

        <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Docente</h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in docente"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
    
    
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    materia: [
      {
        text: "Arquitectura Web",
 
      },

    ],
    alumno: [
      {
        text: "Fernando Corinaldesi",
  
      },
    ],
     docente: [
      {
        text: "Javier Bilats",

      },
     ],
  }),
};
</script>
