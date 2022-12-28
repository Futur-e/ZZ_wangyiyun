<template>
  <HeaderBar></HeaderBar>
  <router-view/>
</template>


<script>
import HeaderBar from "@/components/headerBar/header";

export default {
  name:"APP",
  components:{HeaderBar}
}
</script>


<style scoped>

</style>
