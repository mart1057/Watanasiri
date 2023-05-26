<template>
    <div>
        <v-row>
            <h2>ใบสั่งขาย</h2>
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
                <vs-button @click.prevent="goto(), title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>
        <v-row>
            <h6>จัดการข้อมูล ใบสั่งขาย</h6>
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
                    <vs-tr :key="i" v-for="(item, i) in $vs.getPage(items, page, max)" :data="item">
                        <vs-td>{{ i + 1 }}</vs-td>
                        <vs-td>{{ item.soCode }}</vs-td>
                        <vs-td>{{ item.date }}</vs-td>
                        <vs-td>{{ item.company }}</vs-td>
                        <vs-td>{{ item.project }}</vs-td>
                        <vs-td>{{ item.listQuote }}</vs-td>
                        <vs-td>{{ item.poCode }}</vs-td>
                        <vs-td>{{ item.amount }}</vs-td>
                        <vs-td>{{ item.user }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.status" /></vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="goto(item), title = 'แก้ไข'">
                                        <i class="bx bx-edit"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent>
                                        <i class="bx bxs-file-blank"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="deleteItem(item)">
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

        <vs-dialog width="550px" not-center v-model="dialogDelete">
            <template #header>
                <h4 class="not-margin">
                    ต้องการลบข้อมูลนี้ ใช่หรือไม่?
                </h4>
            </template>
            <template #footer>
                <div class="con-footer">
                    <vs-button transparent>
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
export default {
    name: 'SaleOrder',

    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            dialog: false,
            dialogDelete: false,
            dialogCardType: false,
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
                { text: 'เลขที่ใบสั่งขาย', value: 'soCode' },
                { text: 'วันที่', value: 'date' },
                { text: 'บริษัท', value: 'company' },
                { text: 'โครงการ', value: 'project' },
                { text: 'Quo.No.', value: 'listQuote' },
                { text: 'PO.', value: 'poCode' },
                { text: 'รวมเป็นเงินทั้งสิ้น', value: 'amount' },
                { text: 'ผู้ทำรายการ', value: 'user' },
                { text: 'สถานะ', value: 'status' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [
                {
                    soCode: 'Lollipop',
                    date: 'Lollipop',
                    company: 392,
                    project: 0.2,
                    listQuote: 98,
                    poCode: 0,
                    amount: 0,
                    user: 2,
                    status: true
                },
            ],
        };
    },

    mounted() {

    },

    methods: {
        goto() {
            this.$router.push({ path: "/createso" });
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