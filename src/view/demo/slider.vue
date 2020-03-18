<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background:yellow">
          123
        </div>
        <div class="swiper-slide" style="background:blue">
          321
        </div>
        <div class="swiper-slide" style="background:green">
          444
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: true,
      speed: 800,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 500px;
  height: 300px;
  margin: 20px auto;
}
</style>
