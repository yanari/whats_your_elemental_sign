<script setup>
const route = useRoute();
const astros = useAstrosStore();
const ownResult = useCookie('own-result');

const p = String(route.query.p || '').toLowerCase();
const points = parsePoints(p);

if (!points) {
    await navigateTo('/', { replace: true });
}

// the cookie is readable during SSR, so owner and visitor get the right layout from the first paint
const isOwner = computed(() => ownResult.value === p);

useShareSeo({
    ...getShareMeta(points ? getDominantLetters(points) : undefined),
    path: `/result?p=${p}`,
});

// the owner already has the result in localStorage; visitors fetch it from the points code
const storedResult = computed(() => astros.data?.p === p ? astros.data : null);

const { data: fetched, status, execute } = useFetch('/api/result', {
    query: { p },
    server: false,
    immediate: false,
});

onMounted(() => {
    if (!storedResult.value) {
        execute();
    }
});

const result = computed(() => storedResult.value || fetched.value?.response || null);

// the API texts talk to the owner ("your birth chart"); visitors are reading someone else's
const forReader = (text = '') => isOwner.value ? text : text.replace('your birth chart', 'this birth chart');

// Share
const { origin } = useRequestURL();
const fullUrl = `${origin}/result?p=${p}`;
const shareText = computed(() => `${result.value?.ogTitle}! Find out yours on`);

const shareTwitter = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(fullUrl)}`);
const shareTelegram = computed(() => `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText.value)}`);
const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
</script>
<template>
    <UContainer class="max-w-3xl px-0 md:px-4 pb-20">
        <div v-if="!isOwner" class="bg-slate-600/10 text-stone-300 text-center p-6 md:p-8 mt-4 md:mt-8">
            <p class="text-xl/relaxed mb-4">Someone shared their elemental chart with you ✨</p>
            <UButton
                to="/form"
                size="xl"
                label="Discover yours"
                :ui="{ rounded: 'rounded md:rounded-full' }"
                block
            />
        </div>

        <main class="bg-slate-600/10 text-stone-300 text-start">
            <ClientOnly>
                <template v-if="result">
                    <div class="description">
                        <h2 class="text-4xl/relaxed md:text-4xl/loose font-bold text-center mb-6">
                            {{ forReader(result.dominantTitle) }}:
                        </h2>
                        <Description :set="result.dominant" :signs="result.zodiacSigns" />
                        <UDivider class="mb-8" />
                        <h2 class="text-2xl/relaxed md:text-3xl/loose font-bold text-center mb-6">
                            {{ forReader(result.lackTitle) }}:
                        </h2>
                        <Description :set="result.lack" :signs="result.zodiacSigns" />
                    </div>
                    <UDivider class="mb-8" />
                    <div class="justify-center flex mb-14">
                        <Chart :elements="result.calculation" :signs="result.zodiacSigns" />
                    </div>
                    <div v-if="isOwner" class="grid gap-4 mb-14 grid-cols-3">
                        <ShareIcon social-media="X" :text-to-post="shareTwitter" bg="bg-x" />
                        <ShareIcon social-media="Facebook" :text-to-post="shareFacebook" bg="bg-facebook" />
                        <ShareIcon social-media="Telegram" :text-to-post="shareTelegram" bg="bg-telegram" />
                    </div>
                </template>

                <div v-else-if="status === 'error'" class="text-center py-16">
                    <p class="text-xl mb-6">We couldn't load this chart.</p>
                    <UButton label="Try again" variant="outline" size="lg" @click="execute()" />
                </div>

                <div v-else class="text-center py-16">
                    <UIcon name="i-heroicons-sparkles" class="size-10 animate-pulse mb-4" />
                    <p class="text-xl">Reading the stars…</p>
                    <p class="text-sm opacity-75 mt-2">The first load can take up to a minute.</p>
                </div>

                <template #fallback>
                    <div class="text-center py-16">
                        <UIcon name="i-heroicons-sparkles" class="size-10 animate-pulse mb-4" />
                        <p class="text-xl">Reading the stars…</p>
                    </div>
                </template>
            </ClientOnly>

            <div class="text-center">
                <UButton
                    v-if="isOwner"
                    to="/form"
                    label="Retake the test"
                    variant="outline"
                    size="xl"
                    :ui="{ rounded: 'rounded md:rounded-full' }"
                    block
                />
                <UButton
                    v-else
                    to="/form"
                    label="Discover your dominant element"
                    size="xl"
                    :ui="{ rounded: 'rounded md:rounded-full' }"
                    block
                />
            </div>
        </main>
    </UContainer>
</template>
<style></style>
