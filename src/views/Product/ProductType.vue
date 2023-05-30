<template>
    <div>
        <v-row>
            <h2>ประเภทสินค้า</h2>
        </v-row>
        <v-row>
            <v-col md="1">
                <label class="pt-4">คำค้นหา:</label>
            </v-col>
            <v-col md="2">
                <vs-input placeholder="Search" v-model="filter.text" />
            </v-col>
            <v-col md="1">
                <vs-button flat @click="getProducTypetList()">ค้นหา</vs-button>
            </v-col>
            <v-col md="3">
                <vs-button transparent @click="filterData()">แสดงทั้งหมด</vs-button>
            </v-col>
            <v-col md="3"></v-col>
            <v-col md="2">
                <vs-button @click.prevent="createProduct(), title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>

        <v-row>
            <h6>จัดการข้อมูล ประเภทสินค้า</h6>
        </v-row>
        <v-row>
            <vs-table>
                <template #thead>
                    <vs-tr>
                        <vs-th v-for="(header, i) in headers" :key="i">
                            {{ header.text }}
                        </vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr :key="i" v-for="(item, i) in items[0]" :data="item">
                        <vs-td>{{(i+1)+max*(page-1)}}</vs-td>
                        <vs-td>{{ item.attributes.product_cate_code }}</vs-td>
                        <vs-td>{{ item.attributes.product_cate_name }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.attributes.status"  @change="changeStatus(item)" /></vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="getProductTypeDetail(item.id,i), title = 'แก้ไข'">
                                        <i class=" bx bx-edit"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="deleteItem(i, item.id)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <div @click="getProducTypetList()">
                         <vs-pagination v-model="page" :length="lengthPage" />
                    </div>
                </template>
            </vs-table>
        </v-row>

        <vs-dialog v-model="dialog">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลประเภทสินค้า</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="รหัสประเภทสินค้า *" v-model="formItem.code" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ชื่อประเภทสินค้า *" v-model="formItem.name" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <label>สถานะ *</label>
                            <v-radio-group v-model="formItem.status" row>
                                <v-radio label="เปิด" :value="true"></v-radio>
                                <v-radio label="ปิด" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <template #footer>
                <div class="footer-dialog pa-0">
                    <vs-tr class="pa-0">
                        <vs-td><vs-button danger @click="close">ปิดหน้าต่าง</vs-button></vs-td>
                        <vs-td><vs-button @click="saveOrEditProduct()">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog width="550px" not-center v-model="dialogDelete">
            <template #header>
                <h4 class="not-margin">
                    ต้องการลบข้อมูลนี้ ใช่หรือไม่?
                </h4>
            </template>
            <template #footer>
                <div class="con-footer">
                    <vs-button transparent @click="deleteItemConfirm()">
                        Ok
                    </vs-button>
                    <vs-button dark transparent>
                        Cancel
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductType',
    components: {

    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            title: '',
            lengthPage:'',
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            row: null,
            dialog: false,
            deleteIdItem: '',
            dialogDelete: false,
            is_edit: false,
            formItem: {
                id: '',
                code: '',
                name: '',
                status: '',
            },
            filter: {
                text: '',
            },
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'index',
                },
                { text: 'รหัสประเภทสินค้า', value: 'code' },
                { text: 'ชื่อประเภทสินค้า', value: 'name' },
                { text: 'สถานะ', value: 'status' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [],
        };
    },

    mounted() {
        this.getProducTypetList();
    },

    methods: {


        getProducTypetList() {
            this.items = []
            fetch(process.env.VUE_APP_BACKEND + 'product-categories?populate=*&filters[product_cate_name][$contains]='+this.filter.text+'&pagination[page]='+this.page+'&pagination[pageSize]=10')
                .then(response => response.json())
                .then(resp => {
                    this.lengthPage = resp.meta.pagination.pageCount
                   this.items.push(resp.data) 
                });
            console.log(this.items);
        },
        getProductTypeDetail(id,i) {
            console.log(i);
            this.is_edit = true
            fetch(process.env.VUE_APP_BACKEND + 'product-categories/' + id)
                .then(response => response.json())
                .then((resp) => {
                    this.formItem.name = resp.data.attributes.product_cate_name
                    this.formItem.status = resp.data.attributes.status
                    this.formItem.code = resp.data.attributes.product_cate_code
                    this.formItem.id = resp.data.id
                });
            this.dialog = true
        },

        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        createProduct() {
            this.is_edit = false
            this.formItem.name = ''
            this.formItem.status = ''
            this.formItem.code = ''
            this.dialog = true
        },

        deleteItem(i, id) {
            console.log(id);
            this.editedIndex = i
            this.deleteIdItem = id
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            console.log(this.editedIndex);
            this.items[0].splice(this.editedIndex, 1)
            axios.delete(process.env.VUE_APP_BACKEND + 'product-categories/' + this.deleteIdItem)
            this.closeDelete()
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        saveOrEditProduct() {
            if (this.is_edit == true) {
                console.log(this.formItem.id);
                axios.put(process.env.VUE_APP_BACKEND + 'product-categories/' + this.formItem.id, {
                    "data": {
                        "product_cate_code": this.formItem.code,
                        "product_cate_name": this.formItem.name,
                        "status": this.formItem.status
                    }
                })
                this.dialog = false
                console.log('Edit')
                window.location.reload()
                
            }
            else {
                console.log('Save')
                console.log(this.formItem.code);
                console.log(this.formItem.name);
                console.log(this.formItem.status);
                axios.post(process.env.VUE_APP_BACKEND + 'product-categories/', {
                    "data": {
                        "product_cate_code": this.formItem.code,
                        "product_cate_name": this.formItem.name,
                        "status": this.formItem.status
                    }
                })
                    .then((response) => {
                        
                        this.formItem.id = response.data.data.id
                        console.log( this.formItem.id);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.items[0].push({
                    attributes: {
                        product_cate_code: this.formItem.code,
                        product_cate_name: this.formItem.name,
                        status: this.formItem.status,
                        createdAt: null,
                        updatedAt: null,
                    },
                    id: this.formItem.id
                })
                console.log(this.items);
                this.dialog = false
            }
        },
        filterData() {
            this.page = 1
            this.filter.text = ''
            this.getProducTypetList()
            console.log(this.filter);
        },
        changeStatus(data){
                axios.put(process.env.VUE_APP_BACKEND + 'product-categories/' + data.id, {
                    "data": {
                        "status": data.attributes.status,
                    }
                })
                this.dialog = false
        }
    },
};
</script>

<style lang="stylus">
  getColor(vsColor, alpha = 1)
      unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
  getVar(var)
      unquote("var(--vs-"+var+")")
  .con-footer
    display flex
    align-items center
    justify-content flex-end
    .vs-button
      margin 0px
      .vs-button__content
        padding 10px 30px
      ~ .vs-button
        margin-left 10px
  .not-margin
    margin 0px
    font-weight normal
    padding 10px
    padding-bottom 0px
  .con-content
    width 100%
    p
      font-size .8rem
      padding 0px 10px
    .vs-checkbox-label
      font-size .8rem
    .vs-input-parent
      width 100%
    .vs-input-content
      margin 10px 0px
      width calc(100%)
      .vs-input
        width 100%
  .footer-dialog
    display flex
    align-items center
    justify-content center
    flex-direction column
    width calc(100%)
    .new
      margin 0px
      margin-top 20px
      padding: 0px
      font-size .7rem
      a
        color getColor('primary') !important
        margin-left 6px
        &:hover
          text-decoration underline
    .vs-button
      margin 0px
  </style>