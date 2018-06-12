<template>
	<div id=app v-show="login" v-bind:class='togglebody=="open"?"":"shrink"'>
		<div class="menu-top">
			<a class="btn-paograms" @click="toggleApp"></a>
			<div class="nav-top hidden-md hidden-sm">
				<div class="navofhd">
					<ul id="nav" class="hidden-xs">
						<li>
							<select class="form-controla" name="year" v-model="cxDate.year">
								<option value="2018">2018年</option>
								<option value="2017">2017年</option>
								<option value="2016">2016年</option>
								<option value="2015">2015年</option>
								<option value="2014">2014年</option>
							</select>
						</li>
						<li>
							<select class="form-controla" name="month" v-model="cxDate.month">
								<option value="" selected>全年</option>
								<option value="1">一月</option>
								<option value="2">二月</option>
								<option value="3">三月</option>
								<option value="4">四月</option>
								<option value="5">五月</option>
								<option value="6">六月</option>
								<option value="7">七月</option>
								<option value="8">八月</option>
								<option value="9">九月</option>
								<option value="10">十月</option>
								<option value="11">十一月</option>
								<option value="12">十二月</option>
							</select>
						</li>
						<li>
							<button type="button" class="search_button" @click="chaxun"><span>提 交</span></button>
						</li>
					</ul>
				</div>
			</div>
			<div class="nav-right pull-right hidden-xs">
				<div class="menu-cache" @click="showData()">
				</div>
				<div class="nav-user" @click="user">
					<div class=""></div>
					<div class="popover bottom bs" v-bind:class="{ 'fade in show': isShow, '': isShow }">
						<div class="arrow"></div>
						<div class="popover-content">
							<ul>
								<li>
									<a href="javascript:;">{{username}}</a>
								</li>
								<li>
									<a href="javascript:;" @click="setting">个人设置</a>
								</li>
								<li>
									<a href="javascript:;" @click="logout">注销登录</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="menu-left">
			<div class="logo">
				动力无限下单明细表
			</div>
			<div class="menu-left-list">
				<div id="main">
					<ul class="">
						<li class="menu">
							<ul>
								<li class="button">
									<a href="#" title="">各类型单量统计</a>
								</li>
								<li class="dropdown" style="display:none">
									<ul>
										<li><span>WJDH双模</span><b>{{wjdhsm}}</b></li>
										<li><span>WJDH电商</span><b>{{wjdhds}}</b></li>
										<li><span>WJDH</span><b>{{wjdhsm + wjdhds}}</b></li>
										<li><span>营销宝</span><b>{{yxb}}</b></li>
										<li><span>常规</span><b>{{cg}}</b></li>
										<li><span>全部</span><b>{{all}}</b></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="menu">
							<ul>
								<li class="button">
									<a href="#" title="">各公司单量统计</a>
								</li>
								<li class="dropdown" style="display:none">
									<ul>
										<li v-for="y in fgstj"><span>{{y.name}}</span><b>{{y.num}}</b></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="menu">
							<ul>
								<li class="button on">
									<a href="#" title="">技术下单统计</a>
								</li>
								<li class="dropdown">
									<ul>
										<li v-for="z in sjstj"><span>{{z.name}}</span><b>{{z.num}}</b></li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="main-container">
			<transition name="slide-fade">
				<div class="search_box" v-if="toggleShow">
					<div class="ant-row">
						<div class="ant-col-8">
							<div class="search_list">
								<div class="search_wz">分公司：</div>
								<input value="" class="search_input" v-model="search.company" />
							</div>
						</div>
						<div class="ant-col-8">
							<div class="search_list">
								<div class="search_wz">商务代表：</div>
								<input value="" class="search_input" v-model="search.business" />
							</div>
						</div>
						<div class="ant-col-8">
							<div class="search_list">
								<div class="search_wz">商务经理：</div>
								<input value="" class="search_input" v-model="search.manager" />
							</div>
						</div>
						<div class="ant-col-8">
							<div class="search_list" data-autocomplete>
								<div class="search_wz">客户名称：</div>
								<input value="" class="search_input" v-model="search.customer" />
							</div>
						</div>
						<div class="ant-col-8">
							<div class="search_list">
								<div class="search_wz">域名：</div>
								<input value="" class="search_input" v-model="search.domains" />
							</div>
						</div>
						<div class="ant-col-8">
							<div class="search_list">
								<div class="search_wz">设计：</div>
								<input value="" class="search_input" v-model="search.designer" />
							</div>
						</div>
					</div>
					<div class="button_box">
						<button type="submit" class="ant-btn ant-btn-primary FilterForm__search-btn___tSTMA" @click="searchFn()"><span>查 询</span></button>
						<button type="reset" class="ant-btn" @click="reSet"><span>清 空</span></button>
					</div>
				</div>
			</transition>
			<div class="toggle" @click="toggleShow = !toggleShow"></div>

			<div class="cz_box">
				<a href="#" title="" @click='toggle'>切换护眼模式</a>
				<a href="#" title="" @click="opcl_edit">{{stat_edit=="open"?"关闭编辑":"打开编辑"}}（关闭编辑后导出Excel效果最佳）</a>
				<div class="cz_right">
					<a @click="exportTable('json')" href="javascript:;"><img src="/assets/images/a_ico2.png">导出Json</a>
					<a @click="exportTable('txt')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Txt</i></a>
					<a @click="exportTable('csv')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Csv</i></a>
					<a @click="exportTable('xls')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Excel</i></a>
					<a @click="exportTable('doc')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Word</i></a>
				</div>
			</div>
			<div class="clearfix"></div>
			<div class="big_box">
				<table class="table table-bordered table-hover" id="table" v-bind:class='{ "huyan" : isA}'>
					<thead>
						<tr>
							<th width="3%" v-if="0"><input type="checkbox" name="checkbox"></th>
							<th width="3%" v-if="0">序号</th>
							<th width="5%">分公司</th>
							<th width="4%">商务代表</th>
							<th width="4%">商务经理</th>
							<th width="8%">客户名称</th>
							<th width="9%">域名</th>
							<th width="5%">签单日期</th>
							<th width="5%">下单日期</th>
							<th width="6%">类别</th>
							<th width="3%">年限</th>
							<th width="4%">签单金额</th>
							<th width="3%">实到</th>
							<th width="10%">备注</th>
							<th width="4%">设计师</th>
							<th width="4%">程序</th>
							<th width="3%">工作量</th>
							<th width="4%">首页认可</th>
							<th width="4%">程序认可</th>
							<th width="4%">上线日期</th>
							<th width="5%" v-if="stat_edit=='open'">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="stat_edit=='open'">
							<td v-if="0"><input type="checkbox" name="checkbox"></td>
							<td v-if="0"></td>
							<td>
								<input type="text" v-model="add.company" class="input_box" />
							</td>
							<td><input type="text" v-model="add.business" class="input_box" /></td>
							<td><input type="text" v-model="add.manager" class="input_box" /></td>
							<td><input type="text" v-model="add.customer" class="input_box" /></td>
							<td><input type="text" v-model="add.domains" class="input_box" /></td>
							<td><input type="text" v-model="add.qdate" class="input_box" @blur="automatic('qdate')" /></td>
							<td><input type="text" v-model="add.xdate" class="input_box" @blur="automatic('xdate')" /></td>
							<td>
								<select class="form-control" v-model="add.type">
									<option v-for="z in typeList">{{z}}</option>
								</select>
							</td>
							<td><input type="text" v-model="add.year" class="input_box" /></td>
							<td><input type="text" v-model="add.qmoney" class="input_box" /></td>
							<td><input type="text" v-model="add.smoney" class="input_box" /></td>
							<td><input type="text" v-model="add.remarks" class="input_box" /></td>
							<td>
								<select class="form-control" v-model="add.designer" @keyup.ctrl.13="addFn">
									<option v-for="w in designer" v-if="w.key!=undefined">{{w.name}}</option>
								</select>
							</td>
							<td>
								<select class="form-control" v-model="add.programmer">
									<option v-for="v in programmer" v-if="v.key!=undefined">{{v.name}}</option>
								</select>
							</td>
							<td><input type="text" v-model="add.workload" class="input_box" /></td>
							<td><input type="text" v-model="add.home" class="input_box" @blur="automatic('home')" /></td>
							<td><input type="text" v-model="add.program" class="input_box" /></td>
							<td><input type="text" v-model="add.online" class="input_box" /></td>
							<td><button type="submit" class="btn btn-succes btn-success" @click="addFn">添加</button></td>
						</tr>
						<tr v-for="(x,index) in list">
							<td v-if="0"><input type="checkbox" name="checkbox"></td>
							<td v-if="0">{{x.id}}</td>
							<td><input type="text" v-model="x.company" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.business" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.manager" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.customer" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.domains" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.qdate" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.xdate" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td>
								<select class="form-control" v-model="x.type" v-bind:disabled="stat_edit=='close'">
									<option v-for="z in typeList">{{z}}</option>
								</select>
							</td>
							<td><input type="text" v-model="x.year" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.qmoney" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.smoney" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.remarks" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td>
								<input type="text" v-model="x.designer" class="input_box" v-bind:disabled="stat_edit=='close'" />
							</td>
							<td>
								<select class="form-control" v-model="x.programmer" v-bind:disabled="stat_edit=='close'">
									<option v-for="v in programmer" v-bind:disabled="v.key==undefined">{{v.name}}</option>
								</select>
							</td>
							<td><input type="text" v-model="x.workload" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.home" class="input_box" @focus="today('home',index)" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.program" class="input_box" v-bind:disabled="stat_edit=='close'" /></td>
							<td><input type="text" v-model="x.online" class="input_box" @focus="today('online',index)" v-bind:disabled="stat_edit=='close'" /></td>
							<td v-if="stat_edit=='open'"><button type="submit" class="btn btn-default btn-submit" @click="editFn(index)">修改</button><button class="btn btn-default btn-delete" @click="deleteFn(index)">删除</button></td>
						</tr>
					</tbody>
				</table>
				<button type="button" class="ant-btn ant-btn-primary" v-if="0"><span>批量提交</span></button>
			</div>
		</div>
	</div>
