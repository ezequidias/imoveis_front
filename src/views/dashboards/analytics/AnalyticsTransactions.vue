<script setup lang="ts">

const props = defineProps<{
  data: Object
}>()

const statistics = ref([
  {
    title: 'Usuários',
    slug: 'users',
    stats: '0',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Imóveis',
    slug: 'properties',
    stats: '0',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
])

watch(() => props.data, (val) => {
  statistics.value.map(item => {
    if(item.slug == 'users') item.stats = val.total_users
    if(item.slug == 'properties') item.stats = val.total_properties
  })
},{immediate:true, deep:true});

</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Resumo</VCardTitle>
    </VCardItem>

    <VCardText>

      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          sm="3"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="42"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
