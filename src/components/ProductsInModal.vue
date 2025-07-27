<script setup lang="ts">
import type { Product } from '@/types/Product.ts'
import ArrowReverse from '@/assets/img/svg/arrowReverse.svg'

defineProps<{
  products: Product[]
  excludeId: number | null
}>()

const emit = defineEmits<{
  select: [productId: number]
}>()
</script>

<template>
  <div class="reverse" v-for="prod in products" :key="prod.id" @click="emit('select', prod.id)">
    <div class="reverse__product" v-if="prod.id !== excludeId">
      <img :src="ArrowReverse" alt="arrow reverse" />
      <img class="reverse__img" :src="prod.image" alt="reverse arrow" />
      <span class="reverse__name">{{ prod.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reverse {
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: lightgray;
  }

  &__product {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__img {
    width: 24px;
    height: 50px;
    object-fit: cover;
  }
}
</style>
