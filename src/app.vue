<template>
	<div id="app" v-show="login">
		<el-container  style="height: 100%;">
			<el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-show="togglebody">
				<el-menu :default-openeds="['1']">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>各类型单量统计</template>
						<el-menu-item-group>
							<el-menu-item index="1-1">WJDH双模
								<el-badge class="mark" :value="wjdhsm" /></el-menu-item>
							<el-menu-item index="1-2">WJDH电商
								<el-badge class="mark" :value="wjdhds" /></el-menu-item>
							<el-menu-item index="1-3">WJDH
								<el-badge class="mark" :value="wjdhsm+wjdhds" /></el-menu-item>
							<el-menu-item index="1-4">营销宝
								<el-badge class="mark" :value="yxb" /></el-menu-item>
							<el-menu-item index="1-5">常规
								<el-badge class="mark" :value="cg" /></el-menu-item>
							<el-menu-item index="1-5">全部
								<el-badge class="mark" :value="all" /></el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="2">
						<template slot="title"><i class="el-icon-message"></i>各公司单量统计</template>
						<el-menu-item-group>
							<el-menu-item index="2-1" v-for="y in fgstj">{{y.value}}
								<el-badge class="mark" :value="y.num" /></el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="3">
						<template slot="title"><i class="el-icon-message"></i>技术下单统计</template>
						<el-menu-item-group>
							<el-menu-item index="3-1" v-for="z in sjstj">{{z.value}}
								<el-badge class="mark" :value="z.num" /></el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container style="overflow: auto;">
				<el-header>
					<div style="float: right;font-size: 20px;">
						<i class="el-icon-refresh" @click="showData()"></i>
						<el-dropdown>
							<i class="el-icon-setting" style="margin-right: 15px;font-size: 20px;"></i>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>{{username}}</el-dropdown-item>
								<el-dropdown-item><span @click="setting">个人设置</span></el-dropdown-item>
								<el-dropdown-item><span @click="logout">注销登录</span></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<el-button @click="togglebody = !togglebody"><i class="el-icon-menu"></i></el-button>
					<el-select placeholder="请选择" v-model="cxDate.year">
						<el-option value="2018">2018年</el-option>
						<el-option value="2017">2017年</el-option>
						<el-option value="2016">2016年</el-option>
						<el-option value="2015">2015年</el-option>
						<el-option value="2014">2014年</el-option>
					</el-select>

					<el-select placeholder="请选择" v-model="cxDate.month">
						<el-option value="" selected>全年</el-option>
						<el-option value="1">一月</el-option>
						<el-option value="2">二月</el-option>
						<el-option value="3">三月</el-option>
						<el-option value="4">四月</el-option>
						<el-option value="5">五月</el-option>
						<el-option value="6">六月</el-option>
						<el-option value="7">七月</el-option>
						<el-option value="8">八月</el-option>
						<el-option value="9">九月</el-option>
						<el-option value="10">十月</el-option>
						<el-option value="11">十一月</el-option>
						<el-option value="12">十二月</el-option>
					</el-select>
					<el-button icon="el-icon-search" type="primary" @click="chaxun"></el-button>

				</el-header>
				<el-main>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.company" clearable>
								<template slot="prepend">分公司：</template>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.business" clearable>
								<template slot="prepend">商务代表：</template>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.manager" clearable>
								<template slot="prepend">商务经理：</template>
							</el-input>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.customer" clearable>
								<template slot="prepend">客户名称：</template>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.domains" clearable>
								<template slot="prepend">域名：</template>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.designer" clearable>
								<template slot="prepend">设计：</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="2" :offset="10">
							<el-button type="primary" size="small" @click="searchFn">查询</el-button>
						</el-col>
						<el-col :span="2">
							<el-button type="info" size="small" @click="reSet">清空</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="2">
							<el-button type="primary" icon="el-icon-view" size="mini" @click='toggle' circle></el-button>
							<el-button type="primary" icon="el-icon-edit" size="mini" @click="opcl_edit" circle></el-button>
							<el-button type="primary" icon="el-icon-tickets" size="mini" @click="dls_edit" circle></el-button>
						</el-col>
						<el-col :span="2" :offset="22" v-if="0">
							<a @click="exportTable('json')" href="javascript:;"><img src="/assets/images/a_ico2.png">导出Json</a>
							<a @click="exportTable('txt')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Txt</i></a>
							<a @click="exportTable('csv')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Csv</i></a>
							<a @click="exportTable('xls')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Excel</i></a>
							<a @click="exportTable('doc')" href="javascript:;"><img src="assets/images/a_ico2.png"><i>导出Word</i></a>
						</el-col>
					</el-row>
					<el-table :data="add" :show-header="false" border style="width: 100%;" :row-class-name="tableRowClassName" v-if="stat_edit=='open'">
						<el-table-column sortable prop="company" label="分公司" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].company" :fetch-suggestions="queryCompany"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="business" label="商务代表" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].business" :fetch-suggestions="querySwdb"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="manager" label="商务经理" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].manager" :fetch-suggestions="querySwjl"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="customer" label="客户名称" min-width="100">
							<template slot-scope="scope">
								<el-input v-model="add[0].customer"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="domains" label="域名" min-width="90">
							<template slot-scope="scope">
								<el-input v-model="add[0].domains"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qdate" label="签单日期" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].qdate" @blur="automatic('qdate')"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="xdate" label="下单日期" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].xdate" @blur="automatic('xdate')"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="type" label="类别" min-width="80">
							<template slot-scope="scope">
								<el-select v-model="add[0].type" placeholder="请选择">
									<el-option v-for="item in typeList" :key="item" :label="item.label" :value="item">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="year" label="年限" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].year"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qmoney" label="签单金额" min-width="80">
							<template slot-scope="scope">
								<el-input v-model="add[0].qmoney"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="smoney" label="实到" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].smoney"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="remarks" label="备注" min-width="130">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<p>{{ add[0].remarks }}</p>
									<div slot="reference" class="name-wrapper">
										<el-input v-model="add[0].remarks"></el-input>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column sortable prop="designer" label="设计师" min-width="75">
							<template slot-scope="scope">
								<el-select v-model="add[0].designer" placeholder="请选择">
									<el-option v-for="item in designer" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="programmer" label="程序" min-width="75">
							<template slot-scope="scope">
								<el-select v-model="add[0].programmer" placeholder="请选择">
									<el-option v-for="item in programmer" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="workload" label="工作量" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].workload"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="home" label="首页认可" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].home" @blur="automatic('home')"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="program" label="程序认可" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].program"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="online" label="上线日期" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].online"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable label="操作" width="140" fixed="right">
							<template slot-scope="scope">
								<el-button size="mini" type="success" @click="addFn" style="width: 100%;">添加</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-table :data="list" stripe border style="width: 100%;" v-bind:class='isA=="open"?"huyan":""'>
						<el-table-column sortable prop="company" label="分公司" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.company" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="business" label="商务代表" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.business" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="manager" label="商务经理" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.manager" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="customer" label="客户名称" min-width="100">
							<template slot-scope="scope">
								<el-input v-model="scope.row.customer" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="domains" label="域名" min-width="90">
							<template slot-scope="scope">
								<el-input v-model="scope.row.domains" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qdate" label="签单日期" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.qdate" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="xdate" label="下单日期" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.xdate" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="type" label="类别" min-width="80">
							<template slot-scope="scope">
								<el-select v-model="scope.row.type" placeholder="请选择" v-bind:disabled="stat_edit=='close'">
									<el-option v-for="item in typeList" :key="item" :label="item.label" :value="item">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="year" label="年限" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.year" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qmoney" label="签单金额" min-width="80">
							<template slot-scope="scope">
								<el-input v-model="scope.row.qmoney" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="smoney" label="实到" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.smoney" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="remarks" label="备注" min-width="130">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<p>{{ scope.row.remarks }}</p>
									<div slot="reference" class="name-wrapper">
										<el-input v-model="scope.row.remarks" v-bind:disabled="stat_edit=='close'"></el-input>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column sortable prop="designer" label="设计师" min-width="75" :filters="designer" :filter-method="filterDesigner">
							<template slot-scope="scope">
								<el-select v-model="scope.row.designer" placeholder="请选择" v-bind:disabled="stat_edit=='close'">
									<el-option v-for="item in designer" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="programmer" label="程序" min-width="75" :filters="programmer" :filter-method="filterDesigner">
							<template slot-scope="scope">
								<el-select v-model="scope.row.programmer" placeholder="请选择" v-bind:disabled="stat_edit=='close'">
									<el-option v-for="item in programmer" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="workload" label="工作量" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="scope.row.workload" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="home" label="首页认可" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="scope.row.home" @focus="today('home',scope.$index)" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="program" label="程序认可" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="scope.row.program" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="online" label="上线日期" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="scope.row.online" @focus="today('online',scope.$index)" v-bind:disabled="stat_edit=='close'"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable label="操作" width="140" fixed="right" v-if="stat_edit=='open'">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" @click="editFn(scope.$index)">编辑</el-button>
								<el-button size="mini" type="danger" @click="deleteFn(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>

				</el-main>
			</el-container>
		</el-container>

	</div>
