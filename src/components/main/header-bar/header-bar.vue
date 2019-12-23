<template>
    <header class="header-bar">
        <div class="header-left">
            <i
                class="el-icon-s-fold menu-control"
                :class="{'is-collapsed':collapsed}"
                @click="changeCollapsed"
            />
        </div>
        <div class="header-bread">
            
        </div>
        <div class="header-right">
            <full-screen style="margin-right:10px"/>
            <header-user :avatar="avatar" @select-operate="selectOperate"/>
        </div>
    </header>
</template>

<script>
import FullScreen from './full-screen.vue'
import HeaderUser from './header-user.vue'
export default {
    props:{
        collapsed:{
            type:Boolean,
            default:false
        },
        avatar:{
            type:String,
            default:''
        }
    },
    components: {
        FullScreen,
        HeaderUser
    },
    methods:{
        selectOperate(item){
            this.$emit('select-operate',item)
        },
        changeCollapsed(){
            this.$emit('update-collapsed')
        }
    }
}
</script>

<style lang="scss" scoped>
  .header-bar{
    padding:0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $header-border-color;
    height: $header-height !important;

    & > .header-bread{
      flex:1;
    }

    & > .header-left{
        .menu-control {
            font-size: 28px;
            transition: transform 0.2s;
            color: $header-icon-color;
            cursor: pointer;
            &:hover {
                color: $header-icon-color-hover;
            }
        }
        .is-collapsed {
            transform: rotate(180deg);
        }
    }

    & > .header-right{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    

    
  }
</style>