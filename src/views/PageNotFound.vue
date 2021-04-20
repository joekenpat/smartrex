<template>
  <warning-page
    :primary-text="primaryText"
    :secondary-text="secondaryText"
    :code-icon="codeIcon"
    :action-link="actionLink"
  />
</template>
<script>
import WarningPage from "@/components/WarningPage";
export default {
  data() {
    return {
      primaryText: "Page Not Found!",
      secondaryText: "The page you're trying to access does not exist.",
      codeIcon: 404,
      actionLink: {
        text: "Go Home",
        path: "/"
      }
    };
  },
  components: {
    WarningPage
  },
  methods: {}
};
</script>
