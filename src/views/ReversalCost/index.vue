<template>
    <div>
        <v-row>
            <h2>ต้นทุนย้อนกลับ</h2>
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
            <h6>จัดการข้อมูล ต้นทุนย้อนกลับ</h6>
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
                        <vs-td>RC-{{ i + 1 }}</vs-td>
                        <vs-td>{{ covertDate(item.attributes.createdAt)}}</vs-td>
                        <vs-td>{{ item.attributes.customer_company.data.attributes.company_name}}</vs-td>
                        <vs-td>{{  item.attributes.project.data.attributes.project_name }}</vs-td>
                        <vs-td>{{ item.saleOrder }}</vs-td>
                        <vs-td>{{ item.cost }}</vs-td>
                        <vs-td>{{ item.reversalCost }}</vs-td>
                        <vs-td>{{ item.profits }}</vs-td>
                        <vs-td>{{ item.percent }}</vs-td>
                        <vs-td>ชัชพล</vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="editItem(item), title = 'แก้ไข'">
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
                    <div @click="getReverseCosts()">
                         <vs-pagination v-model="page" :length="lengthPage" />
                    </div>
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
    name: 'ReversalCostIndex',

    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            lengthPage:'',
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
                { text: 'เลขที่ต้นทุน', value: 'code' },
                { text: 'วันที่', value: 'date' },
                { text: 'บริษัท', value: 'company' },
                { text: 'โครงการ', value: 'project' },
                { text: 'เลขที่สั่งขาย', value: 'saleOrder' },
                { text: 'ต้นทุน', value: 'cost' },
                { text: 'ต้นทุนย้อนกลับ', value: 'reversalCost' },
                { text: 'กำไร/ขาดทุน', value: 'profits' },
                { text: 'คิดเป็น(%)', value: 'percent' },
                { text: 'ผู้ทำรายการ', value: 'created_by' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [],
        };
    },

    mounted() {
        this.getReverseCosts()
    },

    methods: {
        goto() {
            this.$router.push({ path: "/createreversalcost" });
        },
        covertDate(val) {
            const dateCovert = (new Date(val).toISOString().split("T")[0]).split('-');
            return (dateCovert[2].toString()) + '/' + (dateCovert[1].toString()) + '/' + (dateCovert[0].toString())
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
        getReverseCosts() {
            fetch(process.env.VUE_APP_BACKEND + 'reverse-costs?populate=*&pagination[page]='+this.page+'&pagination[pageSize]=10')
                .then(response => response.json())
                .then((resp) => {
                    this.lengthPage = resp.meta.pagination.pageCount
                    this.items.push(resp.data)
                },
                    console.log(this.items)
                );
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