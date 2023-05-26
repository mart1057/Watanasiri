<template>
    <div>
        <v-list>
            <v-list-item>
                <v-img src="logo.jpg"></v-img>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-item-group color="#a3e3a2">
                <v-list-item @click.prevent="home()">
                    <v-list-item-icon>
                        <i class="bx bx-home"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-list-group no-action sub-group color="#a3e3a2">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>เอกสารประกอบการขาย</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="item, i in sales" :key="i" link @click.prevent="goto(item)">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group no-action sub-group color="#a3e3a2">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>ต้นทุนย้อนกลับ</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="item, i in reversalcost" :key="i" link @click.prevent="goto(item)">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group no-action sub-group color="#a3e3a2">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>จัดการวัตถุดิบ</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="item, i in meterials" :key="i" link @click.prevent="goto(item)">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group no-action sub-group color="#a3e3a2">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>จัดการค่าแรง</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="item, i in labors" :key="i" link @click.prevent="goto(item)">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group no-action sub-group color="#a3e3a2">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>จัดการสินค้า</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="item, i in products" :key="i" link @click.prevent="goto(item)">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group no-action sub-group color="#a3e3a2">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="item, i in admin" :key="i" link @click.prevent="goto(item)">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list-group>
    </div>
</template>

<script>
export default {
    name: 'Menu',

    data() {
        return {
            sales: [
                // { text: 'รายการรับแบบ', icon: 'mdi-star', link: "" },
                { text: 'ใบประเมินต้นทุน', icon: 'mdi-star', link: "/sale" },
                { text: 'อนุมัติใบเสนอราคา', icon: 'mdi-star', link: "/estimateapproval" },
                // { text: 'ใบประเมินต้นทุนสินค้าชุด', icon: 'mdi-star', link: "" },
                // { text: 'ใบ Prelim', icon: 'mdi-star', link: "" },
                { text: 'ใบเสนอราคา', icon: 'mdi-star', link: "/po" },
                { text: 'ใบสั่งขาย', icon: 'mdi-star', link: "/so" },
            ],
            reversalcost: [
                { text: 'ต้นทุนย้อนกลับ', icon: 'mdi-star', link: "/reversalcost" },
            ],
            products: [
                { text: 'สินค้า', icon: 'mdi-folder', link: "/product" },
                { text: 'ประเภทสินค้า', icon: 'mdi-account-multiple', link: "/producttype" },
                { text: 'ประเภทสินค้าหลัก', icon: 'mdi-star', link: "/producttypemain" },
                { text: 'ประเภทสินค้าย่อย', icon: 'mdi-history', link: "/productsubtype" },
                { text: 'Finishing', icon: 'mdi-check-circle', link: "/productfinishing" },
            ],
            meterials: [
                { text: 'วัตถุดิบ', icon: 'mdi-folder', link: "/material" },
                { text: 'วัสดุสิ้นเปลือง', icon: 'mdi-account-multiple', link: "/materialconsumables" },
                { text: 'ประเภท วัตถุดิบ/วัสดุสิ้นเปลือง/โลหะ', icon: 'mdi-star', link: "/materialtype" },
                { text: 'รูปร่าง วัตถุดิบ/วัสดุสิ้นเปลือง/โลหะ', icon: 'mdi-history', link: "/materialshape" },
                { text: 'ลักษณะพิเศษ โลหะ/ชื่อเฉพาะวัตถุดิบ', icon: 'mdi-check-circle', link: "/materialspecialmaterial" },
                { text: 'ลักษณะพิเศษวัสดุสิ้นเปลือง', icon: 'mdi-upload', link: "/materialspecialconsumables" },
                { text: 'ความหนา', icon: 'mdi-cloud-upload', link: "/materialthick" },
                { text: 'ความกว้าง', icon: 'mdi-cloud-upload', link: "/materialwide" },
                { text: 'ความยาว', icon: 'mdi-cloud-upload', link: "/materiallength" },
                { text: 'ค่าทำสีวัตถุดิบ', icon: 'mdi-cloud-upload', link: "/materialPaint" },
                { text: 'หน่วย', icon: 'mdi-cloud-upload', link: "/materialunit" },
            ],
            labors: [
                { text: 'ค่าแรง', icon: 'mdi-folder', link: "/labor" },
                { text: 'ประเภทค่าแรง', icon: 'mdi-account-multiple', link: "/labortype" },
            ],
            admin: [
                { text: 'จัดการผู้ใช้', icon: 'mdi-plus-outline', link: "/admin" },
                // { text: 'แก้ไขตำแหน่งและสิทธิ', icon: 'mdi-file-outline', link: "/admin/editrole" },
                { text: 'แก้ไขข้อมูลบริษัท', icon: 'mdi-update', link: "/admin/company" },
            ],
        };
    },

    mounted() {

    },

    methods: {
        home() {
            this.$router.push({ path: "/dashboard" });
        },
        goto(link) {
            if (this.$route.path == link.link) {
                this.$router.go();
            } else {
                this.$router.push({ path: link.link });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>