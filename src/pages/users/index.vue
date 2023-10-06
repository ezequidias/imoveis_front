<script lang="ts" setup>
import { useIndexStore } from '@/stores';
const $axios = inject('$axios')
const router = useRouter()
const route = useRoute()
const indexStore = useIndexStore();

const dataUsers = ref({
  users: {
    data: [],
    current_page: 1,
    per_page: 50,
    total: 1
  }
})
const loading = ref(false)
const dialog = ref(false)
const dataDel = ref({})
const form = ref({ page: 1, sortBy: [''], sortDesc: [false] })

const headersUsers = [
  { title: 'ID', key: 'id' },
  { title: 'NOME', key: 'name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'OPÇÕES', key: 'options', sortable:false },
]

const getUsers = async () => {
  loading.value = true;
  try{
    const res = await $axios.get(`/users?${indexStore.queryUrl}`)
    dataUsers.value = res.data
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const confirmDel = (user) => {
  dialog.value = true
  dataDel.value = user
}

const userDelete = async () => {
  loading.value = true;
  try{
    const res = await $axios.delete(`/users/${dataDel.value.id}`)
    getUsers()
    dialog.value = false
    dataDel.value = {}
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const handleChangePage = (page: any) => {
  indexStore.setQueryUrl({ ...route.query, page: page })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getUsers()
}

const handleTable = (table:any) => {
  indexStore.setQueryUrl({ ...route.query, page: 1, sortKey: table.sortBy[0].key, sortOrder: table.sortBy[0].order })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getUsers()
}

const handleSearch = (search: string) => {
  indexStore.setQueryUrl({ ...route.query, page: 1, filter_search: search.target.value })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getUsers()
}

const rejectDel = () => {
  dialog.value = false
  dataDel.value = {}
}

onMounted(async () => {
  await getUsers()
})

</script>

<template>
  <VRow>
    <VCol cols="12">
     <VBtn to="/users/create">
          Criar Usuário
        </VBtn>
    </VCol>
  
    <VCol cols="12">
      <VCard :loading="loading" title="Filtros">
         <template v-slot:text>
        <VForm @submit.prevent="() => {}">
                  <VRow>
                    <VCol
                      cols="4"
                      md="4"
                    >
  <VTextField
            v-model="form.search"
            density="compact"
            label="Buscar"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            dense
            outlined
            @input="handleSearch"
          />
                    </VCol>
                  </VRow>
          </VForm>
          </template>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard :loading="loading" title="Todos os Usuários">

        <div>

    <!-- 👉 Data Table  -->
    <VDataTableServer
      :headers="headersUsers"
      :items="dataUsers.users.data"
      :items-per-page="dataUsers.users.per_page"
      :itemsLength="dataUsers.users.total"
      v-model:sort-by="form.sortBy"
      @update:options="handleTable"
    >
      <template #item.options="{ item }">
        <VBtn :to="`/users/edit/${item.id}`" x-small color="primary" class="mr-2">
          Editar
        </VBtn>
         <VBtn @click="confirmDel(item)" x-small color="error">
          Deletar
        </VBtn>
        
      </template>

       <template #bottom>
      <VCardText class="pt-2" v-if="dataUsers.users.total">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VPagination
            v-model="form.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(dataUsers.users.total / dataUsers.users.per_page)"
            @update:model-value="handleChangePage"
          />
        </div>
      </VCardText>
    </template>
    </VDataTableServer>
  </div>
      </VCard>
    </VCol>
  </VRow>

     <v-dialog v-model="dialog" persistent max-width="390" >
      
      <v-card :loading="loading">
        <v-card-title class="text-h5">
          Voce deseja deletar?
        </v-card-title>
        <v-card-text><b>ID:</b> {{dataDel.id}} <br> <b>Email:</b> {{dataDel.email}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="rejectDel" >
            Não Deletar
          </v-btn>
          <v-btn color="success" text @click="userDelete" >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
