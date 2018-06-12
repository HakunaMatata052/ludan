<template>
	<div class="container">
		<div class="form-group">
			<label for="name">全屏模式</label>
			<label class="radio-inline">
				<input type="radio" name="optionsRadiosinline" value="1" v-model="quanping"> 是
			</label>
			<label class="radio-inline">
				<input type="radio" name="optionsRadiosinline" value="0" v-model="quanping"> 否
			</label>
		</div>

		<button type="submit" class="btn btn-default" @click="submit">提交</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				quanping:'1'
			}
		},
		methods:{
			submit(){
				var that = this;
				if(that.quanping==1){
					var togglebody = 'close'
				}else{
					var togglebody = 'open'
				}
				that.$cookie.set('togglebody',togglebody,1);
				this.$router.push({
						path: '/'
				})
			}
		},
		mounted(){
			var that = this;
			var dqzt = that.$cookie.get('togglebody');
			if(dqzt=='open'){
				that.quanping = '0'
			}else{
				that.quanping = '1'
			}
		}
	}
</script>
<style scoped>

</style>