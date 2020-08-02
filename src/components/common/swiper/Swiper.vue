<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"> </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <!-- active index不是currentIndex是因为前面多插一个节点，要-1才匹配上slide数组的index -->
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data: function() {
    return {
      slideCount: 0, // 元素个数
      picWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    };
  },
  mounted: function() {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 0);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer: function() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.picWidth);
      }, this.interval);
    },
    stopTimer: function() {
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent: function(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;
      // 1.开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
      this.setTransform(currentPosition);
      // 2.判断滚动到的位置
      this.checkPosition();
      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 校验正确的位置
     */
    checkPosition: function() {
      window.setTimeout(() => {
        //   无缝连接，避免用户看到边界切换重定位
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex == this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.picWidth);
        } else if (this.currentIndex == 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.picWidth);
        }
      }, this.animDuration);
    },

    /**
     * 设置滚动的位置
     */
    setTransform: function(position) {
      this.swiperStyle.transform = `translate(${position}px, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate(${position}px, 0)`;
      this.swiperStyle['-ms-transform'] = `translate(${position}px, 0)`;
    },

    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom: function() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper');
      let slidesEls = swiperEl.getElementsByClassName('slide');

      // 2.保存个数
      this.slideCount = slidesEls.length;

      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.picWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      // 4.让swiper元素, 显示第一个(目前是显示第一个节点（新添加的最后一张图）)
      this.setTransform(-this.picWidth);
    },

    /**
     * 拖动事件的处理
     */
    touchStart: function(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;
      // 2.停止定时器
      this.stopTimer();
      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.picWidth;
      let moveDistance = this.distance + currentPosition;
      // 2.设置当前的位置,拖动效果
      this.setTransform(moveDistance);
    },

    touchEnd: function() {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);
      // 2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (this.distance > 0 && currentMove > this.picWidth * this.moveRatio) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (this.distance < 0 && currentMove > this.picWidth * this.moveRatio) {
        // 向左移动超过0.5
        this.currentIndex++;
      }
      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.picWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },
  },
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
