<template>
	<div>
		<div class="count-down-time-label flex">
			<div class="count-down-time-value">{{ hour }}</div>:
			<div class="count-down-time-value">{{ minute }}</div>:
			<div class="count-down-time-value">{{ second }}</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "CountDown",
	props: ["leftTime"],
	data() {
		return {
			totalTime:0,
			hour: "0",
			minute: "0",
			second: "0",
		}
	},
	created() {
		this.totalTime = this.leftTime;
		this.formatTime();
		this.countDown();
	},
	methods: {
		countDown() {
			let interval = setInterval(() => {
				// let h = Math.floor(this.totalTime / 1000 / 60 / 60);
				// let m = Math.floor(this.totalTime / 1000 / 60 % 60);
				// let s = Math.floor(this.totalTime / 1000 % 60);
				// this.hour = this.numberToString(h);
				// this.minute = this.numberToString(m);
				// this.second = this.numberToString(s);
				this.formatTime();
				this.totalTime = this.totalTime - 1000;
				// console.log("count-down","hour: "+this.hour+" minute: "+this.minute+" second: "+this.second)
				if (this.totalTime < 0) {
					clearInterval(interval);
				}
			}, 1000);
		},
		formatTime(){
			let h = Math.floor(this.totalTime / 1000 / 60 / 60);
			let m = Math.floor(this.totalTime / 1000 / 60 % 60);
			let s = Math.floor(this.totalTime / 1000 % 60);
			this.hour = this.numberToString(h);
			this.minute = this.numberToString(m);
			this.second = this.numberToString(s);
		},
		numberToString(num) {
			if (!num) num = 0
			return num < 10 ? "0" + num : "" + num;
		}
	},
}
</script>
<style lang="scss" scoped>
.count-down-time-label {
  display: flex;
  flex-direction: row;
	font-weight: 500;
	color: #007CFF;
  line-height: 0.18rem;
  font-size: 0.13rem;
  align-items: center;

	.count-down-time-value {
		min-width: 0.2rem;
    padding: 0 0.02rem;
		text-align: center;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
    font-size: 0.13rem;
    color: #007CFF;
    line-height: 0.18rem;
	}
}
</style>
