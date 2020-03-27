<template>
  <div>123123</div>
</template>

<script>
import io from "socket.io-client";
export default {
  created() {
    this.socket1 = io("http://10.10.5.240:3000/quick_buy"); // 这里改一下地址
    this.socket1.on("connect", function() {
      console.log("connect 1");
    });
    this.socket1.on("product_change", function(data) {
      console.log("product_change", data); // data: [{productId,productSkuId,quanity}]
    });
  }
};
</script>
