<template>
  <HeaderView />
  <router-view/>
  <FooterView />
</template>

<script setup lang="ts">
import FooterView from '@/components/common/FooterView.vue';
import HeaderView from '@/components/common/HeaderView.vue';

</script>
