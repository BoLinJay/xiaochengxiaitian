<template>
  <RouterLink :to="path" class='goods-item'>
    <img v-lazyload="goods.picture" alt="" >
    <p class="name ellipsis">{{goods.desc}}</p>
    <p class="desc ellipsis">{{goods.name}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default: () => {}
    },
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped lang='less'>

.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoveShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>