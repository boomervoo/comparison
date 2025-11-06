<script setup lang="ts">
import ProductsInModal from '@/components/ProductsInModal.vue'
import type { Product } from '@/types/Product.ts'
import { ref, computed } from 'vue'

const props = defineProps<{
  isOpenModal: boolean
  productsHidden: Product[]
  currentProductId: number | null
}>()

const emit = defineEmits<{
  replace: [productId: number]
  close: []
}>()

const closeModal = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    searchHandler.value = ''
    emit('close')
  }
}

const replaceProductSelect = (productId: number) => {
  emit('replace', productId)
}

const searchHandler = ref<string>('')

const filteredProducts = computed(() => {
  if (!searchHandler.value.trim()) return props.productsHidden

  const query = searchHandler.value.toLowerCase()
  return props.productsHidden.filter((product) => product.name.toLowerCase().includes(query))
})
</script>

<template>
  <div v-if="isOpenModal" @click="closeModal">
    <div class="content" @click.stop>
      <input
        class="content__search"
        v-model="searchHandler"
        type="search"
        placeholder="Поиск"
        @click.stop
      />
      <ProductsInModal
        class="content__prod"
        :products="filteredProducts"
        @select="replaceProductSelect"
        :excludeId="currentProductId"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
input[type='search'] {
  font-weight: 400;
  font-size: 24px;
  color: $placeholderLightGray;
  width: 80%;
}

.content {
  &__prod {
    overflow-y: auto;
  }
}
</style>
