<template>
  <div>
    <el-card>
      <h2>试题录入</h2>
      <hr />
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item prop="subjectID" label="学科">
          <el-select
            v-model="formData.subjectID"
            style="width: 400px"
            placeholder="请选择"
            @change="(formData.catalogID = '') && (formData.tags = [])"
          >
            <!-- @change="changeSelect($event)" -->
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.subjectName"
              :value="item.id"
              >{{ item.subjectName }}</el-option
            >/>
          </el-select>
        </el-form-item>

        <el-form-item prop="catalogID" label="目录">
          <el-select
            v-model="formData.catalogID"
            style="width: 400px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in directoryList2"
              :key="item.id"
              :label="item.directoryName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="enterpriseID" label="企业">
          <el-select
            v-model="formData.enterpriseID"
            style="width: 400px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.company"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="city" label="城市">
          <el-select
            v-model="formData.province"
            style="width: 100px"
            placeholder="请选择"
            @change="formData.city = ''"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-select
            v-model="formData.city"
            style="margin-left: 20px; width: 100px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="direction" label="方向">
          <el-select
            v-model="formData.direction"
            style="width: 400px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in direction"
              :key="item.index"
              :label="item.index"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="题型">
          <el-radio-group v-model="formData.questionType">
            <el-radio label="1">单选</el-radio>
            <el-radio label="2">多选</el-radio>
            <el-radio label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度">
          <el-radio-group v-model="formData.difficulty">
            <el-radio label="1">简单</el-radio>
            <el-radio label="2">一般</el-radio>
            <el-radio label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="question" label="题干">
          <VueEditor v-model="formData.question" />
        </el-form-item>
        <el-form-item
          v-if="formData.questionType === '1'"
          prop="options"
          label="选项"
        >
          <!-- 单选框 -->
		  <!-- 用v-if和v-else-if分别绑定单选框和多选框,并判断他们的题目类型的值,当值为1时为单选框,值为2时为多选框 -->
          <el-radio-group v-model="onechecked">
            <el-row
              v-for="obj in formData.options"
              :key="obj.code"
              type="flex"
              style="margin-bottom: 20px; align-items: center"
            >
              <el-radio :label="obj.code">{{ obj.code }}</el-radio>
              <el-input v-model="obj.title" />
              <el-upload
                class="upload-demo inline"
                action
                :headers="{}"
                :on-success="handleChange"
                list-type="picture"
              >
                <el-button style="margin-left: 20px">点击上传</el-button>
              </el-upload>
              <el-button
                style="margin-left: 20px"
                @click="delCheckBox(obj)"
                >点击删除</el-button
              >
            </el-row>
          </el-radio-group>
        </el-form-item>
        <!-- 多选框 -->
        <el-form-item
          v-else-if="formData.questionType === '2'"
          prop="options"
          label="选项"
        >
          <el-checkbox-group v-model="checked">
            <el-row
              v-for="obj in formData.options"
              :key="obj.code"
              type="flex"
              style="margin-bottom: 20px; align-items: center"
            >
              <el-checkbox :label="obj.code">{{ obj.code }}:</el-checkbox>
              <el-input
                v-model="obj.title"
                style="width: 187px; margin-left: 30px"
              />
              <el-upload
                class="upload-demo inline"
                action
                :headers="{}"
                :on-success="handleChange"
                list-type="picture"
              >
                <el-button style="margin-left: 20px">点击上传</el-button>
              </el-upload>
              <el-button
                style="margin-left: 20px"
                @click="delCheckBox(obj)"
                >点击删除</el-button
              >
            </el-row>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-plus" type="danger" @click="addCheckBox"
            >增加选项与答案</el-button
          >
        </el-form-item>
        <el-form-item label="解析视频">
          <el-input v-model="formData.videoURL" style="width: 285px" />
        </el-form-item>
        <el-form-item prop="answer" label="答案解析">
          <VueEditor v-model="formData.answer" />
        </el-form-item>
        <el-form-item prop="remarks" label="题目备注">
          <el-input
            v-model="formData.remarks"
            style="width: 285px"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item prop="tags" label="题目标签">
          <el-select
            v-model="formData.tags"
            multiple
            style="width: 285px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in tagList2"
              :key="item.id"
              :label="item.tagName"
              :value="item.tagName"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btnOk">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { getSubjectApi } from "@/api/mySubject";
