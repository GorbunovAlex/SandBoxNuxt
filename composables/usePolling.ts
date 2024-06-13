export default function usePolling() {
    const indicator = ref(false)

    function refetchData(refetchFunction: () => Promise<void>) {
        setTimeout(async () => {
            indicator.value = true;
            await refetchFunction()
            indicator.value = false
            refetchData(refetchFunction)
        }, 10000);
    }

    return {
        indicator,
        refetchData
    }
}