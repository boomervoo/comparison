import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types/Product.ts'
import iphoneImg from '@/assets/img/iphone11.png'
import mi11Img from '@/assets/img/Mi11.png'
import a72Img from '@/assets/img/A72.png'
import s21Img from '@/assets/img/S21.png'
import realmeImg from '@/assets/img/Realme.png'
import iphoneXr from '@/assets/img/xr.png'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Apple iPhone 12',
      manufacturer: 'Apple',
      release: 2020,
      diagonal: 6.1,
      country: 'Китай',
      memory: 128,
      screenRefresh: 60,
      nfc: false,
      eSIM: true,
      price: 81990,
      wirelessCharging: true,
      image: iphoneImg,
    },
    {
      id: 2,
      name: 'Xiaomi Mi 11 Lite',
      manufacturer: 'Xiaomi',
      release: 2021,
      diagonal: 6.55,
      country: 'Китай',
      memory: 128,
      screenRefresh: 90,
      nfc: true,
      eSIM: true,
      price: 27490,
      wirelessCharging: false,
      image: mi11Img,
    },
    {
      id: 3,
      name: 'Samsung Galaxy A72',
      manufacturer: 'Samsung',
      release: 2021,
      diagonal: 6.7,
      country: 'Вьетнам',
      memory: 128,
      screenRefresh: 90,
      nfc: true,
      eSIM: false,
      price: 32890,
      wirelessCharging: true,
      image: a72Img,
    },
    {
      id: 4,
      name: 'Samsung Galaxy S21',
      manufacturer: 'Samsung',
      release: 2020,
      diagonal: 6.1,
      country: 'Китай',
      memory: 128,
      screenRefresh: 60,
      nfc: true,
      eSIM: false,
      price: 32890,
      wirelessCharging: true,
      image: s21Img,
    },
    {
      id: 5,
      name: 'Apple iPhone Xr',
      manufacturer: 'Apple',
      release: 2021,
      diagonal: 6.55,
      country: 'Китай',
      memory: 128,
      screenRefresh: 90,
      nfc: true,
      eSIM: true,
      price: 64432,
      wirelessCharging: false,
      image: iphoneXr,
    },
    {
      id: 6,
      name: 'Realme 8 Pro',
      manufacturer: 'Xiaomi',
      release: 2021,
      diagonal: 6.7,
      country: 'Китай',
      memory: 128,
      screenRefresh: 90,
      nfc: true,
      eSIM: false,
      price: 32890,
      wirelessCharging: true,
      image: realmeImg,
    },
    {
      id: 7,
      name: 'Nokia',
      manufacturer: 'Nokia',
      release: 2021,
      diagonal: 6.7,
      country: 'Финляндия',
      memory: 256,
      screenRefresh: 60,
      nfc: true,
      eSIM: true,
      price: 100000,
      wirelessCharging: true,
      image: iphoneImg,
    },
  ])

  const displayedCount = ref<number>(3) //отображаемые товары
  const showDifferences = ref<boolean>(false) //фильтр различий
  const openedModalId = ref<number | null>(null)

  const replaceModal = ref<{
    isOpen: boolean
    selectedProduct: number | null
  }>({
    isOpen: false,
    selectedProduct: null,
  })

  const differentSpecs = computed(() => {
    if (!showDifferences.value) return []

    const specsToCompare: (keyof Product)[] = [
      'memory',
      'screenRefresh',
      'nfc',
      'eSIM',
      'price',
      'wirelessCharging',
      'release',
    ]

    const different: string[] = []

    specsToCompare.forEach((spec) => {
      const values = displayedProduct.value.map((p) => p[spec])
      if (new Set(values).size > 1) {
        different.push(spec)
      }
    })

    return different
  })

  const displayedProduct = computed(() => {
    return products.value.slice(0, displayedCount.value)
  })

  const hiddenProducts = computed(() => products.value.slice(displayedCount.value))

  const setDisplayedCount = (count: number) => {
    displayedCount.value = Math.max(2, Math.min(count, products.value.length))
    return displayedCount.value
  }

  const openModal = (productId: number) => {
    replaceModal.value = { isOpen: true, selectedProduct: productId }
    document.body.classList.add('no-scroll')
    openedModalId.value = productId
  }

  const closeModal = () => {
    replaceModal.value = { isOpen: false, selectedProduct: null }
    document.body.classList.remove('no-scroll')
    openedModalId.value = null
  }

  const replaceProduct = (newProductId: number) => {
    if (!replaceModal.value.selectedProduct) return

    const replaceIndex = products.value.findIndex(
      (prod) => prod.id === replaceModal.value.selectedProduct,
    )

    const newProductIndex = products.value.findIndex((p) => p.id === newProductId)

    if (replaceIndex === -1 || newProductIndex === -1) return

    const replacedProduct = { ...products.value[replaceIndex] }

    products.value[replaceIndex] = { ...products.value[newProductIndex] }

    products.value[newProductIndex] = replacedProduct

    closeModal()
  }

  return {
    products,
    displayedCount,
    showDifferences,
    replaceModal,
    openedModalId,
    differentSpecs,
    displayedProduct,
    hiddenProducts,
    setDisplayedCount,
    openModal,
    closeModal,
    replaceProduct,
  }
})