</template>
<script>
	export default {
		name: 'app',
		data: function() {
			return {
				get: 'api/?',
				username: "",
				list: [],
				temlist: '',
				wjdhsm: 0,
				wjdhds: 0,
				yxb: 0,
				cg: 0,
				all: 0,
				fgstj: [],
				sjstj: [],
				swjl: [],
				swdb: [],
				search: {},
				dailishang: '',
				add: [{
					type: 'WJDH双模'
				}],
				companyList: [],
				typeList: ["WJDH双模", "WJDH电商", "常规", "营销宝"],
				designer: [],
				design1: [{
					"text": "闫真",
					"value": "闫真"
				}, {
					"text": "王巧",
					"value": "王巧",
				}, {
					"text": "崔美霞",
					"value": "崔美霞"
				}, {
					"text": "石婧",
					"value": "石婧"
				}, {
					"text": "赵玉娇",
					"value": "赵玉娇"
				}, {
					"text": "史娜",
					"value": "史娜"
				}, {
					"text": "李强",
					"value": "李强"
				}, {
					"text": "高艳",
					"value": "高艳"
				}, {
					"text": "高茵",
					"value": "高茵"
				}, {
					"text": "王建",
					"value": "王建"
				}, {
					"text": "胡隆飞",
					"value": "胡隆飞"
				}, {
					"text": "梁培培",
					"value": "梁培培"
				}, {
					"text": "朱孔鹤",
					"value": "朱孔鹤"
				}, {
					"text": "刘仁东",
					"value": "刘仁东"
				}],
				design2: [{
					"text": "罗彬",
					"value": "罗彬"
				}, {
					"text": "周鹏飞",
					"value": "周鹏飞"
				}, {
					"text": "冯燕",
					"value": "冯燕"
				}, {
					"text": "唐红红",
					"value": "唐红红"
				}, {
					"text": "陈鑫",
					"value": "陈鑫"
				}, {
					"text": "宇文锦",
					"value": "宇文锦"
				}, {
					"text": "朱文娟",
					"value": "朱文娟"
				}, {
					"text": "陈菲",
					"value": "陈菲"
				}, {
					"text": "赵娇",
					"value": "赵娇"
				}, {
					"text": "陈慧峰",
					"value": "陈慧峰"
				}, {
					"text": "冯婉君",
					"value": "冯婉君"
				}, {
					"text": "许勃",
					"value": "许勃"
				}, {
					"text": "刘丽媛",
					"value": "刘丽媛"
				}, {
					"text": "张岩",
					"value": "张岩"
				}, {
					"text": "肖珍静远",
					"value": "肖珍静远"
				}, {
					"text": "王明娟",
					"value": "王明娟"
				}, {
					"text": "谢秋姣",
					"value": "谢秋姣"
				}],
				design3: [{
					"text": "吴彦蓉",
					"value": "吴彦蓉"
				}, {
					"text": "马利丽",
					"value": "马利丽"
				}, {
					"text": "高翔",
					"value": "高翔"
				}, {
					"text": "钟杰敏",
					"value": "钟杰敏"
				}, {
					"text": "王卓",
					"value": "王卓"
				}, {
					"text": "高欢",
					"value": "高欢"
				}],
				fgsdesign: [{
						"text": "T",
						"value": "任林"
					}, {
						"text": "U",
						"value": "谢小良"
					}, {
						"text": "V",
						"value": "杨玲"
					}, {
						"text": "W",
						"value": "吴帅"
					}, {
						"text": "X",
						"value": "杜友为"
					}, {
						"text": "Y",
						"value": "向松"
					}, {
						"value": "苏俊凌"
					},
					{
						"value": "王艳梅"
					},
					{
						"value": "童丽萍"
					},
					{
						"value": "谢倩"
					},
					{
						"value": "高平萍"
					},
					{
						"value": "李晓霞"
					},
					{
						"value": "罗成"
					},
					{
						"value": "陈冉"
					},
					{
						"value": "陈静"
					}
				],
				programmer: [{
						"text": "张田",
						"value": "张田"
					},
					{
						"text": "孙琪",
						"value": "孙琪"
					},
					{
						"text": "董佳旗",
						"value": "董佳旗"
					},
					{
						"text": "兰帆",
						"value": "兰帆"
					}, {
						"text": "刘耀",
						"value": "刘耀"
					},
					{
						"text": "杨如",
						"value": "杨如"
					},
					{
						"text": "弥怀璋",
						"value": "弥怀璋"
					},
					{
						"text": "王明琳",
						"value": "王明琳"
					},
					{
						"text": "杨旭鹏",
						"value": "杨旭鹏"
					},
					{
						"text": "张龙",
						"value": "张龙"
					},
					{
						"text": "朱时秀",
						"value": "朱时秀"
					},
					{
						"text": "李晓",
						"value": "李晓"
					},
					{
						"text": "郭宏柱",
						"value": "郭宏柱"
					}

				],
				isShow: 0,
				cxDate: {
					year: '',
					month: ''
				},
				login: 0,
				isA: 'close',
				togglebody: 1,
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
			dls_edit() {

				var that = this;
				that.$prompt('快捷输入', '提示', {
					inputType:'textarea'
				}).then(({
					value
				}) => {
					var str = value.split(/[\r\n]/g);
					var addjson = {
						'company': '代理商'
					};
					for(var i = 0; i < str.length; i++) {
						var item = str[i].split(':');
						if(item[0] == "代理商") {
							addjson.remarks = item[1];
						} else if(item[0] == "公司名称") {
							addjson.customer = item[1].replace('/有限公司|制品厂/gi', '');
						} else if(item[0] == "域名") {
							var yuming = item[1].replace(/\[图片\]/gi, '')
							yuming = yuming.replace('www.', '')
							addjson.domains = yuming;
						} else if(item[0] == "类型") {
							addjson.type = item[1];
						} else if(item[0] == "下单日期") {
							addjson.xdate = item[1].slice(2, item[1].length);
						} else if(item[0] == "客服") {
							addjson.business = item[1];
						} else if(item[0] == "备注") {
							var dqremarks = addjson.remarks;
							addjson.remarks = dqremarks + '/' + (item[1].replace(/\[图片\]/gi, ''));
						}
					};
					that.$set(that.add, 0,addjson)
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '取消输入'
					});
				});

			},
			filterDesigner(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			tableRowClassName() {
				return 'success-row';
			},
			queryCompany(queryString, cb) {
				var companylist = this.fgstj;
				var results = queryString ? companylist.filter(this.createFilter(queryString)) : companylist;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			querySwdb(queryString, cb) {
				var swdb = this.swdb;
				var results = queryString ? swdb.filter(this.createFilter(queryString)) : swdb;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			querySwjl(queryString, cb) {
				var swjl = this.swjl;
				var results = queryString ? swjl.filter(this.createFilter(queryString)) : swjl;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
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
						that.$message({
							type: 'error',
							message: res.data.msg
						});
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
							that.$message({
								type: 'error',
								message: res.data.msg
							});
						}
					}, function(res) {

					});
					that.search = {};

				} else {
					that.$message({
						type: 'error',
						message: '请填写查询关键字!'
					});
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
				var addJson = that.add[0];
				if(addJson.designer != undefined) {
					that.$confirm('确认添加？？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.$http.post(that.get + 'action=add', addJson).then(function(res) {
							that.list = res.data.data;
							that.tongji()
							that.$message({
								type: 'success',
								message: '添加成功!'
							});
							that.$set(that.add, 0,'')
						}, function(res) {
							that.$message({
								type: 'error',
								message: '添加失败!'
							});
						});

					}).catch(() => {
						that.$message({
							type: 'info',
							message: '已取消添加！！'
						});
					});
				} else {
					that.$message({
						type: 'error',
						message: '没有填写设计师！！'
					});
				}

			},
			editFn: function(index) {
				var that = this;
				var editJosn = that.list[index];
				console.log(editJosn)
				that.$confirm('确认修改？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(that.get + 'action=edit', editJosn).then(function(res) {
						that.list = res.data.data;
						that.tongji()
						that.$message({
							type: 'success',
							message: '修改成功!'
						});
					}, function(res) {
						that.$message({
							type: 'error',
							message: '修改失败!'
						});
					});

				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消修改！！'
					});
				});
			},
			deleteFn: function(index) {
				var that = this;
				var deleteJosn = {};
				deleteJosn.id = that.list[index].id;
				that.$confirm('确认删除？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(that.get + 'action=delete', deleteJosn).then(function(res) {
						that.list = res.data.data;
						that.tongji()
						that.$message({
							type: 'success',
							message: '删除成功!'
						});
					}, function(res) {
						that.$message({
							type: 'error',
							message: '删除失败!'
						});
					});

				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除！！'
					});
				});
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
				year = year < 2000 ? year + 1900 : year;
				year = year.toString().substr(2, 2);
				var month = Today.getMonth() + 1;
				if(that.add[0][typename] != undefined) {
					var automaticDate = that.add[0][typename];
					var DateArry = automaticDate.split('.');
					if(DateArry.length == 1) {
						that.$set(that.add[0], typename, year + '.' + month + '.' + automaticDate)
					} else if(DateArry.length == 2) {
						that.$set(that.add[0], typename, year + '.' + automaticDate)
					}
				}
			},
			tongji: function() {
				var that = this;
				var fgsname = [];
				var sjsname = [];
				var swdbname = [];
				var swjlname = [];
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
					swdbname.push(that.list[i].business); //商务代表同上
					swjlname.push(that.list[i].manager); //商务经理同上

				};
				that.fgstj = that.arrCheck(fgsname); //统计数组中每个分公司出现的次数并写成["value":"成都一","value":5]的形式

				that.sjstj = that.arrCheck(sjsname); //设计师同上
				that.all = that.list.length;

				that.swdb = that.arrCheck(swdbname);
				that.swjl = that.arrCheck(swjlname);
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
						newJson.value = temp;
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
				//that.$cookie.set('stat_edit', that.stat_edit, 1);
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
				if(that.isA == 'open') {
					that.isA = 'close'
				} else {
					that.isA = 'open'
				}
			},
			toggleApp() {
				var that = this;
				if(that.togglebody == "open") {
					that.togglebody = "close"
				} else {
					that.togglebody = "open"
				}
				//that.$cookie.set('togglebody', that.togglebody, 1);

			},
			setting() {
				this.$router.push({
					path: '/setting'
				})
			},
			dls() {
				var that = this;
				var str = this.dailishang.split(/[\r\n]/g);
				var addjson = {
					'company': '代理商'
				};
				for(var i = 0; i < str.length; i++) {
					var item = str[i].split(':');
					if(item[0] == "代理商") {
						addjson.remarks = item[1];
					} else if(item[0] == "公司名称") {
						addjson.customer = item[1];
					} else if(item[0] == "域名") {
						var yuming = item[1].replace(/\[图片\]/gi, '')
						addjson.domains = yuming;
					} else if(item[0] == "类型") {
						addjson.type = item[1];
					} else if(item[0] == "下单日期") {
						addjson.xdate = item[1];
					} else if(item[0] == "客服") {
						addjson.business = item[1];
					} else if(item[0] == "备注") {
						var dqremarks = addjson.remarks;
						addjson.remarks = dqremarks + '/' + (item[1].replace(/\[图片\]/gi, ''));
					}
				};
				that.add = addjson;

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
			if(that.$cookie.get('isA') != undefined) {
				that.isA = that.$cookie.get('isA');
			}
			that.$http.get(that.get).then(function(res) {
				if(res.data.code == 0 || res.data.code == 3) {
					that.login = 1;
					that.list = res.data.data;
					if(res.data.data.length == 0) {
						that.$message({
							type: 'error',
							message: res.data.msg
						});
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
					that.$message({
						type: 'error',
						message: res.data.msg
					});
				}
			}, function(res) {

			});

		},
		created() {}
	}
