<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="ประเภทวัตถุดิบ *" placeholder="Select" v-model="formItem.material_type">
                        <vs-option v-for="(item, i) in  materialType[0]" :label="item.id" :key="i" :value="item.id">
                            {{ item.attributes.material_type_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="รูปร่างโลหะ *" placeholder="Select" v-model="formItem.metal_shape">
                        <vs-option v-for="(item, i) in  MaterialShape[0]" :label="item.attributes.metal_shape_name" :key="i"
                            :value="item.id">
                            {{ item.attributes.metal_shape_name }}
                        </vs-option>
                    </vs-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-select block label="ลักษณะพิเศษของโลหะ *" placeholder="Select" v-model="formItem.metal_effect">
                        <vs-option v-for="(item, i) in  MaterialEffect[0]" :label="item.attributes.metal_effects_name"
                            :key="i" :value="item.id">
                            {{ item.attributes.metal_effects_name }}
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
                            <vs-select block label="ความกว้าง(มม.) *" placeholder="Select"
                                v-model="formItem.material_width">
                                <vs-option v-for="(item, i) in MaterialWidth[0]" :label="item.attributes.name" :key="i"
                                    :value="item.id">
                                    {{ item.attributes.name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                            <vs-button style="padding-left: 0px;" transparent color="danger"
                                @click.prevent="dialogWide = true">
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
                    <vs-input type="text" label="รหัสวัตถุดิบ *" v-model="formItem.raw_material_code" />
                </v-col>
                <v-col cols="12" sm="8" md="8">
                    <vs-input type="text" label="ชื่อวัตถุดิบ *" v-model="formItem.raw_material_name" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-col md="11" style="padding-left: 0px;">
                        <vs-select block label="หน่วย *" placeholder="Select" v-model="formItem.unit">
                            <vs-option v-for="(item, i) in units[0]" :label="item.attributes.unit_name" :key="i"
                                :value="item.id">
                                {{ item.attributes.unit_name }}
                            </vs-option>
                        </vs-select>
                    </v-col>
                    <!-- <vs-input type="text" label="หน่วย *" v-model="formItem.unit" /> -->
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="text" label="น้ำหนัก(กก.) *" v-model="formItem.weight" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="text" label="พื้นที่(ตรม.) *" v-model="formItem.area" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="text" label="ราคา(บาท) *" v-model="formItem.price" />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <vs-input type="date" label="วันที่เซตราคา *" v-model="formItem.date" />
                </v-col>
                <v-col cols="12" sm="8" md="8">
                    <label>หมายเหตุ *</label>
                    <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="formItem.remark"></b-form-textarea>
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
                            <vs-tr :key="i" v-for="(item, i) in items" :data="item">
                                <vs-td>{{(i+1)+max*(page-1)}}</vs-td>
                                <vs-td>{{ item.attributes.price }}</vs-td>
                                <vs-td>{{ item.attributes.remark }}</vs-td>
                                <vs-td>{{ covertDate(item.attributes.date) }}</vs-td>
                                <vs-td>
                                    <vs-button transparent @click.prevent="deletePrice(item.id,i)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </template>
                        <template #footer>
                    <div @click="getMaterialDetail()">
                         <vs-pagination v-model="page" :length="lengthPage" />
                    </div>
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
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog v-model="dialogWide">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลความกว้าง</h4>
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
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CardMaterial',
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
            title: '',
            lengthPage:'',
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            selected: '',
            dialogDimension: false,
            dialogWide: false,
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
                { text: 'หมายเหตุ', value: 'remark' },
                { text: 'วันที่เซตราคา', value: 'record_at' },
                // { text: 'ผู้บันทึก', value: 'record_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            formItem: {
                id: '',
                weight: 0,
                area: 0,
                material_width: '',
                material_thickness: '',
                material_length: '',
                material_type: '',
                raw_material_code: '',
                raw_material_name: '',
                metal_shape: '',
                metal_effect: '',
                unit: '',
                status: true,
                price: '',
                date: '',
                remark: ''
            },
            items: [
                // {
                //     code: "M001",
                //     price: "10",
                //     remark: "",
                //     record_at: "",
                //     record_by: "",
                // },
            ],
            materialType: [],
            units: [],
            MaterialLength: [],
            MaterialWidth: [],
            MaterialThickness: [],
            MaterialEffect: [],
            MaterialShape: []
        };
    },

    mounted() {
        this.getMaterialDetail()
        this.getMaterialTypes()
        this.getUnit()
        this.getMaterialLength()
        this.getMaterialWidth()
        this.getMaterialThickness()
        this.getMaterialShape()
        this.getMaterialEffect()
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

        getMaterialDetail() {
            if (this.isEdit == true) {
                console.log(this.MsterialId);
                fetch(process.env.VUE_APP_BACKEND + 'materials/' + this.MsterialId+ '?populate=*')
                    .then(response => response.json())
                    .then((resp) => {
                        console.log(resp);
                        this.formItem.raw_material_name = resp.data.attributes.raw_material_name
                        this.formItem.raw_material_code = resp.data.attributes.raw_material_code
                        this.formItem.weight = resp.data.attributes.weight
                        this.formItem.area = resp.data.attributes.area
                        this.formItem.material_width = resp.data.attributes.material_width.data?.id
                        this.formItem.material_thickness = resp.data.attributes.material_thickness.data?.id
                        this.formItem.material_length = resp.data.attributes.material_length.data?.id
                        this.formItem.metal_shape = resp.data.attributes.metal_shape.data.id
                        this.formItem.metal_effect = resp.data.attributes.metal_effect.data?.id
                        // this.formItem.price = resp.data.attributes.price
                        this.formItem.unit = resp.data.attributes.unit.data?.id
                        this.formItem.status = resp.data.attributes.status
                        this.formItem.material_type = resp.data.attributes.material_type.data?.id
                        this.formItem.id = resp.data.id
                        // console.log(this.formItem.status);

                        fetch(process.env.VUE_APP_BACKEND + 'material-prices?populate=*&filters[raw_material][id][$eq]=' + this.MsterialId+'&pagination[page]='+this.page+'&pagination[pageSize]=5')
                            .then(response => response.json())
                            .then((resp) => {
                                const arr = []
                                this.lengthPage = resp.meta.pagination.pageCount
                                arr.push(resp.data)
                                this.items = arr[0]
                            })
                        console.log(this.items);
                    });
            }
            else {
                this.formItem.raw_material_name = ''
                this.formItem.raw_material_code = ''
                this.formItem.weight = ''
                this.formItem.area = ''
                this.formItem.material_width = ''
                this.formItem.material_thickness = ''
                this.formItem.material_length = ''
                this.formItem.metal_shape = ''
                this.formItem.metal_effect = ''
                // this.formItem.price = resp.data.attributes.price
                this.formItem.unit = ''
                this.formItem.status = ''
                this.formItem.material_type = ''
                this.formItem.id = ''
            }

            this.dialog = true
        },
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
        getMaterialEffect() {
            fetch(process.env.VUE_APP_BACKEND + 'metal-effects')
                .then(response => response.json())
                .then((resp) => {
                    this.MaterialEffect.push(resp.data)
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
        addPrice() {
            if (this.formItem.date != ""  && this.formItem.price != "") {
                this.items.push(
                    {
                        attributes: {
                            price: this.formItem.price,
                            remark: this.formItem.remark,
                            date: this.formItem.date
                        }
                    }
                )
                console.log(this.items);
                this.formItem.date = ''
                this.formItem.remark = ''
                this.formItem.price = ''
            }
        },
        deletePrice(id,i){
            axios.delete(process.env.VUE_APP_BACKEND + 'material-prices/' + id)
            this.items.splice(i, 1)
        },
        saveOrEdit() {
            if (this.isEdit) {
                console.log('แก้ไข');
                axios.put(process.env.VUE_APP_BACKEND + 'materials/' + this.MsterialId, {
                    "data": {
                        "weight": this.formItem.weight,
                        "area": this.formItem.area,
                        "material_width": this.formItem.material_width,
                        "material_thickness": this.formItem.material_thickness,
                        "material_length": this.formItem.material_length,
                        "material_type": this.formItem.material_type,
                        "raw_material_code": this.formItem.raw_material_code,
                        "raw_material_name": this.formItem.raw_material_name,
                        "metal_shape": this.formItem.metal_shape,
                        "metal_effect": this.formItem.metal_effect,
                        "unit": this.formItem.unit,
                        "status": this.formItem.status,
                        // "raw_material_prices":this.items
                    }
                })
                    .then((resp) => {
                        console.log(resp.data.data.id);
                        this.items.forEach((data, i) => {
                            console.log(data);
                            axios.post(process.env.VUE_APP_BACKEND + 'material-prices', {
                                "data": {
                                    "date": data.attributes.date,
                                    "price": data.attributes.price,
                                    "raw_material": resp.data.data.id,
                                    "remark": data.attributes.remark
                                }
                            })
                            console.log('ยิงครั้งที่: ', i)
                        })
                    })


            }
            else {
                console.log('บันทึก');
                axios.post(process.env.VUE_APP_BACKEND + 'materials', {
                    "data": {
                        "weight": this.formItem.weight,
                        "area": this.formItem.area,
                        "material_width": this.formItem.material_width,
                        "material_thickness": this.formItem.material_thickness,
                        "material_length": this.formItem.material_length,
                        "material_type": this.formItem.material_type,
                        "raw_material_code": this.formItem.raw_material_code,
                        "raw_material_name": this.formItem.raw_material_name,
                        "metal_shape": this.formItem.metal_shape,
                        "metal_effect": this.formItem.metal_effect,
                        "unit": this.formItem.unit,
                        "status": this.formItem.status,
                    }
                })
                    .then((resp) => {
                        this.items.forEach((data, i) => {
                            axios.post(process.env.VUE_APP_BACKEND + 'material-prices', {
                                "data": {
                                    "date": data.date,
                                    "price": data.price,
                                    "raw_material": resp.data.data.id,
                                    "remark": data.remark
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

<style>
.hotfix {
    margin-top: 50px
}
</style>