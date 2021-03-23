<template>
  <v-app id="inspire">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="listItem"
        sort-by="createdAt"
        class="elevation-1 mytable"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog :value="dialog" :scrollable="false" persistent max-width="800px">
              <template v-slot:activator="{}">
                <v-snackbar v-model="showMessage" :timeout="10000" :color="colour">
                  {{message}}
                  <v-btn color="pink" text @click="showMessage = false">Close</v-btn>
                </v-snackbar>

                <v-sheet class="v-sheet--offset mx-auto" elevation="12" width="1030">
                  <v-toolbar color="pink" dark>
                    <v-toolbar-title>Courses</v-toolbar-title>
                    <v-divider inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-flex xs12 md3 class="px-1">
                      <v-text-field
                        v-model="search"
                        prepend-inner-icon="search"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="mx-2"
                          small
                          fab
                          dark
                          color="indigo"
                          v-on="on"
                          @click="doDialogs"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Click to Add</span>
                    </v-tooltip>
                  </v-toolbar>
                </v-sheet>
              </template>
              <v-card style="border-top:3px solid blue">
                <v-card-title>
                  <span class="headline" center>
                    <strong class="red--text text--lighten-1">{{ formTitle }}</strong>
                  </span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-row>
                      <v-snackbar v-model="showMessage" :timeout="10000" :color="colour">
                        {{message}}
                        <v-btn color="pink" text @click="showMessage = false">Close</v-btn>
                      </v-snackbar>
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="Course Name"
                          v-model="courseForm.courseName"
                          prepend-icon="book"
                          type="text"
                          :rules="alphabetOnly"
                        ></v-text-field>
                        <v-text-field
                          label="Grade"
                          v-model="courseForm.grade"
                          prepend-icon="grade"
                          type="text"
                          :rules="NumericOnly"
                        ></v-text-field>
                        <v-select
                          :items="field_list"
                          v-model="courseForm.field"
                          prepend-icon="subject"
                          label="Field"
                          :rules="requiredRules"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-textarea
                          label="Description"
                          prepend-icon="description"
                          v-model="courseForm.description "
                          :rules="requiredRules"
                        ></v-textarea>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                          <div v-if="actiontype">
                            <v-btn
                              color="blue darken-1"
                              text
                              :disabled="!addIsFilledAndValid"
                              @click="CreateItem"
                            >
                              <v-icon small>mdi-plus</v-icon>Save
                            </v-btn>
                          </div>
                          <div v-else>
                            <v-btn
                              color="blue darken-1"
                              text
                              :disabled="!updateIsFilledAndValid"
                              @click="editSubmitItem"
                            >
                              <v-icon small>edit</v-icon>Update
                            </v-btn>
                          </div>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-row justify="center">
              <v-dialog v-model="deletedialog" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline">Delete Item</v-card-title>
                  <v-card-text>Are you sure you want to delete {{deleteditem}}</v-card-text>
                  <v-text-field hidden v-model="courseForm.itemid"></v-text-field>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="deleteItem">Yes</v-btn>
                    <v-btn color="green darken-1" text @click="closeDelete">No</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2 green--text" @click="editItem(item)" v-on="on">edit</v-icon>
            </template>
            <span>Click to Edit</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-avatar dark color="white" size="36">
                <v-icon small color="error" @click="confirmdelete(item)" v-on="on">delete</v-icon>
              </v-avatar>
            </template>
            <span>Click to Delete</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  props: {
    source: String,
  },
  data: () => ({
    deletedialog: false,
    editedIndex: -1,
    viewedIndex: -1,
    deleteditem: "",
    search: "",
    passwordVisibility: {
      password: false,
    },
    courseForm: {
      courseName: "",
      grade: "",
      field: "",
      description: "",
    },

    defaultForm: {
      courseName: "",
      grade: "",
      field: "",
      description: "",
    },
    field_list: ["both", "natural", "social"],
    role_list: [
      "Curriculum Developer",
      "Curriculum Verifier ",
      "Schools Registrar",
      "School Registration Verifier",
      "School Monitorer ",
    ],
    requiredRules: [(v) => !!v || "Required"],
    alphabetOnly: [
      (v) => !!v || "Required",
      (v) => /^[A-Za-z ]+$/.test(v) || "Must be Alphabet Only",
      (v) => (v && v.length >= 4) || "Must be atLeat four characters",
    ],
    NumericOnly: [
      (v) => !!v || "required",
      (v) => /^[0-9]+$/.test(v) || "Only Number is allowed",
    ],
    addheaders: [
      { text: "Full Name", align: "start", value: "fullName" },
      { text: "Role", value: "role" },
      { text: "User ID", value: "userId" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "action", sortable: false },
    ],
    headers: [
      { text: "Name", align: "start", value: "courseName" },
      { text: "Grade", value: "grade" },
      { text: "Field", value: "field" },
      { text: "Actions", value: "action", sortable: false },
    ],
    showMessage: false,
  }),
  async created() {
    this.$store.dispatch("regionalCurriculumDeveloperRegister/doGetItems");
  },
  methods: {
    ...mapActions({
      doCreateItem: "regionalCurriculumDeveloperRegister/doCreate",
      doUpdateItem: "adminReg/doUpdate",
      doSnackbar: "adminReg/doSnackbar",
    }),

    ...mapMutations({
      setCreateForm: "regionalCurriculumDeveloperRegister/setCreateForm",
    }),
    async CreateItem() {
      await this.doCreateItem();
      this.showMessage = true;
      if (!this.errorr) {
        this.$refs.form.reset();
      }
    },
    doDialogs() {
      this.$store.dispatch(
        "regionalCurriculumDeveloperRegister/doDialogs",
        true
      );
      this.$store.dispatch(
        "regionalCurriculumDeveloperRegister/doAction",
        true
      );
    },
    async editSubmitItem() {
      await this.doUpdateItem();
      this.showMessage = true;
      if (!this.errorr) {
        this.$refs.form.reset();
      }
    },
    async editItem(item) {
      this.editedIndex = this.listItem.indexOf(item);
      this.courseForm = Object.assign({}, item);
      this.$store.dispatch(
        "regionalCurriculumDeveloperRegister/doDialogs",
        true
      );
      this.$store.dispatch(
        "regionalCurriculumDeveloperRegister/doAction",
        false
      );
    },
    async close() {
      setTimeout(() => {
        this.$refs.form.reset();
        this.courseForm = Object.assign({}, this.defaultForm);
        this.editedIndex = -1;
      }, 300);
      this.$store.dispatch(
        "regionalCurriculumDeveloperRegister/doDialogs",
        false
      );
    },

    confirmdelete(item) {
      this.courseForm = Object.assign({}, item);
      let newd = this.courseForm.fullName + " adminReg ?";
      this.deleteditem = newd;
      this.deletedialog = true;
    },

    async deleteItem() {
      let id = this.courseForm._id;
      let deletestatus = this.$store.dispatch("adminReg/doDelete", id);
      this.courseForm = Object.assign({}, this.defaultForm);
      if (deletestatus) {
        this.deletedialog = false;
        this.showMessage = true;
      }
    },

    async closeDelete() {
      this.Form = Object.assign({}, this.defaultForm);
      this.deletedialog = false;
    },
  },
  computed: {
    ...mapState({
      listItem: (state) => state.regionalCurriculumDeveloperRegister.listItem,
      dialog: (state) => state.regionalCurriculumDeveloperRegister.dialog,
      snackbar: (state) => state.regionalCurriculumDeveloperRegister.snackbar,
      message: (state) => state.regionalCurriculumDeveloperRegister.message,
      colour: (state) => state.regionalCurriculumDeveloperRegister.colour,
      actiontype: (state) =>
        state.regionalCurriculumDeveloperRegister.actiontype,
      error: (state) => state.regionalCurriculumDeveloperRegister.error,
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Add Course" : "Edit Course";
    },

    addIsFilledAndValid: function () {
      return (
        this.courseForm.courseName &&
        /^[A-Za-z ]+$/.test(this.courseForm.courseName) &&
        this.courseForm.grade &&
        /^[0-9]+$/.test(this.courseForm.grade) &&
        this.courseForm.field &&
        this.courseForm.description
      );
    },

    updateIsFilledAndValid: function () {
      return (
        this.courseForm.courseName &&
        /^[A-Za-z ]+$/.test(this.courseForm.courseName) &&
        this.courseForm.grade &&
        /^[0-9]+$/.test(this.courseForm.grade) &&
        this.courseForm.field &&
        this.courseForm.description
      );
    },
  },
  watch: {
    courseForm: {
      handler(v) {
        this.setCreateForm(v);
      },
      deep: true,
    },
  },
};
</script>

<style>
.v-data-footer {
  background-color: rgb(250, 250, 250);
}
.mytable table thead th {
  font-size: 15px;
}
tr:nth-of-type(even) {
  background-color: rgba(167, 54, 54, 0.05);
}
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
