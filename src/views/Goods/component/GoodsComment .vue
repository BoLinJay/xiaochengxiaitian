<template>
  <div class="goods-comment">
    <div class="head" v-if="goodsList">
      <div class="data">
        <p><span>{{goodsList.salesCount}}</span><span>人购买</span></p>
        <p><span>{{goodsList.praisePercent}}%</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a 
          href="javascript:;" 
          :class="{active: Tag===i}" 
          @click="changeTag(i)"
          v-for="(item,i) in goodsList.tags"
          :key="i"
          >{{item.title}}（{{item.tagCount}}）</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a 
      href="javascript:;" 
      :class="{active:reqParams.sortField === null}"
      @click="changeSort(null)"
      >默认</a>
      <a 
      href="javascript:;" 
      :class="{active:reqParams.sortField==='praiseCount'}"
      @click="changeSort('praiseCount')"
      >最新</a>
      <a 
      href="javascript:;" 
      :class="{active:reqParams.sortField==='createTime'}"
      @click="changeSort('createTime')"
      >最热</a>
    </div>
   <!-- 列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="(item,index) in commentList" :key="index">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01" v-for="(xing, i) in item.score" :key="i"></i>
            <i class="iconfont icon-wjx02" v-for="(xing, i) in 5-item.score" :key="i"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 图片浏览组件 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures"/>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>100</span>
          </div>
        </div>
      </div>
      <Pagination @current-change="changePager" :total="total" :current-page="reqParams.page"  />
    </div>
  </div>
</template>
<script>
import { GetCommentInfoByGoods, GetCommentListByGoods } from '@/api/goods'
import GoodsCommentImage from './GoodsCommentImage.vue'
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup() {
    const route = useRoute()
    const goodsList = ref(null)
    GetCommentInfoByGoods(route.params.id).then(({ result }) => {
        // type 的目的是将来点击可以区分点的是不是标签
      result.tags.unshift({ type: 'img', title: '有图', tagCount: result.hasPictureCount })
      result.tags.unshift({ type: 'all', title: '全部评价', tagCount: result.evaluateCount })
      goodsList.value = result
    })

    const Tag = ref(0)
    const changeTag = (i) => {
      Tag.value = i
      // 设置有图和标签条件
        const currTag = goodsList.value.tags[i]
        if (currTag.type === 'all') {
          reqParams.hasPicture = false
          reqParams.tag = null
        } else if (currTag.type === 'img') {
          reqParams.hasPicture = true
          reqParams.tag = null
        } else {
          reqParams.hasPicture = false
          reqParams.tag = currTag.title
        }
        reqParams.page = 1
    }
    // 排序
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })
    // 点击改变active
    const changeSort = (sort) => {
      reqParams.sortField = sort
      reqParams.page = 1
    }
     // 初始化或者筛选条件改变后，获取列表数据。
    const commentList = ref([])
    watch(reqParams, async () => {
      const data = await GetCommentListByGoods(route.params.id, reqParams)
      console.log(data);
      commentList.value = data.result.items
    }, { immediate: true })

     // 定义转换数据的函数（对应vue2.0的过滤器）
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '☛').trim()
  
     
    }
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }
    return { goodsList, changeTag, Tag, changeSort, reqParams, commentList, formatSpecs, formatNickname }
  }
}
</script>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
   .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>