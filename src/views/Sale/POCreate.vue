<template>
    <div>
        <v-card>
            <v-card-title>
                ใบเสนอราคา
                <v-spacer></v-spacer>
                <vs-button @click.prevent="goto('/po')">
                    <i class="bx bx-chevron-left"></i> Back
                </vs-button>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <label>เลขที่ใบเสนอราคา *</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-input type="text" readonly />
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <label>วันที่เสนอราคา*</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-input type="text" />
                        </v-col>
                        <v-col cols="12" sm="4" md="4"></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <label>บริษัท *</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-select block placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <label>เรียน*</label>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-select block placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4"></v-col>
                        <v-col cols="12" sm="2" md="2">
                            <label>CC</label>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-select block placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <label>โครงการ *</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-select block placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <label>เบอร์โทร*</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-input type="text" />
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <label>Fax</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-input type="text" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <label>คำเสนอ *</label>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" />
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <label>Email</label>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <vs-input type="text" />
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-card-body>
                                <table style="width: 100%;">
                                    <tr>
                                        <th style="text-align: center; width: 5%;">#</th>
                                        <th style="text-align: center; width: 10%;">ชื่อสินค้า</th>
                                        <th style="text-align: center; width: 10%;">Dwg. No.</th>
                                        <th style="text-align: center; width: 10%;">คำอธิบาย</th>
                                        <th style="text-align: center; width: 10%;">หมายเหตุ</th>
                                        <th style="text-align: center; width: 10%;">จำนวน</th>
                                        <th style="text-align: center; width: 10%;">หน่วย</th>
                                        <th style="text-align: center; width: 10%;">ราคา Mat@</th>
                                        <th style="text-align: center; width: 10%;">ราคาค่าแรง@</th>
                                        <th style="text-align: center; width: 10%;">รวมราคา@</th>
                                        <th style="text-align: center; width: 10%;">รวมเป็นเงิน</th>
                                        <th style="text-align: center; width: 5%;"><i class="fa fa-cog"
                                                aria-hidden="true"></i>
                                        </th>
                                    </tr>
                                    <tr>
                                    <tr>
                                        <td class="pt-3 pr-2 pl-2 material-tb"></td>
                                        <td colspan="9" class="pt-3 pr-2 pl-2 material-tb">
                                            <v-autocomplete :items="list" label="เลือก" dense solo></v-autocomplete>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="pt-3 pr-2 pl-2 material-tb"></td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-input size="sm"></b-form-input>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-textarea id="textarea" size="sm" v-model="text" placeholder="..."
                                                rows="2" max-rows="3"></b-form-textarea>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-checkbox v-model="selected"></b-form-checkbox>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-input size="sm" type="number"></b-form-input>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb"></td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-input size="sm" type="number"></b-form-input>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-input size="sm" type="number"></b-form-input>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb">
                                            <b-form-input size="sm" type="number"></b-form-input>
                                        </td>
                                        <td class="pt-3 pr-2 pl-2 material-tb"></td>
                                        <td class="pt-3 pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-check"
                                                    aria-hidden="true"></i></v-btn></td>
                                    </tr>

                                    </tr>
                                    <tbody v-bind:key="item.id" v-for="(item, index) in 2">
                                        <tr>
                                        <tr>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                {{ index + 1 }}
                                            </td>
                                            <td colspan="9" class="pt-3 pr-2 pl-2 material-tb">
                                                <v-autocomplete :items="list" label="เลือก" dense solo></v-autocomplete>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" class="pt-3 pr-2 pl-2 material-tb"></td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-textarea id="textarea" size="sm" v-model="text" placeholder="..."
                                                    rows="2" max-rows="3"></b-form-textarea>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-checkbox v-model="selected"></b-form-checkbox>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"></td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-trash"
                                                        aria-hidden="true"></i></v-btn></td>
                                        </tr>

                                        </tr>
                                    </tbody>
                                    <tfoot style="background-color: #a3e3a3;">
                                        <tr class="pt-3">
                                            <td colspan="9" md="9">รวมเป็นเงิน</td>
                                            <td md="2" class="pt-2"><b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td colspan="2" md="1"></td>
                                        </tr>

                                        <tr>
                                            <td colspan="8" md="7">ส่วนลด</td>
                                            <td md="2" class="pt-2">
                                        <tr>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input size="sm"
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pr-1 pl-1 material-tb">%
                                            </td>
                                        </tr>

                                        </td>
                                        <td md="2" class="pt-2"><b-form-input size="sm" type="number"></b-form-input></td>
                                        <td colspan="2" md="1"></td>
                                        </tr>

                                        <tr>
                                            <td colspan="9" md="9">รวมเป็นเงินสุทธิ</td>
                                            <td md="2" class="pt-2"><b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td colspan="2" md="1"></td>
                                        </tr>

                                        <tr>
                                            <td colspan="7" md="4">ภาษีมูลค่าเพิ่ม</td>
                                            <td md="3" class="pt-2">
                                                <b-form-radio-group style="display: flex;" v-model="selected"
                                                    :options="options" value-field="item" text-field="name">
                                                </b-form-radio-group>
                                            </td>
                                            <td md="2" class="pt-2">
                                        <tr>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input size="sm"
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pr-1 pl-1 material-tb">%
                                            </td>
                                        </tr>
                                        </td>
                                        <td md="2" class="pt-2"><b-form-input size="sm" type="number"></b-form-input></td>
                                        <td colspan="2" md="1"></td>
                                        </tr>

                                        <tr class="mb-3">
                                            <td colspan="9" md="9">รวมเป็นเงินทั้งสิ้น</td>
                                            <td md="2" class="pt-2 pb-2"><b-form-input size="sm"
                                                    type="number"></b-form-input></td>
                                            <td colspan="2" md="1"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </b-card-body>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <vs-button color="success" @click="save">บันทึก</vs-button>
                <vs-button color="success" @click="dialogExportBom = true">Export BOM</vs-button>
                <vs-button color="primary" @click="goto('/reversalcost')">Reversal Cost</vs-button>
                <vs-button color="danger" @click="close">ยกเลิก</vs-button>
            </v-card-actions>
        </v-card>

        <vs-dialog v-model="dialogExportBom">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูล BOM</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="รหัสสินค้า *" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="ชื่อสินค้า *" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="จำนวน *" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="หน่วย *" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <vs-table>
                            <template #thead>
                                <vs-tr>
                                    <vs-th>ลำดับ</vs-th>
                                    <vs-th>รายการ</vs-th>
                                    <vs-th>ราคา @</vs-th>
                                    <vs-th>จำนวน</vs-th>
                                    <vs-th>รวมเป็นเงิน</vs-th>
                                    <vs-th><i class="bx bx-cog"></i></vs-th>
                                </vs-tr>
                            </template>
                            <template #tbody>
                                <vs-tr>
                                    <vs-td></vs-td>
                                    <vs-td>
                                        <vs-select style="width: 100%;" block placeholder="Select" v-model="selected">
                                            <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                                {{ item }}
                                            </vs-option>
                                        </vs-select>
                                    </vs-td>
                                    <vs-td><vs-input type="number" /></vs-td>
                                    <vs-td><vs-input type="number" /></vs-td>
                                    <vs-td><vs-input type="number" /></vs-td>
                                    <vs-td>
                                        <vs-button transparent>
                                            <i class="bx bx-check"></i>
                                        </vs-button>
                                    </vs-td>
                                </vs-tr>
                                <vs-tr :key="i" v-for="(item, i) in 2" :data="item">
                                    <vs-td>{{ i + 1 }}</vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td>
                                        <vs-button transparent>
                                            <i class="bx bx-trash-alt"></i>
                                        </vs-button>
                                    </vs-td>
                                </vs-tr>
                            </template>
                            <!-- <template #footer>
                                <vs-pagination v-model="page" :length="$vs.getLength(items, max)" />
                            </template> -->
                        </vs-table>
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
    </div>
