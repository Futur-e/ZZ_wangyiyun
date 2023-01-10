<template>
  <HeaderBar></HeaderBar>
  <router-view/>
</template>


<script>
import HeaderBar from "@/components/headerBar/header";
import {ref} from "vue";

export default {
  name:"APP",
  components:{HeaderBar},
}
</script>


<style scoped>

</style>
