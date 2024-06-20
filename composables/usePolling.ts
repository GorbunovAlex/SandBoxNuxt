export default function usePolling() {
    const indicator = ref(false)

    const timer = ref<NodeJS.Timeout | null>(null)
    const timeOutIds = ref([]);

    function refetchData(refetchFunction: () => Promise<void>) {
        timer.value = setTimeout(async () => {
            indicator.value = true;
            await refetchFunction()
            indicator.value = false
            refetchData(refetchFunction)
        }, 10000);
    }

    onUnmounted(() => {
        if (timer.value !== null) clearTimeout(timer.value)
    });

    return {
        indicator,
        refetchData
    }
}