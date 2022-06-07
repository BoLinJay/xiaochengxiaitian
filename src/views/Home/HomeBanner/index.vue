<template>
  <div class="home-banner">
    <Carousel :sliders="sliders" autoPlay :playTimer="2000" />
  </div>
</template>
<script>
import { GetCarousel } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup() {
    const sliders = ref([])
    GetCarousel().then(data => {
      sliders.value = data.result
    })

    return { sliders }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
// 覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>