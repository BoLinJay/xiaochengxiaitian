<template>
  <Form   ref="formCom" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{nickname}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field  :class="{err: errors.mobile} " v-model="form.mobile"  name="mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{err: errors.code}" v-model="form.code"  name="code" class="input" type="text" placeholder="短信验证码" />
        <span class="code" @click="send">{{time===0?'发送验证码':time}}</span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}} </div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc'
import { reactive, ref, onUnmounted } from 'vue'
import { Form, Field } from 'vee-validate'
import Message from '@/components/Plugins/Message.js'
import schema from '@/utils/vee-validate-schema'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  components: { Form, Field },
   props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
      // 1. 准备下信息：unionId(openId) qq头像 昵称
    // 2. 完成表单校验
    // 3. 发送验证吗（校验，定义api，调用，完成倒计时）
    // 4. 进行绑定（绑定成功就是登录成功）
    const nickname = ref('null')
    const avatar = ref('null')
    const store = useStore()
    const router = useRouter()
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
          avatar.value = res.data.figureurl_1
          nickname.value = res.data.nickname
      })
    }
    const form = reactive ({
      mobile: null,
      code: null
    })
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }

    // 倒计时
    const formCom = ref(null)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })

    // 1.校验手机号2.倒计时为0 才可以发送请求
    const send = () => {
      const valid = mySchema.mobile(form.mobile)
      if( valid === true) {
        // 倒计时
        if( time.value === 0) {
            userQQBindCode(form).then(data => {
            Message({ form :'success', text: '发送成功'})
            time.value = 60
            resume()
            })
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    // 立即绑定
    const submit = () => {
      const valid = formCom.value.validate()
      if( valid ) {
        userQQBindLogin({
          unionId:props.unionId,
          form
        }).then(data => {
           // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ绑定成功' })
        }).catch( e => {
          Message({form:'error', text:e.message})
        })
      }
      }
      
    return { nickname, avatar, form, mySchema, send, time, formCom, submit }
  }
}
</script>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
</style>