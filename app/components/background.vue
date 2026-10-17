<script setup>
const backgroundUrl = await useBackgroundUrl();

</script>
<template>
    <div class="fixed top-0 left-0 h-screen w-screen">
      <ClientOnly>
        <img :src="backgroundUrl" class="w-full h-full object-cover object-center" />
      </ClientOnly>
    </div>
</template>