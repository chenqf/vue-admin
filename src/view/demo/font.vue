<template>
  <div>
    <div>
      引入自己的图标
      <span class="iconfont icon-qq"></span>
      <span class="iconfont icon-qq1"></span>
    </div>

    <div class="font-container flex-container">
      尺寸
      <font-awesome-icon icon="adjust" size="xs" />
      <font-awesome-icon icon="adjust" size="sm" />
      <font-awesome-icon icon="adjust" size="lg" />
      <font-awesome-icon icon="adjust" size="2x" />
      <font-awesome-icon icon="adjust" size="3x" />
      <font-awesome-icon icon="adjust" size="4x" />
      <font-awesome-icon icon="adjust" size="5x" />
      <font-awesome-icon icon="adjust" size="6x" />
      <font-awesome-icon icon="adjust" size="7x" />
      <font-awesome-icon icon="adjust" size="8x" />
      <font-awesome-icon icon="adjust" size="9x" />
      <font-awesome-icon icon="adjust" size="10x" />
    </div>
    <div>
      垂直对齐
      <ul class="fa-ul">
        <li class="fa-li">
          <span style="background:grey;">
            <font-awesome-icon icon="skating" size="2x" fixed-width />
          </span>
        </li>
        <li class="fa-li">
          <span style="background:grey;">
            <font-awesome-icon icon="skiing" size="2x" fixed-width />
          </span>
        </li>
        <li class="fa-li">
          <span style="background:grey;">
            <font-awesome-icon icon="skiing-nordic" size="2x" fixed-width />
          </span>
        </li>
        <li class="fa-li">
          <span style="background:grey;">
            <font-awesome-icon icon="snowboarding" size="2x" fixed-width />
          </span>
        </li>
        <li class="fa-li">
          <span style="background:grey;">
            <font-awesome-icon icon="snowplow" size="2x" fixed-width />
          </span>
        </li>
      </ul>
    </div>
    <div class="font-container flex-container">
      旋转
      <font-awesome-icon icon="adjust" size="2x" rotation="90" />
      <font-awesome-icon icon="adjust" size="2x" rotation="180" />
      <font-awesome-icon icon="adjust" size="2x" rotation="270" />
    </div>
    <div class="font-container flex-container">
      翻转
      <font-awesome-icon icon="align-right" />
      <font-awesome-icon icon="align-right" size="2x" flip="horizontal" />
      <font-awesome-icon icon="align-right" size="2x" flip="vertical" />
      <font-awesome-icon icon="align-right" size="2x" flip="both" />
    </div>
    <div class="font-container flex-container">
      动画&边框
      <font-awesome-icon icon="spinner" size="3x" spin />
      <font-awesome-icon icon="spinner" size="3x" pulse />
      <font-awesome-icon icon="spinner" size="3x" border />
    </div>
    <div class="font-container flex-container">
      <div style="width:100px;">文本环绕</div>
      <div class="flex1">
        <font-awesome-icon icon="spinner" size="3x" pull="left" />
        Gatsby believed in the green light, the orgastic future that year by
        year recedes before us. It eluded us then, but that’s no matter —
        tomorrow we will run faster, stretch our arms further... And one fine
        morning — So we beat on, boats against the current, borne back
        ceaselessly into the past.
      </div>
      <div class="flex1">
        <font-awesome-icon icon="spinner" size="3x" pull="right" />
        Gatsby believed in the green light, the orgastic future that year by
        year recedes before us. It eluded us then, but that’s no matter —
        tomorrow we will run faster, stretch our arms further... And one fine
        morning — So we beat on, boats against the current, borne back
        ceaselessly into the past.
      </div>
    </div>
    <div class="font-container flex-container">
      <font-awesome-icon icon="square" size="3x" />
      <font-awesome-icon :icon="['fab', 'twitter']" size="3x" />
      <font-awesome-icon icon="camera" size="3x" />
      <font-awesome-icon icon="terminal" size="3x" />
      <span class="fa-stack fa-2x">
        <font-awesome-icon
          icon="square"
          class="fa-stack-2x"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fab', 'twitter']"
          style="color:white"
          class="fa-stack-1x"
          pinverse
        ></font-awesome-icon>
      </span>
      <span class="fa-stack fa-3x">
        <font-awesome-icon
          icon="square"
          class="fa-stack-2x"
        ></font-awesome-icon>
        <font-awesome-icon
          icon="camera"
          style="color:white"
          class="fa-stack-1x"
          pinverse
        ></font-awesome-icon>
      </span>
      <span class="fa-stack fa-4x">
        <font-awesome-icon
          icon="square"
          class="fa-stack-2x"
        ></font-awesome-icon>
        <font-awesome-icon
          icon="terminal"
          style="color:Tomato"
          class="fa-stack-1x"
          pinverse
        ></font-awesome-icon>
      </span>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
// 引入自己的图标
@import url(../../assets/font/iconfont.css);
.font-container {
  height: 200px;
  width: 100%;
}
.flex1 {
  flex: 1;
}
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
