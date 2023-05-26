<template>
    <div>
        <v-row>
            <h2>สินค้า</h2>
        </v-row>
        <v-row>
            <v-col md="1">
                <label class="pt-4">คำค้นหา:</label>
            </v-col>
            <v-col md="2">
                <vs-input placeholder="ระบุชื่อสินค้า" v-model="filter.name" />
            </v-col>
            <v-col md="2">
                <vs-input placeholder="วันที่อัพเดท" v-model="filter.date" />
            </v-col>
            <v-col md="5"></v-col>
            <v-col md="2">
                <vs-button @click.prevent="createProduct(), title = 'เพิ่ม'">
                    <i class="bx bx-plus-circle"></i> เพิ่มข้อมูล
                </vs-button>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="1"></v-col>
            <v-col md="2">
                <vs-select block placeholder="เลือกประเภทสินค้าหลัก" v-model="filter.product_main_type">
                    <vs-option v-for="(item, i) in productMainType[0]" :label="item.attributes.product_maincate_name"
                        :key="i" :value="item.id">
                        {{ item.attributes.product_maincate_name }}
                    </vs-option>
                </vs-select>
            </v-col>
            <v-col md="2">
                <vs-select block placeholder="เลือกประเภทสินค้าย่อย" v-model="filter.product_sub_type">
                    <vs-option v-for="(item, i) in productSubType[0]" :label="item.attributes.product_subcate_name" :key="i"
                        :value="item.id">
                        {{ item.attributes.product_subcate_name }}
                    </vs-option>
                </vs-select>
            </v-col>
            <v-col md="7"></v-col>
        </v-row>
        <v-row>
            <v-col md="1">
                <label></label>
            </v-col>
            <v-col md="2">
                <vs-select block placeholder="เลือกประเภท finishing" v-model="filter.finishing">
                    <vs-option v-for="(item, i) in finiShing[0]" :label="item.attributes.finishing_name" :key="i"
                        :value="item.id">
                        {{ item.attributes.finishing_name }}
                    </vs-option>
                </vs-select>
            </v-col>
            <v-col md="2">
                <vs-select block placeholder="เลือกประเภทวัตถุดิบ" v-model="filter.material">
                    <vs-option v-for="(item, i) in  materialType[0]" :label="item.attributes.material_type_name" :key="i"
                        :value="item.id">
                        {{ item.attributes.material_type_name }}
                    </vs-option>
                </vs-select>
            </v-col>
            <v-col md="1">
                <vs-button flat @click=" filterData()">ค้นหา</vs-button>
            </v-col>
            <v-col md="3">
                <vs-button transparent @click="filterAllData()">แสดงทั้งหมด</vs-button>
            </v-col>
            <v-col md="3"></v-col>

        </v-row>
        <v-row>
            <h6>จัดการข้อมูลสินค้า</h6>
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
                    <vs-tr :key="i" v-for="(item, i) in $vs.getPage(items[0], page, max)" :data="item">
                        <vs-td>{{(i+1)+max*(page-1)}}</vs-td>
                        <vs-td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="100" max-width="100"
                                src="https://picsum.photos/id/11/500/300"></v-img>
                        </vs-td>
                        <vs-td>{{ item.attributes.product_code }}</vs-td>
                        <vs-td>{{ item.attributes.product_name }}</vs-td>
                        <vs-td>{{ item.attributes.product_main_category.data.attributes.product_maincate_name }}</vs-td>
                        <vs-td>{{ item.attributes.product_sub_category.data.attributes.product_subcate_name }}</vs-td>
                        <vs-td>{{ item.attributes.finishing.data.attributes.finishing_name }}</vs-td>
                        <vs-td>{{ item.attributes.material_type_m.data.attributes.material_type_name }}</vs-td>
                        <vs-td>{{ item.attributes.product_prices.data.length == 0 ? '-' : 'ว่างไว้ก่อน' }}</vs-td>
                        <vs-td>{{ item.attributes.unit_m.data == null ? '-' :
                            item.attributes.unit_m.data.attributes.unit_name
                        }}</vs-td>
                        <vs-td>{{ item.attributes.updatedAt == null ? '-' : 'ว่างไว้ก่อน' }}</vs-td>
                        <vs-td>
                            <vs-tr>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="getProductDetail(item.id), title = 'แก้ไข'">
                                        <i class=" bx bx-edit"></i>
                                    </vs-button>
                                </vs-td>
                                <vs-td class="pa-0">
                                    <vs-button transparent @click.prevent="deleteItem(i, item.id)">
                                        <i class=" bx bx-trash-alt"></i>
                                    </vs-button>
                                </vs-td>
                            </vs-tr>
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <vs-pagination v-model="page" :length="lengthPage" />
                </template>
            </vs-table>
        </v-row>

        <vs-dialog v-model="dialog">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลสินค้า</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ประเภทสินค้า *" placeholder="Select"
                                        v-model="itemsDetail.product_type">
                                        <vs-option v-for="(item, i) in productType[0]"
                                            :label="item.attributes.product_cate_name" :key="i" :value="item.id">
                                            {{ item.attributes.product_cate_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger"
                                        @click.prevent="dialogCardType = true">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ประเภทงาน *" placeholder="Select"
                                        v-model="itemsDetail.customer_type">
                                        <vs-option v-for="(item, i) in  Customer_type[0]"
                                            :label="item.attributes.company_type_name" :key="i" :value="item.id">
                                            {{ item.attributes.company_type_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11">
                                    <vs-select block label="ประเภทวัตถุดิบ *" placeholder="Select"
                                        v-model="itemsDetail.material_type">
                                        <vs-option v-for="(item, i) in  materialType[0]"
                                            :label="item.attributes.material_type_name" :key="i" :value="item.id">
                                            {{ item.attributes.material_type_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ประเภทสินค้าหลัก *" placeholder="Select"
                                        v-model="itemsDetail.product_main">
                                        <vs-option v-for="(item, i) in productMainType[0]"
                                            :label="item.attributes.product_maincate_name" :key="i" :value="item.id">
                                            {{ item.attributes.product_maincate_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger"
                                        @click.prevent="dialogCardTypeMain = true">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ประเภทสินค้าย่อย *" placeholder="Select"
                                        v-model="itemsDetail.product_sub">
                                        <vs-option v-for="(item, i) in productSubType[0]"
                                            :label="item.attributes.product_subcate_name" :key="i" :value="item.id">
                                            {{ item.attributes.product_subcate_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger"
                                        @click.prevent="dialogCardSubType = true">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6"></v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ความกว้าง *" placeholder="Select" v-model="itemsDetail.width">
                                        <vs-option v-for="(item, i) in MaterialWidth[0]" :label="item.attributes.name"
                                            :key="i" :value="item.id">
                                            {{ item.attributes.name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ความยาว *" placeholder="Select" v-model="itemsDetail.length">
                                        <vs-option v-for="(item, i) in MaterialLength[0]" :label="item.attributes.name"
                                            :key="i" :value="item.id">
                                            {{ item.attributes.name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="ความสูง/หนา *" placeholder="Select"
                                        v-model="itemsDetail.height">
                                        <vs-option v-for="(item, i) in MaterialThickness[0]" :label="item.attributes.name"
                                            :key="i" :value="item.id">
                                            {{ item.attributes.name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" v-model="itemsDetail.product_code" label="รหัสสินค้า *" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" v-model="itemsDetail.product_name" label="ชื่อสินค้า *" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="Finishing *" placeholder="Select"
                                        v-model="itemsDetail.finishing">
                                        <vs-option v-for="(item, i) in finiShing[0]" :label="item.attributes.finishing_name"
                                            :key="i" :value="item.id">
                                            {{ item.attributes.finishing_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger"
                                        @click.prevent="dialogCardFinishing = true">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-row>
                                <v-col md="11" style="padding-right: 0px;">
                                    <vs-select block label="หน่วย *" placeholder="Select" v-model="itemsDetail.unit">
                                        <vs-option v-for="(item, i) in units[0]" :label="item.attributes.unit_name" :key="i"
                                            :value="item.id">
                                            {{ item.attributes.unit_name }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                                <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                    <vs-button style="padding-left: 0px;" transparent color="danger">
                                        <i class="bx bx-plus-circle"></i>
                                    </vs-button>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <label>รูปภาพ *</label>
                            <b-form-file v-model="itemsDetail.file_name" class="mt-3" plain></b-form-file>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ราคา Material" v-model="dataPrice.material_price" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ราคาค่าแรง" v-model="dataPrice.job_price" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <vs-input type="text" label="ราคา(บาท)" v-model="dataPrice.product_price" />
                        </v-col>
                        <v-col cols="12" sm="5" md="5">
                            <!-- <label>วันที่เซตราคา *</label>
                            <b-form-datepicker id="datepicker-full-width" v-model="value" menu-class="w-100"
                                calendar-width="100%" class="mb-2"></b-form-datepicker> -->
                            <vs-input type="date" label="วันที่เซตราคา *" v-model="dataPrice.date" />
                        </v-col>
                        <v-col cols="12" sm="1" md="1">
                            <vs-button icon @click="addDataPrice()">
                                <i class='bx bx-plus'></i>
                            </vs-button>
                        </v-col>
                        <v-divider></v-divider>
                        <vs-table>
                            <template #thead>
                                <vs-tr>
                                    <vs-th v-for="(header, i) in headerMaterial" :key="i">
                                        {{ header.text }}
                                    </vs-th>
                                </vs-tr>
                            </template>
                            <template #tbody>
                                <vs-tr :key="i" v-for="(item, i) in $vs.getPage(itemsDetail.table_price, page, max)"
                                    :data="item">
                                    <vs-td>{{ item.material_price }}</vs-td>
                                    <vs-td>{{ item.job_price }}</vs-td>
                                    <vs-td>{{ item.product_price }}</vs-td>
                                    <vs-td>{{ item.date }}</vs-td>
                                    <vs-td>
                                        <vs-button transparent @click="deletePrice(i)">
                                            <i class=" bx bx-trash-alt"></i>
                                        </vs-button>
                                    </vs-td>
                                    <vs-td>{{ item.record_by }}</vs-td>

                                </vs-tr>
                            </template>
                            <template #footer>
                                <vs-pagination v-model="page" :length="page" />
                            </template>
                        </vs-table>
                        <v-divider></v-divider>
                        <v-col cols="12" sm="12" md="12">
                            <label>สถานะ *</label>
                            <v-radio-group v-model="itemsDetail.status" row>
                                <v-radio label="เปิด" :value=true></v-radio>
                                <v-radio label="ปิด" :value=false></v-radio>
                            </v-radio-group>

                        </v-col>
                    </v-row>

                    <v-divider></v-divider>
                </v-container>
            </div>
            <template #footer>
                <div class="footer-dialog pa-0">
                    <vs-tr class="pa-0">
                        <vs-td><vs-button danger @click="close">ปิดหน้าต่าง</vs-button></vs-td>
                        <vs-td><vs-button @click="saveOrEditProduct()">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
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

        <vs-dialog v-model="dialogCardType">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลประเภทสินค้า</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="รหัสประเภทสินค้า *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ชื่อประเภทสินค้า *" />
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
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog v-model="dialogCardTypeMain">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลประเภทสินค้าหลัก</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="รหัสประเภทสินค้าหลัก *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ชื่อประเภทสินค้าหลัก *" />
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
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog v-model="dialogCardSubType">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูลประเภทสินค้าย่อย</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-select block label="ประเภทสินค้าหลัก *" placeholder="Select" v-model="selected">
                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                    {{ item }}
                                </vs-option>
                            </vs-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="รหัสประเภทสินค้าย่อย *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ชื่อประเภทสินค้าย่อย *" />
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
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog v-model="dialogCardFinishing">
            <template #header>
                <h4 class="not-margin">{{ title }} จัดการข้อมูล Finishing</h4>
            </template>
            <div class="con-form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ลำดับ *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="รหัส Finishing *" />
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <vs-input type="text" label="ชื่อ Finishing *" />
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
                        <vs-td><vs-button @click="save">บันทึกข้อมูล</vs-button></vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductIndex',
    components: {

    },
    data() {
        return {
            is_edit: false,
            page: 1,
            lengthPage:'',
            max: 10,
            selected: '',
            dialog: false,
            dialogDelete: false,
            dialogCardType: false,
            dialogCardTypeMain: false,
            dialogCardSubType: false,
            dialogCardFinishing: false,
            deleteIdItem: '',
            title: '',
            row: null,
            file2: null,
            value: '',
            formatted: '',

            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'index',
                },
                { text: 'รูปสินค้า', value: 'image' },
                { text: 'รหัสสินค้า', value: 'code' },
                { text: 'ชื่อสินค้า', value: 'name' },
                { text: 'ประเภทสินค้า', value: 'type' },
                { text: 'ประเภทสินค้าย่อย', value: 'subtype' },
                { text: 'Finishing', value: 'finishing' },
                { text: 'ประเภทวัตถุดิบ', value: 'materialType' },
                { text: 'ราคา', value: 'price' },
                { text: 'หน่วย', value: 'unit' },
                { text: 'วันที่บันทึกข้อมูล', value: 'record_at' },
                { text: 'ดำเนินการ', value: 'actions' },
            ],
            items: [],
            itemsDetail: {
                id: '',
                width: '',
                height: '',
                length: '',
                product_code: '',
                product_name: '',
                product_main: '',
                product_type: '',
                product_sub: '',
                customer_type: '',
                file_name: null,
                material_type: '',
                unit: '',
                finishing: '',
                table_price: [],
                status: true
            },
            dataPrice: {
                product_price: '',
                material_price: '',
                job_price: '',
                date: '',
                record_by: 'ชัชพล'

            },
            materialType: [],
            productType: [],
            productMainType: [],
            jobType: [],
            productSubType: [],
            finiShing: [],
            units: [],
            Customer_type: [],
            MaterialLength: [],
            MaterialWidth: [],
            MaterialThickness: [],
            filter: {
                name: '',
                date: '',
                product_main_type: '',
                product_sub_type: '',
                finishing: '',
                material: ''
            },
            headerMaterial: [
                {
                    text: 'ราคา Mat',
                    align: 'start',
                    sortable: false,
                    value: 'mat_price',
                },
                { text: 'ราคาค่าแรง', value: 'wage' },
                { text: 'ราคา(บาท)', value: 'price' },
                { text: 'วันที่เซตราคา', value: 'record_at' },
                { text: 'ลบ', value: 'actions' },
                { text: 'ผู้บันทึก', value: 'record_by' },
            ],
            itemMaterials: [
                {
                    mat_price: "001",
                    wage: 'Frozen Yogurt',
                    price: "FG",
                    record_at: 159,
                    record_by: 6.0,
                },
            ],
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        };
    },

    mounted() {
        this.getProductList();
        this.getMaterialTypes();
        this.getUnit();
        this.getFinishings();
        this.getProductCategoriesMain();
        this.getProductCategories();
        this.getProductCategoriesSub();
        this.getCustomerType();
        this.getProductPrice();
        this.getMaterialLength();
        this.getMaterialThickness()
        this.getMaterialWidth()
    },
    computed:{

    },

    methods: {
        getProductList() {
            fetch(process.env.VUE_APP_BACKEND + 'products?populate=*&pagination[page]='+this.page+'&pagination[pageSize]=10')
                .then(response => response.json())
                .then((resp) => {
                    this.lengthPage = resp.meta.pagination.pageCount
                    console.log(this.page);
                    this.items.push(resp.data)
                });
        },
        goto() {
            this.$router.push({ path: "/estimate" });
        },
        editItem(id) {
            console.log(id);
            // this.editedIndex = this.items.indexOf(item)
            // this.editedItem = Object.assign({}, item)

        },
        ///////////////////////////////FetchData////////////////////////////////////
        getProductDetail(id) {
            this.is_edit = true
            fetch(process.env.VUE_APP_BACKEND + 'products/' + id + '?populate=*')
                .then(response => response.json())
                .then((resp) => {
                    this.itemsDetail.id = resp.data.id
                    this.itemsDetail.customer_type = resp.data.attributes.customer_type.data.id
                    this.itemsDetail.product_name = resp.data.attributes.product_name
                    this.itemsDetail.product_code = resp.data.attributes.product_code
                    this.itemsDetail.material_type = resp.data.attributes.material_type_m.data?.id
                    this.itemsDetail.unit = resp.data.attributes.unit_m.data == null ? '' : resp.data.attributes.unit_m.data.id
                    this.itemsDetail.finishing = resp.data.attributes.finishing.data == null ? '' : resp.data.attributes.finishing.data.id
                    this.itemsDetail.product_main = resp.data.attributes.product_main_category.data == null ? '' : resp.data.attributes.product_main_category.data.id
                    this.itemsDetail.product_type = resp.data.attributes.product_category.data == null ? '' : resp.data.attributes.product_category.data.id
                    this.itemsDetail.product_sub = resp.data.attributes.product_sub_category.data == null ? '' : resp.data.attributes.product_sub_category.data.id
                    this.itemsDetail.status = resp.data.attributes.status
                    this.itemsDetail.width = resp.data.attributes.material_width_m.data.id
                    this.itemsDetail.height = resp.data.attributes.material_length_m.data.id
                    this.itemsDetail.length = resp.data.attributes.material_thickness_m.data.id
                    this.getProductPrice(id)
                }
                );
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
                    this.units.push(resp.data)
                }
                );

        },
        getFinishings() {
            fetch(process.env.VUE_APP_BACKEND + 'finishings')
                .then(response => response.json())
                .then((resp) => {
                    this.finiShing.push(resp.data)

                }
                );

        },
        getProductCategories() {
            fetch(process.env.VUE_APP_BACKEND + 'product-main-categories')
                .then(response => response.json())
                .then((resp) => {
                    this.productMainType.push(resp.data)
                }
                );

        },
        getProductCategoriesMain() {
            fetch(process.env.VUE_APP_BACKEND + 'product-categories')
                .then(response => response.json())
                .then((resp) => {
                    this.productType.push(resp.data)
                }
                );

        },
        getProductCategoriesSub() {
            fetch(process.env.VUE_APP_BACKEND + 'product-sub-categories')
                .then(response => response.json())
                .then((resp) => {
                    this.productSubType.push(resp.data)
                }
                );

        },
        getProductPrice() {
            fetch(process.env.VUE_APP_BACKEND + 'product-prices')
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);

                });
        },
        getCustomerType() {
            fetch(process.env.VUE_APP_BACKEND + 'customer-types')
                .then(response => response.json())
                .then((resp) => {
                    this.Customer_type.push(resp.data)
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
        getProductPrice(id) {
            fetch(process.env.VUE_APP_BACKEND + 'product-prices/' + id)
                .then(response => response.json())
                .then((resp) => {
                    console.log(resp);
                    // this.itemsDetail.table_price.push(resp.data)
                    // console.log(this.itemsDetail.table_price);
                }
                );
        },

        addDataPrice() {
            this.itemsDetail.table_price.push({
                product_price: this.dataPrice.product_price,
                material_price: this.dataPrice.material_price,
                job_price: this.dataPrice.job_price,
                record_by: this.dataPrice.record_by,
                date: this.dataPrice.date
            })
            this.dataPrice.material_price = '',
                this.dataPrice.product_price = '',
                this.dataPrice.job_price = '',
                this.dataPrice.date = ''
        },

        createProduct() {
            this.is_edit = false
            this.itemsDetail.product_name = ""
            this.itemsDetail.product_code = ""
            this.itemsDetail.material_type = ""
            this.itemsDetail.unit = ""
            this.itemsDetail.finishing = ""
            this.itemsDetail.product_main = ""
            this.itemsDetail.product_type = ""
            this.itemsDetail.product_sub = ""
            this.itemsDetail.status = ""
            this.itemsDetail.width = ""
            this.itemsDetail.height = ""
            this.itemsDetail.length = ""
            this.itemsDetail.customer_type = '',
                this.itemsDetail.file_name = null,
                this.dialog = true
        },


        saveOrEditProduct() {
            if (this.is_edit == true) {
                axios.put(process.env.VUE_APP_BACKEND + 'products/' + this.itemsDetail.id, {
                    "data": {
                        "product_code": this.itemsDetail.product_code,
                        "product_name": this.itemsDetail.product_name,
                        "file_name": this.itemsDetail.file_name,
                        "status": this.itemsDetail.status,
                        "product_category": this.itemsDetail.product_type,
                        "product_main_category": this.itemsDetail.product_main,
                        "product_sub_category": this.itemsDetail.product_sub,
                        "customer_type": this.itemsDetail.customer_type,
                        "material_type_m": this.itemsDetail.material_type,
                        "unit_m": this.itemsDetail.unit,
                        "material_width_m": this.itemsDetail.width,
                        "material_length_m": this.itemsDetail.length,
                        "material_thickness_m": this.itemsDetail.height,
                        // "product_prices": [],
                        "finishing": this.itemsDetail.finishing,
                        // "cost_estimates": [
                        //     "string or id",
                        //     "string or id"
                        // ]
                    }
                })
                    .then((response) => {
                        this.saveOrEditProductPrice(response.data.data.id)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else {
                console.log(this.itemsDetail);
                axios.post(process.env.VUE_APP_BACKEND + 'products', {
                    "data": {
                        "product_code": this.itemsDetail.product_code,
                        "product_name": this.itemsDetail.product_name,
                        "file_name": this.itemsDetail.file_name,
                        "status": this.itemsDetail.status,
                        "product_category": this.itemsDetail.product_type,
                        "product_main_category": this.itemsDetail.product_main,
                        "product_sub_category": this.itemsDetail.product_sub,
                        "customer_type": this.itemsDetail.customer_type,
                        "material_type_m": this.itemsDetail.material_type,
                        "unit_m": this.itemsDetail.unit,
                        "material_width_m": this.itemsDetail.width,
                        "material_length_m": this.itemsDetail.length,
                        "material_thickness_m": this.itemsDetail.height,
                        // "product_prices": [],
                        "finishing": this.itemsDetail.finishing,
                        // "cost_estimates": [
                        //     "string or id",
                        //     "string or id"
                        // ]
                    }
                })
                    .then((response) => {
                        this.saveOrEditProductPrice(response.data.data.id)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },
        saveOrEditProductPrice(id) {
            if (this.is_edit == true) {
                this.itemsDetail.table_price.forEach((data, i) => {
                    axios.put(process.env.VUE_APP_BACKEND + 'product-prices/' + id, {
                        "data": {
                            "price_mat": data.material_price,
                            "price_labor": data.job_price,
                            "price": data.product_price,
                            "date": data.date,
                            "product_id": id
                        }
                    })
                        .then((response) => {
                            console.log('ยิงครั้งที่', i, response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                })


            }
            else {
                this.itemsDetail.table_price.forEach((data, i) => {
                    axios.post(process.env.VUE_APP_BACKEND + 'product-prices', {
                        "data": {
                            "price_mat": data.material_price,
                            "price_labor": data.job_price,
                            "price": data.product_price,
                            "date": data.date,
                            "product_id": id
                        }
                    })
                        .then((response) => {
                            console.log('ยิงครั้งที่', i, response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                })
            }

        },



        deleteItem(i, id) {
            console.log(id);
            this.editedIndex = i
            this.deleteIdItem = id
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            console.log(this.editedIndex);
            this.items[0].splice(this.editedIndex, 1)
            axios.delete(process.env.VUE_APP_BACKEND + 'products/' + this.deleteIdItem)
            this.closeDelete()
        },
        deletePrice(id) {
            this.itemsDetail.table_price.splice(id, 1)
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
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        filterData() {
            console.log(this.filter);
        },
        filterAllData() {
            this.filter.name = ''
            this.filter.date = ''
            this.filter.product_main_type = ''
            this.filter.product_sub_type = ''
            this.filter.finishing = ''
            this.filter.material = ''
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




  deleteItem(id) {
    console.log(id);
    this.editedIndex = id
    this.dialogDelete = true
},
deleteItemConfirm() {
    axios.delete(process.env.VUE_APP_BACKEND + 'products/' + this.editedIndex)
}