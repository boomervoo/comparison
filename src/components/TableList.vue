<script setup lang="ts">
import iconFalse from '@/assets/img/svg/iconFalse.svg'
import iconTrue from '@/assets/img/svg/iconTrue.svg'
import { computed } from 'vue'

const props = defineProps<{
  products: Array<Record<string, string | number | boolean>>
  count: number
  showOnlyDifferences?: boolean
  differentSpecs?: string[] | undefined
}>()

const fields = [
  { label: 'Производитель', key: 'manufacturer' },
  { label: 'Год релиза', key: 'release' },
  { label: 'Диагональ экрана (дюйм)', key: 'diagonal' },
  { label: 'Страна-производитель', key: 'country' },
  { label: 'Объем памяти', key: 'memory' },
  { label: 'Частота обновления экрана', key: 'screenRefresh' },
  { label: 'NFC', key: 'nfc' },
  { label: 'Поддержка eSIM', key: 'eSIM' },
  { label: 'Поддержка беспроводной зарядки', key: 'wirelessCharging' },
  { label: 'Стоимость', key: 'price' },
]

const filteredFields = computed(() => {
  if (!props.showOnlyDifferences || !props.differentSpecs) {
    return fields
  }
  return fields.filter((field) => props.differentSpecs?.includes(field.key))
})

const formateFieldValue = (fieldKey: string, value: string | number | boolean) => {
  if (value === undefined || value === null) return '-'

  if (fieldKey === 'price') return `${value} ₽`
  if (fieldKey === 'memory') return `${value} ГБ`
  if (fieldKey === 'screenRefresh') return `${value} Гц`
  return value
}
</script>

<template>
  <div class="comparison">
    <table class="comparison__table">
      <tr v-for="(field, index) in filteredFields" :key="index" class="comparison__table-row">
        <th class="comparison__field">
          {{ field.label }}
        </th>
        <td
          v-for="(product, i) in products.slice(0, count)"
          :key="i"
          class="comparison__prod"
          :style="{ width: `calc((100% - 255px) / ${count})` }"
        >
          <template v-if="['nfc', 'eSIM', 'wirelessCharging'].includes(field.key)">
            <img
              :src="product[field.key] ? iconTrue : iconFalse"
              :alt="product[field.key] ? 'Да' : 'Нет'"
              width="20"
              height="20"
            />
          </template>
          <template v-else>
            <span> {{ formateFieldValue(field.key, product[field.key]) }}</span>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">
.comparison {
  max-width: 100%;
  overflow-x: auto;

  &__table {
    display: flex;
    flex-direction: column;
    border-top: 1px solid $borderTable;
    border-bottom: 1px solid $borderTable;
  }

  &__table-row {
    display: flex;
    gap: 30px;
    border-bottom: 1px solid #ccc;

    &:last-child {
      border-bottom: none;
    }
  }

  &__title {
    text-align: center;
    padding: 4rem;
  }

  &__field {
    @include field;
    padding: 25px 0 25px;
    width: 100%;
    max-width: 255px;
    min-width: 200px;
    text-align: left;
  }

  &__prod {
    display: flex;
    align-items: center;
    max-width: 18rem;
    width: 100%;
  }
}
</style>
