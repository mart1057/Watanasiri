<template>
    <div>
        <v-row>
            <h2>อนุมัติใบเสนอราคา</h2>
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
            <v-col md="5" class="pb-0"></v-col>
        </v-row>
        <v-row>
            <h6>จัดการข้อมูล อนุมัติใบเสนอราคา</h6>
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
                        <vs-td>{{ item.company }}</vs-td>
                        <vs-td>{{ item.project }}</vs-td>
                        <vs-td>{{ item.product }}</vs-td>
                        <vs-td>{{ item.materialPrice }}</vs-td>
                        <vs-td>{{ item.MUMat }}</vs-td>
                        <vs-td>{{ item.total }}</vs-td>
                        <vs-td>{{ item.materialCost }}</vs-td>
                        <vs-td>{{ item.laborCost }}</vs-td>
                        <vs-td>{{ item.date }}</vs-td>
                        <vs-td><vs-switch style="width: 50%;" success v-model="item.status" /></vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="goto(item), title = 'แก้ไข'">
                                        <i class=" bx bx-edit"></i>
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
    name: 'EstimateApproval',

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
                { text: 'บริษัท', value: 'company' },
                { text: 'โครงการ', value: 'project' },
                { text: 'สินค้า', value: 'product' },
                { text: 'ราคา Mat ก่อน Mu', value: 'materialPrice' },
                { text: 'MU Mat', value: 'MUMat' },
                { text: 'ราคาเสนอรวม', value: 'total' },
                { text: 'ค่า Mat', value: 'materialCost' },
                { text: 'ค่าแรง', value: 'laborCost' },
                { text: 'Date/Rev', value: 'date' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions' },
            ],
            items: [
                {
                    company: 'Lollipop',
                    project: 'Lollipop',
                    product: 392,
                    materialPrice: 0.2,
                    MUMat: 98,
                    total: 0,
                    materialCost: 2,
                    laborCost: 2,
                    date: 2,
                    status: true
                },
            ],
        };
    },

    mounted() {

    },

    methods: {
        goto(data) {
            this.$router.push({ path: "/estimate" });
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