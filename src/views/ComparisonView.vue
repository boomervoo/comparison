<script setup lang="ts">
import { useProductStore } from '@/stores/products'
import TableList from '@/components/TableList.vue'
import arrow from '@/assets/img/svg/arrow.svg'
import ProductModal from '@/components/ProductModal.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const storeProd = useProductStore()

const { products, displayedCount, replaceModal, hiddenProducts, showDifferences, differentSpecs } =
  storeToRefs(useProductStore())

const modalRef = ref(null)

const modalPosition = ref({ top: 0, left: 0 })

const openModalWithPosition = (event: MouseEvent, prodId: number) => {
  const arrowElement = event.currentTarget as HTMLElement
  const rect = arrowElement.getBoundingClientRect()

  modalPosition.value = {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX - arrowElement.offsetWidth,
  }

  storeProd.openModal(prodId)
}

onClickOutside(modalRef, () => {
  storeProd.closeModal()
})
</script>

<template>
  <main class="main">
    <div class="page">
      <div class="page__top-block">
        <h2 class="page__title">Смартфоны</h2>
        <div>
          <span class="page__filter">Отобразить товары:</span>
          <button
            class="page__filter-numbers"
            v-for="count in [2, 3, 4, 5, 6]"
            :key="count"
            @click="storeProd.setDisplayedCount(count)"
          >
            {{ count }}
          </button>
        </div>
      </div>

      <div class="products">
        <div class="checkbox">
          <input
            id="defference"
            class="checkbox__input"
            type="checkbox"
            v-model="showDifferences"
          />
          <label class="checkbox__label" for="defference">Показать различия</label>
        </div>

        <div class="products__block">
          <div
            class="products__panel"
            v-for="prod of products.slice(0, displayedCount)"
            :key="prod.id"
            :style="{ width: `calc(100% / ${displayedCount})` }"
          >
            <img class="products__img" :src="prod.image" alt="image" />
            <span class="products__name">{{ prod.name }}</span>
            <img
              :src="arrow"
              class="arrow"
              alt="arrow"
              @click="openModalWithPosition($event, prod.id)"
              style="cursor: pointer"
            />
          </div>
        </div>
      </div>
      <TableList
        :products="products"
        :count="displayedCount"
        :showOnlyDifferences="showDifferences"
        :differentSpecs="differentSpecs"
      />
      <ProductModal
        class="modal"
        v-if="replaceModal.isOpen"
        ref="modalRef"
        :isOpenModal="replaceModal.isOpen"
        :productsHidden="hiddenProducts"
        :currentProductId="replaceModal.selectedProduct"
        :replace="storeProd.replaceProduct"
        :style="{
          top: `${modalPosition.top}px`,
          left: `${modalPosition.left}px`,
        }"
        @close="storeProd.closeModal"
        @replace="storeProd.replaceProduct"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 140px;
  top: 74px;
  width: 421px;
  height: 336px;
  box-shadow: 0 16px 32px 0 rgba(35, 39, 51, 0.1);
  border: 1px solid $borderGray;
  border-radius: 4px;
  background: #fff;
  z-index: 1000;
  overflow-y: scroll;
  padding: 20px 10px;
}
.page {
  &__top-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    color: $titlePage;
    font-weight: 700;
    font-size: 48px;
    line-height: 125%;
    letter-spacing: 0.02em;
  }

  &__filter {
    color: $textBlue;
  }

  &__filter-numbers {
    background: none;
    border: none;
    cursor: pointer;
    color: $textBlue;
    transition: font-weight 0.2s ease-in-out;

    &:hover {
      font-weight: bold;
    }
  }
}

.products {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  &__block {
    display: flex;
    text-align: center;
    gap: 20px;
    width: 100%;
  }

  &__panel {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__img {
    margin-bottom: 10px;
    max-height: 120px;
    object-fit: contain;
  }
}

.arrow {
  position: absolute;
  width: 30px;
  height: 27px;
  right: -5px;
  top: 50%;
}

.checkbox {
  position: relative;
  display: flex;
  align-items: end;
  text-align: center;
  min-width: 225px;

  &__label {
    margin-left: 5px;
    color: $textBlue;
    cursor: pointer;
  }

  &__input {
    cursor: pointer;
    position: relative;
    margin-right: 5px;
    top: -2px;
    appearance: none;
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid $checkboxColor;
    border-radius: 0.25rem;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.15s ease-in-out;
    margin: 0;

    &:checked {
      border-color: $checkboxColor;
      background-image: url('../assets/img/svg/check.svg');
      background-size: 0.9rem 0.9rem;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &:active {
      filter: brightness(90%);
    }

    &:hover:not(:disabled) {
      border-color: #0d6efd;
    }

    &:disabled {
      filter: none;
      opacity: 0.5;
      cursor: not-allowed;
    }

    :disabled ~ .checkbox-label {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
