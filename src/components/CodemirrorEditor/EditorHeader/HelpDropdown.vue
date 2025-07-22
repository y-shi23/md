<script setup lang="ts">
const aboutDialogVisible = ref(false)
const fundDialogVisible = ref(false)
</script>

<template>
  <!-- 各弹窗挂载 -->
  <AboutDialog :visible="aboutDialogVisible" @close="aboutDialogVisible = false" />
  <FundDialog :visible="fundDialogVisible" @close="fundDialogVisible = false" />
</template>
