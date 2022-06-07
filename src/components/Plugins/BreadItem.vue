<template>
      <div class="xtx-bread-item">
      <RouterLink v-if="to" :to="to"> <slot/> </RouterLink>
      <span v-else><slot/> </span>
    </div>
</template>

<script>
export default {
    name: 'BreadItem',
    props: {
        to: {
            typr: String,
            dafault:'/'
        }
    }
}
</script>

<style>

</style>