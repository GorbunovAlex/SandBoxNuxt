import { lightningChart} from "@arction/lcjs";
import type { LightningChart } from "@arction/lcjs";

export default defineNuxtPlugin(nuxtApp => {
    const licenseKey = import.meta.env.VITE_LC_KEY;

    const lc = lightningChart({
        license: licenseKey || '',
        licenseInformation: {
            appTitle: "LightningChart JS Trial",
            company: "LightningChart Ltd."
        },
    })

    nuxtApp.vueApp.provide<LightningChart>('lc', lc)
})