<template>
  <v-card width="100%">
    <v-card-title>New Content</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <ckeditor :editor="editor" v-model="courseDesc" :config="editorConfig"></ckeditor>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MathType from "@wiris/mathtype-ckeditor5";
import UploadAdapter from "../Utils/ckfileupload";
export default {
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        extraPlugins: [UploadAdapter, MathType],
      },
      courseDesc: "",
    };
  },
};
</script>

<style>
</style>