<template>
    <div>
        <v-row>
            <h2>ความหนา</h2>
        </v-row>
        <v-row>
            <v-col md="1">
                <label class="pt-4">คำค้นหา:</label>
            </v-col>
            <v-col md="2">
                <vs-input placeholder="Search" v-model="filter.text" />
            </v-col>
            <v-col md="1">
                <vs-button flat @click="getThicknesses()">ค้นหา</vs-button>
            </v-col>
            <v-col md="3">
                <vs-button transparent @click="filterData()">แสดงทั้งหมด</vs-button>
            </v-col>
            <v-col md="3"></v-col>
            <v-col md="2">
                <vs-button @click.prevent="create(), title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>
        <v-row>
            <h6>จัดการข้อมูลความหนา</h6>
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
                        <vs-td>{{ item.attributes.code }}</vs-td>
                        <vs-td>{{ item.attributes.name }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.attributes.status" @change="changeStatus(item)"/></vs-td>
                        <vs-td>{{ covertDate(item.attributes.createdAt) }}</vs-td>
                        <vs-td>ชัชพล</vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="getThicknessesDetail(item.id), title = 'แก้ไข'">
                                        <i class=" bx bx-edit"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="deleteItem(item.id,i)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <div @click="getThicknesses()">
                         <vs-pagination v-model="page" :length="lengthPage" />
                    </div>
                </template>
            </vs-table>
        </v-row>

        <vs-dialog v-model="dialog">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลความหนา</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="แปลงหน่วยเป็น มม. *" v-model="formItem.code" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ขนาด *" v-model="formItem.name"/>
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
                        <vs-td><vs-button @click="saveOrEdit()">บันทึกข้อมูล</vs-button></vs-td>
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
                    <vs-button @click="deleteItemConfirm()" transparent>
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
    name: 'Thick',
    components: {

    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            lengthPage:'',
            dialog: false,
            dialogDelete: false,
            title: '',
            isEdit: false,
            filter: {
                text: '',
            },
            dialogDelete: false,
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'index',
                },
                { text: 'รหัส', value: 'code' },
                { text: 'ขนาด', value: 'name' },
                { text: 'สถานะ', value: 'status' },
                { text: 'วันที่เซตราคา', value: 'record_at' },
                { text: 'ผู้บันทึก', value: 'record_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [],
            formItem: {
                id: '',
                name: '',
                code: '',
                status: null
            },
        };
    },

    mounted() {
        this.getThicknesses()
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(id, i) {
            console.log(id);
            this.editedIndex = i
            this.deleteIdItem = id
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            console.log(this.editedIndex);
            this.items[0].splice(this.editedIndex, 1)
            axios.delete(process.env.VUE_APP_BACKEND + 'material-thicknesses/' + this.deleteIdItem)
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
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        covertDate(val) {
            const dateCovert = (new Date(val).toISOString().split("T")[0]).split('-');
            return (dateCovert[2].toString()) + '/' + (dateCovert[1].toString()) + '/' + (dateCovert[0].toString())
        },
        getThicknesses() {
            this.items = []
            fetch(process.env.VUE_APP_BACKEND + 'material-thicknesses?populate=*&filters[name][$contains]='+this.filter.text+'&pagination[page]='+this.page+'&pagination[pageSize]=10')
                .then(response => response.json())
                .then((resp) => {
                    this.lengthPage = resp.meta.pagination.pageCount
                    this.items.push(resp.data)
                },
                    console.log(this.items)
                );
        },
        getThicknessesDetail(id) {
            this.isEdit = true
            fetch(process.env.VUE_APP_BACKEND + 'material-thicknesses/' + id)
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    this.formItem.name = resp.data.attributes.name
                    this.formItem.code = resp.data.attributes.code
                    this.formItem.status = resp.data.attributes.status
                    this.formItem.id = resp.data.id
                },
                );
            this.dialog = true
        },
        create() {
            this.isEdit = false
            this.formItem.name = ''
            this.formItem.code = ''
            this.formItem.status = ''
            this.dialog = true
        },
        saveOrEdit() {
            if (this.isEdit == true) {
                axios.put(process.env.VUE_APP_BACKEND + 'material-thicknesses/' + this.formItem.id, {
                    "data": {
                        "code": this.formItem.code,
                        "name": this.formItem.name,
                        "status": this.formItem.status
                    }
                })
            }
            else {
                axios.post(process.env.VUE_APP_BACKEND + 'material-thicknesses', {
                    "data": {
                        "code": this.formItem.code,
                        "name": this.formItem.name,
                        "status": this.formItem.status
                    }
                })
                this.items[0].push(
                    {

                        attributes: {
                            code: this.formItem.code,
                            name: this.formItem.name,
                            status: this.formItem.status
                        },
                        id: this.formItem.id
                    }
                )
                console.log(this.items)
                this.dialog = false
            }
        },
        changeStatus(data) {
            axios.put(process.env.VUE_APP_BACKEND + 'material-thicknesses/' + data.id, {
                "data": {
                    "status": data.attributes.status,
                }
            })
            this.dialog = false
        },
        filterData() {
            this.page = 1
            this.filter.text = ''
            this.getThicknesses()
            console.log(this.filter);
        },
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