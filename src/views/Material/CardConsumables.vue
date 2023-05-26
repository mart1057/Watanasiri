<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="ประเภทวัสดุสิ้นเปลือง *" placeholder="Select" v-model="formItem.material_type">
                        <vs-option v-for="(item, i) in  materialType[0]" :label="item.id" :key="i" :value="item.id">
                            {{ item.attributes.material_type_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="ลักษณะวัสดุสิ้นเปลือง/แผนก *" placeholder="Select"
                        v-model="formItem.metal_shape">
                        <vs-option v-for="(item, i) in  MaterialShape[0]" :label="item.attributes.metal_shape_name" :key="i"
                            :value="item.id">
                            {{ item.attributes.metal_shape_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="ประเภทวัตถุดิบ/ชื่อเฉพาะ *" placeholder="Select"
                        v-model="formItem.material_type2">
                        <vs-option v-for="(item, i) in  materialType[0]" :label="item.id" :key="i" :value="item.id">
                            {{ item.attributes.material_type_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="ลักษณะพิเศษ *" placeholder="Select" v-model="formItem.extra_supplies">
                        <vs-option v-for="(item, i) in  ExtraSupplies[0]" :label="item.attributes.extra_supplies_name"
                            :key="i" :value="item.id">
                            {{ item.attributes.extra_supplies_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-row>
                        <v-col md="11" style="padding-right: 0px;">
                            <vs-select block label="ขนาด Dia/หนา(มม.) *" placeholder="Select"
                                v-model="formItem.material_thickness">
                                <vs-option v-for="(item, i) in MaterialThickness[0]" :label="item.attributes.name" :key="i"
                                    :value="item.id">
                                    {{ item.attributes.name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                            <vs-button style="padding-left: 0px;" transparent color="danger"
                                @click.prevent="dialogDimension = true">
                                <i class="bx bx-plus-circle"></i>
                            </vs-button>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-row>
                        <v-col md="11" style="padding-right: 0px;">
                            <vs-select block label="ความยาว(มม.) *" placeholder="Select" v-model="formItem.material_length">
                                <vs-option v-for="(item, i) in MaterialLength[0]" :label="item.attributes.name" :key="i"
                                    :value="item.id">
                                    {{ item.attributes.name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                            <vs-button style="padding-left: 0px;" transparent color="danger"
                                @click.prevent="dialogLength = true">
                                <i class="bx bx-plus-circle"></i>
                            </vs-button>
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider></v-divider>
            </v-row>
            <v-row>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="text" label="รหัสวัสดุสิ้นเปลือง *" v-model="formItem.supplies_code" />
                </v-col>
                <v-col cols="12" sm="8" md="8">
                    <vs-input type="text" label="ชื่อวัสดุสิ้นเปลือง *" v-model="formItem.supplies_name" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="หน่วย *" placeholder="Select" v-model="formItem.unit">
                        <vs-option v-for="(item, i) in units[0]" :label="item.attributes.unit_name" :key="i"
                            :value="item.id">
                            {{ item.attributes.unit_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="text" label="น้ำหนัก(กก.) *" v-model="formItem.weight" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="text" label="ราคา(บาท) *" v-model="formItem.price" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="date" label="วันที่เซตราคา *" v-model="formItem.date" />
                </v-col>
                <v-col cols="12" sm="1" md="1">
                    <vs-button icon @click="addPrice()">
                        <i class='bx bx-plus'></i>
                    </vs-button>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <vs-table>
                        <template #thead>
                            <vs-tr>
                                <vs-th v-for="(header, i) in headers" :key="i">
                                    {{ header.text }}
                                </vs-th>
                            </vs-tr>
                        </template>
                        <template #tbody>
                            <vs-tr :key="i" v-for="(item, i) in $vs.getPage(items, page, max)" :data="item">
                                <vs-td>{{ i + 1 }}</vs-td>
                                <vs-td>{{ item.attributes.price }}</vs-td>
                                <vs-td>{{ covertDate(item.attributes.date) }}</vs-td>
                                <vs-td>
                                    <vs-button transparent @click.prevent="deletePrice(item.id,i)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </template>
                        <template #footer>
                            <vs-pagination v-model="page" :length="$vs.getLength(items, max)" />
                        </template>
                    </vs-table>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <label>สถานะ *</label>
                    <v-radio-group v-model="formItem.status" row>
                        <v-radio label="เปิด" :value="true"></v-radio>
                        <v-radio label="ปิด" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <div class="footer-dialog pa-0 hotfix">
                <vs-tr class="pa-0">
                    <vs-td><vs-button danger @click="close">ปิดหน้าต่าง</vs-button></vs-td>
                    <vs-td><vs-button @click="saveOrEdit()">บันทึกข้อมูล</vs-button></vs-td>
                </vs-tr>
            </div>
            <v-divider></v-divider>
        </v-container>

        <vs-dialog v-model="dialogDimension">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลความหนา</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="แปลงหน่วยเป็น มม. *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ขนาด *" />
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
                        <vs-td><vs-button danger @click="close">ปิดหน้าต่าง</vs-button></vs-td>
                        <vs-td><vs-button @click="">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog v-model="dialogLength">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลความยาว</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="แปลงหน่วยเป็น มม. *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ขนาด *" />
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
                        <vs-td><vs-button danger @click="close">ปิดหน้าต่าง</vs-button></vs-td>
                        <vs-td><vs-button @click="">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CardConsumables',
    components: {
    },
    props: {
        MsterialId: Number,
        isEdit: Boolean
    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            title: '',
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            dialogDimension: false,
            // dialogWide: false,
            dialogLength: false,
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'index',
                },
                // { text: 'รหัสวัตถุดิบ', value: 'code' },
                { text: 'ราคา(บาท)', value: 'price' },
                { text: 'วันที่เซตราคา', value: 'record_at' },
                // { text: 'ผู้บันทึก', value: 'record_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            formItem: {
                id: '',
                material_thickness: '',
                material_length: '',
                material_type: '',
                material_type2: '',
                supplies_code: '',
                supplies_name: '',
                metal_shape: '',
                extra_supplies: '',
                unit: '',
                weight: '',
                status: true,
                price: '',
                date: '',
            },
            items: [],
            materialType: [],
            units: [],
            MaterialLength: [],
            MaterialWidth: [],
            MaterialThickness: [],
            MaterialEffect: [],
            ExtraSupplies: [],
            MaterialShape: []
        };
    },

    mounted() {
        this.getExtraSuppliesDetail()
        this.getMaterialTypes()
        this.getUnit()
        this.getMaterialLength()
        this.getMaterialWidth()
        this.getMaterialThickness()
        this.getMaterialShape()
        this.getExtraSupplies()
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
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


        //////////////////////// fecth ///////////////////
        getMaterialTypes() {
            fetch(process.env.VUE_APP_BACKEND + 'material-types')
                .then(response => response.json())
                .then((resp) => {
                    this.materialType.push(resp.data)
                }
                );
        },
        getUnit() {
            fetch(process.env.VUE_APP_BACKEND + 'units')
                .then(response => response.json())
                .then((resp) => {
                    // console.log(resp);
                    this.units.push(resp.data)
                }
                );

        },
        getMaterialLength() {
            fetch(process.env.VUE_APP_BACKEND + 'material-lengths')
                .then(response => response.json())
                .then((resp) => {
                    this.MaterialLength.push(resp.data)
                }
                );

        },
        getMaterialWidth() {
            fetch(process.env.VUE_APP_BACKEND + 'material-widths')
                .then(response => response.json())
                .then((resp) => {
                    this.MaterialWidth.push(resp.data)
                }
                );

        },
        getMaterialThickness() {
            fetch(process.env.VUE_APP_BACKEND + 'material-thicknesses')
                .then(response => response.json())
                .then((resp) => {
                    this.MaterialThickness.push(resp.data)
                }
                );

        },
        getExtraSupplies() {
            fetch(process.env.VUE_APP_BACKEND + 'extra-supplies')
                .then(response => response.json())
                .then((resp) => {
                    this.ExtraSupplies.push(resp.data)
                }
                );

        },
        getMaterialShape() {
            fetch(process.env.VUE_APP_BACKEND + 'metal-shapes')
                .then(response => response.json())
                .then((resp) => {
                    this.MaterialShape.push(resp.data)
                }
                );
        },
        covertDate(val) {
            const dateCovert = (new Date(val).toISOString().split("T")[0]).split('-');
            return (dateCovert[2].toString()) + '/' + (dateCovert[1].toString()) + '/' + (dateCovert[0].toString())
        },
        addPrice() {
            if (this.formItem.price != "") {
                this.items.push(
                    {
                        attributes: {
                            price: this.formItem.price,
                            date: this.formItem.date
                        }
                    }
                )
                console.log(this.items);
                this.formItem.date = ''
                this.formItem.price = ''
            }
        },
        deletePrice(id,i){
            axios.delete(process.env.VUE_APP_BACKEND + 'supplie-prices/' + id)
            this.items.splice(i, 1)
        },
        getExtraSuppliesDetail() {
            console.log(this.isEdit);
            if (this.isEdit == true) {
                console.log(this.MsterialId);
                fetch(process.env.VUE_APP_BACKEND + 'supplies/' + 917 + '?populate=*')
                    .then(response => response.json())
                    .then((resp) => {
                        console.log('data: ', resp);
                        this.formItem.supplies_name = resp.data.attributes.supplies_name
                        this.formItem.supplies_code = resp.data.attributes.supplies_code
                        this.formItem.weight = resp.data.attributes.weight
                        this.formItem.material_thickness = resp.data.attributes.material_thickness.data.id
                        this.formItem.material_length = resp.data.attributes.material_length.data.id
                        this.formItem.metal_shape = resp.data.attributes.metal_shape.data.id
                        this.formItem.extra_supplies = resp.data.attributes.extra_supply.data?.id
                        this.formItem.unit = resp.data.attributes.unit.data?.id
                        this.formItem.status = resp.data.attributes.status
                        this.formItem.material_type = resp.data.attributes.material_type.data.id
                        this.formItem.material_type2 = resp.data.attributes.material_type.data.id
                        this.formItem.id = resp.data.id

                        fetch(process.env.VUE_APP_BACKEND + 'supplie-prices?populate=*&filters[supplie][id][$eq]='+917)
                            .then(response => response.json())
                            .then((resp) => {
                                console.log(resp);
                                const arr = []
                                arr.push(resp.data)
                                this.items = arr[0]
                            })
                        console.log(this.items);
                    });
            }
            else {
                this.formItem.supplies_name =''
                this.formItem.supplies_code =''
                this.formItem.weight = ''
                this.formItem.material_thickness = ''
                this.formItem.material_length = ''
                this.formItem.metal_shape = ''
                this.formItem.extra_supplies = ''
                this.formItem.unit = ''
                this.formItem.status = ''
                this.formItem.material_type =''
                this.formItem.material_type2 = ''
                this.formItem.id = ''
            }

            this.dialog = true
        },
        saveOrEdit() {
            if (this.isEdit) {
                console.log('แก้ไข');
                axios.put(process.env.VUE_APP_BACKEND + 'supplies/' +917, {
                    "data": {
                        "supplies_code": this.formItem.supplies_code,
                        "supplies_name": this.formItem.supplies_name,
                        "weight": this.formItem.weight,
                        "status":this.formItem.status,
                        "material_type": this.formItem.material_type,
                        "metal_shape": this.formItem.metal_shape,
                        "extra_supply": this.formItem.extra_supplies,
                        "material_length": this.formItem.material_length,
                        "material_thickness": this.formItem.material_thickness,
                        "unit": this.formItem.unit,
                    }
                })
                    .then((resp) => {
                        console.log(resp.data.data.id);
                        this.items.forEach((data, i) => {
                            console.log(data);
                            axios.post(process.env.VUE_APP_BACKEND + 'supplie-prices', {
                                "data": {
                                    "date": "2023-05-24T18:38:30.147Z",
                                    "price": 0,
                                    "supplie": resp.data.data.id,
                                }
                            })
                            console.log('ยิงครั้งที่: ', i)
                        })
                    })


            }
            else {
                console.log('บันทึก');
                axios.post(process.env.VUE_APP_BACKEND +  'supplies', {
                    "data": {
                        "supplies_code": this.formItem.supplies_code,
                        "supplies_name": this.formItem.supplies_name,
                        "weight": this.formItem.weight,
                        "status":this.formItem.status,
                        "material_type": this.formItem.material_type,
                        "metal_shape": this.formItem.metal_shape,
                        "extra_supply": this.formItem.extra_supplies,
                        "material_length": this.formItem.material_length,
                        "material_thickness": this.formItem.material_thickness,
                        "unit": this.formItem.unit,
                    }
                })
                    .then((resp) => {
                        this.items.forEach((data, i) => {
                            console.log(data);
                            axios.post(process.env.VUE_APP_BACKEND + 'supplie-prices', {
                                "data": {
                                    "date": "2023-05-24T18:38:30.147Z",
                                    "price": 0,
                                    "supplie": resp.data.data.id,
                                }
                            })
                            console.log('ยิงครั้งที่: ', i)
                        })
                    })

            }
            // this.dialog = false
            // console.log(this.formItem);
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