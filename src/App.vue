<template>
  <div class="flex flex-col min-h-screen">
    <NavList/>
    <main class="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div class="flex-1 w-full max-w-300 mx-auto bg-sky-300">
        <router-view></router-view>
      </div>
    </main>
    <FooterList></FooterList>
  </div>
</template>


<script setup lang="ts">
import NavList from './components/NavList.vue';
import FooterList from './components/FooterList.vue';
</script>

<style scoped>

</style>
