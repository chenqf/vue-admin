<template>
  <i @click="handleChange" :class="full ? 'el-icon-crop':'el-icon-full-screen'" style="font-size:23px;" />
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
