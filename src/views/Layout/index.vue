<template>
    <!-- 顶部 -->
    <Navbar/>
    <!-- 头部 -->
    <Header/>
    <!-- 吸顶 -->
    <HeaderAdsorb/>
    <!-- 二级路由 -->
    <RouterView/>
    <!-- 底部 -->
    <Footer/>
</template>

<script>
import HeaderAdsorb from '@/components/Header-adsorb.vue'
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/views/Home';
import { useStore } from 'vuex';

export default {
    name: 'Layout',
    components: { Navbar, Header, Footer, HeaderAdsorb },
    setup() {
        const store = useStore()
        store.dispatch('category/getList')
    }
}
</script>

<style lang="less" scoped>

</style>