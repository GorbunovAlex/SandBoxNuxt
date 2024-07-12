import { defineStore } from 'pinia'

export const useSwitch = defineStore('switch', () =>{
    const someSwitching = ref(false);

    return {
        someSwitching
    }
})