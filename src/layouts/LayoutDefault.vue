<script setup lang="ts">
import HeaderApp from '@/components/HeaderApp.vue'
</script>

<template>
  <div>
    <HeaderApp />
    <main class="main container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.4rem 10.5rem;
}
</style>
