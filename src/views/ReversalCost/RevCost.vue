<template>
    <div>
        <v-card>
            <v-card-title>
                ต้นทุนย้อนกลับ
                <v-spacer></v-spacer>
                <vs-button @click.prevent="goto('/reversalcost')">
                    <i class="bx bx-chevron-left"></i> Back
                </vs-button>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="เลขที่ต้นทุน *" readonly />
                        </v-col>
                        <v-col cols="12" sm="3" md="8">
                            <vs-input type="date" label="วันที่ *" />
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <vs-select block placeholder="Select" label="บริษัท *" v-model="selected" @change="getProject(selected)">
                                <vs-option v-for="(item, i) in company[0]" :label="item.attributes.company_name" :key="i" :value="item.id"
                               >
                                    {{ item.attributes.company_name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <vs-select block placeholder="Select" label="โครงการ *" v-model="selected">
                                <vs-option v-for="(item, i) in project[0]" :label=" item.attributes.project_code_number" :key="i" :value="item.id">
                                    {{ item.attributes.project_name }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <vs-select block placeholder="Select" label="เลขที่สั่งขาย *" v-model="selected">
                                <vs-option v-for="(item, i) in saleOrder[0]" :label="item.id" :key="i" :value="item.id">
                                    {{ item.id }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <vs-table>
                            <template #thead>
                                <vs-tr>
                                    <vs-td></vs-td>
                                    <vs-td></vs-td>
                                    <vs-td></vs-td>
                                    <vs-td>จัดซื้อ</vs-td>
                                    <vs-td></vs-td>
                                    <vs-td></vs-td>
                                    <vs-td>ผลิตจริง</vs-td>
                                    <vs-td></vs-td>
                                    <vs-td></vs-td>>
                                </vs-tr>
                                <vs-tr>
                                    <vs-th>ลำดับ</vs-th>
                                    <vs-th>ชื่อสินค้า</vs-th>
                                    <vs-th>จำนวน</vs-th>
                                    <vs-th>หน่วย</vs-th>
                                    <vs-th>ยอดรวมสินค้าเป็น</vs-th>
                                    <vs-th>ต้นทุนย้อนกลับเป็นเงิน</vs-th>
                                    <vs-th>กำไร/ขาดทุน</vs-th>
                                    <vs-th>คิดเป็น %</vs-th>
                                    <vs-th>ดำเนินการ</vs-th>
                                </vs-tr>
                            </template>
                            <template #tbody>
                                <!-- <vs-tr>
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
                                    <vs-td><vs-input type="number" /></vs-td>
                                    <vs-td><vs-input type="number" /></vs-td>
                                    <vs-td><vs-input readonly type="number" /></vs-td>
                                    <vs-td>
                                        <vs-button transparent>
                                            <i class="bx bx-check"></i>
                                        </vs-button>
                                    </vs-td>
                                </vs-tr> -->
                                <vs-tr :key="i" v-for="(item, i) in $vs.getPage(items, page, max)" :data="item">
                                    <vs-td>{{ i + 1 }}</vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td><vs-input readonly /></vs-td>
                                    <vs-td>
                                        <vs-button transparent>
                                            <i class="bx bx-plus"></i>
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
    name: 'RevCost',

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
            // row: null,
            // selected: null,
            // data: [],
            selectedVat: 'vat',
            options: [
                { item: 'vat', name: 'มี VAT' },
                { item: 'novat', name: 'ไม่มี VAT' },
            ],
            company:[],
            project:[],
            saleOrder:[],
            items: [
                {
                    code: 'Lollipop',
                    date: 'Lollipop',
                    company: 392,
                    project: 0.2,
                    saleOrder: 98,
                    cost: 0,
                    reversalCost: 2,
                    profits: 2,
                    percent: 2,
                    created_by: 'Lollipop',
                },
            ]
        };
    },

    mounted() {
        this.getCompany()
        this.getSale()
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
        getCompany() {
            fetch(process.env.VUE_APP_BACKEND + 'customer-companies?populate=*')
                .then(response => response.json())
                .then((resp) => {
                    console.log('com: ',resp);
                    this.company.push(resp.data)
                },
                    console.log(this.items)
                );
        },
        getProject(id) {
            console.log(id);
            fetch(process.env.VUE_APP_BACKEND + 'projects?populate=*&filters[customer_company][id][$eq]=' + id)
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    this.project.push(resp.data)
                },
                    console.log(this.items)
                );
        },
        getSale() {
            fetch(process.env.VUE_APP_BACKEND + 'sale-orders')
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    this.saleOrder.push(resp.data)
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