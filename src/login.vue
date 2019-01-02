<template>
	<div class="login-body">
		<div id="login">
			<div class="zk_login">
				<ul class="login-form">
					<li><input name="txtUserName" type="text" class="login-input" placeholder="管理员账号" title="管理员账号" v-model="login.txtUserName" />
						<label class="icon user" for="txtUserName"></label>
					</li>

					<li>
						<input name="txtPassword" type="password" class="login-input" placeholder="管理员密码" title="管理员密码" v-model="login.txtPassword"  @keyup.enter="submit"/>
						<label class="icon pwd" for="txtPassword"></label>
					</li>

					<li>
						<input type="submit" name="Submit" value="立即登录" class="login-btn" @click="submit" />
					</li>

				</ul>
			</div>

			<div class="copy-right">
				版权所有 动力无限后台管理系统 Copyright &copy; 2005 - 2018 btoe.cn Inc. All Rights Reserved.
			</div>
			<iframe src="/login.aspx" style="display: none;"></iframe>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				login: {},
				loginapi: process.env.API_ROOT+'apis/LoginHandler/',
			}
		},
		methods: {
			submit: function() {
				var that = this;
				that.$http.post(that.loginapi+'?action=login', that.login,{
					headers:{
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					emulateJSON :true
				}).then(function(res) {
					if(res.data.code == 0) {
						that.$message({
						type: 'success',
						message: res.data.msg
						});
						this.$router.push({
							path: '/'
						})
					} else {
						that.$message({
						type: 'error',
						message: res.data.msg
						});
					}
				})
			}
		},
		mounted: function() {
			var that = this;
			that.$http.get(that.loginapi+'?action=login').then(function(res) {
				if(res.data.code == 0) {
					this.$router.push({
						path: '/'
					})
				}
			})
		}
	}
</script>
<style>

	
	* {
		margin: 0px;
		padding: 0px;
	}
	
	img {
		border: 0;
		margin: 0;
		padding: 0;
	}
	
	ul,
	li,
	ol,
	h1,
	h2,
	h3,
	dl,
	dt,
	dd,
	form,
	p,
	span,
	b,
	u,
	s,
	i {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	
	.clearfix {
		display: inline-table;
	}
	
	* html .clearfix {
		height: 1%;
		/*ie6*/
	}
	
	*+html .clearfix {
		min-height: 1px;
	}
	
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
		font-size: 0;
	}
	
	.clearfix {
		display: inline-block;
	}
	
	* html .clearfix {
		height: 1%;
	}
	
	.clearfix {
		display: block;
	}
	
	input,
	textarea {
		outline: none;
		border: 0px;
	}
	/*去掉输入框得到焦点时边框会出现阴影效果----例如360 火狐*/
	
	a {
		blr: expression(this.onFocus=this.blur());
		/* IE Opera */
		outline: none;
		/* FF Opera */
	}
	
	a:focus {
		-moz-outline-style: none;
		/* FF */
	}
	/*去掉a标签超链接的虚线框*/
	
	a:link {
		text-decoration: none;
		color: #535353;
	}
	
	a:visited {
		text-decoration: none;
		color: #535353;
	}
	
	a:hover {
		text-decoration: none;
		color: #000000;
		-webkit-transition: background .4s cubic-bezier(0.39, 0.575, 0.565, 1);
		-o-transition: background .4s cubic-bezier(0.39, 0.575, 0.565, 1);
		-moz-transition: background .4s cubic-bezier(0.39, 0.575, 0.565, 1);
		transition: background .4s cubic-bezier(0.39, 0.575, 0.565, 1);
		transition: color 0.3s ease-out 0s;
	}
	
	a:active {
		text-decoration: none;
		color: #535353;
	}
	
	.login-body {
		height: 100%;
		margin: 0px;
		color: #535353;
		font-size: 12px;
		font-family: Microsoft YaHei, 宋体, Arial, Helvetica, sans-serif;
		background-image: url(assets/images/banner3.jpg);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: cover;
	}
	
	.zk_login {
		width: 290px;
		height: 344px;
		background: url(assets/images/login_bg2.png) 50% 0 no-repeat;
		position: absolute;
		top: 45%;
		left: 50%;
		margin: -150px auto auto -140px;
		text-align: center;
		z-index: 999;
	}
	
	.zk_login ul {
		position: relative;
		margin-top: 110px;
	}
	
	.zk_login li {
		position: relative;
		padding: 7px 0;
		width: 260px;
		margin: 0 auto;
		height: 70px;
	}
	
	.zk_login li .icon {
		position: absolute;
		display: block;
		top: 24px;
		left: 10px;
		width: 14px;
		height: 14px;
		background: url(assets/images/skin_icons.png) no-repeat;
		cursor: pointer;
	}
	
	.zk_login li .icon.user {
		background-position: 0 -140px;
	}
	
	.zk_login li .icon.pwd {
		background-position: -28px -140px;
	}
	
	.zk_login li .login-input {
		display: block;
		padding: 5px 10px 5px 34px;
		background: #fff;
		border: 0;
		border-radius: 3px;
		font-size: 14px;
		height: 40px;
		height: 30px\9;
		line-height: 30px\9;
		width: 100%;
		width: 216px\9;
		color: #333;
		box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		-webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		-moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		    box-sizing: border-box;
	}
	
	.zk_login li .login-inputk {
		display: block;
		padding: 5px 10px 5px 34px;
		background: #fff;
		border: 0;
		border-radius: 3px;
		font-size: 14px;
		height: 40px;
		height: 30px\9;
		line-height: 30px\9;
		width: 60%;
		width: 116px\9;
		color: #333;
		float: left;
		box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		-webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		-moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
	}
	
	.zk_login li .login-yanzhengma {
		float: left;
		margin-left: 28px;
		margin-top: 10px;
		display: inline;
	}
	
	.zk_login li .login-btn {
		display: block;
		padding: 5px 0;
		font-size: 14px;
		color: #fff;
		width: 100%;
		line-height: 28px;
		height: 42px;
		background: #ffab27;
		border: 0;
		border-radius: 3px;
		letter-spacing: .5em;
		cursor: pointer;
		box-shadow: 2px 2px 2px #0b57a4;
	}
	
	.copy-right {
		position: absolute;
		bottom: 10px;
		text-align: center;
		color: #fff;
		width: 100%;
		z-index: 999;
	}
</style>