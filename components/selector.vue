<script setup>
const props = defineProps(['candidates'])
const selected = defineModel()
</script>
<template>
    <div class="flex gap-4">
        <div 
            v-for="name in candidates" 
            @click="()=>{
                selected = name
            }"
            :class="[
                'px-4 py-2 border rounded-lg cursor-pointer transition-colors',
                selected == name ? 'border-blue-500 text-blue-500' : 'hover:border-gray-400'
            ]"
        >
            {{ name }}
        </div>
    </div>
</template>