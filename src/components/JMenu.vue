<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#39CB74"
            active-text-color="#ffd04b" >
        <el-menu-item index="1">我的收藏</el-menu-item>
        <el-menu-item index="2">求片列表</el-menu-item>
        <el-menu-item index="3">联系我们</el-menu-item>
    </el-menu>

</template>

<script>
    export default {
        name: "JMenu",
        data() {
            return {
                activeIndex: '0',
                isCollapse: true
            };
        },

        props:{
            favoriteActive:{
                type:Boolean,
                defaults:false
            }
        },

        methods: {
            handleSelect(key, keyPath) {
                switch (key) {
                    case '1':
                        console.log('点击了我的收藏');
                        this.$emit('update:favoriteActive',(!this.favoriteActive));
                        break;
                    case '2':
                        console.log('点击了求片列表');
                        break;
                    case '3':
                        console.log('点击了联系我们');
                        break;
                    default:
                        console.log('异常的点击事件');

                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log('close'+key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>