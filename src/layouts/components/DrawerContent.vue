<script setup lang="ts">
import { VerticalNavLink } from '@layouts';
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          IMOVEIS FRONT
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Usuários',
        to: 'users',
        icon: { icon: 'mdi-account-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Imóveis',
        to: 'properties',
        icon: { icon: 'mdi-format-list-bulleted' }
      }"
    />
   
  </ul>

</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;
//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;
//     > ul {
//       flex-grow: 1;
//     }
//   }
// }
.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