import { getDirectoryslistApi } from "@/api/myCatalog";
import { getTaglistApi } from "@/api/myTag";
import { getBgUserList } from "@/api/bg-user";
import { getCompanyListApi } from "@/api/company";
import {
  addQuestionApi,
  editQuestionApi,
  getQuestionInfoApi,
} from "@/api/question";
import { regionData } from "element-china-area-data";
import { direction } from "@/constant/questionType";
export default {
  name: "TestQuestion",
  components: { VueEditor },
  filters: {
    questionType(val) {
      if (val === 1) return "单选";
      if (val === 2) return "多选";
      if (val === 3) return "简答";
    },
    difficultType(val) {
      if (val === 1) return "简单";
      if (val === 2) return "一般";
      if (val === 3) return "困难";
    },
  },
  data() {
    return {
      checked: [],
      onechecked: "",
      formData: {
        subjectID: "",
        catalogID: "",
        difficulty: "1",
        questionType: "1",
        options: [
          { code: "A", title: "", img: "", isRight: false },
          { code: "B", title: "", img: "", isRight: false },
          { code: "C", title: "", img: "", isRight: false },
          { code: "D", title: "", img: "", isRight: false },
        ],
        tags: [],
        remarks: "",
        province: "",
        city: "",
        direction: "",
        question: "",
        answer: "",
      },
      formRules: {
        subjectID: [
          {
            required: true,
            message: "请选择学科名称",
            trigger: "change",
          },
        ],
        catalogID: [
          {
            required: true,
            message: "请选择目录",
            trigger: "change",
          },
        ],
        enterpriseID: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change",
          },
        ],
        city: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change",
          },
        ],
        direction: [
          {
            required: true,
            message: "请选择方向",
            trigger: "change",
          },
        ],
        question: [
          {
            required: true,
            message: "请输入题干",
            trigger: "blur",
          },
        ],
        answer: [
          {
            required: true,
            message: "请输入答案解析",
            trigger: "blur",
          },
        ],
      },
      id: this.$route.query.id,
      fileList: [],
      subjectList: [],
      directoryList: [],
      // directoryList2: [],
      userList: [],
      provinceList: [],
      // cityList: [],
      companyList: [],
      tagList: [],
      // tagList2: [],
      // province: '',
      // city: ''
    };
  },
  computed: {
    direction() {
      return direction;
    },
	/*
	学科和目录,标签三级下拉框相关联,根据学科的subjectID来进行筛选
	*/
    directoryList2() {
      return this.directoryList.filter(
        (item) => item.subjectID === this.formData.subjectID
      );
    },
    tagList2() {
      return this.tagList.filter(
        (item) => item.subjectID === this.formData.subjectID
      );
    },
	//对市级列表进行查找第一个label和表单中province相同的数据返回他的子集,如果没有就返回空数组,添加到区级列表中
    cityList() {
      const res = this.provinceList.find(
        (item) => item.label === this.formData.province
      );
      return res ? res.children : [];
    },
    // checked: {
    // 	set() {
    // 		this.formData.options.forEach((item) => {
    // 			if (this.formData.questionType * 1 === 2) {
    // 				if (this.checked.includes(item.code)) {
    // 					item.isRight = true;
    // 				} else {
    // 					item.isRight = false;
    // 				}
    // 			}
    // 		});
    // 	},
    // 	get() {
    // 		let checked = [];
    // 		if (this.$route.query.id) {
    // 			checked = this.formData.options.filter((item) => item.isRight);
    // 			checked = checked.map((item) => (item = item.code));
    // 		}
    // 		return checked;
    // 	},
    // },
    // checked() {
    // 	let checked = [];
    // 	checked = this.formData.options.filter((item) => item.isRight);
    // 	checked = checked.map((item) => (item = item.code));
    // 	return checked;
    // },
  },
  watch: {
    // province(n, o) {
    //   if (n !== o) {
    //     this.city = ''
    //     this.cityList = []
    //     const res = this.provinceList.find(ele => ele.label === n).children
    //     res.forEach(ele => {
    //       if (ele.value) this.cityList.push(ele)
    //     })
    //   }
    //   this.formData.province = n
    // },
    // city(val) {
    //   this.formData.city = val
    // },
    // checked(val) {
    // 	console.log(val);
    // 	if (this.formData.questionType === 1) {
    // 		this.formData.options.forEach((item) => {
    // 			item.code === val ? (item.isRight = true) : (item.isRight = false);
    // 		});
    // 	} else {
    // 		this.formData.options.forEach((item) => {
    // 			if (val.includes(item.code)) {
    // 				item.isRight = true;
    // 				console.log(item.isRight);
    // 			}
    // 		});
    // 	}
    // },
  },
  async created() {
    await this.getSubjectList();
    await this.getDirectoryslist();
    await this.getTaglist();
    await this.getBgUserList();
    await this.getCompanyList();
	//引入regionData,对regionData进行遍历,如果它有子集且第一个子集不是市辖区的话就遍历它的子集如果有子集的话就添加到列表中;如果子集是市辖区的话就直接加入列表
    regionData.forEach((ele) => {
      if (ele.children && ele.children[0].label !== "市辖区") {
        ele.children.forEach((item) => {
          if (item.value) {
            this.provinceList.push(item);
          }
        });
      }
      if (ele.children && ele.children[0].label === "市辖区") {
        this.provinceList.push({
          value: ele.value,
          label: ele.label,
          children: ele.children[0].children,
        });
      }
    });
    if (this.id) await this.initData();
    if (this.id) {
      //onechecked
    }
  },
  methods: {
    async initData() {
      const res = await getQuestionInfoApi(this.id);
      res.options.sort((a, b) => {
        return a.code.charCodeAt(0) - b.code.charCodeAt(0);
      });
      this.formData = res;
      this.formData.tags = this.formData.tags.split();
	  //判断题型的类型,筛选出选中的选项
      if (+this.formData.questionType === 2) {
        let checked = [];
        checked = this.formData.options.filter((item) => item.isRight);
        checked = checked.map((item) => (item = item.code));
        this.checked = checked;
      } else if (+this.formData.questionType === 1) {
        let checked = this.formData.options.find((item) => {
          // console.log(item.isRight);
          if (item.isRight) {
            return item;
          }
        });
        this.onechecked = checked.code;
      }
    },
    async getSubjectList() {
      const { items } = await getSubjectApi();
      // console.log(res)
      this.subjectList = items;
    },
    async getDirectoryslist() {
      const { items } = await getDirectoryslistApi();
      // console.log(res)
      this.directoryList = items;
    },
    async getTaglist() {
      const { items } = await getTaglistApi();
      // console.log(res)
      this.tagList = items;
    },
    async getBgUserList() {
      const { list } = await getBgUserList();
      this.userList = list;
      // console.log(list)
    },
    async getCompanyList() {
      const { items } = await getCompanyListApi();
      // console.log(res)
      this.companyList = items;
    },
	// 给按钮绑定点击事件,在options列表最后添加选项,首先获取到数组中最后一个元素的索引,用charCodeAt()方法将她的code的第一个字母转换成ASCII码值并加一,再用fromCharCode()方法接收ASCII码值然后再转成字符串赋值给新添加选项的code
    addCheckBox() {
      this.formData.options.push({
        code: String.fromCharCode(
          this.formData.options[
            this.formData.options.length - 1
          ].code.charCodeAt(0) + 1
        ),
        title: "",
        img: "",
        isRight: false,
      });
    },
	//删除点击的那一项,将其转为ASCII码值并++
    delCheckBox(obj) {
      this.formData.options.splice(
        this.formData.options.findIndex((item) => item.code === obj.code),
        1
      );
      if (this.onechecked === obj.code) this.onechecked = "";
      if (this.checked.includes(obj.code)) {
        this.checked.splice(
          this.checked.findIndex((item) => item.code === obj.code),
          1
        );
      }
      let ind = 65;
      this.formData.options.forEach((item) => {
        // console.log(String.fromCharCode(ind++));
        item.code = String.fromCharCode(ind++);
      });
    },
    // changeSelect(val) {
    //   // console.log(val)
    //   const a = []
    //   const b = []
    //   this.directoryList.forEach((item) => {
    //     if (item.subjectID === val) {
    //       a.push(item)
    //     }
    //   })
    //   // console.log(a)
    //   this.directoryList2 = a
    //   this.tagList.forEach((item) => {
    //     if (item.subjectID === val) {
    //       b.push(item)
    //     }
    //   })
    //   this.tagList2 = b
    // },
    async btnOk() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
	  //判断类型,将选中的那一项的isRight赋值为true
      this.formData.options.forEach((item) => {
        if (this.formData.questionType * 1 === 1) {
          if (this.onechecked === item.code) {
            item.isRight = true;
          } else {
            item.isRight = false;
          }
        } else if (this.formData.questionType * 1 === 2) {
          if (this.checked.includes(item.code)) {
            item.isRight = true;
          } else {
            item.isRight = false;
          }
        }
      });

      this.formData.tags = this.formData.tags.toString();
      this.id
        ? await editQuestionApi(this.formData)
        : await addQuestionApi(this.formData);
      this.$message.success(this.id ? "修改成功" : "添加成功");
      this.$router.push("/questions/list");
    },
    handleChange() {},
  },
};
</script>
<style lang="scss" scoped>
.inline {
  display: inline-block;
}
</style>
