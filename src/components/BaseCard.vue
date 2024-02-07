<script>
export default {
    name: 'Base Card',
    props: {
        element: Object
    }
}
</script>

<template>
    <div class="card">
        <div class="card-info bg-black text-white">
            <div>Titolo: {{ element.title }}</div>
            <div>Titolo originale: {{ element.originalTitle }}</div>
            <div>Lingua: {{ element.language }}</div>
            <div>Voto: {{ element.vote }}</div>
        </div>
    </div>
</template>