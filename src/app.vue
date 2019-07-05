<template>
	<div id="app" v-show="login" v-loading="bodyloading">
		<el-container style="height: 100%;">
			<el-aside width="200px" v-show="togglebody" id="side">
				<el-menu :default-openeds="['1','3']" style="padding-top:30px;">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>各类型单量统计</template>
						<el-menu-item-group>
							<el-menu-item index="1-1" v-for="item in statistics.type" :key="item.id" @click="shaixuan('type',item.name)">{{item.name}}
								<el-badge class="mark" :value="item.value" />
							</el-menu-item>

							<el-menu-item index="1-6" @click="showData()">全部
								<el-badge class="mark" :value="list.length" /></el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="2">
						<template slot="title"><i class="el-icon-message"></i>各公司单量统计</template>
						<el-menu-item-group>

							<el-menu-item index="2-1" v-for="item in statistics.company" :key="item.id" @click="shaixuan('company',item.name)">{{item.name}}
								<el-badge class="mark" :value="item.value" />
							</el-menu-item>

						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="3">
						<template slot="title"><i class="el-icon-message"></i>技术下单统计</template>
						<el-menu-item-group>
							<el-menu-item index="3-1" v-for="item in statistics.artisan" :key="item.id" @click="shaixuan('designer',item.name)">{{item.name}}
								<el-badge class="mark" :value="item.value" />
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container style="overflow: auto;">
				<el-header height="auto" style="margin-top:10px">
					<div style="float:right;font-size: 20px;">
						<i class="el-icon-tickets" @click="home"></i>
						<i class="el-icon-upload" @click="server"></i>
						<i class="el-icon-refresh" @click="showData"></i>
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
						<el-option value="2019">2019年</el-option>
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
				<el-main :id="'main'">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.fee" clearable>
								<template slot="prepend">切图：</template>
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
								<el-button slot="append" icon="el-icon-search" @click="batch('customer')"></el-button>
							</el-input>
						</el-col>
						<el-col :span="8">
							<el-input placeholder="请输入内容" v-model="search.domains" clearable>
								<template slot="prepend">域名：</template>
								<el-button slot="append" icon="el-icon-search" @click="batch('domains')"></el-button>
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
							<el-button type="primary" size="small" style="width: 100%;" @click="searchFn">查询</el-button>
						</el-col>
						<el-col :span="2">
							<el-button type="info" size="small" style="width: 100%;" @click="reSet">清空</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="22">
							<el-button type="primary" icon="el-icon-view" size="mini" @click='toggle' circle></el-button>
							<el-button type="primary" icon="el-icon-edit" size="mini" @click="opcl_edit" circle></el-button>
							<el-button type="primary" icon="el-icon-tickets" size="mini" @click="dls_edit" circle></el-button>
							<el-button type="primary" size="mini" @click="tjkf('483303587')">成都客服</el-button>
							<el-button type="primary" size="mini" @click="tjkf('3188386448')">郑州客服</el-button>
							<el-button type="primary" size="mini" @click="tjkf('2439418622')">武汉客服</el-button>
							<el-button type="primary" size="mini" @click="refresh">批量录入切图</el-button>
						</el-col>
						<el-col :span="2" style="text-align: right;">
							
							<el-button type="danger" icon="el-icon-delete" size="mini" @click="dels=!dels" circle></el-button>
							<el-button type="primary" icon="el-icon-tickets" size="mini" @click="exportExcel" circle></el-button>
						</el-col>
					</el-row>
					<el-table :data="add" :show-header="false" border style="width: 100%;" :row-class-name="tableRowClassName" v-if="stat_edit=='open'">
						<el-table-column sortable prop="company" label="分公司" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].company" :fetch-suggestions="queryCompany" placeholder="分公司"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="business" label="商务代表" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].business" :fetch-suggestions="querySwdb" placeholder="商务代表"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="manager" label="商务经理" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].manager" :fetch-suggestions="querySwjl" placeholder="商务经理"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="customer" label="客户名称" min-width="100">
							<template slot-scope="scope">
								<el-input v-model="add[0].customer" placeholder="客户名称"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="domains" label="域名" min-width="120">
							<template slot-scope="scope">
								<el-input v-model="add[0].domains" placeholder="域名"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qdate" label="签单日期" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].qdate" @blur="automatic('qdate')" placeholder="签单时间"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="xdate" label="下单日期" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].xdate" @blur="automatic('xdate')" placeholder="下单时间"></el-input>
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
								<el-input v-model="add[0].year" placeholder="年限"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qmoney" label="签单金额" min-width="80">
							<template slot-scope="scope">
								<el-input v-model="add[0].qmoney" placeholder="签单金额"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="smoney" label="实到" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].smoney" placeholder="实到金额"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="remarks" label="备注" min-width="130">
							<template slot-scope="scope">
								<el-input v-model="add[0].remarks" placeholder="备注"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="designer" label="设计师" min-width="60">
							<template slot-scope="scope">
								<el-select v-model="add[0].designer" placeholder="设计狮" @change="selectinputfn" v-if="selectinput == false">
									<el-option v-for="item in designer" :key="item.value" :label="item.value" :value="item.value">
									</el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>

								<el-input v-model="add[0].designer" value="" placeholder="设计狮" v-if="selectinput == true" @blur="selectinput=false"></el-input>
							</template>
						</el-table-column>
						
						<el-table-column sortable prop="fee" label="切图" min-width="60">
							<template slot-scope="scope">
								<el-select v-model="add[0].fee" placeholder="切图" @change="selectinputfn" v-if="selectinput == false">
									<el-option v-for="item in fee" :key="item.value" :label="item.value" :value="item.value">
									</el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>

								<el-input v-model="add[0].fee" value="" placeholder="切图" v-if="selectinput == true" @blur="selectinput=false"></el-input>

							</template>
						</el-table-column>

						<el-table-column sortable prop="programmer" label="程序" min-width="60">
							<template slot-scope="scope">
								<el-select v-model="add[0].programmer" placeholder="程序猿">
									<el-option v-for="item in programmer" :key="item.id" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column sortable prop="workload" label="工作量" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].workload" placeholder="工作量"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="home" label="首页认可" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].home" @blur="automatic('home')" placeholder="首页认可"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="program" label="程序认可" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].program" placeholder="程序认可"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="online" label="上线日期" min-width="70">
							<template slot-scope="scope">
								<el-input v-model="add[0].online" placeholder="上线日期"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable label="操作" width="90" fixed="right">
							<template slot-scope="scope">
								<el-button size="mini" type="success" @click="addFn" style="width: 100%;">添加</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-table :data="viewlist" stripe border style="width: 100%;" v-bind:class='isA=="open"?"huyan":""' v-loading="loading">
						<el-table-column sortable prop="company" label="分公司" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="business" label="商务代表" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="manager" label="商务经理" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="customer" label="客户名称" min-width="100" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="domains" label="域名" min-width="120" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="qdate" label="签单日期" min-width="70" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="xdate" label="下单日期" min-width="70" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="type" label="类别" min-width="80" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="year" label="年限" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="qmoney" label="签单金额" min-width="80" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="smoney" label="实到" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="remarks" label="备注" min-width="130" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag type="danger" size="medium" v-if="scope.row.remarks.indexOf('加急')>=0">{{scope.row.remarks}}</el-tag>
								<el-tag type="success" size="medium" v-else-if="scope.row.company=='代理商'">{{scope.row.remarks}}</el-tag>
								<el-tag size="medium" v-else-if="scope.row.remarks.indexOf('策划')>=0">{{scope.row.remarks}}</el-tag>
								<template v-else>
									{{scope.row.remarks}}
								</template>
							</template>
						</el-table-column>
						<el-table-column sortable prop="designer" label="设计师" min-width="60" show-overflow-tooltip>
							<template slot-scope="scope">
								<div @dblclick="noticefn(scope.row.designer,scope.row)" class="btn" data-clipboard-target="#noticeCon">{{scope.row.designer}}</div>
							</template>
						</el-table-column>
						<el-table-column sortable prop="fee" label="切图" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="programmer" label="程序" min-width="60" show-overflow-tooltip>
							<template slot-scope="scope">
								<div @dblclick="noticefn(scope.row.programmer,scope.row)" class="btn" data-clipboard-target="#noticeCon">{{scope.row.programmer}}</div>
							</template>
						</el-table-column>
						<el-table-column sortable prop="workload" label="工作量" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="home" label="首页认可" min-width="70" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="program" label="程序认可" min-width="70" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="online" label="上线日期" min-width="70" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable label="操作" width="90" fixed="right" v-if="stat_edit=='open'">
							<template slot-scope="scope">
								<div style="display:flex;">
								<el-button size="mini" type="primary" @click="editFn(scope.row)">改</el-button>
								<el-button size="mini" type="danger" @click="deleteFn(scope.row)" v-if="dels">删</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination :page-size="pagesize" :page-sizes="[100, 200, 300, 400]" layout="total ,sizes,prev, pager, next, jumper" :total="PageCount" @current-change="changepage" @size-change="changePageSize">
					</el-pagination>
					<textarea :value="noticeCon" style="opacity: 0;" id="noticeCon"></textarea>
					<el-dialog title="编辑" :visible.sync="dialogFormVisible">
						<el-form :model="editform">
							<el-form-item label="分公司" label-width="120px">
								<el-autocomplete v-model="editform.company" :maxlength="5" :fetch-suggestions="queryCompany"></el-autocomplete>
							</el-form-item>
							<el-form-item label="商务代表" label-width="120px">
								<el-autocomplete v-model="editform.business" :maxlength="15" :fetch-suggestions="querySwdb"></el-autocomplete>
							</el-form-item>
							<el-form-item label="商务经理" label-width="120px">
								<el-autocomplete v-model="editform.manager" :maxlength="15" :fetch-suggestions="querySwjl"></el-autocomplete>
							</el-form-item>
							<el-form-item label="客户名称" label-width="120px">
								<el-input v-model="editform.customer" :maxlength="70"></el-input>
							</el-form-item>
							<el-form-item label="域名" label-width="120px">
								<el-input v-model="editform.domains" :maxlength="40"></el-input>
							</el-form-item>
							<el-form-item label="签单日期" label-width="120px">
								<el-input v-model="editform.qdate" :maxlength="30" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="下单日期" label-width="120px">
								<el-input v-model="editform.xdate" :maxlength="30" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="类别" label-width="120px">
								<el-select v-model="editform.type" placeholder="WJDH双模">
									<el-option v-for="item in typeList" :key="item.id" :label="item" :value="item"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="年限" label-width="120px">
								<el-input v-model="editform.year" :maxlength="20" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="签单金额" label-width="120px">
								<el-input v-model="editform.qmoney" :maxlength="20" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="实到" label-width="120px">
								<el-input v-model="editform.smoney" :maxlength="20" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="备注" label-width="120px">
								<el-input v-model="editform.remarks" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="设计师" label-width="120px">
								<el-select v-model="editform.designer" placeholder="设计狮" @change="selectinputfn" v-if="selectinput == false">
									<el-option v-for="item in designer" :key="item.value" :label="item.value" :value="item.value">
									</el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
								<el-input v-model="editform.designer" value="" placeholder="设计狮" v-if="selectinput == true" @blur="selectinput=false"></el-input>
							</el-form-item>
							
							<el-form-item label="切图" label-width="120px">
								<el-select v-model="editform.fee" placeholder="切图" @change="selectinputfn" v-if="selectinput == false">
									<el-option v-for="item in fee" :key="item.value" :label="item.value" :value="item.value">
									</el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
								<el-input v-model="editform.fee" value="" placeholder="切图" v-if="selectinput == true" @blur="selectinput=false"></el-input>
							</el-form-item>
							<el-form-item label="程序" label-width="120px">
								<el-select v-model="editform.programmer" placeholder="程序猿">
									<el-option v-for="item in programmer" :key="item.id" :label="item.text" :value="item.text"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="工作量" label-width="120px">
								<el-input v-model="editform.workload" :maxlength="50" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="首页认可" label-width="120px">
								<el-input v-model="editform.home" :maxlength="20" auto-complete="off" @focus="today('home',editform)"></el-input>
							</el-form-item>
							<el-form-item label="程序认可" label-width="120px">
								<el-input v-model="editform.program" :maxlength="20" auto-complete="off" @focus="today('program',editform)" ></el-input>
							</el-form-item>
							<el-form-item label="上线日期" label-width="120px">
								<el-input v-model="editform.online" :maxlength="20" auto-complete="off" @focus="today('online',editform)"></el-input>
							</el-form-item>

							<el-form-item label="上传附件" label-width="120px">
								<el-upload class="upload-demo" drag :action="'apis/uploadfile/?id='+editform.id" multiple :on-success="uploadsSuccess" :on-error="uploadsError">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								</el-upload>
							</el-form-item>
							<el-form-item label="图片附件" label-width="120px" v-if="editform.imgurl!=null">
								<img :src="editform.imgurl" style="width: 100%;height:auto">
							</el-form-item>

						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitedit(0)">确 定</el-button>
							<el-button type="primary" @click="submitedit">修改不刷新</el-button>
							<el-button type="success" @click="submitedit(1)" v-if="username=='btoe'">录入切图</el-button>
						</div>
					</el-dialog>
				</el-main>
			</el-container>
		</el-container>

	</div>
