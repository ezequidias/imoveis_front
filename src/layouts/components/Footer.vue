<template>
  <div class="w-100 h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Feito com
      <VIcon
        icon="mdi-heart-outline"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      Por <a
        href="https://github.com/ezequidias"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Ezequiel</a>
    </span>
  </div>
</template>
