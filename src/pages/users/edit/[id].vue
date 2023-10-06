<script lang="ts" setup>
import { useRoute } from 'vue-router';
const $axios = inject('$axios')
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const form = ref({name: '', email: ''})

const getUser = async () => {
  loading.value = true;
  try{
    const res = await $axios.get(`/users/${route.params.id}`)
    form.value = res.data
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const editUser = async () => {
  loading.value = true;
  try{
    await $axios.put(`/users/${route.params.id}`, form.value)
    router.push("/users");
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}


onBeforeMount(async () => {
  await getUser()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
     <VBtn to="/users">
          Listar Usuários
        </VBtn>
    </VCol>
      <VCol
        cols="12"
        md="12"
      >
        <!-- 👉 Horizontal Form -->
        <VCard :loading="loading" title="Editar Usuário">
          <VCardText>
            
  <VForm @submit.prevent="() => {}">
    <VRow>
  <VCol cols="12">
    <VAlert color="error" v-if="message">
      {{message}}
    </VAlert>
  </VCol>

  <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
          >
            <label for="id">ID</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="id"
              :value="form.id"
              disabled
              placeholder="ID"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>


    <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
          >
            <label for="name">Nome</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="name"
              v-model="form.name"
              placeholder="Nome"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="email">Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="email"
              v-model="form.email"
              placeholder="Email"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn :disabled="loading" @click="editUser">
          Editar
        </VBtn>
        <VBtn
          color="secondary"
                :disabled="loading"
          variant="tonal"
          type="reset"
        >
          Resetar
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
   </VCardText>
        </VCard>
      </VCol>
    </VRow>
</template>