</template>
<script>
	import '../static/js/jquery-ui.min.js';
	import '../static/js/layer.js';
	import '../static/js/tableExport.js'; //表格导出
	import '../static/js/jquery.tablesort.min.js' //表格排序
	import '../static/js/jquery.xlstablefilter.js'; //表格筛选
	export default {
		name: 'app',
		data: function() {
			return {
				get: 'api/?',
				username: "",
				list: '',
				temlist: '',
				wjdhsm: 0,
				wjdhds: 0,
				yxb: 0,
				cg: 0,
				all: 0,
				fgstj: [],
				sjstj: [],
				search: {},
				add: {
					'type': 'WJDH双模'
				},
				companyList: ["一", "二", "三", "四", "五", "六", "西安客服", "成都一", "成都二", "成都三", "成都四", "成都客服", "郑州一", "郑州二", "郑州客服", "武汉", "武汉客服", "代理商"],
				typeList: ["WJDH双模", "WJDH电商", "常规", "营销宝"],
				designer: [],
				design1: [{
					"key": "L",
					"name": "闫真"
				}, {
					"key": "A",
					"name": "王巧",
				}, {
					"key": "B",
					"name": "崔美霞"
				}, {
					"key": "C",
					"name": "石婧"
				}, {
					"key": "D",
					"name": "赵玉娇"
				}, {
					"key": "E",
					"name": "史娜"
				}, {
					"key": "F",
					"name": "李强"
				}, {
					"name": "高艳"
				}, {
					"name": "高茵"
				}, {
					"name": "王建"
				}, {
					"name": "胡隆飞"
				}, {
					"name": "梁培培"
				}, {
					"name": "朱孔鹤"
				}, {
					"name": "刘仁东"
				}],
				design2: [{
					"key": "G",
					"name": "罗彬"
				}, {
					"key": "H",
					"name": "周鹏飞"
				}, {
					"key": "I",
					"name": "冯燕"
				}, {
					"key": "J",
					"name": "唐红红"
				}, {
					"key": "K",
					"name": "陈鑫"
				}, {
					"key": "M",
					"name": "宇文锦"
				}, {
					"name": "朱文娟"
				}, {
					"name": "陈菲"
				}, {
					"name": "赵娇"
				}, {
					"name": "陈慧峰"
				}, {
					"name": "冯婉君"
				}, {
					"name": "许勃"
				}, {
					"name": "刘丽媛"
				}, {
					"name": "张岩"
				}, {
					"name": "肖珍静远"
				}, {
					"name": "王明娟"
				}, {
					"name": "谢秋姣"
				}],
				design3: [{
					"key": "N",
					"name": "吴彦蓉"
				}, {
					"key": "O",
					"name": "马利丽"
				}, {
					"key": "P",
					"name": "高翔"
				}, {
					"key": "Q",
					"name": "钟杰敏"
				}, {
					"key": "R",
					"name": "王卓"
				}, {
					"key": "S",
					"name": "高欢"
				}],
				fgsdesign: [{
						"key": "T",
						"name": "任林"
					}, {
						"key": "U",
						"name": "谢小良"
					}, {
						"key": "V",
						"name": "杨玲"
					}, {
						"key": "W",
						"name": "吴帅"
					}, {
						"key": "X",
						"name": "杜友为"
					}, {
						"key": "Y",
						"name": "向松"
					}, {
						"name": "苏俊凌"
					},
					{
						"name": "王艳梅"
					},
					{
						"name": "童丽萍"
					},
					{
						"name": "谢倩"
					},
					{
						"name": "高平萍"
					},
					{
						"name": "李晓霞"
					},
					{
						"name": "罗成"
					},
					{
						"name": "陈冉"
					},
					{
						"name": "陈静"
					}
				],
				programmer: [{
						"key": "A",
						"name": "张田"
					},
					{
						"key": "B",
						"name": "孙琪"
					},
					{
						"key": "C",
						"name": "董佳旗"
					},
					{
						"key": "D",
						"name": "兰帆"
					}, {
						"name": "刘耀"
					},
					{
						"name": "杨如"
					},
					{
						"name": "弥怀璋"
					},
					{
						"name": "王明琳"
					},
					{
						"name": "杨旭鹏"
					},
					{
						"name": "张龙"
					},
					{
						"name": "朱时秀"
					},
					{
						"name": "李晓"
					},
					{
						"name": "郭宏柱"
					}

				],
				isShow: 0,
				cxDate: {},
				login: 0,
				isA: 0,
				togglebody: 'open',
				toggleShow: 1,
				stat_edit: 'open'
			}
		},
		watch: {
			list: function(val) {
				this.$nextTick(function() {
					//alert(2)
					//console.log('a的数据发生变化' + this.list);
				})
			}
		},
		methods: {
			showData: function(year, month) {
				var that = this;
				if(year == undefined) {
					var getUrl = that.get;
				} else {
					var getUrl = that.get + 'action=chaxun&year=' + year + '&month=' + month;
				};
				that.$http.get(getUrl).then(function(res) {
					if(res.data.code == 0) {
						that.list = res.data.data;
						that.temlist = res.data.data;
						that.tongji()
					} else {
						layer.msg(res.data.msg)
						var dateRiqi = res.data.date.split('-');
						that.cxDate.year = dateRiqi[0];
						that.cxDate.month = dateRiqi[1];
					}
				}, function(res) {

				});
			},
			searchFn: function() {
				var that = this;
				var searchJson = that.search;
				if(JSON.stringify(searchJson) != "{}") {
					console.log(searchJson)
					that.$http.post(that.get + 'action=search', searchJson).then(function(res) {
						if(res.data.code == 0) {
							that.list = res.data.data;
							that.tongji()
						} else {
							layer.msg(res.data.msg)
						}
					}, function(res) {

					});
					that.search = {};
				} else {
					layer.msg('请填写查询关键字！')
				}

			},
			reSet: function() {
				var that = this;
				that.search = {};
			},
			chaxun: function() {
				var that = this;
				if(that.cxDate.month == undefined) {
					that.cxDate.month = '';
				}
				that.showData(that.cxDate.year, that.cxDate.month)
			},
			addFn: function() {
				var that = this;
				var addJson = that.add;
				if(addJson.designer != undefined) {
					layer.confirm('确定提交？？', {
							btn: ['确定', '取消'] //按钮
						},
						function() {
							that.$http.post(that.get + 'action=add', addJson).then(function(res) {
								that.add = {
									'type': 'WJDH双模'
								};
								that.list = res.data.data;
								that.tongji()
								layer.msg('新增成功！！');
							}, function(res) {});

						},
						function() {

						});
				} else {
					layer.msg('设计师不能不写！')
				}
			},
			editFn: function(index) {
				var that = this;
				var editJosn = that.list[index]
				layer.confirm('确定提交？？', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						that.$http.post(that.get + 'action=edit', editJosn).then(function(res) {
							that.list = res.data.data;
							that.tongji()
							layer.msg('修改成功！！');
						}, function(res) {

						});

					},
					function() {}
				);
			},
			deleteFn: function(index) {
				var that = this;
				var deleteJosn = {};
				deleteJosn.id = that.list[index].id;
				layer.confirm('确定删除？？', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						that.$http.post(that.get + 'action=delete', deleteJosn).then(function(res) {
							if(res.data.code == 0) {
								layer.msg('删除成功！！');
								that.list = res.data.data;
								that.tongji();
							} else {
								layer.msg(res.data.msg)
							}

						}, function(res) {

						});

					},
					function() {}
				);
			},
			today: function(typename, index) {
				var that = this;
				if(index != undefined) {
					var stri = that.list[index][typename];
					if(stri == undefined || stri.length == '') {
						var Today = new Date()
						var year = Today.getYear();
						year = year < 2000 ? year + 1900 : year
						year = year.toString().substr(2, 2);
						var month = Today.getMonth() + 1;
						var day = Today.getDate();
						that.list[index][typename] = year + '.' + month + '.' + day; //修改data中的数据（不会更新视图）
						var strJson = {}; //临时存放数据的Json
						strJson = that.list[index]; //把真实数据存入临时的Json
						that.$set(that.list, index, strJson) //更新视图
					}
				} else {
					var stri = that.add[typename];
					if(stri == undefined || stri.length == '') {
						var Today = new Date()
						var year = Today.getYear();
						year = year < 2000 ? year + 1900 : year
						year = year.toString().substr(2, 2);
						var month = Today.getMonth() + 1;
						var day = Today.getDate();
						that.$set(that.add, typename, year + '.' + month + '.' + day)
					}
				}

			},
			automatic: function(typename) {
				var that = this;
				var Today = new Date()
				var year = Today.getYear();
				year = year < 2000 ? year + 1900 : year
				year = year.toString().substr(2, 2);
				var month = Today.getMonth() + 1;
				if(that.add[typename] != undefined) {
					var automaticDate = that.add[typename];
					var DateArry = automaticDate.split('.');
					if(DateArry.length == 1) {
						that.$set(that.add, typename, year + '.' + month + '.' + automaticDate)
					} else if(DateArry.length == 2) {
						that.$set(that.add, typename, year + '.' + automaticDate)
					}
				}
			},
			AddList: function() {
				var that = this;
				var newList = [{
					"id": "",
					"company": "",
					"business": "",
					"manager": "",
					"customer": "",
					"domains": "",
					"qdate": "",
					"xdate": "",
					"type": "0",
					"year": "",
					"qmoney": "",
					"smoney": "",
					"remarks": "",
					"designer": "",
					"programmer": "",
					"workload": "",
					"home": "",
					"program": "",
					"online": "",
					"adddate": "",
					"add": 1
				}];
				this.list.push(newList[0]);
				that.tongji() //更新统计数据
			},
			tongji: function() {
				var that = this;
				var fgsname = [];
				var sjsname = [];
				that.wjdhsm = 0;
				that.wjdhds = 0;
				that.yxb = 0;
				that.cg = 0;
				that.fgstj = [];
				that.sjstj = [];
				for(var i = 0; i < that.list.length; i++) {
					if(that.list[i].type == 'WJDH双模') {
						that.wjdhsm++
					} else if(that.list[i].type == 'WJDH电商') {
						that.wjdhds++
					} else if(that.list[i].type == '常规') {
						that.cg++
					} else if(that.list[i].type == '营销宝') {
						that.yxb++
					}
					fgsname.push(that.list[i].company); //将所有出现的分公司名称push进数组
					sjsname.push(that.list[i].designer); //设计师同上
				};
				var fgstjJson = that.arrCheck(fgsname); //统计数组中每个分公司出现的次数并写成["name":"成都一","name":5]的形式
				that.fgstj = fgstjJson;

				var sjsJson = that.arrCheck(sjsname); //设计师同上
				that.sjstj = sjsJson;
				that.all = that.list.length;
			},
			arrCheck: function(arr) {
				var newArr = [];
				for(var i = 0; i < arr.length; i++) {
					var newJson = {};
					var temp = arr[i];
					var count = 0;
					for(var j = 0; j < arr.length; j++) {
						if(arr[j] == temp) {
							count++;
							arr[j] = -1;
						}
					}
					if(temp != -1) {
						newJson.name = temp;
						newJson.num = count;
						newArr.push(newJson)
					}
				}
				return newArr;
			},
			close: function() {
				var that = this;
				that.isShow = 0;
			},
			opcl_edit: function() {
				var that = this;
				if(that.stat_edit == "open") {
					that.stat_edit = "close"
				} else {
					that.stat_edit = "open"
				}
				that.$cookie.set('stat_edit', that.stat_edit, 1);
			},
			exportTable: function(type) {
				var that = this;
				tableExport('table', that.cxDate.year + '-' + that.cxDate.month + '下单表', type);
			},
			user: function() {
				var that = this;
				if(that.isShow == 0) {
					that.isShow = 1
				} else {
					that.isShow = 0
				}
			},
			logout: function() {
				var that = this;
				that.$http.get(that.get + 'action=logout').then(function(res) {
					this.$router.push({
						path: '/login'
					})
				}, function(res) {});
			},
			toggle() {
				var that = this;
				if(that.isA == 0) {
					that.isA = 1
				} else {
					that.isA = 0
				}
			},
			toggleApp() {
				var that = this;
				if(that.togglebody == "open") {
					that.togglebody = "close"
				} else {
					that.togglebody = "open"
				}
				that.$cookie.set('togglebody', that.togglebody, 1);

			},
			setting(){
				this.$router.push({
						path: '/setting'
					})
			}
		},
		mounted: function() {
			var that = this;
			if(that.$cookie.get('stat_edit') != undefined) {
				that.stat_edit = that.$cookie.get('stat_edit');
			}
			if(that.$cookie.get('togglebody') != undefined) {
				that.togglebody = that.$cookie.get('togglebody');
			}
			that.$http.get(that.get).then(function(res) {
				if(res.data.code == 0) {
					that.login = 1;
					that.list = res.data.data;
					if(res.data.data.length == 0) {
						layer.msg(res.data.msg)
					}
					that.temlist = res.data.data;
					that.username = res.data.username;
					if(res.data.date != undefined) {
						var dateRiqi = res.data.date.split('-');
						that.cxDate.year = dateRiqi[0];
						that.cxDate.month = dateRiqi[1];
					};
					if(that.username == '闫真') {
						that.designer = that.design1
					} else if(that.username == '罗彬') {
						that.designer = that.design2
					} else if(that.username == '吴彦蓉') {
						that.designer = that.design3
					} else {
						that.designer = that.designer.concat(that.design1, that.design2, that.design3, that.fgsdesign)
					};
					that.tongji();
				} else if(res.data.code == 2) {
					this.$router.push({
						path: '/login'
					})
				} else {
					layer.msg(res.data.msg)
				}
			}, function(res) {

			});
			$('.table').tablesort().data('tablesort');
			$(".table").xlsTableFilter();
			$('#app').on('click', '.menu-left-list li.button a', function(e) {
				var dropDown = $(this).parent().next();
				$('.dropdown').not(dropDown).slideUp('slow');
				dropDown.slideToggle('slow');
				$('#main').find('.on').removeClass('on')
				dropDown.prev().addClass('on')
				e.preventDefault();
			});
			$('#app').on('mouseover', 'td', function() {
				this.title = $(this).find('input').val() || this.innerText;
			});

		},
		created() {}
	}
</script>
<style scoped>
	@import url("assets/css/date.css");
	@import url("assets/css/xlstablefilter.css");
	@import url("assets/css/common.css");
	@import url("assets/css/in.css");
	.show {
		display: block!important;
	}
	
	.huyan {
		background: #cce8cf;
	}
	
	.huyan>thead>tr>th,
	.huyan>tbody>tr>td {
		border: 1px dotted #c5c5c5;
	}
	
	.huyan>tbody>tr:hover {
		background-color: #dcf0ce;
	}
	
	.toggle {
		background: #eee;
		height: 5px;
		cursor: pointer;
	}
	
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
	
	{
		height: 0;
		opacity: 0;
	}
</style>