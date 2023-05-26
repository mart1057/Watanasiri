<template>
    <div>
        <v-row>
            <h2>ค่าแรง</h2>
        </v-row>
        <v-row>
            <v-col md="1">
                <label class="pt-4">คำค้นหา:</label>
            </v-col>
            <v-col md="2">
                <vs-input placeholder="Search" v-model="filter.text" />
            </v-col>
            <v-col md="1">
                <vs-button flat @click="filterData()">ค้นหา</vs-button>
            </v-col>
            <v-col md="3">
                <vs-button transparent>แสดงทั้งหมด</vs-button>
            </v-col>
            <v-col md="3"></v-col>
            <v-col md="2">
                <vs-button @click.prevent="createLabor(), title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>
        <v-row>
            <h6>จัดการข้อมูลค่าแรง</h6>
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
                    <vs-tr :key="i" v-for="(item, i) in $vs.getPage(items[0], page, max)" :data="item">
                        <vs-td>{{ i + 1 }}</vs-td>
                        <vs-td>{{ item.attributes.labor_code }}</vs-td>
                        <vs-td>{{ item.attributes.labor_name }}</vs-td>
                        <vs-td>{{ item.attributes.labor_type.data.attributes.labor_type_name }}</vs-td>
                        <vs-td>{{ item.attributes.unit.data.attributes.unit_name }}</vs-td>
                        <vs-td>{{ item.attributes.price }}</vs-td>
                        <vs-td>{{ item.attributes.cost_type.data == null ? '-' : item.attributes.cost_type.data.id
                        }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.attributes.status" @change="changeStatus(item)"/></vs-td>
                        <vs-td>{{ item.attributes.updatedA == null ? '-' : item.attributes.updatedA }}</vs-td>
                        <vs-td>ชัชพล</vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="getLaborDetail(item.id), title = 'แก้ไข'">
                                        <i class=" bx bx-edit"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="deleteItem(item.id, i)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <vs-pagination v-model="page" :length="$vs.getLength(items, max)" />
                </template>
            </vs-table>
        </v-row>

        <vs-dialog v-model="dialog">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลค่าแรง</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="รหัสค่าแรง *" v-model="formItem.code" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ชื่อค่าแรง *" v-model="formItem.name" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-select block label="ประเภทค่าแรง *" placeholder="Select" v-model="formItem.type_job">
                                <vs-option v-for="(item, i) in laborTypes[0]" :label="item.attributes.labor_type_name"
                                    :key="i" :value="item.id">
                                    {{ item.attributes.labor_type_name }}
                                </vs-option>
                            </vs-select>
                            <!-- <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger"
                                        @click.prevent="dialogCardType = true">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col> -->
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-select block label="หน่วยนับ *" placeholder="Select" v-model="formItem.unit">
                                <vs-option v-for="(item, i) in units[0]" :label="item.attributes.unit_name" :key="i"
                                    :value="item.id">
                                    {{ item.attributes.unit_name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="number" label="ราคา" v-model="formItem.price" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6" style="padding-top: 20px;">
                            <vs-select block label="ประเภทต้นทุน *" placeholder="Select" v-model="formItem.type">
                                <vs-option v-for="(item, i) in costTypes[0]" :label="item.attributes.cost_type_name"
                                    :key="i" :value="item.id">
                                    {{ item.attributes.cost_type_name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <label>สถานะ *</label>
                            <v-radio-group v-model="formItem.status" row>
                                <v-radio label="เปิด" :value="true"></v-radio>
                                <v-radio label="ปิด" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
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
                    <vs-button transparent @click="deleteItemConfirm()">
                        Ok
                    </vs-button>
                    <vs-button dark transparent>
                        Cancel
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog v-model="dialogCardType">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลค่าแรง</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="รหัสประเภทค่าแรง *" readonly />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ชื่อประเภทค่าแรง *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <label>สถานะ *</label>
                            <v-radio-group v-model="row" row>
                                <v-radio label="เปิด" value="on"></v-radio>
                                <v-radio label="ปิด" value="off"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <template #footer>
                <div class="footer-dialog pa-0">
                    <vs-tr class="pa-0">
                        <vs-td><vs-button danger @click="dialogCardType = false">ปิดหน้าต่าง</vs-button></vs-td>
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LaborIndex',
    components: {
    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            dialog: false,
            dialogDelete: false,
            dialogCardType: false,
            title: '',
            is_edit: false,
            deleteIdItem: '',
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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
                { text: 'รหัสค่าแรง', value: 'code' },
                { text: 'ชื่อค่าแรง', value: 'name' },
                { text: 'ประเภทค่าแรง', value: 'type' },
                { text: 'หน่วย', value: 'unit' },
                { text: 'ราคา', value: 'price' },
                { text: 'ประเภทต้นทุน', value: 'costType' },
                { text: 'สถานะ', value: 'status' },
                { text: 'วันที่บันทึกข้อมูล', value: 'record_at' },
                { text: 'ผู้บันทึก', value: 'record_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            formItem: {
                code: '',
                name: '',
                type: '',
                type_job: '',
                price: 0,
                unit: '',
                status: true,
                id: ''
            },
            items: [],
            costTypes: [],
            laborTypes: [],
            units: [],
            // prices:[],
        };
    },

    mounted() {
        this.getLaborList()
        this.getCostTypes()
        this.getLaborTypes()
        this.getUnit();
        this.getProductPrice();
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(id, i) {
            this.editedIndex = i
            this.deleteIdItem = id
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            // this.items[0].splice(this.editedIndex, 1)
            axios.delete(process.env.VUE_APP_BACKEND + 'labors/' + this.deleteIdItem)
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
        createLabor() {
            this.formItem.name = ""
            this.formItem.code = ""
            this.formItem.price = ""
            this.formItem.type_job = ""
            this.formItem.unit = ""
            this.formItem.status = ""
            this.formItem.id = ""
            this.formItem.type = ""
            this.dialog = true
        },

        ////////////////////////// Fetch //////////////////////////
        getLaborList() {
            fetch(process.env.VUE_APP_BACKEND + 'labors?populate=*')
                .then(response => response.json())
                .then(resp => this.items.push(resp.data));
            console.log(this.items);
        },
        getLaborDetail(id) {
            console.log(id);
            this.is_edit = true
            fetch(process.env.VUE_APP_BACKEND + 'labors/' + id + '?populate=*')
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    this.formItem.name = resp.data.attributes.labor_name
                    this.formItem.code = resp.data.attributes.labor_code
                    this.formItem.price = resp.data.attributes.price
                    this.formItem.type_job = resp.data.attributes.labor_type.data.id
                    this.formItem.unit = resp.data.attributes.unit.data.id
                    this.formItem.status = resp.data.attributes.status
                    this.formItem.id = resp.data.id
                    this.formItem.type = resp.data.attributes.cost_type.data.id
                    console.log(this.formItem.status);

                });

            this.dialog = true
        },
        getCostTypes() {
            fetch(process.env.VUE_APP_BACKEND + 'cost-types')
                .then(response => response.json())
                .then(resp => this.costTypes.push(resp.data));
            console.log('1', this.costTypes);
        },
        getLaborTypes() {
            fetch(process.env.VUE_APP_BACKEND + 'labor-types')
                .then(response => response.json())
                .then(resp => this.laborTypes.push(resp.data));
            console.log('2', this.laborTypes);
        },
        getUnit() {
            fetch(process.env.VUE_APP_BACKEND + 'units')
                .then(response => response.json())
                .then((resp) => {
                    this.units.push(resp.data)
                }
                );
        },
        saveOrEdit() {
            console.log(this.formItem.id);
            if (this.is_edit == true) {
                axios.put(process.env.VUE_APP_BACKEND + 'labors/' + this.formItem.id, {
                    "data": {
                        "labor_code": this.formItem.code,
                        "labor_name": this.formItem.name,
                        "price": this.formItem.price,
                        "status": this.formItem.status,
                        "labor_type": this.formItem.type,
                        "unit": this.formItem.unit,
                        "cost_type": this.formItem.type_job
                    }
                })
                this.dialog = false
                console.log('Edit')
                // window.location.reload()
            }
            else {
                axios.post(process.env.VUE_APP_BACKEND + 'labors', {
                    "data": {

                        "labor_code": this.formItem.code,
                        "labor_name": this.formItem.name,
                        "price": this.formItem.price,
                        "status": this.formItem.status,
                        "labor_type": this.formItem.type,
                        "unit": this.formItem.unit,
                        "cost_type": this.formItem.type_job

                    }
                })
                this.dialog = false
            }


        },
        filterData() {
            console.log(this.filter);
        },
        changeStatus(data){
                console.log(this.formItem.id);
                axios.put(process.env.VUE_APP_BACKEND + 'labors/' + data.id, {
                    "data": {
                        "status": data.attributes.status,
                    }
                })
            console.log(data.attributes.status,data.id);
        }
        // getProductPrice(){
        //     fetch(process.env.VUE_APP_BACKEND + 'product-prices')
        //         .then(response => response.json())
        //         .then((resp) => {
        //             this.prices.push(resp.data)
        //         }
        //         );
        // }
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