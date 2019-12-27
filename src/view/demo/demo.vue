<template>
    <div>
        <keep-alive>
            <component :title="titleValue" :is="currentComponent"></component>
        </keep-alive>
        
        <br>
        <br>
        <button @click="changeTitle">changeTitle</button>
        <br>
        <br>
        <button @click="changeComponent1">changeComponent1</button>
        <br>
        <br>
        <button @click="changeComponent2">changeComponent2</button>
        <br>
        <br>
        <button @click="changeComponent3">changeComponent3</button>
    </div>
</template>

<script>
import Demo1 from '_c/demo/demo1.vue'
import Demo2 from '_c/demo/demo2.vue'
import Demo3 from '_c/demo/demo3.vue'

export default {
    data(){
        return {
            titleValue:1,
            currentComponent:Demo1
        }
    },
    methods:{
        changeTitle(){
            this.titleValue++
        },
        changeComponent1(){
            this.currentComponent = Demo1
        },
        changeComponent2(){
            this.currentComponent = Demo2
        },
        changeComponent3(){
            this.currentComponent = Demo3
        },
    },
    components:{
        Demo1,
        Demo2,
        Demo3,
    }
}
</script>


<style lang="scss" scoped>

</style>