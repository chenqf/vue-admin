<template>
    <el-tooltip v-if="showFullScreenBtn" effect="dark" :content="full?'退出全屏':'全屏'" placement="bottom">
        <i @click="handleChange" :class="full ? 'el-icon-crop':'el-icon-full-screen'" style="font-size:23px;" />
    </el-tooltip>
</template>

<script>
export default {
    name:'FullScreen',
    data(){
        return {
            full:false
        }
    },
    methods: {
        handleFullscreen() {
            let main = document.body;
            if (this.full) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        handleChange() {
            this.handleFullscreen();
        }
    },
    computed: {
        showFullScreenBtn () {
            return window.navigator.userAgent.indexOf('MSIE') < 0
        }
    },
    mounted () {
        let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
        isFullscreen = !!isFullscreen
        document.addEventListener('fullscreenchange', () => {
            this.full = !this.full
        })
        document.addEventListener('mozfullscreenchange', () => {
            this.full = !this.full
        })
        document.addEventListener('webkitfullscreenchange', () => {
            this.full = !this.full
        })
        document.addEventListener('msfullscreenchange', () => {
            this.full = !this.full
        })
        this.full = isFullscreen
    }
};
</script>


<style lang="scss" scoped>
i{
    color: $header-icon-color;
    cursor: pointer;
}
</style>