</template>

<script>
import CardExportBOM from '@/views/Sale/ExportBOM.vue'

export default {
    name: 'POCreate',
    components: {
        CardExportBOM,
    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            text: '',
            dialogCardType: false,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            title: '',
            listTypeExpand: [
                { value: 1, text: "แจกแจง" },
                { value: 2, text: "ไม่แจกแจง" },
            ],
            selectedTypeExpand: 1,
            row: null,
            options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            data: [],
            selectedVat: 'vat',
            options: [
                { item: 'vat', name: 'มี VAT' },
                { item: 'novat', name: 'ไม่มี VAT' },
            ],
            dialogExportBom: false,
        };
    },

    mounted() {

    },

    methods: {
        goto(strLink) {
            this.$router.push({ path: strLink });
        },
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
        toggle() {
            console.log(this.selectedTypeExpand);
        },
    },
    computed: {
        filteredResources() {
            if (this.inputSearch) {
                return this.data.filter((item) => {
                    return (!this.inputSearch || item.parcel_member_id.includes(this.inputSearch) || item.member_name.includes(this.inputSearch));
                });
            } else {
                return this.data.slice(0).sort((a, b) => (a.id > b.id ? this.sorting : -this.sorting));
            }
        }

    },
};
</script>

<style lang="stylus">
    #tb-saleorder footer.vs-table__footer {
        background-color: #a3e3a3;
    }
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