<template>
    <div>
        <v-card>
            <v-card-title>
                {{ title }} จัดการข้อมูล BOM
            </v-card-title>
            <v-card-text>
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
                                        <vs-select style="width: 70%;" block placeholder="Select" v-model="selected">
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
                                <vs-tr :key="i" v-for="(item, i) in $vs.getPage(items, page, max)" :data="item">
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
                            <template #footer>
                                <vs-pagination v-model="page" :length="$vs.getLength(items, max)" />
                            </template>
                        </vs-table>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <vs-td><vs-button danger @click="dialog = false">ปิดหน้าต่าง</vs-button></vs-td>
                <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'ExportBOM',

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
            selected: null,
            options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            data: [],
            selected: 'vat',
            options: [
                { item: 'vat', name: 'มี VAT' },
                { item: 'novat', name: 'ไม่มี VAT' },
            ]
        };
    },

    mounted() {

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
        toggle() {
            console.log(this.selectedTypeExpand);
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