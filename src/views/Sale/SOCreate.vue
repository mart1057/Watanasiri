<template>
    <div>
        <v-card>
            <v-card-title>
                รายการต้นทุนใบสั่งขาย
                <v-spacer></v-spacer>
                <vs-button @click.prevent="goto('/so')">
                    <i class="bx bx-chevron-left"></i> Back
                </vs-button>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <label>เลขที่ใบสั่งขาย *</label>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" readonly />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <label>วันที่ *</label>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <label>บริษัท *</label>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-select block placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <label>โครงการ *</label>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-select block placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            Quo. No.
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <label>PO. *</label>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" />
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-card-body>
                                <vs-table id="tb-saleorder">
                                    <template #thead>
                                        <vs-tr>
                                            <vs-th>ลำดับ</vs-th>
                                            <vs-th>ชื่อสินค้า</vs-th>
                                            <vs-th>จำนวน</vs-th>
                                            <vs-th>ราคา@</vs-th>
                                            <vs-th>รวมเป็นเงิน</vs-th>
                                            <vs-th>Quo. No.</vs-th>
                                        </vs-tr>
                                    </template>
                                    <template #tbody>
                                        <vs-tr :key="i" v-for="(item, i) in 2" :data="item">
                                            <vs-td>{{ i + 1 }}</vs-td>
                                            <vs-td>[4F045001CS-4440157] Brench 158 เหล็กทำสี ข.40x157.8x44.8 cm.</vs-td>
                                            <vs-td>200</vs-td>
                                            <vs-td>7500.00</vs-td>
                                            <vs-td>150000.00</vs-td>
                                            <vs-td>
                                                <vs-tr>
                                                    <vs-td class="pa-0">QT640003</vs-td>
                                                    <vs-td class="pa-0">
                                                        <vs-button flat @click="dialogRevCost = true">
                                                            ต้นทุนย้อนกลับ
                                                        </vs-button>
                                                    </vs-td>
                                                </vs-tr>
                                            </vs-td>
                                        </vs-tr>
                                    </template>
                                    <template #footer class="table-summary">
                                        <vs-tr>
                                            <vs-td colspan="4" md="9">รวมเป็นเงิน</vs-td>
                                            <vs-td md="2" class="pt-2">
                                                <vs-input type="number" />
                                            </vs-td>
                                            <vs-td md="1"></vs-td>
                                        </vs-tr>
                                        <vs-tr>
                                            <vs-td colspan="2" md="4">ภาษีมูลค่าเพิ่ม</vs-td>
                                            <vs-td md="3" class="pt-2" style="text-align: right;">
                                                <b-form-radio-group style="display: flex;" v-model="selectedVat"
                                                    :options="options" value-field="item" text-field="name">
                                                </b-form-radio-group>
                                            </vs-td>
                                            <vs-td md="2" class="pt-2">
                                                <vs-tr>
                                                    <vs-td class="pr-1 pl-1">
                                                        <vs-input type="number" />
                                                    </vs-td>
                                                    <vs-td class="pr-1 pl-1">%</vs-td>
                                                </vs-tr>
                                            </vs-td>
                                            <vs-td md="2" class="pt-2">
                                                <vs-input type="number" />
                                            </vs-td>
                                            <vs-td md="1"></vs-td>
                                        </vs-tr>

                                        <vs-tr>
                                            <vs-td colspan="4" md="9">รวมเป็นเงินทั้งสิ้น</vs-td>
                                            <vs-td md="2" class="pt-2">
                                                <vs-input type="number" />
                                            </vs-td>
                                            <vs-td md="1"></vs-td>
                                        </vs-tr>
                                    </template>
                                </vs-table>
                            </b-card-body>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <vs-button color="success" @click="save">บันทึก</vs-button>
                <vs-button color="primary" @click="close">ยกเลิก</vs-button>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="dialogRevCost" width="550px">
            <CardReversalCost />
        </v-dialog>
    </div>
</template>

<script>
import CardReversalCost from '@/views/ReversalCost/RevCost.vue'

export default {
    name: 'SOCreate',
    components: {
        CardReversalCost,
    },
    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
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
            dialogRevCost: false
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