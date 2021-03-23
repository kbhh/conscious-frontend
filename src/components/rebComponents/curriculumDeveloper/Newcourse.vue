<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 md9>
          <v-container fluid>
            <v-layout row wrap>
              <!-- <v-flex xs12 md4 pa-1>
                                <v-card class="mx-auto" min-height="240" max-width="344"  @click="clicked(item._id)">
                                       <v-btn text center>
                                           <v-icon>
                                               add
                                           </v-icon>
                                       </v-btn>
                                 </v-card>
              </v-flex>-->
              <v-flex xs12 md4 pa-1 v-for="(item,i) in listItem" :key="i">
                <v-card class="mx-auto" max-width="344" @click="clicked(item._id)">
                  <v-img scr="#" height="100px"></v-img>
                  <v-card-title>{{item.courseName}}</v-card-title>
                  <v-card-subtitle>{{item.courseName}}</v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions class="red">
                    <v-btn text>
                      <v-icon>add</v-icon>
                    </v-btn>
                    <v-btn text>
                      <v-icon>add</v-icon>
                    </v-btn>
                    <v-btn text>
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card style="border-top:3px solid blue">
              <v-card-title>
                <span class="headline" center>
                  <strong class="red--text text--lighten-1">Add Course</strong>
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
                      <!-- <v-textarea 
                                 label="Description"
                                 prepend-icon = "description"
                                 v-model = "courseForm.description "
                                :rules="requiredRules"
                                  >
                      </v-textarea>-->
                      <ckeditor
                        :editor="editor"
                        v-model="courseForm.description"
                        :config="editorConfig"
                      ></ckeditor>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          :disabled="!addIsFilledAndValid"
                          @click="CreateItem"
                        >
                          <v-icon small>mdi-plus</v-icon>Save
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex xs12 md3>
          <v-card flat class="px-3" style="background-color:rgb(236,240,245);">
            <v-container fluid>
              <v-layout column wrap>
                <v-flex>
                  <h3>Announcments</h3>
                  <v-divider></v-divider>
                  <div>
                    <p class="caption">No announcment</p>
                  </div>
                </v-flex>
                <v-flex>
                  <v-btn pa-2 class="custom_button" @click="doDialogs">Add New Course</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
//import Api from '@/services/ApiFile';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "RebProfile",
  data: function () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      deletedialog: false,
      editedIndex: -1,
      viewedIndex: -1,
      deleteditem: "",
      search: "",
      showDialog: false,
      showMessage: false,

      courseForm: {
        courseName: "",
        grade: "",
        field: "",
        description: "",
        //editorData : ""
      },
      defaultForm: {
        courseName: "",
        grade: "",
        field: "",
        description: "",
      },
      field_list: ["both", "natural", "social"],
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
    };
  },

  async created() {
    this.doGetItem();
  },
  methods: {
    ...mapActions({
      doCreateItem: "regionalCurriculumDeveloperRegister/doCreate",
      doGetItem: "regionalCurriculumDeveloperRegister/doGetItems",
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
        this.doGetItem();
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
    clicked(id) {
      this.$router.push({ name: "singlecourse", params: { courseId: id } });
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

  mounted() {},
};
</script>


<style scoped>
#app {
  height: fit-content;
  background-color: rgb(236, 240, 245);
}

.profile-picture {
  padding: 3px;
  border: 3px solid gray;
  border-radius: 50%;
}
.secondary_list_items {
  text-decoration: none;
  padding: 10px;
}
.secondary_navigation {
  background-color: rgb(236, 240, 245);
}
.secondary_navigation:hover {
  background-color: gray;
}
.secondary_navigation:hover .secondary_list_items {
  color: white;
}
.colorpad {
  background-color: springgreen;
}
.custom_button {
  background-color: gainsboro;
  border: solid black 1px;
  color: black;
  width: 100%;
}
.card-text {
  padding: auto;
  background-color: tan;
}
.card-actions {
  background-color: tomato;
}
</style>