</script>
<style>
	.indexbody {
		margin: 0;
		overflow: hidden;
	}
	#app {
		height: 100%;
	}
	.el-row {
		margin-bottom: 10px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-table td,
	.el-table th {
		padding: 5px 0;
	}
	
	.el-table th {
		text-align: center;
	}
	
	table .el-input__inner {
		display: block;
		width: 100%;
		height: 36px;
		border: none;
		text-align: center;
		background: none;
		padding: 0;
	}
	
	.el-table .cell {
		font-size: 14px;
		padding: 0!important;
	}
	
	table .caret-wrapper {
		display: none!important;
	}
	
	table .edit-input input {
		padding: 0;
		text-align: center;
		padding: 0 5px;
	}
	
	table .el-input__suffix {
		display: none;
	}
	
	table .el-input__inner {
		padding-right: 0!important;
	}
	
	.el-table .success-row {
		background: #f0f9eb;
	}
	
	.el-input.is-disabled .el-input__inner {
		background: none;
		color: #333;
		cursor: auto;
	}
	
	.el-autocomplete-suggestion li {
		padding: 0 10px;
	}
	
	.huyan {
		background: #cce8cf;
	}
	
	.huyan tr,
	.huyan th,
	.huyan td {
		background: #cce8cf!important;
	}
	
	.huyan tbody .hover-row,
	.huyan tbody .hover-row td {
		background-color: #dcf0ce!important;
	}
</style>