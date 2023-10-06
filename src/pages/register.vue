<script setup lang="ts">
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
const router = useRouter()
const authStore = useAuthStore();

const form = reactive({
  name: '',
  email: '',
  password: '',
  c_password: ''
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})
const isPasswordVisible = ref(false)
const loading = ref(false)

const handleSignUp = async () => {
  loading.value = true;
  try{
    await authStore.register(form)
    await authStore.login(form)
    router.push("/");
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

watch(() => form.password,
  (val) => form.c_password = val
)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      :loading="loading"
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          IMÓVEIS FRONT
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Cadastro 🚀
        </h5>
        <p class="mb-0">
          Preencha as informações abaixo!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>

            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Nome"
                type="text"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Senha"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">Eu concordo com</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >termos de privacidade</a>
                </VLabel>
              </div>

              <VBtn
                block
                :disabled="loading"
                type="submit"
                @click="handleSignUp"
              >
                Cadastrar
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Já tem uma conta?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Em vez disso, faça login
              </RouterLink>
            </VCol>

          
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
