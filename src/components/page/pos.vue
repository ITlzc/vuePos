<template>
  <div class="pos" style="height:100%;">
    <el-row>
      <el-col :span='7' class="pos-order" id="order-list">
        <!-- 我是订单栏 -->
        <el-tabs>
          <el-tab-pane label='点餐'>
            <el-table :data="tableData" border style="width:100%;">
              <el-table-column prop='goodsName' label='商品'></el-table-column>
              <el-table-column prop='count' label='数量' width=''></el-table-column>
              <el-table-column prop='price' label='单价' width=''></el-table-column>
              <el-table-column label='操作' width='' fixed='right'>
                <template slot-scope='scope'>
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
              <span><small>数量：</small>{{totalCount}}</span><small>金额：</small>{{totalMoney}}
            </div>
            <div class="div-btn">
              <el-button type='warning'>挂单</el-button>
              <el-button type='danger' @click="delAllGoods">清空</el-button>
              <el-button type='success' @click="checkout">结账</el-button>
            </div>
            
          </el-tab-pane>
          <el-tab-pane label='挂单'>
            挂单
          </el-tab-pane>
          <el-tab-pane label='外卖'>
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='17'>
        <div>
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" :key="goods.goodsId" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>


        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class='cookList'>
                    <li v-for="typeGoods in type0Goods" :key="typeGoods.goodsId" @click="addOrderList(typeGoods)">
                        <span class="foodImg"><img :src="typeGoods.goodsImg" width="100%"></span>
                        <span class="foodName">{{typeGoods.goodsName}}</span>
                        <span class="foodPrice">￥{{typeGoods.price}}元</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class='cookList'>
                    <li v-for="typeGoods in type1Goods" :key="typeGoods.goodsId" @click="addOrderList(typeGoods)">
                        <span class="foodImg"><img :src="typeGoods.goodsImg" width="100%"></span>
                        <span class="foodName">{{typeGoods.goodsName}}</span>
                        <span class="foodPrice">￥{{typeGoods.price}}元</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class='cookList'>
                    <li v-for="typeGoods in type2Goods" :key="typeGoods.goodsId" @click="addOrderList(typeGoods)">
                        <span class="foodImg"><img :src="typeGoods.goodsImg" width="100%"></span>
                        <span class="foodName">{{typeGoods.goodsName}}</span>
                        <span class="foodPrice">￥{{typeGoods.price}}元</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class='cookList'>
                    <li v-for="typeGoods in type3Goods" :key="typeGoods.goodsId" @click="addOrderList(typeGoods)">
                        <span class="foodImg"><img :src="typeGoods.goodsImg" width="100%"></span>
                        <span class="foodName">{{typeGoods.goodsName}}</span>
                        <span class="foodPrice">￥{{typeGoods.price}}元</span>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftNav from '@/components/common/leftNav';
import axios from 'axios';

export default {
  name: 'pos',
  data(){
    return{
      tableData:[],
      oftenGoods:[],
      type0Goods:[],
      type1Goods:[],
      type2Goods:[],
      type3Goods:[],
      totalMoney:0,
      totalCount:0,
    }
  },
  created:function(){
    // 拉取常用商品http://jspang.com/DemoApi/oftenGoods.php
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
    .then(response=>{
      // console.log(response);
      this.oftenGoods = response.data;
    })
    .catch(error=>{
      // cosole.log(error)
      alert("网络错误，不能访问");
    })

    //拉取分类商品 http://jspang.com/DemoApi/typeGoods.php
    axios.get('http://jspang.com/DemoApi/typeGoods.php')
    .then(response=>{
      // console.log(response);
      this.type0Goods = response.data[0];
      this.type1Goods = response.data[1];
      this.type2Goods = response.data[2];
      this.type3Goods = response.data[3];
    })
    .catch(error=>{
      // cosole.log(error)
      alert("网络错误，不能访问");
    })
  },
  mounted:function(){  //虚拟DOM渲染完成后
      var orderHeight = document.body.clientHeight;
      document.getElementById("order-list").style.height = orderHeight+'px'
  },
  methods: {
    addOrderList(goods){
      this.totalMoney = 0;
      this.totalCount = 0;

      //商品是否已经存在于订单列表中
      let isHave = false;
      for(let i = 0; i<this.tableData.length; i++){
        if(this.tableData[i].goodsId == goods.goodsId){
          isHave=true;
        }
      }

      //根据判断的值写业务逻辑
      if(isHave){
        //改变列表中的商品数量
        let arr = this.tableData.filter(a=>a.goodsId == goods.goodsId);
        arr[0].count++;
      }else{
        let newGoodsData = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
        this.tableData.push(newGoodsData);
      }
      this.getAllCountMoney();
    },
    delSingleGoods(goods){
      this.tableData = this.tableData.filter(a=>a.goodsId != goods.goodsId);
      this.getAllCountMoney();
    },
    delAllGoods(){
      this.tableData = [];
      this.totalMoney=0;
      this.totalCount=0;
    },
    checkout(){
      if(this.totalCount != 0){
        this.tableData = [];
        this.totalMoney=0;
        this.totalCount=0;
        this.$message({
          message: "结账成功",
          type: 'success'
        })
      }else{
        this.$message({
          message: "不能空结",
          type: 'error'
        })
      }
    },
    //汇总数量金额
    getAllCountMoney(){
      this.totalMoney = 0;
      this.totalCount = 0;
      if(this.tableData){
        this.tableData.forEach((element) => {
                this.totalCount += element.count;
                this.totalMoney=this.totalMoney+(element.price*element.count);
              })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pos-order{
  background-color: #F9FAFC;
  border-right: 1px solid #C0CCDA;
}
.div-btn{
  margin-top: 10px;
}
.title{
  height: 20px;
  border-bottom: 1px solid #D3dce6;
  background-color: #F9FAFC;
  text-align: left;
  padding: 10px;
  line-height: 20px;
}
.often-goods-list ul li{
  list-style:none;
  float: left;
  border: 1px solid #D3dce6;
  padding:10px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
}
.o-price{
  color: rgb(0, 153, 255);
}
.goods-type{
  clear: both;
}
.cookList li{
  list-style: none;
  width:25%;
  border:1px solid #E5E9F2;
  height: auot;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span{
  display: block;
  float:left;
}
.foodImg{
  width: 40%;
}
.foodName{
  font-size: 18px;
  padding-left: 10px;
  color:brown;

}
.foodPrice{
  font-size: 20px;
  padding-left: 10px;
  padding-top:10px;
}
.totalDiv{
  height: 40px;
  line-height: 40px;
  background-color: #FFF;
  border-bottom: 1px solid #ccc;
}
.totalDiv span{
  margin-right: 20px;
}
</style>
