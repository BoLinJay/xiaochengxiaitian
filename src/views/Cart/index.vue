<template>
  <div class="xtx-cart-page">
    <div class="container">
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem>购物车</BreadItem>
      </Bread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><Checkbox @change="checkAll" :modelValue="$store.getters['cart/changeAll']">全选</Checkbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody >
            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
              <td><Checkbox @change="($event)=>changeOne(item.skuId, $event)" :modelValue="item.selected"/></td>
              <td>
                <div class="goods">
                  <RouterLink to="/product/${item.id}"><img :src="item.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <!-- 选择规格组件 -->
                      <CartSku  @change="$event=>updateCartSku(item.skuId,$event)" :attrsText="item.attrsText" :skuId="item.skuId" />
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{item.nowPrice}}</p>
                <p v-if="item.price-item.nowPrice>0" >比加入时降价 <span class="red">&yen;{{item.price-item.nowPrice}}</span></p>
              </td>
              <td class="tc">
                <NumBox :max="item.stock" @change="$event=>changeCount(item.skuId,$event)"  :modelValue="item.count"/>
              </td>
              <td class="tc"><p class="f16 red">&yen;{{item.nowPrice*100*item.count/100}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a  @click="delOne(item.skuId)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
         
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length>0">
            <tr><td colspan="6"><h3 class="tit" >失效商品</h3></td></tr>
            <tr v-for="item in $store.getters['cart/invalidList']" :key="item.skuId">
              <td><Checkbox style="color:#eee;" /></td>
              <td>
                <div class="goods">
                   <RouterLink to="/product/${item.id}"><img :src="item.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <!-- 选择规格组件 -->
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;200.00</p></td>
              <td class="tc">1</td>
              <td class="tc"><p>&yen;200.00</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       <!-- 没有东西 -->
          <CartNone v-if="$store.state.cart.list.length == 0" />
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <Checkbox @change="checkAll" :modelValue="$store.getters['cart/changeAll']">全选</Checkbox>
          <a @click="deleteSelected" href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a @click="delInvalidList" href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedNum']}} 件，商品合计：
          <span class="red">¥{{$store.getters['cart/selectedMoney']}}</span>
          <Button type="primary" @click="payMent">下单结算</Button>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/Goods/component/GoodsRelevant'
import Confirm from '@/components/Plugins/Confirm'
import CartSku from './Components/CartSku'
import Message from '@/components/Plugins/Message.js'
import CartNone from './Components/CartNone'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CartPage',
  components: { GoodRelevant, CartSku, CartNone },
  setup() {
    const store = useStore()
    // 单选框
    const changeOne = (skuId, selected) => {
      store.dispatch('cart/updateCart', { skuId, selected})
    }
    // 全选框
    const checkAll = (selected) => {
      store.dispatch('cart/updateCheckAll', selected)
    }
    // 删除购物车
    const delOne = (skuId) => {
      Confirm({ text: ' 您确认从购物车删除该商品吗？' }).then(() => {
        // console.log('点击确认')
        store.dispatch('cart/DeleteCart', skuId)
      }).catch(e => {
        // console.log('点击取消')
      })
    }
    // 批量删除购物车
    const deleteSelected = () => {
         Confirm({ text: '您确定从购物车删除选中的商品吗？' }).then(() => {
          store.dispatch('cart/deleteSelected')
      }).catch(e => {})
    }
    // 清空无效商品
    const delInvalidList = () => {
       Confirm({ text: ' 您确认清空失效商品吗？' }).then(() => {
        // console.log('点击确认')
        store.dispatch('cart/invalidList')
      }).catch(e => {
        // console.log('点击取消')
      })
    }
       // 修改数量
    const changeCount = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }
      // 修改规格
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }
    // 下单结算 
    const router = useRouter()
    const payMent = () => {
      if(store.getters['cart/selectedList'].length === 0) {
        Message({text: '至少选中一件商品'})
      }
      if(!store.state.user.profile.token) {
          Confirm({ text: '下单结算需要登录，您是否去登录？' }).then(() => {
          // 点击确认
          router.push('/member/checkout')
        }).catch(e => {})
      } else {
        router.push('/member/checkout')
      }
    }
    return { changeOne, checkAll, delOne, deleteSelected, delInvalidList, changeCount, updateCartSku, payMent }
  }
}
</script>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>