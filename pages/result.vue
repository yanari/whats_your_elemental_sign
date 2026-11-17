<script setup>
definePageMeta({
    middleware: 'has-results'
})

const { data } = useAstrosStore();
const route = useRoute();
const params = ref(route.query.els);

const { origin } = useRequestURL();

const zodiacSigns = ref(data.zodiacSigns);

const dominant = ref(data.dominant);
const lack = ref(data.lack);

const dominantTitle = computed(() => data.dominantTitle);
const lackOfTitle = computed(() => data.lackTitle);
const elements = computed(() => data.calculation);

// Share
const ogTitle = computed(() => data.ogTitle + '!');

const fullUrl = computed(() => `${origin}/?els=${params.value}`);
const shareText = computed(() => `${ogTitle.value} Find out yours on`);

const shareTwitter = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(fullUrl.value)}`);
const shareTelegram = computed(() => `https://t.me/share/url?url=${encodeURIComponent(fullUrl.value)}&text=${encodeURIComponent(shareText.value)}`);
const shareFacebook = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl.value)}`);

</script>
<template>
    <UContainer class="max-w-3xl px-0 md:px-4">
        <main class="bg-slate-600/10 text-stone-300 text-start">
            <div class="description">
                <h2 class="text-4xl/relaxed md:text-4xl/loose font-bold text-center mb-6">
                    {{ dominantTitle }}:
                </h2>
                <Description :set="dominant" :signs="zodiacSigns" />
                <UDivider class="mb-8" />
                <h2 class="text-2xl/relaxed md:text-3xl/loose font-bold text-center mb-6">
                    {{ lackOfTitle }}:
                </h2>
                <Description :set="lack" :signs="zodiacSigns" />
            </div>
            <UDivider class="mb-8" />
            <div class="justify-center flex mb-14">
                <Chart :elements="elements" :signs="zodiacSigns" />
            </div>
            <div class="grid gap-4 mb-14 grid-cols-3">
                <ShareIcon social-media="X" :text-to-post="shareTwitter" bg="bg-x" />
                <ShareIcon social-media="Facebook" :text-to-post="shareFacebook" bg="bg-facebook" />
                <ShareIcon social-media="Telegram" :text-to-post="shareTelegram" bg="bg-telegram" />
            </div>
        </main>
    </UContainer>
</template>
<style></style>