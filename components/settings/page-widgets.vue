<script setup>
const widgesAvailiable = [
    {
        name: 'clock',
        title: '时钟',
        icon: 'pi-clock'
    },
    {
        name: 'calendar',
        title: '日历',
        icon: 'pi-calendar'
    },
    {
        name: 'weather',
        title: '天气',
        icon: 'pi-sun'
    }
]
const settingStore = useSettingsStore()
const { widgets } = storeToRefs(settingStore)
</script>

<template>
    <div class="p-4 space-y-4">
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-600">可用小组件</label>
                <div class="grid grid-cols-3 gap-4">
                    <div v-if="!widgesAvailiable.some(widget => !widgets.find(w => w.type === widget.name))" class="col-span-3 text-center py-8 text-gray-500">
                        暂无可用小组件
                    </div>
                    <template v-for="widget in widgesAvailiable">
                    <div 
                        v-if="!widgets.find(w => w.type == widget.name)"
                        @click="widgets.push({
                            type: widget.name,
                            title: widget.title,
                            size_x: 1,
                            size_y: 1,
                            e: {}
                        })"
                        class="relative p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors group">
                        <div class="transition-opacity group-hover:opacity-0 flex flex-col items-center justify-center">
                            <i :class="[widget.icon, 'pi text-2xl text-gray-600']"></i>
                            <div class="mt-2 text-sm">{{widget.name}}</div>
                        </div>
                        <div class="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center">
                            <i class="pi pi-plus text-blue-500 text-2xl"></i>
                            <div class="mt-2 text-sm">{{widget.name}}</div>
                        </div>
                    </div>
                </template>
                </div>
            </div>
    </div>
</template>