<template>
<!-- 首页入口 -->
  <div class="home-entry">
   <div class="container">
    <!-- 左侧分类 -->
    <HomeCategory/>
    <!-- 轮播图 -->
    <HomeBanner/>
    <!-- 新鲜好物 -->
    <HomeNew/>
    <!-- 人气推荐 -->
    <HomeHot/>
    <!-- 热门品牌 -->
    <HomeBrand/>
    <!-- 产品区块 -->
    <HomeProduct/>
    <!-- 最新专题 -->
    <HomeSpecial/>
    </div>
  </div>
</template>

<script>
import HomeCategory from './Home-category'
import HomeBanner from './HomeBanner'
import HomeNew from './HomeNew'
import HomeHot from './HomeHot'
import HomeBrand from './HomeBrand'
import HomeProduct from "./HomeProduct";
import HomeSpecial from './HomeSpecial'
export default {
    name: 'Home',
    components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct, HomeProduct, HomeSpecial }
}
</script>

<style lang="less" scoped>

</style>>