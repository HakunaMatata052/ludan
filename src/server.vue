<template>
	<div id="app" v-show="login">
		<el-container style="height: 100%;">
			<el-container style="overflow: auto;">
				<el-header>
					<div style="float: right;font-size: 20px;">
						<i class="el-icon-upload" @click="server"></i></a>
						<a href="/"><i class="el-icon-tickets"></i></a>
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

					<el-select placeholder="请选择" v-model="cxDate.month" v-if="false">
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
						<el-col :span="12">
							<el-input placeholder="请输入内容" v-model="search.business" clearable>
								<template slot="prepend">商务：</template>
							</el-input>
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容" v-model="search.manager" clearable>
								<template slot="prepend">总监：</template>
							</el-input>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-input placeholder="请输入内容" v-model="search.customer" clearable>
								<template slot="prepend">客户名称：</template>
							</el-input>
						</el-col>
						<el-col :span="12">
							<el-input placeholder="请输入内容" v-model="search.domains" clearable>
								<template slot="prepend">域名：</template>
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
						<el-col :span="2" :offset="20" style="text-align: right;">
							<el-button type="primary" icon="el-icon-tickets" size="mini" @click="exportExcel" circle></el-button>
						</el-col>
					</el-row>
					<el-table :data="add" :show-header="false" border style="width: 100%;" row-class-name="success-row">
						<el-table-column sortable prop="company" label="分公司" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].company" placeholder="分公司"></el-autocomplete>
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

						<el-table-column sortable prop="reason" label="关闭原因" min-width="130">
							<template slot-scope="scope">
								<el-input v-model="add[0].reason" placeholder="关闭原因"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="qdate" label="关闭时间" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].qdate" placeholder="关闭时间"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="xdate" label="开放时间" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].xdate" placeholder="开放时间"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="ip" label="IP" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].ip" placeholder="IP"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="kefu" label="客服" min-width="60">
							<template slot-scope="scope">
								<el-input v-model="add[0].kefu" placeholder="客服"></el-input>
							</template>
						</el-table-column>
						<el-table-column sortable prop="business" label="商务" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].business" placeholder="商务"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="manager" label="总监" min-width="60">
							<template slot-scope="scope">
								<el-autocomplete v-model="add[0].manager" placeholder="总监"></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column sortable prop="remarks" label="备注" min-width="130">
							<template slot-scope="scope">
								<el-input v-model="add[0].remarks" placeholder="备注"></el-input>
							</template>
						</el-table-column>

						<el-table-column sortable label="操作" width="140" fixed="right">
							<template slot-scope="scope">
								<el-button size="mini" type="success" @click="addFn" style="width: 100%;">添加</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-table :data="list" stripe border style="width: 100%;" v-loading="loading">
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column sortable prop="company" label="分公司" min-width="60" show-overflow-tooltip>
						</el-table-column>

						<el-table-column sortable prop="customer" label="客户名称" min-width="100" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="domains" label="域名" min-width="120" show-overflow-tooltip>
						</el-table-column>

						<el-table-column sortable prop="reason" label="关闭原因" min-width="130" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="bottom">
									{{scope.row.reason}}
									<div slot="reference" class="name-wrapper">
										{{scope.row.reason}}
									</div>
								</el-popover>
							</template>
						</el-table-column>

						<el-table-column sortable prop="qdate" label="关闭时间" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="xdate" label="开放时间" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="ip" label="IP" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="kefu" label="客服" min-width="60" show-overflow-tooltip>
						</el-table-column>

						<el-table-column sortable prop="business" label="商务" min-width="60" show-overflow-tooltip>
						</el-table-column>

						<el-table-column sortable prop="manager" label="总监" min-width="60" show-overflow-tooltip>
						</el-table-column>
						<el-table-column sortable prop="remarks" label="备注" min-width="130" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="bottom">
									{{scope.row.remarks}}
									<div slot="reference" class="name-wrapper">
										{{scope.row.remarks}}
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column sortable label="操作" width="140" fixed="right" v-if="stat_edit=='open'">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" @click="editFn(scope.row)">编辑</el-button>
								<el-button size="mini" type="danger" @click="deleteFn(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-dialog title="编辑" :visible.sync="dialogFormVisible">
						<el-form :model="editform">
							<el-form-item label="分公司" label-width="120px">
								<el-autocomplete v-model="editform.company" maxlength="5"></el-autocomplete>
							</el-form-item>
							<el-form-item label="客户名称" label-width="120px">
								<el-input v-model="editform.customer" maxlength="70"></el-input>
							</el-form-item>
							<el-form-item label="域名" label-width="120px">
								<el-input v-model="editform.domains" maxlength="40"></el-input>
							</el-form-item>

							<el-form-item label="关闭原因" label-width="120px">
								<el-input v-model="editform.reason" auto-complete="off"></el-input>
							</el-form-item>

							<el-form-item label="关闭日期" label-width="120px">
								<el-input v-model="editform.qdate" maxlength="30" auto-complete="off"  @focus="today('qdate',editform)"></el-input>
							</el-form-item>
							<el-form-item label="开放日期" label-width="120px">
								<el-input v-model="editform.xdate" maxlength="30" auto-complete="off"  @focus="today('xdate',editform)"></el-input>
							</el-form-item>

							<el-form-item label="IP" label-width="120px">
								<el-input v-model="editform.ip" maxlength="20" auto-complete="off"></el-input>
							</el-form-item>

							<el-form-item label="客服" label-width="120px">
								<el-input v-model="editform.kefu" maxlength="20" auto-complete="off"></el-input>
							</el-form-item>

							<el-form-item label="商务代表" label-width="120px">
								<el-autocomplete v-model="editform.business" maxlength="15"></el-autocomplete>
							</el-form-item>
							<el-form-item label="商务经理" label-width="120px">
								<el-autocomplete v-model="editform.manager" maxlength="15"></el-autocomplete>
							</el-form-item>

							<el-form-item label="备注" label-width="120px">
								<el-input v-model="editform.remarks" auto-complete="off"></el-input>
							</el-form-item>

						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitedit">确 定</el-button>
						</div>
					</el-dialog>
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
				listapi: 'apis/Services/',
				editapi: 'apis/EditServices/',
				loginapi: 'apis/LoginHandler/',
				username: "",
				list: [],
				editform: {},
				search: {},
				isShow: 0,
				cxDate: {
					year: '',
					month: ''
				},
				add: [{}],
				login: 0,
				isA: 'close',
				togglebody: 1,
				toggleShow: 1,
				stat_edit: 'open',
				loading: false,
				message: '',
				dialogFormVisible: false,
				PageCount: 0,
				pagesize: 300
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
						"value": "客户名称",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "域名",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "关闭原因",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "关闭时间",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "开放时间",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "IP",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "客服",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "商务",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "总监",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}, {
						"value": "备注",
						"type": "ROW_HEADER_HEADER",
						"datatype": "string"
					}],
					"data": newdata
				}
				this.JSONToExcelConvertor(data.data, 'FTP表', data.title);
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
					console.log(searchJson)
					that.$http.post(that.listapi + '?action=search', searchJson).then(function(res) {
						if(res.data.code == 0) {
							that.list = res.data.data;
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
				that.$confirm('确认添加？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(that.editapi + '?action=add', addJson).then(function(res) {
							that.list = res.data.data;
							that.$message({
								type: 'success',
								message: '添加成功!'
							});
							that.add = [{}];
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

			},
			editFn: function(row) {
				var that = this;
				that.dialogFormVisible = true;
				that.editform = row;
			},
			submitedit: function() {
				var that = this;
				var editJosn = that.editform;
				that.$confirm('确认修改？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(that.editapi + '?action=update', editJosn).then(function(res) {
						that.list = res.data.data;
						that.dialogFormVisible = false;
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
			deleteFn: function(row) {
				var that = this;
				var deleteJosn = {};
				deleteJosn.id = row.id;
				that.$confirm('确认删除？？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(that.editapi + '?action=del', deleteJosn).then(function(res) {
						that.list = res.data.data;
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
			close: function() {
				var that = this;
				that.isShow = 0;
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
			server() {
				this.$router.push({
					path: '/server'
				})
			},
			setting() {
				this.$router.push({
					path: '/setting'
				})
			}
		},
		mounted: function() {
			var that = this;
			that.$http.post(that.listapi + '?action=home').then(function(res) {
				if(res.data.code == 0) {
					that.login = 1;
					that.list = res.data.data;
					if(res.data.data.length == 0) {
						that.$message({
							type: 'error',
							message: res.data.msg
						});
					}
					if(res.data.date != undefined) {
						var dateRiqi = res.data.date.split('-');
						that.cxDate.year = dateRiqi[0];
						that.cxDate.month = dateRiqi[1];
					};
				} else {
					this.$router.push({
						path: '/login'
					})
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
</style>