</template>
<script>
	import Vue from 'vue'
	import VueClipboard from 'vue-clipboard2'
	VueClipboard.config.autoSetContainer = true // add this line
	Vue.use(VueClipboard)
	export default {
		name: 'app',
		data: function() {
			return {
				listapi: process.env.API_ROOT+'apis/DoitHandler/',
				editapi: process.env.API_ROOT+'apis/EditHandler/',
				loginapi: process.env.API_ROOT+'apis/LoginHandler/',
				username: "",
				list: [],
				viewlist: [],
				editform: {},
				viewnum: 0,
				temlist: [],
				statistics: {},
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
					type: 'WJDH双模',
					qmoney: '5800'
				}],
				companyList: [],
				typeList: ["WJDH双模", "WJDH电商", "常规", "营销宝"],
				fee:[],
				designer: [],
				programmer: [{
						"text": "张田",
						"value": "张田",
						"qq": ""
					},
					{
						"text": "孙琪",
						"value": "孙琪",
						"qq": ""
					},
					{
						"text": "董佳旗",
						"value": "董佳旗",
						"qq": ""
					},
					{
						"text": "兰帆",
						"value": "兰帆",
						"qq": ""
					}
				],
				selectinput: false,
				isShow: 0,
				cxDate: {
					year: '',
					month: ''
				},
				login: 0,
				isA: 'close',
				togglebody: 1,
				toggleShow: 1,
				stat_edit: 'open',
				loading: false,
				message: '',
				dialogFormVisible: false,
				PageCount: 0,
				pagesize: 100,
				noticeCon: '',
				dels:false,
				bodyloading:true,
				addHomeTime:false,
				tempArray:[],
				count:0
			}
		},
		watch: {
			list: function(val) {
				this.$nextTick(function() {
					//alert(2)
					// console.log('a的数据发生变化' + this.list);
				})
			}
		},
		methods: {
			uploadsSuccess(data) {
				// console.log(data)
				this.editform.imgurl = data.data;
			},
			uploadsError() {
				this.$message({
					type: 'error',
					message: res.data.msg
				});
			},
			shaixuan(item, value) { //左侧筛选
				var that = this;
				var newlist = [];
				for(var i = 0; i < that.temlist.length; i++) {
					if(that.temlist[i][item] == value) {
						newlist.push(that.temlist[i])
					}
				}
				that.viewlist = newlist;
			},
			exportExcel() { //生成导出excel表格的数据
				var newdata = [];
				for(var i = this.list.length - 1; i >= 0; i--) {
					var cell = [];
					var j = 0;
					for(var attr in this.list[i]) {
						if(attr == "id" || attr == "addtime") {

						} else {
							cell[j] = {
								'value': '',
								'type': 'ROW_HEADER'
							};
							if(this.list[i][attr] == null) {
								cell[j].value = ' ';
							} else {
								cell[j].value = this.list[i][attr];
							}
						}
						j++;
					}
					newdata.push(cell);
				}
				var data = {
					"title": [{
						"value": "分公司",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "商务代表",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "商务经理",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "客户名称",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "域名",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "签单日期",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "下单日期",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "类型",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "年限",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "签单金额",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "实到金额",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "备注",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "设计师",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "程序",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "工作量",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "首页认可",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "程序认可",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "上线时间",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}],
					"data": newdata
				}
				this.JSONToExcelConvertor(data.data, this.cxDate.year + '-' + this.cxDate.month + '下单表', data.title);
			},
			JSONToExcelConvertor(JSONData, FileName, ShowLabel) { //导出excel表格文件
				//先转化json  
				var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
				var excel = '<table>';
				//设置表头  
				var row = "<tr>";
				for(var i = 0, l = ShowLabel.length; i < l; i++) {
					row += "<td style='font-size: 14px;font-weight: bold;'>" + ShowLabel[i].value + '</td>';
				}
				//换行  
				excel += row + "</tr>";
				//设置数据  
				for(var i = 0; i < arrData.length; i++) {
					var row = "<tr>";
					for(var index in arrData[i]) {
						var value = arrData[i][index].value === "." ? "" : arrData[i][index].value;
						row += '<td>' + value + '</td>';
					}
					excel += row + "</tr>";
				}
				excel += "</table>";
				var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
				excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
				excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
				excelFile += '; charset=UTF-8">';
				excelFile += "<head>";
				excelFile += "<!--[if gte mso 9]>";
				excelFile += "<xml>";
				excelFile += "<x:ExcelWorkbook>";
				excelFile += "<x:ExcelWorksheets>";
				excelFile += "<x:ExcelWorksheet>";
				excelFile += "<x:Name>";
				excelFile += "{worksheet}";
				excelFile += "</x:Name>";
				excelFile += "<x:WorksheetOptions>";
				excelFile += "<x:DisplayGridlines/>";
				excelFile += "</x:WorksheetOptions>";
				excelFile += "</x:ExcelWorksheet>";
				excelFile += "</x:ExcelWorksheets>";
				excelFile += "</x:ExcelWorkbook>";
				excelFile += "</xml>";
				excelFile += "<![endif]-->";
				excelFile += "</head>";
				excelFile += "<body>";
				excelFile += excel;
				excelFile += "</body>";
				excelFile += "</html>";
				var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
				var link = document.createElement("a");
				link.href = uri;
				link.style = "visibility:hidden";
				link.download = FileName + ".xls";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			},
			dls_edit() { //代理商快速录入
				var that = this;
				that.$prompt('快捷输入', '提示', {
					inputType: 'textarea'
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
							addjson.customer = item[1].replace(/有限公司|制品厂/gi, '');
						} else if(item[0] == "域名") {
							var yuming = item[1].replace(/\[图片\]/gi, '')
							yuming = yuming.replace('www.', '')
							addjson.domains = yuming;
						} else if(item[0] == "类型") {
							addjson.type = item[1];
						} else if(item[0] == "下单日期") {
							addjson.xdate = item[1]; //item[1].slice(2, item[1].length);
						} else if(item[0] == "客服") {
							addjson.business = item[1];
						} else if(item[0] == "备注") {
							var dqremarks = addjson.remarks;
							addjson.remarks = dqremarks + '/' + (item[1].replace(/\[图片\]/gi, ''));
						}
					};
					that.$set(that.add, 0, addjson)
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '取消输入'
					});
				});

			},
			filter(value, row, column) {
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
			createFilter(queryString) {
				return(restaurant) => {
					return(restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			showData: function(year, month) {
				var that = this;
				that.loading = true;
				if(year == undefined) {
					var getUrl = that.listapi + '?action=home';
				} else {
					var getUrl = that.listapi + '?action=tongji&addtime=' + year + '-' + month;
				};
				that.$http.get(getUrl).then(function(res) {
					if(res.data.code == 0) {
						that.list = res.data.data;

						that.viewlist = res.data.data;
						that.statistics = res.data.statistics;
						that.temlist = res.data.data;
						that.tongji();
						that.loading = false;
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
				that.loading = true;
				var searchJson = that.search;
				if(JSON.stringify(searchJson) != "{}") {
					// console.log(searchJson)
					that.$http.post(that.listapi + '?action=search', searchJson,{
					headers:{
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					emulateJSON :true
				}).then(function(res) {
						if(res.data.code == 0) {
							that.list = res.data.data;

							that.viewlist = res.data.data;
							that.statistics = res.data.statistics;
							that.tongji();
							that.loading = false;
						} else {
							that.$message({
								type: 'error',
								message: res.data.msg
							});
							that.loading = false;
						}
					}, function(res) {

					});
					that.search = {};

				} else {
					that.$message({
						type: 'error',
						message: '请填写查询关键字!'
					});
					that.loading = false;
				}

			},
			batch(type){
				var that = this;
				that.loading = true;
				that.tempArray = that.search[type].replace(/ /g,'').split(',')
				that.list = [];
				that.viewlist = []
				that.batchDomains(that.tempArray[that.count],type)
			},
			batchDomains(data,type){
				var that = this
				var batchJson = {}
				batchJson[type] = data
				that.$http.post(that.listapi + '?action=search',batchJson,{
					headers:{
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					emulateJSON :true
				}).then(function(res){
					if(res.data.data instanceof Array){
						for(var i = 0;i<res.data.data.length;i++){
							that.list.push(res.data.data[i])
							that.viewlist.push(res.data.data[i])
						}
					}
					if(that.count>=that.tempArray.length){
						that.loading = false;
						that.count = 0
						return
					}else{
						that.batchDomains(that.tempArray[that.count++],type)
					}
					
				})
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
				if(that.add[0].remarks != null) that.add[0].remarks = that.add[0].remarks.replace('、', '/');
				addJson.username = that.username;
				if(addJson.designer != undefined) {
					that.$confirm('确认添加？？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.$http.post(that.editapi + '?action=add', addJson,{
					headers:{
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					emulateJSON :true
				}).then(function(res) {
								that.list = res.data.data;
								that.viewlist = res.data.data;
								that.statistics = res.data.statistics;
								that.$message({
									type: 'success',
									message: '添加成功!'
								});
								that.add = [{
									type: 'WJDH双模',
									qmoney: '5800'
								}];
							},
							function(res) {
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
			editFn: function(row) {
				var that = this;				
				that.addHomeTime = false;
				that.dialogFormVisible = true;
				that.editform = row;
				if(that.editform.fee.length == 0 && that.editform.home.length == 0) that.addHomeTime = true; 
			},
			submitedit: function(state) {
				var that = this;
				if(state===1){
					if(that.addHomeTime && that.editform.fee.length != 0) that.today('home',that.editform);
				}
				
				var editJosn = that.editform;
				editJosn.username = that.username;
				that.$confirm('确认修改？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(that.addHomeTime && that.editform.fee.length != 0) {
						that.noticefn(editJosn.designer,that.editform); 
					}
					that.$http.post(that.editapi + '?action=update', editJosn,{
					headers:{
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					emulateJSON :true
				}).then(function(res) {
						if(res.data.code == "0") {
							if(state === 0 || state===1 ) {
								that.list = res.data.data;
								that.viewlist = res.data.data;
							}

							that.statistics = res.data.statistics;
							that.dialogFormVisible = false;
							that.$message({
								type: 'success',
								message: '修改成功!'
							});
						} else {
							that.$message({
								type: 'error',
								message: res.data.msg
							});
						}
					}, function(res) {
						that.$message({
							type: 'error',
							message: '修改失败!'
						});
					});
					if(state===1 ) {
						var feeJson = {};
						feeJson.data = [];
						feeJson.data[0] = that.editform;
						that.$http.post('http://192.168.0.253:5000/', feeJson).then((res)=>{
							that.$notify({
								title: '已录入切图'
							});
						})
					}
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消修改！！'
					});					
				});
			},
			refresh(){
				var that = this;
		       if(localStorage.getItem('ok')=='ok'){
				var feeJson = {};
				feeJson.data = that.viewlist;
				that.$http.post('http://192.168.0.253:5000/', feeJson).then((res)=>{
					that.$notify({
						title: '已录入切图'
					});
				})
			  }else{
				  that.$message.error('没有权限操作')
			  }
			},
			deleteFn: function(row) {
				var that = this;
				var deleteJosn = {};
				deleteJosn.id = row.id;
				deleteJosn.username = that.username;
				that.$confirm('确认删除？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(that.editapi + '?action=del', deleteJosn,{
					headers:{
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					emulateJSON :true
				}).then(function(res) {
						that.list = res.data.data;
						that.viewlist = res.data.data;
						that.statistics = res.data.statistics;
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
			today: function(typename, row) {
				var that = this;
				if(row[typename] == undefined || row[typename].length == '') {
					var Today = new Date()
					var year = Today.getYear();
					year = year < 2000 ? year + 1900 : year
					year = year.toString().substr(2, 2);
					var month = Today.getMonth() + 1;
					var day = Today.getDate();
					row[typename] = year + '.' + month + '.' + day; //修改data中的数据（不会更新视图）
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
				that.PageCount = that.list.length;
				that.viewlist = that.changearray(1);
				var swdbname = [];
				var swjlname = [];
				var fgslist = [];
				for(var i = 0; i < that.list.length; i++) {
					swdbname.push(that.list[i].business); //商务代表同上
					swjlname.push(that.list[i].manager); //商务经理同上
					fgslist.push(that.list[i].company)
				};
				that.companyList = that.arrCheck(fgslist);
				that.swdb = that.arrCheck(swdbname);
				that.swjl = that.arrCheck(swjlname);
			},
			changePageSize(val){
				var that = this;
				that.pagesize = val;
				that.viewlist = that.changearray(1)
			},
			changepage: function(val) {
				var that = this;
				that.viewlist = that.changearray(val);
			},
			changearray(val) {
				var that = this;
				var viewlistjson = [];
				var fullpage;
				for(var i = (val - 1) * that.pagesize; i < (val - 1) * that.pagesize + that.pagesize; i++) {
					if(that.list[i] == undefined) {
						break;
					} else {
						viewlistjson.push(that.list[i]);
					}

				}
				return viewlistjson;
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
				that.$http.get(that.loginapi + '?action=logout').then(function(res) {
					if(res.data.code == 0) {
						that.$message({
							type: 'success',
							message: res.data.msg
						});
						this.$router.push({
							path: '/login'
						})
					}
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
			noticefn(name, content) {
				var that = this;
				var tempcon = [];
				tempcon.push(`单子名称：${content.customer}`);				
				tempcon.push(`商务经理：${content.manager}`);				
				tempcon.push(`域名：${content.domains}`);
				tempcon.push(`类型：${content.type}`);
				tempcon.push(`设计狮：${content.designer}`);				
				tempcon.push(`切图：${content.fee}`);
				tempcon = tempcon.join("&");
				tempcon = tempcon.replace(/&+/gi, '\r\n')
				that.noticeCon = tempcon;
				this.$copyText(this.noticeCon).then(function(e) {
					for(var i = 0; i < that.designer.length; i++) {
						if(name == that.designer[i].value) {
							var qqSrc = "tencent://message/?uin=" + that.designer[i].qq + "&Site=" + that.designer[i].qq + "&Menu=yes";
							//window.open(qqSrc); 
							var c = document.createElement('iframe');
							c.src = qqSrc;
							c.style.setProperty('display', 'none', 'important');
							document.getElementById("app").appendChild(c);
							setTimeout(function() {
								c.parentNode.removeChild(c);
							}, 1000)
						}
					}

				}, function(e) {
					alert('Can not copy')
					// console.log(e)
				})

			},
			selectinputfn(a) {
				if(a == '其他') {
					this.selectinput = true;
				}
			},
			home() {
				this.$router.push({
					path: '/'
				})
			},
			server() {
				this.$router.push({
					path: '/server'
				})
			},
			setting() {
				this.$router.push({
					path: '/setting'
				})
			},
			tjkf(val){
				var qqSrc = "tencent://message/?uin=" +val + "&Site=" + val + "&Menu=yes";
					//window.open(qqSrc); 
					var c = document.createElement('iframe');
					c.src = qqSrc;
					c.style.setProperty('display', 'none', 'important');
					document.getElementById("app").appendChild(c);
					setTimeout(function() {
						c.parentNode.removeChild(c);
					}, 1000)
			}
		},
		mounted: function() {
			var that = this;
			//document.getElementById("main").addEventListener('scroll', this.handleScroll);    //下拉执行 this.handleScroll
			if(localStorage.stat_edit != undefined) {
				that.stat_edit = localStorage.stat_edit
			}
			if(localStorage.togglebody != undefined) {
				that.togglebody = localStorage.togglebody;
			}
			if(localStorage.isA != undefined) {
				that.isA = localStorage.isA
			}
			that.$http.get(that.listapi + '?action=home').then(function(res) {
				if(res.data.code == 0) {
					that.login = 1;
					that.list = res.data.data;
					that.viewlist = res.data.data;
					that.statistics = res.data.statistics;
					that.temlist = res.data.data;
					if(res.data.data.length == 0) {
						that.$message({
							type: 'error',
							message: res.data.msg
						});
					}
					that.username = res.data.username;
					if(res.data.date != undefined) {
						var dateRiqi = res.data.date.split('-');
						that.cxDate.year = dateRiqi[0];
						that.cxDate.month = dateRiqi[1];
					};
					var designer = res.data.designer.split(',')
					for(var i=0;i<designer.length;i++){
						var temp = {}
						temp.value = designer[i].split('|')[0];						
						temp.qq =  designer[i].split('|')[1];						
						that.designer.push(temp);
					};
					var fee = res.data.fee.split(',')
					for(var i=0;i<fee.length;i++){
						var temp = {}
						temp.value = fee[i].split('|')[0];						
						temp.qq =  fee[i].split('|')[1];						
						that.fee.push(temp);
					}
					that.tongji();
				} else {
					this.$router.push({
						path: '/login'
					})
				}
			}, function(res) {

			});


		},
		created() {
			if(window.location.hostname == "192.168.0.202"){
				var style = document.getElementById("style")
				style.parentNode.removeChild(style);
				document.body.style.display = "block"
			}else{
				document.body.style.display = "block"
			}
		}
	}
</script>
<style>
	.indexbody {
		margin: 0;
		overflow: hidden;
		font-family: 'Monda', "PingFang SC", "Microsoft YaHei", sans-serif
	}
	
	.el-scrollbar {
		min-width: 90px;
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
	
	table td {
		text-align: center;
	}
	
	.el-table .cell {
		font-size: 14px;
		padding: 0 5px!important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
	
	.el-form-item {
		margin-bottom: 10px;
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
	.el-button+.el-button {
		margin-left: 0
	}
	.el-button--mini, .el-button--mini.is-round {
		    padding: 7px 10px;
			    flex-grow: 1;
	}
</style>