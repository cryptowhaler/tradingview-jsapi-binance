<template>
  <TVChartContainer :symbol="'ETHBTC/DEC20'" :interval="'60'"></TVChartContainer>
</template>

<script>
  import TVChartContainer from './components/TVChartContainer.vue'
  export default {
    name: 'app',
    components: {
      TVChartContainer
    }
  }
</script>