<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__container">
      <RouterLink class="header__link link--catalog" to="#">Каталог</RouterLink>
      <div class="header__personal">
        <RouterLink class="header__link" to="#">Сравнение</RouterLink>
        <RouterLink class="header__link" to="#"
          >Личный кабинет
          <svg
            class="user-img"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0712 2.96481C15.1824 1.07451 12.6711 0.0334473 10.0001 0.0334473C7.32884 0.0334473 4.81769 1.07451 2.92894 2.96481C1.0402 4.85512 0 7.36835 0 10.0418C0 12.7151 1.0402 15.2284 2.92894 17.1188C4.81769 19.0091 7.32884 20.0501 10.0001 20.0501C12.6711 20.0501 15.1824 19.0091 17.0712 17.1188C18.9599 15.2284 20.0001 12.7151 20.0001 10.0418C20.0001 7.36835 18.9599 4.85512 17.0712 2.96481ZM5.01331 17.3286C5.43155 14.9184 7.51836 13.1407 10.0001 13.1407C12.4819 13.1407 14.5686 14.9184 14.9868 17.3286C13.567 18.3049 11.8491 18.8773 10.0001 18.8773C8.15099 18.8773 6.43314 18.3049 5.01331 17.3286ZM6.82042 8.78555C6.82042 7.0307 8.24682 5.60327 10.0001 5.60327C11.7533 5.60327 13.1797 7.03085 13.1797 8.78555C13.1797 10.5402 11.7533 11.9678 10.0001 11.9678C8.24682 11.9678 6.82042 10.5402 6.82042 8.78555ZM16.0018 16.5151C15.6864 15.3931 15.0601 14.3751 14.1821 13.5799C13.6434 13.092 13.0303 12.707 12.3711 12.4356C13.5626 11.6578 14.3517 10.3122 14.3517 8.78555C14.3517 6.3841 12.3995 4.43042 10.0001 4.43042C7.6006 4.43042 5.64853 6.3841 5.64853 8.78555C5.64853 10.3122 6.43772 11.6578 7.62898 12.4356C6.96995 12.707 6.3567 13.0918 5.81806 13.5797C4.94022 14.3749 4.31369 15.3929 3.99828 16.5149C2.26106 14.9003 1.17188 12.5961 1.17188 10.0418C1.17188 5.16987 5.13217 1.2063 10.0001 1.2063C14.8679 1.2063 18.8282 5.16987 18.8282 10.0418C18.8282 12.5962 17.7391 14.9004 16.0018 16.5151Z"
              fill="#3B4157"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  position: relative;

  &__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1560px;
    margin: 0 auto;
    padding: 2.5rem 10rem;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #a6a5a9;
  }

  &__link {
    display: flex;
    color: $customGray;
    font-weight: 900;
  }

  .link--catalog {
    color: $customBlue;
  }

  &__personal {
    display: flex;
    gap: 4rem;
  }
}

.user-img {
  margin-left: 20px;
}
</style>
