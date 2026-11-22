<script setup>
defineProps({ count: { type: Number, required: true } });
</script>

<template>
  <div class="tf3-counter" aria-live="polite">Знайдено: {{ count }}</div>
</template>
