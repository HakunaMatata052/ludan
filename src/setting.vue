<template>
	<div class="container">
		<div class="form-group">
			<label for="name">全屏模式</label>
			<label class="radio-inline">
				<input type="radio" name="quanping" value="open" v-model="quanping"> 是
			</label>
			<label class="radio-inline">
				<input type="radio" name="quanping" value="close" v-model="quanping"> 否
			</label>
		</div>

		<div class="form-group">
			<label for="name">是否关闭编辑</label>
			<label class="radio-inline">
				<input type="radio" name="stat_edit" value="close" v-model="stat_edit"> 是
			</label>
			<label class="radio-inline">
				<input type="radio" name="stat_edit" value="open" v-model="stat_edit"> 否
			</label>
		</div>
		
		<div class="form-group">
			<label for="name">是否开启护眼模式</label>
			<label class="radio-inline">
				<input type="radio" name="huyan" value="open" v-model="isA"> 是
			</label>
			<label class="radio-inline">
				<input type="radio" name="huyan" value="close" v-model="isA"> 否
			</label>
		</div>

		<button type="submit" class="btn btn-default" @click="submit">提交</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				quanping:'close',
				stat_edit:'open',
				isA:'close'
			}
		},
		methods:{
			submit(){
				var that = this;
				localStorage.togglebody = that.quanping;
				localStorage.stat_edit = that.stat_edit;
				localStorage.isA = that.isA;
				that.$router.push({
						path: '/'
				})
			}
		},
		mounted(){
			var that = this;
			that.quanping = localStorage.togglebody
			that.stat_edit = localStorage.stat_edit
			that.isA = localStorage.isA
		}
	}
</script>
<style scoped>

</style>