<template>
    <div>
        <vs-dialog>
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
    </div>
</template>

<script>
export default {
    name: 'CardProductSubType',

    data() {
        return {
            listCustomer: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>