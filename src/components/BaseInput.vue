<script setup>
import { computed } from 'vue';

const props = defineProps([
    'modelValue', 
    'errors',
    'label',
    'type',
    'id'
])

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>


<template>
    <!-- Form Group -->
    <div>
        <div class="relative">
            <input :type="props.type" :id="props.id" :name="props.id" class="
                        peer py-3 px-2 w-full
                        border-0 border-b-2 border-gray-300 
                        text-sm 
                        focus:border-blue-600 focus:ring-0 focus:border-0 focus:border-b-2
                        dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                        placeholder-transparent
                        " v-model="value" placeholder="Email address">

            <div class=" absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3"
                :class="props.errors.length == 0 ? 'hidden' : ''">
                <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                    aria-hidden="true">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
            </div>
            <label :for="props.id" class="
                        absolute
                        left-0 
                        -top-6 
                        text-gray-600 text-sm 
                        transition-all 
                        peer-placeholder-shown:text-sm 
                        peer-placeholder-shown:left-4 
                        peer-placeholder-shown:top-3 
                        peer-placeholder-shown:text-gray-400
                        peer-focus:left-0
                        peer-focus:-top-6
                        peer-focus:text-gray-700
                        ">{{ props.label }}
            </label>
        </div>
        <p class="text-xs text-red-600 mt-2" v-for="error in props.errors" :key="error.$uid">
            {{ error.$message }}
        </p>
    </div>
    <!-- End Form Group -->
</template>

<style scoped></style>
