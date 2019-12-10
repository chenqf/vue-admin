<template>
    <el-container>
        <el-aside>
            <div class="aside-logo">
                Logo
            </div>
            <el-menu
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            collapsed:false // 是否最小化左侧菜单
        }
    },
    methods:{
        handleCollapsedChange (state) {
            this.collapsed = state
        },
    }
}
</script>


<style lang="scss" scoped>
$aside-bg-color:#001529;
$aside-color:rgba(255, 255, 255, 0.7);
$aside-open-width:260px;
$aside-close-width:65px;
$header-height:64px;


.el-container{
    height: 100%;
    & > .el-aside{
        background-color: $aside-bg-color;
        color:$aside-color;
        width: $aside-open-width!important;
        &.close{
            width:$aside-close-width!important;
        }
        & > .aside-logo{
            height: $header-height;
        }
        & > .el-menu{
            background-color: $aside-bg-color;
        }
    }

    & > .el-header{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #F0F0F0;
        height: $header-height!important;
    }
}


</style>