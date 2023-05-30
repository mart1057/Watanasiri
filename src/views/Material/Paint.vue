<template>
    <div>
        <v-row>
            <h2>ข้อมูลวัตถุดิบทำสี</h2>
        </v-row>
        <v-row>
            <v-col md="1">
                <label class="pt-4">คำค้นหา:</label>
            </v-col>
            <v-col md="2">
                <vs-input placeholder="Search" />
            </v-col>
            <v-col md="1">
                <vs-button flat>ค้นหา</vs-button>
            </v-col>
            <v-col md="3">
                <vs-button transparent>แสดงทั้งหมด</vs-button>
            </v-col>
            <v-col md="3"></v-col>
            <v-col md="2">
                <vs-button @click.prevent="create(), title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>
        <v-row>
            <h6>ข้อมูลวัตถุดิบทำสี</h6>
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
                        <vs-td>{{ item.attributes.paint_material_code }}</vs-td>
                        <vs-td>{{ item.attributes.paint_material_name }}</vs-td>
                        <vs-td>{{ item.attributes.material_type.data.attributes.material_type_name }}</vs-td>
                        <vs-td>{{ item.attributes.qty }}</vs-td>
                        <vs-td>{{ item.attributes.price }}</vs-td>
                        <vs-td>{{ item.attributes.cost_type.data.attributes.cost_type_name }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.attributes.status"
                                @change="changeStatus(item)" /></vs-td>
                        <vs-td>{{ covertDate(item.attributes.createdAt) }}</vs-td>
                        <vs-td>ชัชพล</vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="getPaintDetail(item.id), title = 'แก้ไข'">
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
                    <div @click="getPaint()">
                         <vs-pagination v-model="page" :length="lengthPage" />
                    </div>
                </template>
            </vs-table>
        </v-row>

        <vs-dialog v-model="dialog">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลวัตถุดิบทำสี</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="รหัสวัตถุดิบ *" v-model="formItem.code" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ชื่อวัตถุดิบทำสี *" v-model="formItem.name" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-select block label="ประเภทวัตถุดิบ *" placeholder="Select" v-model="formItem.type">
                                <vs-option v-for="(item, i) in  MaterialTypes[0]"
                                    :label="item.attributes.material_type_name" :key="i" :value="item.id">
                                    {{ item.attributes.material_type_name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-select block label="ประเภทต้นทุน *" placeholder="Select" v-model="formItem.cost">
                                <vs-option v-for="(item, i) in CostType[0]" :label="item.attributes.cost_type_name" :key="i"
                                    :value="item.id">
                                    {{ item.attributes.cost_type_name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ทำสี (หน้า) *" v-model="formItem.colorsPage" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ราคา ตรม. ละ (บาท) *" v-model="formItem.price" />
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
import CardPaint from "@/views/Material/CardPaint.vue";
import axios from 'axios'
export default {
    name: 'Paint',
    components: {
        CardPaint,
    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            dialog: false,
            dialogDelete: false,
            isEdit: false,
            lengthPage:'',
            deleteIdItem: '',
            title: '',
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'index',
                },
                { text: 'รหัสวัตถุดิบ', value: 'code' },
                { text: 'ชื่อวัตถุดิบทำสี', value: 'name' },
                { text: 'ประเภทวัตถุดิบ', value: 'type' },
                { text: 'ทำสี(หน้า)', value: 'side' },
                { text: 'ราคา ตรม. ละ(บาท)', value: 'price' },
                { text: 'ประเภทต้นทุน', value: 'costType' },
                { text: 'สถานะ', value: 'status' },
                { text: 'วันที่เซตราคา', value: 'record_at' },
                { text: 'ผู้บันทึก', value: 'record_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [],
            formItem: {
                code: '',
                name: '',
                colorsPage: '',
                price: '',
                id: '',
                status: '',
                cost: '',
                type: ''
            },
            MaterialTypes: [],
            CostType: [],
        };
    },

    mounted() {
        this.getMaterialTypes()
        this.getCostTypes()
        this.getPaint()
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
            axios.delete(process.env.VUE_APP_BACKEND + 'paint-materials/' + this.deleteIdItem)
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
        getMaterialTypes() {
            this.items = []
            fetch(process.env.VUE_APP_BACKEND + 'material-types')
                .then(response => response.json())
                .then((resp) => {
                    
                    console.log(resp);
                    this.MaterialTypes.push(resp.data)
                },
                );
        },
        getCostTypes() {
            fetch(process.env.VUE_APP_BACKEND + 'cost-types')
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    this.CostType.push(resp.data)
                },
                );
        },
        getPaint() {
            fetch(process.env.VUE_APP_BACKEND + 'paint-materials?populate=*&pagination[page]='+this.page+'&pagination[pageSize]=10')
                .then(response => response.json())
                .then((resp) => {
                    this.lengthPage = resp.meta.pagination.pageCount
                    console.log(resp);
                    this.items.push(resp.data)
                },
                    console.log(this.items)
                );
        },
        getPaintDetail(id) {
            this.isEdit = true
            fetch(process.env.VUE_APP_BACKEND + 'paint-materials/' + id + '?populate=*')
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    this.formItem.name = resp.data.attributes.paint_material_name
                    this.formItem.code = resp.data.attributes.paint_material_code
                    this.formItem.status = resp.data.attributes.status
                    this.formItem.id = resp.data.id
                    this.formItem.colorsPage = resp.data.attributes.qty
                    this.formItem.price = resp.data.attributes.price
                    this.formItem.type = resp.data.attributes.material_type.data.id
                    this.formItem.cost = resp.data.attributes.cost_type.data.id
                });

            this.dialog = true
        },
        create() {
            this.isEdit = false
            this.formItem.name = ''
            this.formItem.code = ''
            this.formItem.status = ''
            this.formItem.id = ''
            this.formItem.colorsPage = ''
            this.formItem.price = ''
            this.formItem.type = ''
            this.formItem.cost = ''
            this.dialog = true
        },
        saveOrEdit() {
            if (this.isEdit == true) {
                axios.put(process.env.VUE_APP_BACKEND + 'paint-materials/' + this.formItem.id, {
                    "data": {
                        "paint_material_code": this.formItem.code,
                        "paint_material_name": this.formItem.name,
                        "material_type": this.formItem.type,
                        "qty": parseInt(this.formItem.colorsPage),
                        "price": parseInt(this.formItem.price),
                        "status": this.formItem.status,
                        "cost_type": this.formItem.cost
                    }
                })
            }
            else {
                axios.post(process.env.VUE_APP_BACKEND + 'paint-materials', {
                    "data": {
                        "paint_material_code": this.formItem.code,
                        "paint_material_name": this.formItem.name,
                        "material_type": this.formItem.type,
                        "qty": parseInt(this.formItem.colorsPage),
                        "price": parseInt(this.formItem.price),
                        "status": this.formItem.status,
                        "cost_type": this.formItem.cost
                    }
                })
                this.items[0].push(
                    {
                        attributes: {
                            paint_material_code: this.formItem.code,
                            paint_material_name: this.formItem.name,
                            material_type: this.formItem.type,
                            qty: parseInt(this.formItem.colorsPage),
                            price: parseInt(this.formItem.price),
                            status: this.formItem.status,
                            cost_type: this.formItem.cost
                        },
                        id: this.formItem.id
                    }
                )
                console.log(this.items)
                this.dialog = false
            }
        },
        changeStatus(data) {
            axios.put(process.env.VUE_APP_BACKEND + 'paint-materials/' + data.id, {
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