<script setup>
const model = defineModel({ lat: null, lng: null });

const selected = ref(null);

const search = async (query) => {
    if (!query || query.length < 2) {
        return [];
    }

    const { results } = await $fetch('https://geocoding-api.open-meteo.com/v1/search', {
        query: { name: query, count: 10, language: 'en' }
    });

    return (results || []).map(place => ({
        id: place.id,
        label: [place.name, [place.admin1, place.country].filter(Boolean).join(', ')].filter(Boolean).join(' — '),
        lat: place.latitude,
        lng: place.longitude,
        timezone: place.timezone,
    }));
}

watch(selected, place => {
    model.value = place
        ? { lat: place.lat, lng: place.lng, timezone: place.timezone }
        : {};
});

</script>
<template>
    <UFormGroup
        size="xl"
        label="Location"
        description="Where were you born?"
        required
    >
        <UInputMenu
            v-model="selected"
            :search="search"
            :debounce="300"
            by="id"
            option-attribute="label"
            icon="i-heroicons-globe-americas-solid"
            placeholder="Type your city"
        />
    </UFormGroup>
</template>

<style></style>
