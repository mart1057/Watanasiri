<template>
    <div>
        <v-row>
            <h2>วัสดุสิ้นเปลือง</h2>
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
                <vs-button @click.prevent="dialog = true, isEdit=false, title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>
        <v-row>
            <h6>จัดการข้อมูลวัสดุสิ้นเปลือง</h6>
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
                        <vs-td>{{ item.attributes.material_type.data?.attributes.material_type_name }}</vs-td>
                        <vs-td>{{ item.attributes.metal_shape.data?.attributes.metal_shape_name }}</vs-td>
                        <vs-td>{{ item.attributes.extra_supply.data == null ? '-': item.attributes.extra_supply.data.attributes.extra_supplies_name }}</vs-td>
                        <!-- <td>ลักษณะพิเศษของโลหะ</td> -->
                        <vs-td>{{ item.attributes.material_thickness.data?.attributes.name }}</vs-td>
                        <!-- <vs-td>{{ item.attributes.material_width.data?.attributes.name }}</vs-td> -->
                        <vs-td>{{ item.attributes.material_length.data?.attributes.name }}</vs-td>
                        <vs-td>{{ item.attributes.supplies_code }}</vs-td>
                        <vs-td>{{ item.attributes.supplies_name }}</vs-td>
                        <vs-td> {{ item.attributes.unit.data == null ? '-':item.attributes.unit.data.attributes.unit_name }}</vs-td>
                        <vs-td>{{ item.attributes.weight }}</vs-td>
                        <vs-td>{{ item.attributes.supplie_prices.data[0]?.attributes.price }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.attributes.status" @change="changeStatus(item)"/></vs-td>
                        <vs-td>{{ item.attributes.updatedAt == null ? '-': covertDate(item.attributes.updatedAt) }}</vs-td>
                        <vs-td>ชัชพล</vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="editItem(item), title = 'แก้ไข'">
                                        <i class=" bx bx-edit"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="deleteItem(item.id)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <div @click="getSupplieslList()">
                         <vs-pagination v-model="page" :length="lengthPage" />
                    </div>
                </template>
            </vs-table>
        </v-row>

        <vs-dialog v-model="dialog">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลวัสดุสิ้นเปลือง</h4>
            </template>
            <div class="con-form">
                <CardConsumables :MsterialId="id_material" :isEdit="isEdit" />
            </div>
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
import CardConsumables from "@/views/Material/CardConsumables.vue";
import axios from 'axios'
export default {
    name: 'Consumables',
    components: {
        CardConsumables,
    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            lengthPage:'',
            dialog: false,
            dialogDelete: false,
            deleteIdItem:'',
            title: '',
            id_material:'',
            isEdit:false,
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'index',
                },
                { text: 'ประเภทวัตถุดิบ', value: 'type' },
                { text: 'รูปร่างโลหะ', value: 'shape' },
                { text: 'ลักษณะพิเศษของโลหะ', value: 'specialType' },
                { text: 'ขนาด Dia/หนา(มม.)', value: 'dimension' },
                { text: 'ความยาว(มม.)', value: 'length' },
                { text: 'รหัสวัตถุดิบ', value: 'code' },
                { text: 'ชื่อวัตถุดิบ', value: 'name' },
                { text: 'หน่วย', value: 'unit' },
                { text: 'น้ำหนัก(กก.)', value: 'weight' },
                { text: 'ราคา(บาท)', value: 'price' },
                { text: 'สถานะ', value: 'status' },
                { text: 'วันที่เซตราคา', value: 'record_at' },
                { text: 'ผู้บันทึก', value: 'record_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [
                // {
                //     code: 'Lollipop',
                //     name: 'Lollipop',
                //     type: 392,
                //     specialType: 0.2,
                //     shape: 98,
                //     dimension: 0,
                //     wide: 2,
                //     length: 2,
                //     unit: 2,
                //     weight: 2,
                //     area: 2,
                //     price: 2,
                //     status: 2,
                //     record_at: 2,
                //     remark: 2,
                //     record_by: 2,
                // },
            ],
        };
    },

    mounted() {
        this.getSupplieslList()

    },

    methods: {
        editItem(item) {
            this.isEdit =  true
            this.id_material = item.id
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(id) {
            this.deleteIdItem = id
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            axios.delete(process.env.VUE_APP_BACKEND + 'supplies/' + this.deleteIdItem)
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
        covertDate(val){
            const dateCovert = (new Date(val).toISOString().split("T")[0]).split('-');
            return (dateCovert[2].toString())+'/'+(dateCovert[1].toString())+'/'+(dateCovert[0].toString())
        },

        ////////////////////////////////// fetch ///////////////////////
        getSupplieslList() {
            this.items = []
            fetch(process.env.VUE_APP_BACKEND + 'supplies?populate=*&pagination[page]='+this.page+'&pagination[pageSize]=10')
                .then(response => response.json())
                .then(resp => {
                    this.lengthPage = resp.meta.pagination.pageCount
                    this.items.push(resp.data)
                });
            console.log(this.items);
        },
        changeStatus(data){
                axios.put(process.env.VUE_APP_BACKEND + 'supplies/' + data.id, {
                    "data": {
                        "status": data.attributes.status,
                    }
                })
            console.log(data.attributes.status,data.id);
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