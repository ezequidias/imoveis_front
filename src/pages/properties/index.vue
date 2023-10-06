<script lang="ts" setup>
import { useIndexStore } from '@/stores';
const $axios = inject('$axios')
const router = useRouter()
const route = useRoute()

const loading = ref(false)
const dialog = ref(false)
const dataDel = ref({})
const form = ref({page: 1, sortBy: [''], sortDesc: [false]})
const indexStore = useIndexStore();
const dataProperties = ref({
  properties: {
    data: [],
    current_page: 1,
    per_page: 50,
    total: 1
  }
})

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

const headersProperties = [
  { title: 'ID', key: 'id' },
  { title: 'TIPO', key: 'type' },
  { title: 'ENDEREÇO', key: 'address' },
  { title: 'PREÇO', key: 'price' },
  { title: 'STATUS', key: 'status' },
  { title: 'OPÇÕES', key: 'options', sortable:false },
]

const getProperties = async () => {
  loading.value = true;
  try{
    const res = await $axios.get(`/properties?${indexStore.queryUrl}`)
    dataProperties.value = res.data
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const confirmDel = (user) => {
  dialog.value = true
  dataDel.value = user
}

const productDelete = async () => {
  loading.value = true;
  try{
    const res = await $axios.delete(`/properties/${dataDel.value.id}`)
    getProperties()
    dialog.value = false
    dataDel.value = {}
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const rejectDel = () => {
  dialog.value = false
  dataDel.value = {}
}

const handleChangePage = (page: any) => {
  indexStore.setQueryUrl({ ...route.query, page: page })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getProperties()
}

const handleTable = (table:any) => {
  indexStore.setQueryUrl({ ...route.query, page: 1, sortKey: table.sortBy[0].key, sortOrder: table.sortBy[0].order })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getProperties()
}

const handleSearch = (search: string) => {
  indexStore.setQueryUrl({ ...route.query, page: 1, filter_search: search.target.value })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getProperties()
}

const handleType = (selectType) => {
  const type = selectType.map(item => item.value).join(',')
  indexStore.setQueryUrl({ ...route.query, page: 1, type})
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getProperties()
}

const handleStatus = (selectStatus) => {
  const status = selectStatus.map(item => item.value).join(',')
  indexStore.setQueryUrl({ ...route.query, page: 1, status })
  router.replace({ query: { ...indexStore.getQueryUrl('json') } }, () => {})
  getProperties()
}

onMounted(async () => {
  await getProperties()
})
</script>

<template>
  <VRow>
    <!-- basic -->
    <VCol cols="12">
     <VBtn to="/properties/create">
          Criar Imóvel
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

                       <VCol
                      cols="4"
                      md="4"
                    >
                     <VSelect
    v-model="form.type"
    :items="itemsType"
    item-title="name"
    item-value="value"
    label="Tipo"
    persistent-hint
    return-object
    multiple
    @update:modelValue="handleType"
  />
                    </VCol>

                       <VCol
                      cols="4"
                      md="4"
                    >
                     <VSelect
    v-model="form.status"
    :items="itemsStatus"
    item-title="name"
    item-value="value"
    label="Status"
    persistent-hint
    return-object
    multiple
    @update:modelValue="handleStatus"
  />
                    </VCol>
                  </VRow>
          </VForm>
          </template>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard :loading="loading" title="Todos os Imóveis">
        <!-- 👉 Data Table  -->
    <VDataTableServer
      :headers="headersProperties"
      :items="dataProperties.properties.data"
      :items-per-page="dataProperties.properties.per_page"
      :itemsLength="dataProperties.properties.total"
      v-model:sort-by="form.sortBy"
      @update:options="handleTable"
    >
      <template #item.options="{ item }">
        <VBtn :to="`/properties/edit/${item.id}`" x-small color="primary" class="mr-2">
          Editar
        </VBtn>
         <VBtn @click="confirmDel(item)" x-small color="error">
          Deletar
        </VBtn>
        
      </template>

       <template #item.type="{ item }">
      <b v-if="item.type == 'house'" >Casa </b>
      <b v-if="item.type == 'apartment'" >Apartamento </b>
      <b v-if="item.type == 'land'" >Terreno </b>
    </template>

    <template #item.status="{ item }">
      <VChip v-if="item.status == 'available'" color="success" class="font-weight-medium" size="small"  >Disponível</VChip>
      <VChip v-if="item.status == 'rented'" color="warning" class="font-weight-medium" size="small"  >Alugado</VChip>
      <VChip v-if="item.status == 'sold'" color="danger" class="font-weight-medium" size="small"  >Vendido</VChip>
    </template>

       <template #bottom>
      <VCardText class="pt-2" v-if="dataProperties.properties.total">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VPagination
            v-model="form.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(dataProperties.properties.total / dataProperties.properties.per_page)"
            @update:model-value="handleChangePage"
          />
        </div>
      </VCardText>
    </template>
    </VDataTableServer>
      </VCard>
    </VCol>
  </VRow>

     <v-dialog v-model="dialog" persistent max-width="390" >
      
      <v-card :loading="loading">
        <v-card-title class="text-h5">
          Voce deseja deletar?
        </v-card-title>
        <v-card-text><b>ID:</b> {{dataDel.id}} <br> <b>Endereço:</b> {{dataDel.address}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="rejectDel" >
            Não Deletar
          </v-btn>
          <v-btn color="success" text @click="productDelete" >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
