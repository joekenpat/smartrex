<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      type="file"
      ref="file"
      accept=".png, .jpg, .jpeg"
      capture="user"
      :name="profilePicture"
      @change="onFileChange($event.target.files)"
      style="display:none"
    />
    <!-- error dialog displays any potential errors -->
    <v-dialog max-width="500" v-model="errorDialog">
      <v-card>
        <v-card-text class="subheading">{{ errorText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" color="primary">Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errorDialog: null,
      errorText: "",
      profilePicture: "file",
      maxSize: 3072
    };
  },
  props: {
    // Use "value" here to enable compatibility with v-model
    value: Object
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(file) {
      const { maxSize } = this;
      const imageFile = file[0];

      // check if user actually selected a file
      if (file.length > 0) {
        const size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match("image.*")) {
          // check whether the upload is an image
          this.errorDialog = true;
          this.errorText = "Please choose an image file";
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            "Your file is too big! Please select an image under 3MB";
        } else {
          // turn file into image URL
          const imageURL = URL.createObjectURL(imageFile);
          // Emit B64 & image URL to the parent component
          this.$emit("input", { imageURL });
        }
      }
    }
  }
};
</script>
