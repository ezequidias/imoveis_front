<script lang="ts" setup>
const $axios = inject('$axios')
const router = useRouter()
const loading = ref(false)
const form = reactive({type: '', address: '', price: '', status: ''})

const itemsType = [
  { name: 'Casa', value: 'house' },
  { name: 'Apartamento', value: 'apartment' },
  { name: 'Terreno', value: 'land' },
]

const itemsStatus = [
  { name: 'Disponível', value: 'available' },
  { name: 'Alugado', value: 'rented' },
  { name: 'Vendido', value: 'sold' },
]

const createProperty = async () => {
  loading.value = true;
  try{
    await $axios.post(`/properties`, form)
    router.push("/properties");
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

onMounted(async () => {
})
</script>

<template>
  <VRow>
    <VCol cols="12">
     <VBtn to="/properties">
          Listar Imóveis
        </VBtn>
    </VCol>
      <VCol
        cols="12"
        md="12"
      >
        <!-- 👉 Horizontal Form -->
        <VCard :loading="loading" title="Criar Imóvel">
          <VCardText>
  <VForm @submit.prevent="() => {}">
    <VRow>

      <VCol cols="12">
        <VRow no-gutters>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="email">Tipo</label>
          </VCol>

                <VCol
            cols="12"
            md="9"
          >
            <VSelect
    v-model="form.type"
    :items="itemsType"
    item-title="name"
    item-value="value"
    label="Tipo"
    placeholder="Tipo"
    persistent-hint
            ></VSelect>
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
            <label for="email">Endereço</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="address"
              v-model="form.address"
              placeholder="Endereço"
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
            <label for="email">Preço</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="price"
              v-model="form.price"
              placeholder="Preço"
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
            <label for="email">Status</label>
          </VCol>

                <VCol
            cols="12"
            md="9"
          >
            <VSelect
    v-model="form.status"
    :items="itemsStatus"
    item-title="name"
    item-value="value"
    label="Status"
    placeholder="Status"
    persistent-hint
            ></VSelect>
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
        <VBtn :disabled="loading" type="submit" @click="createProperty">
          Cadastar
        </VBtn>
        <VBtn
          :disabled="loading"
          color="secondary"
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
