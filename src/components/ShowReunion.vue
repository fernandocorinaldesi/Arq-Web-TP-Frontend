<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="servicios"
      sort-by="nombre"
      :footer-props="{ itemsPerPageText: 'Items por pagina' }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listado de reuniones</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nueva reunion
              </v-btn>
            </template>
            <v-form ref="form" v-model="valid" lazy-validation scrolleable>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.titulo"
                          label="Titulo"
                          :rules="genericRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripcion"
                          :rules="genericRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          label="Horario"
                          type="date"
                          v-model="editedItem.horario"
                          :rules="genericRules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :disabled="!valid"
                    @click="validate"
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Realmente quieres borrar esta reunion?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Borrar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Actualizar </v-btn>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbarCreate" top color="primary" :timeout="timeout">
      La reunion se registro satisfactoriamente.
    </v-snackbar>
    <v-snackbar v-model="snackbarUpdate" top color="primary" :timeout="timeout">
      La reunion se actualizo satisfactoriamente.
    </v-snackbar>
     <v-snackbar v-model="snackbarDelete" top color="primary" :timeout="timeout">
      La reunion se eliminó satisfactoriamente.
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    snackbarCreate: false,
    snackbarUpdate: false,
    snackbarDelete: false,
    timeout: 4000,
    valid: false,

    headers: [
      {
        text: "Numero de reunion",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Titulo", value: "titulo" },
      { text: "Descripción", value: "descripcion" },
      { text: "Horario", value: "horario" },
      { text: "Operaciones", value: "actions", sortable: false },
    ],
    servicios: [],
    editedIndex: -1,
    genericRules: [(v) => !!v || "Este campo es requerido"],
    editedItem: {
      titulo: "",
      descripcion: "",
      horario: "",
    },
    defaultItem: {
      titulo: "",
      descripcion: "",
      horario: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo reunion" : "Editar reunion";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getServicios();
    },
    validate() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.save();
      }
    },
    getServicios() {
      fetch("http://localhost:3001/reuniones")
        .then((res) => res.json())
        .then((res) => {
          const { elementos } = res;
          //elementos.sort((a, b) => a.orden_id - b.orden_id);

          this.servicios = elementos;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editItem(item) {
      this.editedIndex = this.servicios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      /*if (this.editedIndex > -1){
        this.estaEditando = true
      } */
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.servicios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteServicio(this.editedItem);
      this.closeDelete();
      this.snackbarDelete = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        const id = this.servicios[this.editedIndex].id;
        this.updateServicio(id, this.editedItem);
        this.snackbarUpdate = true;
      } else {
        this.postServicio(this.editedItem);
        this.snackbarCreate = true;
      }
      this.close();
    },
    async updateServicio(id, servicios) {
      alert(id);
      try {
        await axios.put("http://localhost:3001/reuniones/" + id, servicios);
      } catch (error) {
        console.log(error);
      }
      this.initialize();
    },
    async postServicio(servicio) {
      try {
        await axios.post("http://localhost:3001/reuniones", servicio);
      } catch (error) {
        console.log(error);
      }
      this.initialize();
    },
    async deleteServicio(servicio) {
      try {
        await axios.delete("http://localhost:3001/reuniones/" + servicio.id);
      } catch (error) {
        console.log(error);
      }
      this.initialize();
    },
  },
};
</script>