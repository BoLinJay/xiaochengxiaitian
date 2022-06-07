<template>
  <Form ref="formCom" class="xtx-form" :validation-schema="mySchema" v-slot="{errors}">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field v-model="form.account" :class="{err:errors.account} " name="account" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div class="error" v-if="errors.account">{{errors.account}} </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field v-model="form.mobile" :class="{err:errors.mobile}" name="mobile" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field v-model="form.code" :class="{err:errors.code}" name="code" class="input" type="text" placeholder="请输入验证码" />
        <span class="code" @click="send">{{time===0?'发送验证码':time}} </span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field v-model="form.password" :class="{err:errors.password}" name="password" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div class="error" v-if="errors.password">{{errors.password}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field v-model="form.rePassword" :class="{err:errors.rePassword}" name="rePassword" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div class="error" v-if="errors.rePassword">{{errors.rePassword}}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>

<script>
import schema from '@/utils/vee-validate-schema'
import { onUnmounted, reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useIntervalFn } from '@vueuse/core'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import Message from '@/components/Plugins/Message.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackPatch',
  components: { Form, Field  },
  props: {
    unionId: {
      type: String,
      default:''
    }
  },
  setup(props) {
    // 表单数据
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })
    // 验证规则
    // 表单校验规则
    const mySchema = {
      account: schema.accountApi,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.rePassword
    }
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

    // 1. 发送验证码
    // 1.1 绑定发送验证码按钮点击事件
    // 1.2 校验手机号，如果成功才去发送短信（定义API），请求成功开启60s的倒计时，不能再次点击，倒计时结束恢复
    // 1.3 如果失败，失败的校验样式显示出来
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        if (time.value === 0) {
        // 没有倒计时才可以发送
          await userQQPatchCode(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    // 立即提交
    const submit = () => {
      const store = useStore()
      const router = useRouter()
      userQQPatchLogin({
        unionId:props.unionId,
        ...form
      }).then(data => {
        // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ完善信息成功' })
      }).catch(e => {
         Message({ type: 'error', text: '完善信息失败' })
      })
    }
    return { form, mySchema, send, time, submit }
  }
}
</script>

<style lang="less" scoped>
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