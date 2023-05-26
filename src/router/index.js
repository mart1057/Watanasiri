import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AdminIndex from '../views/Admin/index.vue'
import EditRole from '../views/Admin/EditRole.vue'
import CompanyIndex from '../views/Admin/CompanyIndex.vue'

import SaleIndex from '../views/Sale/index.vue'
import Estimate from '../views/Sale/Estimate.vue'
import EstimateApproval from '../views/Sale/EstimateApproval.vue'
import PurchaseOrder from '../views/Sale/PurchaseOrder.vue'
import POCreate from '../views/Sale/POCreate.vue'
import SaleOrder from '../views/Sale/SaleOrder.vue'
import SOCreate from '../views/Sale/SOCreate.vue'
import ExportBOM from '../views/Sale/ExportBOM.vue'

import ReversalCostIndex from '../views/ReversalCost/index.vue'
import ReversalCost from '../views/ReversalCost/RevCost.vue'

import MaterialIndex from '../views/Material/index.vue'
import MaterialConsumablesIndex from '../views/Material/Consumables.vue'
import MaterialLength from '../views/Material/Length.vue'
import MaterialPaint from '../views/Material/Paint.vue'
import MaterialShape from '../views/Material/Shape.vue'
import MaterialSpecialMaterial from '../views/Material/SpecialMaterial.vue'
import MaterialSpecialConsumables from '../views/Material/SpecialConsumables.vue'
import MaterialThick from '../views/Material/Thick.vue'
import MaterialType from '../views/Material/Type.vue'
import MaterialUnit from '../views/Material/Unit.vue'
import MaterialWide from '../views/Material/Wide.vue'

import LaborIndex from '../views/Labor/index.vue'
import LaborType from '../views/Labor/LaborType.vue'

import ProductIndex from '../views/Product/index.vue'
import ProductFinishing from '../views/Product/ProductFinishing.vue'
import ProductSubType from '../views/Product/ProductSubType.vue'
import ProductType from '../views/Product/ProductType.vue'
import ProductTypeMain from '../views/Product/ProductTypeMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // },
  {
    path: '/sale',
    name: 'sale',
    component: SaleIndex
  },
  {
    path: '/estimate',
    name: 'estimate',
    component: Estimate
  },
  {
    path: '/estimateapproval',
    name: 'estimateapproval',
    component: EstimateApproval
  },
  {
    path: '/po',
    name: 'po',
    component: PurchaseOrder
  },
  {
    path: '/createpo',
    name: 'createpo',
    component: POCreate
  },
  {
    path: '/so',
    name: 'so',
    component: SaleOrder
  },
  {
    path: '/createso',
    name: 'createso',
    component: SOCreate
  },
  {
    path: '/exportbom',
    name: 'exportbom',
    component: ExportBOM
  },
  {
    path: '/reversalcost',
    name: 'reversalcost',
    component: ReversalCostIndex
  },
  {
    path: '/createreversalcost',
    name: 'createreversalcost',
    component: ReversalCost
  },
  {
    path: '/labor',
    name: 'labor',
    component: LaborIndex
  },
  {
    path: '/labortype',
    name: 'laborType',
    component: LaborType
  },
  {
    path: '/product',
    name: 'product',
    component: ProductIndex
  },
  {
    path: '/productfinishing',
    name: 'productFinishing',
    component: ProductFinishing
  },
  {
    path: '/productsubtype',
    name: 'productSubType',
    component: ProductSubType
  },
  {
    path: '/producttype',
    name: 'productType',
    component: ProductType
  },
  {
    path: '/producttypemain',
    name: 'productTypeMain',
    component: ProductTypeMain
  },
  {
    path: '/material',
    name: 'material',
    component: MaterialIndex
  },
  {
    path: '/materialconsumables',
    name: 'materialConsumables',
    component: MaterialConsumablesIndex
  },
  {
    path: '/materiallength',
    name: 'materialLength',
    component: MaterialLength
  },
  {
    path: '/materialPaint',
    name: 'materialPaint',
    component: MaterialPaint
  },
  {
    path: '/materialshape',
    name: 'materialShape',
    component: MaterialShape
  },
  {
    path: '/materialspecialmaterial',
    name: 'materialSpecialMaterial',
    component: MaterialSpecialMaterial
  },
  {
    path: '/materialspecialconsumables',
    name: 'materialSpecialConsumables',
    component: MaterialSpecialConsumables
  },
  {
    path: '/materialthick',
    name: 'materialThick',
    component: MaterialThick
  },
  {
    path: '/materialtype',
    name: 'materialType',
    component: MaterialType
  },
  {
    path: '/materialunit',
    name: 'materialUnit',
    component: MaterialUnit
  },
  {
    path: '/materialwide',
    name: 'materialWide',
    component: MaterialWide
  },
  {
    path: '/admin',
    name: 'AdminIndex',
    component: AdminIndex
  },
  {
    path: '/admin/editrole',
    name: 'EditRole',
    component: EditRole
  },
  {
    path: '/admin/company',
    name: 'companyIndex',
    component: CompanyIndex
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
