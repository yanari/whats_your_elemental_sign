<script setup>
useShareSeo({ ...getShareMeta(), path: '/' });

const { isBgLoaded } = inject('isBgLoaded');

</script>
<template>
    <Transition name="fade">
        <UContainer v-show="isBgLoaded" class="items-center text-center h-dvh flex justify-center flex-col">
            <h1 class="text-5xl/relaxed font-semibold mb-8">Calculate the dominant element in your birth chart!</h1>
            <UButton
                class="max-w-lg"
                to="/form"
                color="primary"
                size="xl"
                :ui="{ rounded: 'rounded md:rounded-full', gap: { xl: '48px'} }"
                block
                label="Begin"
            />
        </UContainer>
    </Transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>